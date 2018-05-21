<template>
  <div class="container">
    <div class="nav-bar">
      <div v-for="(value,index) in navList" :key="index">
        <div :id="value.tab" :class="{activeTab:value.tab===activeTab}" @click="tabChangeHandle">
          {{value.name}}
        </div>
      </div>
    </div>

    <div class="main-content">
      <loading v-if="showLoading"></loading>
      <div class="list-wrap" v-else>
          <scroll-view scroll-y style="height: calc(100vh - 80rpx);" @scrolltolower="loadMore">
            <div v-for="(data,key) in topicData" :key="key" class="list-container">
              <topic :item="data"></topic>
            </div>
          </scroll-view>
        <div class="loadMore" v-show="loadMoreDiv">加载更多...</div>
      </div>
    </div>

  </div>
</template>

<script>
  import topic from '@/components/topic'
  import loading from '@/components/loading'
  import api from '../../utils/comAPI'

  export default {
    data() {
      return {
        navList: [
          {name: '全部', tab: ''},
          {name: '精华', tab: 'good'},
          {name: '问答', tab: 'ask'},
          {name: '分享', tab: 'share'},
          {name: '招聘', tab: 'job'}
        ],
        activeTab: '',
        lastTab:'',
        topicData: [],
        showLoading:true,
        page:0,
        scroll: {
          top: 0,
          scrollTop: 0
        },
        loadMoreDiv:true
      }
    },

    mounted() {
      wx.setNavigationBarTitle({
        title:'首页'
      });
      this.getTopic();
    },

    methods: {
      tabChangeHandle(e) {
        this.activeTab = e.currentTarget.id;
        this.page=0;
        this.getTopic();
      },

      getTopic() {
        let self=this;
        this.showLoading=this.page===0;
        let limit=this.activeTab==='job'?4:10;
        api.getTopic({page: this.page, limit, tab:this.activeTab, mdrender: 'false'}).then(resp => {
          this.showLoading=false;
          this.loadMoreDiv=false;
          if(resp.success){
            if(this.page===0){
              this.topicData=resp.content;
            }else {
              this.topicData =this.topicData.concat(resp.content);
            }
            //缓存数据
            wx.setStorage({
              key:'cnodeTopicList'+this.activeTab,
              data:this.topicData
            });
          }else {
            wx.showToast({title:'获取网络数据失败，将从缓存读取数据',icon:'none'});
            wx.getStorage({
              key:'cnodeTopicList'+self.activeTab,
              success: function(res) {
                self.topicData=res.data;
              }
            })
          }
        })
      },

      //下拉到底
      loadMore(){
        this.page++;
        this.getTopic();
      },

    },
    components: {
      topic,
      loading
    }
  }
</script>

<style scoped>
  .main-content{
    display: flex;
    flex-direction: column;
  }
  .loading{
    height: 100%;
  }
  .nav-bar {
    display: flex;
    flex-direction: row;
    position: fixed;
    width: 100%;
    height: 80rpx;
    font-size: 30rpx;
    background-color: #f6f6f6;
    box-shadow: 0 2rpx 6rpx 6rpx #ececec;
  }

  .nav-bar > div {
    width: 25%;
  }

  .nav-bar > div > div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .activeTab {
    color: #0099CC;
  }

  .list-wrap {
    margin-top: 80rpx;
  }

  .list-container {
    background-color: #ececec;
    padding: 8rpx;
  }
  .loadMore{
    text-align:center;
    font-size:14px;
    color:#ddd;
    background-color:#ececec;
  }
</style>
