/**
 * @description 把一个url的query参数，解析成指定格式的对象
 * @param {*} url
 * @returns
 */
function parseQuery(url) {
    // const [queryString] = url.split('#');
    const [urlStr, queryQarams] = url.split('?');
    const str = queryQarams.replace(/^\?/, '');

    console.log(str);
    const queries = str.split('&');
    console.log(queries);
    const params = {};
    for (let i = 0, l = queries.length; i < l; i++) {
        const [key, ...rest] = queries[i].split('='); // 取rest防止 query1=a=&query2=b这种情况
        console.log(key, rest);
        params[key] = decodeURIComponent(rest.join('='));
    }
    console.log(params);
    return params;
}

parseQuery('https://jucttr.github.io?tab=reps&name=xxx&a=&age=18');
