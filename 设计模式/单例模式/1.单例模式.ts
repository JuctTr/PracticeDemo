class Singleton {
    name: string;
    static instance: Singleton | null;
    constructor(name: string) {
        this.name = name;
        Singleton.instance = null; // 静态成员变量
    }

    /**
     * 静态方法 返回其所属类的一个相同实例
     * 单例的构造函数必须对客户端(Client) 代码隐藏。 调用获取实例方法必须是获取单例对象的唯一方式。
     * @param {*} name
     * @returns
     */
    static getInstance(name: string) {
        if (!this.instance) {
            this.instance = new Singleton(name);
        }
        return this.instance;
    }

    getName() {
        console.log(this.name);
    }
}

const a = Singleton.getInstance('sven1');
const b = Singleton.getInstance('sven2');

console.log(a === b);

// =============================== 或者 ===============================

// var Singleton2 = function (name) {
//     this.name = name;
// };
// Singleton2.prototype.getName = function () {
//     alert(this.name);
// };
// Singleton2.getInstance = (function () {
//     var instance = null;
//     return function (name) {
//         if (!instance) {
//             instance = new Singleton2(name);
//         }
//         return instance;
//     };
// })();

// const c = Singleton2.getInstance('sven1');
// const d = Singleton2.getInstance('sven2');

// console.log(c === d);

/**
 * 透明的单例模式
 */
// class CreateDiv {
//     html: string;
//     static instance: CreateDiv | null;
//     constructor(html: string) {
//         if (CreateDiv.instance) {
//             return CreateDiv.instance;
//         }
//         this.html = html;
//         this.init();
//         return (CreateDiv.instance = this);
//     }

//     init() {
//         // const div: HTMLDivElement = document.createElement('div');
//         // div.innerHTML = this.html;
//         // document.body.appendChild(div);
//     }
// }

// const CreateDiv = (function () {
//     let instance;
//     const CreateDiv = function (html) {
//         if (instance) {
//             return instance;
//         }
//         this.html = html;
//         this.init();
//         return (instance = this);
//     };
//     CreateDiv.prototype.init = function () {
//         const div = document.createElement('div');
//         div.innerHTML = this.html;
//         document.body.appendChild(div);
//     };
//     return CreateDiv;
// })();

// const c = new CreateDiv('foo');
// const d = new CreateDiv('bar');
// console.log(c === d); // true

/**
 * =============================== 用代理实现单例模式 ===============================
 */
// const CreateDiv = function (html) {
//     this.html = html;
//     this.init();
// };

// CreateDiv.prototype.init = function () {
//     var div = document.createElement('div');
//     div.innerHTML = this.html;
//     document.body.appendChild(div);
// };

// const ProxySingletonCreateDiv = (function () {
//     let instance;
//     return function (html) {
//         if (!instance) {
//             // 代理给 CreateDiv
//             instance = new CreateDiv(html);
//         }
//         return instance;
//     };
// })();

// const e = new ProxySingletonCreateDiv('foo');
// const f = new ProxySingletonCreateDiv('bar');

// console.log(e === f);

/**
 * =============================== 通用的惰性单例 ===============================
 */
var getSingle = function (fn) {
    var result;
    return function () {
        return result || (result = fn.apply(this, arguments));
    };
};

var createLoginLayer = function () {
    var div = document.createElement('div');
    div.innerHTML = '我是登录浮窗';
    div.style.display = 'none';
    document.body.appendChild(div);
    return div;
};
var createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick = function () {
    var loginLayer = createSingleLoginLayer();
    loginLayer.style.display = 'block';
};
