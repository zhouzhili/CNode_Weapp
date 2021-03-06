# 基于 mpvue 的 CNode 小程序

> A Mpvue project

## Build Setup

```bash
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

1. mpvue 不支持在组件引用时，定义在组件上的 v-show（可用 v-if 记录）

2) 请求数据时使用 axios 库会报错，建议使用 flyio 库代替

3. 生命周期要弄清楚，vue 的 mounted 函数是在页面显示之后(onShow)之后执行的，因此数据的更新加载需要在显示之前处理，及在 onShow 中处理

4. mpvue 中 store 无法在 new Vue 的时候传入 store，因此可以再 main.js 中导入 store，并绑定到
   vue 的构造函数原型上，这样每个.vue 组件都可以通过 this.$store 访问到 store 对象。

```
   import store from './stores'
   Vue.prototype.$store=store
```

5. mpvue 中样式单位可以用 px 的，推荐使用 rem,编译工具会编译成 rpx。
6. 下拉加载更多使用 scrolltolower 事件，前提是需要给 scroll-view 设置一个高度才可以。
7. 数据列表过多，显示卡顿？？https://github.com/Meituan-Dianping/mpvue/issues/181

#### 完成记录

2018-05-18 初步完成基本功能，含主页、发帖、通知、用户四大模块，目前告一段落，接下来完善，主要工作任务为下拉刷新和下拉加载，以及添加切换动画等工作。

2018-08-28 很久没更新了，以后应该也不会再更新了，项目是一个半成品，以后重点可能就是可视化和公司其他业务了。

该项目仅供学习参考，第一次写，代码也不是很规范。

#### 小程序线上地址

<img src='static/images/cnodeweapp.jpg' alt='小程序码'>
