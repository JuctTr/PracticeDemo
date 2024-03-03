import { log } from '../../utils.js';

// 严格来说不是吧，跟ES6 的 class 中的私有 概念还是有差别的，当你知道所定义的Symbol变量名和方法名，还是可以访问到的

log.info('模拟私有变量/方法');

const AGE = Symbol();
const GET_AGE = Symbol();
class User {
    constructor(name, sex, age) {
        this.name = name;
        this.sex = sex;
        this[AGE] = age;
        this[GET_AGE] = function () {
            return this[AGE];
        };
    }
    printAge() {
        console.log(this[GET_AGE]());
    }
}
// test

let u1 = new User('xm', 'M', 18);
let u2 = new User('xh', 'W', 20);
console.log(u1.name); // xm
console.log(u1.age); // undefined
u1.printAge(); // 18
console.log(u2.name); // xh
console.log(u2.age); // undefined
u2.printAge(); // 20
