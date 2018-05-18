<template>
  <div class="user-item-wrap">
    <img :src="msg.author.avatar_url"/>
    <div class="topic-info msg-info">
      <div class="msg-header">
        <div>
          <span class="author">{{msg.author.loginname}}</span>在:
          <span class="title" @click="direct2Detail(msg.topic.id)">{{getShortTitle}}</span>
          <span>  回复了你:</span>
        </div>
        <span class="item-tag msg-tag" :style="{'background-color':tagBgColor}">{{tag}}</span>
      </div>
      <div>
        <wx-parse :content="msg.reply.content"></wx-parse>
      </div>
      <span class="time">
        {{time2Now}}
      </span>
    </div>
  </div>

</template>

<script>
  import '../../static/css/message.css'
  import util from '../utils'
  import wxParse from 'mpvue-wxparse'
  export default {
    props:['msg','tag'],
    computed:{
      getShortTitle(){
        let title=this.msg.topic.title;
        return title.length>15?title.slice(0,15)+'...':title;
      },
      time2Now(){
        return util.getTime2Now(this.msg.reply.create_at);
      },
      tagBgColor(){
        let bg={'已读':'#eee','未读':'#00CC99'};
        return bg[this.tag];
      }
    },
    methods:{
      direct2Detail(id){
        wx.navigateTo({
          url:'../topicDetail/main?id='+id
        });
      }
    },
    components:{
      wxParse
    }
  }
</script>

<style scoped>
  .msg-header{
    display: flex;
    justify-content: space-between;
  }
  .msg-tag{
    font-size: 16rpx;
  }
  .msg-info{
    width: 100%;
  }
</style>
