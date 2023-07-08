// 存储副作用函数的桶
const bucket = new Set();

// 原始数据
const data = { text: 'hello world' };

// 用一个全局变量存储被注册的副作用函数
let activeEffect;
// effect 函数用于注册副作用函数
function effect(fn) {
    // 当调用 effect 注册副作用函数时，将副作用函数 fn 赋值给 activeEffect
    activeEffect = fn;
    // 执行副作用函数
    fn();
}

const obj = new Proxy(data, {
    get(target, key) {
        // 将 activeEffect 中存储的副作用函数收集到“桶”中
        if (activeEffect) {
            // 新增
            bucket.add(activeEffect);
        } //新增
        return target[key];
    },
    set(target, key, newVal) {
        target[key] = newVal;
        bucket.forEach(fn => fn());
        return true;
    },
});

effect(
    // 匿名副作用函数
    () => {
        console.log('effect run'); // 会打印 2 次
        document.body.innerText = obj.text;
    });

setTimeout(() => {
    // 副作用函数中并没有读取 notExist 属性的值
    obj.notExist = 'hello vue3';
}, 1000)
