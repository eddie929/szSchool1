<template>
  <div style="margin: 1%">
    <el-form
      ref="ruleForm"
      :label-position="labelPosition"
      :model="form"
      :inline="true"
    >
      <el-form-item
        label="查询范围"
        :label-width="formLabelWidth"
        prop="remark"
      >
        <el-select
          v-model="pageinfo.查询范围"
          placeholder="请选择"
          clearable
         
          :disabled="hidenAll"
        >
          <el-option
            v-for="item in 查询范围options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            size="medium"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="告警时间"
        :label-width="formLabelWidth"
        prop="remark"
      >
        <el-date-picker
          v-model="pageinfo.value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
         
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="告警位置"
        :label-width="formLabelWidth"
        prop="remark"
      >
        <el-select
          v-model="pageinfo.告警位置"
          placeholder="请选择"
          clearable
         
        >
          <el-option
            v-for="item in 告警位置options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            size="medium"
          >
          </el-option>
        </el-select>
      </el-form-item>
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
        prop="所属分类"
        label="资产分类"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span
            >{{ scope.row.一级分类名称 }}/{{ scope.row.二级分类名称 }}/{{
              scope.row.三级分类名称
            }}/{{ scope.row.四级分类名称 }}</span
          >
        </template>
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
      <el-table-column prop="数量" label="数量(个)" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="原值" label="原值" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="净值" label="净值"> </el-table-column>
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

      <!-- <el-table-column prop="是否到期" label="是否到期">
          <template slot-scope="scope">
            <span>{{ maturity(scope.row) }}</span>
          </template>
        </el-table-column> -->
      <el-table-column
        prop="告警时间"
        label="告警时间"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="告警位置"
        label="告警位置"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="告警图像"
        label="告警图像"
        :show-overflow-tooltip="true"
      >
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
  get_allschooldepartments,
  get_storagelocation,
  get_alldepartmentpeople,
} from "@/api/assetaccounthandle";
export default {
  data() {
    return {
      form: {},
      查询范围options: [],
      告警位置options: [],
      labelPosition: "left",
      formLabelWidth: "80px",
      tableData: [],
      loading: false,
      pageinfo: {
        pageNum: 1, //第几页
        pageSize: 10, //一页多少条
        count: 0, //数据总数
        pagesizes: [10, 20, 30, 50],
      }, //搜索条件
      hidenAll:false,
    };
  },
  methods: {
    //   单位option
    get_allschooldepartments() {
      get_allschooldepartments({
        departmentone: this.$store.getters.id_一级部门,
      }).then((res) => {
        this.查询范围options = res.data;
        if (this.$store.getters.id_二级部门 == 0) {
          this.pageinfo.查询范围 = "";
          this.hidenAll = false;
          this.hidenOne = true;
        } else {
          this.pageinfo.查询范围 = this.$store.getters.id_二级部门;
          this.hidenAll = true;
          this.hidenOne = false;
        }
      });
    },
     //控制每页显示条数
    handleSizeChange(val) {
      this.pageinfo.pageSize = val;
      this.onload();
      // if (this.radio == 3) {
      //   this.onload();
      // } else {
      //   // console.log("xiang");
      //   this.onloads();
    },
    //第几页
    handleCurrentChange(val) {
      // console.log(val)
      this.pageinfo.pageNum = val;
      this.onload();
      // if (this.radio == 3) {
      //   this.onload();
      // } else {
      //   // console.log("xiang");
      //   this.onloads();
      // }
    },
  },
  beforeMount() {
    this.get_allschooldepartments();
  },
};
</script>

<style>
</style>