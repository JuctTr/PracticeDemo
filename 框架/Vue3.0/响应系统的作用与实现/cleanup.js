
// 存储副作用函数的桶
const bucket = new WeakMap()

// 用一个全局变量存储被注册的副作用函数
let activeEffect;
// effect 函数用于注册副作用函数
function effect(fn) {
    const effectFn = () => {
        cleanup(effectFn);
        // 当 effectFn 执行时，将其设置为当前激活的副作用函数
        activeEffect = effectFn;
        fn();
    }
    // activeEffect.deps 用来存储所有与该副作用函数相关联的依赖集合
    effectFn.deps = [];
    // 执行副作用函数
    effectFn();
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
// 在 track 函数中我们将当前执行的副作用函数 activeEffect 添加到依赖集合 deps 中，这说明 deps 就是一个与 当前副作用函数存在联系的依赖集合，于是我们也把它添加到 activeEffect.deps 数组中，这样就完成了对依赖集合的收集
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
    // 将当前激活的副作用函数添加到依赖集合 deps 中
    deps.add(activeEffect);
    // deps 就是一个与当前副作用函数存在联系的依赖集合
    // 将其添加到 activeEffect.deps 数组中
    activeEffect.deps.push(deps); // 新增
}
// 在 set 拦截函数内调用 trigger 函数触发变化
function trigger(target, key) {
    const depsMap = bucket.get(target);
    if (!depsMap) return;
    const effects = depsMap.get(key);
    effects && effects.forEach(fn => fn());
}

function cleanup (effectFn) {
    // 遍历 effectFn.deps 数组
    for (let i = 0; i < effectFn.deps.length; i++) {
        // deps 是依赖集合
        const deps = effectFn.deps[i];
        // 将 effectFn 从 依赖集合 中删除
        deps.delete(effectFn);
    }
    // 最后需要重置 effectFn.deps 数组
    effectFn.deps.length = 0;
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
