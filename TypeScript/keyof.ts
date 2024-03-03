// 使用TypeScript 实现一个 get 函数来获取 任意对象 的属性值

interface IObj {
    name: string;
    age: number;
    address: string;
}

const anyObj: IObj = {
    name: 'tom',
    age: 18,
    address: 'xxx',
};
/**
 *
 * @param {T} o
 * @param {K} name
 * @returns
 */
function get<T, K extends keyof T>(o: T, name: K): T[K] {
    return o[name];
}
