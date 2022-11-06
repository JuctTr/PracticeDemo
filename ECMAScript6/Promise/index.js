async function func() {
    let pre = Date.now();

    const result1 = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(1), 1000);
        });
    };
    const result2 = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(2), 2000);
        });
    };
    // 串行
    // const res1 = await result1();
    // const res2 = await result2();
    // console.log(res1, res2, Date.now() - pre);

    // 并行，所有都成功
    Promise.all([result1(), result2()]).then(res => {
        console.log(res, Date.now() - pre);
    });
    // 如果异步事件的成功和失败，我们不关心的话
    // Promise.allSettled([result1(), result2()]).then(res => {
    //     console.log(res, Date.now() - pre);
    // });
    // Promise.race([result1(), result2()]).then(res => {
    //     console.log(res, Date.now() - pre);
    // });
}
func();
