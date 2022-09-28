const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({
    port: 8080,
});
wss.on('connection', (ws, req) => {
    console.log('客户端已连接，', req.socket.remoteAddress);
    ws.on('message', data => {
        console.log('监听客户端发送的消息：', data);
        ws.send('我是服务端'); // 向当前客户端发送消息
    });
    ws.send('我是服务端'); // 向当前客户端发送消息
});
