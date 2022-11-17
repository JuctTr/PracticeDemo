import { log } from '../../utils.js';

log.info('================ 字符串iterator接口 ================');

var someString = 'hi';
console.log(typeof someString[Symbol.iterator]); // "function"

var iterator = someString[Symbol.iterator]();

console.log(iterator.next()); // { value: "h", done: false }
console.log(iterator.next()); // { value: "i", done: false }
console.log(iterator.next()); // { value: undefined, done: true }

log.info('================ 覆盖原生的字符串iterator接口 ================');

var str = new String('hi');

console.log([...str]); // ["h", "i"]

str[Symbol.iterator] = function () {
    return {
        next: function () {
            if (this._first) {
                this._first = false;
                return { value: 'bye', done: false };
            } else {
                return { done: true };
            }
        },
        _first: true,
    };
};

console.log([...str]); // ["bye"]
console.log(str); // "hi"
