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
        <div v-for="(data,key) in topicData" :key="key" class="list-container">
          <topic :item="data"></topic>
        </div>
      </div>
    </div>

    <div>

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
        topicData: [],
        showLoading:true
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
        this.getTopic(this.activeTab);
      },

      getTopic(tab = '') {
        let self=this;
        this.showLoading=true;
        api.getTopic({page: 1, limit: 10, tab, mdrender: 'false'}).then(resp => {
          this.showLoading=false;
          if(resp.success){
            this.topicData = resp.content;
            //缓存数据
            wx.setStorage({
              key:'cnodeTopicList'+this.activeTab,
              data:resp.content
            });
          }else {
            wx.showToast({title:'获取网络数据失败，将从缓存读取数据'});
            wx.getStorageInfo({
              success: function(res) {
                let curKey='cnodeTopicList'+self.activeTab;
                if(curKey in res.keys){
                  self.topicData=res[curKey]
                }
              }
            })
          }
        })
      }
    },
    components: {
      topic,
      loading
    }
  }
</script>

<style scoped>
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
</style>
