// 原始函数
const add = (a, b, c) => a + b + c;

// 手动柯里化
const curriedAdd = a => b => c => a + b + c;
console.log(curriedAdd(1)(2)(3)); // 6

// 通用柯里化工具函数
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return (...nextArgs) => curried.apply(this, args.concat(nextArgs));
        }
    };
}

const curriedAddAuto = curry(add);
console.log(curriedAddAuto(1, 2)(3)); // 6（支持混合参数传递）
console.log(curriedAddAuto(1)(2)(3)); // 6
