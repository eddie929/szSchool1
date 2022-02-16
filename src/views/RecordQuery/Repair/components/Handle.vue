<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="75%"
    center
    :close-on-click-modal="false"
  >
    <el-form ref="ruleForm" :label-position="labelPosition" :model="form">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item
            label="流程状态"
            :label-width="formLabelWidth"
            prop="remark"
          >
            {{ form.流程状态 }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="报修日期"
            :label-width="formLabelWidth"
            prop="remark"
          >
            {{ form.报修时间 }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="报修人"
            :label-width="formLabelWidth"
            prop="remark"
          >
            {{ form.报修人名称 }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="margin-top: 1%">
        <el-col :span="16">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                label="报修人电话"
                :label-width="formLabelWidth"
                prop="remark"
              >
                {{ form.报修人电话 }}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="报修地址"
                :label-width="formLabelWidth"
                prop="remark"
              >
                {{ form.报修地址 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-top: 1%">
            <el-col :span="24">
              <el-form-item
                label="故障描述"
                :label-width="formLabelWidth"
                prop="remark"
              >
                {{ form.故障描述 }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="故障照片"
            :label-width="formLabelWidth"
            prop="remark"
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
        :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
        style="width: 100%; margin-top: 1%"
        max-height="300px"
        height="300px"
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
        <el-table-column prop="使用方向" label="使用方向"> </el-table-column>
        <el-table-column prop="数量" label="数量(个)" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="原值"
          label="原值"
          align="right"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="净值" label="净值" align="right">
        </el-table-column>
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
        <el-table-column prop="资产状态" label="资产状态"> </el-table-column>

        <el-table-column prop="是否到期" label="是否到期">
          <template slot-scope="scope">
            <span>{{ maturity(scope.row) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="二级机构名称"
          label="学校名称"
          :show-overflow-tooltip="true"
        >
        </el-table-column> -->
      </el-table>
      <el-row style="margin-top: 1%" :gutter="24" v-if="hiden">
        <el-col :span="8">
          <el-form-item
            label="维修结果"
            prop="维修结果"
            :label-width="formLabelWidth"
          >
            {{ form.维修结果 }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="反馈时间"
            prop="反馈时间"
            :label-width="formLabelWidth"
          >
            {{ form.反馈时间 }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="问题说明"
            prop="问题说明"
            :label-width="formLabelWidth"
          >
            {{ form.问题说明 }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <el-button type="primary" class="el-icon-check" @click="btnok(oktext)">{{
        oktext
      }}</el-button>
      <el-button class="el-icon-close" @click="dialogVisible = false"
        >取消</el-button
      >
    </div> -->
  </el-dialog>
</template>

<script>
import { get_purchaseacceptancelistdetail } from "@/api/assetarepairhandle";
export default {
  data() {
    return {
      hiden: false,
      dialogVisible: false,
      dialogTitle: "资产报修单",
      tableData: [],
      form: {
        流程状态: "已提交"
      },
      labelPosition: "left",
      formLabelWidth: "100px",
      loading: false,
      oktext: "",
      notext: ""
    };
  },
  methods: {
    onload() {
      get_purchaseacceptancelistdetail({ 维修单ID: this.form.id }).then(res => {
        this.tableData = res.data;
      });
    },
    maturity(row) {
      // console.log("是否到期:", row.是否到期);
      if (row.是否到期 == 1) {
        return "否";
      } else {
        return "是";
      }
    }
  }
};
</script>

<style></style>
