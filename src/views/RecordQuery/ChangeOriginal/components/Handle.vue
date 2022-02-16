<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="80%"
    center
    top="7vh"
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
            label="申请人"
            :label-width="formLabelWidth"
            prop="remark"
          >
            {{ form.申请人 }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="申请日期"
            :label-width="formLabelWidth"
            prop="remark"
          >
            {{ form.申请日期 }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="margin-top: 1%">
        <el-col :span="8">
          <el-form-item
            label="变动方式"
            :label-width="formLabelWidth"
            prop="remark"
          >
            {{ form.变动方式 }}
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item
            label="变动原因"
            :label-width="formLabelWidth"
            prop="remark"
          >
            {{ form.变动原因 }}
          </el-form-item>
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
        max-height="400px"
        :cell-style="yellowBg"
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
        <el-table-column prop="数量" label="数量(个)"> </el-table-column>
        <el-table-column
          prop="原值"
          label="变动前原值"
          width="200"
          align="right"
        >
        </el-table-column>
        <el-table-column
          prop="变动金额"
          label="变动金额"
          width="200"
          align="right"
        >
          <!-- <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.变动金额"
              :precision="2"
              disabled
              style="width: 100%"              
            ></el-input-number>
          </template> -->
        </el-table-column>
        <el-table-column prop="变动后原值" label="变动后原值" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.变动后原值 }}</span>
          </template>
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
      </el-table>
      <el-form-item
        label="处理意见"
        :label-width="formLabelWidth"
        prop="remark"
        style="margin-top: 1%"
      >
        {{ form.处理意见 }}
      </el-form-item>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    ></div>
  </el-dialog>
</template>

<script>
import {
  get_originaldatalbyId,
  originaldata_finaleapproval
} from "@/api/originalchangehandle";
export default {
  data() {
    return {
      dialogTitle: "原值变动单",
      dialogVisible: false,
      labelPosition: "left",
      formLabelWidth: "100px",
      form: {},
      tableData: [],
      loading: false
    };
  },
  methods: {
    // 判断是否到期
    maturity(row) {
      // console.log("是否到期:", row.是否到期);
      if (row.是否到期 == 1) {
        return "否";
      } else {
        return "是";
      }
    },
    gettable(val) {
      this.loading = true;
      get_originaldatalbyId({ id: val }).then(res => {
        this.tableData = res.data;
        this.loading = false;
      });
    },
    yellowBg({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 9) {
        return {
          background: "#8cc5ff"
        };
      }
    }
  }
};
</script>

<style></style>
