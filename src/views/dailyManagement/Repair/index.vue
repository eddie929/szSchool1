<template>
  <div style="margin: 1%">
    <el-button type="text" @click="openAdd" class="el-icon-plus"
      >发起资产报修</el-button
    >
    <div style="float: right; margin-right: 10px">
      <el-form ref="ruleForm" :label-position="labelPosition" :inline="true">
        <el-radio-group
          v-model="pageinfo.selectname"
          size="small"
          @change="tabClick"
        >
          <el-radio-button label="报修大厅"></el-radio-button>
          <el-radio-button label="我的报修"></el-radio-button>
        </el-radio-group>

        <el-form-item
          label="流程状态"
          :label-width="formLabelWidth"
          style="margin-left: 10px"
          prop="remark"
        >
          <el-select
            v-model="pageinfo.flow_state"
            placeholder="请选择"
            clearable
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-button @click="submit" icon="el-icon-search" size="small"
          >搜索</el-button
        >
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
    >
      <el-table-column v-if="false" prop="id_用户" label="id" />
      <el-table-column label="流程状态" prop="流程状态" />
      <el-table-column label="报修单号" prop="单据编号" />
      <el-table-column label="报修人" prop="报修人名称" />
      <el-table-column label="报修时间" prop="报修时间" />
      <el-table-column label="报修地址" prop="报修地址" />
      <el-table-column label="故障描述" prop="故障描述" />
      <el-table-column fixed="right" width="120" label="">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handle(scope.row)"
            v-if="handleRepair(scope.row)"
            >处理</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="look(scope.row)"
            v-if="lookRepair(scope.row)"
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
    <AddRepair ref="AddRepair" @end="end" />
    <Paidan ref="Paidan" @end="end" />
    <Reok ref="Reok" @end="end" />
    <Look ref="Look" />
  </div>
</template>

<script>
import AddRepair from "./components/addRepair.vue";
import Paidan from "./components/paidan.vue";
import Reok from "./components/Reok.vue";
import Look from "./components/Look.vue";
import { get_purchaseacceptancelist } from "@/api/assetarepairhandle";
export default {
  components: { AddRepair, Paidan, Reok, Look },
  data() {
    return {
      roleName: this.$store.getters.角色名称,
      state: "全部",
      options: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "待派单",
          label: "待派单",
        },
        {
          value: "维修中",
          label: "维修中",
        },
        {
          value: "待反馈",
          label: "待反馈",
        },
        {
          value: "已完成",
          label: "已完成",
        },
        {
          value: "已退回",
          label: "已退回",
        },
      ],
      formLabelWidth: "80px",
      labelPosition: "left",
      loading: false,
      tableData: [],
      pageinfo: {
        pageNum: 1, //第几页
        pageSize: 10, //一页多少条
        count: 0, //数据总数
        pagesizes: [10, 20, 30, 50],
        fk_user: 0,
        content: "",
        selectname: "报修大厅",
        selectway: 1,
      }, //搜索条件
    };
  },
  methods: {
    tabClick(val) {
      if (val == "报修大厅") {
        this.pageinfo.selectway = 1;
        this.pageinfo.pageNum = 1;
        this.pageinfo.pageSize = 10;
      } else if (val == "我的报修") {
        this.pageinfo.selectway = 2;
        this.pageinfo.pageNum = 1;
        this.pageinfo.pageSize = 10;
      }
      this.onload();
    },
    handleRepair(val) {
      if (val.流程状态 == "已派单,维修中") {
        return true;
      } else if (val.流程状态 == "已维修,待反馈") {
        return true;
      } else if (
        val.流程状态 == "已报修,待派单" &&
        this.roleName == "资产管理员"
      ) {
        return true;
      } else if (val.流程状态 == "已保存" || val.流程状态 == "已退回") {
        return true;
      } else {
        return false;
      }
    },
    lookRepair(val) {
      if (val.流程状态 == "已完成") {
        return true;
      } else if (val.流程状态 == "已维修,待反馈") {
        return false;
      } else if (val.流程状态 == "已派单,维修中") {
        return false;
      } else if (
        val.流程状态 == "已报修,待派单" &&
        this.roleName == "资产管理员"
      ) {
        return false;
      } else if (val.流程状态 == "已保存" || val.流程状态 == "已退回") {
        return false;
      } else {
        return true;
      }
    },
    openAdd() {
      this.$router.push({ path: "/repairs" });
      return;
      this.$refs.AddRepair.titleDialog = "资产报修单";
      this.$refs.AddRepair.form = {
        流程状态: "已报修,待派单",
        报修时间: this.dayjs().format("YYYY-MM-DD"),
        报修人名称: this.$store.getters.姓名,
        报修人电话: this.$store.getters.手机,
      };
      if (this.$refs.AddRepair.form.报修人电话 === "") {
        this.$refs.AddRepair.form.报修人电话 = "暂无电话";
      }
      this.$refs.AddRepair.get_storagelocation();
      this.$refs.AddRepair.tableData = [];
      this.$refs.AddRepair.dialogVisible = true;
    },
    handle(row) {
      // console.log(row);
      if (row.流程状态 == "已报修,待派单") {
        this.$refs.Paidan.form = row;
        this.$refs.Paidan.onload();
        this.$refs.Paidan.dialogVisible = true;
      } else if (row.流程状态 == "已派单,维修中") {
        if (this.$store.getters.角色名称 === "维修工") {
          this.$refs.Reok.endText = "维修完成";
          this.$refs.Reok.titleDialog = "资产报修单";
          this.$refs.Reok.form = row;
          this.$refs.Reok.onload();
          this.$refs.Reok.dialogVisible = true;
          this.$refs.Reok.hiden = true;
        } else {
          this.$refs.Reok.cxtext = "撤 销";
          this.$refs.Reok.titleDialog = "资产报修单";
          this.$refs.Reok.form = row;
          this.$refs.Reok.onload();
          this.$refs.Reok.dialogVisible = true;
          this.$refs.Reok.hiden = false;
        }
      } else if (row.流程状态 == "已维修,待反馈") {
        this.$refs.Reok.endText = "结果反馈";
        this.$refs.Reok.titleDialog = "资产报修单";
        this.$refs.Reok.form = row;
        this.$refs.Reok.onload();
        this.$refs.Reok.dialogVisible = true;
      } else if (row.流程状态 == "已退回" || row.流程状态 == "已保存") {
        this.$router.push({ path: "/repairs", query: { data: row } });
        return;
        this.$refs.AddRepair.titleDialog = "资产报修单";
        this.$refs.AddRepair.form = row;
        this.$refs.AddRepair.get_storagelocation();
        this.$refs.AddRepair.get_purchaseacceptancelistdetail(row.id);
        this.$refs.AddRepair.imageUrl = row.url;
        this.$refs.AddRepair.form.报修地址value = [
          (二级机构ID = this.$store.getters.id_二级部门),
          (存放地点一级ID = row.报修地址Id一级),
          (存放地点二级ID = row.报修地址Id二级),
          (房间名称 = row.报修地址),
        ];
        this.$refs.AddRepair.dialogVisible = true;
      }
    },
    // 流程结束  查看
    look(row) {
      this.$refs.Look.form = row;
      this.$refs.Look.onload();
      this.$refs.Look.dialogVisible = true;
      this.$refs.Look.hiden = true;
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
    end() {
      this.pageinfo.pageinfo = 10;
      this.pageinfo.pageNum = 1;
      this.onload();
    },
    submit() {
      this.onload();
    },
    onload() {
      this.loading = true;
      this.pageinfo.fk_user = this.$store.getters.id_用户;
      this.pageinfo.fk_role = this.$store.getters.id_角色;
      get_purchaseacceptancelist(this.pageinfo).then((res) => {
        this.tableData = res.data;
        for (let i of this.tableData) {
          if (i.报修地址一级 === "") {
            i.报修地址 = i.报修地址二级;
          } else {
            i.报修地址 = i.报修地址二级 + "/" + i.报修地址一级;
          }
        }
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