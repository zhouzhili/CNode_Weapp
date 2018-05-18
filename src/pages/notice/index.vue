<template>
  <div>
    <div class="mark-all">
      <span>消息列表</span>
      <div @click="markAll" v-show="token">√全部标记为已读</div>
    </div>
    <div class="no-msg" v-show="!token">
      请先登录!
    </div>
    <div class="msg-list" v-show="token">
      <div v-for="(item,index) in notReadMsges" :key="index">
        <message :msg="item" :tag="notReadTag"></message>
      </div>

      <div v-for="(item,index) in readMsges" :key="index">
        <message :msg="item" :tag="readTag"></message>
      </div>

      <div v-show="notReadMsges.length===0&&readMsges.length===0" class="no-msg">
        没有任何消息
      </div>
    </div>
  </div>
</template>

<script>
  import util from '../../utils'
  import api from '../../utils/comAPI'
  import message from '@/components/message'
  export default {
    data(){
      return{
        token:'',
        readTag:'已读',
        notReadTag:'未读',
        readMsges:[],
        notReadMsges:[],
      }
    },

    onShow(){
      this.token=this.$store.state.token;
      if(this.token){
        api.getMsg(this.token).then(resp=>{
          console.log(resp);
          this.readMsges=resp.content.has_read_messages;
          this.notReadMsges=resp.content.hasnot_read_messages;
        })
      }
    },

    mounted(){
      wx.setNavigationBarTitle({
        title:'通知'
      })
    },

    methods:{
      markAll(){
        api.markAll(this.token).then(resp=>{
          if(resp.success && resp.content.success){
            this.notReadTag='已读';
            wx.showToast({'title':"已全部标记为已读",icon:'none'});
          }else {
            wx.showToast({'title':"标记失败",icon:'none'});
          }
        })
      }
    },

    components:{
      message
    }

  }
</script>

<style scoped>
  .mark-all{
    font-size: 24rpx;
    height: 60rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 10rpx;
    margin-bottom: 10rpx;
    border-bottom: 1rpx solid #eee;
    box-shadow: 0 0 3px 3px #f5f5f5;
  }
  .msg-list{
    border-top: 1rpx solid #f4f4f4;
    box-shadow: 0px -3px 3px  #f5f5f5;
  }
  .no-msg{
    text-align: center;
    color:#ddd;
  }
</style>
