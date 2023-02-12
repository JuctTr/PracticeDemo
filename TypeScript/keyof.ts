// 使用TypeScript 实现一个 get 函数来获取 任意对象 的属性值

const anyObj = {
    name: 'tom',
    age: 18,
    address: 'xxx',
};
/**
 *
 * @param {T} o
 * @param {T[K]} name
 * @returns
 */
function get<T extends Record<PropertyKey, any>, K extends keyof T>(o: T, name: T[K]) {
    return o[name];
}