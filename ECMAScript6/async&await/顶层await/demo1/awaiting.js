let output;

async function fetchUrl() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(20), 1000);
    });
}

async function main() {
    const dynamic = await fetchUrl();
    // const data = await fetch(url);
    // ......
    // output = someProcess(dynamic.default, data);
    output = dynamic;
}

main();

export { output };
