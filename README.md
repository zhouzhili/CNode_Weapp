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

1. mpvue不支持在组件引用时，定义在组件上的v-show（可用v-if记录）


2. 请求数据时使用axios库会报错，建议使用flyio库代替


3. 生命周期要弄清楚，vue的mounted函数是在页面显示之后(onShow)之后执行的，因此数据的更新加载需要在显示之前处理，及在onShow中处理

4. mpvue中store无法在new Vue的时候传入store，因此可以再main.js中导入store，并绑定到
     vue的构造函数原型上，这样每个.vue组件都可以通过this.$store访问到store对象。

```
   import store from './stores'
   Vue.prototype.$store=store
```

5. mpvue中样式单位可以用px的，推荐使用rem,编译工具会编译成rpx。
6. 下拉加载更多使用scrolltolower事件，前提是需要给scroll-view设置一个高度才可以。
7. 数据列表过多，显示卡顿？？https://github.com/Meituan-Dianping/mpvue/issues/181

#### 完成记录

2018-05-18 初步完成基本功能，含主页、发帖、通知、用户四大模块，目前告一段落，接下来完善，主要工作任务为下拉刷新和下拉加载，以及添加切换动画等工作。

