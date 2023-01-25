// add(1); // 1
// add(1)(2); // 3
// add(1)(2)(3); // 6
// add(1)(2, 3); // 6
// add(1, 2)(3); // 6

function inspect(x) {
    return typeof x === 'function' ? inspectFn(x) : inspectArgs(x);
}

function inspectFn(f) {
    return f.name ? f.name : f.toString();
}

function inspectArgs(args) {
    Array.prototype.slice.call(arguments, 0);
    return (
        [].slice.call(args, 0).reduce(function (acc, x) {
            return (acc += inspect(x));
        }, '(') + ')'
    );
}

function curry(fx) {
    // 函数的length属性返回函数必须传入的参数个数
    var arity = fx.length;

    return function f1() {
        var args = Array.prototype.slice.call(arguments, 0);
        // 参数个数满足的处理
        if (args.length >= arity) {
            return fx.apply(null, args);
        } else {
            // 参数个数不满足的处理
            var f2 = function f2() {
                var args2 = Array.prototype.slice.call(arguments, 0);
                return f1.apply(null, args.concat(args2));
            };
            f2.toString = function () {
                return inspectFn(fx) + inspectArgs(args);
            };
            return f2;
        }
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
