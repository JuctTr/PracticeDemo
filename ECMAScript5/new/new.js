/**
 * @document https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new
 * @returns
 */
module.exports = function newF (...rest) {
    // 1、创建一个空的简单JavaScript对象（即{}）；
    const obj = Object.create(null);
    // const f = {}

    // 取出第一个参数，也就是我们要传入的构造函数
    const constructor = Array.prototype.shift.call(rest);
    // 2、为步骤1新创建的对象添加属性__proto__，将该属性链接至构造函数的原型对象
    // eslint-disable-next-line no-proto
    obj.__proto__ = constructor.prototype;
    // 3、将步骤1新创建的对象作为this的上下文 ；并执行
    const result = constructor.apply(obj, rest);
    // 4、如果该函数没有返回对象，则返回this。
    return typeof result === 'object' ? result : obj;
}
