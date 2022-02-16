<template>
  <div style="margin: 1%">
    <el-button type="text" @click="openAdd" class="el-icon-plus"
      >发起资产借用</el-button
    >
    <div style="float: right; margin-right: 10px">
      <el-form ref="ruleForm" :label-position="labelPosition" :inline="true">
        <el-radio-group
          v-model="pageinfo.shouwayname"
          size="small"
          @change="tabClick"
        >
          <!-- <el-radio-button label="我的待办"></el-radio-button> -->
          <el-radio-button label="借还大厅"></el-radio-button>
          <el-radio-button label="我的借入"></el-radio-button>
          <el-radio-button label="我的借出"></el-radio-button>
        </el-radio-group>

        <el-form-item
          label="流程状态"
          :label-width="formLabelWidth"
          style="margin-left: 10px"
          prop="流程状态"
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
      <el-table-column label="单据编号" prop="单据编号" />
      <el-table-column label="借用人" prop="借用人" />
      <el-table-column label="提交日期" prop="提交时间" />
      <el-table-column label="借用日期" prop="借用时间" />
      <el-table-column label="借出人" prop="借出人" />
      <el-table-column label="备注信息" prop="备注信息" />
      <el-table-column fixed="right" width="120" label="">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handle(scope.row)"
            v-if="handleBorrow(scope.row)"
            >处理</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="handle(scope.row)"
            v-if="lookBorrow(scope.row)"
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
    <AddBorrows ref="AddBorrow" @onload="onload" />
    <Handle ref="Handle" @onload="onload" />
    <Handles ref="Handles" @onload="onload" />
    <Looks ref="Looks" @onload="onload" />
  </div>
</template>

<script>
import { get_assetlendingdata } from "@/api/assetlendinghandle";
import AddBorrows from "./components/addBorrow";
import Handle from "./components/Handle";
import Handles from "./components/Handles";
import Looks from "./components/looks";
export default {
  components: { AddBorrows, Handle, Handles, Looks },
  data() {
    return {
      labelPosition: "left", // 对齐方向
      formLabelWidth: "80px", // label宽度
      options: [
        {
          value: "已提交",
          label: "已提交"
        },
        {
          value: "已出借，待归还",
          label: "已出借，待归还"
        },
        {
          value: "已归还，待确认",
          label: "已归还，待确认"
        },

        {
          value: "已完成",
          label: "已完成"
        },
        {
          value: "已保存",
          label: "草稿箱"
        },
        {
          value: "已退回",
          label: "已退回"
        }
      ],
      loading: false,
      tableData: [],
      pageinfo: {
        shouwayname: "借还大厅",
        shouway: 1,
        pageNum: 1, // 第几页
        pageSize: 10, // 一页多少条
        count: 0, // 数据总数
        pagesizes: [10, 20, 30, 50],
        fk_user: this.$store.getters.id_用户,
        fk_role: this.$store.getters.id_角色,
        content: ""
      } // 搜索条件
    };
  },
  methods: {
    // 处理按钮
    handleBorrow(val) {
      // console.log("val", val);
      if (val.流程状态 === "已提交") {
        return true;
      } else if (val.流程状态 === "已保存") {
        return true;
      } else if (
        val.流程状态 === "已退回" &&
        val.借用人Id == this.$store.getters.id_用户
      ) {
        return true;
      } else if (
        val.流程状态 === "已出借，待归还" &&
        val.借用人Id == this.$store.getters.id_用户
      ) {
        return true;
      } else if (
        val.流程状态 === "已归还，待确认" &&
        val.借出人Id == this.$store.getters.id_用户
      ) {
        return true;
      } else if (val.流程状态 === "已完成") {
        return false;
      }
    },
    // 查看按钮
    lookBorrow(val) {
      // console.log("val", val);
      if (val.流程状态 === "已提交") {
        return false;
      } else if (val.流程状态 === "已保存") {
        return false;
      } else if (
        val.流程状态 === "已退回" &&
        val.借出人Id == this.$store.getters.id_用户
      ) {
        return true;
      } else if (
        val.流程状态 === "已出借，待归还" &&
        val.借出人Id == this.$store.getters.id_用户
      ) {
        return true;
      } else if (
        val.流程状态 === "已归还，待确认" &&
        val.借用人Id == this.$store.getters.id_用户
      ) {
        return true;
      } else if (val.流程状态 === "已完成") {
        return true;
      }
    },
    submit() {
      this.onload();
    },
    // 处理
    handle(row) {
      // console.log("row:", row);
      this.$refs.Handle.onload();
      if (row.流程状态 == "已提交") {
        if (row.借出人Id == this.$store.getters.id_用户) {
          // console.log("借出人");
          this.$refs.Handle.show = true;
          this.$refs.Handle.form = row;
        } else {
          this.$refs.Handle.show = false;
          this.$refs.Handle.form = row;
        }
        this.$refs.Handle.cxtext = "撤 销";
        this.$refs.Handle.oktext = "同 意";
        this.$refs.Handle.notext = "拒 绝";
        this.$refs.Handle.dialogVisible = true;
      } else if (row.流程状态 == "已出借，待归还") {
        if (row.借出人Id === this.$store.getters.id_用户) {
          this.$refs.Looks.form = row;
          let data = {
            id: row.借出人Id,
            name: row.借出人
          };
          this.$refs.Looks.form = row;
          this.$refs.Looks.dialogTitle = "资产借还单";
          this.$refs.Looks.form.借出人value = data;
          this.$refs.Looks.onemoretime();
          this.$refs.Looks.dialogVisible = true;
        } else {
          this.$refs.Handles.oktext = "归 还";
          this.$refs.Handles.notext = "取 消";
          this.$refs.Handles.form = row;
          this.$refs.Handles.onload();
          this.$refs.Handles.dialogVisible = true;
        }
      } else if (row.流程状态 == "已归还，待确认") {
        if (row.借用人Id === this.$store.getters.id_用户) {
          this.$refs.Looks.form = row;
          let data = {
            id: row.借出人Id,
            name: row.借出人
          };
          this.$refs.Looks.form = row;
          this.$refs.Looks.dialogTitle = "资产借还单";
          this.$refs.Looks.form.借出人value = data;
          this.$refs.Looks.onemoretime();
          this.$refs.Looks.onload();
          this.$refs.Looks.dialogVisible = true;
        } else {
          this.$refs.Handles.oktext = "确认归还";
          this.$refs.Handles.notext = "取消";
          this.$refs.Handles.form = row;
          this.$refs.Handles.onload();
          this.$refs.Handles.dialogVisible = true;
        }
      } else if (row.流程状态 == "已退回" || row.流程状态 == "已保存") {
        if (row.流程状态 == "已退回") {
          if (row.借出人Id === this.$store.getters.id_用户) {
            this.$refs.Looks.form = row;
            let data = {
              id: row.借出人Id,
              name: row.借出人
            };
            this.$refs.Looks.form = row;
            this.$refs.Looks.dialogTitle = "资产借还单";
            this.$refs.Looks.form.借出人value = data;
            this.$refs.Looks.onemoretime();
            this.$refs.Looks.onload();
            this.$refs.Looks.dialogVisible = true;
          } else {
            this.$refs.AddBorrow.hiden = false;
            this.$refs.AddBorrow.form = row;
            let data = {
              id: row.借出人Id,
              name: row.借出人
            };
            this.$refs.AddBorrow.form = row;
            this.$refs.AddBorrow.dialogTitle = "资产借还单";
            this.$refs.AddBorrow.form.借出人value = data;
            this.$refs.AddBorrow.onemoretime();
            this.$refs.AddBorrow.dialogVisible = true;
          }
          // this.$router.push({ path: "/borrows",query: { data: row } });
        } else {
          this.$router.push({ path: "/borrows", query: { data: row } });
        }
        // this.$refs.AddBorrow.form = row;
        // var data = {
        //   id: row.借出人Id,
        //   name: row.借出人,
        // };
        // this.$refs.AddBorrow.form = row;
        // this.$refs.AddBorrow.dialogTitle = "资产借还单";
        // this.$refs.AddBorrow.form.借出人value = data;
        // this.$refs.AddBorrow.onemoretime();
        // this.$refs.AddBorrow.dialogVisible = true;
        return;
      } else if (row.流程状态 === "已完成") {
        this.$refs.Looks.form = row;
        let data = {
          id: row.借出人Id,
          name: row.借出人
        };
        this.$refs.Looks.form = row;
        this.$refs.Looks.dialogTitle = "资产借还单";
        this.$refs.Looks.form.借出人value = data;
        this.$refs.Looks.onemoretime();
        this.$refs.Looks.onload();
        this.$refs.Looks.dialogVisible = true;
      }
      // this.$refs.Handle.dialogVisible = true;
    },
    openAdd() {
      this.$router.push({ path: "/borrows" });
      return;
      this.$refs.AddBorrow.dialogTitle = "资产借还单";
      this.$refs.AddBorrow.tableData = [];
      this.$refs.AddBorrow.form = {
        申请时间: this.dayjs().format("YYYY-MM-DD"),
        借用时间:
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate(),
        借用人: this.$store.getters.姓名,
        流程状态: "已提交",
        预计归还时间: "",
        借出人value: "",
        备注信息: ""
      };
      this.$refs.AddBorrow.hiden = true;
      this.$refs.AddBorrow.dialogVisible = true;
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
    },
    tabClick(val) {
      if (val == "借还大厅") {
        this.pageinfo.shouway = 1;
        this.pageinfo.pageNum = 1;
        this.pageinfo.pageSize = 10;
      } else if (val == "我的借入") {
        this.pageinfo.shouway = 2;
        this.pageinfo.pageNum = 1;
        this.pageinfo.pageSize = 10;
      } else if (val == "我的借出") {
        this.pageinfo.shouway = 3;
        this.pageinfo.pageNum = 1;
        this.pageinfo.pageSize = 10;
      }
      // else if (val == "我的待办") {
      //   this.pageinfo.shouway = 4;
      // }
      this.onload();
    },
    onload() {
      // if (this.pageinfo.shouwayname == "借还大厅") {
      //   this.pageinfo.shouway = 1;
      // } else if (this.pageinfo.shouwayname == "我的借入") {
      //   this.pageinfo.shouway = 2;
      // } else if (this.pageinfo.shouwayname == "我的借出"){
      //   this.pageinfo.shouway = 3;
      // }else if (this.pageinfo.shouwayname == "我的待办"){
      //   this.pageinfo.shouway = 4;
      // }
      this.loading = true;
      get_assetlendingdata(this.pageinfo).then(res => {
        this.tableData = res.data;
        this.loading = false;
        this.pageinfo.count = res.count;
      });
    }
  },
  beforeMount() {
    this.onload();
  }
};
</script>

<style></style>
