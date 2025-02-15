// 例子1

const compose =
    (...fns) =>
    x =>
        fns.reduceRight((v, f) => f(v), x);
const toUpper = str => str.toUpperCase();
const exclaim = str => `${str}!`;

const loudGreeting = compose(exclaim, toUpper);
console.log(loudGreeting('hello')); // HELLO!

// 例子2
// 见目录 NodeJS/compose/redux.js
// 见目录 NodeJS/compose/koa.js
