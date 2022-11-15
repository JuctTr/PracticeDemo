// 把号码15800048653变成 158*****653

const str = '15800048653';

function tranform(str) {
    if (str.length <= 5) {
        return str.replace(/./g, '*');
    } else {
        return str.replace(/^(.{3}).?(.{3})$/, '$1*****$2');
    }
}

console.log(tranform('sdfssf'));
