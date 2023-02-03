// https://github.com/koajs/compose
'use strict';

/**
 * Expose compositor.
 */

// module.exports = compose;

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose(middleware) {
    if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!');
    for (const fn of middleware) {
        if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!');
    }

    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */

    return function (context, next) {
        // last called middleware #
        let index = -1;

        function dispatch(i) {
            if (i <= index) return Promise.reject(new Error('next() called multiple times'));
            index = i;
            let fn = middleware[i];
            if (i === middleware.length) fn = next;
            if (!fn) return Promise.resolve();
            try {
                // console.log('前');
                const result = fn(context, dispatch.bind(null, i + 1));
                // console.log('后');
                return Promise.resolve(result);
            } catch (err) {
                return Promise.reject(err);
            }
        }

        return dispatch(0);
    };
}

class App {
    constructor() {
        this.middleware = [];
    }
    use(cb) {
        this.middleware.push(cb);
    }
    compose(context) {
        return compose(this.middleware)(context, async () => {
            console.log('介于前序遍历和后序遍历之间');
        });
    }
}

const app = new App();
app.use(async (ctx, next) => {
    console.log('前序遍历1', 'ctx => ', ctx);
    await next();
    console.log('后续遍历1', 'ctx => ', ctx);
});
app.use(async (ctx, next) => {
    console.log('前序遍历2', 'ctx => ', ctx);
    await next();
    console.log('后续遍历2', 'ctx => ', ctx);
});
app.use(async (ctx, next) => {
    console.log('前序遍历3', 'ctx => ', ctx);
    await next();
    console.log('后续遍历3', 'ctx => ', ctx);
});

app.compose({ name: 'appName', demo() {} });
