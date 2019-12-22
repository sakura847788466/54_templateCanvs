<template>
  <div class="header">
    <header>
      <div class="icon">
        <span class="iconfont iconflow" @click="goTo('/createTemplate')"></span>{{name}}
      </div>
      <div class="center">
        <div>
          <span class="iconfont icongongdanguanli-gongda"></span>
          保存
        </div>
        <div>
          <span class="iconfont iconchexiao"></span>
          撤销
        </div>
        <div>
          <span class="iconfont iconhuifu"></span>
          恢复
        </div>
      </div>
      <div class="center">
        <div>
          <span class="iconfont iconzhidingmian"></span>
          置顶
        </div>
        <div>
          <span class="iconfont iconzhidimian"></span>
          置底
        </div>
        <div>
          <span class="iconfont iconsuoding"></span>
          锁定
        </div>
      </div>
      <div class="center">
        <div>
          <span class="iconfont iconjian"></span>
        </div>
        <div>
          <span class="iconfont iconfangdajing"></span>
          100%
        </div>
        <div>
          <span class="iconfont iconjia"></span>
        </div>
      </div>
      <div class="center">
        <div>
          <span class="iconfont iconyulanmoban"></span>
          打印预览
        </div>
      </div>
    </header>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {}
    },
    methods: {
      goTo(path) {
        this.$router.push(path)
      },
      isCurrent(path) {
        return this.$route.path === path
      },
    },
    components: {},
    props: {name}

  }
</script>

<style scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 55px;
    background-color: #f8f8f8;
    border-bottom: 1px solid #dddddd;
    box-shadow: 0 2px 5px #dddddd;
    z-index: 1;
  }

  header {
    display: flex;
    margin: 0 auto;
    padding-left: 20px;
    width: 90%;
    line-height: 55px;
    color: lightcoral;
    justify-content: space-between;
  }
  .icon{
    height: 100%;
    font-size: 16px;
    color: lightcoral;
    line-height: 55px;
    padding-right: 100px;
  }
  .icon span{
    display: inline-block;
    font-size: 25px;
    padding-right: 20px;
    color: lightcoral;
    cursor: pointer;
  }
  .center{
    display: flex;
    font-size: 12px;
    padding-right: 100px;
  }
  .center div{
    height: 100%;
    line-height: normal;
    padding: 0 5px;
    cursor: pointer;
  }
  .center span{
    margin-top: 10px;
    margin-bottom: 5px;
    display: block;
    width: 20px;
    height: 20px;
    font-size: 20px;
    margin-left: auto;
    margin-right: auto;
  }
</style>