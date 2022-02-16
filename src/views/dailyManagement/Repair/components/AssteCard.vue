<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="77%"
    center
    top="8vh"
    append-to-body
    :close-on-click-modal="false"
  >
    <div style="overflow: hidden">
      <el-form
        :model="form"
        ref="form"
        label-width="80px"
        class="demo-ruleForm"
        size="medium"
        :inline="true"
        style="float: right"
      >
        <el-form-item label="资产分类" prop="departmentwo">
          <el-cascader
            style="width: 100%"
            ref="AssetClasses"
            :options="AssetClassesoptions"
            :props="defaultProps"
            filterable
            :show-all-levels="false"
            clearable
            v-model="pageinfo.AssetClassesvalue"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="归属信息" prop="departmentwo">
          <el-cascader
            style="width: 100%"
            ref="AssetClasses"
            :options="归属options"
            :props="归属defaultProps"
            filterable
            :show-all-levels="false"
            clearable
            v-model="pageinfo.归属value"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="模糊查询" prop="departmentwo">
          <el-tooltip
            class="item"
            effect="dark"
            content="模糊查询字段包括:资产编号\资产名称\规格型号\资产品牌\责任人\使用人"
            placement="top"
          >
            <el-input
              v-model="pageinfo.content"
              placeholder="模糊查询"
              clearable
            ></el-input>
          </el-tooltip>
        </el-form-item>
        <el-button @click="submit" icon="el-icon-search" size="medium "
          >搜索</el-button
        >
      </el-form>
    </div>
    <el-table
      :data="tableData"
      ref="DataTable"
      style="width: 100%; margin-top: 1%"
      v-loading="loading"
      :highlight-current-row="true"
      border
      stripe
      max-height="470px"
      :fit="true"
      :header-cell-style="{
        'text-align': 'center',
        background: '#eef1f6'
      }"
      :row-key="getRowKeys"
      @selection-change="selectionchange"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true">
      </el-table-column>
      <el-table-column
        label="序号"
        type="index"
        width="50"
        :reserve-selection="true"
      ></el-table-column>

      <el-table-column prop="资产Id" label="资产Id" v-if="false">
      </el-table-column>
      <el-table-column
        prop="资产编号"
        label="资产编号"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="一级分类名称"
        label="资产分类"
        :show-overflow-tooltip="true"
      >
        <!-- <template slot-scope="scope">
          <span
            >{{ scope.row.一级分类名称 }}/{{ scope.row.二级分类名称 }}/{{
              scope.row.三级分类名称
            }}/{{ scope.row.四级分类名称 }}</span
          >
        </template> -->
      </el-table-column>
      <el-table-column
        prop="资产名称"
        label="资产名称"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="规格"
        label="规格"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="型号"
        label="型号"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="使用方向" label="使用方向"> </el-table-column>
      <el-table-column prop="数量" label="数量(个)"> </el-table-column>
      <el-table-column
        prop="保留原值"
        label="原值"
        :show-overflow-tooltip="true"
        align="right"
      >
      </el-table-column>
      <el-table-column prop="保留净值" label="净值" align="right">
      </el-table-column>
      <el-table-column
        prop="存放地点"
        label="存放地点"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="所属部门"
        label="归属部门"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="负责人" label="负责人"> </el-table-column>
      <el-table-column prop="使用人" label="使用人"> </el-table-column>
      <el-table-column
        prop="购置日期"
        label="取得日期"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="资产状态" label="资产状态"> </el-table-column>

      <el-table-column prop="是否到期" label="是否到期">
        <template slot-scope="scope">
          <span>{{ maturity(scope.row) }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="二级机构名称"
        label="学校名称"
        :show-overflow-tooltip="true"
      >
      </el-table-column> -->
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
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <el-popconfirm
        title="再次确认确定"
        @confirm="btnok('form')"
        style="margin-right: 20px"
      >
        <el-button type="primary" class="el-icon-check" slot="reference">
          确 定</el-button
        >
      </el-popconfirm>
      <el-button class="el-icon-close" @click="dialogVisible = false">
        取 消</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
// import { get_accountleader } from "@/api/assetaccounthandle";
import { get_accountbyId } from "@/api/assetlendinghandle";
import { get_alldepartmentpeople } from "@/api/assetaccounthandle";
import { get_categoryalldata } from "@/api/categoryhandle";
export default {
  data() {
    return {
      dialogTitle: "添加资产",
      dialogVisible: false,
      AssetClassesoptions: [],
      AssetClassesvalue: "",
      form: {},
      loading: false,
      tableData: [],
      tablerow: [],
      pageinfo: {
        pageNum: 1, //第几页
        pageSize: 10, //一页多少条
        count: 0, //数据总数
        pagesizes: [10, 20, 30, 50],
        fk_user: 0,
        content: "",
        AssetClassesvalue: "",
        归属value: ""
      }, //搜索条件
      defaultProps: {
        children: "children",
        label: "分类名称",
        value: "id",
        checkStrictly: "true"
      },
      归属defaultProps: {
        children: "children",
        label: "name",
        value: "id",
        checkStrictly: "true"
      },
      归属options: []
    };
  },
  methods: {
    selectionchange(val) {
      if (val.length > 1) {
        this.$refs.DataTable.toggleRowSelection(val[0], false);
        val.splice(0, 1);
      }
      this.tablerow = val;
    },
    btnok() {
      console.log(this.$refs.DataTable.selection);
      this.$emit("tableSelect", this.$refs.DataTable.selection);
      this.dialogVisible = false;
    },
    // 归属信息
    get_alldepartmentpeople() {
      get_alldepartmentpeople({
        departmentwo: this.$store.getters.id_二级部门
      }).then(res => {
        this.归属options = res.data;
      });
    },
    submit() {
      this.onload();
    },
    onload() {
      if (
        this.pageinfo.AssetClassesvalue == undefined ||
        this.pageinfo.AssetClassesvalue == ""
      ) {
        this.pageinfo.categoryone = 0;
        this.pageinfo.categorytwo = 0;
        this.pageinfo.categorythree = 0;
        this.pageinfo.categoryfour = 0;
      }
      if (
        this.pageinfo.归属value == undefined ||
        this.pageinfo.归属value == ""
      ) {
        this.pageinfo.departmentId = 0;
        this.pageinfo.peopleId = 0;
      }
      if (this.pageinfo.AssetClassesvalue.length > 0) {
        this.pageinfo.categoryone = this.pageinfo.AssetClassesvalue[0];
      }
      if (this.pageinfo.AssetClassesvalue.length > 1) {
        this.pageinfo.categorytwo = this.pageinfo.AssetClassesvalue[1];
      }
      if (this.pageinfo.AssetClassesvalue.length > 2) {
        this.pageinfo.categorythree = this.pageinfo.AssetClassesvalue[2];
      }
      if (this.pageinfo.AssetClassesvalue.length > 3) {
        this.pageinfo.categoryfour = this.pageinfo.AssetClassesvalue[3];
      }
      if (this.pageinfo.归属value.length > 0) {
        this.pageinfo.departmentId = this.pageinfo.归属value[0];
        this.pageinfo.peopleId = 0;
      }
      if (this.pageinfo.归属value.length > 1) {
        this.pageinfo.peopleId = this.pageinfo.归属value[1];
      }
      this.loading = true;
      this.pageinfo.fk_user = this.$store.getters.id_用户;
      get_accountbyId(this.pageinfo).then(res => {
        this.tableData = res.data;
        for (let i of this.tableData) {
          if (i.存放地点 === "") {
            i.存放地点 = i.建筑名称;
          } else {
            i.存放地点 = i.建筑名称 + "/" + i.存放地点;
          }
        }
        this.pageinfo.count = res.count;
        this.loading = false;
      });
    },
    //多选框
    getRowKeys(row) {
      return row.资产Id;
    },
    // 类别初始化
    get_categoryalldata() {
      get_categoryalldata().then(res => {
        this.AssetClassesoptions = res.data;
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
    maturity(row) {
      // console.log("是否到期:", row.是否到期);
      if (row.是否到期 == 1) {
        return "否";
      } else {
        return "是";
      }
    }
  },
  beforeMount() {
    this.get_categoryalldata();
  }
};
</script>

<style></style>
