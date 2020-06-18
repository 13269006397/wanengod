module.exports = { // ...
  dev: {
    // 静态资源文件夹
    assetsSubDirectory: 'static',
    // 发布路径
    assetsPublicPath: '/',
    // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
    // 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
    // 使用方法：https://vuejs-templates.github.io/webpack/proxy.html
    proxyTable: {
      '/api': {
        target: 'http://localhost:9005/',
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': '' // 实际请求去掉/api以空字符串代替
        }
      }
    },
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080
  }
}
