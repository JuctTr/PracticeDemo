// 子类实例的构建，必须先完成父类的继承，只有super()方法才能让子类实例继承父类。
// class BaseClass {
//     constructor() {
//         console.log(new.target.name);
//     }
// }

// class ChildClass extends BaseClass {
//     // 默认加入
//     // constructor() {
//     //     super();
//     // }
// }
// console.dir(ChildClass);
// const child = new ChildClass();

class BaseClass {
    constructor() {
        console.log(new.target.name);
        // this.ordinaryProp = 'i am a ordinary prop';
        this.x = 0;
    }

    ordinaryProp = 'i am a ordinary prop'; // new 操作时等同于 this.ordinaryProp = 'i am a ordinary prop';

    ordinaryMethod() {
        console.log('i am a ordinary method', this.x);
    }
    static staticProp = 'i am a static prop from BaseClass';
    static staticMethod(tips) {
        console.log(tips + 'i am a static Method from BaseClass');
    }
}

class ChildClass extends BaseClass {
    constructor() {
        // 作为函数
        super(); // 相当于 BaseClass.prototype.constructor.call(this)

        this.x = 2;

        // 作为对象
        super.ordinaryMethod(); // 相当于 BaseClass.prototype.ordinaryMethod()
        // 可以理解为 super === BaseClass.prototype
        // 发生函数调用时，实际是 super.ordinaryMethod.call(this)

        // super 里面的 this 指向的是当前子类实例
    }
}

new BaseClass();
console.dir(ChildClass);
const child = new ChildClass(); // 说明super()内部的this指向的是B

console.log(child.__proto__ === ChildClass.prototype);
console.log(ChildClass.__proto__ === BaseClass);
console.log(BaseClass.__proto__ === Function.prototype);
console.log(Function.__proto__ === Function.prototype);
console.log(Function.prototype.__proto__ === Object.prototype);
