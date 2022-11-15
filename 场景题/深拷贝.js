function clone(obj, deepClone) {
    if (obj === null) return null;
    if (typeof obj !== 'object') return obj;
    if (obj.constructor === Date) return new Date(obj);
    if (obj.constructor === RegExp) return new RegExp(obj);
    var newObj = obj.constructor === Array ? [] : {};
    Object.keys(obj).forEach(key => {
        newObj[key] = deepClone ? clone(obj[key], deepClone) : obj[key];
    });
    return newObj;
}

console.log(
    clone(
        {
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
        },
        true
    )
);
