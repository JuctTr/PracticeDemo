
var miniConsole = (function () {
    var cache = [];

    var handler = function (ev) {
        if (ev.keyCode === 113) {
            var script = document.createElement('script'); script.onload = function () {
                for (var i = 0, fn; fn = cache[i++];) {
                    fn();
                }
            };
            script.src = 'miniConsole.js';
            document.getElementsByTagName('head')[0].appendChild(script);
            document.body.removeEventListener('keydown', handler); // 只加载一次 miniConsole.js
        }
    };
    // 当用户按下 F2 键时，才会加载 miniConsole.js
    document.body.addEventListener('keydown', handler, false);
    return {
        log: function () {
            var args = arguments;
            // 只是往 cache 数组中添加一个函数，而不是立即执行
            cache.push(function () {
                return miniConsole.log.apply(miniConsole, args);
            });
        }
    }
})();

miniConsole.log(11); // 不会立即输出 11，而是把输出 11 的操作函数放入 cache 数组中