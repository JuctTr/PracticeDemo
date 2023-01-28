function simpleDebounce(fn, wait, options = { leading: false }) {
    const isFunction = Object.prototype.toString.call(fn) === '[object Function]';
    if (!isFunction) throw new TypeError('the func not a function');

    let timer = null;
    let result = null;
    const lastThis = this;
    const leading = options.leading;
    let isLeadingCall = false;

    return function (...args) {
        if (timer) clearTimeout(timer);

        if (leading && !isLeadingCall) {
            result = fn.apply(lastThis, args);
            isLeadingCall = true;
        }

        timer = setTimeout(() => {
            result = fn.apply(lastThis, args);
            isLeadingCall = false;
        }, wait);

        return result;
    };
}

function simpleThrottle(fn, wait, options = { leading: true }) {
    const isFunction = Object.prototype.toString.call(fn) === '[object Function]';
    if (!isFunction) throw new TypeError('the func not a function');
    let prev = 0;
    let result = null;
    const lastThis = this;

    return function (...args) {
        const now = Date.now();

        if (now - prev > wait) {
            result = fn.apply(lastThis, args);
            prev = Date.now();
        }
        return result;
    };
}
