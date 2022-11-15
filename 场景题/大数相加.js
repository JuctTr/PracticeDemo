// const num1 = 23232323e2342342342342;
// const num2 = 2323423564657687787;
// console.log(+num1);
// console.log(+num2);

const str1 = '2323232322342342342344556784622';
const str2 = '2323423564657687787243872730927309720937092733';

// const str1 = '210';
// const str2 = '911';

function addLargeNum(str1, str2) {
    const maxLen = Math.max(str1.length, str2.length);

    str1 = str1.padStart(maxLen, '0');
    str2 = str2.padStart(maxLen, '0');
    console.log(str1, str2);

    let i = maxLen - 1;
    let curry = 0;
    let result = '';
    while (i >= 0) {
        let sum = Number(str1[i]) + Number(str2[i]) + curry;
        result += sum % 10;
        curry = Math.floor(sum / 10);
        i--;
    }
    if (curry > 0) result += curry;
    return result.split('').reverse().join('');
}

console.log(addLargeNum(str1, str2));
