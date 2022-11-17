import { log } from '../../utils.js';

/**
 * proxy 也没有办法深层次的代理，我们依然需要递归处理
 */

let deepData = {
    const: 1,
    obj: {
        a: 1,
        b: 2,
        o: {
            a: 'inter',
            b: 2,
        },
    },
    arr: [1, 2, 3, 4, 5],
};

const handler = {
    get(target, propKey, receiver) {
        log.info(' call getter ');
        const result = Reflect.get(target, propKey, receiver);
        return typeof result === 'object' ? new Proxy(result, handler) : result;
    },
    set(target, propKey, value, receiver) {
        log.error(' call setter ');
        return Reflect.set(target, propKey, value, receiver);
    },
};

const proxyData = new Proxy(deepData, handler);

// console.log(proxyData.obj.o.a);

proxyData.obj.o.a = 'inter inter';
// console.log(proxyData);
