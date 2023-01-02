export let counter = 3;
export function incCounter() {
    counter++;
}

var __getOwnPropNames = Object.getOwnPropertyNames;

var __commonJS = function (cb, mod) {
    return function __require() {
        console.log('一开始传进来的 => ', cb, mod);

        const a = (0, cb[__getOwnPropNames(cb)[0]]);

        console.log('a => ', a);

        const b = a((mod = { exports: {} }).exports, mod);

        console.log('b => ', b);

        console.log(mod);

        return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
};

export { __commonJS };
