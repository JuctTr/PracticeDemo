const VOID_TAGS = 'area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr';

const ElementVNode = {
    type: 'div',
    props: {
        id: 'foo',
    },
    children: [{ type: 'p', children: 'hello' }],
};

/**
 * 要考虑属性名称是否合法，还要对属性值进行 HTML 转义
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
        ret += renderAttrs(props);
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

// 应该忽略的属性
const shouldIgnoreProp = ['key', 'ref'];

function renderAttrs(props) {
    let ret = '';
    for (const key in props) {
        if (shouldIgnoreProp.includes(key) || /^on[^a-z]/.test(key)) {
            continue;
        }
        const value = props[key];
        // 调用 renderDynamicAttr 完成属性的渲染
        ret += renderDynamicAttr(key, value);
    }
    return ret;
}

// 用来判断属性是否是 boolean attribute
const isBooleanAttr = key =>
    (
        `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidat e,readonly` +
        `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,` +
        `loop,open,required,reversed,scoped,seamless,` +
        `checked,muted,multiple,selected`
    )
        .split(',')
        .includes(key);

// 用来判断属性名称是否合法且安全
const isSSRSafeAttrName = key => !/[>/="'\u0009\u000a\u000c\u0020]/.test(key);

function renderDynamicAttr(key, value) {
    if (isBooleanAttr(key)) {
        // 对于 boolean attribute，如果值为 false，则什么都不需要渲染，否则 只需要渲染 key 即可
        return value === false ? `` : ` ${key}`;
    } else if (isSSRSafeAttrName(key)) {
        // 对于其他安全的属性，执行完整的渲染，
        // 注意:对于属性值，我们需要对它执行 HTML 转义操作
        return value === ''
            ? ` ${key}`
            : `
        ${key}="${escapeHtml(value)}"`;
    } else {
        // 跳过不安全的属性，并打印警告信息
        console.warn(`[@vue/server-renderer] Skipped rendering unsafe attribute name: ${key}`);
        return ``;
    }
}

const escapeRE = /["'&<>]/;

/**
 * 调用了 escapeHtml 对其进行转义处理，这对于防御 XSS 攻击至关重要。
 * @param {*} string 
 * @returns 
 */
function escapeHtml(string) {
    const str = '' + string;
    const match = escapeRE.exec(str);

    if (!match) {
        return str;
    }

    let html = '';
    let escaped;
    let index;
    let lastIndex = 0;
    for (index = match.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
            case 34: // "
                escaped = '&quot;';
                break;
            case 38: // &
                escaped = '&amp;';
                break;
            case 39: // '
                escaped = '&#39;';
                break;
            case 60: // <
                escaped = '&lt;';
                break;
            case 62: // >
                escaped = '&gt;';
                break;
            default:
                continue;
        }
        if (lastIndex !== index) {
            html += str.substring(lastIndex, index);
        }
        lastIndex = index + 1;
        html += escaped;
    }
    return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}

console.log(renderElementVNode(ElementVNode));
