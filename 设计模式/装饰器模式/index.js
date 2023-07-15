// =============== ES7 装饰器 ===============

// ==================== 例子1 ====================
class Decorator { }
// 装饰器函数，它的第一个参数是目标类
function classDecorator(target, name, descriptor) {
    target.hasDecorator = true;
    return target;
}

// 将装饰器“安装”到Button类上
@classDecorator
class Button {
    // Button类的相关逻辑
}

// 验证装饰器是否生效
console.log('Button 是否被装饰了：', Button.hasDecorator);


// ==================== 例子2 ====================

function funcDecorator(target, name, descriptor) {
    let originalMethod = descriptor.value
    descriptor.value = function () {
        console.log('我是Func的装饰器逻辑')
        return originalMethod.apply(this, arguments)
    }
    return descriptor
}

class Button {
    @funcDecorator
    onClick() {
        console.log('我是Func的原有逻辑')
    }
}

// 验证装饰器是否生效
const button = new Button()
button.onClick()