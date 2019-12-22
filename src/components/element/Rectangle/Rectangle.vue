<template>
  <div id="rectangle">
    <div class="item"  @click="handleClick" draggable="true" @dragstart="dragstart" @dragend="dragend">
      <span class="iconfont iconjuxing"></span>
      <span>矩形</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Rectangle",
    data() {
      return {
        move_x: 0,
        move_y: 0,
      }
    },
    methods: {
      dragstart(event) {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("Text", 'Rectangle');
        event.dataTransfer.setDragImage(event.target, 0, 0);
      },
      dragend() {
        // this.createRectangle()
      },
      createRectangle() {
        const id = Date.now() + 'Rectangle'
        const rectangle = document.querySelector('#rectangle')
        const len = rectangle.childNodes.length
        if (len === 0) {
          const div = document.createElement('div')
          div.style.position = 'absolute'
          div.style.width = 100 + 'px'
          div.style.height = 30 + 'px'
          div.style.cursor = 'move'
          div.style.border = '2px solid black'
          div.draggable = true
          div.id = id
          div.addEventListener('dragstart', this.dragstart)
          div.addEventListener('dragend', this.dragend)
          rectangle.appendChild(div)
        }
      },
      handleClick(event) {
        const style = event.target.style
        style.borderColor = 'blue'
        console.log();
      }

    },
    components: {},
    props: {}
  }
</script>

<style scoped>
  .item {
    cursor: move;
  }
  .item .iconfont{
    font-size: 40px;
    display: block;
    margin: 10px auto;
  }
  .add-width{
    position: relative;
    display: inline-block;
    left: -10px;
    top: 50%;
    width: 10px;
    height: 10px;
    background-color: red;
  }
</style>