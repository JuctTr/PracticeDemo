let subject = ['高数'];
let handler = {
    get(obj, key) {
        console.log('触发了get');
        return key in obj ? obj[key] : '没有这门学科';
    },
    set(obj, key, val) {
        console.log('触发了set');
        obj[key] = val;
        //set方法成功时应该返回true，否则会报错
        return true;
    },
};

let proxyObj = new Proxy(subject, handler);

// 检验get和set
// console.log(proxyObj); //输出：[ '高数' ]
// console.log(proxyObj[1]); //输出：触发了get 没有这门学科
// proxyObj[0] = '大学物理'; // 输出：触发了set
// console.log(proxyObj[0]); //输出：触发了get 大学物理

// 检验push增加的元素能否被监听
proxyObj.push('线性代数'); // 输出：触发get 触发get 触发set 触发set
console.log(proxyObj); //输出: 线性代数

// 为什么push时触发了两次get和两次set？这和push的实现原理有关：push操作除了增加数组的数据项之外，也会引发数组本身其他相关属性的改变。
