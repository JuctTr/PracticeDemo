const Koa = require('koa'); // 引入 koa
const router = require('koa-router')(); // 引入 koa-router
const bodyParser = require('koa-body-parser'); // 引入 koa-body-parser
const koaStatic = require('koa-static');
const path = require('path');

const app = new Koa(); // 起一个 koa 服务器

app.use(bodyParser()); // 还没派上用场，先放这儿

// 这两个请求处理，是用来测试的
router.get('/', async (ctx, next) => {
    // ctx 是对请求的 request 和 response 对象的封装
    ctx.response.body = '<h1>Home</h1>';
});
router.get('/api/login', async (ctx, next) => {
    ctx.response.body = '<h1>Login</h1>';
});

router.get('/send', async ctx => {
    ctx.response.body = '<h1>发送信息</h1>';
});

app.use(koaStatic(path.join(__dirname, 'public')));

// app.use(
//     koaStatic(path.join(__dirname, 'public'), {
//         setHeaders(res) {
//             // console.log(res.setHeader, res.getHeader('Accept-Encoding'));
//             // res.writeHead(200, ['access-control-allow-origin', res.req.headers.origin]);
//             res.setHeader('access-control-allow-origin', '*');
//             res.setHeader('access-control-allow-credentials', 'true');
//         },
//     })
// );

router.get('/scriptError.html', async ctx => {
    ctx.response.body = '<h1>发送信息</h1>';
});

app.use(router.routes());

app.listen(3000); // 设置服务器的端口
app.listen(4000);
console.log('App started at port 3000 and 4000 ...');
