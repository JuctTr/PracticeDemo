// 'use strict';

// function showName(str) {
//     eval(str);
//     console.log(name);
// }
// var name = 'global';
// var str = 'var name = "part"';
// showName(str);

// let result = eval('let x = 10, y = 11; console.log(this); x + y; debugger;'); // eval 作用域
// console.log(result); // 21

// function doSomething() {
//     eval('var x = 10');
//     console.log(x);
// }
// doSomething();
// function changeName(person) {
//     with (person) {
//         name = 'BigBear';
//     }
// }

// var me = {
//     name: 'xiuyan',
//     career: 'coder',
//     hobbies: ['coding', 'footbal'],
// };
// var you = {
//     career: 'product manager',
// };
// changeName(me);
// changeName(you);
// console.log(me, you);
// let msg = 'hello world';
// eval('console.log(msg);'); // hello world

// eval("let msg = 'hello world';");
// console.log(msg); // Reference Error: msg is not defined

// eval = 'hi'; // Uncaught SyntaxError: Unexpected eval or arguments in strict mode
