import depend from './depend.js';
// 一、最新ES语法，比如：箭头函数，let/const，class
// 二、最新ES Api，比如Promise
// 三、最新ES实例/静态方法，比如String.prototype.include

const arr = [1];

const result = arr.includes(2);

console.log(result, 'result');

new Promise((resolve, reject) => {
    console.log('我是 promise');
    resolve('lalala');
}).then(res => {
    console.log(res);
});

let str = '23232342342';

str = str.padStart(30, '0');

const flatArr = [[1], [[2, 3, 4], 5]];

console.log(flatArr.flat(3));

depend.dependFunc().then(res => console.log(res));

const fn = depend.dependFunc2;

console.log(fn());

class Point {}
