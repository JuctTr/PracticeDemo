// npx tsc ./TypeScript/enum.ts
// ============== 常数项（constant member）=============
var DifficultyLevel;
(function (DifficultyLevel) {
    DifficultyLevel[DifficultyLevel["Easy"] = 0] = "Easy";
    DifficultyLevel[DifficultyLevel["Intermediate"] = 1] = "Intermediate";
    DifficultyLevel[DifficultyLevel["Hard"] = 2] = "Hard";
})(DifficultyLevel || (DifficultyLevel = {}));
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
var Days;
(function (Days) {
    Days[Days["Sun"] = 3] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
console.log(Days['Sun'] === 3); // true
console.log(Days['Wed'] === 3); // true
console.log(Days[3] === 'Sun'); // false
console.log(Days[3] === 'Wed'); // true
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
