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

Promise.myAllSettled = function (promises) {
    if (!Array.isArray(promises)) promises = [];

    return new Promise(resolve => {
        const resultList = [];
        let count = 0;
        const len = promises.length;
        for (let index = 0; index < len; index++) {
            const currentPromise = promises[index];
            const promiseItem = Promise.resolve(currentPromise);
            // fulfilled
            const resolver = function (res) {
                resultList[index] = {
                    status: 'fulfilled',
                    value: res,
                };
                count++;
                if (count === len) {
                    resolve(resultList);
                }
            };
            // reject
            const rejecter = function (reason) {
                resultList[index] = {
                    status: 'reject',
                    reason,
                };
                count++;
                if (count === len) {
                    resolve(resultList);
                }
            };

            promiseItem.then(resolver, rejecter);
        }
    });
};

const nowTime = Date.now();
Promise.myAllSettled([oneTask(), twoTask(), threeTask()]).then(res => {
    console.log(res);
    console.log(Date.now() - nowTime);
});

// Promise.allSettled([oneTask(), twoTask(), threeTask()]).then(res => {
//     console.log(res);
//     console.log(Date.now() - nowTime);
// });
