const setArr = new Set([1, 2, 3]);
console.log(setArr);

console.log([...setArr]);
let array = [];
setArr.forEach(v => array.push(v));
console.log(array);

const arrayLike = setArr;

// 1.扩展运算符
console.log([...arrayLike]);
// 2.Array.from
console.log(Array.from(arrayLike));
