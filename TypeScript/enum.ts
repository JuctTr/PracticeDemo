// npx tsc ./TypeScript/enum.ts

// ============== 常数项（constant member）=============

enum DifficultyLevel {
    Easy,
    Intermediate,
    Hard,
}

// ================= 手动赋值 ================
// enum Days {
//     Sun = 7,
//     Mon = 1,
//     Tue,
//     Wed,
//     Thu,
//     Fri,
//     Sat,
// }

// console.log(Days['Sun'] === 7); // true
// console.log(Days['Mon'] === 1); // true
// console.log(Days['Tue'] === 2); // true
// console.log(Days['Sat'] === 6); // true

enum Days {
    Sun = 3,
    Mon = 1,
    Tue,
    Wed,
    Thu,
    Fri,
    Sat,
}

console.log(Days['Sun'] === 3); // true
console.log(Days['Wed'] === 3); // true
console.log(Days[3] === 'Sun'); // false
console.log(Days[3] === 'Wed'); // true

// ============== 计算所得项（computed member）=============

// enum Color {
//     Red,
//     Green,
//     Blue = 'blue'.length,
// }

// err: 枚举成员必须具有初始化表达式。
// enum Color {
//     Red = 'red'.length,
//     Green,
//     Blue,
// }

// const enum Directions {
//     Up,
//     Down,
//     Left,
//     Right,
// }

// let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

declare enum Directions {
    Up,
    Down,
    Left,
    Right,
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
