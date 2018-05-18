<!--用户页面的收藏，回复，主题组件-->
<template>
  <div class="user-item-wrap">
    <img :src="data.author.avatar_url"/>
    <div class="topic-info">
      <div>
        <span>你{{doAction}}了帖子：</span>
        <span class="title" @click="handleClick(data.id)">{{getShortTitle}}</span>
      </div>
      <span class="time">
        {{time2Now}}
      </span>
    </div>
  </div>
</template>

<script>
  import util from '../utils'
  export default {
    props:['data','tab'],
    computed:{
      time2Now(){
        return util.getTime2Now(this.data.last_reply_at);
      },
      doAction(){
        return this.tab==='主题'?'发布':this.tab;
      },
      getShortTitle(){
        return this.data.title.length>50?this.data.title.slice(0,50)+'...':this.data.title;
      }
    },
    methods:{
      handleClick(id){
        wx.navigateTo({
          url:'../topicDetail/main?id='+id
        });
      }
    }
  }
</script>

<style scoped>
  .user-item-wrap{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
    margin: 8rpx;
    padding: 8rpx 0;
    min-height: 120rpx;
  }
  img{
    width:86rpx;
    height:86rpx;
    border-radius: 120rpx;
    margin-right: 6rpx;
  }
  .topic-info{
    display: flex;
    flex-direction: column;
    font-size: 24rpx;
  }
  .title{
    color:#3366CC;
  }
  .time{
    color:#696969;
    font-size: 20rpx;
  }
</style>
