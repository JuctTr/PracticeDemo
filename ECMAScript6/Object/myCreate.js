// 第一个参数传递null时，返回的实例原型为null
// 第一个参数类型只能是object、function或者null，否则报错。

// 第二个参数类型，不能是null，否则报错
// 第二个参数如果不为 undefined ,需要将其挂载到实例的  Object.defineProperties 上。
Object.prototype.myCreate = function (proto, defineProperties) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
        throw new TypeError(`Object prototype may only be an Object or null: ${proto}`);
    }
    if (defineProperties === null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    // 定义新对象
    const obj = {};

    // 设置原型
    // obj.__proto__ = proto // 不建议这么做了
    // 通常，应该使用 Object.setPrototypeOf() 方法来设置对象的原型。
    // 因为 Object.prototype.__proto__ 访问器已被弃用。
    Object.setPrototypeOf(obj, proto); // 建议使用setPrototypeOf设置原型

    if (defineProperties !== undefined) {
        Object.defineProperties(obj, defineProperties);
    }
    return obj;
};
console.log('============== 测试用例 =========== ');
let obj1 = { b: 2 };
let obj2 = Object.myCreate(obj1, { a: { enumerable: false } });
console.log(obj2); //{}
console.log(obj2.__proto__, obj2.b); // { b: 2 } 2

let obj3 = Object.myCreate(obj1, { a: { enumerable: true } });
console.log(obj3); // { a: undefined }
console.log(obj3.__proto__, obj3.b);

const obj4 = Object.myCreate(function father() {
    console.log('father');
});
console.log(obj4, obj4.__proto__);
// const obj5 = Object.myCreate('222'); // TypeError: Object prototype may only be an Object or null: 222
// const obj6 = Object.myCreate(obj1, null); // TypeError: Cannot convert undefined or null to object
console.log('============== 对比原生 =========== ');
// let obj5 = Object.create('222', undefined); // TypeError: Object prototype may only be an Object or null: 222
// let obj4 = Object.create(obj1, null); // TypeError: Cannot convert undefined or null to object
console.log(obj2.a); // undefined
