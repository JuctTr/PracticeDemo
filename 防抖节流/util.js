function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
}

function isObject(val) {
    const type = typeof val;
    return val != null && (type === 'object' || type === 'function');
}
