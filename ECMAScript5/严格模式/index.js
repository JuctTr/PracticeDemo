'use strict';
console.log('================== 全局 =================');
// 例子1
console.log(this); // window
// 例子2
window.name = 'ByteDance';
function A() {
    this.name = '123';
}
A.prototype.getA = function () {
    console.log(this);
};
const a = new A();

const funcA = a.getA;
funcA(); // undefined

// 例子3，此用例在非严格模式下都是都是打印 undefined ，属于ES6的范围
// class A1 {
//     constructor() {
//         this.name = '123';
//     }
//     getA1() {
//         console.log(this);
//         // return this.name;
//     }
// }
// const a1 = new A1();
// const funcA1 = a1.getA1;
// funcA1();

console.log('================== 变量 =================');
// person = 'outerName';
// Uncaught ReferenceError: person is not defined

// let color = 'red';
// delete color;
// Uncaught SyntaxError: Delete of an unqualified identifier in strict mode

// let package = 222;
// Uncaught SyntaxError: Unexpected strict mode reserved word

console.log('================== 对象 =================');
// 同名属性
// let obj = {
//     a: 1,
//     a: 2,
// };
// console.log(obj);

// 只读属性
// let obj2 = {
//     a: 1,
// };
// Object.defineProperty(obj2, 'a', {
//     writable: false,
// });
// console.log(obj2);
// obj2.a = 3;
// Uncaught TypeError: Cannot assign to read only property 'a' of object '#<Object>'

// 不可配置属性
// let obj3 = {};
// Object.defineProperty(obj3, 'b', {
//     configurable: false,
//     value: 123,
// });
// console.log(obj3);
// delete obj3.b;
// Uncaught TypeError: Cannot delete property 'b' of #<Object>

console.log('================== 函数 =================');
// 以下严格模式下 ，在Chrome实测不会报错
// if (true) {
//     function doSomething() {
//         // ...
//         console.log('doSomething');
//     }
//     doSomething();
// }

// function factorial(num) {
//     console.log(arguments.callee);
//     console.log(arguments.caller);
// }
// factorial(4);

function showValue(value) {
    value = 'Foo';
    console.log(value); // "Foo"
    console.log(arguments[0]); // 非严格模式:"Foo" // 严格模式:"Hi"
}
showValue('Hi');

console.log('================== this =================');
// function foo() {
//     console.log(this);
// }
// foo.call(); // Window {} // 严格模式下  undefined 非严格模式 window
// foo.call(2); // Number {2} // 严格模式下 2

console.log('================== eval =================');
// function doSomething() {
//     eval('var x = 10');
//     alert(x);
// }
// doSomething();
