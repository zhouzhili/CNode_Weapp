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
          id: "5ae140407b0e8dc508cca7cc",
          author_id: "573ab7ba542374db1db0a436",
          tab: "share",
          content: '<div class="markdown-text"><p>【进度更新】 到目前为止已经有4位分享者，数十位参与者，如果不出意外的话，下周之内就能最终决定场地和时间 大概会在5月下旬到6月中旬这几周的某个周末下午 具体的分享主题和分享者的情况也会陆续更新到这个帖子里 另外有不少童鞋问，有没有参加的门槛，经验尚浅能不能来听 那肯定是没有门槛的，想来参与的都欢迎 如果有什么特别感兴趣的话题，也可以在帖子下留言或者单独告诉我，我会尽量看看能不能联系到相关的大牛来分享</p> <p>【原贴】 赶脚最近上海Node社区不是很活跃哇，想组织一个Node Party. 时间大概再5-6月。 我司可以提供一个20-30人的场地。 有兴趣分享的筒子求勾搭。 当然也欢迎场地、直播、其他各种赞助。 我的微信：aojiaotage，请注明报名或者讲师哈。。</p> </div>',
          title: "【NODE PARTY】【上海】最近好像没有上海NodeParty，想来组织一个",
          last_reply_at: "2018-05-15T01:57:51.629Z",
          good: false,
          top: true,
          reply_count: 67,
          visit_count: 4175,
          create_at: "2018-04-26T02:58:08.067Z",
          author: {
            loginname: "aojiaotage",
            avatar_url: "https://avatars3.githubusercontent.com/u/8339316?v=4&s=120"
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
        return this.item.content.slice(0, 150) + '...';
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
