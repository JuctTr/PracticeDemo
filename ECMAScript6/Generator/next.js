import { log } from '../../utils.js';

log.info('next方法');
function* f() {
    for (var i = 0; true; i++) {
        var reset = yield i;
        console.log(reset);
        if (reset) {
            i = -1;
        }
    }
}

var g = f();

g.next(); // { value: 0, done: false }
g.next(); // { value: 1, done: false }
g.next(true); // { value: 0, done: false }

function* dataConsumer() {
    console.log('Started');
    console.log(`1. ${yield}`);
    console.log(`2. ${yield}`);
    return 'result';
}

let genObj = dataConsumer();
console.log(genObj.next());
// Started
console.log(genObj.next('a'));
// 1. a
console.log(genObj.next('b'));
// 2. b
