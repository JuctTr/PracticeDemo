import { log } from '../../utils.js';

log.info('如果多个独立异步操作（互不依赖），那么我们可以使用并发请求（同时请求）的方式');

async function getFoo() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('getFoo => '), 1000);
    });
}
async function getBar() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('getFoo => '), 1000);
    });
}

async function businessRequest() {
    // 串行请求
    // let foo = await getFoo();
    // let bar = await getBar();
    // 并发请求
    const [foo, bar] = await Promise.all([getFoo(), getBar()]);
    console.log(foo, bar);
}

businessRequest();

log.info('按顺序完成异步操作（继发请求）');

async function logInOrder(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        console.log(await response.text());
    }
}

log.info('并发完成异步操作，按顺序输出结果');
async function logInOrder2(urls) {
    // 并发读取远程URL
    const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
    });

    // 按次序输出
    for (const textPromise of textPromises) {
        console.log(await textPromise);
    }
}
