export const greenLogStyle = 'background: #04be02; color: #fff; border-radius: 2px;';
export const redLogStyle = 'background: red; color: #fff; border-radius: 2px;';

/**
 * @description 打印背景log，便于优化
 * @param {*} componentMark
 * @param {*} type
 */
export const log = {
    info: function info(...args) {
        console.log(`%c ${args.shift()} `, greenLogStyle, ...args);
    },
    warn: function warn(...args) {
        console.warn(`[UnionProxy]:`, ...args);
    },
    error: function error(...args) {
        console.error(`%c ${args.shift()}`, redLogStyle, ...args);
    },
};
