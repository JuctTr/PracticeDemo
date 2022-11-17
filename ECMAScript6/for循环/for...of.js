console.log('=========== 区别于for...in，for...of 会输出所有属性值，即使是 empty items ===============');

const emptyArr = new Array(10);
console.log(emptyArr, emptyArr.length);

for (const value of emptyArr) {
    // console.log(value);
}

console.log('=========== 仅输出自身的属性值 ===============');

const arr = ['name', 'age', 'sex'];

Array.prototype.customProp = 'customProp';
Object.defineProperty(arr, '2', {
    enumerable: false,
});

for (const value of arr) {
    console.log(value);
}
// name
// age
// sex

let map = new Map([
    ['a', 1],
    [{}, 2],
    [3, 1],
]);
Map.prototype.customProp = ['b', 90];
console.log(map);
for (const [mapKey, mapValue] of map) {
    console.log(mapKey, mapValue);
}
