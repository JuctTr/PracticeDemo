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
    f: function fn(p1, p2) {},
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
console.log(genNewObj.a === souceObj.a);
console.log(genNewObj.d === souceObj.d);
console.log(genNewObj.r === souceObj.r);

// let f = new Function('args', 'args2', "console.log('sdlfjsld')")
// function anonymous(args, args2) {
//     console.log('sdlfjsld');
// }

// let f = new Function("console.log('sdlfjsld')")
// function anonymous() {
//     console.log('sdlfjsld');
// }

/**
 * 克隆函数
 * @param {*} func
 * @returns
 */
function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    console.log(funcString);
    if (func.prototype) {
        const param = paramReg.exec(funcString);
        console.log('普通函数', param);
        const body = bodyReg.exec(funcString);
        if (body) {
            console.log('匹配到函数体：', body[0]);
            if (param) {
                const paramArr = param[0].split(',');
                console.log('匹配到参数：', paramArr);
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else {
        return eval(funcString);
    }
}

const fn = function (a, b) {
    console.log(a, b);
};

console.log(cloneFunction(fn));
