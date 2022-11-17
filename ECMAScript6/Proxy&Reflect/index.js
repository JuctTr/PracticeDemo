// 拦截对象
let data = {
    const: 1,
    obj: {
        a: 1,
        b: 2,
        o: {
            a: 'inter',
            b: 2,
        },
    },
    arr: [1, 2, 3, 4, 5],
};

data = new Proxy(data, {
    get(target, propKey, receiver) {
        console.log(target, `getting ${propKey}!`, receiver);
        return Reflect.get(target, propKey, receiver);
    },
});

console.log(data.obj.o.a);

console.log('================== 拦截函数 =================');
var handler = {
    get: function (target, name) {
        if (name === 'prototype') {
            return Object.prototype;
        }
        return 'Hello, ' + name;
    },

    apply: function (target, thisBinding, args) {
        return args[0];
    },

    construct: function (target, args) {
        return { value: args[1] };
    },
};

const func = function (x, y) {
    return x + y;
};

var fproxy = new Proxy(func, handler);

console.log(fproxy(1, 2)); // 1
console.log(new fproxy(1, 2)); // {value: 2}
fproxy.prototype === Object.prototype; // true
fproxy.foo === 'Hello, foo'; // true

console.log('================== 继承 =================');

let proto = new Proxy(
    {
        foo: 'hello world',
    },
    {
        get(target, propertyKey) {
            console.log('GET ' + propertyKey);
            return target[propertyKey];
        },
    }
);

let obj = Object.create(proto);
console.log(obj.foo);

console.log('================== this问题 =================');
const target = {
    m: function () {
        console.log(this);
        // console.log(this === proxy);
    },
};

const proxy = new Proxy(target, {});

target.m(); // false
proxy.m(); // true

console.log('================== Proxy 也无法代理这些原生对象的属性 =================');
const targetDemo = new Date();
const handlerDemo = {};
const proxyDemo = new Proxy(targetDemo, handlerDemo);

proxyDemo.getDate();

// Proxy代理的是整个对象，而不是对象的某个特定属性，不需要我们通过遍历来逐个进行数据绑定。
