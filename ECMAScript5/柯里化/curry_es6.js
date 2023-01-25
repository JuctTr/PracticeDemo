function curry(fn) {
    const fnParamsLength = fn.length;

    return function curried(...args) {
        if (args.length >= fnParamsLength) {
            return fn.apply(null, args);
        }
        // 传入的参数个数，如果比 被柯里化的函数参数 还多，那么就再返回一个函数
        const returnFn = function returnFn(...args2) {
            return curried.apply(null, [...args, ...args2]);
        };
        return returnFn;
    };
}

const addNum = (a, b, c) => {
    return a + b + c;
};

const curriedAdd = curry(addNum);

console.log(curriedAdd(1, 2, 3));
console.log(curriedAdd(1)(2)(3));
console.log(curriedAdd(1, 2)(3));
console.log(curriedAdd(1)(2, 3));
