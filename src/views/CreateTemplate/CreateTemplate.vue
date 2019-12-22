<template>
  <div>
    <header>得实云模板</header>
    <el-row class="nav">
      <el-col>打印机型号：
        <el-select v-model="printType" placeholder="请选择">
          <el-option v-for="item in printTypes" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
      <el-col>模糊搜索：
        <el-autocomplete class="inline-input" placeholder="请输入内容"></el-autocomplete>
      </el-col>
      <el-button type="primary" @click='cardShow=true'>创建模板</el-button>
    </el-row>
    <ul class="dataList">
      <li v-for="(item,index) in data" :key="index" v-if="isShow(item.printType)">
        <div class="top">
          <h3>{{item.name}}</h3>
          <p>{{item.greateTime}}</p>
          <div class="muban">
            <el-row style="margin-bottom: 10px;">
              <el-button @click='Compile(index)'>编辑模板</el-button>
            </el-row>
            <el-row>
              <el-button type="danger" @click='del(index)'>删除模板</el-button>
            </el-row>
          </div>
        </div>
        <div class="bottom">
          <p>模板尺寸：{{item.size}}mm</p>
          <p>打印机型：{{item.printType}}</p>
          <p>模板编号：{{item.id}}</p>
        </div>
      </li>
    </ul>
    <section class="cardBox" v-show="cardShow">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 20px;">创建模板</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click='close'>关闭</el-button>
        </div>
        <div class="left">
          <div>
            <span>模板名称：</span>
            <el-input v-model="Create.name" placeholder="请输入内容" style="margin-bottom: 15px;"
                      size="small"></el-input>
          </div>
          <div>
            <span>打印机型：</span>
            <el-select v-model="Create.printType" style="margin-bottom: 15px;" size="small"
                       @change="typeChange">
              <el-option v-for="item in greatePrintTypes" :key="item" :label="item"
                         :value="item"></el-option>
            </el-select>
          </div>
          <div>
            <span>模板尺寸(mm)：</span>
            <el-select v-model="Create.size" style="margin-bottom: 15px;" size="small"
                       :disabled='printTypeChange()'
                       @change="preview">
              <el-option v-for="item in greatePrintsize" :key="item" :label="item"
                         :value="item"></el-option>
            </el-select>
          </div>
        </div>
        <div class="right">
          <p>预览</p>
          <img class="Img" src="./img/view.png" alt="">
          <div class="preview">
            <div class="Wline">
              <p class="size"></p>
            </div>
            <div class="Hline">
              <p class="size"></p>
            </div>
          </div>

        </div>
        <el-button type="primary" size="small" style=" float: right;" @click='add'>完成</el-button>
      </el-card>
    </section>
  </div>
</template>

<script>
  import day from 'dayjs'

  import {generateUUID} from '../../util/tool.js'

  export default {
    name: "templateCenter",
    data() {
      return {
        printType: '全部', //nav  型号
        printTypes: [
          '全部',
          'DL-630',
          'DL-635'
        ],
        greatePrintTypes: [
          'DL-630',
          'DL-635'
        ],
        greatePrintsize: [],
        DL630Type: [
          '70*50',
          '50*60',
          '100*180'
        ],
        DL635Type: [
          '210*297',
          '148*210'
        ],
        templateInfo: {},//模板信息
        data: [{ //假数据
          id: '4654968651WQsda',
          greateTime: '2019-12-10 14:00:44',
          size: '70*50',
          name: 'one',
          printType: 'DL-630'
        },
          {
            id: '4654968651WQsda',
            greateTime: '2019-12-10 14:00:44',
            size: '70*50',
            name: 'two',
            printType: 'DL-635',
          }, {
            id: '4654968651WQsda',
            greateTime: '2019-12-10 14:00:44',
            size: '70*50',
            name: 'three',
            printType: 'DL-635'
          }, {
            id: '4654968651WQsda',
            greateTime: '2019-12-10 14:00:44',
            size: '70*50',
            name: 'four',
            printType: 'DL-630'
          }
        ],
        cardShow: false,
        img: require('./img/view.png'),
        Create: {
          name: '',
          printType: '', //创建模板打印机型
          size: '', //创建模板尺寸
          greateTime: '',//时间
          id: '',
          width: 0,
          height: 0
        }
      }
    },
    methods: {
      close() { //关闭
        this.cardShow = false
        this.Create = {}
        const Image = document.getElementsByClassName('Img')[0]
        Image.style.display = 'block'
        const oDiv = document.getElementsByClassName('preview')[0]
        oDiv.style.display = 'none'
      },
      printTypeChange() { //size选项控制
        if (this.Create.printType === '') {
          return true
        } else {
          return false
        }
      },
      typeChange() { //型号改变
        this.Create.p = ''
        if (this.Create.printType === 'DL-630') {
          this.greatePrintsize = this.DL630Type
        } else if (this.Create.printType === 'DL-635') {
          this.greatePrintsize = this.DL635Type
        }
      },
      preview() {//预览框
        const Image = document.getElementsByClassName('Img')[0]
        Image.style.display = 'none'
        const w = this.Create.size.split('*')[0]
        const h = this.Create.size.split('*')[1]
        const oDiv = document.getElementsByClassName('preview')[0]
        const HLine = document.getElementsByClassName('Hline')[0]
        oDiv.style.display = 'block'
        oDiv.style.width = w * 4.5 + 'px';
        oDiv.style.height = h * 4.5 + 'px';
        if (w * 4.5 > 350 || h * 4.5 > 430) {
          oDiv.style.width = w * 4.5 / 2 + 'px';
          oDiv.style.height = h * 4.5 / 2 + 'px';
          if (w * 4.5 / 2 > 350 || h * 4.5 / 2 > 430) {
            oDiv.style.width = w * 4.5 / 3.5 + 'px';
            oDiv.style.height = h * 4.5 / 3.5 + 'px';
          }
        }
        HLine.style.width = oDiv.style.height
        const size = document.getElementsByClassName('size')
        size[0].innerHTML = w + 'mm'
        size[1].innerHTML = h + 'mm'
      },
      add() {//添加
        if (this.Create.printType !== '' && this.Create.name !== '' && this.Create.size != '') {
          let nowDate = new Date()
          this.Create.greateTime = day(nowDate).format('YYYY-MM-DD HH:mm:ss')
          this.Create.id = generateUUID().substring(0, 18)
          this.data.push(this.Create)
          this.close()
          return this.$message({
            message: '添加成功',
            type: 'success'
          });
        } else {
          return this.$message({
            message: '信息不完整！',
            type: 'error'
          });
        }
      },
      del(index) {//删除
        this.data.splice(index, 1)
      },
      Compile(index) {//编ji
        this.templateInfo = this.data[index]
        let w = (this.data[index].size).split('*')[0]
        let h = (this.data[index].size).split('*')[1]
        this.templateInfo.h = parseInt(h * 300 / 25.4)
        this.templateInfo.w = parseInt(w * 300 / 25.4)
        this.templateInfo.size = w + 'mm*' + h + 'mm'
        console.log(this.templateInfo)
        this.$router.push({
          name: `home`,
          params: {
            templateInfo: this.templateInfo,
          }
        })
      },
      isShow(val) {
        if (this.printType === '全部' || val === this.printType) {
          // console.log(val,this.printType)
          return true
        } else {
          // console.log(val,this.printType)
          return false
        }
      }
    },
  }
</script>

<style scoped>
  header {
    width: 100%;
    height: 56px;
    background-color: #1a1a20;
    -webkit-box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    color: lightcoral;
    font-size: 22px;
    line-height: 56px;
    padding-left: 60px;
  }

  .nav {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
  }

  .dataList {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  }

  .dataList li {
    width: 280px;
    height: 300px;
    background-color: white;
    margin-bottom: 24px;
    margin-right: 25px;
    transition: all .3s;
  }

  .top {
    width: 100%;
    height: 210px;
    padding-top: 58px;
    box-sizing: border-box;
    text-align: center;
    position: relative;
    border-bottom: 1px solid #f0f0f0;
  }

  .muban {
    display: none;
    width: 100%;
    height: 210px;
    padding-top: 58px;
    position: absolute;
    box-sizing: border-box;
    top: 0;
    left: 0;
    background-color: #f0f0f0;
  }

  .top h3 {
    font-size: 22px;
    margin-bottom: 15px;
  }

  .dataList li:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }

  .dataList li:hover .muban {
    display: block;
  }

  .dataList li:nth-child(4n+4) {
    margin-right: 0;
  }

  .bottom {
    padding: 15px;
    box-sizing: border-box;
    line-height: 22px;
    color: #b4b4b9;
  }

  .cardBox {
    position: fixed;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    height: 100%;
    top: 0;
    left: 0;
  }

  .box-card {
    width: 820px;
    height: 600px;
    background-color: #ffffff;
    margin: 150px auto;
  }

  .el-input {
    width: 200px;
  }

  .left,
  .right {
    margin-top: 20px;
  }

  .left {
    width: 350px;
    height: 450px;
    float: left;
  }

  .right {
    width: 380px;
    height: 450px;
    float: right;
  }

  .left span {
    display: inline-block;
    width: 120px;
    text-align: right;
  }

  .preview {
    display: none;
    border: solid 2px #9e9fa0;
    margin-left: 45px;
    margin-top: 45px;
    position: relative;
  }

  .Wline {
    position: absolute;
    width: 100%;
    top: -30px;
    left: -2px;
    height: 10px;
    border: 1px solid #9E9FA0;
    border-bottom: none;
    border-top: none;
  }

  .Wline p,
  .Hline p {
    width: 100%;
    height: 1px;
    background-color: #9E9FA0;
    margin-top: 4px;
    text-align: center;
    line-height: 24px;
  }

  .Hline {
    position: absolute;
    left: -30px;
    bottom: -2px;
    height: 10px;
    border: 1px solid #9E9FA0;
    border-bottom: none;
    border-top: none;
    transform-origin: left bottom;
    transform: rotate(-90deg);
  }
</style>
