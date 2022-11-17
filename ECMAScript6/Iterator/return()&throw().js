import { log } from '../../utils.js';

log.info(
    'return()方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句），就会调用return()方法。'
);

function readLinesSync(file) {
    return {
        [Symbol.iterator]() {
            return {
                next() {
                    return { done: false };
                },
                return() {
                    file.close();
                    return { done: true };
                },
            };
        },
    };
}
