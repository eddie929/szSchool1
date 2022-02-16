<template>
  <div style="margin: 1%">
    <el-button type="text" @click="openAdd" class="el-icon-plus"
      >发起原值变动</el-button
    >
    <div style="float: right; margin-right: 10px">
      <el-form ref="ruleForm" :label-position="labelPosition" :inline="true">
        <el-form-item
          label="流程状态"
          :label-width="formLabelWidth"
          style="margin-left: 10px"
          prop="remark"
        >
          <el-select v-model="state" placeholder="请选择" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-button icon="el-icon-search" size="small">搜索</el-button>
      </el-form>
    </div>
    <el-table
      ref="table"
      v-loading="loading"
      :data="tableData"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
      style="width: 100%; margin-top: 1%"
      :cell-style="yellowBg"
    >
      <el-table-column v-if="false" prop="id_用户" label="id" />
      <el-table-column label="流程状态" prop="流程状态" />
      <el-table-column label="单据编号" prop="单据编号" />
      <el-table-column label="申请人" prop="申请人" />
      <el-table-column label="申请日期" prop="申请日期" />
      <el-table-column
        label="变动金额合计"
        prop="变动金额合计"
        style="text-align: right"
        align="right"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.变动金额合计.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="变动方式" prop="变动方式" />
      <el-table-column label="变动原因" prop="变动原因" />
      <!-- <el-table-column label="备注信息" prop="备注信息" /> -->
      <el-table-column fixed="right" width="120" label="">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="mini" @click="handle(scope.row)"
            >处理</el-button
          > -->
          <el-button
            type="text"
            size="mini"
            @click="handle(scope.row)"
            v-if="handleOriginal(scope.row)"
            >处理</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="look(scope.row)"
            v-if="lookOriginal(scope.row)"
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
    <AddChangeOriginal ref="AddChangeOriginal" @select="select" />
    <Handle ref="Handle" @select="select" />
    <Look ref="Look" />
  </div>
</template>

<script>
import AddChangeOriginal from "./components/addChangeOriginal.vue";
import Handle from "./components/Handle.vue";
import Look from "./components/Look.vue";
import { get_originaldatal } from "@/api/originalchangehandle";
import { get_querytime } from "@/api/depreciationhandle";
export default {
  components: { AddChangeOriginal, Handle, Look },
  data() {
    return {
      roleName: this.$store.getters.角色名称,
      state: "全部",
      loading: false,
      tableData: [],
      labelPosition: "left",
      formLabelWidth: "80px",
      options: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "待审核",
          label: "待审核",
        },
        {
          value: "已完成",
          label: "已完成",
        },
      ],
      pageinfo: {
        pageNum: 1, //第几页
        pageSize: 10, //一页多少条
        count: 0, //数据总数
        pagesizes: [10, 20, 30, 50],
        fk_user: 0,
        content: "",
      }, //搜索条件
    };
  },
  methods: {
    lookOriginal(val) {
      if (val.流程状态 === "待审核") {
        return false;
      } else if (val.流程状态 === "已退回") {
        return false;
      } else if (val.流程状态 === "已完成") {
        return true;
      }
    },
    handleOriginal(val) {
      if (val.流程状态 === "待审核") {
        return true;
      } else if (val.流程状态 === "已退回") {
        return true;
      } else if (val.流程状态 === "已完成") {
        return false;
      } else if (val.流程状态 === "已保存") {
        return true;
      }
    },
    // 查看
    look(row) {
      this.$refs.Look.form = row;
      this.$refs.Look.gettable(row.Id);
      this.$refs.Look.onload();
      this.$refs.Look.dialogVisible = true;
    },
    //表格颜色
    yellowBg({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 4) {
        return {
          background: "#F5F5F5",
        };
      }
    },
    select() {
      this.pageinfo.pageNum = 1;
      this.onload();
    },
    // 处理
    handle(row) {
      // console.log(row);
      if (row.流程状态 == "已保存") {
        this.$router.push({ path: "/originals", query: { data: row } });
        return;
        this.$refs.AddChangeOriginal.form = row;
        this.$refs.AddChangeOriginal.gettable(row.Id);
        this.$refs.AddChangeOriginal.dialogVisible = true;
      } else if (row.流程状态 == "已退回") {
        this.$refs.AddChangeOriginal.form = row;
        this.$refs.AddChangeOriginal.gettable(row.Id);
        this.$refs.AddChangeOriginal.hiden = true;
        this.$refs.AddChangeOriginal.dialogVisible = true;
      } else if (row.流程状态 == "待审核") {
        if (row.申请人Id === this.$store.getters.id_用户) {
          this.$refs.Handle.hiden = false;
          this.$refs.Handle.form = row;
          this.$refs.Handle.gettable(row.Id);
          this.$refs.Handle.onload();
          this.$refs.Handle.dialogVisible = true;
        } else {
          this.$refs.Handle.hiden = true;
          this.$refs.Handle.form = row;
          this.$refs.Handle.gettable(row.Id);
          this.$refs.Handle.onload();
          this.$refs.Handle.dialogVisible = true;
        }
      }
    },
    openAdd() {
      let data = {
        departmentone: this.$store.getters.id_一级部门,
        departmenttwo: this.$store.getters.id_二级部门,
      };
      get_querytime(data).then((res) => {
        if (res.data == "是") {
          this.msg("警告", "当前存在未封存账期,不允许发起原值变动!");
          return;
        } else {
          this.$router.push({ path: "/originals" });
          return;
          this.$refs.AddChangeOriginal.hiden = false;
          this.$refs.AddChangeOriginal.dialogTitle = "原值变动单";
          this.$refs.AddChangeOriginal.form.流程状态 = "待审核";
          this.$refs.AddChangeOriginal.form.一级机构ID =
            this.$store.getters.id_一级部门;
          this.$refs.AddChangeOriginal.form.二级机构ID =
            this.$store.getters.id_二级部门;
          this.$refs.AddChangeOriginal.form.申请人 = this.$store.getters.姓名;
          this.$refs.AddChangeOriginal.form.申请人Id =
            this.$store.getters.id_用户;
          this.$refs.AddChangeOriginal.form.申请日期 =
            this.dayjs().format("YYYY-MM-DD");
          this.$refs.AddChangeOriginal.dialogVisible = true;
        }
      });
    },
    //控制每页显示条数
    handleSizeChange(val) {
      this.pageinfo.pageSize = val;
      this.onload();
    },
    select() {
      this.pageinfo.pageNum = 1;
      this.pageinfo.pageSize = 10;
      this.onload();
    },
    //第几页
    handleCurrentChange(val) {
      this.pageinfo.pageNum = val;
      this.onload();
    },
    onload() {
      this.loading = true;
      this.pageinfo.fk_user = this.$store.getters.id_用户;
      this.pageinfo.fk_role = this.$store.getters.id_角色;
      get_originaldatal(this.pageinfo).then((res) => {
        this.tableData = res.data;
        this.pageinfo.count = res.count;
        this.loading = false;
      });
    },
  },
  beforeMount() {
    this.onload();
  },
};
</script>

<style>
</style>