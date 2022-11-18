async function fetchUrl() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(20), 1000);
    });
}

const dynamic = import('./dyanmic.js');
const result = (await dynamic).default;
console.log(result);
// 顶层await
export const output = await fetchUrl();
