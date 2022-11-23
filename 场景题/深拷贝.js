/**
 * 简单版的深拷贝：
 * 不支持set，Map，Symbol，循环引用，普通/箭头函数
 * 详细的深拷贝：
 * https://github.com/lodash/lodash/blob/master/.internal/baseClone.js
 */
const souceObj = {
    n: 1,
    b: true,
    s: 'string',
    _null: null,
    _undefined: undefined,
    d: new Date(),
    r: /\d/,
    a: [
        {
            a_n: 1,
            a_b: true,
            a_s: 'string',
            a_null: null,
            a_undefined: undefined,
            a_d: new Date(),
            a_r: /\d/,
        },
        1,
        true,
        'string',
        /\d/,
        new Date(),
    ],
    f: function fn() {},
};
function clone(obj, deepClone) {
    if (obj === null) return null;

    if (typeof obj !== 'object') return obj;
    if (obj.constructor === Date) return new Date(obj);
    if (obj.constructor === RegExp) return new RegExp(obj);
    // if (obj.__proto__.constructor === RegExp) return new RegExp(obj);
    // if (obj.__proto__.constructor === Date) return new Date(obj);
    // var newObj = obj.__proto__.constructor === Array ? [] : {};
    var newObj = obj.constructor === Array ? [] : {};
    Object.keys(obj).forEach(key => {
        newObj[key] = deepClone ? clone(obj[key], deepClone) : obj[key];
    });
    return newObj;
}
const genNewObj = clone(souceObj, true);
console.log(genNewObj);
console.log(genNewObj.f === souceObj.f);

// let f = new Function('args', 'args2', "console.log('sdlfjsld')")
// function anonymous(args, args2) {
//     console.log('sdlfjsld');
// }

// let f = new Function("console.log('sdlfjsld')")
// function anonymous() {
//     console.log('sdlfjsld');
// }
