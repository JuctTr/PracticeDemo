const Emitter = require('./events.js');

const events = new Emitter();

const handler = (...args) => {
    console.log('aaaaa', args);
};

events.listen('__aaaaa__', handler);
events.listen('__aaaaa__', () => {
    console.log('bbbbbb');
});

events.trigger('__aaaaa__', '参数1', '参数2');

events.once('__executeOnce__', (...args) => {
    console.log('我只执行一次', args);
});

console.log(events.trigger('__executeOnce__', '参数1', '参数2'));
events.trigger('__executeOnce__', '第二次参数1', '第二次参数2');

console.log(events.off('__aaaaa__', handler));
