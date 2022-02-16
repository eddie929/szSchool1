<template>
  <el-dialog
    :title="titleDialog"
    :visible.sync="dialogVisible"
    width="80%"
    center
    top="10vh"
    :close-on-click-modal="false"
  >
    <el-form ref="ruleForm" :label-position="labelPosition" :model="form">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="处置单" name="first">
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item
                label="流程状态"
                :label-width="formLabelWidth"
                prop="流程状态"
              >
                {{ form.流程状态 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="报修单号"
                :label-width="formLabelWidth"
                prop="单据编号"
              >
                {{ form.单据编号 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="报修日期"
                :label-width="formLabelWidth"
                prop="报修日期"
              >
                {{ form.报修时间 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="报修人"
                :label-width="formLabelWidth"
                prop="报修人"
              >
                {{ form.报修人名称 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="报修人电话"
                :label-width="formLabelWidth"
                prop="报修人电话"
              >
                {{ form.报修人电话 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="报修地址"
                :label-width="formLabelWidth"
                prop="报修地址"
              >
                {{ form.报修地址 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-top: 1%">
            <el-col :span="16">
              <el-form-item
                label="故障描述"
                :label-width="formLabelWidth"
                prop="故障描述"
              >
                {{ form.故障描述 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="故障照片"
                label-width="200px"
                prop="故障照片"
                style="margin-left:16px"
              >
                <img
                  v-if="form.url"
                  :src="form.url"
                  class="avatar"
                  fit="contain"
                  style="width: 200px; height: 150px"
                />
              </el-form-item>
              <!-- <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
            style="font-size: 50px"
          ></i> -->
            </el-col>
          </el-row>

          <el-table
            ref="table"
            v-loading="loading"
            :data="tableData"
            border
            stripe
            :header-cell-style="{
              'text-align': 'center',
              background: '#eef1f6'
            }"
            style="width: 100%; margin-top: 1%"
            max-height="450px"
          >
            <el-table-column
              label="序号"
              type="index"
              width="50"
              :reserve-selection="true"
            ></el-table-column>

            <el-table-column prop="资产Id" label="资产Id" v-if="false">
            </el-table-column>
            <el-table-column
              prop="资产编号"
              label="资产编号"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="所属分类"
              label="资产分类"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span
                  >{{ scope.row.一级分类名称 }}/{{ scope.row.二级分类名称 }}/{{
                    scope.row.三级分类名称
                  }}/{{ scope.row.四级分类名称 }}</span
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="资产名称"
              label="资产名称"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="规格"
              label="规格"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="型号"
              label="型号"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column prop="使用方向" label="使用方向">
            </el-table-column>
            <el-table-column prop="数量" label="数量(个)"> </el-table-column>
            <el-table-column prop="保留原值" label="原值"> </el-table-column>
            <el-table-column prop="保留净值" label="净值"> </el-table-column>
            <el-table-column
              prop="存放地点"
              label="存放地点"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="所属部门"
              label="归属部门"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column prop="负责人" label="负责人"> </el-table-column>
            <el-table-column prop="使用人" label="使用人"> </el-table-column>
            <el-table-column
              prop="购置日期"
              label="取得日期"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column prop="资产状态" label="资产状态">
            </el-table-column>

            <el-table-column prop="是否到期" label="是否到期">
              <template slot-scope="scope">
                <span>{{ maturity(scope.row) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="流程" name="second">
          <el-row :gutter="24" style="margin-top:20px">
            <el-col :span="24">
              <el-steps :active="active">
                <el-step
                  v-for="item in FlowList"
                  :title="item.title"
                  :key="item.id"
                ></el-step>
              </el-steps>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <el-popconfirm
        title="再次确认派单"
        @confirm="btnok(1)"
        style="margin-right: 20px"
      >
        <el-button type="primary" class="el-icon-check" slot="reference">
          派 单</el-button
        >
      </el-popconfirm>
      <el-popconfirm
        title="再次确认退回"
        @confirm="btnok(-2)"
        style="margin-right: 20px"
      >
        <el-button class="el-icon-close" slot="reference">退 回</el-button>
      </el-popconfirm>
    </div>
    <Peos ref="Peos" @end="end" />
  </el-dialog>
</template>

<script>
import { get_flowdata } from "@/api/filehandle";
import {
  get_purchaseacceptancelistdetail,
  purchaseacceptancelist_finaleapprovals
} from "@/api/assetarepairhandle";
import Peos from "./peos.vue";
export default {
  components: { Peos },
  data() {
    return {
      active: 0,
      FlowList: [],
      activeName: "first",
      dialogVisible: false,
      labelPosition: "left",
      formLabelWidth: "120px",
      form: {},
      loading: false,
      tableData: [],
      titleDialog: "",
      options: [], //报修地址
      imageUrl: ""
    };
  },
  methods: {
    handleClick(tab, event) {},
    end() {
      this.$emit("end");
      this.dialogVisible = false;
    },
    btnok(str) {
      // console.log("派单");
      if (str == 1) {
        this.$refs.Peos.onload();
        this.$refs.Peos.form = this.form;
        this.$refs.Peos.dialogVisible = true;
      } else {
        this.form.流程代码 = -1;
        this.form.维修单ID = this.form.id;
        purchaseacceptancelist_finaleapprovals(this.form).then(res => {
          this.get_box(res.code, "退回成功!");
          this.dialogVisible = false;
          this.$emit("end");
        });
      }
    },
    // 判断是否到期
    maturity(row) {
      // console.log("是否到期:", row.是否到期);
      if (row.是否到期 == 1) {
        return "否";
      } else {
        return "是";
      }
    },
    onload() {
      get_purchaseacceptancelistdetail({ 维修单ID: this.form.id }).then(res => {
        this.tableData = res.data;
      });
      setTimeout(() => {
        get_flowdata({ flowId: this.form.id, flowname: "资产报修" }).then(
          res => {
            this.FlowList = res.data;
            this.active = res.values;
          }
        );
      }, 500);
    }
  }
};
</script>

<style></style>
