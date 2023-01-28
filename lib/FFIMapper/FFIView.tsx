// import console from "https://deno.land/std@0.175.0/node/console.ts";
// window.console = console;

import React, {useState, useRef} from 'npm:react@17';
import {render, Text, Box, useInput, Instance } from 'npm:ink';

interface PropsBuffer {
	buffer: Uint8Array;
}

export function FFIView(buffer: Uint8Array): Instance {
    const App = ({buffer}: PropsBuffer) => {
        const { rows } = Deno.consoleSize();
        const scroll = useRef(0);
        const [ cursor, setCursor ] = useState(0);
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
        header.push(<Text key="offset">offset: </Text>)
        header.push(<Text key="offsetV" color="green">{cursor.toString(16).padStart(indexLen, '0')}</Text>)
        header.push(<Text key="valuelbl"> Value:</Text>)

        // const u8 = 	`u8: ${buffer[cursor].toString().padStart(3, ' ')}`
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
        const visibleLines = Math.min(rows - 3, lineCount);
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
    
        //  Scroll: {scroll.current}/{lineCount}
        const title = <Text key='title'>{header} {u8} {u16} {u32}</Text>
        lines.push(title);
    
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
                
                const ext: {inverse?: 1, dimColor?: 1} = pos === cursor ? {inverse: 1} : {};
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
    
    const instance: Instance = render(<App buffer={buffer}/>);
    return instance;
}


