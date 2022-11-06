const oneTask = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('oneTask'), 1000);
    });
};
const twoTask = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject('twoTask'), 2000);
    });
};
const threeTask = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('threeTask'), 1000);
    });
};

Promise.myAll = function (promises) {
    if (!Array.isArray(promises)) promises = [];

    return new Promise((resolve, reject) => {
        const resultList = [];
        let count = 0;
        const len = promises.length;
        for (let index = 0; index < len; index++) {
            const currentPromise = promises[index];
            const promiseItem = Promise.resolve(currentPromise);
            promiseItem
                .then(res => {
                    resultList[index] = res;
                    count++;
                    if (count === len) {
                        resolve(resultList);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        }
    });
};

const nowTime = Date.now();
Promise.myAll([oneTask(), twoTask(), threeTask()])
    .then(res => {
        console.log(res);
        console.log(Date.now() - nowTime);
    })
    .catch(error => {
        console.log('catch error', error);
        console.log(Date.now() - nowTime);
    });

// Promise.all([oneTask(), twoTask(), threeTask()])
//     .then(res => {
//         console.log(res);
//         console.log(Date.now() - nowTime);
//     })
//     .catch(error => {
//         console.log(error);
//         console.log(Date.now() - nowTime);
//     });
