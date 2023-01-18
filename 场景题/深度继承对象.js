const util = require('util');

function isPlainObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
}

function mergeObj(originObj, coverObjList, deepCover) {
    console.log(coverObjList);
    if (!coverObjList.length) return originObj;
    for (const obj of coverObjList) {
        if (!isPlainObject(obj)) continue;
        Object.keys(obj).reduce((resultObj, key) => {
            if (isPlainObject(resultObj[key]) && isPlainObject(obj[key]) && deepCover) {
                resultObj[key] = mergeObj(resultObj[key], [obj[key]], true);
            } else {
                resultObj[key] = obj[key];
            }
            return resultObj;
        }, originObj || {});
    }
    return originObj || {};
}

function merge(originObj, ...coverObj) {
    console.log('start => ', coverObj);
    const deepCover = coverObj.slice(-1)[0] === true;
    return isPlainObject(originObj) ? mergeObj(originObj, coverObj, deepCover) : originObj;
}

console.log(
    util.inspect(
        merge(
            { foo: { name: 'nick', deep: { a: 'a', c: [1] } } },
            [
                { foo: { age: 18, deep: { b: 'b', c: [2] } } },
                {
                    foo: { sex: 'famle' },
                },
            ],
            true
        ),
        undefined,
        5,
        true
    )
);

function mergeObject(originObj, targetObj, deep) {
    for (var key in targetObj) {
        if (deep && originObj[key] && isPlainObject(originObj[key])) {
            originObj[key] = mergeObject(originObj[key], targetObj[key]);
        } else {
            originObj[key] = targetObj[key];
        }
    }
    return originObj;
}

console.log(
    util.inspect(
        mergeObject(
            { foo: { name: 'nick', deep: { a: 'a', c: [1] } } },
            { foo: { age: 18, deep: { b: 'b', c: [2] } }, d: 'd' },
            true
        ),
        undefined,
        5,
        true
    )
);
