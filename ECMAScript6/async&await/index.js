async function f() {
    throw new Error('出错了');
}

f().then(
    v => console.log('resolve', v),
    e => console.log('reject', e)
);
