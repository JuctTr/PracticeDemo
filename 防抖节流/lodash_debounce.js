// import isObject from './isObject.js';
// import root from './.internal/root.js';

const root = window || null;

function isObject(val) {
    const type = typeof val;
    return val != null && (type === 'object' || type === 'function');
}

/**
 * 创建一个“防抖函数”，延迟调用 func 直到自上次调用防抖函数后经过 `wait` 毫秒，或者直到绘制下一个浏览器框架（下一次事件循环）。
 * debounced 函数带有一个 `cancel` 方法来取消延迟的`func` 调用
 * 和一个 `flush` 方法来立即调用它。
 * 提供 `options` 来指示是否应该在 `wait` 超时的前沿（前一刻）和/或后沿（后一刻）调用 `func`。
 * `func` 是使用提供给“防抖函数”的最后一个参数调用的。
 * 对“防抖函数”的后续调用返回最后一次 func 调用的结果。
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * If `wait` is omitted in an environment with `requestAnimationFrame`, `func`
 * invocation will be deferred until the next frame is drawn (typically about
 * 16ms).
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `debounce` and `throttle`.
 *
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0]
 *  The number of milliseconds to delay; if omitted, `requestAnimationFrame` is
 *  used (if available).
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false] // wait的第一刻执行
 * @param {number} [options.maxWait] // `func` 在被调用之前被允许延迟的最长时间。也就是说，maxWait之后，必须要执行了，这里在节流应用到
 * @param {boolean} [options.trailing=true] // wait的最后一刻执行
 * @returns {Function} 返回一个新的 debounced 函数.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', debounce(calculateLayout, 150))
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }))
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * const debounced = debounce(batchLog, 250, { 'maxWait': 1000 })
 * const source = new EventSource('/stream')
 * jQuery(source).on('message', debounced)
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel)
 *
 * // Check for pending invocations.
 * const status = debounced.pending() ? "Pending..." : "Ready"
 */
function debounce(func, wait, options) {
    let lastArgs,
        lastThis,
        maxWait, // `func` 在被调用之前被允许延迟的最长时间。也就是说，maxWait之后，必须要执行了，这里在节流应用到
        result,
        timerId,
        lastCallTime; // 离当前最近的一次（上次）调用 函数的时间

    let lastInvokeTime = 0; // 离当前最近的一次（上次）执行 函数的时间
    let leading = false;
    let maxing = false;
    let trailing = true;

    // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
    const useRAF = !wait && wait !== 0 && typeof root.requestAnimationFrame === 'function';

    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }
    wait = +wait || 0;
    if (isObject(options)) {
        leading = !!options.leading;
        maxing = 'maxWait' in options;
        maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }

    /**
     * 调用动作
     * 设置leading 或者 节流 都会在一开始就执行这个函数，
     * 而我们要关注这个函数，会把lastArgs 和 lastThis 设置为 undefined
     * @param {*} time
     * @returns
     */
    function invokeFunc(time) {
        const args = lastArgs;
        const thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        // 执行`func`函数
        result = func.apply(thisArg, args);
        console.log('在经过wait后执行一次');
        return result;
    }

    function startTimer(pendingFunc, wait) {
        if (useRAF) {
            root.cancelAnimationFrame(timerId);
            return root.requestAnimationFrame(pendingFunc);
        }
        return setTimeout(pendingFunc, wait);
    }

    function cancelTimer(id) {
        if (useRAF) {
            return root.cancelAnimationFrame(id);
        }
        clearTimeout(id);
    }

    function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = startTimer(timerExpired, wait);
        // 如 前沿（wait的前一刻） 变量为 true，直接调用函数，反之返回result
        return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;
        const timeWaiting = wait - timeSinceLastCall;

        return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }

    function shouldInvoke(time) {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;

        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        /**
         * 1、要么是第一次调用
         * 2、要么是延迟时间已经走到 wait 的尾部（最后一刻）
         * 3、要么是 系统时间 发生后退
         * 4、要么是已经达到了maxWait的极限（节流场景）
         * 以上这些条件，就返回true
         */
        return (
            lastCallTime === undefined ||
            timeSinceLastCall >= wait ||
            timeSinceLastCall < 0 ||
            (maxing && timeSinceLastInvoke >= maxWait)
        );
    }

    /**
     *
     * @returns
     */
    function timerExpired() {
        const time = Date.now();
        const isInvoking = shouldInvoke(time);
        console.log(isInvoking, 'timerExpired');
        if (isInvoking) {
            return trailingEdge(time);
        }
        // Restart the timer.
        timerId = startTimer(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
        timerId = undefined; // 当前本次定时器执行完了，才把timerId设置为 undefined
        /**
         * trailing 默认为true
         * 只有当`lastArgs` 有值才调用，这意味着 `func`至少被调用过一次了
         */
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
    }

    function debounced(...args) {
        const time = Date.now();
        const isInvoking = shouldInvoke(time); // 如反复点击（触发），这个变量就为false
        console.log(isInvoking, '如反复点击（触发），这个变量就为false');

        lastArgs = args;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime);
            }
            /**
             * 这个逻辑可以先不看
             */
            if (maxing) {
                // Handle invocations in a tight loop.
                timerId = startTimer(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) {
            // 反复点击期间，timerId 不为 undefined，所以这个逻辑在反复点击时，并不会走到
            console.log('反复点击期间，timerId 不为 undefined，所以这个逻辑在反复点击时，并不会走到');
            timerId = startTimer(timerExpired, wait);
        }
        return result;
    }

    function cancel() {
        if (timerId !== undefined) {
            cancelTimer(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
        return timerId === undefined ? result : trailingEdge(Date.now());
    }

    function pending() {
        return timerId !== undefined;
    }

    debounced.cancel = cancel;
    debounced.flush = flush;
    debounced.pending = pending;
    return debounced;
}

// export default debounce;

function throttle(func, wait, options) {
    let leading = true;
    let trailing = true;

    if (typeof func !== 'function') {
        throw new TypeError('Expected a function');
    }
    if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    return debounce(func, wait, {
        leading,
        trailing,
        maxWait: wait,
    });
}
