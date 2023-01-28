/**
 * 防抖和节流的共同点：限制函数频繁多次调用
 * 1、防抖：你不断的触发函数，我需要在你最终触发的那一次，再等待wait毫秒后执行一次即可
 *
 * 下面所说的 调用和触发不是同一个意思，也就是 调用 != (触发 == 执行)
 * 我不用触发这个词，有点模糊，更倾向于 调用函数 =》执行函数
 * 调用只是一个前置动作，执行已经是一个过程了，而触发这个词，到底是倾向于调用还是执行，不太好说
 * 借鉴：https://github.com/lodash/lodash/blob/master/debounce.js
 */

/**
 * @description
 * @param {Function} func
 * @param {Number} wait
 * @param {Object} options
 * @returns
 */
export default function debounce(func, wait, options) {
    // 1、判断是否是函数
    const isFunction = Object.prototype.toString.call(func) === '[object Function]';
    if (!isFunction) return new Error('the func not a function');

    let timerId = null;
    let leading = false; // 是否在wait第一刻执行一次
    let trailing = true;
    let lastArgs = null;
    let lastThis = null;

    let lastCallTime = null; // 离当前最近的一次（上次）调用 函数的时间
    let lastExecuteTime = 0; // 离当前最近的一次（上次）执行 函数的时间

    let maxing = false;
    let maxWait = 0;
    let result = null;

    wait = +wait || 0;
    if (Object.prototype.toString.call(options) === '[object Object]') {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? Math.max(options.maxWait || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    function shouldExecute(time) {
        const timeSinceLastCall = time - lastCallTime; // 当前时间距离上次(最近的一次) 调用 函数的时间差
        const timeSinceLastExecute = time - lastExecuteTime; // 当前时间距离上次(最近的一次) 执行 函数的时间差

        // 1、一开始 最近一次“调用”函数的时间为空
        // 2、当前时间 - 最近的一次“调用”函数 的时间差，大于等于 等待的时间
        // 3、当前时间 - 最近的一次“执行”函数 的时间差，大于等于 延迟的时间
        return (
            lastCallTime === null ||
            timeSinceLastCall >= wait ||
            timeSinceLastCall < 0 ||
            (maxing && timeSinceLastExecute >= maxWait)
        );
    }

    function executeFunction(time) {
        const args = lastArgs;
        const thisArg = lastThis;

        lastArgs = null;
        lastThis = null;
        lastExecuteTime = time; // 执行了，把最终执行的时间赋值给lastExecuteTime
        result = func.apply(thisArg, args);
        return result;
    }

    function leadingExecute(time) {
        console.warn('method: leadingExecute; first click action ');
        lastExecuteTime = time;
        timerId = setTimeout(timerExpired, wait);
        return leading ? executeFunction(time) : result;
    }

    /**
     * @description wait最后一刻执行，trailing 中文是尾随、落后的意思
     * @param {*} time
     * @returns
     */
    function trailingExecute(time) {
        timerId = null;

        // 只有当lastArgs有值才触发，说明了debounced至少调用了一次（注意：这里是说 调用 ，而不是 执行 ）
        if (trailing && lastArgs) {
            return executeFunction(time);
        }
        lastArgs = null;
        lastThis = null;
        return result;
    }

    function remainingWait(time) {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastExecute = time - lastExecuteTime;
        const timeWaiting = wait - timeSinceLastCall; // 有两种情况，大于0 和 小于 0

        return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastExecute) : timeWaiting;
    }

    function timerExpired() {
        const currentTime = Date.now();
        if (shouldExecute(currentTime)) {
            return trailingExecute(currentTime);
        }

        timerId = setTimeout(timerExpired, remainingWait(currentTime));
    }

    function debounced(...args) {
        const currentTime = Date.now();

        const isExecuting = shouldExecute(currentTime);

        lastArgs = args; // 函数的参数
        lastThis = this; // this上下文
        lastCallTime = currentTime; // 频繁触发，最后一次 调用 函数的时间

        if (isExecuting) {
            // 用户第一次点击执行 leadingExecute
            if (timerId === null) return leadingExecute(lastCallTime);

            if (maxing) {
                // 在有maxWait下，出现大量的调用可能会触发executeFunction，这里简化处理
                timerId = setTimeout(timerExpired, wait);
                return executeFunction(lastCallTime);
            }
        }

        if (timerId === null) {
            console.warn('method: debounced; timerId is null');
            timerId = setTimeout(timerExpired, wait);
        }
        return result;
    }

    function cancel() {
        // 清楚定时器
        if (timerId !== null) {
            clearTimeout(timerId);
        }
        // 参数恢复出厂设置
        lastExecuteTime = 0;
        lastArgs = null;
        lastCallTime = null;
        lastThis = null;
        timerId = null;
    }

    // 直接触发
    function flush() {
        return timerId === null ? result : trailingExecute(Date.now());
    }

    debounced.cancel = cancel;
    debounced.flush = flush;

    return debounced;
}

export function throttle(func, wait, options) {
    let leading = true;
    let trailing = true;

    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }
    if (Object.prototype.toString.call(options) === '[object Object]') {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    return debounce(func, wait, {
        leading,
        trailing,
        maxWait: wait,
    });
}
