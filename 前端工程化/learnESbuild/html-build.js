const { build } = require('esbuild');
const htmlPlugin = require('./html-plugin');
async function runBuild() {
    build({
        absWorkingDir: process.cwd(),
        entryPoints: ['./src/index.jsx'],
        outdir: 'dist',
        bundle: true,
        format: 'esm',
        splitting: true,
        sourcemap: true,
        metafile: true,
        plugins: [htmlPlugin()],
    }).then(() => {
        console.log('🚀 Build Finished!');
    });
}

runBuild();
