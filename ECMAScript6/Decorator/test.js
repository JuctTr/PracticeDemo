var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function addAge(number) {
    return function (target) {
        console.log(target);
        target.prototype.age = number;
    };
}
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person = __decorate([
        addAge(18)
    ], Person);
    return Person;
}());
var person = new Person('leo');
console.log(person.name); // leo
console.log(person.age); // 18
