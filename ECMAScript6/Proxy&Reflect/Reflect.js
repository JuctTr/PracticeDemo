console.log(Reflect.has(Object, 'assign'));

// 老写法
console.log(Function.prototype.apply.call(Math.floor, undefined, [1.75])); // 1

// 新写法
console.log(Reflect.apply(Math.floor, undefined, [1.75])); // 1

var myObject = {
    foo: 1,
    bar: 2,
    get baz() {
        return this.foo + this.bar;
    },
};

Reflect.get(myObject, 'foo'); // 1
Reflect.get(myObject, 'bar'); // 2
Reflect.get(myObject, 'baz'); // 3

var myReceiverObject = {
    foo: 4,
    bar: 4,
};

Reflect.get(myObject, 'baz', myReceiverObject); // 8
