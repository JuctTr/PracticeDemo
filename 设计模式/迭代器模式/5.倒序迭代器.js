var each = function (ary, callback) {
    for (var i = 0, l = ary.length; i < l; i++) {
        if (callback(i, ary[i]) === false) {
            break;
        }
    }
}

each([1, 2, 3], function (i, n) {
    if (n > 3) { // n 大于3的时候终止循环
        return false;
    }
    console.log(n); // 分别输出：1, 2, 3
});