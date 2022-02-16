<template>
  <div style="margin: 1%">
    <el-form
      ref="ruleForm"
      :label-position="labelPosition"
      :model="form"
      :inline="true"
    >
      <el-form-item label="" :label-width="formLabelWidth" prop="remark">
        <el-radio-group v-model="radio" @change="radiochange">
          <el-radio :label="3">变动单</el-radio>
          <el-radio :label="6">明细</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="查询范围"
        :label-width="formLabelWidth"
        v-show="hidenAll"
        prop="remark"
      >
        <el-select v-model="pageinfo.查询范围" placeholder="请选择" clearable>
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
      <el-form-item label="关键字" :label-width="formLabelWidth" prop="remark">
        <el-tooltip
          content="关键字段包括:单据编号\申请人\申请日期"
          placement="top"
        >
          <el-input
            v-model="pageinfo.keycontent"
            placeholder="请输入内容"
            clearable
          ></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item
        label="申请时间"
        :label-width="formLabelWidth"
        prop="remark"
      >
        <el-date-picker
          v-model="pageinfo.date1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-drawer :visible.sync="drawer" :direction="direction"
        ><div style="margin: 0 5% 0 5%">
          <el-form-item
            label="变动方式"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-select
              v-model="pageinfo.changeway"
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
          <div
            slot="footer"
            class="dialog-footer"
            style="text-align: center; margin-top: 2%"
          >
            <el-button size="small" @click="submit" type="primary"
              >查询</el-button
            >
          </div>
        </div>
      </el-drawer>
      <el-button size="small" @click="more" type="primary">更多</el-button>
      <el-button size="small" @click="submit" type="primary">查询</el-button>
      <el-dropdown @command="handleCommanddao" style="float: right">
        <el-button type="warning">
          导出
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="导出选中">导出选中</el-dropdown-item>
          <el-dropdown-item command="导出全部">导出全部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-form>
    <div v-show="dis">
      <el-table
        ref="DataTable"
        v-loading="loading"
        :data="tableData"
        border
        stripe
        :row-key="getRowKeys"
        :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
        style="width: 100%; margin-top: 1%"
      >
        <el-table-column
          type="selection"
          :reserve-selection="true"
          width="55"
        ></el-table-column>
        <el-table-column
          label="序号"
          type="index"
          width="50"
          :reserve-selection="true"
        ></el-table-column>
        <el-table-column label="流程状态" prop="流程状态" />
        <el-table-column label="单据编号" prop="单据编号" />
        <el-table-column label="申请人" prop="申请人" />
        <el-table-column label="申请日期" prop="申请日期" />
        <el-table-column label="变动金额合计" prop="变动金额合计" align="right">
          <template slot-scope="scope">
            {{ scope.row.变动金额合计.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column label="变动方式" prop="变动方式" />
        <el-table-column label="变动原因" prop="变动原因" />
        <el-table-column fixed="right" width="120" label="">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handle(scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="!dis">
      <el-table
        ref="table"
        v-loading="loading"
        :data="tableDatas"
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
        <el-table-column
          prop="保留原值"
          label="原值"
          align="right"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="保留净值"
          label="净值"
          align="right"
          :show-overflow-tooltip="true"
        >
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
    </div>
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
    <Handle ref="Handle" />
  </div>
</template>

<script>
import { get_allschooldepartments } from "@/api/assetaccounthandle";
import XLSX from "xlsx";
import {
  get_originalaluequerydetail,
  get_originalaluequery
} from "@/api/analydtathandle";
import Handle from "./components/Handle.vue";
export default {
  components: { Handle },
  data() {
    return {
      options: [
        {
          label: "盘盈",
          value: "盘盈"
        },
        {
          label: "资产核资增加",
          value: "资产核资增加"
        },
        {
          label: "其他增加",
          value: "其他增加"
        },
        {
          label: "盘亏",
          value: "盘亏"
        },
        {
          label: "资产核资减少",
          value: "资产核资减少"
        },
        {
          label: "其他减少",
          value: "其他减少"
        }
      ],
      form: {},
      hidenAll: false,
      查询范围options: [],
      labelPosition: "left",
      formLabelWidth: "80px",
      tableData: [],
      tableDatas: [],
      loading: false,
      pageinfo: {
        pageNum: 1, //第几页
        pageSize: 10, //一页多少条
        count: 0, //数据总数
        pagesizes: [10, 20, 30, 50],
        departmentone: this.$store.getters.id_一级部门
      }, //搜索条件
      radio: 3,
      dis: true,
      drawer: false,
      direction: "rtl"
    };
  },
  methods: {
    submit() {
      if (this.radio == 3) {
        this.onload();
      } else {
        this.onloads();
      }
    },
    get_allschooldepartments() {
      get_allschooldepartments({
        departmentone: this.$store.getters.id_一级部门
      }).then(res => {
        this.查询范围options = res.data;
        if (this.$store.getters.id_二级部门 != 0) {
          this.hidenAll = false;
          this.pageinfo.查询范围 = this.$store.getters.id_二级部门;
        } else {
          this.hidenAll = true;
        }
      });
    },
    onload() {
      if (this.pageinfo.date1 != undefined) {
        if (this.pageinfo.date1.length != 0 && this.pageinfo.date1 != null) {
          this.pageinfo.applicantbegin = this.pageinfo.date1[0];
          this.pageinfo.applicantend = this.pageinfo.date1[1];
        } else {
          this.pageinfo.applicantbegin = "";
          this.pageinfo.applicantend = "";
        }
      } else {
        this.pageinfo.applicantbegin = "";
        this.pageinfo.applicantend = "";
      }
      this.pageinfo.departmenttwo = this.pageinfo.查询范围;
      if (this.pageinfo.departmenttwo == "") {
        this.pageinfo.departmenttwo = 0;
      }
      this.loading = true;
      get_originalaluequery(this.pageinfo).then(res => {
        this.tableData = res.data;
        this.pageinfo.count = res.count;
        this.loading = false;
      });
    },
    onloads() {
      if (this.pageinfo.date1 != undefined) {
        if (this.pageinfo.date1.length != 0 && this.pageinfo.date1 != null) {
          this.pageinfo.applicantbegin = this.pageinfo.date1[0];
          this.pageinfo.applicantend = this.pageinfo.date1[1];
        } else {
          this.pageinfo.applicantbegin = "";
          this.pageinfo.applicantend = "";
        }
      } else {
        this.pageinfo.applicantbegin = "";
        this.pageinfo.applicantend = "";
      }
      this.pageinfo.departmenttwo = this.pageinfo.查询范围;
      if (this.pageinfo.departmenttwo == "") {
        this.pageinfo.departmenttwo = 0;
      }
      this.loading = true;
      get_originalaluequerydetail(this.pageinfo).then(res => {
        this.tableDatas = res.data;
        for (let i of this.tableDatas) {
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
    handle(row) {
      this.$refs.Handle.form = row;
      this.$refs.Handle.gettable(row.Id);
      this.$refs.Handle.dialogVisible = true;
    },
    more() {
      this.drawer = true;
    },
    handleCommanddao(row) {
      if (row == "导出选中") {
        if (this.$refs.DataTable.selection.length == 0) {
          this.msg("警告", "请选择导出数据!");
          return;
        }
        this.exportExcel(this.$refs.DataTable.selection);
      } else if (row == "导出全部") {
        if (this.tableData.length == 0) {
          this.msg("警告", "不能打印空数据!");
          return;
        }
        if (this.pageinfo.date1 != undefined) {
          if (this.pageinfo.date1.length != 0 && this.pageinfo.date1 != null) {
            this.pageinfo.applicantbegin = this.pageinfo.date1[0];
            this.pageinfo.applicantend = this.pageinfo.date1[1];
          } else {
            this.pageinfo.applicantbegin = "";
            this.pageinfo.applicantend = "";
          }
        } else {
          this.pageinfo.applicantbegin = "";
          this.pageinfo.applicantend = "";
        }

        var data = JSON.parse(JSON.stringify(this.pageinfo));
        data.pageNum = 1;
        data.pageSize = 10000;
        get_originalaluequery(data).then(res => {
          this.exportExcel(res.data);
        });
      }
    },
    //导出exl资产
    exportExcel(data) {
      // console.log(data);
      var _data = [
        [
          "流程状态",
          "单据编号",
          "申请人",
          "申请日期",
          "变动金额合计",
          "变动方式",
          "变动原因"
        ]
      ];
      for (let i in data) {
        var str = [
          data[i].流程状态,
          data[i].单据编号,
          data[i].申请人,
          data[i].申请日期,
          data[i].变动金额合计,
          data[i].变动方式,
          data[i].变动原因
        ];
        _data.push(str);
      }
      // console.log(_data)
      // return;
      const ws = XLSX.utils.aoa_to_sheet(_data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      /* save to file */
      XLSX.writeFile(wb, "" + this.dayjs().format("YYYY-MM-DD") + ".xlsx");
    },
    //多选框
    getRowKeys(row) {
      return row.id;
    },
    //   切换
    radiochange(val) {
      // console.log(val);
      this.tableData = [];
      this.tableDatas = [];
      this.pageinfo.count = 0;
      if (val != 3) {
        this.dis = false;
      } else {
        this.dis = true;
      }
    },
    //控制每页显示条数
    handleSizeChange(val) {
      this.pageinfo.pageSize = val;
      //   this.onload();
      if (this.radio == 3) {
        this.onload();
      } else {
        // console.log("xiang");
        this.onloads();
      }
    },
    maturity(row) {
      // console.log("是否到期:", row.是否到期);
      if (row.是否到期 == 1) {
        return "否";
      } else {
        return "是";
      }
    },
    //第几页
    handleCurrentChange(val) {
      // console.log(val)
      this.pageinfo.pageNum = val;
      //   this.onload();
      if (this.radio == 3) {
        this.onload();
      } else {
        // console.log("xiang");
        this.onloads();
      }
    }
  },
  beforeMount() {
    this.get_allschooldepartments();
  }
};
</script>

<style></style>
