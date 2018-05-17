<template>
  <div class="container">
    <div class="blue-bg"></div>

    <div class="user-info-wrap" v-show="!login">
      <div class="user-info">
        <img src="../../../static/images/loginDefault.png" @click="handleLogin"/>
        <div>
          <span>请点击头像登录</span>
        </div>
      </div>
    </div>

    <div v-show="login">
      <div class="user-info-wrap">
        <div class="user-info">
          <img :src="user.avatar_url"/>
          <div>
            <span>{{user.githubUsername}}</span>
            <span class="logout">[注销]</span>
          </div>
          <div>
            <span>积分 {{user.score}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import api from '../../utils/comAPI'
  export default {
    data() {
      return {
        user: {
          loginname: "",
          avatar_url: "",
          githubUsername: "",
          create_at: "",
          score: '',
          recent_topics: [],
          recent_replies: []
        },
        login: false
      }
    },
    onShow(){
      try{
        let userInfo=wx.getStorageSync('userInfo');
        if(userInfo){
          this.user=userInfo;
          this.login=true;
        }else {
          let token=wx.getStorageSync('accessToken');
          if(token){
            this.loginByToken(token);
          }
        }
      }catch(err) {
        this.login=false;
      }
    },
    methods: {
      handleLogin() {
        let self=this;
        wx.scanCode({
          success: (res) => {
            let accessToken = res.result;
            //存储token
            wx.setStorage({key:'accessToken',data:accessToken});
            //登录
            self.loginByToken(accessToken);
          },
          fail: (err) => {
            wx.showToast({title: '获取token失败', icon: 'none'});
          }
        })
      },

      //通过token登录
      loginByToken(token){
        api.login(token).then(resp=>{
          if(resp.success){
            this.user=resp.content;
            this.login=true;
            //存储用户
            wx.setStorage({key:'userInfo',data:resp.content});
          }else {
            wx.showToast({title: 'token无效', icon: 'none'});
          }
        })
      }
    },
    components: {}
  }
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

  .user-info-wrap {
    border-bottom:1px solid #ddd;
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
    background-color: #0099CC;
    height: 400rpx;
    width: 100%;
  }

  .logout {
    margin-left: 10rpx;
  }
</style>
