function addAge(number) {
    return function (target) {
        console.log(target);
        target.prototype.age = number;
    };
}

@addAge(18)
class Person {
    constructor(name) {
        this.name = name;
    }
}

const person = new Person('leo');
console.log(person.name); // leo
console.log(person.age); // 18
