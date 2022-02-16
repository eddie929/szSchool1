<template>
  <div style="margin: 1%">
    <el-button type="text" @click="openAdd" class="el-icon-plus"
      >发起资产转移</el-button
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
      <el-table-column label="数量合计" prop="数量合计" />
      <el-table-column label="原值合计" prop="原值合计" align="right" />
      <el-table-column label="申请人" prop="申请人名称" />
      <el-table-column label="申请日期" prop="申请日期" />
      <el-table-column label="备注信息" prop="备注信息" />
      <el-table-column fixed="right" width="120" label="">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handle(scope.row)"
            v-if="handleTransfer(scope.row)"
            >处理</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="look(scope.row)"
            v-if="lookTransfer(scope.row)"
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
    <AddTransfer ref="AddTransfer" @select="select" />
    <Handle ref="Handle" @select="select" />
    <Look ref="Look" />
  </div>
</template>

<script>
import { get_assetstransferdatal } from "@/api/assetstransferhandle";
import AddTransfer from "./components/addTransfer.vue";
import Handle from "./components/handle.vue";
import Look from "./components/look.vue";
import { get_querytime } from "@/api/depreciationhandle";

export default {
  components: { AddTransfer, Handle, Look },
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
    handleTransfer(val) {
      // console.log("val", val);
      if (val.流程状态 === "待审核") {
        return true;
      } else if (val.流程状态 === "已保存") {
        return true;
      } else if (val.流程状态 === "已完成") {
        return false;
      } else if (val.流程状态 === "已退回") {
        return true;
      }
    },
    lookTransfer(val) {
      // console.log("val", val);
      if (val.流程状态 === "待审核") {
        return false;
      } else if (val.流程状态 === "已保存") {
        return false;
      } else if (val.流程状态 === "已完成") {
        return true;
      } else if (val.流程状态 === "已退回") {
        return false;
      }
    },
    // 搜索
    submit() {},
    // 查看
    look(row) {
      if (row.流程状态 == "已退回" || row.流程状态 == "已保存") {
        this.$refs.AddTransfer.form = row;
        this.$refs.AddTransfer.titleDialog = "资产转移单";
        // this.$refs.AddTransfer.form.流程状态 = "待审核";
        this.$refs.AddTransfer.form.申请人 = this.$store.getters.姓名;
        this.$refs.AddTransfer.form.申请人Id = this.$store.getters.id_用户;
        this.$refs.AddTransfer.form.申请日期 =
          this.dayjs().format("YYYY-MM-DD");
        this.$refs.AddTransfer.get_storagelocation();
        this.$refs.AddTransfer.get_allschooldepartment();
        this.$refs.AddTransfer.get_schoolresponseperson();
        this.$refs.AddTransfer.gettable();
        if (row.流程状态 == "已退回") {
          this.$refs.AddTransfer.hiden = true;
        } else {
          this.$refs.AddTransfer.hiden = false;
        }

        if (row.负责人Id != 0) {
          this.$refs.AddTransfer.form.负责人value = {
            id: row.负责人Id,
            name: row.负责人名称,
          };
        }
        if (row.归属部门Id != 0) {
          this.$refs.AddTransfer.form.归属部门value = {
            部门Id: row.归属部门Id,
            部门名称: row.归属部门,
            二级机构Id: this.$store.getters.id_二级部门,
          };
        }
        if (row.存放地点Id != 0) {
          this.$refs.AddTransfer.form.存放地点value = {
            二级机构ID: this.$store.getters.id_二级部门,
            存放地点一级ID: 6,
            存放地点二级ID: row.存放地点Id,
            房间名称: row.存放地点,
          };
        }

        this.$refs.AddTransfer.dialogVisible = true;
      } else {
        this.$refs.Look.form = row;
        this.$refs.Look.get_assetstransferdatalbyId();
        this.$refs.Look.onload();
        this.$refs.Look.dialogVisible = true;
      }
    },
    handle(row) {
      // console.log("row", row);
      if (row.流程状态 == "待审核") {
        if (this.$store.getters.角色名称 === "资产管理员") {
          this.$refs.Handle.form = row;
          this.$refs.Handle.get_assetstransferdatalbyId();
          this.$refs.Handle.onload();
          this.$refs.Handle.dialogVisible = true;
        }else{
          this.$refs.Handle.form = row;
          this.$refs.Handle.get_assetstransferdatalbyId();
          this.$refs.Handle.onload();
          this.$refs.Handle.dialogVisible = true;
          this.$refs.Handle.hiden = false;
        }
      } else if (row.流程状态 == "已退回" || row.流程状态 == "已保存") {
        // this.$refs.AddTransfer.form = row;
        // this.$refs.AddTransfer.titleDialog = "资产转移单";
        // this.$refs.AddTransfer.form.申请人 = this.$store.getters.姓名;
        // this.$refs.AddTransfer.form.申请人Id = this.$store.getters.id_用户;
        // this.$refs.AddTransfer.form.申请日期 =
        //   this.dayjs().format("YYYY-MM-DD");
        // this.$refs.AddTransfer.get_storagelocation();
        // this.$refs.AddTransfer.get_allschooldepartment();
        // this.$refs.AddTransfer.get_schoolresponseperson();
        // this.$refs.AddTransfer.gettable();
        if (row.流程状态 == "已退回") {
          this.$refs.AddTransfer.form = row;
          this.$refs.AddTransfer.titleDialog = "资产转移单";
          this.$refs.AddTransfer.form.申请人 = this.$store.getters.姓名;
          this.$refs.AddTransfer.form.申请人Id = this.$store.getters.id_用户;
          this.$refs.AddTransfer.form.申请日期 =
            this.dayjs().format("YYYY-MM-DD");
          this.$refs.AddTransfer.get_storagelocation();
          this.$refs.AddTransfer.get_allschooldepartment();
          this.$refs.AddTransfer.get_schoolresponseperson();
          this.$refs.AddTransfer.gettable();
          this.$refs.AddTransfer.hiden = true;
          if (row.负责人Id != 0) {
            this.$refs.AddTransfer.form.负责人value = {
              id: row.负责人Id,
              name: row.负责人名称,
            };
          }
          if (row.归属部门Id != 0) {
            this.$refs.AddTransfer.form.归属部门value = {
              部门Id: row.归属部门Id,
              部门名称: row.归属部门,
              二级机构Id: this.$store.getters.id_二级部门,
            };
          }
          if (row.存放地点Id != 0) {
            this.$refs.AddTransfer.form.存放地点value = {
              二级机构ID: this.$store.getters.id_二级部门,
              存放地点一级ID: 6,
              存放地点二级ID: row.存放地点Id,
              房间名称: row.存放地点,
              存放地点: row.变更新存放地点,
              存放地点一级: row.变更新存放地点一级
            };
          }

          this.$refs.AddTransfer.dialogVisible = true;
        } else if (row.流程状态 == "已保存") {
          this.$router.push({ path: "/transfers", query: { data: row } });
          // this.$refs.AddTransfer.hiden = false;
        }
      }
    },
    select() {
      this.onload();
    },
    openAdd() {
      var data = {
        departmentone: this.$store.getters.id_一级部门,
        departmenttwo: this.$store.getters.id_二级部门,
      };
      get_querytime(data).then((res) => {
        if (res.data == "是") {
          this.msg("警告", "当前存在未封存账期,不允许发起资产转移!");
          return;
        } else {
          this.$router.push({ path: "/transfers" });
          return;
          this.$refs.AddTransfer.titleDialog = "资产转移单";
          this.$refs.AddTransfer.form.流程状态 = "待审核";
          this.$refs.AddTransfer.form.申请人 = this.$store.getters.姓名;
          this.$refs.AddTransfer.form.申请人Id = this.$store.getters.id_用户;
          this.$refs.AddTransfer.form.申请日期 =
            this.dayjs().format("YYYY-MM-DD");
          this.$refs.AddTransfer.form.联系方式 = this.$store.getters.手机;
          if (this.$refs.AddTransfer.form.联系方式 === "") {
            this.$refs.AddTransfer.form.联系方式 = "暂无联系方式";
          }
          this.$refs.AddTransfer.get_storagelocation();
          this.$refs.AddTransfer.get_allschooldepartment();
          this.$refs.AddTransfer.get_schoolresponseperson();
          this.$refs.AddTransfer.dialogVisible = true;
          this.$refs.AddTransfer.hiden = false;
        }
      });
    },
    onload() {
      this.loading = true;
      this.pageinfo.fk_user = this.$store.getters.id_用户;
      this.pageinfo.fk_role = this.$store.getters.id_角色;
      get_assetstransferdatal(this.pageinfo).then((res) => {
        this.loading = false;
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
      this.pageinfo.pageNum = val;
      this.onload();
    },
  },
  beforeMount() {
    this.onload();
  },
};
</script>

<style>
</style>