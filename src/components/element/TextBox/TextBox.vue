<template>
  <div id="TextBox">
    <div style="cursor: move" draggable="true" @dragstart="dragstart" @dragend="dragend">
      <span class="iconfont iconwenbenkuang"></span>
      <span>文本框</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TextBox",
    data() {
      return {
        move_x: 0,
        move_y: 0,
      }
    },
    methods: {
      dragstart(event) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("Text", 'TextBox');
        // event.dataTransfer.setDragImage(event.target, 0, 0);
      },
      dragend() {
        // this.createTextBox()
      },
      createTextBox() {
        const id = Date.now() + 'TextBox'
        const TextBox = document.querySelector('#TextBox')
        const len = TextBox.childNodes.length
        if (len === 0) {
          const div = document.createElement('div')
          div.style.position = 'absolute'
          div.style.width = 100 + 'px'
          div.style.height = 30 + 'px'
          div.style.border = '2px solid black'
          div.style.fontSize = 'font-size: 22px'
          div.style.cursor =  'move'
          div.draggable = true
          div.contentEditable = true
          div.id = id
          div.addEventListener('dragstart', this.dragstart)
          div.addEventListener('dragend', this.dragend)
          TextBox.appendChild(div)
        }
      }
    }
  }
</script>

<style scoped>
  /*.left-item {*/
    /*width: 100px;*/
    /*height: 30px;*/
    /*border: 2px solid black;*/
  /*}*/
  .iconfont{
    font-size: 40px;
    display: block;
    margin: 10px auto;
  }
</style>