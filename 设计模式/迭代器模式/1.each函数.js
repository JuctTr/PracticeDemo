var each = function (ary, callback) {
    for (var i = 0, l = ary.length; i < l; i++) {
        callback.call(ary[i], i, ary[i]); // 把下标和元素当作参数传给callback函数
    }
}

each([1, 2, 3], function (i, n) {
    alert([i, n]);
});