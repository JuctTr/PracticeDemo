const ElementVNode = {
    type: 'div',
    props: {
        id: 'foo',
    },
    children: [{ type: 'p', children: 'hello' }],
};

/**
 * 仅仅 用来展示将虚拟 DOM 渲染为 HTML 字符串的核心原理，并不满足生产要求
 * @param {*} vnode 
 * @returns 
 */
function renderElementVNode(vnode) {
    // 取出标签名称 tag 和标签属性 props，以及标签的子节点
    const { type: tag, props, children } = vnode;
    // 开始标签的头部
    let ret = `<${tag}`;
    // 处理标签属性
    if (props) {
        for (const key in props) {
            ret += ` ${key}="${props[key]}"`;
        }
    }
    // 开始标签的闭合
    ret += `>`;
    // 处理子节点
    // 如果子节点的类型是字符串，则是文本内容，直接拼接
    if (typeof children === 'string') {
        ret += children;
    } else if (Array.isArray(children)) {
        // 如果子节点的类型是数组，则递归地调用 renderElementVNode 完成渲染
        children.forEach(child => {
            ret += renderElementVNode(child);
        });
    }
    // 结束标签
    ret += `</${tag}>`;

    // 返回拼接好的 HTML 字符串
    return ret;
}


console.log(renderElementVNode(ElementVNode))