import { log } from '../../utils.js';

/**
 * 一个对象如果要具备可被for...of循环调用的 Iterator 接口，
 * 就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）
 */

log.info('================ 类似数组的对象调用数组的Symbol.iterator方法 ================');
let iterable = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator],
};
for (let item of iterable) {
    console.log(item); // 'a', 'b', 'c'
}
log.info('================ 普通对象部署数组的Symbol.iterator方法，并无效果。 ================');
let iterable1 = {
    a: 'a',
    b: 'b',
    c: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator],
};
for (let item of iterable1) {
    console.log(item); // undefined, undefined, undefined
}

log.info('================ 只是调用了Symbol.iterator方法，并无达到我们的目的 ================');

const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    [Symbol.iterator]: function () {
        var nextIndex = 0;
        return {
            next: function () {
                return nextIndex < 3 ? { value: nextIndex++, done: false } : { value: undefined, done: true };
            },
        };
    },
};
console.log(obj);

for (let value of obj) {
    console.log(value);
}

log.info('================ 生成器 ================');

let myIterable = {
    a: 1,
    [Symbol.iterator]: function* () {
        yield 1;
        yield 2;
        yield 3;
    },
};
console.log(myIterable);
console.log([...myIterable]); // [1, 2, 3]
