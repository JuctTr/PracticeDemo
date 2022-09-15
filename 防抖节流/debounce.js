function isFunction(fn) {
    return Object.prototype.toString.call(fn) === '[object Function]';
}

function isObject(val) {
    const type = typeof val;
    return val != null && (type === 'object' || type === 'function');
}

function debounce(func, options) {
    let timer = null;
    const wait = options.wait;
    const leading = options.leading;

    let result = null;

    // 判断函数
    if (!isFunction(func)) throw new Error('第一个参数必须为函数');
    // 判断options是否为对象，这里暂时不写

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
