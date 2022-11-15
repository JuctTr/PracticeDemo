class BaseClass {
    constructor() {}
    // 注意，新写法定义的属性是实例对象自身的属性，而不是定义在实例对象的原型上面。
    ordinaryProp = 'i am a ordinary prop'; // 相当于 this.ordinaryProp = xxx; 当然要在new BaseClass才会赋值
    // 而下面是相当于 BaseClass.prototype.ordinaryMethod，一旦定义了就可以访问
    ordinaryMethod() {
        console.log('i am a ordinary method');
    }
}
console.log('原型上不能够访问到 => ', BaseClass.prototype.ordinaryProp);
BaseClass.prototype.ordinaryMethod();
const base = new BaseClass();
console.log('实例能够访问到 => ', base.ordinaryProp);
