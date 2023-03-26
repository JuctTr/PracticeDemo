// parent.js
var cp = require('child_process');
var child1 = cp.fork(__dirname + '/child.js');
var child2 = cp.fork(__dirname + '/child.js');

// Open up the server object and send the handle
var server = require('net').createServer();
server.listen(1337, function () {
    child1.send('server', server);
    child2.send('server', server);
    // 关掉
    server.close();
});

// 模拟客户端发起请求
// curl --http0.9 "http://127.0.0.1:1337/"
