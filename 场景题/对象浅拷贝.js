const obj = {
    a: 1,
    b: '2',
    c: true,
    d: [1, 2],
};

obj.__proto__.demo = function () {
    console.log('demo function');
};

function shallowCopy(src) {
    if (src === null) return null;
    if (typeof src !== 'object') return src;
    var newObj = src.constructor === Array ? [] : {};

    Object.keys(src).forEach(key => {
        newObj[key] = src[key];
    });

    const prototype = Object.getPrototypeOf(src);
    Object.setPrototypeOf(newObj, prototype);

    return newObj;
}

const obj1 = shallowCopy(obj);
console.log(obj1);
obj1.demo();
