const obj = {
    age: 18,
    name: 'jucttr',
    isNull: null,
    isUndefined: undefined,
    isBoolean: true,
    isFunction: function () {},
    isObject: {
        a: 1,
        b: 2,
    },
    isRegExp: new RegExp(/ab+c/, 'i'),
    isNAN: NaN,
    num: Infinity,
};
console.log(JSON.stringify(obj));
