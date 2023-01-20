// @deno-types="npm:@types/sharp"
import sharp from 'npm:sharp@0.31.2';
console.log(sharp.format)
sharp('./img/darth_vader_512.png').resize(128).toFile('./img128.jpg');
