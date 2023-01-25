function curry(fn) {
    var fnParamsLength = fn.length;

    return function curried() {
        var args = Array.prototype.slice.call(arguments, 0);

        if (args.length >= fnParamsLength) {
            return fn.apply(null, args);
        }
        // 传入的参数个数，如果比 被柯里化的函数参数 还多，那么就再返回一个函数
        var returnFn = function returnFn() {
            var args2 = Array.prototype.slice.call(arguments, 0);
            return curried.apply(null, args.concat(args2));
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

// --------------------------------- 实践例子 ----------------------------------
let list = [
    {
        name: 'lucy',
        age: 18,
    },
    {
        name: 'jack',
        age: 20,
    },
];
// 普通写法

let names = list.map(function (item) {
    return item.name;
});
console.log(names);

// 柯里化写法

const props = curry(function (key, obj) {
    return obj[key];
});

let names1 = list.map(props('name'));
console.log(names1);
