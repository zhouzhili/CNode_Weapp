<template>
  <div class="listItem" :id="item.id">
    <div class="item-header">
      <span class="item-tag">{{displayTag}}</span>
      <div>
        <span class="reply-count">{{item.reply_count}}</span>/
        <span>{{item.visit_count}}</span> •
        <span>{{lastReply}}</span>
      </div>
    </div>

    <div>
      <div class="item-title">{{item.title}}</div>
      <div class="item-content">{{displayContent}}</div>
    </div>

    <div class="item-footer">
      <div class="item-author">
        <img :src="item.author.avatar_url"/>
        <span>{{item.author.loginname}}</span>
      </div>
      <div>
        <span>创建于: </span>
        <span>{{createAt}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

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
    computed: {
      lastReply() {
        let time = moment().diff(moment(this.item.last_reply_at)) / 1000;
        let result = '';
        if (time < 60) {
          result = `${Math.round(time)}秒前`;
        } else if (time < 60 * 60) {
          result = `${Math.round(time / 60)}分钟前`;
        } else if (time < 60 * 60 * 24) {
          result = `${Math.round(time / 60 / 60)}小时前`;
        } else {
          result = `${Math.round(time / 60 / 60 / 24)}天前`;
        }
        return result;
      },
      displayContent() {
        return this.item.content.slice(0, 150) + '...';
      },
      displayTag() {
        let tag = '';
        if (this.item.top) {
          tag = '置顶'
        } else if (this.item.good) {
          tag = '精华'
        } else {
          let tagObj = {'ask': '问答', 'share': '分享', 'good': '精华', 'job': '招聘'};
          let tag = tagObj[this.item.tab];
        }
        return tag;
      },
      createAt() {
        return moment(this.item.create_at).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    methods() {

    }
  }
</script>

<style scoped>
  .listItem {
    margin: 12 rpx 8 rpx;
    padding: 20 rpx;
    background-color: #fff;
    border-radius: 4 rpx;
  }

  img {
    width: 64 rpx;
    height: 48 rpx;
  }

  .item-header {
    display: flex;
    padding: 8 rpx 0;
    align-items: center;
    justify-content: space-between;
    font-size: 28 rpx;
  }

  .item-tag {
    background-color: #80bd01;
    color: #fff;
    padding: 8 rpx;
    border-radius: 8 rpx;
  }

  .reply-count {
    color: #80bd01;
  }

  .item-title {
    font-weight: 800;
  }

  .item-content {
    color: #898989;
  }

  .item-footer {
    margin-top: 16 rpx;
    border-top: 1px solid #ddd;
    padding: 20 rpx 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 28 rpx;
  }

  .item-author {
    display: flex;
    align-items: center;
  }

  .item-author > img {
    margin-right: 6 rpx;
  }
</style>
