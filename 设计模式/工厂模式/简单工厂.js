function User(name, age, career) {
    this.name = name;
    this.age = age;
    this.career = career;
}

const user = new User('小明', 18, '学生');

// 麻烦增加一个职责的特性

function Coder(name, age) {
    this.name = name;
    this.age = age;
    this.career = 'coder';
    this.work = ['写代码', '写系分', '修Bug'];
}
function ProductManager(name, age) {
    this.name = name;
    this.age = age;
    this.career = 'product manager';
    this.work = ['订会议室', '写PRD', '催更'];
}

// 呃。。。。，貌似不太行？

// 那要不这样？

function User(name, age, career, work) {
    this.name = name;
    this.age = age;
    this.career = career;
    this.work = work;
}

function Factory(name, age, career) {
    let work;
    switch (career) {
        case 'coder':
            work = ['写代码', '写系分', '修Bug'];
            break;
        case 'product manager':
            work = ['订会议室', '写PRD', '催更'];
            break;
        case 'boss':
            work = ['喝茶', '看报', '见客户'];
        case 'xxx':
        // 其它工种的职责分配
        // ...
    }
    return new User(name, age, career, work);
}

const person = new Factory('小明', 18, 'coder');

// 好像好点了，实现无脑传参，有点爽了

// 将创建对象的过程单独封装

// 那么我现在要增加权限控制，不同的人拥有不同的权限，难道要修改 Factory 的函数体、增加管理层相关的判断和处理逻辑？

// 这样会不会导致Factory会变得异常庞大？貌似没有遵守开放封闭原则？？？
