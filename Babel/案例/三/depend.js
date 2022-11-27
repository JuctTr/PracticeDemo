const dependFunc = () => {
    return new Promise((resolve, reject) => {
        console.log('我是 depend promise');
        resolve('depend');
    }).then(res => {
        console.log(res);
    });
};

const arr = [1, 3, 4, 7, 8];

const dependFunc2 = () => {
    return arr.findIndex(item => item === 3);
};
export default {
    a: 1,
    b: 2,
    dependFunc,
    dependFunc2,
};
