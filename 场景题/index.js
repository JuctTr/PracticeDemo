// 得到一个两数之间的随机数，包含lower 和 upper
function baseRandom(lower, upper) {
    return lower + Math.floor(Math.random() * (upper - lower + 1));
}
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
