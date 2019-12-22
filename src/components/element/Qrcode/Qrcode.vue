<template>
  <div id="Qrcode">
    <div style="cursor: move"
         draggable="true"
         @dragstart="dragstart"
         @dragend="dragend">
      <span class="iconfont iconico"></span>
      <span>二维码</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Qrcode",
  data () {
    return {}
  },
  methods: {
    dragstart (event) {
      console.log(event)
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("Text", 'Qrcode');
      event.dataTransfer.setDragImage(event.target, 0, 0);
    },
    dragend () {

    }
  },
  components: {},
  props: {}

}
</script>

<style scoped>
.iconfont {
  font-size: 40px;
  display: block;
  margin: 10px auto;
}
</style>