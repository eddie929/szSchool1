<template>
  <el-dialog
    :title="titleDialog"
    :visible.sync="dialogVisible"
    width="75%"
    center
    :close-on-click-modal="false"
    append-to-body
  >
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :label-position="labelPosition"
      style="text-align: left; white-space: nowrap"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane label="扩展信息" name="second">
          <!-- 车辆 -->
          <div v-if="carif">
            <el-row :gutter="6">
              <el-col :span="8">
                <el-form-item
                  label="车架号"
                  prop="车架号"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.车架号"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="车牌号"
                  prop="车牌号"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.车牌号"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="车辆产地"
                  prop="车辆产地"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.车辆产地"
                    clearable
                    style="width: 85%"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="6" style="margin-top: 1%">
              <el-col :span="8">
                <el-form-item
                  label="车辆用途"
                  prop="车辆用途"
                  :label-width="formLabelWidth"
                >
                  <el-select
                    clearable
                    v-model="form.车辆用途"
                    placeholder="请选择"
                    style="width: 85%"
                  >
                    <el-option
                      v-for="item in 车辆用途options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="生产厂家"
                  prop="生产厂家"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.生产厂家"
                    clearable
                    style="width: 85%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="发动机号"
                  prop="发动机号"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.发动机号"
                    clearable
                    style="width: 85%"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="6" style="margin-top: 1%">
              <el-col :span="8">
                <el-form-item
                  label="排气量"
                  prop="排气量"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.排气量"
                    clearable
                    style="width: 85%"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item
                  label="备注"
                  prop="备注"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.拓展备注"
                    clearable
                    style="width: 93%"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 文物 -->
          <div v-if="Cultural">
            <el-row :gutter="6">
              <el-col :span="8">
                <el-form-item
                  label="文物等级"
                  prop="文物等级"
                  :label-width="formLabelWidth"
                >
                  <el-select
                    v-model="form.文物等级"
                    placeholder="请选择"
                    style="width: 85%"
                    clearable
                  >
                    <el-option
                      v-for="item in 文物等级options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="落成年代"
                  prop="落成年代"
                  :label-width="formLabelWidth"
                >
                  <el-date-picker
                    v-model="form.落成年代"
                    type="date"
                    style="width: 85%"
                    placeholder="落成年代"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="来源地"
                  prop="来源地"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.来源地"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="6" style="margin-top: 1%">
              <el-col :span="24">
                <el-form-item
                  label="备注"
                  prop="备注"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.拓展备注"
                    style="width: 96%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 土地 -->
          <div v-if="land">
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="坐标位置"
                  prop="坐标位置"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.坐标位置"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="丘号"
                  prop="丘号"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.丘号"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="权属证号"
                  prop="权属证号"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.权属证号"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 1%">
              <el-col :span="8">
                <el-form-item
                  label="土地来源"
                  prop="土地来源"
                  :label-width="formLabelWidth"
                >
                  <el-select
                    v-model="form.土地来源"
                    placeholder="请选择"
                    style="width: 85%"
                    clearable
                  >
                    <el-option
                      v-for="item in 土地来源options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="发证日期"
                  prop="发证日期"
                  :label-width="formLabelWidth"
                >
                  <el-date-picker
                    v-model="form.发证日期"
                    type="date"
                    style="width: 85%"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="权属性质"
                  prop="权属性质"
                  :label-width="formLabelWidth"
                >
                  <el-select
                    v-model="form.权属性质"
                    placeholder="请选择"
                    style="width: 85%"
                    clearable
                  >
                    <el-option
                      v-for="item in 权属性质options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 1%">
              <el-col :span="8">
                <el-form-item
                  label="证载面积"
                  prop="证载面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.证载面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="在用面积"
                  prop="在用面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.在用面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="出租出借面积"
                  prop="出租出借面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.出租出借面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 1%">
              <el-col :span="8">
                <el-form-item
                  label="毁损待报废面积"
                  prop="毁损待报废面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.毁损待报废面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="对外投资面积"
                  prop="对外投资面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.对外投资面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="担保面积"
                  prop="担保面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.担保面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 1%">
              <el-col :span="8">
                <el-form-item
                  label="闲置面积"
                  prop="闲置面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.闲置面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="其他面积"
                  prop="其他面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.其他面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="备注"
                  prop="备注"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.拓展备注"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <!-- 房屋 -->
          <div v-if="fangwu">
            <el-row :gutter="6">
              <el-col :span="8">
                <el-form-item
                  label="坐落位置"
                  prop="坐落位置"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.坐落位置"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="建筑结构"
                  prop="建筑结构"
                  :label-width="formLabelWidth"
                >
                  <el-select
                    v-model="form.建筑结构"
                    placeholder="请选择"
                    style="width: 85%"
                    clearable
                  >
                    <el-option
                      v-for="item in 建筑结构options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="施工单位"
                  prop="施工单位"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.施工单位"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="6" style="margin-top: 1%">
              <el-col :span="8">
                <el-form-item
                  label="权属证号"
                  prop="权属证号"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.权属证号"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="证载面积"
                  prop="证载面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.证载面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="建筑面积"
                  prop="建筑面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.建筑面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="6" style="margin-top: 1%">
              <el-col :span="8">
                <el-form-item
                  label="在用面积"
                  prop="在用面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.在用面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="出租出借面积"
                  prop="出租出借面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.出租出借面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="对外投资面积"
                  prop="对外投资面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.对外投资面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="6" style="margin-top: 1%">
              <el-col :span="8">
                <el-form-item
                  label="其他面积"
                  prop="其他面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.其他面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="栋号"
                  prop="栋号"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.栋号"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="楼层数"
                  prop="楼层数"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.楼层数"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="6" style="margin-top: 1%">
              <el-col :span="8">
                <el-form-item
                  label="竣工日期"
                  prop="竣工日期"
                  :label-width="formLabelWidth"
                >
                  <el-date-picker
                    v-model="form.竣工日期"
                    type="date"
                    style="width: 85%"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="发证日期"
                  prop="发证日期"
                  :label-width="formLabelWidth"
                >
                  <el-date-picker
                    v-model="form.发证日期"
                    type="date"
                    style="width: 85%"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="占地面积"
                  prop="占地面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.占地面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="6" style="margin-top: 1%">
              <el-col :span="8">
                <el-form-item
                  label="使用面积"
                  prop="使用面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.使用面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="闲置面积"
                  prop="闲置面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.闲置面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="毁损待报废面积"
                  prop="毁损待报废面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.毁损待报废面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="6" style="margin-top: 1%">
              <el-col :span="8">
                <el-form-item
                  label="担保面积"
                  prop="担保面积"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.担保面积"
                    style="width: 85%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item
                  label="备注"
                  prop="备注"
                  :label-width="formLabelWidth"
                >
                  <el-input
                    v-model="form.拓展备注"
                    style="width: 94%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <el-button type="primary" class="el-icon-check" @click="btnok()">
        确 定</el-button
      >
      <el-button class="el-icon-close" @click="dialogVisible = false">
        取 消</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      titleDialog: "",
      dialogVisible: false,
      activeName: "second",
      descriptions: true, //扩展隐藏
      carif: true, //车辆隐藏
      Cultural: true, //文物
      land: true, //土地
      fangwu: true, //房屋
      form: {},
      labelPosition: "left",
      formLabelWidth: "100px",
      // 车辆用途
      车辆用途options: [
        {
          value: "副部(省)级以上领导用车",
          label: "副部(省)级以上领导用车"
        },
        {
          value: "主要领导干部用车",
          label: "主要领导干部用车"
        },
        {
          value: "一般公务用车",
          label: "一般公务用车"
        },
        {
          value: "执法执勤用车",
          label: "执法执勤用车"
        },
        {
          value: "机要通信用车",
          label: "机要通信用车"
        },
        {
          value: "应急保障用车",
          label: "应急保障用车"
        },
        {
          value: "特种专业技术用车",
          label: "特种专业技术用车"
        },
        {
          value: "其他用车",
          label: "其他用车"
        }
      ],
      // 土地性质
      权属性质options: [
        {
          value: "国有",
          label: "国有"
        },
        {
          value: "集体",
          label: "集体"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      //土地来源
      土地来源options: [
        {
          value: "出让",
          label: "出让"
        },
        {
          value: "划拨",
          label: "划拨"
        },
        {
          value: "租赁",
          label: "租赁"
        }
      ],
      // 建筑结构
      建筑结构options: [
        {
          value: "钢结构",
          label: "钢结构"
        },
        {
          value: "钢筋混凝土结构",
          label: "钢筋混凝土结构"
        },
        {
          value: "砖混结构",
          label: "砖混结构"
        },
        {
          value: "砖木结构",
          label: "砖木结构"
        }
      ],
      // 文物等级
      文物等级options: [
        {
          value: "一级",
          label: "一级"
        },
        {
          value: "二级",
          label: "二级"
        },
        {
          value: "三级",
          label: "三级"
        },
        {
          value: "一般文物",
          label: "一般文物"
        }
      ]
    };
  },

  methods: {
    btnok() {
      // console.log("提交发放");
      // console.log(
      //   " this.form this.form this.form this.form this.form this.form",
      //   this.form
      // );
      this.$emit("addForm", this.form);

      this.dialogVisible = false;
    },
    qingkong() {
      // this.$refs.form.resetFields();
      // console.log("执行了吗");
      this.form = this.$options.data().form;
      return;
      this.form.车架号 = "";

      this.form.车牌号 = "";

      this.form.车辆产地 = "";

      this.form.车辆用途 = "";

      this.form.生产厂家 = "";

      this.form.发动机号 = "";

      this.form.排气量 = "";

      this.form.拓展备注 = "";

      this.form.文物等级 = "";

      this.form.落成年代 = "";

      this.form.来源地 = "";

      this.form.坐标位置 = "";

      this.form.丘号 = "";

      this.form.权属证号 = "";

      this.form.土地来源 = "";

      this.form.发证日期 = "";

      this.form.权属性质 = "";

      this.form.证载面积 = "";

      this.form.在用面积 = "";

      this.form.出租出借面积 = "";

      this.form.毁损待报废面积 = "";

      this.form.对外投资面积 = "";

      this.form.担保面积 = "";

      this.form.闲置面积 = "";

      this.form.其他面积 = "";

      this.form.坐落位置 = "";

      this.form.建筑结构 = "";

      this.form.施工单位 = "";

      this.form.权属证号 = "";

      this.form.证载面积 = "";

      this.form.建筑面积 = "";

      this.form.在用面积 = "";

      this.form.出租出借面积 = "";

      this.form.对外投资面积 = "";

      this.form.其他面积 = "";

      this.form.栋号 = "";

      this.form.楼层数 = "";

      this.form.竣工日期 = "";

      this.form.发证日期 = "";

      this.form.占地面积 = "";

      this.form.使用面积 = "";

      this.form.闲置面积 = "";

      this.form.毁损待报废面积 = "";

      this.form.担保面积 = "";

      this.form.占地面积 = "";
    }
  }
};
</script>

<style></style>
