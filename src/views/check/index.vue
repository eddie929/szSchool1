<template>
  <div style="margin: 1%">
    <el-button type="text" @click="openAdd" class="el-icon-plus"
      >创建盘点任务</el-button
    >
    <!-- <el-button type="primary" @click="openAdd" class="el-icon-plus"
      >创建盘点任务</el-button
    > -->
    <div style="float: right; margin-right: 10px">
      <el-form ref="ruleForm" :label-position="labelPosition" :inline="true">
        <el-form-item
          label="流程状态"
          :label-width="formLabelWidth"
          style="margin-left: 10px"
        >
          <el-select v-model="state" placeholder="请选择" @change="changeState">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="发布方"
          :label-width="formLabelWidth"
          style="margin-left: 10px"
          v-show="false"
        >
          <el-select v-model="department" placeholder="请选择">
            <el-option
              v-for="item in departmentOptions"
              :key="item.value"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="table"
      v-loading="loading"
      :data="tableData"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
      style="width: 100%; margin-top: 10px"
    >
      <el-table-column v-if="false" prop="id_用户" label="id" />
      <el-table-column type="index" label="序号" width="55" />
      <el-table-column label="流程状态" prop="流程状态" />
      <el-table-column
        label="单据编号"
        prop="单据编号"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="任务名称"
        prop="任务名称"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="开始日期" prop="开始时间" />
      <el-table-column label="截止日期" prop="结束时间" />
      <el-table-column
        label="盘点方式"
        prop="盘点方式"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="盘点范围" v-if="false" prop=""></el-table-column>
      <el-table-column
        label="发布方"
        prop="发布方"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="发布日期" prop="发布时间" />
      <el-table-column label="备注" prop="备注" :show-overflow-tooltip="true" />
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <span>
            <el-button
              type="text"
              size="mini"
              v-show="isShow(row)"
              @click="checkInventoryInformation(row)"
              >查看详情</el-button
            >
          </span>
          <span>
            <el-button
              v-show="isDistribution(row)"
              type="text"
              size="mini"
              @click="taskDistribution(row)"
              >分配任务</el-button
            >
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin: 20px 0px 20px 0px">
      <el-col :span="24">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageinfo.page"
          :page-sizes="pageinfo.pagesize"
          :page-size="pageinfo.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageinfo.count"
        ></el-pagination>
      </el-col>
    </el-row>
    <AddCheck ref="AddCheck" @Refresh="onload()" />
    <CheckInformation
      ref="checkInformation"
      @onload="onload"
      :aOptions="options"
    />
  </div>
</template>

<script>
import AddCheck from "./components/addCheck";
import CheckInformation from "./components/checkInformation.vue";
import {
  get_inventorylist,
  get_educationinventorylist
} from "@/api/inventoryhandle";
import { get_departmentall } from "@/api/syshandle";
export default {
  components: { AddCheck, CheckInformation },
  data() {
    return {
      options: ["全部", "未开始", "正在进行", "已结束"],
      departmentOptions: [
        "全部单位",
        this.$store.getters.二级部门名称,
        "教育局",
        "财政局"
      ],
      fooObj: {
        foo: 5
      },
      releaseOptions: [
        {
          value: "全部单位",
          label: "全部单位"
        }
      ],
      state: "全部",
      department: "全部单位",
      labelPosition: "left",
      formLabelWidth: "70px",
      loading: false,
      tableData: [],
      pageinfo: {
        page: 1, //第几页
        limit: 10, //一页多少条
        count: 0, //数据总数
        pagesize: [10, 20, 50]
      }
    };
  },
  //依赖注入传值
  provide() {
    return {
      newFoo: this.fooObj
    };
  },
  methods: {
    isShow(row) {
      // console.log("zheli:", row);
      if (this.$store.getters.id_二级部门 == 0) {
        return true;
      } else {
        if (row.教育局盘点ID == 0 && row.是否分配 == 0) {
          return true;
        } else if (row.教育局盘点ID > 0 && row.是否分配 == 1) {
          return true;
        } else {
          return false;
        }
      }
    },
    isDistribution(row) {
      if (this.$store.getters.id_二级部门 != 0) {
        if (row.教育局盘点ID > 0 && row.是否分配 == 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    //任务分配
    taskDistribution(row) {
      //跳页面
      this.$router.push({
        name: "AssignTasks",
        params: {
          rows: row,
          state: "分配任务"
        }
      });
    },
    //每页多少条数据
    handleSizeChange(val) {
      // this.requestdata.pageSize = val;
      this.pageinfo.limit = val;
      // this.requestdata.pageNum = 1;
      this.pageinfo.page = 1;
      // console.log(`每页 ${val} 条`);
      this.onload();
    },
    //当前第几页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // this.requestdata.pageNum = val;
      this.pageinfo.page = val;
      this.onload();
    },
    getid() {
      return this.inid;
    },
    //查看详情
    checkInventoryInformation(row) {
      // 引用组件
      // console.log(row.ID);
      // this.fooObj.foo = row.ID;
      // this.$refs.checkInformation.form = row;
      // this.$refs.checkInformation.inventorywindow = true;
      // this.$refs.checkInformation.onload();
      //跳页面
      this.$router.push({
        name: "checkInformationtest",
        params: {
          rows: row
        }
      });
    },
    //改变流程状态
    changeState(state) {
      this.onload();
    },
    //创建盘点
    openAdd() {
      if (this.$store.getters.职务 == "资产管理员") {
      } else if (this.$store.getters.id_二级部门 == 0) {
        //  v-show="this.$store.getters.id_二级部门 == 0"
      } else {
        this.$message.warning("您没有权限创建盘点任务,请联系管理员!");
      }
      //跳页面
      this.$router.push({ name: "createCheck", state: "分配任务" });
      // if (this.$store.getters.职务 == "资产管理员") {
      // } else if (this.$store.getters.id_二级部门 == 0) {
      //   //  v-show="this.$store.getters.id_二级部门 == 0"
      // } else {
      //   this.$message.warning("您没有权限创建盘点任务,请联系管理员!");
      // }
      // // this.$refs.AddCheck.hiddenArea = true;
      // // this.$router.push({ name: "createCheck" });
      // this.$refs.AddCheck.dialogTitle = "清查盘点-创建任务";
      // this.$refs.AddCheck.clearAllInfo("ruleForm");
      // this.$refs.AddCheck.onload();
      // this.$refs.AddCheck.dialogVisible = true;
    },
    //初始化
    onload() {
      let reqdata = {
        pageNum: this.pageinfo.page,
        pageSize: this.pageinfo.limit
      };
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      if (this.$store.getters.id_二级部门 == 0) {
        get_educationinventorylist(reqdata)
          .then(response => {
            if (response.code == 100) {
              console.table(response.data);
              this.tableData = response.data;
              this.pageinfo.count = response.count;
            }
            loading.close();
          })
          .catch(error => {
            loading.close();
          });
      } else {
        reqdata.fk_user = this.$store.getters.id_用户;
        reqdata.flow_state = this.state == "全部" ? "" : this.state;
        reqdata.publishone = this.$store.getters.id_一级部门;
        reqdata.publishtwo = this.$store.getters.id_二级部门;
        get_inventorylist(reqdata)
          .then(response => {
            if (response.code == 100) {
              console.table(response.data);
              this.tableData = response.data;
              this.pageinfo.count = response.count;
            }
            loading.close();
          })
          .catch(error => {
            loading.close();
          });
      }
    }
  },
  created() {
    this.onload();
  }
};
</script>

<style scoped></style>
