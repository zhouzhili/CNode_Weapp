<!--加载动画-->
<template>
  <div class="loading">
    <img src="../../static/images/loading.gif"/>
  </div>
</template>

<script>
  export default {
  }
</script>

<style scoped>
  .loading{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(221, 221, 221, 0.53);
  }
  img{
    width: 64px;
    height: 64px;
  }
</style>
