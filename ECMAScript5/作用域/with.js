with (location) {
    // with block 作用域
    let qs = search.substring(1);
    let hostName = hostname;
    let url = href;
    console.log(qs, hostName, url);
}

with ({ name: 'jucttr', age: 18 }) {
    console.log(name, age);
}
