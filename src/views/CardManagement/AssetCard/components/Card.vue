<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="70%"
    center
    append-to-body
    :close-on-click-modal="false"
    :before-close="handleClose"
    ><el-form
      ref="form"
      :model="form"
      label-width="140px"
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
              >
                {{ form.资产状态 }}
              </el-form-item>
            </el-col>
            <el-tooltip :content="form.所属分类" placement="top" effect="light">
              <el-col :span="8">
                <el-form-item
                  label="资产分类"
                  prop="资产分类"
                  :label-width="formLabelWidth"
                >
                  {{ form.所属分类 }}
                </el-form-item>
              </el-col>
            </el-tooltip>
          </el-row>
          <el-row :gutter="6" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="资产名称"
                prop="资产名称"
                :label-width="formLabelWidth"
                >{{ form.资产名称 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="存放地点"
                prop="存放地点"
                :label-width="formLabelWidth"
                >{{ form.存放地点 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="归属部门"
                prop="归属部门"
                :label-width="formLabelWidth"
                >{{ form.所属部门 }}
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
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="使用人"
                prop="使用人"
                :label-width="formLabelWidth"
                >{{ form.使用人 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="品牌"
                prop="品牌"
                :label-width="formLabelWidth"
              >
                {{ form.品牌 }}
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
                {{ form.规格 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="型号"
                prop="型号"
                :label-width="formLabelWidth"
              >
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
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="6" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="原值"
                prop="原值"
                :label-width="formLabelWidth"
              >
                {{ form.原值 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="净值"
                prop="净值"
                :label-width="formLabelWidth"
              >
                {{ form.净值 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="折旧年限"
                prop="折旧年限"
                :label-width="formLabelWidth"
                >{{ form.折旧年限 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="6" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="累计折旧"
                prop="累计折旧"
                :label-width="formLabelWidth"
              >
                {{ form.累计折旧 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="使用方向"
                prop="使用方向"
                :label-width="formLabelWidth"
                >{{ form.使用方向 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="取得方式"
                prop="取得方式"
                :label-width="formLabelWidth"
                >{{ form.取得方式 }}
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
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="价值类型"
                prop="价值类型"
                :label-width="formLabelWidth"
              >
                {{ form.价值类型 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="入账日期"
                prop="入账日期"
                :label-width="formLabelWidth"
              >
                {{ form.入账日期 }}
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
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="记账凭证号"
                prop="财务记账凭证号"
                :label-width="formLabelWidth"
              >
                {{ form.财务记账凭证号 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="验收日期"
                prop="验收时间"
                :label-width="formLabelWidth"
              >
                {{ form.验收时间 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="6" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="验收人"
                prop="验收人名称"
                :label-width="formLabelWidth"
              >
                {{ form.验收人名称 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="供应商"
                prop="供应商"
                :label-width="formLabelWidth"
              >
                {{ form.供应商 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="联系人"
                prop="联系人"
                :label-width="formLabelWidth"
              >
                {{ form.联系人 }}
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
                  {{ form.车架号 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="车牌号"
                  prop="车牌号"
                  :label-width="formLabelWidth"
                >
                  {{ form.车牌号 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="车辆产地"
                  prop="车辆产地"
                  :label-width="formLabelWidth"
                >
                  {{ form.车辆产地 }}
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
                  {{ form.车辆用途 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="生产厂家"
                  prop="生产厂家"
                  :label-width="formLabelWidth"
                >
                  {{ form.生产厂家 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="发动机号"
                  prop="发动机号"
                  :label-width="formLabelWidth"
                >
                  {{ form.发动机号 }}
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
                  {{ form.排气量 }}
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item
                  label="备注"
                  prop="备注"
                  :label-width="formLabelWidth"
                >
                  {{ form.备注 }}
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
                  {{ form.文物等级 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="落成年代"
                  prop="落成年代"
                  :label-width="formLabelWidth"
                >
                  {{ form.落成年代 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="来源地"
                  prop="来源地"
                  :label-width="formLabelWidth"
                >
                  {{ form.来源地 }}
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
                  {{ form.备注 }}
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
                  {{ form.坐标位置 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="丘号"
                  prop="丘号"
                  :label-width="formLabelWidth"
                >
                  {{ form.丘号 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="权属证号"
                  prop="权属证号"
                  :label-width="formLabelWidth"
                >
                  {{ form.权属证号 }}
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
                  {{ form.土地来源 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="发证日期"
                  prop="发证日期"
                  :label-width="formLabelWidth"
                >
                  {{ form.发证日期 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="权属性质"
                  prop="权属性质"
                  :label-width="formLabelWidth"
                >
                  {{ form.权属性质 }}
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
                  {{ form.证载面积 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="在用面积"
                  prop="在用面积"
                  :label-width="formLabelWidth"
                >
                  {{ form.在用面积 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="出租出借面积"
                  prop="出租出借面积"
                  :label-width="formLabelWidth"
                >
                  {{ form.出租出借面积 }}
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
                  {{ form.毁损待报废面积 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="对外投资面积"
                  prop="对外投资面积"
                  :label-width="formLabelWidth"
                >
                  {{ form.对外投资面积 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="担保面积"
                  prop="担保面积"
                  :label-width="formLabelWidth"
                >
                  {{ form.担保面积 }}
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
                  {{ form.闲置面积 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="其他面积"
                  prop="其他面积"
                  :label-width="formLabelWidth"
                >
                  {{ form.其他面积 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="备注"
                  prop="备注"
                  :label-width="formLabelWidth"
                >
                  {{ form.备注 }}
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
                  {{ form.坐落位置 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="建筑结构"
                  prop="建筑结构"
                  :label-width="formLabelWidth"
                >
                  {{ form.建筑结构 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="施工单位"
                  prop="施工单位"
                  :label-width="formLabelWidth"
                >
                  {{ form.施工单位 }}
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
                  {{ form.权属证号 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="证载面积"
                  prop="证载面积"
                  :label-width="formLabelWidth"
                >
                  {{ form.证载面积 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="建筑面积"
                  prop="建筑面积"
                  :label-width="formLabelWidth"
                >
                  {{ form.建筑面积 }}
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
                  {{ form.在用面积 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="出租出借面积"
                  prop="出租出借面积"
                  :label-width="formLabelWidth"
                >
                  {{ form.出租出借面积 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="对外投资面积"
                  prop="对外投资面积"
                  :label-width="formLabelWidth"
                >
                  {{ form.对外投资面积 }}
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
                  {{ form.其他面积 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="栋号"
                  prop="栋号"
                  :label-width="formLabelWidth"
                >
                  {{ form.栋号 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="楼层数"
                  prop="楼层数"
                  :label-width="formLabelWidth"
                >
                  {{ form.楼层数 }}
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
                  {{ form.竣工日期 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="发证日期"
                  prop="发证日期"
                  :label-width="formLabelWidth"
                >
                  {{ form.发证日期 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="占地面积"
                  prop="占地面积"
                  :label-width="formLabelWidth"
                >
                  {{ form.占地面积 }}
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
                  {{ form.使用面积 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="闲置面积"
                  prop="闲置面积"
                  :label-width="formLabelWidth"
                >
                  {{ form.闲置面积 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="毁损待报废面积"
                  prop="毁损待报废面积"
                  :label-width="formLabelWidth"
                >
                  {{ form.毁损待报废面积 }}
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
                  {{ form.担保面积 }}
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item
                  label="备注"
                  prop="备注"
                  :label-width="formLabelWidth"
                >
                  {{ form.备注 }}
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="资产照片" name="third">
          <div style="width: 100%; text-align: center">
            <el-image style="" :src="form.照片服务器路径" :fit="fits">
              <!-- <div slot="error">暂无照片</div> -->
              <el-empty slot="error" description="暂无照片"></el-empty>
            </el-image>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button @click="opendisplay">编 辑</el-button> -->
      <el-button
        type="primary"
        v-show="isShowUpdateBtn"
        size="medium"
        @click="goRevise()"
        >修 改</el-button
      >
    </div>
    <Revise ref="Revise" @close="close" />
  </el-dialog>
</template>

<script>
import Revise from "./Revise.vue";
import { get_categoryalldata } from "@/api/categoryhandle";
export default {
  components: { Revise },
  data() {
    return {
      fits: "scale-down",
      url: "",
      title: "",
      dialogVisible: false,
      isShowUpdateBtn: true,
      activeName: "first",
      form: {},
      rules: {},
      labelPosition: "left",
      formLabelWidth: "140px",
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
      disabled: true,
      showAllLevels: true, //资产类别是否显示全部
      AssetClassesvalue: [],
      AssetClassesoptions: [], //资产类别
      descriptions: true, //扩展隐藏
      carif: true, //车辆隐藏
      Cultural: true, //文物
      land: true, //土地
      fangwu: true //房屋
    };
  },
  methods: {
    ellink() {
      this.$router.push({ path: "/Purchase/index" });
    },
    onload(row) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      row.一级类别名称 = row.所属分类;
      if (row.存放地点 === null || row.存放地点 === undefined) {
        row.存放地点 = "";
      }
      if (row.建筑名称 === null || row.建筑名称 === undefined) {
        row.建筑名称 = "";
      }
      if (row.所属分类 === null || row.所属分类 === undefined) {
        row.所属分类 = "";
      }
      if (row.二级分类名称 === null || row.二级分类名称 === undefined) {
        row.二级分类名称 = "";
      }
      if (row.三级分类名称 === null || row.三级分类名称 === undefined) {
        row.三级分类名称 = "";
      }
      if (row.四级分类名称 === null || row.四级分类名称 === undefined) {
        row.四级分类名称 = "";
      }
      if (row.存放地点 === "" && row.建筑名称 != "") {
        row.存放地点 = row.建筑名称;
      } else if (row.存放地点 != "" && row.建筑名称 != "") {
        row.存放地点 = row.建筑名称 + "/" + row.存放地点;
      }
      if (
        row.四级分类名称 === "" &&
        row.三级分类名称 != "" &&
        row.二级分类名称 != "" &&
        row.所属分类 != ""
      ) {
        row.所属分类 =
          row.所属分类 + "/" + row.二级分类名称 + "/" + row.三级分类名称;
      } else if (
        row.三级分类名称 === "" &&
        row.二级分类名称 != "" &&
        row.所属分类 != ""
      ) {
        row.所属分类 = row.所属分类 + "/" + row.二级分类名称;
      } else if (row.二级分类名称 === "" && row.所属分类 != "") {
        row.所属分类 = row.所属分类;
      } else if (
        row.四级分类名称 != "" &&
        row.三级分类名称 != "" &&
        row.二级分类名称 != "" &&
        row.所属分类 != ""
      ) {
        row.所属分类 =
          row.所属分类 +
          "/" +
          row.二级分类名称 +
          "/" +
          row.三级分类名称 +
          "/" +
          row.四级分类名称;
      }
      this.form = row;
      this.get_categoryalldata(); //初始化类别
      this.setAsset(); //设置类别绑定
      // console.log("卡片", row);

      this.title = "资产卡片";
      var that = this;
      setTimeout(function() {
        loading.close();
        that.dialogVisible = true;
      }, 600);
    },
    // 打开修改界面
    goRevise() {
      this.$refs.Revise.form = this.form;
      // console.log("this.form", this.form);
      if (this.form.二级分类名称 == "车辆") {
        // description

        this.$refs.Revise.descriptions = false;
        this.$refs.Revise.carif = true; //车辆
        this.$refs.Revise.Cultural = false; //文物
        this.$refs.Revise.land = false; //土地
        this.$refs.Revise.fangwu = false; //房屋
      } else if (this.form.二级分类名称 == "文物") {
        this.$refs.Revise.descriptions = false;
        this.$refs.Revise.carif = false; //车辆
        this.$refs.Revise.Cultural = true; //文物
        this.$refs.Revise.land = false; //土地
        this.$refs.Revise.fangwu = false; //房屋
      } else if (this.form.二级分类名称 == "土地、海域及无居民海岛") {
        this.$refs.Revise.descriptions = false;
        this.$refs.Revise.carif = false; //车辆
        this.$refs.Revise.Cultural = false; //文物
        this.$refs.Revise.land = true; //土地
        this.$refs.Revise.fangwu = false; //房屋
      } else if (
        this.form.二级分类名称 == "房屋" ||
        this.form.二级分类名称 == "构筑物"
      ) {
        this.$refs.Revise.descriptions = false;
        this.$refs.Revise.carif = false; //车辆
        this.$refs.Revise.Cultural = false; //文物
        this.$refs.Revise.land = false; //土地
        this.$refs.Revise.fangwu = true; //房屋
      } else {
        this.$refs.Revise.descriptions = true;
        this.$refs.Revise.carif = false; //车辆
        this.$refs.Revise.Cultural = false; //文物
        this.$refs.Revise.land = false; //土地
        this.$refs.Revise.fangwu = false; //房屋
      }
      this.$refs.Revise.activeName = "first";
      this.$refs.Revise.onload(this.form);
      this.$refs.Revise.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
      this.$emit("onload");
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
    },
    // 关闭之前调用
    handleClose(val) {
      // console.log(val);
      this.disabled = true;
      this.dialogVisible = false;
    }
  }
};
</script>

<style></style>
