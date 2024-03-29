/**
 * 测试进程的内存占用的上限
 * 堆内存，通过V8进行分配的
 */
var showMem = function () {
    var mem = process.memoryUsage();
    var format = function (bytes) {
        return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    };
    console.log(
        'Process: heapTotal ' + format(mem.heapTotal) + ' heapUsed ' + format(mem.heapUsed) + ' rss ' + format(mem.rss)
    );
    console.log('-----------------------------------------------------------');
};
/**
 * 分配内存
 * @returns
 */
var useMem = function () {
    var size = 20 * 1024 * 1024;
    var arr = new Array(size);
    for (var i = 0; i < size; i++) {
        arr[i] = 0;
    }
    return arr;
};
var total = [];
for (var j = 0; j < 30; j++) {
    showMem();
    total.push(useMem());
    console.log(`${j}次`);
}
showMem();
