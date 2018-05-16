import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main', 'pages/newPost/main', 'pages/notice/main', 'pages/user/main','pages/topicDetail/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'CNode',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: "pages/index/main",
          text: "首页",
          iconPath: 'static/images/home.png',
          selectedIconPath: 'static/images/home-2.png'
        },
        {
          pagePath: "pages/newPost/main",
          text: "发帖",
          iconPath: 'static/images/post.png',
          selectedIconPath: 'static/images/post-2.png'
        },
        {
          pagePath: "pages/notice/main",
          text: "通知",
          iconPath: 'static/images/notice.png',
          selectedIconPath: 'static/images/notice-2.png'
        },
        {
          pagePath: "pages/user/main",
          text: "用户",
          iconPath: 'static/images/user.png',
          selectedIconPath: 'static/images/user-2.png'
        }

      ]
    },
  }
}
