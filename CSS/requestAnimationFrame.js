// const box4 = document.querySelector('.box4');
// box4.addEventListener('click', () => {
//     console.log('box4 box4 box4 box4');
// });
// setTimeout(() => {
//     console.log('setTimeout');
// });
// queueMicrotask(() => {
//     console.log('Microtask');
// });
// let i = 0;
// while (i <= 1000000000) {
//     i++;
// }
// console.log('2323');
// console.log('script start');
// setTimeout(function firstTimeOut() {
//     console.log('A');
// }, 0);

// function func() {
//     setTimeout(function secondTimeOut() {
//         console.log('C');
//     }, 0);
//     return new Promise(resolve => {
//         console.log('E');
//         resolve();
//     });
// }
// func().then(function firstThen() {
//     console.log('first then');
// });
// console.log('script end');

function taskOne() {
    console.log('task one ...');
    setTimeout(() => {
        Promise.resolve().then(() => {
            console.log('task one micro in macro ...');
        });
        setTimeout(() => {
            console.log('task one macro ...');
        }, 0);
    }, 0);
    taskTwo();
}

function taskTwo() {
    console.log('task two ...');
    Promise.resolve().then(() => {
        setTimeout(() => {
            console.log('task two macro in micro...');
        }, 0);
    });

    setTimeout(() => {
        console.log('task two macro ...');
    }, 0);
}

setTimeout(() => {
    console.log('running macro ...');
}, 0);

taskOne();

Promise.resolve().then(() => {
    console.log('running micro ...');
});
