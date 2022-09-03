class Emitter {
    constructor(context) {
        this.eventQueue = {};
        this.context = context;
    }

    listen(eventName, fn) {
        if (typeof fn !== 'function') {
            console.error('fn must be a function');
            return;
        }
        if (this.eventQueue[eventName] && this.eventQueue[eventName].length > 0) {
            console.log('eventEmitter - 重复定义事件了', eventName);
        }

        (this.eventQueue[eventName] || (this.eventQueue[eventName] = [])).push(fn);
        return this;
    }

    trigger(eventName) {
        const executeFnArr = this.eventQueue[eventName];
        if (!executeFnArr) {
            console.error(`event ${eventName} does not exist `);
            return;
        }
        // 取出所有参数
        let args = Array.prototype.slice.call(arguments);
        // 剔除事件名
        args.shift();
        for (let i = 0; i < executeFnArr.length; i++) {
            try {
                executeFnArr[i].apply(this.context || null, args);
            } catch (error) {
                console.error(error);
            }
        }
        return this;
    }

    once(eventName, fn) {
        if (typeof fn !== 'function') {
            console.error('fn must be a function');
            return;
        }

        const self = this;

        function executeOnce() {
            self.off(eventName, executeOnce);
            fn.apply(this, arguments);
        }

        executeOnce.fn = fn;

        this.listen(eventName, executeOnce);
        return this;
    }

    off(eventName, fn) {
        const executeFnArr = this.eventQueue[eventName];
        if (!executeFnArr) return this;

        if (arguments.length === 1) {
            delete this.eventQueue[eventName];
            return this;
        }

        let cb;
        for (let i = 0; i < executeFnArr.length; i++) {
            cb = executeFnArr[i];
            if (cb === fn || cb.fn === fn) {
                executeFnArr.splice(i, 1);
                break;
            }
        }
        return this;
    }
}

module.exports = Emitter;

// const events = new Emitter();
// events.listen('__eventName__', (a, b, c) => {
//     console.log('参数 => ', a, b, c);
// });
// events.trigger('__eventName__', '参数1', '参数2');

// events.once('__executeOnce__', () => {
//     console.log('我只执行一次');
// });

// events.trigger('__executeOnce__', '参数1', '参数2');
// events.trigger('__executeOnce__', '第二次参数1', '第二次参数2');
