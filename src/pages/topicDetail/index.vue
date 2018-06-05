<template>
  <div class="detail-container">
    <loading v-if="showLoading"></loading>
    <div v-else class="detail-bg">
      <div class="detail-wrap">
        <div class="item-header">
          <div class="item-author-wrap">
            <div class="item-author">
              <img :src="detailData.author.avatar_url"/>
            </div>
            <div class="author-info">
              <span class="author-name">{{detailData.author.loginname}}</span>
              <span class="create-time">{{createAt}}</span>
            </div>
          </div>
          <span class="item-tag" :style="{'background-color':tagBgColor}">{{displayTag}}</span>
        </div>

        <div class="main">
          <div class="item-title">{{detailData.title}}</div>
          <div class="item-content">
            <wx-parse :content="detailData.content" imageMode="widthFix"></wx-parse>
          </div>
        </div>
      </div>

      <div class="reply-wrap detail-wrap" v-if="detailData.replies.length>0">
        <div v-for="(data,index) in detailData.replies" :key="index">
          <reply :replyData="data"></reply>
        </div>
      </div>
    </div>

    <div v-show="!showLoading">
      <div class="reply-edit-wrap" v-show="!showReplyContent" @click="showReply">
        <img src="/static/images/reply.png"/>
      </div>

      <div class="reply-text-content" v-show="showReplyContent">
        <div class="reply-text-cover" @click="showReply"></div>
        <div class="input-wrap">
          <textarea v-model.lazy="replyContent" cursor-spacing="20"></textarea>
          <button class="primary" @click="submitReply">回复</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import '../../../static/css/common.css'
  import '../../../static/css/cnode.css'
  import wxParse from 'mpvue-wxparse'
  import reply from '@/components/reply'
  import loading from '@/components/loading'
  import api from '../../utils/comAPI'
  export default {
    data(){
      return{
        tagBgColor:'#ddd',
        detailData:{},
        showLoading:true,
        currentId:'',
        showReplyContent:false,
        replyContent:'',
        showReplyWrap:false
      }
    },
    computed: {
      displayTag() {
        let tag = '';
        if (this.detailData.top) {
          tag = '置顶';
          this.tagBgColor='red'
        } else if (this.detailData.good) {
          tag = '精华';
          this.tagBgColor='red';
        } else {
          let tagObj = {'ask': '问答', 'share': '分享', 'good': '精华', 'job': '招聘'};
          tag = tagObj[this.detailData.tab];
          this.tagBgColor='#ddd';
        }
        return tag;
      },
      createAt() {
        return moment(this.detailData.create_at).format("YYYY-MM-DD HH:mm:ss");
      }
    },

    methods:{
      showReply(){
        //登录后才能回复
        if(this.$store.state.token){
          this.showReplyContent=!this.showReplyContent;
        }else {
          wx.showToast({title: '请先登录!', icon: 'none'});
        }
      },
      submitReply(){
        if (!this.replyContent.trim()) {
          wx.showToast({title: '回复数不能为空!', icon: 'none'});
          return;
        }
        api.reply({
          id:this.detailData.id,
          token:this.$store.state.token,
          content:this.replyContent
        }).then(resp=>{
          if(resp.success){
            wx.showToast({title: '回复成功!', icon: 'none'});
            this.currentId='';
            this.refreshTopic();
          }
          this.showReplyContent=!this.showReplyContent;
          this.replyContent='';
        })
      },

      refreshTopic(){
        let id=this.$root.$mp.query.id;
        if(this.currentId!==id){
          this.showLoading=true;
          this.detailData={};
          api.getTopicDetail(id).then(resp=>{
            this.showLoading=false;
            if(resp.success){
              this.detailData=resp.content;
            }
          });
          this.currentId=id;
        }
      }
    },

    //小程序的生命周期函数,onShow比mounted早执行
    onShow(){
      this.refreshTopic();
    },

    components:{
      wxParse,
      reply,
      loading
    }
  }
</script>

<style scoped>
  .detail-container{
    height: 100%;
    width: 100%;
  }
  .detail-bg{
    background-color: #ddd;
  }
  .detail-wrap{
    padding: 8rpx 16rpx;
    background-color: #fff;
    border-radius: 10rpx;
  }

  .main{
    padding-top: 10rpx;
    background-color: #fff;
  }
  .main>.item-title{
    padding-bottom: 4rpx;
    border-bottom: 1px solid #ddd;
  }
  .main>.item-content{
    font-size: 28rpx;
  }
  .reply-wrap{
    margin-top:16rpx;
  }
  .reply-edit-wrap{
    position:fixed;
    bottom:30px;
    right:30px;
    background-color:#fff;
    padding:8px;
    border:1px solid #f4f4f4;
    border-radius:30px;
    box-shadow:0 0 3px 3px #eee;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .reply-edit-wrap>image{
    width:24px;
    height:24px;
    margin-right: 0;
  }
  .input-wrap {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    height: 216px;
  }
  textarea {
    height: 300rpx;
    width: 100%;
    background-color: #fff;
    padding: 10px;
    background-color: #fff;
  }
  .primary {
    color: #FFFFFF;
    background-color: #1AAD19;
    width: 100%;
  }
  .reply-text-content{
    flex-direction:column;
    position:fixed;
    bottom:0;
    width:100%;
    height:100%;
    background-color: rgba(221, 221, 221, 0.9);
  }
  .reply-text-cover{
    height: calc(100% - 216px);
  }
</style>
