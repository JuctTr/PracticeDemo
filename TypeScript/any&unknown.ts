let tAny: any = 'any';

let tUnknown: unknown = 'unknown';

let tNumber: number = 0;
let tString: string = 'string';

tNumber = tAny;

// tNumber = tUnknown; // 不能将类型“unknown”分配给类型“number”。
// tString = tUnknown; // 不能将类型“unknown”分配给类型“string”。

tAny = tUnknown;
tUnknown = tAny;
tUnknown = tNumber;

const dataMethod: any = 'Hello world!';
dataMethod.hello();

const dataMethod1: unknown = 'Hello world!';
dataMethod1.hello(); // “dataMethod1”的类型为“未知”。
