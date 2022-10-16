function curry(func) {
    return function curried(...args) {
        if (func.length > args.length) {
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
        return func.apply(this, args);
    };
}

const customizeFun = (a, b, c) => {
    return a + b + c;
};

const curryAdd = curry(customizeFun);

console.log(curryAdd(1, 2, 3));
console.log(curryAdd(1, 2)(3));
console.log(curryAdd(1)(2)(3));
console.log(curryAdd(1)(2, 3));
