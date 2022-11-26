const sourceArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// function arrRandom(arr) {
//     return arr.sort(() => 0.5 - Math.random());
// }
// function baseRandom(lower, upper) {
//     return lower + Math.floor(Math.random() * (upper - lower + 1));
// }
// function arrRandom(arr) {
//     let len = arr.length;
//     let index = 0;
//     let lastIndex = len - 1;

//     while (index < len) {
//         const randomNum = baseRandom(index, lastIndex);

//         const randomItem = arr[randomNum];

//         arr[randomNum] = arr[index];

//         arr[index] = randomItem;

//         index++;
//     }
//     return arr;
// }
// console.log(arrRandom(sourceArr));

// setInterval(() => {
//     console.log(baseRandom(0, 10));
// }, 1000);

// var sourceArr = [1, 2, [3], [1, 2, 3, [4, [2, 3, 4]]]];

// function flatten(arr) {
//     let result = [];
//     arr.forEach(item => {
//         if (Array.isArray(item)) {
//             result = result.concat(flatten(item));
//         } else {
//             result.push(item);
//         }
//     });
//     return result;
// }
// function flatten(arr) {
//     return arr.reduce((prev, curr) => {
//         let currentItem = curr;

//         if (Array.isArray(curr)) {
//             currentItem = flatten(curr);
//         }
//         return prev.concat(currentItem);
//     }, []);
// }

// console.log(flatten(sourceArr));

const str1 = '7623232322342342342344556784622';
const str2 = '2323423564657687787243872730927309720937092733';

function addLargeNum(str1, str2) {
    let maxLen = Math.max(str1.length, str2.length);
    str1 = str1.padStart(maxLen, '0');
    str2 = str2.padStart(maxLen, '0');

    let carry = 0;
    let index = maxLen - 1;
    let result = '';

    while (index >= 0) {
        let sum = Number(str1[index]) + Number(str2[index]) + carry;

        carry = Math.floor(sum / 10);

        result += String(sum % 10);

        --index;
    }

    if (carry > 0) result += String(carry);

    return result.split('').reverse().join('');
}

console.log(addLargeNum(str1, str2));
