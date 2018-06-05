<!--详细页中的回复项-->
<template>
  <div class="reply-content">
    <div class="item-header">
      <div class="item-author-wrap">
        <div class="item-author">
          <img :src="replyData.author.avatar_url"/>
        </div>
        <div class="author-info">
          <span class="author-name">{{replyData.author.loginname}}</span>
          <span class="create-time">{{lastReply}}</span>
        </div>
      </div>
      <div v-if="replyData.ups.length>0" class="reply-ups">
        <img src="../../static/images/good.png"/>
        <span>{{replyData.ups.length}}</span>
      </div>
    </div>
    <div class="item-content reply-data-content">
      <wx-parse :content="replyData.content"></wx-parse>
    </div>
  </div>
</template>

<script>
  import '../../static/css/common.css'
  import '../../static/css/cnode.css'
  import util from '../utils'
  import wxParse from 'mpvue-wxparse'
  export default {
    props:{
      replyData:{
        type:Object,
        default:{
          id: "",
          author: {
            loginname: "",
            avatar_url: ""
          },
          content: '',
          ups: [
          ],
          create_at: "",
          reply_id: null,
          is_uped: false
        }
      }
    },
    computed:{
      lastReply() {
        return util.getTime2Now(this.replyData.create_at)
      },
    },

    components:{
      wxParse
    }
  }
</script>

<style scoped>
  .reply-data-content{
    border-bottom: 1rpx solid #ddd;
    font-size: 28rpx;
    padding-bottom: 10rpx;
  }
  .reply-ups{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    color:#707070;
  }
  .reply-ups>img{
    width: 14px;
    height: 14px;
    margin-right: 4rpx;
  }
</style>
