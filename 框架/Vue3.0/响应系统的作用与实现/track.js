
// 存储副作用函数的桶
const bucket = new WeakMap()

// 用一个全局变量存储被注册的副作用函数
let activeEffect;
// effect 函数用于注册副作用函数
function effect(fn) {
    // 当调用 effect 注册副作用函数时，将副作用函数 fn 赋值给 activeEffect
    activeEffect = fn;
    // 执行副作用函数
    fn();
}


// 原始数据
const data = { text: 'hello world' };


const obj = new Proxy(data, {
    // 拦截读取操作
    get(target, key) {
        // 将副作用函数 activeEffect 添加到存储副作用函数的桶中
        track(target, key);
        // 返回属性值
        return target[key];
    },
    // 拦截设置操作
    set(target, key, newVal) {
        // 设置属性值 target[key] = newVal
        // 把副作用函数从桶里取出并执行
        trigger(target, key);
    },
});

// 在 get 拦截函数内调用 track 函数追踪变化
function track(target, key) {
    // 没有 activeEffect，直接 return
    if (!activeEffect) return;
    let depsMap = bucket.get(target);
    if (!depsMap) {
        bucket.set(target, (depsMap = new Map()));
    }
    let deps = depsMap.get(key);
    if (!deps) {
        depsMap.set(key, (deps = new Set()));
    }
    deps.add(activeEffect);
}
// 在 set 拦截函数内调用 trigger 函数触发变化
function trigger(target, key) {
    const depsMap = bucket.get(target);
    if (!depsMap) return;
    const effects = depsMap.get(key);
    effects && effects.forEach(fn => fn());
}


effect(
    // 匿名副作用函数
    () => {
        console.log('effect run');
        document.body.innerText = obj.text;
        obj.noExist = 'noExist';
    });

effect(
    // 匿名副作用函数
    () => {
        console.log('effect run2');
        obj.noExist
    });

console.log(bucket);