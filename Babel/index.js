// 一、最新ES语法，比如：箭头函数，let/const，class
// 二、最新ES Api，比如Promise
// 三、最新ES实例/静态方法，比如String.prototype.include

// 这个文件主要是是第一种的案例

// let / const

let iAmLet = 'let';
const iAmConst = 'const';

// 箭头函数

const arrowFunction = () => {
    console.log('Hello My name is juctTr');
};

// 扩展运算符
const arr = [1, 2, 3, 4, 5];
console.log(...arr);

// 解构赋值
const fuzhi = () => {
    return ['A', 'B'];
};
const [a, b] = fuzhi();

// 模板字符串
const value = '模板字符串';
const templateString = `${value}`;

// 属性名表达式

let lastWord = 'last word';

const c = {
    'first word': 'hello',
    [lastWord]: 'world',
};
// 运算符的扩展
let message = {
    body: {
        user: {
            firstName: 'jack',
        },
    },
};

let myForm = document;

const firstName = message?.body?.user?.firstName || 'default';
const fooValue = myForm.querySelector('input[name=foo]')?.value;

// 类
class Point {
    constructor() {
        // ...
    }

    xxxxmethods() {
        // ...
    }

    toString() {
        // ...
    }

    toValue() {
        // ...
    }
}

/**
 * 我们可以看出来，ES6+新增的静态方法 以及 Promise 是转化不了的，
 * 那怎么转化呢？看案例二
 */

const result = arr.includes(2);

console.log(result, 'result');

new Promise((resolve, reject) => {
    console.log('我是 promise');
    resolve('lalala');
}).then(res => {
    console.log(res);
});
