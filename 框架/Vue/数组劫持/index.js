/**
 * 以下是从Vue 源码复制出来的部分代码
 * 可以看出来 Vue是对数组的原型（prototype）的原型方法进行劫持
 */
const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);

const methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true,
    });
}

methodsToPatch.forEach(function (method) {
    // cache original method
    const original = arrayProto[method];
    def(arrayMethods, method, function mutator(...args) {
        const result = original.apply(this, args);
        const ob = this.__ob__;
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
        }
        if (inserted) ob.observeArray(inserted);
        // notify change
        ob.dep.notify();
        return result;
    });
});
