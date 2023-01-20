/**
 * @description 该函数仅可用于该原始类型。但该函数并不是可扩展或通用的
 * @param value
 * @returns
 */
function identity1(value: Number): Number {
    return value;
}

console.log(identity1(1)); // 1

/**
 * @description 使用泛型来解决这个问题
 * @param value
 * @returns
 */
function identity2<T>(value: T): T {
    return value;
}

console.log(identity2<Number>(1)); // 1

/**
 * 1、K（Key）：表示对象中的键类型；
 * 2、V（Value）：表示对象中的值类型；
 * 3、E（Element）：表示元素类型。
 * @description 我们可以引入希望定义的任何数量的类型变量
 * @param value
 * @param message
 * @returns
 */
function identity3<T, U>(value: T, message: U): T {
    console.log(message);
    return value;
}

console.log(identity3<Number, string>(68, 'Semlinker'));

/**
 * 使用元组
 * @param value
 * @param message
 * @returns
 */
function identity4<T, U>(value: T, message: U): [T, U] {
    return [value, message];
}

// ===================================== 泛型接口 =====================================
interface Identities<V, M> {
    value: V;
    message: M;
}

function identity5<T, U>(value: T, message: U): Identities<T, U> {
    console.log(value + ': ' + typeof value);
    console.log(message + ': ' + typeof message);
    let identities: Identities<T, U> = {
        value,
        message,
    };
    return identities;
}

console.log(identity5(68, 'Semlinker'));

// ===================================== 泛型类 =====================================
interface GenericInterface<U> {
    value: U;
    getIdentity: () => U;
}

class IdentityClass<T> implements GenericInterface<T> {
    value: T;

    constructor(value: T) {
        this.value = value;
    }

    getIdentity(): T {
        return this.value;
    }
}

const myNumberClass = new IdentityClass<Number>(68);
console.log(myNumberClass.getIdentity()); // 68

const myStringClass = new IdentityClass<string>('Semlinker!');
console.log(myStringClass.getIdentity()); // Semlinker!

// ===================================== React中的应用 =====================================

type Props = {
    className?: string;
    //  ...
};

type State = {
    submitted?: boolean;
    //  ...
};

// class MyComponent extends React.Component<Props, State> {
//     //  ...
// }

// ===================================== 泛型约束 =====================================
/**
 * 编译器将不会知道 T 确实含有 length 属性
 * @param arg
 * @returns
 */
function identity6<T>(arg: T): T {
    // console.log(arg.length); // 类型“T”上不存在属性“length”。

    return arg;
}

/**
 * 使用 extends 关键字 对泛型进行约束
 */
interface Length {
    length: number;
}

function identity7<T extends Length>(arg: T): T {
    console.log(arg.length); // 可以获取length属性
    return arg;
}
// identity7(68);
// Argument of type '68' is not assignable to parameter of type 'Length'.(2345)

function identity8<T>(arg: T[]): T[] {
    console.log(arg.length);
    return arg;
}

// or
function identity9<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);
    return arg;
}

// ===================================== 使用 keyof 检查对象上的键是否存在 =====================================

interface Person {
    name: string;
    age: number;
    location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[]; // number | "length" | "push" | "concat" | ...
type K3 = keyof { [x: string]: Person }; // string | number

/**
 * 通过 K extends keyof T 确保参数 key 一定是对象中含有的键
 * @param obj
 * @param key
 * @returns
 */
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

enum Difficulty {
    Easy,
    Intermediate,
    Hard,
}

let tsInfo = {
    name: 'Typescript',
    supersetOf: 'Javascript',
    difficulty: Difficulty.Intermediate,
};

let difficulty: Difficulty = getProperty(tsInfo, 'difficulty'); // OK

// let supersetOf: string = getProperty(tsInfo, 'superset_of');
// 类型“"superset_of"”的参数不能赋给类型“"difficulty" | "name" | "supersetOf"”的参数。

// ===================================== 泛型参数默认类型 =====================================
interface A<T = string> {
    name: T;
}

const strA: A = { name: 'Semlinker' };
const numB: A<number> = { name: 101 };

// ===================================== 泛型条件类型 =====================================
// T extends U ? X : Y
/**
 * 以上表达式的意思是：若 T 能够赋值给 U，那么类型是 X，否则为 Y。
 * 在条件类型表达式中，我们通常还会结合 infer 关键字，实现类型抽取：
 */

interface Dictionary<T = any> {
    [key: string]: T;
}

type StrDict = Dictionary<string>;

type DictMember<T> = T extends Dictionary<infer V> ? V : never;
type StrDictMember = DictMember<StrDict>; // string

// ===================================== 泛型工具类型 =====================================

// ===================================== Partial的应用 ===================================
interface TodoPartial {
    title: string;
    description: string;
}

function updateTodo(todo: TodoPartial, fieldsToUpdate: Partial<TodoPartial>) {
    return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
    title: 'organize desk',
    description: 'clear clutter',
};

const todo2 = updateTodo(todo1, {
    description: 'throw out trash',
});
console.log(todo2);

// ===================================== Pick的应用 =====================================

interface TodoPick {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = Pick<TodoPick, 'title' | 'completed'>;

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
};

// ===================================== 泛型创建对象 =====================================

class FirstClass {
    id: number | undefined;
}

class SecondClass {
    name: string | undefined;
}

class GenericCreator<T> {
    create<T>(c: { new (): T }): T {
        return new c();
    }
}

const creator1 = new GenericCreator<FirstClass>();
const firstClass: FirstClass = creator1.create(FirstClass);

const creator2 = new GenericCreator<SecondClass>();
const secondClass: SecondClass = creator2.create(SecondClass);
