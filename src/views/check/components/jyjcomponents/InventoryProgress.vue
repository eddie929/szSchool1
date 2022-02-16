<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 100%;"
      height="50vh"
      :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
    >
      <el-table-column type="index" label="序号" width="55"> </el-table-column>
      <el-table-column prop="人员名称" label="整体/个人"> </el-table-column>
      <el-table-column prop="完成情况" label="完成情况"> </el-table-column>
      <el-table-column prop="应盘总数" label="应盘总数"> </el-table-column>
      <el-table-column prop="已盘点" label="已盘点"> </el-table-column>
      <el-table-column prop="未盘点" label="未盘点"> </el-table-column>
      <el-table-column label="盘点进度">
        <template slot-scope="{ row }">
          <el-progress
            :color="colors"
            :percentage="
              (row.已盘点 / (row.应盘总数 == 0 ? 1 : row.应盘总数)).toFixed(2) *
                100
            "
          ></el-progress>
          <!-- <el-progress :color="colors" :percentage="row.完成情况"></el-progress> -->
        </template>
      </el-table-column>
      <el-table-column prop="提交状态" label="提交状态">
        <template slot-scope="{ row }">
          <el-tag :type="getState(row.提交状态)">{{ row.提交状态 }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button type="text" @click="selectProgress(row)" size="mini"
            >查看进度</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <InventoryDetailedProgress ref="detailedProgress" />
  </div>
</template>

<script>
import {
  get_checkprocessprogress,
  get_eductionpocessprogress
} from "@/api/inventoryhandle";
import InventoryDetailedProgress from "./InventoryDetailedProgress.vue";
export default {
  // inject: ["newFoo"], //获取参数用this.newFoo
  components: {
    InventoryDetailedProgress
  },
  data() {
    return {
      tableData: [],
      inventoryID: "",
      pdID: 0,
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
      ]
    };
  },
  methods: {
    //查询个人进度
    selectProgress(row) {
      this.$refs.detailedProgress.isCheck = "未盘点";
      this.$refs.detailedProgress.pointPerson = row;
      this.$refs.detailedProgress.PDID = this.pdID;
      this.$refs.detailedProgress.onload();
      this.$refs.detailedProgress.dialogVisible = true;
    },
    //提交状态显示样式
    getState(state) {
      if (state == "正在进行") {
        return "success";
      } else if (state == "已提交") {
        return "primary";
      }
    },
    onloads() {
      // console.log("执行了吗-----------:", this.pdID);
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      if (this.$store.getters.id_二级部门 == 0) {
        get_eductionpocessprogress({ taskId: this.pdID })
          .then(response => {
            if (response.code == 100) {
              this.tableData = response.data;
            }
            loading.close();
          })
          .catch(error => {
            loading.close();
          });
      } else {
        get_checkprocessprogress({
          ID: this.pdID,
          departmentone: this.$store.getters.id_一级部门,
          departmenttwo: this.$store.getters.id_二级部门
        })
          .then(response => {
            if (response.code == 100) {
              // console.log("执行了吗1-----------:", response);
              // console.table(response.data);
              this.tableData = response.data;
            }
            loading.close();
          })
          .catch(error => {
            loading.close();
          });
      }
    }
  }
  // mounted() {
  //   // this.onload();
  //   console.log("孙子加载:", this.newFoo.foo);
  // }
};
</script>

<style></style>
