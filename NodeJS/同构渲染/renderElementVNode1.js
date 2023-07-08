const VOID_TAGS = 'area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr';

const ElementVNode = {
    type: 'div',
    props: {
        id: 'foo',
    },
    children: [{ type: 'p', children: 'hello' }],
};

/**
 * 需要考虑该节点是否是自闭合标签。
 * @param {*} vnode
 * @returns
 */
function renderElementVNode(vnode) {
    // 取出标签名称 tag 和标签属性 props，以及标签的子节点
    const { type: tag, props, children } = vnode;
    // 判断标签是否是自闭合标签
    const isVoidTag = VOID_TAGS.includes(tag);
    // 开始标签的头部
    let ret = `<${tag}`;
    // 处理标签属性
    if (props) {
        for (const key in props) {
            ret += ` ${key}="${props[key]}"`;
        }
    }
    // 如果是自闭合标签，则直接闭合
    ret += isVoidTag ? '/>' : '>';
    // 如果是 void element, 则直接返回结果，无需处理 children, 因为 void element 没有 children
    if (isVoidTag) return ret;

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

console.log(renderElementVNode(ElementVNode));
