<!--首页中主题项-->
<template>
  <div class="listItem"  @click="showDetailPage(item.id)">
    <div class="item-header">
      <div class="item-author-wrap">
        <div class="item-author">
          <img :src="item.author.avatar_url"/>
        </div>
        <div class="author-info">
          <span class="author-name">{{item.author.loginname}}</span>
          <span class="create-time">{{createAt}}</span>
        </div>
      </div>
      <span class="item-tag" :style="{'background-color':tagBgColor}">{{displayTag}}</span>
    </div>

    <div>
      <div class="item-title">{{item.title}}</div>
      <div class="item-content">{{displayContent}}</div>
    </div>

    <div class="item-footer">
      <div>
        <img src="../../static/images/comment.png"/>
        <span class="reply-count">{{item.reply_count}}</span>
      </div>
       <div>
         <img src="../../static/images/visited.png"/>
         <span>{{item.visit_count}}</span>
       </div>
      <div>
        <img src="../../static/images/time.png"/>
        <span>{{lastReply}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import util from '../utils'
  import '../../static/css/common.css'
  export default {
    props: {
      item: {
        type: Object,
        default: {
          id: "",
          author_id: "",
          tab: "",
          content: '',
          title: "",
          last_reply_at: "",
          good: false,
          top: true,
          reply_count: 0,
          visit_count: 0,
          create_at: "",
          author: {
            loginname: "",
            avatar_url: ""
          }
        }
      }
    },
    data(){
      return{
        tagBgColor:'#ddd'
      }
    },
    computed: {
      lastReply() {
        return util.getTime2Now(this.item.last_reply_at)
      },
      displayContent() {
        return this.item.content.slice(0, 50) + '...';
      },
      displayTag() {
        let tag = '';
        if (this.item.top) {
          tag = '置顶';
          this.tagBgColor='red'
        } else if (this.item.good) {
          tag = '精华';
          this.tagBgColor='red';
        } else {
          let tagObj = {'ask': '问答', 'share': '分享', 'good': '精华', 'job': '招聘'};
          tag = tagObj[this.item.tab];
          this.tagBgColor='#ddd';
        }
        return tag;
      },
      createAt() {
        return moment(this.item.create_at).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    methods: {
      showDetailPage(id){
        wx.navigateTo({
          url:'../topicDetail/main?id='+id
        });
      }
    }
  }
</script>

<style scoped>
  .listItem {
    padding: 8rpx;
    background-color: #fff;
    border-radius: 4rpx;
  }

  /*回复数*/
  .reply-count {
    color: #80bd01;
  }

  /*简介内容*/
  .item-content {
    color: #696969;
    font-size: 32rpx;
    letter-spacing: 1.6rpx;
  }

  /*底部*/
  .item-footer {
    margin-top: 16rpx;
    border-top: 1px solid #ddd;
    padding: 16rpx 0;
    display: flex;
    align-items: center;
    font-size: 22rpx;
  }
  .item-footer>div{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 20rpx;
    color:#999999
  }

  .item-footer>div>img{
    width: 28rpx;
    height: 28rpx;
    margin-right: 6rpx;
  }

</style>
