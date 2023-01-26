const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const INITIALVALUE = 0;
// const INITIALVALUE = [];
// const INITIALVALUE = '';

const result = arr.reduce((prev, curr, index, array) => {
    // console.log(prev, index, array);
    return prev + curr;
}, INITIALVALUE);

console.log(result);
