import { log } from '../../utils.js';

log.info('========= 重试例子1 —————— 不太建议的版本 =========');

function commonRequest() {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject('请求出错 => '), 1000);
    });
}

let retryCount = 0;
function businessRequest() {
    return new Promise((resolve, reject) => {
        commonRequest()
            .then(res => {
                return res;
            })
            .catch(error => {
                if (retryCount < 3) {
                    retryCount++;
                    resolve(businessRequest());
                } else {
                    reject(error);
                }
            });
    });
}

// businessRequest()
//     .then(res => {
//         console.log('请求成功了 => ', res);
//     })
//     .catch(error => {
//         console.error('请求失败了 => ', error);
//     });

log.info('========= 重试例子2 =========');

const RETRY_COUNT = 3; // 重试次数

async function businessRequest2() {
    const callback = async (resolve, reject) => {
        let i;
        for (i = 0; i < RETRY_COUNT; ++i) {
            try {
                const result = await commonRequest();
                resolve(result);
                break; // 这个执行了，说明成功了
            } catch (err) {
                if (i === RETRY_COUNT - 1) {
                    console.error('三次都出错了');
                    reject(err);
                }
            }
        }
    };
    return new Promise(callback);
}

businessRequest2()
    .then(res => {
        console.log('请求成功了 => ', res);
    })
    .catch(error => {
        console.error('请求失败了 => ', error);
    });
