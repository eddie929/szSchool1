<template>
  <div style="margin: 1%">
    <el-button type="text" @click="openAdd" class="el-icon-plus"
      >计提本期折旧</el-button
    >
    <el-button
      type=""
      @click="perfectYears"
      class="el-icon-plus"
      style="float:right;margin-left:30px;margin-right:20px;color:#1890ff;"
      >折旧年限表</el-button
    >
    <el-button
      type=""
      @click="perfectDepreciation"
      class="el-icon-plus"
      style="float:right;color:#1890ff;"
      >完善折旧信息</el-button
    >
    <el-table
      ref="table"
      v-loading="loading"
      :data="tableData"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
      style="width: 100%; margin-top: 1%"
    >
      <el-table-column v-if="false" prop="id_用户" label="id" />
      <el-table-column label="流程状态" prop="流程状态" />
      <el-table-column label="账期" prop="账期" />
      <el-table-column label="申请人" prop="申请人" />
      <el-table-column label="申请日期" prop="申请日期" />
      <el-table-column label="记账人" prop="记账人" />
      <el-table-column label="记账凭证号" prop="记账凭证号" />
      <el-table-column label="备注信息" prop="备注信息" />

      <el-table-column fixed="right" width="120" label="查看详情">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handle(scope.row)"
            v-if="scope.row.流程状态 != '已记账'"
            >处理</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="handle(scope.row)"
            v-if="scope.row.流程状态 == '已记账'"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin: 10px 0px 0px 10px">
      <el-col :span="24">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageinfo.pageNum"
          :page-sizes="pageinfo.pagesizes"
          :page-size="pageinfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageinfo.count"
        ></el-pagination>
      </el-col>
    </el-row>
    <Add ref="Add" @onload="onload" />
    <Handle ref="Handle" @onload="onload" />
    <See ref="See" @onload="onload" />
    <Che ref="Che" @onload="onload" />
    <Perfect ref="Perfect" @select="select" />
  </div>
</template>

<script>
import Perfect from "./components/Perfect.vue";
import Che from "./components/che.vue";
import See from "./components/see.vue";
import { get_querytime } from "@/api/depreciationhandle";
import { get_depreciationlist } from "@/api/depreciationhandle";
import Add from "./components/add.vue";
import Handle from "./components/Handle.vue";
export default {
  components: { Add, Handle, See, Che, Perfect },
  data() {
    return {
      loading: false,
      tableData: [],
      pageinfo: {
        pageNum: 1, //第几页
        pageSize: 10, //一页多少条
        count: 0, //数据总数
        pagesizes: [10, 20, 30, 50],
        fk_user: this.$store.getters.id_用户,
        fk_role: this.$store.getters.id_角色,
        departmentone: this.$store.getters.id_一级部门,
        departmenttwo: this.$store.getters.id_二级部门
      } //搜索条件
    };
  },
  methods: {
    select() {
      this.onload();
    },
    // 完善折旧信息
    perfectDepreciation() {
      this.$refs.Perfect.dialogVisible = true
      this.$refs.Perfect.get_alldepartmentpeople()
      this.$refs.Perfect.get_storagelocation()
      this.$refs.Perfect.onload()
    },
    // 折旧年限表
    perfectYears() {
      const a = document.createElement("a");
      a.href = "http://82.156.97.125:8081/固定资产折旧年限配置表（中小学）.xls";
      a.click();
    },
    handle(row) {
      // console.log(row);
      if (row.流程状态 == "待记账") {
        if (row.流程状态 == "待记账" && this.$store.getters.职务 != "财务") {
          if (row.申请人 == this.$store.getters.姓名) {
            // console.log("撤销");
            this.$refs.Che.form = row;
            this.$refs.Che.radio = 3;
            this.$refs.Che.onload(row.id);
            this.$refs.Che.dis = true;
            this.$refs.Che.dialogVisible = true;
            return;
          } else {
            this.msg("警告", "必须由财务人员负责记账");
            return;
          }
        }
        this.$refs.Handle.form = row;
        this.$refs.Handle.onload(row.id);
        this.$refs.Handle.form.executive_name = this.$store.getters.姓名;
        this.$refs.Handle.dis = true;
        this.$refs.Handle.dialogVisible = true;
      } else {
        this.$refs.See.form = row;
        this.$refs.See.radio = 3;
        this.$refs.See.onload(row.id);
        this.$refs.See.dis = true;
        this.$refs.See.dialogVisible = true;
      }
    },
    openAdd() {
      var data = {
        departmentone: this.$store.getters.id_一级部门,
        departmenttwo: this.$store.getters.id_二级部门
      };
      get_querytime(data).then(res => {
        if (res.data == "是") {
          this.msg("警告", "当前存在未封存账期,不允许计提折旧!");
          return;
        } else {
          this.$refs.Add.onload();
          this.$refs.Add.dialogVisible = true;
        }
      });
    },
    onload() {
      get_depreciationlist(this.pageinfo).then(res => {
        this.tableData = res.data;
        this.pageinfo.count = res.count;
      });
    },
    //控制每页显示条数
    handleSizeChange(val) {
      this.pageinfo.pageSize = val;
      this.onload();
    },
    //第几页
    handleCurrentChange(val) {
      // console.log(val)
      this.pageinfo.pageNum = val;
      this.onload();
    }
  },
  beforeMount() {
    this.onload();
  }
};
</script>

<style></style>
