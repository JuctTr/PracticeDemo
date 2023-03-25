/**
 * 测试进程的内存占用的上限
 * 堆外内存，不是通过V8进行分配的
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
 * 将Array变为Buffer来分配内存
 * @returns
 */
var useMem = function () {
    var size = 200 * 1024 * 1024;
    var buffer = new Buffer(size);
    for (var i = 0; i < size; i++) {
        buffer[i] = 0;
    }
    return buffer;
};

var total = [];
for (var j = 0; j < 50; j++) {
    showMem();
    total.push(useMem());
    console.log(`${j}次`);
}
showMem();
