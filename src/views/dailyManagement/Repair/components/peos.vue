<template>
  <el-dialog
    :title="titleDialog"
    :visible.sync="dialogVisible"
    width="60%"
    center
    top="18vh"
    :close-on-click-modal="false"
    append-to-body
  >
    <el-table
      :data="tableData"
      ref="DataTable"
      style="width: 100%; margin-top: 1%"
      v-loading="loading"
      :highlight-current-row="true"
      border
      stripe
      max-height="450px"
      :fit="true"
      :header-cell-style="{
        'text-align': 'center',
        background: '#eef1f6',
      }"
      :cell-style="{ 'text-align': 'center' }"
      :row-key="getRowKeys"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true">
      </el-table-column>
      <el-table-column
        label="序号"
        type="index"
        width="50"
        :reserve-selection="true"
      ></el-table-column>
      <el-table-column
        label="id"
        width="50"
        prop="id"
        v-if="false"
      ></el-table-column>
      <el-table-column label="姓名" prop="user_name"></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
    </el-table>
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
      <el-button class="el-icon-close" @click="dialogVisible = false">
        取 消</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import {
  get_assetsrepairpeople,
  purchaseacceptancelist_finaleapprovals,
} from "@/api/assetarepairhandle";
import {
  create_purchaseacceptance,
  create_purchaseacceptancedetail,
} from "@/api/assetarepairhandle";
export default {
  data() {
    return {
      titleDialog: "请选择维修工",
      dialogVisible: false,
      tableData: [],
      loading: false,
      form: {},
      tableDatas: [],
    };
  },
  methods: {
    btnok() {
      //   console.log(this.$refs.DataTable.selection);
      if (this.$refs.DataTable.selection.length == 0) {
        this.msg("警告", "请选择维修人员!");
        return;
      }
      for (var i in this.$refs.DataTable.selection) {
        this.form.维修人员名称 = this.$refs.DataTable.selection[i].id + ",";
      }
      this.form.维修人员名称 = this.form.维修人员名称.slice(
        0,
        this.form.维修人员名称.length - 1
      );
      this.form.流程代码 = 1;
      this.form.维修单ID = this.form.id;
      // console.log(this.form);

      purchaseacceptancelist_finaleapprovals(this.form).then((res) => {
        this.get_box(res.code, "派单成功!");
        this.dialogVisible = false;
        this.$emit("end");
      });
    },
    onload() {
      this.loading = true;
      var data = {
        departmentone: this.$store.getters.id_一级部门,
        departmentwo: this.$store.getters.id_二级部门,
      };
      get_assetsrepairpeople(data).then((res) => {
        this.tableData = res.data;
        this.loading = false;
      });
    },
    //多选框
    getRowKeys(row) {
      return row.资产Id;
    },
  },
};
</script>

<style>
</style>