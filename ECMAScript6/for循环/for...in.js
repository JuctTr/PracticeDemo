'use strict';

// for ... in是为遍历对象属性而构建的，不建议与数组一起使用，数组可以用Array.prototype.forEach()和for ... of
const arr = [1, 2, 3];
Array.prototype.myProp = 'myprop';
for (let key in arr) {
    console.log(key);
}
// 0
// 1
// 2
// myProp

var obj = { b: 2, a: 1, d: 4, c: 3, 0: 'zero', 1: 'one', 2: 'two' };

// for (var prop in obj) {
//     console.log('obj.' + prop + ' = ' + obj[prop]);
// }

Object.prototype.customProp = 'customProp';

// 所有的非负整数键（那些可以成为数组索引的键）将首先按照数值的升序被遍历，然后是其他字符串键，按照属性创建的时间顺序升序。

for (var prop1 in obj) {
    if (obj.hasOwnProperty(prop1)) {
        console.log('obj.' + prop1 + ' = ' + obj[prop1]);
    }
}
console.log('=========== 使用 Object.keys() 和 Object.getOwnPropertyNames() 获取 属性（key）===============');

const obj1 = {
    name: 'jucttr',
    age: 18,
    sex: 'female',
    noEnumProp: 'noEnumProp',
    0: 0,
    1: 1,
};

Object.defineProperty(obj1, 'noEnumProp', {
    enumerable: false,
});

Object.prototype.customProp = 'customProp';

console.log(Object.keys(obj1)); // [ 'name', 'age', 'sex' ]

console.log(Object.getOwnPropertyNames(obj1)); // [ 'name', 'age', 'sex', 'noEnumProp' ]

console.log('=========== 只输出原型链上的可枚举的属性 ===============');

const emptyArr = new Array(10);
console.log(emptyArr, emptyArr.length);

for (const index in emptyArr) {
    console.log(index);
}
