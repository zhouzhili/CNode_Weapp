<script>
  export default {
    created() {
      // 调用API从本地缓存中获取数据
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)

      console.log('app created and cache logs by setStorageSync')
    }
  }
</script>

<style>
  page {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    font-size: 32rpx;
    color: #333;
  }

  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
  }

  .main-content {
    flex: 1;
    display: flex;
  }
  view{
    word-break: break-all;
  }
</style>
