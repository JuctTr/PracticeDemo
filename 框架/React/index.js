let isMount = true;
let workInProgressHook = null;

// 每一个组件都有自己的fiber
const fiber = {
    stateNode: App,
    memoizedState: null,
};

// 调度
function schedule() {
    workInProgressHook = fiber.memoizedState; // 每当我们触发更新，把当前的state赋值给 正在工作中hook

    const app = fiber.stateNode(); // 触发更新，其实就是重新调用当前App这个函数

    isMount = false; // 初次渲染完，设置为false
    return app;
}

const useState = initialState => {
    let hook; // 当前的hook
    if (isMount) {
        // 组件初始化的首次渲染，初始化hook
        hook = {
            memoizedState: initialState,
            next: null,
            // 多个更新（action ），形成一个队列
            queue: {
                pending: null,
            },
        };
        // 首次渲染进来还没有 memoizedState
        if (!fiber.memoizedState) {
            fiber.memoizedState = hook;
        } else {
            // 首次渲染除了第一个，后面第二个useState、第三个useState、。。。。。走这个流程，形成一条链表
            // 这里workInProgressHook的指针，其实指向的是 fiber.memoizedState
            workInProgressHook.next = hook;
        }
        workInProgressHook = hook;
    } else {
        hook = workInProgressHook;
        workInProgressHook = workInProgressHook.next;
    }

    // 计算新的状态
    let baseState = hook.memoizedState;

    if (hook.queue.pending) {
        // 如果存在说明本次更新有新的 update 需要被操作
        let firstUpdate = hook.queue.pending.next;
        do {
            const action = firstUpdate.action;
            baseState = action(baseState);
            firstUpdate = firstUpdate.next;
        } while (firstUpdate !== hook.queue.pending.next);

        hook.queue.pending = null;
    }

    hook.memoizedState = baseState;
    return [baseState, dispatchAction.bind(null, hook.queue)];
};

function dispatchAction(queue, action) {
    // 为什么是一个环状列表呢？
    const update = {
        action,
        next: null,
    };
    const pending = queue.pending;
    // 第一次更新
    if (pending === null) {
        // u0.next => u0.next => u0.next => ......
        update.next = update;
    } else {
        // 第二次更新
        /**
         * 这里跟源码的逻辑有区别
         * 作者表明：因为全程同步，每次update都被消耗了。 这里是照搬React的实现原理，在React中会有异步形成链表的过程
         */
        update.next = pending.next;
        pending.next = update;
        // 上述两行代码形成
        // u1.next => u0.next => u1.next

        // const update = {
        //     action: (num) => num + 2,
        //     next: {
        //         action: (num) => num + 1,
        //         next: {
        //             action: (num) => num + 2,
        //             next: {
        //                 action: (num) => num + 1,
        //                 next: {
        //                     // ......
        //                 }
        //             }
        //         }
        //     }
        // }
    }
    queue.pending = update;

    setTimeout(schedule, 0);
}

function App() {
    const [num, updateNum] = useState(0);

    console.log('isMount?', isMount);
    console.log('num', num);

    return {
        onClick: () => {
            updateNum(num => num + 1);
            updateNum(num => num + 2);
            updateNum(num => num + 3);
            /**
             * React18+，多次的action，会合并成一次schedule（多次的update，合并成一次render），
             * 而up主代码中每一次update会有一次schedule
             */
        },
    };
}

window.app = schedule();
