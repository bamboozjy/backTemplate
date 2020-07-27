const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: './',
  assetsDir: 'static',
  lintOnSave: false,//不想使用 ESLint 校验 就赋值为false
  configureWebpack: config => {
    config.resolve = {
      extensions: [".js", ".vue", ".json", ".css"],
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": resolve("src")
      }
    };
  },
  /*devServer: {
    // open: process.platform === 'darwin',
    // host: 'localhost',
    // port: 8080,
    // open: true, //配置自动启动浏览器
    proxy: {
      "/opAdmin": {
        target: "http://116.62.65.193:8081", //对应自己的接口
        changeOrigin: true,
        pathRewrite: {
          "^/opAdmin": "/opAdmin" //将以 /opAdmin 开头的接口重写http://116.62.65.193:8081/opAdmin ,调用时直接以 /opAdmin开头即表示调用http://116.62.65.193:8081/opAdmin
          // "^/opAdmin": "/" //将以 /opAdmin 开头的接口重写http://116.62.65.193:8081/ ,调用时直接以 /opAdmin开头即表示调用http://116.62.65.193:8081/
        }
      },
      "/DoorStatus": {
        target: "http://47.93.11.102:8088", //对应自己的接口
        changeOrigin: true,
        pathRewrite: {
          "^/DoorStatus": "/DoorStatus" //重写接口
        }
      },
      "/Timer": {
        target: "http://47.111.160.164:8081", //对应自己的接口
        changeOrigin: true,
        pathRewrite: {
          "^/Timer": "/Timer" //重写接口
        }
      },
    }
  }*/
}
