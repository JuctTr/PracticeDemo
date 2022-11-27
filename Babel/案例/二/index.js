// @babel/polyfill被废弃它变成另外两个包的集成。"core-js/stable"; "regenerator-runtime/runtime";
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// 一、最新ES语法，比如：箭头函数，let/const，class
// 二、最新ES Api，比如Promise
// 三、最新ES实例/静态方法，比如String.prototype.include

// 这个文件主要是是第二种的案例

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
