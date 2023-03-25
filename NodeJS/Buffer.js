const fs = require('fs');

const rs = fs.createReadStream(`${__dirname}/test.md`, { highWaterMark: 11 });
rs.setEncoding('utf8');
let i = 0;
// console.log(rs);
rs.on('data', function (chunk) {
    // console.log(chunk.toString());
    console.log(chunk, i++);
});

rs.on('end', function () {
    // console.log(data);
});

// var StringDecoder = require('string_decoder').StringDecoder;
// var decoder = new StringDecoder('utf8');

// var buf1 = new Buffer.from([0xe5, 0xba, 0x8a, 0xe5, 0x89, 0x8d, 0xe6, 0x98, 0x8e, 0xe6, 0x9c]);
// console.log(decoder.write(buf1));
// // => 床前明

// var buf2 = new Buffer.from([0x88, 0xe5, 0x85, 0x89, 0xef, 0xbc, 0x8c, 0xe7, 0x96, 0x91, 0xe6]);
// console.log(decoder.write(buf2));
