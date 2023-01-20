type MyNumber = number;
type StringOrNumber = string | number;
type Point = [number, number];

type User = {
    name: string;
};
// 标识符“User”重复。ts(2300)
// type User = {
//     id: number;
// };

// 交叉类型
type Sister1 = {
    sex: number;
};

type Sister2 = {
    sex: string;
};

type SisterAn = Sister1 & Sister2;
// 不报错，此时的 SisterAn 是一个'number & string'类型，也就是 never

function fun(a: Sister1) {
    console.log(a.sex);
}

// 接口扩展
interface Sister {
    sex: number;
}

// interface SisterAn1 extends Sister {
//     sex: string;
// }
// index.ts(5,11): error TS2430: Interface 'SisterAn' incorrectly extends interface 'Sister'.
//  Types of property 'sex' are incompatible.
//    Type 'string' is not assignable to type 'number'.
