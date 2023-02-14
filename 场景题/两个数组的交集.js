// 手写一个方法，取两个数组的交集

const arr1 = [0, 1, 4, 2, 3];
const arr2 = [5, 4, 1, 7, 8];

function makeSame(arr1, arr2) {
    const result = [];

    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                result.push(arr1[i]);
            }
        }
    }

    return result;
}
// console.time();
// console.log(makeSame(arr1, arr2));
// console.timeEnd();

function makeSame2(arr1, arr2) {
    const result = [];

    for (let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i])) {
            result.push(arr1[i]);
        }
    }

    return result;
}
// console.time();
// console.log(makeSame2(arr1, arr2));
// console.timeEnd();

function makeSame3(arr1, arr2) {
    const result = [];

    for (let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i])) {
            result.push(arr1[i]);
        }
    }

    return result;
}
// console.time();
// console.log(makeSame3(arr1, arr2));
// console.timeEnd();

var intersection = function (nums1, nums2) {
    nums1.sort((x, y) => x - y);
    nums2.sort((x, y) => x - y);
    console.log(nums1, nums2);
    const length1 = nums1.length,
        length2 = nums2.length;
    let index1 = 0,
        index2 = 0;
    const intersection = [];
    while (index1 < length1 && index2 < length2) {
        const num1 = nums1[index1],
            num2 = nums2[index2];
        if (num1 === num2) {
            // 保证加入元素的唯一性
            if (!intersection.length || num1 !== intersection[intersection.length - 1]) {
                intersection.push(num1);
            }
            index1++;
            index2++;
        } else if (num1 < num2) {
            index1++;
        } else {
            index2++;
        }
    }
    return intersection;
};

console.time();
console.log(intersection(arr1, arr2));
console.timeEnd();
