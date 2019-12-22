<template>
  <div id="TextBox">
    <div style="cursor: move" draggable="true" @dragstart="dragstart" @dragend="dragend">
      <span class="iconfont iconbiaoge"></span>
      <span>表格</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TableBox",
    data() {
      return {}
    },
    methods: {
      dragstart(event) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("Text", 'TableBox');
        event.dataTransfer.setDragImage(event.target, 0, 0);
      },
      dragend() {

      }
    },
    components: {},
    props: {}

  }
</script>

<style scoped>
  .iconfont{
    font-size: 40px;
    display: block;
    margin: 10px auto;
  }
</style>