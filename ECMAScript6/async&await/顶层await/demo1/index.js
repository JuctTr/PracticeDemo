import { output } from './awaiting.js';

function outputPlusValue(value) {
    return output + value;
}

console.log(outputPlusValue(100));
setTimeout(() => console.log(outputPlusValue(100)), 1000);
