let TITLECOUNT = 0;
console.log(`<!-------------------------------- 第${++TITLECOUNT}个例子 -------------------------------->`);
@testable
class MyTestableClass {
    static isTestable: any; // 静态属性isTestable
    // ...
}

function testable(target: { isTestable: boolean }) {
    target.isTestable = true; // 静态属性isTestable
}

console.log(MyTestableClass.isTestable); // true

console.log(`<!-------------------------------- 第${++TITLECOUNT}个例子 -------------------------------->`);
// @decorator
// class A {}

// // 等同于

// class A {}
// A = decorator(A) || A;
console.log(`<!-------------------------------- 第${++TITLECOUNT}个例子 -------------------------------->`);
/**
 * 装饰器接收参数，可以修改装饰器的行为
 * @param isTestable
 * @returns
 */
function testable(isTestable: boolean) {
    return function (target: { isTestable: boolean }) {
        target.isTestable = isTestable;
    };
}

@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable; // true

@testable(false)
class MyClass {}
MyClass.isTestable; // false
console.log(`<!-------------------------------- 第${++TITLECOUNT}个例子 -------------------------------->`);

// mixins.js
function mixins(...list) {
    return function (target) {
        console.log(target);
        Object.assign(target.prototype, ...list);
    };
}

const Foo = {
    foo() {
        console.log('foo');
    },
};

@mixins(Foo)
class MyClass {}

let obj = new MyClass();
obj.foo(); // 'foo'
