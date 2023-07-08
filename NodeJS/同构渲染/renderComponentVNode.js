// 组件
const MyComponent = {
    setup() {
        return () => {
            // 该组件渲染一个div标签
            return {
                type: 'div',
                children: 'hello',
            };
        };
    },
};

// 用来描述组件的 VNode 对象
const CompVNode = {
    type: MyComponent,
};

function renderComponentVNode(vnode) {
    // 获取 setup 组件选项
    let {
        type: { setup },
    } = vnode;
    // 执行 setup 函数得到渲染函数 render
    const render = setup();
    // 执行渲染函数得到 subTree，即组件要渲染的内容
    const subTree = render();
    // 调用 renderElementVNode 完成渲染，并返回其结果
    return renderElementVNode(subTree);
}

const html = renderComponentVNode(CompVNode);
console.log(html); // 输出:<div>hello</div>
