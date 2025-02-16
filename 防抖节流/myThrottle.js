import { isFunction } from './util';
// 两种最简单的方式

// 时间戳版（首次立即执行）
function throttle(func, delay) {
    // 判断函数
    if (!isFunction(func)) throw new Error('第一个参数必须为函数');

    var context, args;
    let lastExecTime = 0; // 闭包保存上一次执行时间

    return function () {
        var now = Date.now();
        context = this;
        args = arguments;
        if (now - lastExecTime > delay) {
            func.apply(context, args);
            lastExecTime = now;
        }
    };
}

// 定时器版（末次延迟执行）
function throttle(func, delay) {
    // 判断函数
    if (!isFunction(func)) throw new Error('第一个参数必须为函数');

    let timerId = null;

    return function () {
        const lastThis = this;
        const lastArgs = arguments;
        if (timerId) return;

        timerId = setTimeout(() => {
            func.apply(lastThis, lastArgs);
            clearTimeout(timerId);
        }, delay);
    };
}
