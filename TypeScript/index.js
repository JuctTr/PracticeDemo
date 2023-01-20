/**
 * @description 该函数仅可用于该原始类型。但该函数并不是可扩展或通用的
 * @param value
 * @returns
 */
function identity1(value) {
    return value;
}
console.log(identity1(1)); // 1
/**
 * @description 使用泛型来解决这个问题
 * @param value
 * @returns
 */
function identity2(value) {
    return value;
}
console.log(identity2(1)); // 1
/**
 * 1、K（Key）：表示对象中的键类型；
 * 2、V（Value）：表示对象中的值类型；
 * 3、E（Element）：表示元素类型。
 * @description 我们可以引入希望定义的任何数量的类型变量
 * @param value
 * @param message
 * @returns
 */
function identity3(value, message) {
    console.log(message);
    return value;
}
console.log(identity3(68, 'Semlinker'));
/**
 * 使用元组
 * @param value
 * @param message
 * @returns
 */
function identity4(value, message) {
    return [value, message];
}
function identity5(value, message) {
    console.log(value + ': ' + typeof value);
    console.log(message + ': ' + typeof message);
    var identities = {
        value: value,
        message: message
    };
    return identities;
}
console.log(identity5(68, 'Semlinker'));
var IdentityClass = /** @class */ (function () {
    function IdentityClass(value) {
        this.value = value;
    }
    IdentityClass.prototype.getIdentity = function () {
        return this.value;
    };
    return IdentityClass;
}());
var myNumberClass = new IdentityClass(68);
console.log(myNumberClass.getIdentity()); // 68
var myStringClass = new IdentityClass('Semlinker!');
console.log(myStringClass.getIdentity()); // Semlinker!
// class MyComponent extends React.Component<Props, State> {
//     //  ...
// }
// ===================================== 泛型约束 =====================================
/**
 * 编译器将不会知道 T 确实含有 length 属性
 * @param arg
 * @returns
 */
function identity6(arg) {
    // console.log(arg.length); // 类型“T”上不存在属性“length”。
    return arg;
}
function identity7(arg) {
    console.log(arg.length); // 可以获取length属性
    return arg;
}
// identity7(68);
// Argument of type '68' is not assignable to parameter of type 'Length'.(2345)
function identity8(arg) {
    console.log(arg.length);
    return arg;
}
// or
function identity9(arg) {
    console.log(arg.length);
    return arg;
}
function getProperty(obj, key) {
    return obj[key];
}
