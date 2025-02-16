function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}

function isObject(val) {
    const type = typeof val;
    return val != null && (type === 'object' || type === 'function');
}

// 最简单版

function debounce(func, delay) {
    let timer; // 闭包保存定时器
    return function (...args) {
        clearTimeout(timer); // 每次触发前先清空之前的定时器（持续触发则重置）
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

function debounce(func, wait, options) {
    let timer = null;
    wait = +wait || 0;
    const leading = options.leading;

    let result = null;

    // 判断函数
    if (!isFunction(func)) throw new Error('第一个参数必须为函数');
    // 判断options是否为对象，这里暂时不写
    // if (!isObject(options)) {}

    return function () {
        const thisArgs = this;
        const args = arguments;
        if (timer) clearTimeout(timer);
        // 立即执行，wait后，再把定时器设置为空，才可以重新执行
        if (leading) {
            let needCall = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait);
            if (needCall) result = func.apply(thisArgs, args);
        } else {
            timer = setTimeout(() => {
                func.apply(thisArgs, args);
            }, wait);
        }
        return result;
    };
}
