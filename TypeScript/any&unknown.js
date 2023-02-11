var tAny = 'any';
var tUnknown = 'unknown';
var tNumber = 0;
tNumber = tAny;
// tNumber = tUnknown; // 不能将类型“unknown”分配给类型“number”。
tAny = tUnknown;
tUnknown = tAny;
tUnknown = tNumber;
