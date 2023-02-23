function createAsyncWorker(capacity) {
    const task = [];
    const cache = [];

    const handler = promiseCreator => {
        task.splice(task.indexOf(promiseCreator), 1);
        if (cache.length) request(cache.shift());
    };

    function request(promiseCreator) {
        task.push(promiseCreator);

        promiseCreator().then(
            res => {
                promiseCreator.currentPromiseResolve(res);

                handler(promiseCreator);
            },
            err => {
                promiseCreator.currentPromiseReject(err);
                handler(promiseCreator);
            }
        );
    }

    return function add(promiseCreator) {
        return new Promise((resolve, reject) => {
            promiseCreator.currentPromiseResolve = resolve;
            promiseCreator.currentPromiseReject = reject;
            if (task.length < capacity) {
                request(promiseCreator);
            } else {
                cache.push(promiseCreator);
            }
        });
    };
}
function testCreateAsyncWorker(createParallelTaskExecutorImpl) {
    const assert = require('assert');
    const executor = createParallelTaskExecutorImpl(2);
    const runTask = (id, delay, expectedDelay, fail) => {
        const start = Date.now();
        const check = rejected => v => {
            assert.strictEqual(rejected, fail, `promise status of task ${id} should be ${fail}, received ${rejected}`);
            const realDelay = Date.now() - start;
            console.log(id, realDelay);
            assert.strictEqual(
                Math.round(realDelay / 100) * 100,
                expectedDelay,
                `delay of task ${id} should be ${expectedDelay}, received ${realDelay}`
            );
            assert.strictEqual(
                v,
                delay,
                `${rejected ? 'error of rejected' : 'result of resolved'} task ${id} should be ${delay}, received ${v}`
            );
        };
        executor(
            () =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (fail) {
                            reject(delay);
                        } else {
                            resolve(delay);
                        }
                    }, delay);
                })
        )
            .then(check(false), check(true))
            .catch(e => {
                console.error(e);
            });
    };
    runTask(1, 100, 100, false); // resolve
    runTask(2, 200, 200, true); // reject

    runTask(3, 300, 400, false);
    runTask(4, 400, 600, true);
    runTask(5, 100, 500, false);
    runTask(6, 200, 700, true);
    runTask(7, 100, 700, false);
    runTask(8, 200, 900, false);
}
try {
    testCreateAsyncWorker(createAsyncWorker);
} catch (error) {
    console.error(error);
}
