class BaseClass {
    #privateProp = 'i am a private prop';
    #privateMethod() {
        console.log('i am a private Method');
    }
    ordinaryProp = 'i am a ordinary prop';
    ordinaryMethod() {
        console.log('i am a ordinary method');
        console.log('i use my private prop => ', this.#privateProp); // 只能通过普通方法来访问私有的属性/方法
    }
}
console.dir(BaseClass);
class ChildClass extends BaseClass {
    constructor() {
        super();
        console.log(this.ordinaryProp);
        this.ordinaryMethod();
        // console.log(this.#privateProp); // 报错 // Private field '#private' must be declared in an enclosing class
        // this.#privateMethod(); // 报错
    }
}
const bar = new ChildClass();

// console.log(bar.#privateProp); // Uncaught SyntaxError: Private field '#privateProp' must be declared in an enclosing class
