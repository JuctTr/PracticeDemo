const oneTask = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject('oneTask'), 1000);
    });
};
const twoTask = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('twoTask'), 2000);
    });
};
const threeTask = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('threeTask'), 1000);
    });
};

Promise.myRace = function (promises) {
    if (!Array.isArray(promises)) promises = [];

    return new Promise((resolve, reject) => {
        const len = promises.length;
        for (let index = 0; index < len; index++) {
            const currentPromise = promises[index];
            const promiseItem = Promise.resolve(currentPromise);

            // promiseItem.then(res => resolve(res)).catch(error => reject(error));
            promiseItem.then(resolve, reject);
        }
    });
};

const nowTime = Date.now();
Promise.myRace([oneTask(), twoTask(), threeTask()])
    .then(res => {
        console.log(res);
        console.log(Date.now() - nowTime);
    })
    .catch(error => {
        console.log('catch error', error);
        console.log(Date.now() - nowTime);
    });

// Promise.race([oneTask(), twoTask(), threeTask()])
//     .then(res => {
//         console.log(res);
//         console.log(Date.now() - nowTime);
//     })
//     .catch(error => {
//         console.log('catch error', error);
//         console.log(Date.now() - nowTime);
//     });
