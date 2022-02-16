<template>
  <div style="margin: 1%">
    <el-form
      ref="ruleForm"
      v-model="form"
      :label-position="labelPosition"
      inline
      size="medium"
    >
      <el-button type="text" @click="openAdd" class="el-icon-plus"
        >新增资产入库</el-button
      >
      <!-- <el-upload
        class="upload"
        action=""
        :multiple="false"
        :show-file-list="false"
        accept=".xls"
        :http-request="httpRequest"
      >
        原始数据导入
      </el-upload> -->
      <div style="float: right; margin-right: 10px">
        <el-form-item
          label="流程状态"
          :label-width="formLabelWidth"
          prop="remark"
        >
          <el-select v-model="form.flow_state" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-tooltip
            class="item"
            effect="dark"
            content="模糊查询字段包括:单据编号\申请人\取得方式"
            placement="top"
          >
            <el-input
              v-model="form.content"
              placeholder="模糊查询"
              clearable
            ></el-input>
          </el-tooltip>
        </el-form-item>
        <el-button @click="submit" icon="el-icon-search" size="medium "
          >搜索</el-button
        >
      </div>
    </el-form>
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
      <el-table-column label="申请人" prop="申请人" />
      <el-table-column label="申请日期" prop="申请日期" />
      <el-table-column label="备注信息" prop="备注" />
      <el-table-column fixed="right" width="120" label="">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handle(scope.row)"
            v-if="viewhandle(scope.row)"
            >处理</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="handle(scope.row)"
            v-if="viewlook(scope.row)"
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
          :current-page="form.pageNum"
          :page-sizes="form.pagesizes"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.count"
        ></el-pagination>
      </el-col>
    </el-row>
    <AddPurchase ref="AddPurchase" @onload="onload" />
    <Handle ref="Handle" @onload="onload" />
    <Yanshou ref="Yanshou" @onload="onload" />
    <See ref="See" @onload="onload" />
  </div>
</template>

<script>
import XLSX from "xlsx";
import { get_purchaseacceptance, emport } from "@/api/purchaseacceptancehandle";
import Handle from "./components/Handle.vue";
import AddPurchase from "./components/addPurchase.vue";
import Yanshou from "./components/yanshou.vue";
import See from "./components/see.vue";

export default {
  name: "Purchase",
  components: { AddPurchase, Handle, Yanshou, See },
  data() {
    return {
      state: "1",
      loading: false,
      tableData: [],
      labelPosition: "left", // 对齐方向
      formLabelWidth: "100px", // label宽度
      options: [
        {
          value: "待验收",
          label: "待验收"
        },
        {
          value: "待记账",
          label: "待记账"
        },
        {
          value: "已记账",
          label: "已记账"
        },
        {
          value: "已退回",
          label: "已退回"
        },
        {
          value: "已保存",
          label: "草稿箱"
        }
      ],
      form: {
        pageNum: 1, //第几页
        pageSize: 10, //一页多少条
        count: 0, //数据总数
        pagesizes: [10, 20, 30, 50],
        fk_user: this.$store.getters.id_用户,
        fk_role: this.$store.getters.id_角色
      } //搜索条件
    };
  },
  methods: {
    // 处理界面
    viewhandle(row) {
      if (
        row.流程状态 != "已记账" &&
        row.申请人ID != this.$store.getters.id_用户
      ) {
        return true;
      }
    },
    // 查看界面
    viewlook(row) {
      if (row.流程状态 == "已记账") {
        return true;
      } else if (
        row.流程状态 != "已记账" &&
        row.申请人ID == this.$store.getters.id_用户
      ) {
        return true;
      }
    },
    // 处理
    handle(row) {
      // console.log(row);
      if (row.流程状态 == "已保存") {
        if (this.$store.getters.角色名称 != "资产管理员") {
          this.msg("警告", "需要资产管理员处理");
          return;
        }
        this.$router.push({ path: "handlePurchases", query: { data: row } });
        return;
        this.$refs.AddPurchase.form = row;
        this.$refs.AddPurchase.form.取得方式 = row.购置方式;
        this.$refs.AddPurchase.onemoretime(row.id);
        this.$refs.AddPurchase.titleDialog = "固定资产入库单";
        this.$refs.AddPurchase.selectgys(row.供应商);
        this.$refs.AddPurchase.dialogVisible = true;
      } else if (row.流程状态 == "待记账") {
        if (this.$store.getters.角色名称 == "资产管理员") {
          if (row.申请人ID == this.$store.getters.id_用户) {
            this.$refs.Handle.form = row;
            this.$refs.Handle.form.cxtext = "撤 销";
            this.$refs.Handle.onload(row.id);
            this.$refs.Handle.dialogVisible = true;
            this.$refs.Handle.dis = false;
          }
        } else if (this.$store.getters.角色名称 == "财务") {
          this.$refs.Handle.form = row;
          this.$refs.Handle.form.btntext = "确认记账";
          this.$refs.Handle.form.qxtext = "退 回";
          this.$refs.Handle.dialogVisible = true;
          this.$refs.Handle.onload();
        } else {
          this.msg("警告", "需要财务处理");
          return;
        }
      } else if (row.流程状态 == "待验收") {
        if (row.申请人ID == this.$store.getters.id_用户) {
          this.$refs.Yanshou.form = row;
          this.$refs.Yanshou.onload(row.id);
          this.$refs.Yanshou.dialogVisible = true;
          this.$refs.Yanshou.dis = false;
          return;
        }
        if (this.$store.getters.角色名称 != "物资管理员") {
          this.msg("警告", "需要物资管理员处理");
          return;
        }
        this.$refs.Yanshou.form = row;
        this.$refs.Yanshou.onload();
        this.$refs.Yanshou.dis = true;
        this.$refs.Yanshou.dialogVisible = true;
      } else if (row.流程状态 == "已退回") {
        if (row.供应商 === "0") {
          row.供应商 = "";
        }
        this.$refs.See.form = row;
        this.$refs.See.onload();
        this.$refs.See.height = 350;
        this.$refs.See.dialogVisible = true;
      } else if (row.流程状态 == "已记账") {
        this.$refs.See.form = row;
        this.$refs.See.onload(row.id);
        this.$refs.See.height = 350;
        this.$refs.See.dialogVisible = true;
      }

      // this.$refs.Handle.dialogVisible=true;
    },
    // 打开新增
    openAdd() {
      // this.$router.push({ path: "purchase", query: { data: row } });
      this.$router.push({ path: "purchases" });
      return;
      this.$refs.AddPurchase.titleDialog = "固定资产入库单";
      this.$refs.AddPurchase.form = {
        申请日期: this.dayjs().format("YYYY-MM-DD"),
        申请人: this.$store.getters.姓名, //申请人
        流程状态: "待记账",
        流程代码: 1,
        取得日期: "",
        供应商创建: "",
        联系方式: ""
      };

      this.$refs.AddPurchase.tableData = [];
      this.$refs.AddPurchase.dialogVisible = true;
      this.$refs.AddPurchase.revoke = false;
    },
    // 查询
    submit() {
      // this.form.
      this.onload();
    },
    onload() {
      this.loading = true;
      get_purchaseacceptance(this.form).then(res => {
        this.loading = false;
        this.tableData = res.data;
        this.form.count = res.count;
      });
    },
    //控制每页显示条数
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.onload();
    },
    //第几页
    handleCurrentChange(val) {
      this.form.pageNum = val;
      this.onload();
    }
  },
  beforeMount() {
    this.onload();
    if (this.$store.getters.二级部门名称 == "苏州市汉语国际推广中学") {
      this.options = [
        {
          value: "待验收",
          label: "待验收"
        },
        {
          value: "待记账",
          label: "待记账"
        },
        {
          value: "已记账",
          label: "已记账"
        },
        {
          value: "已退回",
          label: "已退回"
        },
        {
          value: "已保存",
          label: "草稿箱"
        }
      ];
    } else {
      this.options = [
        {
          value: "待记账",
          label: "待记账"
        },
        {
          value: "已记账",
          label: "已记账"
        },
        {
          value: "已退回",
          label: "已退回"
        },
        {
          value: "已保存",
          label: "草稿箱"
        }
      ];
    }
  }
};
</script>

<style></style>
