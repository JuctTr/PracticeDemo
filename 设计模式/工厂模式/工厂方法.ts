abstract class BMW {
    abstract run(): void;
}

class BMW730 extends BMW {
    run(): void {
        console.log('BMW730 发动咯');
    }
}

class BMW840 extends BMW {
    run(): void {
        console.log('BMW840 发动咯');
    }
}

interface BMWFactory {
    produceBMW(): BMW;
}

// 通过创建不同的工厂来生产不同的产品

class BMW730Factory implements BMWFactory {
    produceBMW(): BMW {
        return new BMW730();
    }
}

class BMW840Factory implements BMWFactory {
    produceBMW(): BMW {
        return new BMW840();
    }
}

// 如新增一个产品
class BMW850Factory implements BMWFactory {
    produceBMW(): BMW {
        // return new BMW850();
    }
}

const bmw730Factory = new BMW730Factory();
const bmw840Factory = new BMW840Factory();
const bmw730 = bmw730Factory.produceBMW();
const bmw840 = bmw840Factory.produceBMW();
bmw730.run();
bmw840.run();

/**
 * 优点：
 * 1. 符合“开闭原则”（系统扩展性变好），增加新的产品时，只需要增加新的具体产品类和对应的具体工厂类即可，无须修改抽象工厂和抽象产品提供的接口
 * 2. 符合“单一职责原则”，每个具体工厂类只负责创建对应的产品。
 * 3.
 *
 * 缺点：
 * 1. 增加了系统的复杂度，需要增加多个类和接口
 * 2. 一个具体工厂只能创建一种具体产品
 */
