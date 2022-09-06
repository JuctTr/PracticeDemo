# 设计模式

[TOC]



## 前提

本文档为学习`Dive Into DESIGN PATTERNS（深入设计模式）` 和 `JavaScript设计模式与开发实践`两本书的笔记。

一开始看这两本书的时候，并没有从头到尾按顺序看，而是选择某一个小节或某一个设计模式，逐个学习，由于本人日常接触的语言为JavaScript，所以在看`深入设计模式`这本书时，觉得比较吃力，后来对比了两本书，逐渐把思维切换面向对象编程，也就是书中前面几章所提到的 `面向对象程序设计基础` 的理论概念，书中提到demo才能够更好的理解。

虽然平时也有接触`TypeScript`，但是在`面向对象编程`的理论概念上，理解还是没那么深刻，所以读者最好根据自己目前的水平，采取适合自己的阅读方式。

## 定义

设计模式是针对软件设计中常见问题的工具箱， 其中的工具 就是各种经过实践验证的解决方案。

## 软件的设计原则

### 代码复用

- 降低成本
- 减少时间

### 扩展性

- **变化**是程序员生命中唯一不变的事情。（需求变更、迭代）

- 尽量选择支持未来任何可能变更的方式来编写代码。

## **SOLID** 原则

### 单一职责原则（Single Responsibility Principle）

> 1、一个对象(方法)只做一件事情。
>
> 2、尽量让每个类只负责软件中的一个功能， 并将该功能完全封装(你也可称之为隐藏)在该类中。

#### 单例模式

#### 代理模式

#### 迭代器模式

#### 装饰者模式

#### SRP 原则优缺点

【优点】：

是**降低了单个类或者对象的复杂度**，按照职责把对象**分解成更小的粒度**， 这有助于代码的复用，也有利于进行单元测试。当一个职责需要变更的时候，不会影响到其他 的职责。

【缺点】：

最明显的是会**增加编写代码的复杂度**。当我们按照职责把对象分解成更小的粒度之后，实际上也增大了这些对象之间相互联系的难度。



### 开放-封闭原则（Open/Closed Principle）

#### 终极定义

对于扩展，类（函数）应该是“开放”的；对于修改，类（函数）则应 是“封闭”的。

类，在JavaScript的ES6之前，我们称为函数；可能上面这句话一开始看到，并不那么容易理解，下面我们通过例子来印证这句话。

#### 例子

某一天，小明接手一个拥有 10 万行以上的 JavaScript 代码和数百个 JS 文件，某天接收到一个新需求，即在 window.onload 函数中打印出页面中的所有节点数量。于是，小明一顿操作猛如虎：

- 打开代码仓库
- Ctrl + F 搜索 window.onload 函数的位置
- 新增一行 `console.log( document.getElementsByTagName( '*' ).length );`
- 完成，提交，发布

这样的方式当然是没有问题的，但是上方只是举一个简单的例子，而当我们的场景，变成了这样；

现状：目前的 window.onload 函数是一个拥有 500 行代码的巨型函数，里面密布着各种变量和 交叉的业务逻辑；

你的新需求也不仅仅只是新增一行log打印这么简单，那么“改好一个 bug，引发其他 bug”这样的事情就很可能会发生。我们永远不知道刚刚的改动会有什么副作用，很可能会引发一系列的连锁反应。

#### 问题：怎么在不修改源代码的情况下，实现新功能（新需求）？

我们通过动态装饰函数的方式来实现：

```javascript
Function.prototype.after = function( afterfn ){ 
  var __self = this;
	return function() {
		var ret = __self.apply( this, arguments );
    afterfn.apply( this, arguments );
		return ret;
	} 
};
( window.onload || function(){} ).after(function(){ 
  console.log( document.getElementsByTagName( '*' ).length );
});
```

完全不用理会从前 window.onload 函数的内部实现，新增的代码和原 有的代码可以井水不犯河水。

> 开放—封闭原则的思想：当需要改变一个程序的功能或者给这个程序增加新功 能的时候，可以使用增加代码的方式，但是不允许改动程序的源代码。
>
> 也就是实现新功能时能保持已有代码不变。

#### 多态消除条件分支

如下有两份`代码片段`，它们有同样的需求，在原有的代码上，新增一只🐶，并且可以发出🐶叫声，我们寻找一个它们之间的差异点

代码片段1：

```javascript
var makeSound = function (animal) {
    if (animal instanceof Duck) {
        console.log('嘎嘎嘎');
    } else if (animal instanceof Chicken) {
        console.log('咯咯咯');
    }
};
var Duck = function () {};
var Chicken = function () {};
makeSound(new Duck());
makeSound(new Chicken());
// 后来，动物世界里增加一只狗之后，makeSound 函数必须改成:
var makeSound = function (animal) {
    if (animal instanceof Duck) {
        console.log('嘎嘎嘎');
    } else if (animal instanceof Chicken) {
        console.log('咯咯咯');
    } else if (animal instanceof Dog) {
        // 增加跟狗叫声相关的代码
        console.log('汪汪汪');
    }
};
var Dog = function () {};
makeSound(new Dog()); // 增加一只狗
```

代码片段2：

```javascript
var makeSound = function (animal) {
    animal.sound();
};
var Duck = function () {};
Duck.prototype.sound = function () {
    console.log('嘎嘎嘎');
};
var Chicken = function () {};
Chicken.prototype.sound = function () {
    console.log('咯咯咯');
};
makeSound(new Duck()); // 嘎嘎嘎
makeSound(new Chicken()); // 咯咯咯
/********* 增加动物狗，不用改动原有的 makeSound 函数 ****************/
var Dog = function () {};
Dog.prototype.sound = function () {
    console.log('汪汪汪');
};
makeSound(new Dog()); // 汪汪汪
```

很明显，片段2利用多态的思想，我们把程序中不变的部分隔离出来(动物都会叫)，然后把可变的部分封 装起来(不同类型的动物发出不同的叫声)，这样一来程序就具有了可扩展性。

> 开放—封闭原则的规律，找出程序中将要发生变化的地方，然后把变化封装起来。

#### 其他应用

- 放置挂钩
- 使用回调函数

#### 设计模式中的开放-封闭原则

- 发布—订阅模式
- 模板方法模式
- 策略模式
- 代理模式
- 职责链模式



### 最少知识原则（迪米特法则）





### 依赖倒置原则







## 创建型设计模式

### 单例模式

#### 定义

单例是一种创建型设计模式， 让你能够保证一个类仅有一个实例，并提供一个访问该实例的全局访问点。

> 单例模式的核心是确保只有一个实例，并提供全局访问。



### 策略模式

> 定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换

策略模式的实现并不复杂，关键是如何从策略模式的实现背后，找到**封装变化**、**委托**和**多态性**这些思想的价值。



### 代理模式

