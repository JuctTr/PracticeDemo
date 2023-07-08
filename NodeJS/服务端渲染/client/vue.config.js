// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })


const TARGET_NODE = process.env.WEBPACK_TARGET === 'node';
const serverConfig = require('./vue.server.config');
const clientConfig = require('./vue.client.config');

if (TARGET_NODE) {
  module.exports = serverConfig;
} else {
  module.exports = clientConfig;
}
