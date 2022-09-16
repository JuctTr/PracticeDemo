const len = 1000000;
const obj = {};
console.time();
for (let i = 0; i < len; i++) {
    const key = 'k' + i;
    obj[key] = 'value';
}
// let vc = 0;
// for (let i = 0; i < len; i++) {
//     const key = 'k' + i;
//     if (obj[key]) {
//         vc++;
//     }
// }
console.timeEnd();
