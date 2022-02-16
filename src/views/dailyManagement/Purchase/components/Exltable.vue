<template>
  <el-dialog
    title="资产清单"
    :visible.sync="dialogVisible"
    width="80%"
    style="text-align: center"
    top="15vh"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :close-on-click-modal="false"
  >
    <el-table
      :data="tableData"
      ref="tableData"
      style="width: 100%; margin-top: 2%"
      v-loading="loading"
      :highlight-current-row="true"
      border
      stripe
      height="400"
      :fit="true"
      :header-cell-style="{
        'text-align': 'center',
        background: '#eef1f6'
      }"
      :cell-style="{ 'text-align': 'center' }"
      :row-key="getRowKeys"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true">
      </el-table-column>
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column
        prop="资产名称"
        label="资产名称"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="资产分类"
        label="资产分类"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="规格" label="规格" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="型号" label="型号" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="数量" label="数量(个)" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="原值" label="原值" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="使用方向"
        label="使用方向"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="取得日期"
        label="取得日期"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="资产状态"
        label="资产状态"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="负责人"
        label="负责人"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="使用人"
        label="使用人"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="存放地点"
        label="存放地点"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="归属部门"
        label="归属部门"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
    </el-table>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: right; margin-right: 40px"
    >
      <el-button
        type="primary"
        @click="btnok('form', '提交')"
        class="el-icon-check"
      >
        提 交</el-button
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
      dialogVisible: false, // 显示隐藏
      loading: false, // 加载动画
      tableData: []
    };
  },
  methods: {
    // 多选框
    getRowKeys(row) {
      return row.id;
    },
    // 提交
    btnok() {
      if (this.$refs.tableData.selection.length === 0) {
        this.$notify.warning("请选择所需导入资产!");
        return;
      }
      for (let i of this.tableData) {
        i.负责人name = i.负责人;
        i.使用人name = i.使用人;
        i.保留原值 = parseFloat(i.原值).toFixed(2);
        i.资产分类 =
          i.一级分类名称 +
          " " +
          i.二级分类名称 +
          " " +
          i.三级分类名称 +
          " " +
          i.四级分类名称;
        i.归属部门 =
          i.所属部门一级 +
          " " +
          i.所属部门二级 +
          " " +
          i.房间名称 +
          " " +
          i.所属三级部门;
      }
      this.$emit("select", this.$refs.tableData.selection);
      this.dialogVisible = false;
    }
  }
};
</script>

<style></style>
