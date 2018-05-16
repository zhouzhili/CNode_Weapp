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
          id: "5ab34ae2e7b166bb7b9ecd0b",
          author: {
            loginname: "i5ting",
            avatar_url: "https://avatars3.githubusercontent.com/u/3118295?v=4&s=120"
          },
          content: '<div class="markdown-text"><p>置顶，大家多多参与，cucumber在bdd领域是极其重要的技能，对敏捷认知也会有明显提升，加油</p> </div>',
          ups: [
            "5a97b630543e098150cb70ce",
            "599fcc08ebaa046923a82766",
            "5a042eb23b2c1f8108a45e62",
          ],
          create_at: "2018-03-22T06:19:14.085Z",
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
