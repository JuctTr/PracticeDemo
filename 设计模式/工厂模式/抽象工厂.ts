// 定义操作系统这类产品的“抽象”产品类
abstract class OS {
    abstract controlHardWare(): void;
}

// 定义具体操作系统的具体产品类
class AndroidOS extends OS {
    controlHardWare() {
        console.log('我会用安卓的方式去操作硬件');
    }
}

class AppleOS extends OS {
    controlHardWare() {
        console.log('我会用🍎的方式去操作硬件');
    }
}
// ...

// 定义手机硬件这类产品的抽象产品类
abstract class HardWare {
    // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
    abstract operateByOrder(): void;
}

// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
    operateByOrder() {
        console.log('我会用高通的方式去运转');
    }
}

class MiWare extends HardWare {
    operateByOrder() {
        console.log('我会用小米的方式去运转');
    }
}
// ...

interface MobilePhoneFactory {
    // 提供操作系统的接口
    createOS(): OS;
    // 提供硬件的接口
    createHardWare(): HardWare;
}

// 具体工厂继承自抽象工厂
class FakeStarFactory implements MobilePhoneFactory {
    createOS() {
        // 提供安卓系统实例
        return new AndroidOS();
    }
    createHardWare() {
        // 提供高通硬件实例
        return new QualcommHardWare();
    }
}
