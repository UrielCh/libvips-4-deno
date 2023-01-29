// import console from "https://deno.land/std@0.175.0/node/console.ts";
// window.console = console;

import React, {useState, useRef} from 'npm:react@17';
import {render, Text, Box, useInput, Instance } from 'npm:ink';
import { Operation } from './deps.ts';

interface PropsBuffer {
	buffer: Uint8Array;
    operations?: Map<string, Operation>;
    offset: number;
}

type Colors = 'black' | 'red' | 'green' | 'yellow' |  'blue' | 'magenta' | 'cyan' | 'white' | 
'gray' | 'redBright' | 'greenBright' | 'yellowBright' | 'blueBright' | 'magentaBright' | 'cyanBright' | 'whiteBright' | 
'bold' | 'dim';

export function FFIView(buffer: Uint8Array, opts:{operations?: Map<string, Operation>, offset?: number} = {}): Instance {
    const App = (params: PropsBuffer) => {
        const {buffer} = params;
        const { rows } = Deno.consoleSize();
        const scroll = useRef(0);
        const longestSymbol = useRef(opts.operations ? Math.max(0, ...[...opts.operations.keys()].map(a=>a.length)) : 0);
        const bv = useRef(new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength));
        const [ cursor, setCursor ] = useState(Math.min(params.offset || 0, buffer.length - 1));
        const lines: React.Component[] = [];
        const len = buffer.length;
        const lineCount = Math.ceil(len / 16);
        const indexLen = 1 + lineCount.toString(16).length;
    
        useInput((input, key) => {
            if (key.leftArrow) {
                setCursor(Math.max(0, cursor - 1));
            }
            else if (key.rightArrow) {
                setCursor(Math.min(len - 1, cursor + 1));
            }
            else if (key.upArrow) {
                const next = cursor - 16;
                if (next >= 0)
                    setCursor(next);
            }
            else if (key.downArrow) {
                const next = cursor + 16;
                if (next <= len - 1)
                    setCursor(next);
            } else if (key.escape || input === 'q') {
                instance.unmount();
            }
        });

        const header: React.Component[] = []
        header.push(<Text key="offset">Offset: </Text>)
        header.push(<Text key="offsetV" color="green">{cursor.toString(16).padStart(indexLen, '0')}</Text>)
        header.push(<Text key="valuelbl"> Value:</Text>)
        const u8: React.Component[] = []
        u8.push(<Text key="u8">u8: </Text>)
        u8.push(<Text key="vu8" color="green">{buffer[cursor].toString().padStart(3, ' ')}</Text>)
        const u16: React.Component[] = [];
        if (cursor + 1 < len) {
            const n = buffer[cursor] + buffer[cursor + 1] * 256;
            // u16 = `u16: ${n.toString().padStart(5, ' ')}`;
            u16.push(<Text key="u16">u16: </Text>)
            u16.push(<Text key="vu16" color="green">{n.toString().padStart(5, ' ')}</Text>)
        }
        const u32: React.Component[] = [];
        if (cursor + 3 < len) {
            const n = buffer[cursor] + buffer[cursor + 1] * 256 + buffer[cursor + 2] * 256 * 256 + buffer[cursor + 3] * 256 * 256 * 256;
            // u32 = `u32: ${n.toString().padStart(10, ' ')}`;
            u32.push(<Text key="u32">u16: </Text>)
            u32.push(<Text key="vu32" color="green">{n.toString().padStart(10, ' ')}</Text>)
        }
    
        let pos = 0
        let reserverLines = 3;
        if (opts.operations)
            reserverLines++;
        const visibleLines = Math.min(rows - reserverLines, lineCount);
        const cursorLine = cursor / 16 | 0;
        const firstLine = scroll.current;
        const lastLine = scroll.current + visibleLines;
        // scrolling
        if (cursorLine >= lastLine) {
            // scroll.current++;
            scroll.current += cursorLine - lastLine + 1;
        } else if (cursorLine < firstLine) {
            // scroll.current--;
            scroll.current -= firstLine - cursorLine;
        }
    
        pos = scroll.current * 16;
        let isHighlight = (_offset: number) => false;

        //  Scroll: {scroll.current}/{lineCount}
        const title = <Text key='title'>{header} {u8} {u16} {u32}</Text>
        lines.push(title);
        if (opts.operations) {
            const opLst = [...opts.operations.entries()];
            const op = opLst.find(op => {
                return (cursor >= op[1].offset && (op[1].offset + op[1].size) > cursor)
            })
            if (op) {
                const start = op[1].offset;
                const end = start + op[1].size;
                // lines.push(<Text key="struct"><Text key="fieldName">{op[0]}</Text><Text key='lbl1'> of Type: </Text><Text key="fieldName">{op[1].type}</Text></Text>);
                const valueLine: React.Component[] = [];
                valueLine.push(<Text>Type: </Text>)
                valueLine.push(<Text color="magenta">{op[1].type.padEnd(9, ' ')}</Text>)
                valueLine.push(<Text> Name: </Text>)
                valueLine.push(<Text color="cyan">{op[0].padEnd(longestSymbol.current, ' ')}</Text>)
                valueLine.push(<Text> Value: </Text>)
                if (op[1].type === 'pointer')
                    valueLine.push(<Text color="green">0x{(op[1].get(bv.current) as Deno.PointerValue).toString(16)}</Text>)
                else
                    valueLine.push(<Text color="green">{op[1].get(bv.current)}</Text>)

                // lines.push(<Text key="struct">Type: {op[1].type.padEnd(9, ' ')} name: {op[0]} value: {op[1].get(bv.current)}</Text>);
                lines.push(<Text key="struct">{valueLine}</Text>);
                isHighlight = (offset: number) => offset >= start && offset < end;
            } else {
                const op = opLst[0];
                lines.push(<Text key="err">No maching Field</Text>);
                // lines.push(<Text key="err">No maching Field cursor: {cursor} inf {(op[1].offset >= cursor && (op[1].offset + op[1].size) < cursor) ? 'True': 'False'}</Text>);
                // lines.push(<Text key="err">No maching Field cursor: {cursor} inf {(op[1].offset >= cursor && (op[1].offset + op[1].size) > cursor) ? 'True': 'False'}</Text>);
            }
        }

    
        for (let line = 0; pos < len && line < visibleLines; line++) {
            const lineContent: React.Component[] = [];
            lineContent.push(<Text key={`idx-${pos}`} color="green">{pos.toString(16).padStart(indexLen, '0')}: </Text>);
            const max = Math.min(pos + 16, len);
            let i = 0
            const startPos = pos;
            for (; pos < max; pos++, i++) {
                let spacer = ' ';
                if (i && (i+1) % 4 === 0)
                    spacer = '   ';
                const value = buffer[pos];
                
                const ext: {inverse?: 1, dimColor?: 1, color?: Colors} = pos === cursor ? {inverse: 1} : {};
                if (isHighlight(pos)) {
                    ext.color = 'magenta'
                }
                if (value === 0)
                    ext.dimColor = 1;
                lineContent.push(<Text key={pos} {...ext}>{value.toString(16).padStart(2, '0')}</Text>);
                lineContent.push(<Text key={`p${pos}`}>{spacer}</Text>);
            }
            for (; i < 16; i++) { // padding
                let spacer = ' ';
                if (i && (i+1) % 4 === 0)
                    spacer = '   ';
                lineContent.push(<Text key={`p${pos + i}`}>  {spacer}</Text>);
            }
            // ascii
            let ascii = '';
            for (let i=startPos; i < max; i++) {
                const value = buffer[i];
                ascii += value > 31 && value < 127 ? String.fromCharCode(value) : '.';
            }
            lineContent.push(<Text key={`T${pos}`}>{ascii}</Text>);
            lines.push(<Text key={`L${pos}`}>{lineContent}</Text>);
        }
        lines.push(<Text key={`info`}>Press q or ESC to Quit</Text>);
        return <Box flexDirection="column">{lines}</Box>;
    };
    
    const instance: Instance = render(<App buffer={buffer} offset={opts.offset || 0} operations={opts.operations}/>);
    return instance;
}


