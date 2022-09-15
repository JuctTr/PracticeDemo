var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var TITLECOUNT = 0;
console.log("<!-------------------------------- \u7B2C".concat(++TITLECOUNT, "\u4E2A\u4F8B\u5B50 -------------------------------->"));
// @testable
// class MyTestableClass {
//     static isTestable: any; // 静态属性isTestable
//     // ...
// }
// function testable(target: { isTestable: boolean }) {
//     target.isTestable = true; // 静态属性isTestable
// }
// console.log(MyTestableClass.isTestable); // true
console.log("<!-------------------------------- \u7B2C".concat(++TITLECOUNT, "\u4E2A\u4F8B\u5B50 -------------------------------->"));
// @decorator
// class A {}
// // 等同于
// class A {}
// A = decorator(A) || A;
console.log("<!-------------------------------- \u7B2C".concat(++TITLECOUNT, "\u4E2A\u4F8B\u5B50 -------------------------------->"));
/**
 * 装饰器接收参数，可以修改装饰器的行为
 * @param isTestable
 * @returns
 */
// function testable(isTestable: boolean) {
//     return function (target: { isTestable: boolean }) {
//         target.isTestable = isTestable;
//     };
// }
// @testable(true)
// class MyTestableClass {}
// MyTestableClass.isTestable; // true
// @testable(false)
// class MyClass {}
// MyClass.isTestable; // false
console.log("<!-------------------------------- \u7B2C".concat(++TITLECOUNT, "\u4E2A\u4F8B\u5B50 -------------------------------->"));
// mixins.js
function mixins() {
    var list = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        list[_i] = arguments[_i];
    }
    return function (target) {
        console.dir(target);
        Object.assign.apply(Object, __spreadArray([target.prototype], list, false));
    };
}
var Foo = {
    foo: function () {
        console.log('foo');
    }
};
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    MyClass = __decorate([
        mixins(Foo)
    ], MyClass);
    return MyClass;
}());
var obj = new MyClass();
obj.foo(); // 'foo'
