<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="90%"
    center
    append-to-body
    :close-on-click-modal="false"
    :before-close="handleClose"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :label-position="labelPosition"
      :rules="rules"
      style="text-align: left; white-space: nowrap"
    >
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <el-row :gutter="6">
            <el-col :span="8">
              <el-form-item
                label="资产编号"
                prop="资产编号"
                :label-width="formLabelWidth"
              >
                {{ form.资产编号 }}
                <!-- <el-input
                  v-model="form.资产编号"
                  disabled
                  style="width: 85%"
                ></el-input> -->
                <el-tooltip
                  content="编号是唯一的,系统会按照您设置的资产分类自动生成编码"
                  placement="bottom"
                  effect="light"
                >
                  <i class="el-icon-warning-outline" style="color: #409eff"></i>
                </el-tooltip>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="资产状态"
                prop="资产状态"
                :label-width="formLabelWidth"
                >{{ form.资产状态 }}
                <!-- <el-input
                  v-model="form.资产状态"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="资产分类"
                prop="资产分类"
                :label-width="formLabelWidth"
              >
                <el-cascader
                  style="width: 85%"
                  :options="AssetClassesoptions"
                  :props="defaultProps"
                  clearable
                  v-model="AssetClassesvalue"
                  :show-all-levels="showAllLevels"
                  @change="AssetClasseschange"
                ></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="6" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="资产名称"
                prop="资产名称"
                :label-width="formLabelWidth"
              >
                <el-input v-model="form.资产名称" style="width: 85%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="存放地点"
                prop="存放地点"
                :label-width="formLabelWidth"
              >
                {{ form.存放地点 }}
                <!-- <el-input
                  v-model="form.存放地点"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="归属部门"
                prop="归属部门"
                :label-width="formLabelWidth"
              >
                {{ form.归属部门 }}
                <!-- <el-input
                  v-model="form.归属部门"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="6" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="负责人"
                prop="负责人"
                :label-width="formLabelWidth"
                >{{ form.负责人 }}
                <!-- <el-input
                  v-model="form.负责人"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="使用人"
                prop="departmentwo"
                :label-width="formLabelWidth"
              >
                <el-cascader
                  v-model="form.userperpo"
                  ref="cascader"
                  :options="useroptions"
                  :props="props"
                  clearable
                  @change="UsersSelectUse"
                  style="width: 85%"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="品牌"
                prop="品牌"
                :label-width="formLabelWidth"
              >
                <el-input
                  v-model="form.品牌"
                  style="width: 85%"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="6" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="规格"
                prop="规格"
                :label-width="formLabelWidth"
              >
                <!-- <el-input
                  v-model="form.规格"
                  style="width: 85%"
                  clearable
                ></el-input> -->
                {{ form.规格 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="型号"
                prop="型号"
                :label-width="formLabelWidth"
              >
                <!-- <el-input
                  v-model="form.型号"
                  style="width: 85%"
                  clearable
                ></el-input> -->
                {{ form.型号 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="数量(个)"
                prop="数量"
                :label-width="formLabelWidth"
              >
                {{ form.数量 }}
                <!-- <el-input
                  v-model="form.数量"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="6" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="原值"
                prop="原值"
                :label-width="formLabelWidth"
                >{{ form.原值 }}
                <!-- <el-input
                  v-model="form.原值"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="净值"
                prop="净值"
                :label-width="formLabelWidth"
                >{{ form.净值 }}
                <!-- <el-input
                  v-model="form.净值"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="折旧年限"
                prop="折旧年限"
                :label-width="formLabelWidth"
                >{{ form.折旧年限 }}
                <!-- <el-input
                  v-model="form.折旧年限"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="6" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="累计折旧"
                prop="累计折旧"
                :label-width="formLabelWidth"
                >{{ form.累计折旧 }}
                <!-- <el-input
                  v-model="form.累计折旧"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="使用方向"
                prop="使用方向"
                :label-width="formLabelWidth"
              >
                <el-select
                  v-model="form.使用方向"
                  placeholder="请选择"
                  style="width: 85%"
                >
                  <el-option
                    v-for="item in syfxoptions"
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
                label="取得方式"
                prop="取得方式"
                :label-width="formLabelWidth"
                >{{ form.取得方式 }}
                <!-- <el-input
                  v-model="form.取得方式"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="6" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="取得日期"
                prop="取得日期"
                :label-width="formLabelWidth"
                >{{ form.取得日期 }}
                <!-- <el-input
                  v-model="form.取得日期"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="价值类型"
                prop="价值类型"
                :label-width="formLabelWidth"
              >
                <el-select
                  v-model="form.价值类型"
                  clearable
                  placeholder="请选择"
                  style="width: 85%"
                >
                  <el-option
                    v-for="item in jzlxoptions"
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
                label="入账日期"
                prop="入账日期"
                :label-width="formLabelWidth"
                >{{ form.入账日期 }}
                <!-- <el-input
                  v-model="form.入账日期"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="6" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="入库单号"
                prop="入库单号"
                :label-width="formLabelWidth"
              >
                <el-link type="primary" @click="ellink()">{{
                  form.入库单号
                }}</el-link>
                <!-- <el-input
                  v-model="form.入库单号"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="记账凭证号"
                prop="财务记账凭证号"
                :label-width="formLabelWidth"
                >{{ form.财务记账凭证号 }}
                <!-- <el-input
                  v-model="form.财务记账凭证号"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="验收日期"
                prop="验收时间"
                :label-width="formLabelWidth"
                >{{ form.验收时间 }}
                <!-- <el-input
                  v-model="form.验收时间"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="6" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="验收人"
                prop="验收人名称"
                :label-width="formLabelWidth"
                >{{ form.验收人名称 }}
                <!-- <el-input
                  v-model="form.验收人名称"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="供应商"
                prop="供应商"
                :label-width="formLabelWidth"
                >{{ form.供应商 }}
                <!-- <el-input
                  v-model="form.供应商"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="联系人"
                prop="联系人"
                :label-width="formLabelWidth"
                >{{ form.联系人 }}
                <!-- <el-input
                  v-model="form.联系人"
                  disabled
                  style="width: 85%"
                ></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="扩展信息" name="second">
          <el-empty description="无扩展信息" v-if="descriptions"></el-empty>
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
                    v-model="form.备注"
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
                    v-model="form.备注"
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
                    v-model="form.备注"
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
                    v-model="form.备注"
                    style="width: 94%"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="资产照片" name="third">
          <div style="width: 100%; text-align: center">
            <el-upload
              class="avatar-uploader"
              action="http://82.156.97.125:8082/filehandle/flie_insert"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
                style="font-size: 50px"
              ></i>
            </el-upload>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="opendisplay">返 回</el-button>
      <el-button
        type="primary"
        size="medium"
        class="el-icon-collection-tag"
        @click="submit"
        >保 存</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { get_categoryalldata } from "@/api/categoryhandle";
import { up_atfile } from "@/api/filehandle";
import {
  get_schoolresponseperson,
  up_accountleadger
} from "@/api/assetaccounthandle";
import UsercarseUse from "@/bitcomponents/Usercarse"; // 负责人
export default {
  components: { UsercarseUse },
  data() {
    return {
      title: "",
      dialogVisible: false,
      activeName: "first",
      form: {},
      rules: {},
      labelPosition: "left",
      formLabelWidth: "110px",
      defaultProps: {
        children: "children",
        label: "分类名称",
        value: "id"
      },
      // 价值类型
      jzlxoptions: [
        {
          value: "原值",
          label: "原值"
        },
        {
          value: "评估值",
          label: "评估值"
        },
        {
          value: "暂估值",
          label: "暂估值"
        },
        {
          value: "重置值",
          label: "重置值"
        },
        {
          value: "无价值",
          label: "无价值"
        },
        {
          value: "名义金额",
          label: "名义金额"
        }
      ],
      // 使用方向
      syfxoptions: [
        {
          label: "教学",
          value: "教学"
        },
        {
          label: "科研",
          value: "科研"
        },
        {
          label: "行政",
          value: "行政"
        },
        {
          label: "其他",
          value: "其他"
        }
      ],
      useroptions: [], //使用人
      props: {
        children: "children2",
        label: "name",
        value: "id",
        checkStrictly: false //是否可以选择任意一级
      },
      disabled: true,
      showAllLevels: true, //资产类别是否显示全部
      AssetClassesvalue: [],
      AssetClassesoptions: [], //资产类别
      descriptions: true, //扩展隐藏
      carif: true, //车辆隐藏
      Cultural: true, //文物
      land: true, //土地
      fangwu: true, //房屋
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
      ],
      imageUrl: ""
    };
  },
  methods: {
    ellink() {
      this.$router.push({ path: "/Purchase/index" });
    },
    // 保存
    submit() {
      // console.log(this.form);
      // console.log(this.AssetClassesvalue);
      // return;
      var data = {
        资产ID: this.form.资产Id,
        名称: this.form.资产名称,
        品牌: this.form.品牌,
        型号: this.form.规格型号,
        使用方向: this.form.使用方向,
        价值类型: this.form.价值类型,
        一级类别名称: this.form.一级类别名称,
        二级类别名称: this.form.二级分类名称,
        使用人Id: this.form.使用人Id,
        车架号: this.form.车架号 || "",
        车牌号: this.form.车牌号 || "",
        车辆产地: this.form.车辆产地 || "",
        车辆用途: this.form.车辆用途 || "",
        生产厂家: this.form.生产厂家 || "",
        发动机号: this.form.发动机号 || "",
        排气量: this.form.排气量 || "",

        //土地
        坐标位置: this.form.坐标位置,
        丘号: this.form.丘号,
        权属证号: this.form.权属证号,
        发证日期: this.form.发证日期,
        权属性质: this.form.权属性质,
        土地来源: this.form.土地来源,
        证载面积: this.form.证载面积,
        在用面积: this.form.在用面积,
        出租出借面积: this.form.出租出借面积,
        毁损待报废面积: this.form.毁损待报废面积,
        对外投资面积: this.form.对外投资面积,
        担保面积: this.form.担保面积,
        闲置面积: this.form.闲置面积,
        其他面积: this.form.其他面积,
        // 房屋
        坐落位置: this.form.坐落位置,
        建筑结构: this.form.建筑结构,
        施工单位: this.form.施工单位,
        权属证号: this.form.权属证号,
        证载面积: this.form.证载面积,
        建筑面积: this.form.建筑面积,
        在用面积: this.form.在用面积,
        出租出借面积: this.form.出租出借面积,
        对外投资面积: this.form.对外投资面积,
        其他面积: this.form.其他面积,
        栋号: this.form.栋号,
        楼层数: this.form.楼层数,
        竣工日期: this.form.竣工日期,
        发证日期: this.form.发证日期,
        占地面积: this.form.占地面积,
        使用面积: this.form.使用面积,
        闲置面积: this.form.闲置面积,
        毁损待报废面积: this.form.毁损待报废面积,
        担保面积: this.form.担保面积,
        // 文物
        文物等级: this.form.文物等级,
        落成年代: this.form.落成年代,
        来源地: this.form.来源地,
        备注: this.form.备注
      };

      if (
        this.form.userperpo[1] == undefined ||
        this.form.userperpo[1] == null
      ) {
        data.userId = 0;
      }
      if (this.AssetClassesvalue.length == 4) {
        data.一级类别ID = this.AssetClassesvalue[0];
        data.二级类别ID = this.AssetClassesvalue[1];
        data.三级类别ID = this.AssetClassesvalue[2];
        data.四级类别ID = this.AssetClassesvalue[3];
      }
      if (this.AssetClassesvalue.length == 3) {
        data.一级类别ID = this.AssetClassesvalue[0];
        data.二级类别ID = this.AssetClassesvalue[1];
        data.三级类别ID = this.AssetClassesvalue[2];
        data.四级类别ID = 0;
      }
      if (this.AssetClassesvalue.length == 2) {
        data.一级类别ID = this.AssetClassesvalue[0];
        data.二级类别ID = this.AssetClassesvalue[1];
        data.三级类别ID = 0;
        data.四级类别ID = 0;
      }
      if (this.AssetClassesvalue.length == 1) {
        data.一级类别ID = this.AssetClassesvalue[0];
        data.二级类别ID = 0;
        data.三级类别ID = 0;
        data.四级类别ID = 0;
      }
      if (this.AssetClassesvalue.length == 0) {
        this.msg("警告", "请选择分类!");
        return;
      }
      // console.log(data);
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      // return;
      up_accountleadger(data).then(res => {
        if (res.code == 100) {
          this.alter_box(res.code, "修改成功");
          loading.close();
          this.$emit("close");
          this.dialogVisible = false;
        }
      });
    },
    onload2() {
      var data = {
        departmentone: this.$store.getters.id_一级部门,
        departmentwo: this.$store.getters.id_二级部门
      };
      get_schoolresponseperson(data).then(res => {
        this.useroptions = res.data; //使用人
      });
    },
    onload(row) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.form = row;
      this.get_categoryalldata(); //初始化类别
      this.setAsset(); //设置类别绑定
      this.onload2(); //设置类别绑定
      // console.log(row);
      // console.log([
      //   row.一级类别ID,
      //   row.二级类别ID,
      //   row.三级类别ID,
      //   row.四级类别ID
      // ]);
      this.AssetClassesvalue = [
        row.一级类别ID,
        row.二级类别ID,
        row.三级类别ID,
        row.四级类别ID
      ];
      if (row.四级类别ID == 0) {
        this.AssetClassesvalue = [
          row.一级类别ID,
          row.二级类别ID,
          row.三级类别ID
        ];
      }
      if (row.三级类别ID == 0) {
        this.AssetClassesvalue = [row.一级类别ID, row.二级类别ID];
      }
      if (row.二级类别ID == 0) {
        this.AssetClassesvalue = [row.一级类别ID];
      }
      if (row.二级类别ID == 0) {
        this.AssetClassesvalue = "";
      }
      if (row.使用人Id != 0) {
        this.form.userperpo = [row.使用人一级机构, row.使用人Id];
      } else {
      }
      this.imageUrl = this.form.照片服务器路径;
      // console.log("this.AssetClassesvalue", this.AssetClassesvalue);
      this.title = "卡片——" + row.资产名称;
      var that = this;
      setTimeout(function() {
        loading.close();
        that.dialogVisible = true;
      }, 600);
    },
    // 使用人选择
    UsersSelectUse(val) {
      // console.log(val);
      this.form.使用人Id = val[1];
    },
    //上传前验证
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 20MB!");
      }
      //文件名转码
      var suffix = file.name;
      var key = encodeURI(`${suffix}`);
      // console.log(key);
      return isLt2M;
    },
    //上传成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.url; //文件具体信息
      this.assetimageid = res.code; //图片ID
      var data = {
        id_file: res.code,
        id_at: this.form.资产Id
      };
      up_atfile(data).then(ress => {
        if (ress.code >= 0) {
          // console.log("res", ress);

          // console.log(this.imageUrl);
          this.msg("成功", "上传成功!");
        }
      });
    },
    // 返回
    opendisplay() {
      this.dialogVisible = false;
    },
    // 类别初始化
    get_categoryalldata() {
      get_categoryalldata().then(res => {
        this.AssetClassesoptions = res.data;
      });
    },
    setAsset() {
      if (this.form.二级类别ID != 0) {
        this.AssetClassesvalue = [this.form.一级类别ID, this.form.二级类别ID];
      } else if (this.form.三级类别ID != 0) {
        this.AssetClassesvalue = [
          this.form.一级类别ID,
          this.form.二级类别ID,
          this.form.三级类别ID
        ];
      } else if (this.form.四级类别ID != 0) {
        this.AssetClassesvalue = [
          this.form.一级类别ID,
          this.form.二级类别ID,
          this.form.三级类别ID,
          this.form.四级类别ID
        ];
      } else {
        this.AssetClassesvalue = [this.form.一级类别ID];
      }
      // console.log(this.AssetClassesvalue);
    },
    // 资产类别选择
    AssetClasseschange(val) {
      // console.log(val);
      this.form.资产类别选择 = val;
    },
    // 关闭之前调用
    handleClose(val) {
      // console.log(val);
      this.form = {};
      this.disabled = true;
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
