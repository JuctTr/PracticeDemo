const { build } = require('esbuild');

const path = require('path');

//用于存放扫描到的第三方依赖包名称
const deps = [];
function depScanPlugin(deps) {
    return {
        name: 'esbuild-plugin-dep-scan',
        setup(build) {
            //不能以.开头 "./index.js"不行
            //"react"可以
            build.onResolve({ filter: /^[^\.]/ }, args => {
                //将收集到的路径放入deps中即可
                console.log(args.path);
                deps.push(args.path);
                return {
                    path: args.path,
                };
            });
        },
    };
}
//进行依赖扫描
build({
    entryPoints: ['./index.jsx'],
    outdir: './dist',
    bundle: true,
    format: 'esm',
    splitting: true,
    sourcemap: true,
    metafile: true,
    plugins: [depScanPlugin(deps)],
}).then(() => {
    console.log(deps);
});

// build({
//     entryPoints: deps,
//     witre: true,
//     bundle: true,
//     format: 'esm',
//     outfile: path.resolve(process.cwd(), './node_modules/.vite/deps_temp'),
//     splitting: true,
// });
