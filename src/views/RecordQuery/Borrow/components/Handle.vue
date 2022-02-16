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
            label="借用人"
            :label-width="formLabelWidth"
            prop="remark"
          >
            {{ form.借用人 }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="申请时间"
            :label-width="formLabelWidth"
            prop="remark"
          >
            {{ form.提交时间 }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="margin-top: 1%">
        <el-col :span="8">
          <el-form-item
            label="预计归还时间"
            :label-width="formLabelWidth"
            prop="remark"
          >
            {{ form.预计归还时间 }}
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item
            label="借出人"
            :label-width="formLabelWidth"
            prop="remark"
            >{{ form.借出人 }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="借用时间"
            :label-width="formLabelWidth"
            prop="remark"
          >
            {{ form.借用时间 }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="margin-top: 1%">
        <el-col :span="24">
          <el-form-item
            label="备注信息"
            :label-width="formLabelWidth"
            prop="remark"
          >
            {{ form.备注信息 }}
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
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <!-- <el-button type="primary" class="el-icon-check" @click="btnok(oktext)">{{
        oktext
      }}</el-button>
      <el-button class="el-icon-close" @click="dialogVisible = false"
        >取消</el-button
      > -->
    </div>
  </el-dialog>
</template>

<script>
import {
  get_assetlendingdatabyId,
  assetlendingdata_finaleapproval,
  assetlendingdata_Isnotfinaleapproval,
  assetlendingdata_borrowIsnotfinaleapproval
} from "@/api/assetlendinghandle";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogTitle: "资产借还单",
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
    //   提交
    btnok(str) {
      // console.log(this.form);
      //   return;
      this.form.executive_name = this.form.借出人;
      this.form.borrowId = this.form.借用人Id;
      if (str == "同意") {
        this.form.sort = 1;
        this.form.executive_agreenot = "同意";
        this.assetlendingdata_finaleapproval();
      } else if (str == "拒绝") {
        this.form.sort = -1;
        this.form.executive_agreenot = "拒绝";
        this.assetlendingdata_finaleapproval();
      } else if (str == "归还") {
        this.assetlendingdata_Isnotfinaleapproval();
      } else if (str == "确认归还") {
        this.assetlendingdata_borrowIsnotfinaleapproval();
      } else {
        this.dialogVisible = false;
      }
    },
    // 第一步 是否同意
    assetlendingdata_finaleapproval() {
      assetlendingdata_finaleapproval(this.form).then(res => {
        this.$emit("onload");
        this.get_box(res.code, "处理成功!");
        this.dialogVisible = false;
      });
    },
    // 第二部归还
    assetlendingdata_Isnotfinaleapproval() {
      this.form.borrowerid = this.form.借出人Id;
      assetlendingdata_Isnotfinaleapproval(this.form).then(res => {
        this.$emit("onload");
        this.get_box(res.code, "归还成功!");
        this.dialogVisible = false;
      });
    },
    // 第三部 确认归还
    assetlendingdata_borrowIsnotfinaleapproval() {
      assetlendingdata_borrowIsnotfinaleapproval(this.form).then(res => {
        this.$emit("onload");
        this.get_box(res.code, "确认归还成功!");
        this.dialogVisible = false;
      });
    },
    onload() {
      // console.log(this.form);
      var data = {
        id: this.form.id
      };
      this.loading = true;
      get_assetlendingdatabyId(data).then(res => {
        this.tableData = res.data;
        // console.log(this.tableData);
        this.loading = false;
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
