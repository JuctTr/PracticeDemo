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
        // 首次渲染
        hook = {
            memoizedState: initialState,
            next: null,
            // 多个更新，形成一个队列
            queue: {
                pending: null,
                next: null,
            },
        };
        // 首次进来还没有
        if (!fiber.memoizedState) {
            fiber.memoizedState = hook;
        } else {
            // 第二个useState、第三个useState、。。。。。
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
    // 一个环状列表
    const update = {
        action,
        next: null,
    };
    if (queue.pending === null) {
        update.next = update;
    } else {
        // u0 => u0
        // u1 => u0 => u1
        update.next = queue.pending.next;
        queue.pending.next = update;
    }
    queue.pending = update;

    schedule();
}

function App() {
    const [num, updateNum] = useState(0);
    const [num1, updateNum1] = useState(10);

    console.log('isMount?', isMount);
    console.log('num', num);

    return {
        onClick: () => {
            updateNum(num => num + 1);
        },
    };
}

window.app = schedule();
