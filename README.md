# 基于mpvue的CNode小程序

> A Mpvue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

#### 踩坑记录 

---

1.mpvue不支持在组件引用时，定义在组件上的v-show（可用v-if记录）

2.请求数据时使用axios库会报错，建议使用flyio库代替



