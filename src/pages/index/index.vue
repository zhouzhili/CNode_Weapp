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
      <div class="list-container">
        <topic></topic>
      </div>
    </div>
  </div>
</template>

<script>
  import topic from '@/components/topic.vue'

  export default {
    data() {
      return {
        navList: [
          {name: '全部', tab: 'all'},
          {name: '精华', tab: 'good'},
          {name: '问答', tab: 'ask'},
          {name: '分享', tab: 'share'},
          {name: '招聘', tab: 'job'}
        ],
        activeTab: 'all'
      }
    },
    methods: {
      tabChangeHandle(e) {
        this.activeTab = e.currentTarget.id;
      }
    },
    components: {
      topic
    }
  }
</script>

<style scoped>
  .nav-bar {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 70 rpx;
    font-size: 30 rpx;
    background-color: #f6f6f6;
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
    background-color: #2aabd2;
    color: #fff;
  }

  .list-container {
    background-color: #ececec;
  }
</style>
