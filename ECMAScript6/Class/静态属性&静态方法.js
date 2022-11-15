class BaseClass {
    static staticProp = 'i am a static prop';
    static staticCount = 100;
    static staticObject = {
        count: 50,
    };
    static staticMethod(tips) {
        console.log(tips + 'i am a static Method');
        console.log('静态方法的this是指向函数本身，而不是实例', this.staticProp);
    }
    // 与上面的方法做对比
    staticMethod() {
        console.log('我是原型上的方法 => ');
    }
    ordinaryProp = 'i am a ordinary prop';
    ordinaryMethod() {
        console.log('i am a ordinary method');
        console.log('i use my static prop => ', this.staticProp); // undefined
        console.log('i use my static prop => ', BaseClass.staticProp); // 'i am a static prop'
    }
}
// console.dir(BaseClass);

class ChildClass extends BaseClass {
    constructor() {
        super();
        console.log(this.ordinaryProp);
        this.ordinaryMethod();
        console.log('通过软拷贝实现继承的 => ', ChildClass.staticProp); // undefined
        ChildClass.staticCount--;
        ChildClass.staticObject.count--;
        ChildClass.staticMethod('通过软拷贝实现继承的 => ');
    }
}
const bar = new ChildClass();
console.log('基类的静态属性（原始值）=> ', BaseClass.staticCount);
console.log('子类的静态属性（原始值）=> ', ChildClass.staticCount);

console.log('基类的静态属性（引用值）=> ', BaseClass.staticObject.count);
console.log('子类的静态属性（引用值）=> ', ChildClass.staticObject.count);

console.log('实例不可以获取静态属性/方法 => ', bar.staticCount);
console.log('实例不可以获取静态属性/方法，只能获取原型上的 => ', bar.staticMethod);
