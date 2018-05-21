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
        currentId:''
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

    //小程序的生命周期函数,onShow比mounted早执行
    onShow(){
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
</style>
