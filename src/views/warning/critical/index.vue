<template>
  <div style="margin: 1%">
    <el-form
      ref="ruleForm"
      :label-position="labelPosition"
      :model="form"
      :inline="true"
    >
      <el-form-item
        v-show="hidenAll"
        label="查询范围"
        :label-width="formLabelWidth"
        
      >
        <el-select
          v-model="pageinfo.查询范围"
          placeholder="请选择"
          clearable   

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
        label="资产分类"
        :label-width="formLabelWidth"
        prop="remark"
      >
        <AssteSort @getAssteSort="getAssteSort" />
      </el-form-item>
      <el-form-item
        label="临界到期"
        :label-width="formLabelWidth"
        prop="remark"
      >
        <el-select
          v-model="pageinfo.closetime"
          placeholder="请选择"
          clearable
          :disabled="ljdis"
        >
          <el-option
            v-for="item in 临界到期options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            size="medium"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="是否到期"
        :label-width="formLabelWidth"
        prop="remark"
      >
        <el-select
          v-model="pageinfo.Istime"
          placeholder="请选择"
          @change="sfchange"
        >
          <el-option
            v-for="item in 是否到期options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            size="medium"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-button size="small" @click="submit" type="primary">查询</el-button>
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
      <el-table-column prop="折旧年限" label="折旧年限"> </el-table-column>
      <el-table-column
        prop="到期时间"
        label="到期时间"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column prop="是否到期" label="是否到期"> </el-table-column>
      <el-table-column
        prop="学校名称"
        label="学校名称"
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
import AssteSort from "@/bitcomponents/assteSort/index";
import { get_allschooldepartments } from "@/api/assetaccounthandle";
import { get_assetsistotime } from "@/api/repoartmanegement";
export default {
  components: { AssteSort },
  data() {
    return {
      form: {},
      查询范围options: [],
      labelPosition: "left",
      formLabelWidth: "80px",
      tableData: [],
      loading: false,
      hidenAll: false,
      pageinfo: {
        pageNum: 1, //第几页
        pageSize: 10, //一页多少条
        count: 0, //数据总数
        pagesizes: [10, 20, 30, 50],
        Istime: 1,
        查询范围:""
      }, //搜索条件
      临界到期options: [
        {
          label: "1个月内到期",
          value: 1,
        },
        {
          label: "2个月内到期",
          value: 2,
        },
        {
          label: "3个月内到期",
          value: 3,
        },
        {
          label: "4个月内到期",
          value: 4,
        },
        {
          label: "5个月内到期",
          value: 5,
        },
        {
          label: "6个月内到期",
          value: 6,
        },
      ],
      是否到期options: [
        {
          label: "否",
          value: 1,
        },
        {
          label: "是",
          value: 0,
        },
      ],
      ljdis: false,
    };
  },
  methods: {
    // 查询
    submit() {
      this.onload();
    },
    updateViews(e) {
      this.$forceUpdate();
    },
    onload() {
      this.pageinfo.schoolone = this.$store.getters.id_一级部门;
      this.pageinfo.schooltwo = this.pageinfo.查询范围;
      var data = JSON.parse(JSON.stringify(this.pageinfo));
      if (data.closetime == "") {
        data.closetime = 0;
      }
      if (data.schooltwo == "") {
        data.schooltwo = 0;
      }
      this.loading = true;
      get_assetsistotime(data).then((res) => {
        this.tableData = res.data;
        this.pageinfo.count = res.count;
        this.loading = false;
      });
    },
    // 是否到期
    sfchange(val) {
      // console.log(val);
      if (val == 0) {
        this.pageinfo.closetime = "";
        this.ljdis = true;
      } else {
        this.ljdis = false;
      }
    },
    //   单位option
    get_allschooldepartments() {
      get_allschooldepartments({
        departmentone: this.$store.getters.id_一级部门,
      }).then((res) => {
        this.查询范围options = res.data;
        if (this.$store.getters.id_二级部门 == 0) {
          this.pageinfo.查询范围 = "";
          this.hidenAll = true;
          this.hidenOne = true;
        } else {
          this.pageinfo.查询范围 = this.$store.getters.id_二级部门;
          this.hidenAll = false;
          this.hidenOne = false;
        }
      });
    },
    // 资产分类
    getAssteSort(val) {
      // console.log(val);
      this.pageinfo.categoryone = val.categoryone;
      this.pageinfo.categorytwo = val.categorytwo;
      this.pageinfo.categorythree = val.categorythree;
      this.pageinfo.categoryfour = val.categoryfour;
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