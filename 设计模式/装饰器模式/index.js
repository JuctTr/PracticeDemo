class Decorator {}
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
