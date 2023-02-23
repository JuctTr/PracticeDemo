function createWeightedRandom(input) {
    const totalArr = new Array(input.length + 1).fill(0);
    for (let i = 1; i <= input.length; ++i) {
        totalArr[i] = totalArr[i - 1] + input[i - 1];
    }

    let total = input.reduce((prev, curr) => prev + curr);

    function binarySearch(nums, target) {
        if (nums.length == 0) return -1;
        let left = 0,
            right = nums.length;
        while (left < right) {
            const mid = left + Math.floor((right - left) / 2);
            if (nums[mid] == target) {
                right = mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else if (nums[mid] > target) {
                right = mid;
            }
        }
        return left;
    }

    return function () {
        const target = Math.floor(Math.random() * total) + 1;
        return binarySearch(totalArr, target) - 1;
    };
}

function testCreateWeightedRandom(createWeightedRandomImpl) {
    const assert = require('assert');
    const input = [4, 5, 2, 3, 2];
    const counts = Array(input.length).fill(0);
    const random = createWeightedRandomImpl(input);
    console.log(random);
    assert.strictEqual(typeof random, 'function');
    console.log('dkfjlsj');
    for (let i = 0; i < 10000; i++) {
        const v = random();
        assert.ok(
            typeof v === 'number' && v < input.length && v > -1 && (v | 0) === v,
            `invalid random value: ${JSON.stringify(v)}`
        );
        counts[v]++;
    }
    console.log(counts);
    const sum = input.reduce((v, c) => v + c, 0);
    for (let i = 0; i < input.length; i++) {
        const expected = input[i] / sum;
        const real = counts[i] / 10000;
        // 误差不超过 0.01
        assert.ok(Math.abs(expected - real) < 0.01, `invalid weight ${real} for ${i}, expected is ${expected}`);
    }
}

try {
    testCreateWeightedRandom(createWeightedRandom);
} catch (error) {
    console.error(error);
}
