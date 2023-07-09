// =============================== 例子1 ===============================
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

class BMWFactory {
    public static produceBMW(model: '730' | '840'): BMW {
        if (model === '730') {
            return new BMW730();
        } else {
            return new BMW840();
        }
    }
}

const bmw730 = BMWFactory.produceBMW('730');
const bmw840 = BMWFactory.produceBMW('840');
bmw730.run();
bmw840.run();

// =============================== 例子2 ===============================
class Factory {
    constructor(username: string, pwd: string, role: string) {
        this.username = username;
        this.pwd = pwd;
        this.role = role;
    }
}

class CreateRoleFactory {
    static create(username: string, pwd: string, role: string) {
        return new Factory(username, pwd, role);
    }
}

const admin = CreateRoleFactory.create('张三', '222', 'admin');
