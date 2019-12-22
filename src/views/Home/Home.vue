<template>
  <div class="home">
    <Header :name="templateInfo.name" />
    <Left />
    <vue-ruler-tool :content-layout="{left:200,top:200}"
                    :is-hot-key="true"
                    :is-scale-revise="true"
                    :preset-line="presetLine"
                    style="position: fixed;top: 55px;left: 250px">
      <div ref="canvas"
           :style="canvasStyle"
           id="canvas"
           @drop="drop"
           @dragover="dragover"
           @click.self="closeIsActive">
        <vue-drag-resize :isActive="item.isActive"
                         :ref="item.ref"
                         :x="item.x"
                         :y="item.y"
                         :w="item.w"
                         :h="item.h"
                         @clicked="clicked($event,index)"
                         @resizing="resizing($event,index)"
                         @dragging="dragging($event,index)"
                         :key="index"
                         :minh="minhMinw"
                         :minw="minhMinw"
                         :parentLimitation="true"
                         v-for="(item,index) in canvasData"
                         :style="item.style">
          <input v-if="item.text"
                 type="text"
                 v-model="item.message"
                 class="text-info" />
          <table v-if="item.isTable"
                 class="table">
            <tr v-for="table in item.table">
              <td v-for="(val,i) in table.value">
                <input type="text"
                       v-model.trim="val.msg"
                       @mousedown.stop="handleTdInput"
                       style="width: 100%;height: 100%;border: none;text-align: center">
              </td>
            </tr>
          </table>
          <img v-if="item.isPhoto"
               :src="item.img"
               width="100%"
               height="100%">
        </vue-drag-resize>
      </div>
    </vue-ruler-tool>
    <ReightSet :message="message"
               :templateInfo="templateInfo" />
    <el-dialog title="请输入生成表格的行和列"
               :before-close="closeTable"
               :visible.sync="isRenderTable"
               top="25%"
               width="400px">
      <div>
        行：
        <el-input-number size="mini"
                         v-model.trim="tableInfo.rows"
                         :min="1" />
        列：
        <el-input-number size="mini"
                         v-model.trim="tableInfo.lines"
                         :min="1" />
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="closeTable"
                   size="mini">取 消</el-button>
        <el-button type="primary"
                   @click="renderTable"
                   size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Left from "../Left/Left";
import img from '../../assets/img'
import ReightSet from "../ReightSet/ReightSet";
import Header from "../../components/Header/Header";

export default {
  name: "Home",
  mounted () {
    this.delElement()
    this.templateInfo = this.$route.params.templateInfo
  },
  data () {
    return {
      canvasData: [],//canvas内的组件
      presetLine: [],
      //表格生成
      isRenderTable: false,
      tableInfo: {
        rows: 2,
        lines: 3
      },
      id: '',
      templateInfo: {},
      message: {},
    }
  },
  methods: {
    //拖拽松开事件
    drop (event) {
      //1.禁止默认事件
      event.preventDefault();
      //2.拿到不同的组件类型
      const type = event.dataTransfer.getData("Text");
      //3.执行生成组件的方法
      this.renderElement(event, type)

    },



    //拖拽经过事件
    dragover (event) {
      event.preventDefault();
    },

    //渲染组件
    renderElement (event, type) {
      //1.拿到canvas的偏移量
      // const {offsetLeft, offsetTop} = this.$refs.canvas
      const position = this.$refs.canvas.getBoundingClientRect()
      //2.生成初始化的组件数据样式
      let data = {
        isActive: true,
        x: event.pageX - position.x,
        y: event.pageY - position.y,
        text: false,
        type
      }
      //2.1.根据type生成不同类型的数据
      const componentsType = this.renderTypeComponents(type, event)
      //2.2 合拼两组数据，data在前
      data = { ...data, ...componentsType }

      //3.把数据插入canvasData里
      this.$nextTick(() => {
        //3.1每次进来时只能有一个组件是激活状态
        this.canvasData.forEach(item => {
          item.isActive = false
        })
        //3.2把拖拽的组件数据传递给ReightSet组件
        this.message = data
        this.canvasData.push(data)
      })
    },

    //根据type生成组件样式
    renderTypeComponents (type, event) {
      //1.根据时间戳和type生成唯一的ID
      const id = Date.now() + type
      this.id = id
      //2.根据type生成不同的数据返回出去
      switch (type) {
        case 'DLine':
          return {
            w: 100,
            h: 1,
            style: {
              position: 'absolute',
              borderTopColor: '#000',
              borderTopWidth: '1px',
              borderTopStyle: 'solid',
              borderRadius: '0',
              cursor: 'move',
              transform: 'rotate(0)',
              borderRadius: 0,
            },
            ref: id,
            rote: 0,
            radius: 0,
          }
        case 'Rectangle':
          return {
            w: 100,
            h: 50,
            style: {
              cursor: 'move',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: '#000',
              transform: 'rotate(0)',
              borderRadius: 0,
            },
            ref: id,
            rote: 0,
            radius: 0,

          }
        case 'Circular':
          return {
            w: 50,
            h: 50,
            style: {
              border: '2px solid #000',
              borderRadius: '50%',
              cursor: 'move'
            },
            ref: id
          }
        case 'TextBox':
          return {
            w: 100,
            h: 30,
            style: {
              cursor: 'move',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderColor: '#000',
              fontWeight: 'normal',
              textAlign: 'center',
              fontFamily: 'Georgia',
              transform: 'rotate(0)',
              borderRadius: 0,
              lineHeight: '30px',
              fontSize: 0,
            },
            text: true,
            message: '文字信息',
            ref: id,
            rote: 0,
            radius: 0,
            lineHeight: 28,
            ele: event,
            size: 15,
            fontStyle: 'normal'

          }
        case 'TableBox':
          this.isRenderTable = true
          return {
            w: 300,
            h: 100,
            style: {
              cursor: 'move',
              padding: '10px',
              transform: 'rotate(0)',
            },
            isTable: true,
            table: null,
            ref: id,
            rote: 0,


          }
        case 'DPhoto':
          return {
            w: 200,
            h: 100,
            style: {
              cursor: 'move',
              transform: 'rotate(0)',
              borderRadius: 0,
            },
            img: img.img,
            isPhoto: true,
            ref: id,
            rote: 0,
            radius: 0,
            ele: event
          }
        case 'Qrcode':
          return {
            w: 100,
            h: 100,
            style: {
              cursor: 'move',
              transform: 'rotate(0)',
              borderRadius: 0,
            },
            img: img.qrcode,
            isPhoto: true,
            ref: id,
            rote: 0,
            radius: 0,
          }
        case 'Barcode':
          return {
            w: 100,
            h: 60,
            style: {
              cursor: 'move',
              transform: 'rotate(0)',
              borderRadius: 0,
            },
            img: img.barcode,
            isPhoto: true,
            ref: id,
            rote: 0,
            radius: 0,
          }
        default:
          return false
      }

    },

    //渲染表格
    renderTable () {
      //1.点击确认渲染表格，并隐藏dialog
      this.isRenderTable = false
      //1.1取出初始化的行和列，并初始化存储table的数组
      const { rows, lines } = this.tableInfo
      const table = []
      //2.根据取出来的行和列生成一个二维数组
      for (let i = 0; i < rows; i++) {
        table.push({ key: '', value: [] })
        console.log(table);
        for (let j = 0; j < lines; j++) {
          table[i].value.push({ name: '', msg: '' })
        }
      }
      //3.根据当前的ID找到this.canvasData里的一项数据，并把二维数组赋值给它
      for (let item of this.canvasData) {
        if (this.id === item.ref) {
          item.table = table
        }
      }
    },

    //关闭渲染表格方法
    closeTable () {
      //1.隐藏dialog
      this.isRenderTable = false
      //2.循环出当前ID和this.canvasData[i].ref相同的数据，然后删除
      for (let i = 0; i < this.canvasData.length; i++) {
        if (this.canvasData[i].ref === this.id) {
          this.canvasData.splice(i, 1)
        }
      }
    },

    handleTdInput () {
      console.log(1);
    },
    //删除元素
    delElement () {
      document.addEventListener('keydown', event => {
        if (event.keyCode === 46) {
          for (let i = 0; i < this.canvasData.length; i++) {
            if (this.canvasData[i].isActive) {
              this.canvasData.splice(i, 1)
            }
          }
        }
      })
    },

    //点击拖拽组件
    clicked ($event, index) {
      for (let item of this.canvasData) {
        item.isActive = false;
      }
      this.canvasData[index].isActive = true;
      this.message = this.canvasData[index]
      if (this.canvasData[index].text) {
        const ref = this.canvasData[index].ref
        this.$refs[ref][0].$el.childNodes[0].focus()
      }

    },

    //拖伸组件
    resizing (newRect, index) {
      this.canvasData[index].x = newRect.left
      this.canvasData[index].y = newRect.top
      this.canvasData[index].w = newRect.width
      this.canvasData[index].h = newRect.height
    },
    //拖拽组件，更改x和y
    dragging (newRect, index) {
      this.canvasData[index].x = newRect.left
      this.canvasData[index].y = newRect.top
    },

    //点击取消选中组件
    closeIsActive () {
      for (let item of this.canvasData) {
        item.isActive = false;
      }
    }
  },
  computed: {
    minhMinw () {
      if (this.id.indexOf('TableBox') !== -1 || this.id.indexOf('DPhoto') !== -1) {
        return 40
      } else {
        return 2
      }
    },
    canvasStyle () {
      const width = this.templateInfo.w + 'px'
      const height = this.templateInfo.h + 'px'

      return { width, height }
    }
  },
  components: { Header, ReightSet, Left },
  props: {}

}
</script>

<style scoped>
.home {
  position: absolute;
  top: 55px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: calc(100% - 55px);
  min-width: 1200px;
  flex-wrap: nowrap;
  background-color: #fff;
}

#canvas {
  position: relative;
  width: 1000px;
  height: 500px;
  cursor: crosshair;
  background-color: white;
  z-index: 1;
  border: 5px solid rgba(237, 239, 241, 0.99);
  border-radius: 3px;
}

.text-info {
  padding: 0 10px;
  width: 100%;
  height: 100%;
  text-align: center;
  border: none;
  background-color: transparent;
}

.table {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: 1px solid #000;
}

.table tr {
  box-sizing: border-box;
  display: flex;
  flex: 1;
  border-bottom: 1px solid #000;
}

.table tr:nth-last-child(1) {
  border-bottom: none;
}

.table td {
  box-sizing: border-box;
  flex: 1;
  height: 100%;
  border-right: 1px solid #000;
}

.table td:nth-last-child(1) {
  border-right: none;
}

/*标尺*/
#rulerTool {
  background-color: #f5f5f5;
}
</style>