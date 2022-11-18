import { log } from '../../utils.js';

log.info('封装await');

// function to(promise, errorExt) {
//     return promise
//         .then(function (data) {
//             return [null, data];
//         })
//         .catch(function (err) {
//             if (errorExt) {
//                 Object.assign(err, errorExt);
//             }
//             return [err, undefined];
//         });
// }

// async function fetchFile() {
//     return new Error('拉取文件错误了');
// }
// async function mainFunc() {
//     const [error, result] = await to(fetchFile(), {
//         msg: '错误了',
//         code: 1001,
//     });
//     console.log(error, result);
// }
// mainFunc();

async function fetchFile() {
    throw new Error('拉取文件错误了');
}
async function fetchFile2() {
    return 'fetchFile2';
}
async function mainFunc1() {
    log.info('错误捕获1');
    const result = await fetchFile().catch(error => {
        console.log('自己的catch捕获了 => ', error);
    });
    const result2 = await fetchFile2();

    console.log('错误捕获1', result, result2);
    return '拉取成功了';
}
mainFunc1();

async function mainFunc2() {
    log.info('错误捕获2');
    let result = null;

    try {
        result = await fetchFile();
    } catch (error) {
        console.log('被try catch捕获了 => ', error);
    }

    const result2 = await fetchFile2();

    console.log('错误捕获2', result, result2);
    return '拉取成功了';
}
mainFunc2();
