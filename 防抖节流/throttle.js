// 两种最简单的方式

function throttle(func, wait, options) {
    let timerId = null;

    return function () {
        const lastThis = this;
        const lastArgs = arguments;
        if (timerId) return;

        timerId = setTimeout(() => {
            func.apply(lastThis, lastArgs);
            timerId = null;
        }, wait);
    };
}

// function throttle(func, wait, options) {
//     var context, args;
//     var previous = 0;

//     return function() {
//         var now = +new Date();
//         context = this;
//         args = arguments;
//         if (now - previous > wait) {
//             func.apply(context, args);
//             previous = now;
//         }
//     }
// }
