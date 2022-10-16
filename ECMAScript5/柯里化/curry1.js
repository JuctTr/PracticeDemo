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
// --------------------------------- 实践例子 ----------------------------------
let list = [
    {
        name: 'lucy',
    },
    {
        name: 'jack',
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
