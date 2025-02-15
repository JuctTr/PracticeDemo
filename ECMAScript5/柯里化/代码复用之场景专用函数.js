// 例子1: 创建通用的日志函数
const log = level => message => console.log(`[${level}] ${message}`);
const logError = log('ERROR');
logError('Database connection failed'); // [ERROR] Database connection failed

// 例子2: vite源码中的createDebugger

// export const debugHmr = createDebugger('vite:hmr');
