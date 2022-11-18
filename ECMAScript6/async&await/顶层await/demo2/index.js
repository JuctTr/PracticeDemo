import promise, { output } from './awaiting.js';

function outputPlusValue(value) {
    return output + value;
}

promise.then(() => {
    console.log(outputPlusValue(100)); // 120
    setTimeout(() => console.log(outputPlusValue(100)), 1000); // 120
});
