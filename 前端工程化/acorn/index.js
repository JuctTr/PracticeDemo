const acorn = require('acorn');
const util = require('util');

const code = `export default function add(a, b) { return a + b }`;

const ast = acorn.parse(code, { sourceType: 'module' });

console.log(util.inspect(ast, undefined, 10, true));
