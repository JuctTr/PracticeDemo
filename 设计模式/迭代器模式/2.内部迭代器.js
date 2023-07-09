/**
 * 1.内部迭代器在调用的时候，外界不用关心迭代器内部的实现，跟迭代器的交互也仅仅是一次初始调用，但这也刚好是内部迭代器的缺点。
 */

var each = function (ary, callback) {
    for (var i = 0, l = ary.length; i < l; i++) {
        callback.call(ary[i], i, ary[i]); // 把下标和元素当作参数传给callback函数
    }
}


// 判断两个数组是否相等

var compare = function (ary1, ary2) {
    if (ary1.length !== ary2.length) {
        throw new Error('ary1 和 ary2 不相等');
    }
    each(ary1, function (i, n) {
        if (n !== ary2[i]) {
            throw new Error('ary1 和 ary2 不相等');
        }
    });
    alert('ary1 和 ary2 相等');
}

compare([1, 2, 3], [1, 2, 4]); // 输出：Uncaught Error: ary1 和 ary2 不相等

/**
 * 说实话，这个 compare 函数一点都算不上好看，我们目前能够顺利完成需求，
 * 还要感谢在JavaScript 里可以把函数当作参数传递的特性，但在其他语言中未必就能如此幸运。
 * 在一些没有闭包的语言中，内部迭代器本身的实现就会变得相当复杂。比如C语言中的内部迭代器
 * 是用函数指针来实现的，循环处理所需要的数据都要以参数的形式明确地从外面传递进去。
 */