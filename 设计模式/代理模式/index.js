class ProxyImg {
    constructor(imgELe) {
        this.imgELe = imgELe;
        this.DEFAULT_URL = 'xxx';
    }
    setUrl(targetUrl) {
        this.imgEle.src = this.DEFAULT_URL;
        const image = new Image();

        image.onload = () => {
            this.imgEle.src = targetUrl;
        }
        image.src = targetUrl;
    }
}


const countSum = (...arg) => {
    console.log('count...');
    let result = 0;
    arg.forEach(v => result += v);
    return result;
}

const proxyCountSum = (() => {
    const cache = {};
    return (...arg) => {
        const args = arg.join(',');
        if (args in cache) return cache[args];
        return cache[args] = countSum(...arg);
    };
})()

proxyCountSum(1, 2, 3, 4); // count...  10
proxyCountSum(1, 2, 3, 4); // 10