// function fun() {
//     const a = 1;
//     const b = 2;
//     return function () {
//         const c = 2;

//         console.log(a, c);
//         // debugger; // =========== closure 作用域（闭包作用域）================
//     };
// }

// const fn = fun();
// fn();

function fun() {
    const a = 1;
    const b = 2;
    return function () {
        const c = 2;
        const d = 4;

        return function () {
            const e = 5;

            console.log(a, c, e);
            // debugger;  // =========== closure 作用域（闭包作用域）================
        };
    };
}

const fn = fun()();
fn();

// function fun() {
//     const a = 1;
//     const b = 2;
//     return function () {
//         const c = 2;
//         const d = 4;

//         return function () {
//             const e = 5;

//             eval('console.log(a, c, e)');
//             debugger;
//         };
//     };
// }
