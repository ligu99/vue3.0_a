// vue.config.js
module.exports = {
  // 选项...
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  // https://cli.vuejs.org/zh/guide/css.html#css-modules
  css: {
    loaderOptions: {
      // @/ 是 src/ 的别名
      // 所以这里假设你有 `src/variables.sass` 这个文件
      // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        prependData: `@import "~@/assets/variables.scss";`
      }
    }
  },

  devServer: {
    proxy: {
      '/devApi': {
        target: 'http://www.web-jshtml.cn/productapi',
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/devApi': ''
        }
      },
      "/v1": {
        target: 'https://wwwtest.ctyun.cn:21443',
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/v1': ''
        }
      }
    }
  }
};
