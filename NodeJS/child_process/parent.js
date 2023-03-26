var cp = require('child_process');
// 创建子进程
var n = cp.fork(__dirname + '/child.js');

n.on('message', function (m) {
    console.log('PARENT got message:', m);
});

n.send({ hello: 'world' });

// 查看进程的数量
// ps aux | grep parent.js
