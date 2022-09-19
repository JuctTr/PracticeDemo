let TITLECOUNT = 0;
const arr = [
    1,
    1,
    'true',
    'true',
    true,
    true,
    15,
    15,
    false,
    false,
    undefined,
    undefined,
    null,
    null,
    NaN,
    NaN,
    'NaN',
    0,
    0,
    'a',
    'a',
    {},
    {},
];
console.log(
    `<!-------------------------------- 第${++TITLECOUNT}个例子，利用ES6 Set去重（ES6中最常用） -------------------------------->`
);
function unique(arr) {
    return Array.from(new Set(arr));
}
/**
 * {} 这种不能够去重，毕竟是不同的引用地址
 */
// console.log(unique(arr)); // [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
console.log(
    `<!-------------------------------- 第${++TITLECOUNT}个例子，利用indexOf去重 -------------------------------->`
);
function unique2(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!');
        return;
    }
    let array = [];
    for (let i = 0; i < arr.length; i++) {
        if (array.indexOf(arr[i]) === -1) {
            array.push(arr[i]);
        }
    }
    return array;
}
/**
 * NaN、{}没有去重
 */
// console.log(unique2(arr));
console.log(
    `<!-------------------------------- 第${++TITLECOUNT}个例子，利用for嵌套for，然后splice去重（ES5中最常用） -------------------------------->`
);
function unique3(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                // 第一个等同于第二个，splice方法删除第二个
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}
// console.log(unique3(arr)); // NaN和{}没有去重，两个null直接消失了

console.log(
    `<!-------------------------------- 第${++TITLECOUNT}个例子，对象属性唯一特点去重 -------------------------------->`
);
function unique4(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!');
        return;
    }
    var arrry = [];
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            arrry.push(arr[i]);
            obj[arr[i]] = 1;
        } else {
            obj[arr[i]]++;
        }
    }
    console.log(obj);
    return arrry;
}
/**
 * 其实每一个去重都有局限性，像这个虽然把对象都去重了，但它们在obj中是以，{ [object Object]: 1 }来体现，
 * 但是如果对象里面有值，那么无论值相不相同，都去重了
 */
// console.log(unique4(arr)); // [1, "true", 15, false, undefined, null, NaN, 0, "a", {…}]

console.log(
    `<!-------------------------------- 第${++TITLECOUNT}个例子，includes + push返回新数组-------------------------------->`
);
function unique5(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!');
        return;
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
        if (!array.includes(arr[i])) {
            //includes 检测数组是否有某个值
            array.push(arr[i]);
        }
    }
    return array;
}
/**
 * {}没有去重
 */
// console.log(unique5(arr));
console.log(
    `<!-------------------------------- 第${++TITLECOUNT}个例子，哈希 + filter -------------------------------->`
);
function unique6(arr) {
    var obj = {};
    return arr.filter(function (item, index, arr) {
        const key = typeof item + item;
        console.log(key);
        if (obj[key]) {
            return false;
        } else {
            obj[key] = true;
            return true;
        }
    });
}

// console.log(unique6(arr));

console.log(
    `<!-------------------------------- 第${++TITLECOUNT}个例子，filter + indexOf 索引比较  -------------------------------->`
);
function unique7(arr) {
    return arr.filter(function (item, index, arr) {
        //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
        return arr.indexOf(item, 0) === index;
    });
}
// console.log(unique7(arr));

console.log(`<!-------------------------------- 第${++TITLECOUNT}个例子，reduce -------------------------------->`);
function unique8(arr) {
    return arr.reduce((prev, cur) => {
        if (prev.includes(cur)) {
            return prev;
        } else {
            return [...prev, cur];
        }
    }, []);
}
// console.log(unique8(arr));

console.log(`<!-------------------------------- 第${++TITLECOUNT}个例子，reduce -------------------------------->`);

console.log([...new Set(arr)]);
