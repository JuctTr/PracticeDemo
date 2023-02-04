function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce((prev, current) => {
        return (...args) => prev(current(...args));
    });
}

const middleware = [
    args => {
        console.log('fn a => ', args);
        args.a = 3;
        return args;
    },
    args => {
        console.log('fn b => ', args);
        args.b = 2;
        return args;
    },
    args => {
        console.log('fn c => ', args);
        args.c = 1;
        return args;
    },
];
console.log(
    compose(...middleware)({
        name: 'context',
    })
);
