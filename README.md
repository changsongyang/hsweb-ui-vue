# hs

> A Vue.js project

项目启动默认是http://localhost:8082。可以在`config/index.js`里修改端口`port: process.env.PORT || 8082`

index.js

```js
dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8082,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {}
      }
    },
```

## Build Setup

``` bash
# install dependencies
# 安装依赖
npm install

# serve with hot reload at localhost:8080
# 本地开发环境运行
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
