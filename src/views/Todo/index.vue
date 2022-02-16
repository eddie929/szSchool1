<template>
  <div style="margin: 1%">
    <el-form
      :model="form"
      ref="form"
      label-width="80px"
      class="demo-ruleForm"
      size="medium"
      :inline="true"
    >
      <el-form-item :label-width="formLabelWidth" prop="remark">
        <el-radio-group v-model="pageinfo.selectway" @change="selectChange">
          <el-radio :label="1">待我处理</el-radio>
          <el-radio :label="2">我发起的</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        :label-width="formLabelWidth"
        label="流程类型"
        prop="remark"
      >
        <el-select v-model="pageinfo.flowname" placeholder="请选择" clearable>
          <el-option
            v-for="item in 流程类型options"
            :key="item.flowname"
            :label="item.flowname + '(' + item.count + ')'"
            :value="item.flowname"
            size="medium"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-button size="small" @click="submit" type="primary">查询</el-button>
    </el-form>

    <el-table
      ref="DataTable"
      v-loading="loading"
      :data="tableData"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
      style="width: 100%; margin-top: 1%"
    >
      <el-table-column
        label="序号"
        type="index"
        width="50"
        :reserve-selection="true"
      ></el-table-column>
      <el-table-column label="流程状态" prop="flow_state" />
      <el-table-column label="流程名称" prop="flowname" />
      <el-table-column
        label="通知内容"
        :show-overflow-tooltip="true"
        prop="noticecontent"
      />
      <el-table-column label="发起人" prop="user_name" />
      <el-table-column label="发起时间" prop="publishtime" />
      <el-table-column fixed="right" width="120" label="">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handle(scope.row)"
            >处理</el-button
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
  </div>
</template>

<script>
import {
  get_agencydatal,
  get_agencydataselect,
} from "@/api/datareportstatisticshandle";
export default {
  data() {
    return {
      form: {},
      labelPosition: "left",
      formLabelWidth: "80px",
      pageinfo: {
        pageNum: 1, //第几页
        pageSize: 10, //一页多少条
        count: 0, //数据总数
        pagesizes: [10, 20, 30, 50],
        selectway: 1,
      }, //搜索条件
      loading: false,
      tableData: [],
      流程类型options: [
        {
          flowname: "资产借还",
          value: "资产借还",
        },
        {
          flowname: "资产报修",
          value: "资产报修",
        },
        {
          flowname: "资产转移",
          value: "资产转移",
        },
        {
          flowname: "原值变动",
          value: "原值变动",
        },
        {
          flowname: "购置验收入库",
          value: "购置验收入库",
        },
        {
          flowname: "资产盘点",
          value: "资产盘点",
        },
        {
          flowname: "资产报废",
          value: "资产报废",
        },
        {
          flowname: "资产调拨",
          value: "资产调拨",
        },
      ],
    };
  },
  methods: {
    selectChange(val) {
      // console.log(val);
      this.tableData = [];
      this.onload();
    },
    //   处理
    handle(row) {
      // console.log(row.flowname);
      this.gotodo(row.flowname, this.$router);
    },
    // 查询
    submit() {
      this.onload();
    },
    onload() {
      var data = JSON.parse(JSON.stringify(this.pageinfo));
      data.fk_user = this.$store.getters.id_用户;
      data.fk_role = this.$store.getters.id_角色;
      data.departmentone = this.$store.getters.id_一级部门;
      data.departmenttwo = this.$store.getters.id_二级部门;
      this.loading = true;
      get_agencydatal(data).then((res) => {
        this.tableData = res.data;
        this.pageinfo.count = res.count;
        this.loading = false;
        get_agencydataselect(data).then((res) => {
          this.流程类型options = res.data;
        });
      });
    },
    //控制每页显示条数
    handleSizeChange(val) {
      this.pageinfo.pageSize = val;
      this.onload();
    },
    //第几页
    handleCurrentChange(val) {
      this.pageinfo.pageNum = val;
      this.onload();
    },
    get_agencydataselect() {},
  },
  beforeMount() {
    this.onload();
  },
};
</script>

<style>
</style>