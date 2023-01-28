Object.prototype.myCreate = function (proto, properties) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
        throw new TypeError('');
    }
    if (properties === null) {
        throw new TypeError('');
    }

    const obj = {};

    Object.setPrototypeOf(obj, proto);

    if (properties !== undefined) {
        Object.defineProperties(obj, properties);
    }

    return obj;
};
