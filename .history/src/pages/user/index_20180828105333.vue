<template>
  <div>
    <div class="blue-bg"></div>

    <div v-show="!login">
      <div class="user-info">
        <img src="/static/images/loginDefault.png" @click="handleLogin" />
        <div>
          <span>请点击头像登录</span>
        </div>
      </div>
      <div class="column-flex tips-wrap">
        <div class="tips">
          <img src="/static/images/cnodejs.svg" />
          <div class="tips-msg">
            <span>该程序将从CNode获取以下信息:</span>
            <span>获取您的公开信息(昵称,头像等)</span>
            <span>我们保证信息安全,不泄露您的隐私</span>
          </div>
        </div>
        <div class="about-pj">
          <div>本项目为开源项目,项目地址为</div>
          <div>https://github.com/zhouzhili/CNode_Weapp.git</div>
        </div>
      </div>
    </div>

    <div v-show="login" :class="{'column-flex':login}">
      <div class="user-info-wrap">
        <div class="user-info">
          <img :src="user.avatar_url" />
          <div>
            <span>{{user.githubUsername}}</span>
            <span class="logout" @click="logOut">[注销]</span>
          </div>
          <div>
            <span>积分 {{user.score}}</span>
          </div>
        </div>
      </div>

      <div class="user-detail-info column-flex">
        <div class="tab-wrap">
          <div v-for="(item,index) in tabs" :key="index" class="tab-item" @click="handleChangeTab(index)">
            <span :class="{active:index==activeTab}">
              {{item}}
            </span>
          </div>
        </div>
        <div class="tab-content">
          <div :hidden="activeTab!=0">
            <div v-for="(data,index) in recentTopic" :key="index">
              <user-collection :data="data" :tab="tabs[0]"></user-collection>
            </div>
          </div>
          <div :hidden="activeTab!=1">
            <div v-for="(data,index) in recentReplies" :key="index">
              <user-collection :data="data" :tab="tabs[1]"></user-collection>
            </div>
          </div>
          <div :hidden="activeTab!=2">
            <div v-for="(data,index) in collections" :key="index">
              <user-collection :data="data" :tab="tabs[2]"></user-collection>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../utils/comAPI";
import userCollection from "@/components/userCollection";
export default {
  data() {
    return {
      login: false,
      user: {
        loginname: "",
        avatar_url: "",
        githubUsername: "",
        create_at: "",
        score: "",
        recent_topics: [],
        recent_replies: []
      },
      tabs: ["主题", "回复", "收藏"],
      activeTab: "",
      recentTopic: [],
      recentReplies: [],
      collections: []
    };
  },

  //先检查缓存是否已经登录
  onShow() {
    wx.setNavigationBarTitle({
      title: "个人主页"
    });
    try {
      this.getUserInfoFromCache();
    } catch (err) {
      this.login = false;
    }
  },

  //显示之后再获取其他信息
  mounted() {
    if (this.user.loginname) {
      //获取用户回复和收藏
      this.getUserTopic();
      this.getUserCollect();
    }
  },

  methods: {
    handleLogin() {
      let self = this;
      wx.scanCode({
        success: res => {
          let accessToken = res.result;
          //存储token
          self.$store.dispatch({
            type: "setTokenAsync",
            token: accessToken
          });
          //登录
          self.loginByToken(accessToken);
        },
        fail: err => {
          wx.showToast({ title: "获取token失败", icon: "none" });
        }
      });
    },

    logOut() {
      this.login = false;
      this.user = {
        loginname: "",
        avatar_url: "",
        githubUsername: "",
        create_at: "",
        score: "",
        recent_topics: [],
        recent_replies: []
      };
      this.recentTopic = [];
      this.recentReplies = [];
      this.collections = [];
      this.$store.dispatch({
        type: "setTokenAsync",
        token: ""
      });
      this.$store.dispatch({
        type: "setUserInfoAsync",
        userInfo: ""
      });
    },

    //tab切换
    handleChangeTab(index) {
      this.activeTab = index;
    },

    //通过token登录
    loginByToken(token) {
      wx.showLoading({ title: "正在获取用户信息" });
      api.login(token).then(resp => {
        wx.hideLoading();
        if (resp.success) {
          this.user = resp.content;
          this.login = true;
          //获取用户回复和收藏
          this.getUserTopic();
          this.getUserCollect();
          //存储用户
          this.$store.dispatch({
            type: "setUserInfoAsync",
            userInfo: resp.content
          });
        } else {
          wx.showToast({ title: "token无效", icon: "none" });
        }
      });
    },

    //从缓存获取用户数据
    getUserInfoFromCache() {
      let userInfo = this.$store.state.userInfo;
      if (userInfo) {
        this.user = userInfo;
        this.login = true;
      } else {
        let token = this.$store.state.token;
        if (token) {
          this.loginByToken(token);
        }
      }
    },

    //获取用户主题和回复
    getUserTopic() {
      api.getUserDetail(this.user.loginname).then(resp => {
        if (resp.success) {
          this.recentTopic = resp.content.recent_topics;
          this.recentReplies = resp.content.recent_replies;
        } else {
          wx.showToast({ title: "获取主题和回复失败", icon: "none" });
        }
      });
    },

    //获取用户收藏
    getUserCollect() {
      api.getUserCollect(this.user.loginname).then(resp => {
        if (resp.success) {
          this.collections = resp.content;
          for (let i = 0; i < 3; i++) {
            this.collections = this.collections.concat(resp.content);
          }
        } else {
          wx.showToast({ title: "获取收藏失败", icon: "none" });
        }
      });
    }
  },
  components: {
    userCollection
  }
};
</script>

<style scoped>
.btn {
  height: 80rpx;
  width: 100%;
  margin: 0 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.column-flex {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.tips-wrap {
  margin-top: 40rpx;
  padding-top: 10rpx;
  justify-content: center;
  align-items: center;
}
.tips-wrap img {
  width: 200rpx;
  height: 120rpx;
}
.tips {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-bottom: 40rpx;
}
.tips-msg {
  display: flex;
  flex-direction: column;
  color: #ddd;
  font-size: 24rpx;
}

.user-info-wrap {
  border-bottom: 1px solid #ddd;
  padding-bottom: 30rpx;
}

.user-info {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: -64rpx;
}

.user-info img {
  width: 128rpx;
  height: 128rpx;
  border-radius: 64rpx;
  box-shadow: 0 0 3rpx 3rpx #ddd;
}

.user-info span {
  color: #696969;
  font-size: 24rpx;
  margin-top: 10rpx;
}

.blue-bg {
  background-color: #0099cc;
  height: 100px;
  width: 100%;
}

.logout {
  margin-left: 10rpx;
}

.user-detail-info {
  border-top: 20rpx solid #eee;
}
.tab-wrap {
  display: flex;
  border-bottom: 1px solid #eee;
  margin-bottom: 10rpx;
}
.tab-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33.33%;
  height: 60rpx;
}
.tab-content {
  flex: 1;
}
.active {
  background-color: #0099cc;
  color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.about-pj {
  text-align: center;
  font-size: 12px;
  color: #939393;
  bottom: 20px;
  position: absolute;
}
</style>
