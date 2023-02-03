const middleware = [
    (ctx, next) => {
        console.log('前序遍历1', 'ctx => ', ctx);
        next();
        ctx.a = 1;
        console.log('后续遍历1', 'ctx => ', ctx);
    },
    (ctx, next) => {
        console.log('前序遍历2', 'ctx => ', ctx);
        next();
        ctx.b = 2;
        console.log('后续遍历2', 'ctx => ', ctx);
    },
    (ctx, next) => {
        console.log('前序遍历3', 'ctx => ', ctx);
        next();
        ctx.c = 3;
        console.log('后续遍历3', 'ctx => ', ctx);
    },
];

const context = {
    name: 'context',
};
let index = -1;
function dispatch(i) {
    index = i;
    let fn = middleware[i];

    if (!fn) return;

    // console.log('前序遍历');
    const result = fn(context, dispatch.bind(null, i + 1));
    // console.log('后序遍历');
    return result;
}

dispatch(0);
