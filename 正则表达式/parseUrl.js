/**
 * @description 实现parse函数，解析协议、域名、path、query
 *  ?=xxx 匹配任何其后紧接指定字符串 xxx 的字符串
 */
var url = 'https://www.domain.com/order/index.html?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled#pageId';
function parseUrl(url) {
    var PARSE_URL_REG =
        /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    var matchResult = url.match(PARSE_URL_REG) || [];
    return {
        source: matchResult[0],
        protocol: matchResult[1],
        slash: matchResult[2],
        host: matchResult[3],
        port: matchResult[4],
        path: matchResult[5],
        query: parseQuery(matchResult[6]),
        hash: matchResult[7],
    };
}
function parseQuery(queryUrl) {
    var queries = queryUrl.split('&');
    var params = {};
    for (var i = 0, l = queries.length; i < l; i++) {
        var _a = queries[i].split('='),
            key = _a[0],
            rest = _a.slice(1); // 取rest防止 query1=a=&query2=b这种情况
        params[key] = safeDecodeURIComponent(rest.join('='));
    }
    return params;
}
function safeDecodeURIComponent(value) {
    try {
        if (/(%[0-9A-F]{2}){2,}/.test(value)) {
            // utf8编码
            return decodeURIComponent(value);
        } else {
            // unicode编码
            return unescape(value);
        }
    } catch (e) {
        return unescape(value);
    }
}
console.log(parseUrl(url));
