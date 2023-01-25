/**
 * ES5 的写法
 * @param {*} fn
 * @returns
 */
function curry(fn) {
    var fnParamsLength = fn.length;
    var args2 = Array.prototype.slice.call(arguments, 1);

    return function curried() {
        var args = Array.prototype.slice.call(arguments, 0);
        var allArgs = args2.concat(args);

        if (allArgs.length >= fnParamsLength) {
            return fn.apply(null, allArgs);
        }
        return curry.apply(null, [fn].concat(allArgs));
    };
}
/**
 * ES6的写法
 * @param {*} func
 * @param  {...any} args
 * @returns
 */
// function curry(func, ...args) {
//     return function (...args2) {
//         const allArgs = args.concat(args2);

//         if (allArgs.length >= func.length) {
//             return func.apply(null, allArgs);
//         }
//         return curry.apply(null, [func, ...allArgs]);
//     };
// }

const addNum = (a, b, c) => {
    return a + b + c;
};

const curriedAdd = curry(addNum);

console.log(curriedAdd(1, 2, 3));
console.log(curriedAdd(1)(2)(3));
console.log(curriedAdd(1, 2)(3));
console.log(curriedAdd(1)(2, 3));
