class Animal {
    public name;
    public constructor(name: string) {
        this.name = name;
    }
}

let animal = new Animal('Jack');
console.log(animal.name); // Jack
animal.name = 'Tom';
console.log(animal.name); // Tom

// ============== 类与接口 ==================

interface Alarm {
    alert(): void;
}

class Door {}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert');
    }
}

class Car implements Alarm {
    alert() {
        console.log('Car alert');
    }
}
