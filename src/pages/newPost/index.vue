<template>
  <div class="container">
    <div class="text">标题:</div>
    <div class="input-wrap">
      <input placeholder="请输入标题" v-model="title"/>
    </div>
    <div class="text">内容:</div>
    <div class="input-wrap">
      <textarea placeholder="请输入内容" v-model="content"></textarea>
    </div>
    <div class="picker-wrap">
      <span>主题</span>
      <picker  :range="range" @change="pickerChange">
        <div>{{range[rangeIndex]}}</div>
      </picker>
    </div>
    <button class="primary" @click="postNewTopic">发帖</button>
  </div>

</template>

<script>
  export default {
    data(){
      return{
        title:'',
        content:'',
        range:['问答','分享','招聘'],
        rangeIndex:0
      }
    },
    methods:{
      pickerChange(e){
        this.rangeIndex = e.mp.detail.value;
      },
      //发帖
      postNewTopic(){

      }
    }
  }
</script>

<style scoped>
  .container{
    background-color:#F8F8F8;
    font-size:30rpx;
    color:#696969;
  }
  .text{
    margin-top:.77em;
    margin-bottom:.3em;
    padding-left:15px;
    padding-right:15px;
    color:#999;
    font-size:14px;
  }
  .input-wrap{
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  input{
    height:2.58823529em;
    min-height:2.58823529em;
    line-height:2.58823529em;
    background-color: #fff;
    padding: 10rpx;
  }
  textarea{
    height: 300rpx;
    width: 100%;
    background-color: #fff;
    padding: 10rpx;
  }
  .picker-wrap{
    display: flex;
    align-items: center;
    background-color: #fff;
    margin-top: 20rpx;
  }
  .picker-wrap>span{
    padding: 0 20rpx;
    color:#999;
    font-size:14px;
  }
  picker{
    height:2.58823529em;
    min-height:2.58823529em;
    line-height:2.58823529em;
    background-color: #fff;
    border-left:1px solid #eee;
    padding: 10rpx;
    flex: 1;
  }
  .primary{
    color:#FFFFFF;
    background-color:#1AAD19;
    width:98%;
    margin-top: 30rpx;
  }
</style>
