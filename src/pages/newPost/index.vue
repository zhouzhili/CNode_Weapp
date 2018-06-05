<template>
  <div class="container">
    <div class="text">标题:</div>
    <div class="input-wrap">
      <input placeholder="请输入标题,10个字以上" v-model.lazy="title"/>
    </div>
    <div class="text">内容:</div>
    <div class="input-wrap">
      <textarea placeholder="请输入内容" v-model.lazy="content"></textarea>
    </div>
    <div class="picker-wrap">
      <span>主题</span>
      <picker :range="range" :value="rangeIndex" @change="pickerChange">
        <div>{{range[rangeIndex]}}</div>
      </picker>
    </div>
    <button class="primary" @click="postNewTopic" :disabled="token==''">发帖</button>
    <span class="text" v-show="token==''">登录后才能发帖,请先前往用户界面登录</span>
  </div>

</template>

<script>
  import api from '../../utils/comAPI'

  export default {
    data() {
      return {
        title: '',
        content: '',
        range: ['问答', '分享', '招聘', '测试'],
        tab: ['ask', 'share', 'job', 'dev'],
        rangeIndex: 0,
        disable: true,
        token: ''
      }
    },

    onShow() {
      this.token = this.$store.state.token;
      wx.setNavigationBarTitle({
        title:'发布主题'
      })
    },

    methods: {
      pickerChange(e) {
        this.rangeIndex = e.mp.detail.value;
      },
      //发帖
      postNewTopic() {
        if (!this.title.trim() || this.title.length < 10) {
          wx.showToast({title: '标题不能为空或少于10个字', icon: 'none'});
          return;
        }
        if (!this.content.trim()) {
          wx.showToast({title: '内容不能为空', icon: 'none'});
          return
        }

        api.postNewTopics({
          accesstoken: this.token,
          title: this.title,
          tab: this.tab[this.rangeIndex],
          content: this.content
        }).then(resp => {
          if (resp.success) {
            wx.showToast({title: '发布成功!'});
            this.title = '';
            this.content = '';
          } else {
            console.log(resp);
            wx.showToast({title: `发布失败:${resp.message.error_msg}`, icon: 'none'});
          }
        })
      }
    }
  }
</script>

<style scoped>
  .container {
    background-color: #F8F8F8;
    font-size: 30rpx;
    color: #696969;
  }

  .text {
    margin-top: .77em;
    margin-bottom: .3em;
    padding-left: 15px;
    padding-right: 15px;
    color: #999;
    font-size: 14px;
  }

  .input-wrap {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }

  input {
    height: 2.58823529em;
    min-height: 2.58823529em;
    line-height: 2.58823529em;
    background-color: #fff;
    padding: 10rpx;
  }

  textarea {
    height: 300rpx;
    width: 100%;
    background-color: #fff;
    padding: 10rpx;
  }

  .picker-wrap {
    display: flex;
    align-items: center;
    background-color: #fff;
    margin-top: 20rpx;
  }

  .picker-wrap > span {
    padding: 0 20rpx;
    color: #999;
    font-size: 14px;
  }

  picker {
    height: 2.58823529em;
    min-height: 2.58823529em;
    line-height: 2.58823529em;
    background-color: #fff;
    border-left: 1px solid #eee;
    padding: 10rpx;
    flex: 1;
  }

  .primary {
    color: #FFFFFF;
    background-color: #1AAD19;
    width: 96%;
    margin-top: 30rpx;
  }
</style>
