<template>
  <aside class="panel_right">
    <div class="nav_type"
         style="width:224px">
      <div class="set"
           :style="{'display': (message.isActive? 'none':'block')}">
        <div class="title">{{set.typeName}}</div>
        <div class="set_box">
          <div class="item">
            <span>模板名称</span>
            <el-input v-model="templateInfo.name"
                      size="mini"
                      class="inp"
                      placeholder=""></el-input>
          </div>
          <div class="item">
            <span>画布尺寸</span>
            <el-input v-model="input"
                      :disabled="true"
                      size="mini"
                      class="inp"
                      placeholder="1100mm*1100mm"></el-input>
          </div>
          <div class="item">
            <span style="width:31px;"></span>
            <el-input v-model="templateInfo.size"
                      :disabled="true"
                      size="mini"
                      class="inp inputWH"></el-input>
          </div>
          <div class="item">
            <span>网格</span>
            <div class="showOr">
              <span>{{show_easy?"显示":"隐藏"}}</span>
              <i class="iconfont iconxianshi"
                 :style="{'display': (show_easy? 'block':'none')}"
                 @click="clickShow"></i>
              <i class="iconfont iconyincang"
                 :style="{'display': (show_easy? 'none':'block')}"
                 @click="clickShow"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- line -->
      <div class="attribule"
           :style="{'display': (message.isActive &&message.type=='DLine'? 'block':'none')}">
        <div class="title">{{attribute.typeName}}</div>
        <div class="attribute_box">
          <div class="attr_item"
               style="width: 100%;">
            <i class="iconfont iconzuoduiqi"
               @click="theLeft"></i>
            <i class="iconfont iconjuzhongduiqi"
               @click="middle_y"></i>
            <i class="iconfont iconyouduiqi"
               @click="theRight"></i>
            <i class="iconfont icondingduiqi"
               @click="theTop"></i>
            <i class="iconfont iconchuizhiduiqi"
               @click="middle_x"></i>
            <i class="iconfont icondiduiqi"
               @click="theBottom"></i>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;position:relative;">
              <span>X</span>
              <div class="right">
                <el-input v-model="message.x"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_x($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_x($event)"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>Y</span>
              <div class="right">
                <el-input v-model="message.y"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_y($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_y($event)"></i>
              </div>
            </div>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;">
              <span>宽</span>
              <div class="right">
                <el-input v-model="message.w"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click='add_w($event)'></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_w($event)"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>高</span>
              <div class="right">
                <el-input v-model="message.h"
                          size="mini"
                          :min="1"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_h($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_h($event)"></i>
              </div>

            </div>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;">
              <span>翻转</span>
              <div class="right">
                <el-input v-model="message.rote"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="rotating_add"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="rotating_min"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>圆角</span>
              <div class="right">
                <el-input v-model="message.radius"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="radius_add"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click='min($event)'></i>
              </div>

            </div>
          </div>
          <div class="attr_item boder_style_cnt">
            <span class="border_title">描边</span>
            <div class="border_SetCnt">
              <div class="border_color_cnt">
                <el-select v-model="value"
                           placeholder=""
                           class="line_select"
                           size='mini'
                           @change="change">
                  <el-option v-for="item in options"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
                <p style="margin-top: 10px;font-size: 12px;color: #999999;">线条类型</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <!-- 矩形 -->
      <div class="attribule"
           :style="{'display': (message.type =='Rectangle'&&message.isActive? 'block':'none')}">
        <div class="title">{{attribute.typeName}}</div>
        <div class="attribute_box">
          <div class="attr_item"
               style="width: 100%;">
            <i class="iconfont iconzuoduiqi"
               @click="theLeft"></i>
            <i class="iconfont iconjuzhongduiqi"
               @click="middle_y"></i>
            <i class="iconfont iconyouduiqi"
               @click="theRight"></i>
            <i class="iconfont icondingduiqi"
               @click="theTop"></i>
            <i class="iconfont iconchuizhiduiqi"
               @click="middle_x"></i>
            <i class="iconfont icondiduiqi"
               @click="theBottom"></i>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;position:relative;">
              <span>X</span>
              <div class="right">
                <el-input v-model="message.x"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_x($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_x($event)"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>Y</span>
              <div class="right">
                <el-input v-model="message.y"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_y($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_y($event)"></i>
              </div>
            </div>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;">
              <span>宽</span>
              <div class="right">
                <el-input v-model="message.w"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click='add_w($event)'></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_w($event)"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>高</span>
              <div class="right">
                <el-input v-model="message.h"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_h_Re($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_h_Re($event)"></i>
              </div>

            </div>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;">
              <span>翻转</span>
              <div class="right">
                <el-input v-model="message.rote"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="rotating_add"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="rotating_min"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>圆角</span>
              <div class="right">
                <el-input v-model="message.radius"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click='radius_add'></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click='radius_min'></i>
              </div>

            </div>
          </div>
          <div class="attr_item boder_style_cnt">
            <span class="border_title">描边</span>
            <div class="border_SetCnt">
              <div class="border_color_cnt">
                <div class="border_color border_common_style"
                     :style="{'display':(style_status?'block':'none'),'background-color':(style_status?'#1f2021':'#f2f2f3')}"
                     @click="style_show"></div>
                <div class="border_common_style"
                     :style="{'display':(style_status?'none':'block'),'background':(style_status?'#f6f7f8':'#f2f2f3')}"
                     @click="style_show">
                  <div class="diagonal"></div>
                </div>
                <p style="margin-top: 4px;font-size: 12px;color: #999999;">颜色</p>
              </div>
              <div class="border_show_box">
                <ul class="border_show_cnt"
                    @click="Rectangle_change">
                  <li class="border_show_h"
                      style="cursor: pointer;"><i class="iconfont icon-quanbubiankuang"></i>
                    <ul class="border_show_m"
                        :style="{'display':(Rectangle_show?'block':'none')}">
                      <li class="border_show"
                          ref="canSeeAll"
                          @click="border_style(index)"
                          v-for="(item,index) in border"
                          :key="index"><i :class="[item.old,item.icon]"></i></li>

                    </ul>
                  </li>
                </ul>
                <p style="margin-top: 4px;font-size: 12px;color: #999999;">边框可见</p>
              </div>
              <div class="border_width_box">
                <div class="el-select">
                  <el-select v-model="value_num"
                             placeholder=""
                             @change='change_borderW'
                             size='mini'>
                    <el-option v-for="item in number"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <p style="margin-top: 4px;font-size: 12px;color: #999999;">线宽</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <!-- 文本框 -->
      <div class="attribule"
           :style="{'display': (message.type =='TextBox'&&message.isActive? 'block':'none')}">
        <div class="title">{{attribute.typeName}}</div>
        <div class="attribute_box">
          <div class="attr_item"
               style="width: 100%;">
            <i class="iconfont iconzuoduiqi"
               @click="theLeft"></i>
            <i class="iconfont iconjuzhongduiqi"
               @click="middle_y"></i>
            <i class="iconfont iconyouduiqi"
               @click="theRight"></i>
            <i class="iconfont icondingduiqi"
               @click="theTop"></i>
            <i class="iconfont iconchuizhiduiqi"
               @click="middle_x"></i>
            <i class="iconfont icondiduiqi"
               @click="theBottom"></i>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;position:relative;">
              <span>X</span>
              <div class="right">
                <el-input v-model="message.x"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_x($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_x($event)"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>Y</span>
              <div class="right">
                <el-input v-model="message.y"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_y($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_y($event)"></i>
              </div>
            </div>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;">
              <span>宽</span>
              <div class="right">
                <el-input v-model="message.w"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click='add_w($event)'></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_w($event)"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>高</span>
              <div class="right">
                <el-input v-model="message.h"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_h_Re"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_h_Re"></i>
              </div>

            </div>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;">
              <span>翻转</span>
              <div class="right">
                <el-input v-model="message.rote"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="rotating_add"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="rotating_min"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>圆角</span>
              <div class="right">
                <el-input v-model="message.radius"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="radius_add"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px; cursor: not-allowed;"></i>
              </div>

            </div>
          </div>
          <div class="attr_item boder_style_cnt">
            <span class="border_title">描边</span>
            <div class="border_SetCnt">
              <div class="border_color_cnt">
                <div class="border_color border_common_style"
                     :style="{'display':(style_status?'block':'none'),'background-color':(style_status?'#1f2021':'#f2f2f3')}"
                     @click="style_show"></div>
                <div class="border_common_style"
                     :style="{'display':(style_status?'none':'block'),'background':(style_status?'#f6f7f8':'#f2f2f3')}"
                     @click="style_show">
                  <div class="diagonal"></div>
                </div>
                <p style="margin-top: 4px;font-size: 12px;color: #999999;">颜色</p>
              </div>
              <div class="border_show_box">
                <ul class="border_show_cnt"
                    @click="Rectangle_change">
                  <li class="border_show_h"
                      style="cursor: pointer;"><i class="iconfont icon-quanbubiankuang"></i>
                    <ul class="border_show_m"
                        :style="{'display':(Rectangle_show?'block':'none')}">
                      <li class="border_show"
                          ref="canSeeAll"
                          @click="border_style"
                          v-for="(item,index) in border"
                          :key="index"><i :class="[item.old,item.icon]"></i></li>

                    </ul>
                  </li>
                </ul>
                <p style="margin-top: 4px;font-size: 12px;color: #999999;">边框可见</p>
              </div>
              <div class="border_width_box">
                <div class="el-select">
                  <el-select v-model="value_num"
                             placeholder="请选择"
                             size="mini"
                             @change="change_borderW">
                    <el-option v-for="item in number"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <p style="margin-top: 4px;font-size: 12px;color: #999999;">线宽</p>
              </div>
            </div>

          </div>
        </div>
        <span class="title_name">文本
          <i class="el-icon-minus"
             :style="{'display':(panel_status?'':'none'),'line-height':'30px'}"
             @click="panel_show"></i>
          <i class="el-icon-plus"
             :style="{'display':(panel_status?'none ':''),'line-height':'30px'}"
             @click="panel_show"></i>
        </span>
        <div class="attribute_box"
             :style="{'display':(panel_status?'':'none')}">
          <div class="attr_item font_family">
            <span>字体</span>
            <el-select v-model="font_value"
                       placeholder="请选择"
                       size="mini">
              <el-option v-for="item in font"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="attr_item font_family">
            <span>字号</span>
            <el-input-number v-model="message.size"
                             @change="font_size"
                             @blur='blur_size'
                             :min="1"
                             :max="23"
                             label="描述文字"
                             size="mini"
                             style="width:152px;"></el-input-number>
          </div>
          <div class="attr_item"
               style="width: 100%;justify-content: space-between;">
            <i class="iconfont iconjiacu"
               @click="font_weight"
               style="margin-left:10px;"></i>
            <i class="iconfont iconxieti"></i>
            <i class="iconfont iconxiahuaxian"></i>
            <i class="iconfont icons"
               style="margin-right:12px;"></i>
          </div>
          <div class="attr_item"
               style="width:100%">
            <i class='iconfont iconjuzuo'></i>
            <i class='iconfont iconjuzhong'></i>
            <i class='iconfont iconjuyou'></i>
            <i class='iconfont iconduiqi-copy'></i>
            <i class='iconfont iconsystem_font_cen'></i>
            <i class='iconfont iconjushang'></i>
          </div>
          <div class="attr_item boder_style_cnt">
            <span class="border_title">段落</span>
            <div class="hangju"
                 style="margin-right: 20px;position:relative">
              <el-input v-model="message.lineHeight"
                        size="mini"
                        class="inp"
                        placeholder=""></el-input>
              <i class="el-icon-caret-top"
                 style="position:absolute;top:0;right:3px;"
                 @click="add_lineH"></i>
              <i class="el-icon-caret-bottom"
                 style="position:absolute;bottom:22px;right:3px;"
                 @click="min_lineH"></i>
              <span style="width: 100%;display: inline-block;text-align: center;margin-top: 5px;color: #a1a4a7;">行高</span>
            </div>
            <div class="hanggao"
                 style="position:relative">
              <el-input v-model="message.lineHeight"
                        size="mini"
                        class="inp"
                        placeholder=""></el-input>
              <i class="el-icon-caret-top"
                 style="position:absolute;top:0;right:3px;"
                 @click="add_x($event)"></i>
              <i class="el-icon-caret-bottom"
                 style="position:absolute;bottom:22px;right:3px;"
                 @click="min_x($event)"></i>
              <span style="    width: 100%;display: inline-block;text-align: center;margin-top: 5px;color: #a1a4a7;">间距</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 圆  -->
      <div class="attribule"
           :style="{'display': (message.type =='Circular'&&message.isActive? 'block':'none')}">
        <div class="title">{{attribute.typeName}}</div>
        <div class="attribute_box">
          <div class="attr_item"
               style="width: 100%;">
            <i class="iconfont iconzuoduiqi"
               @click="theLeft"></i>
            <i class="iconfont iconjuzhongduiqi"
               @click="middle_y"></i>
            <i class="iconfont iconyouduiqi"
               @click="theRight"></i>
            <i class="iconfont icondingduiqi"
               @click="theTop"></i>
            <i class="iconfont iconchuizhiduiqi"
               @click="middle_x"></i>
            <i class="iconfont icondiduiqi"
               @click="theBottom"></i>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;position:relative;">
              <span>X</span>
              <div class="right">
                <el-input v-model="message.x"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_x($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_x($event)"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>Y</span>
              <div class="right">
                <el-input v-model="message.y"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_y($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_y($event)"></i>
              </div>
            </div>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;">
              <span>宽</span>
              <div class="right">
                <el-input v-model="message.w"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click='add_w($event)'></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_w($event)"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>高</span>
              <div class="right">
                <el-input v-model="message.h"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_h($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_h($event)"></i>
              </div>

            </div>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;">
              <span>翻转</span>
              <div class="right">
                <el-input v-model="message.rote"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="rotating_add"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="rotating_min"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>圆角</span>
              <div class="right">
                <el-input v-model="message.radius"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click='min($event)'></i>
              </div>

            </div>
          </div>
          <div class="attr_item boder_style_cnt">
            <span class="border_title">描边</span>
            <div class="border_SetCnt">
              <div class="border_color_cnt">
                <div class="border_color border_common_style"></div>
                <p style="margin-top: 4px;font-size: 12px;color: #999999;">颜色</p>
              </div>
              <div class="border_show_box">
                <ul class="border_show_cnt"
                    @click="Rectangle_change">
                  <li class="border_show_h"
                      style="cursor: pointer;"><i class="iconfont icon-quanbubiankuang"></i>
                    <ul class="border_show_m"
                        :style="{'display':(Rectangle_show?'block':'none')}">
                      <li class="border_show"
                          ref="canSeeAll"
                          @click="border_style"
                          v-for="(item,index) in border"
                          :key="index"><i :class="[item.old,item.icon]"></i></li>

                    </ul>
                  </li>
                </ul>
                <p style="margin-top: 4px;font-size: 12px;color: #999999;">边框可见</p>
              </div>
              <div class="border_width_box">
                <div class="el-select">
                  <el-select v-model="value_number"
                             placeholder="请选择"
                             size="mini">
                    <el-option v-for="item in number"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <p style="margin-top: 4px;font-size: 12px;color: #999999;">线宽</p>
              </div>
            </div>

          </div>
        </div>
      </div>
      <!-- 表格  -->
      <div class="attribule"
           :style="{'display': (message.type =='TableBox'&&message.isActive? 'block':'none')}">
        <div class="title">表格属性</div>
        <div class="attribute_box">
          <div class="attr_item"
               style="width: 100%;">
            <i class="iconfont iconzuoduiqi"
               @click="theLeft"></i>
            <i class="iconfont iconjuzhongduiqi"
               @click="middle_y"></i>
            <i class="iconfont iconyouduiqi"
               @click="theRight"></i>
            <i class="iconfont icondingduiqi"
               @click="theTop"></i>
            <i class="iconfont iconchuizhiduiqi"
               @click="middle_x"></i>
            <i class="iconfont icondiduiqi"
               @click="theBottom"></i>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;position:relative;">
              <span>X</span>
              <div class="right">
                <el-input v-model="message.x"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_x($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_x($event)"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>Y</span>
              <div class="right">
                <el-input v-model="message.y"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_y($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_y($event)"></i>
              </div>
            </div>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;">
              <span>宽</span>
              <div class="right">
                <el-input v-model="message.w"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click='add_w($event)'></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_w($event)"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>高</span>
              <div class="right">
                <el-input v-model="message.h"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_h($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_h($event)"></i>
              </div>

            </div>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;">
              <span>翻转</span>
              <div class="right">
                <el-input v-model="message.rote"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="rotating_add"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="rotating_min"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>圆角</span>
              <div class="right">
                <el-input v-model="message.radius"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click='min($event)'></i>
              </div>

            </div>
          </div>
          <div class="attr_item boder_style_cnt">
            <span class="border_title">描边</span>
            <div class="border_SetCnt">
              <div class="border_color_cnt">
                <div class="border_color border_common_style"></div>
                <p style="margin-top: 4px;font-size: 12px;color: #999999;">颜色</p>
              </div>
              <div class="border_show_box">
                <ul class="border_show_cnt"
                    @click="Rectangle_change">
                  <li class="border_show_h"
                      style="cursor: pointer;"><i class="iconfont icon-quanbubiankuang"></i>
                    <ul class="border_show_m"
                        :style="{'display':(Rectangle_show?'block':'none')}">
                      <li class="border_show"
                          ref="canSeeAll"
                          @click="border_style"
                          v-for="(item,index) in border"
                          :key="index"><i :class="[item.old,item.icon]"></i></li>

                    </ul>
                  </li>
                </ul>
                <p style="margin-top: 4px;font-size: 12px;color: #999999;">边框可见</p>
              </div>
              <div class="border_width_box">
                <div class="el-select">
                  <el-select v-model="value_number"
                             placeholder="请选择"
                             size="mini">
                    <el-option v-for="item in number"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <p style="margin-top: 4px;font-size: 12px;color: #999999;">线宽</p>
              </div>
            </div>

          </div>
        </div>
        <span class="title_name">单元格文本<i class="el-icon-minus"
             :style="{'display':(panel_status?'':'none'),'line-height':'30px'}"
             @click="panel_show"></i>
          <i class="el-icon-plus"
             :style="{'display':(panel_status?'none ':''),'line-height':'30px'}"
             @click="panel_show"></i>
        </span>
        <div class="attribute_box"
             :style="{'display':(panel_status?'':'none')}">
          <div class="attr_item font_family">
            <span>字体</span>
            <el-select v-model="value"
                       placeholder="请选择"
                       size="mini">
              <el-option v-for="item in font"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="attr_item font_family">
            <span>字号</span>
            <el-select v-model="value"
                       placeholder="请选择"
                       size="mini">
              <el-option v-for="item in font"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="attr_item"
               style="width: 100%;justify-content: space-between;">
            <i class="iconfont iconjiacu"
               @click="font_weight"
               style="margin-left:10px;"></i>
            <i class="iconfont iconxieti"></i>
            <i class="iconfont iconxiahuaxian"></i>
            <i class="iconfont icons"
               style="margin-right:12px;"></i>
          </div>
          <div class="attr_item"
               style="width:100%">
            <i class='iconfont iconjuzuo'></i>
            <i class='iconfont iconjuzhong'></i>
            <i class='iconfont iconjuyou'></i>
            <i class='iconfont iconduiqi-copy'></i>
            <i class='iconfont iconsystem_font_cen'></i>
            <i class='iconfont iconjushang'></i>
          </div>
          <div class="attr_item boder_style_cnt">
            <span class="border_title">段落</span>
            <div class="hangju"
                 style="margin-right: 20px;position:relative">
              <el-input v-model="message.x"
                        size="mini"
                        class="inp"
                        placeholder=""></el-input>
              <i class="el-icon-caret-top"
                 style="position:absolute;top:0;right:3px;"
                 @click="add_x($event)"></i>
              <i class="el-icon-caret-bottom"
                 style="position:absolute;bottom:18px;right:3px;"
                 @click="min_x($event)"></i>
              <span style="width: 100%;display: inline-block;text-align: center;margin-top: 5px;color: #a1a4a7;">行高</span>
            </div>
            <div class="hanggao"
                 style="position:relative">
              <el-input v-model="message.x"
                        size="mini"
                        class="inp"
                        placeholder=""></el-input>
              <i class="el-icon-caret-top"
                 style="position:absolute;top:0;right:3px;"
                 @click="add_x($event)"></i>
              <i class="el-icon-caret-bottom"
                 style="position:absolute;bottom:18px;right:3px;"
                 @click="min_x($event)"></i>
              <span style="    width: 100%;display: inline-block;text-align: center;margin-top: 5px;color: #a1a4a7;">间距</span>
            </div>
          </div>

        </div>
        <span class="title_name">KEY值设置<i class="el-icon-minus"
             style="line-height: 30px;font-size:16px;"
             :style="{'display':(key_status?'':'none'),'line-height':'30px'}"
             @click="key_show"></i>
          <i class="el-icon-plus"
             :style="{'display':(key_status?'none ':''),'line-height':'30px'}"
             @click="key_show"></i>
        </span>
        <div class="key_box"
             :style="{'display':(key_status?'':'none')}">
          <div class="key">
            <span style="margin-right:5px;">表格KEY值</span>
            <el-input v-model="input"
                      size="mini"
                      class="inputN"
                      placeholder="请以字母命名"></el-input>
          </div>
          <div class="key">
            <span style="margin-right:5px;">该列KEY值</span>
            <el-input v-model="input"
                      size="mini"
                      class="inputN"
                      placeholder="请以字母命名"></el-input>
          </div>
        </div>
      </div>
      <!-- 图片 -->
      <div class="attribule"
           :style="{'display': (message.type =='DPhoto'&&message.isActive? 'block':'none')}">
        <div class="title">{{attribute.typeName}}</div>
        <div class="attribute_box">
          <div class="attr_item"
               style="width: 100%;">
            <i class="iconfont iconzuoduiqi"
               @click="theLeft"></i>
            <i class="iconfont iconjuzhongduiqi"
               @click="middle_y"></i>
            <i class="iconfont iconyouduiqi"
               @click="theRight"></i>
            <i class="iconfont icondingduiqi"
               @click="theTop"></i>
            <i class="iconfont iconchuizhiduiqi"
               @click="middle_x"></i>
            <i class="iconfont icondiduiqi"
               @click="theBottom"></i>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;position:relative;">
              <span>X</span>
              <div class="right">
                <el-input v-model="message.x"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_x($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_x($event)"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>Y</span>
              <div class="right">
                <el-input v-model="message.y"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_y($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_y($event)"></i>
              </div>
            </div>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;">
              <span>宽</span>
              <div class="right">
                <el-input v-model="message.w"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click='add_w($event)'></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_w($event)"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>高</span>
              <div class="right">
                <el-input v-model="message.h"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_h($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_h($event)"></i>
              </div>

            </div>
          </div>
          <div class="attr_item">
            <div class="inp_box"
                 style="margin-right:10px;">
              <span>翻转</span>
              <div class="right">
                <el-input v-model="message.rote"
                          @blur="transform"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="rotating_add"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="rotating_min"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>圆角</span>
              <div class="right">
                <el-input v-model="message.radius"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="radius_addImg"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click='radius_minImg'></i>
              </div>

            </div>
          </div>
        </div>
        <span class="title_name">图片<i class="el-icon-minus"
             style="line-height: 30px;font-size:16px;"
             :style="{'display':(img_panel?'':'none'),'line-height':'30px'}"
             @click="img_show"></i>
          <i class="el-icon-plus"
             :style="{'display':(img_panel?'none ':''),'line-height':'30px'}"
             @click="img_show"></i>

        </span>
        <div class="attribute_box"
             :style="{'display':(img_panel?'':'none')}">
          <div class=""
               style="display:flex;width: 212px;margin-top: 10px;"><span style="line-height:18px;">
              等比例缩放图片
            </span><i class="iconfont iconsuo"
               :style="{'display':(lock_status?'block':'none'),'color':'red','margin-left':'5px'}"
               @click='lock'></i>
            <i class="iconfont iconjiesuo1"
               :style="{'display':(lock_status?'none':'block'),'margin-left':'5px'}"
               @click="lock"></i></div>

          <div class="drag_img">
            <span class="drag_file"
                  :style="{'display':(img_status?'none':''),'flex-direction': 'column'}">
              <b>拖拽或点击上传图片填充背景</b>
              <b>图片勿超过2MB</b>
              <input type="file"
                     accept="image/gif,image/jpeg,image/png,image/jpg"
                     name="image"
                     class="getImgUrl_file"
                     @change="uploader($event)">
            </span>
          </div>
          <div class="drag_file"
               :style="{'display':(img_status?'':'none')}">
            <span style="margin-right:20px;">
              <i class="iconfont  iconshuaxin"
                 style="color:red; display:line-block;position:relative;"
                 title="重新选择">
                <input type="file"
                       accept="image/gif,image/jpeg,image/png,image/jpg"
                       name="image"
                       class="getImgUrl_file"
                       @change="uploader_again($event)"
                       style="width:16px;height:16px;display:inline-block;position:absolute;top:0;left:0;">
              </i></span>
            <span style="margin-left:20px;"> <i class="iconfont  iconshanchu-copy-copy"
                 style="color:red;"
                 @click="delImg"
                 title="删除"></i></span>

          </div>
        </div>
      </div>
      <!-- 二维码 -->
      <div class="attribule"
           :style="{'display': (message.type =='Qrcode'&&message.isActive? 'block':'none')}">
        <div class=""
             style="margin:10px 10px 0 10px;">
          <div class="attr_item"
               style="width: 100%;flex:0;margin-top:10px;">
            <i class="iconfont iconzuoduiqi"
               @click="theLeft"></i>
            <i class="iconfont iconjuzhongduiqi"
               @click="middle_y"></i>
            <i class="iconfont iconyouduiqi"
               @click="theRight"></i>
            <i class="iconfont icondingduiqi"
               @click="theTop"></i>
            <i class="iconfont iconchuizhiduiqi"
               @click="middle_x"></i>
            <i class="iconfont icondiduiqi"
               @click="theBottom"></i>
          </div>
          <div class="attr_item"
               style="flex:0;margin-top:10px;">
            <div class="inp_box"
                 style="margin-right:10px;position:relative;">
              <span>X</span>
              <div class="right">
                <el-input v-model="message.x"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_x($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_x($event)"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>Y</span>
              <div class="right">
                <el-input v-model="message.y"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_y($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_y($event)"></i>
              </div>
            </div>
          </div>
          <div class="attr_item"
               style="flex:0;margin-top:10px;">
            <div class="inp_box"
                 style="margin-right:10px;">
              <span>宽</span>
              <div class="right">
                <el-input v-model="message.w"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click='add_w($event)'></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_w($event)"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>高</span>
              <div class="right">
                <el-input v-model="message.h"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_h($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_h($event)"></i>
              </div>

            </div>
          </div>
        </div>
        <span class="title_name">设置<i class="el-icon-minus"
             :style="{'display':(panel_status?'':'none'),'line-height':'30px'}"
             @click="panel_show"></i>
          <i class="el-icon-plus"
             :style="{'display':(panel_status?'none ':''),'line-height':'30px'}"
             @click="panel_show"></i>
        </span>
        <div class="attribute_box"
             :style="{'display':(panel_status?'':'none'),'margin-top':'10px'}">
          <div class="attr_item">
            <span>KEY值</span>
            <el-input v-model="qrcode_key"
                      placeholder="请以字母命名"
                      size="mini"
                      style="width:150px;margin-left:10px;"></el-input>
          </div>
          <div class="attr_item">
            <el-input v-model="qrcode_value"
                      placeholder="请输入二维码信息内容"
                      type="textarea"
                      style="margin-top:10px;width:202px;"></el-input>
          </div>
          <el-button type="primary"
                     style="height: 30px;width: 150px;margin-top: 10px;"
                     @click="makeQRCode">生成</el-button>
        </div>
      </div>
      <!-- 条形码 -->
      <div class="attribule"
           :style="{'display': (message.type =='Barcode'&&message.isActive? 'block':'none')}">
        <div class=""
             style="margin:10px 10px 0 10px;">
          <div class="attr_item"
               style="width: 100%;flex:0;margin-top:10px;">
            <i class="iconfont iconzuoduiqi"
               @click="theLeft"></i>
            <i class="iconfont iconjuzhongduiqi"
               @click="middle_y"></i>
            <i class="iconfont iconyouduiqi"
               @click="theRight"></i>
            <i class="iconfont icondingduiqi"
               @click="theTop"></i>
            <i class="iconfont iconchuizhiduiqi"
               @click="middle_x"></i>
            <i class="iconfont icondiduiqi"
               @click="theBottom"></i>
          </div>
          <div class="attr_item"
               style="flex:0;margin-top:10px;">
            <div class="inp_box"
                 style="margin-right:10px;position:relative;">
              <span>X</span>
              <div class="right">
                <el-input v-model="message.x"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_x($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_x($event)"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>Y</span>
              <div class="right">
                <el-input v-model="message.y"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_y($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_y($event)"></i>
              </div>
            </div>
          </div>
          <div class="attr_item"
               style="flex:0;margin-top:10px;">
            <div class="inp_box"
                 style="margin-right:10px;">
              <span>宽</span>
              <div class="right">
                <el-input v-model="message.w"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click='add_w($event)'></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_w($event)"></i>
              </div>

            </div>
            <div class="inp_box">
              <span>高</span>
              <div class="right">
                <el-input v-model="message.h"
                          size="mini"
                          class="inp"
                          placeholder=""></el-input>
                <i class="el-icon-caret-top"
                   style="position:absolute;top:0;right:3px;"
                   @click="add_h($event)"></i>
                <i class="el-icon-caret-bottom"
                   style="position:absolute;bottom:0;right:3px;"
                   @click="min_h($event)"></i>
              </div>

            </div>
          </div>
        </div>
        <span class="title_name">设置<i class="el-icon-minus"
             :style="{'display':(panel_status?'':'none'),'line-height':'30px'}"
             @click="panel_show"></i>
          <i class="el-icon-plus"
             :style="{'display':(panel_status?'none ':''),'line-height':'30px'}"
             @click="panel_show"></i>
        </span>
        <div class="attribute_box"
             :style="{'display':(panel_status?'':'none'),'margin-top':'10px'}">
          <div class="attr_item"
               style="flex:0;">
            <span>KEY值</span>
            <el-input v-model="qrcode_key"
                      placeholder="请以字母命名"
                      size="mini"
                      style="width:150px;margin-left:10px;"></el-input>
          </div>
          <div class="attr_item"
               style="flex:0;flex-direction: column;">
            <span style="margin-top:3px;margin-right:43px;">内容:(请输入条形码内容)</span>
            <el-input v-model="qrcode_value"
                      placeholder="请输入条形信息内容"
                      type="textarea"
                      style="margin-top:10px;width:202px;"></el-input>
          </div>
           <div class="attr_item font_family">
            <span style="height:24px;line-height:24px;">编码格式</span>
            <el-select v-model="value"
                       placeholder="请选择"
                       size="mini" style="width:130px;">
              <el-option v-for="item in code"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <el-button type="primary"
                     style="height: 30px;width: 150px;margin-top: 10px;"
                     @click="makeBarcode">生成</el-button>
            <img src="" alt="" id="barcode">
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import QRCode from "qrcode";
import JsBarcode from 'jsbarcode';
export default {
  name: "RightSet",
  data () {
    return {
      font: [{
        value: '宋体',
        lable: 'Times New Roman'
      }],
      code:[{
        value:'utf-8',
        lable:'utf-8'
      }],
      font_value: '',
      border: [{
        icon: ' icon-quanbubiankuang',
        type: 'all',
        old: 'iconfont'
      }, {
        icon: 'icon-shangbiankuang',
        type: 'top',
        old: 'iconfont'

      }, {
        icon: 'icon-youbiankuang',
        type: 'right',
        old: 'iconfont'

      }, {
        icon: 'iconxiabiankuang',
        type: 'bottom',
        old: 'iconfont'

      }, {
        icon: 'icon-zuobiankuang',
        type: 'left',
        old: 'iconfont'

      }],
      options: [
        {
          value: 'solid',
          label: '—'
        },
        {
          value: 'dashed',
          label: '- -'
        },
        {
          value: 'dotted',
          label: '...'
        }
      ],
      number: [{
        value: '0',
        label: '0'
      }, {
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }],
      liArrays: [],
      value: '',
      value_num: '',
      value_number: '',

      set: {
        type: 'set',
        typeName: '基本设置',
      },
      attribute: {
        type: "operation",
        typeName: '属性',
      },
      input: "",
      qrcode_value: "",
      qrcode_key: '',
      show_easy: true,
      style_status: true,
      Rectangle_show: false,
      imgDataUrl: '',
      img_status: false,
      clickShow_status: true,
      panel_status: true,
      key_status: true,
      img_panel: true,
      lock_status: true,
      liStatus: true,
      qrcodeurl: ''
    }
  },
  components: {
    QRCode: QRCode
  },
  methods: {
    // 生成二维码
    makeQRCode () {
      const value = JSON.stringify({ key: this.qrcode_key, value: this.qrcode_value })
      console.log(value)
      QRCode.toDataURL(value)
        .then(imgData => {
          if (imgData) {
            console.log(imgData)
            this.message.img = imgData
          }
        });
    },
    // 条形码
    makeBarcode(){
       JsBarcode("#barcode", "1234", {

　　　　　  format: "pharmacode",
　　 　　   lineColor: "#0aa",
　　 　　   width: 4,
　　 　　   height: 40,
　　　　   displayValue: false
　　　　})
    },
   
    lock () {
      this.lock_status = !this.lock_status
    },
    panel_show () {
      this.panel_status = !this.panel_status;
    },
    key_show () {
      this.key_status = !this.key_status;
    },
    img_show () {
      this.img_panel = !this.img_panel;
    },
    Rectangle_change () {
      this.Rectangle_show = !this.Rectangle_show
    },
    change () {
      const style = this.message.style
      style.borderTopStyle = this.value
    },
    transform ($event) {
      console.log($event)
    },
    change_borderW () { //线宽
      const style = this.message.style
      style.borderWidth = this.value_num + 'px'
    },
    //加粗
    font_weight () {
      const div = this.message.ele.srcElement.firstChild.firstElementChild
      this.message.fontStyle = 'blod'
      div.style.fontWeight = this.message.fontStyle
    },
    //字体
    choose_font () {
      const style = this.message.style;
      style.fontFamily = 'Times New Roman'
    },
    //字号
    font_size () {
      const div = this.message.ele.srcElement.firstChild.firstElementChild
      this.message.size++;
      div.style.fontSize = this.message.size + 'px'
    },
    blur_size () {
      const div = this.message.ele.srcElement.firstChild.firstElementChild
      div.style.fontSize = this.message.size + 'px'

    },
    clickShow () {
      this.show_easy = !this.show_easy;

    },
    add_w (event) {

      this.message.w++;
    },
    min_w (event) {
      this.message.w--;
      if (this.attr_input < 0) {
      }
    },
    add_h (event) {
      this.message.h++
      const style = this.message.style
      style.borderTopWidth = this.message.h + 'px'
    },
    min_h (event) {
      this.message.h--
      const style = this.message.style
      style.borderTopWidth = this.message.h + 'px'
    },
    add_h_Re (event) {
      this.message.h++
      this.message.h = this.message.h
    },
    min_h_Re (event) {
      this.message.h--
      this.message.h = this.message.h
    },
    add_x (event) {
      this.message.x++;
    },
    min_x (event) {
      this.message.x--;
      if (this.attr_input < 0) {
      }
    },
    add_y (event) {
      this.message.y++
    },
    min_y (event) {
      this.message.y--
    },
    add_radius () {
      this.message.style.borderRadius++;
    },
    middle_x () {//横向居中
      console.log("居中")
      this.message.x = this.templateInfo.w / 2 - this.message.w / 2
    },
    middle_y () {//纵向居中
      this.message.y = this.templateInfo.h / 2 - this.message.h / 2
    },
    theLeft () {//居左
      this.message.x = 0
    },
    theRight () {//居右
      this.message.x = this.templateInfo.w
    },
    theTop () {//居上
      this.message.y = 0;
    },

    theBottom () {//向下
      this.message.y = this.templateInfo.h - this.message.h / 2 - 10;
      console.log(this.message.y)
    },
    // 翻转
    rotating_add () {
      this.message.rote += 10;
      console.log(this.message.rote)
      this.message.style.transform = 'rotate(' + this.message.rote + 'deg)'

    },
    rotating_min () {
      this.message.rote -= 10;
      this.message.style.transform = 'rotate(' + this.message.rote + 'deg)'
    },
    //圆角
    radius_add () {
      const style = this.message.style;
      this.message.radius++;
      style.borderRadius = this.message.radius + '%';
    },
    radius_min () {
      const style = this.message.style;
      this.message.radius--;
      style.borderRadius = this.message.radius + '%';
    },

    radius_addImg () {
      const div = this.message.ele.srcElement.firstChild.firstElementChild
      const style = this.message.style;
      this.message.radius++;
      div.style.borderRadius = this.message.radius + '%';

    },
    radius_minImg () {
      const div = this.message.ele.srcElement.firstChild.firstElementChild
      const style = this.message.style;
      this.message.radius--;
      div.style.borderRadius = this.message.radius + '%';

    },
    // 行高
    add_lineH () {
      const style = this.message.style;
      this.message.lineHeight++
      style.lineHeight = this.message.lineHeight + 'px'

    },
    min_lineH () {
      const style = this.message.style;
      this.message.lineHeight--
      style.lineHeight = this.message.lineHeight + 'px'

    },
    // 字体加粗
    font_weight () {
      const eles = this.message.ele
      const inp = eles.srcElement.firstChild.firstChild
      console.log(inp)
      inp.style.fontWeight = 'blod'
    },

    // 矩形点击
    style_show (event) {
      this.style_status = !this.style_status;
      if (this.style_status) {
        this.message.style.borderWidth = 2 + 'px'
      } else {
        this.message.style.borderWidth = 0 + 'px '

      }
    },
    //选择图片
    uploader ($event) {
      const file = $event.srcElement.files[0]
      let reader = new FileReader();
      reader.onload = ($event) => {
        let result = $event.target.result
        this.message.img = result;
        this.img_status = !this.img_status;

      }
      reader.readAsDataURL(file);
    },
    //重新选择图片
    uploader_again ($event) {
      const file = $event.srcElement.files[0]
      let reader = new FileReader();
      reader.onload = ($event) => {
        let result = $event.target.result
        this.message.img = result;

      }
      reader.readAsDataURL(file);
    },
    // 删除图片
    delImg () {
      this.message.img = 'data:image/png;base64,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'
      this.img_status = !this.img_status;

    },
    //边框可见
    border_style (index) {
      this.liShow(index)
      if (index = 0) {

      } else if (index = 1) {

      } else if (index = 2) {

      } else if (index = 3) {

      } else if (index = 4) {

      }
    },

    //点击显示隐藏
    click_show () {
      this.clickShow_status = !this.clickShow_status;
    }

  },
  watch: {
    'message.h' (val) {
      const { style, type } = this.message
      if (type === 'DLine') {
        style.borderTopWidth = val + 'px'
      }
    },
  },
  props: {
    message: {
      type: Object,
      default: function () {
        return {}
      },
      required: true
    },
    templateInfo: {
      type: Object,
      default: function () {
        return {}
      },
      required: true
    }
  },
}
</script>
<style>
.inp_box .right .el-input__inner {
  height: 24px;
  display: inline-block;
}

.input__suffix {
  position: absolute;
  top: 0;
  height: 24px;
  color: #c0c4cc;
  text-align: center;
}

.font_family .el-select .el-input__inner {
  width: 100%;
  height: 24px;
}

.border_width_box .el-select .el-input__inner {
  height: 24px;
}
</style>
<style scoped>
* {
  padding: 0;
  margin: 0;
}

.panel_right {
  height: 100%;
  margin-left: 100px;
  background: #fff;
  z-index: 1000;
}

.set_box,
.attribute_box {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: center;
  width: 224px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0px 5px;
  background: #fff;
}

.set_box .item {
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 28px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.set_box .item span {
  flex: 2;
  display: inline-block;
  height: 28px;
  line-height: 28px;
  text-align: left;
  margin-left: 15px;
}

.showOr {
  display: flex;
  width: 83px;
  height: 28px;
  margin-right: 37px;
  border: 1px solid #e3e4e2;
  background-color: #e4e7ed;
  align-items: center;
}

.showOr span {
  display: inline-block;
  line-height: 28px;
}

.showOr svg {
  display: inline-block;
  width: 20px;
  height: 28px;
  margin-right: 15px;
  cursor: pointer;
}

.item .inp {
  flex: 3;
  margin-right: 10px;
}

.title {
  display: block;
  width: 100%;
  height: 34px;
  line-height: 40px;
  text-align: center;
  background: #ffffff;
  font-size: 14px;
  color: #0090ff;
  border-bottom: 1px solid #0090ff;
}

.attr_item {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.inp_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  background: #e3e4e2;
  position: relative;
}

.inp_box span {
  flex: 1;
  height: 22px;
  line-height: 22px;
  text-align: center;
}

.inp_box .right {
  flex: 2;
}

.inputWH {
  padding: 0 5px;
}

.show_box {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 28px;
  line-height: 28px;
  outline: 0;
  padding: 0 15px;
}

svg {
  cursor: pointer;
}

/* 矩形 */
.boder_style_cnt {
  flex: 1;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-left: 7px;
}

.border_title {
  width: 36px;
  line-height: 24px;
  color: #999999;
  font-size: 12px;
  height: 100%;
}

.border_SetCnt {
  width: 170px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.border_color_cnt {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  /* height: 42px; */
}

.diagonal {
  position: absolute;
  width: 60px;
  height: 2px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: #ff6666;
  -webkit-transform-origin: center 22px;
  transform-origin: center 22px;
  -webkit-transform: rotateZ(-26deg);
  transform: rotateZ(-26deg);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.border_color {
  padding: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #000;
  background-clip: content-box;
}

.border_common_style {
  position: relative;
  width: 46px;
  height: 24px;
  background-color: #1f2021;
  border-radius: 3px;
  border: solid 1px #f2f2f3;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
}

.border_show_box {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 42px;
}

.border_show_cnt {
  width: 46px;
  height: 24px;
  background-color: #f1f2ef;
  border-radius: 3px;
  border: solid 1px #e3e4e2;
  font-size: 14px;
}

.border_show_h {
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.border_width_box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  height: 42px;
}

.border_width_box .el-select {
  width: 46px;
  height: 24px;
}

.el-input--suffix .el-input__inner {
  height: 24px;
}

.el-select {
  display: inline-block;
  position: relative;
}

.el-select > .el-input {
  display: block;
  height: 24px;
}

.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}

.border_width_box .el-select .el-input .el-input__inner {
  height: 24px !important;
  padding-left: 5px;
  padding-right: 20px;
  background: #f6f7f8;
  border: none;
  color: #606266;
}

/* 文本 */
.panel_right .title_name {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 90%;
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  margin: 0 auto;
  font-size: 12px;
  color: #666666;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #e3f3ff;
  border-bottom: 1px solid #0090ff;
  border-radius: 5px;
}

.font_family {
  justify-content: space-around;
  width: 100%;
}

.font_family .el-select {
  width: 152px;
  height: 24px;
}

.border_show_m {
  position: absolute;
  top: 24px;
  left: 0;
  z-index: 10;
  width: 46px;
  padding: 4px 0;
  text-align: center;
  background-color: #ffffff;
  -webkit-box-shadow: 0px 0px 4px 0px #d9d9d9;
  box-shadow: 0px 0px 4px 0px #d9d9d9;
  border-radius: 1px;
}

.border_show {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  line-height: 22px;
  height: 22px;
}

.border_show:hover {
  background-color: rgb(241, 242, 239);
}

.hangju,
.hanggao {
  height: 100%;
  width: 70px;
}

/* 表格 */
.key_box {
  display: flex;
  flex-direction: column;
  align-content: center;
  padding: 0 5px;
}

.key_box .key {
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-top: 10px;
  margin-right: 6px;
}

.key_box .key span {
  flex: 1;
  text-align: center;
  line-height: 28px;
  height: 28px;
}

.key_box .key .inputN {
  flex: 2;
}

.border_color_cnt .line_select {
  width: 46px;
  height: 24px;
}

.border_color_cnt .line_select .el-input__inner {
  height: 24px;
}

/* 图片 */

.drag_file {
  margin-top: 15px;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  width: 212px;
  height: 48px;
  border-radius: 3px;
  border: dashed 1px #eef0eb;
  font-size: 12px;
  color: #999999;
  position: relative;
  justify-content: center;
}

.drag_file input {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
}
</style>