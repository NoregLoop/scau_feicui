const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',  //打包时改为  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: 80,
  },

  configureWebpack: {
    plugins: [new NodePolyfillPlugin()]
  }
})
