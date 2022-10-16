// add(1) // 1
// add(1); // 1
// add(1)(2); // 3
// add(1)(2)(3); // 6
// add(1)(2, 3); // 6
// add(1, 2)(3); // 6

function curry(fn) {
    // 获取第一个参数之后的所有参数
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        // 组合参数
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    };
}

function add(num1, num2, num3) {
    return num1 + num2 + num3;
}
var curriedAdd = curry(add);
console.log(curriedAdd(1, 2, 3));
// console.log(curriedAdd(1)(2)(3));
// console.log(curriedAdd(1, 2)(3));
// console.log(curriedAdd(1)(2, 3));

// bind例子

// function bind(fn, context) {
//     var args = Array.prototype.slice.call(arguments, 2);
//     return function () {
//         var innerArgs = Array.prototype.slice.call(arguments);
//         var finalArgs = args.concat(innerArgs);
//         return fn.apply(context, finalArgs);
//     };
// }
