/**
 * @description 迭代方式
 * n 从 1 开始
 * @param {*} n
 * @returns
 */
function fibonacci(n) {
    if (n <= 0) return 0;
    if (n <= 2) return 1;

    let first = 1;
    let second = 1;
    let result = 0;
    while (n > 0) {
        first = second;
        second = result;
        result = first + second;
        --n;
    }
    return result;
}

console.log(fibonacci(2));

/**
 * @description 递归方式
 * @param {*} n
 * @returns
 */
function Fibonacci(n) {
    if (n < 0) return 0;
    if (n === 0 || n === 1) return n;
    return Fibonacci(n - 1) + Fibonacci(n - 2);
}

/**
 * @description 递归方式（剪枝优化）
 * @param {*} n
 * @returns
 */
function FibonacciOpt(n, memo) {
    if (n < 0) return 0;
    if (n === 0 || n === 1) return n;
    if (memo[n] !== 0) return memo[n];
    memo[n] = FibonacciOpt(n - 1, memo) + FibonacciOpt(n - 2, memo);
    return memo[n];
}

function fibonacciAdvance(n) {
    const memoObj = Array(n + 1).fill(0);
    return FibonacciOpt(n, memoObj);
}
