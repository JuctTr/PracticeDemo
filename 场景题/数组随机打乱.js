const sourceArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function getRandomArray(arr) {
    let randomArr = arr.sort(() => {
        const random = 0.5 - Math.random();
        console.log(random);
        return random;
    });
    return randomArr;
}
// console.log(getRandomArray(sourceArr));

function shuffle(array, size) {
    var len = array.length,
        index = 0,
        lastIndex = len - 1;

    size = size === undefined ? len : size;
    while (index < size) {
        var rand = baseRandom(index, lastIndex);
        const temp = array[index];
        array[index] = array[rand];
        array[rand] = temp;
        index++;
    }
    return array;
}
console.log(shuffle(sourceArr));

// 得到一个两数之间的随机数，包含lower 和 upper
function baseRandom(lower, upper) {
    return lower + Math.floor(Math.random() * (upper - lower + 1));
}
