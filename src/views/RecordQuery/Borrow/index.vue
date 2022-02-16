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
          <el-radio :label="3">借还单</el-radio>
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
        label="借用时间"
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
            label="借用人"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-cascader
              style="width: 100%"
              ref="AssetClasses"
              :options="aoptions"
              :props="defaultProps"
              filterable
              :show-all-levels="false"
              clearable
              v-model="pageinfo.借用value"
            ></el-cascader>
          </el-form-item>
          <el-form-item
            label="借出人"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-cascader
              style="width: 100%"
              ref="AssetClasses"
              :options="aoptions"
              :props="defaultProps"
              filterable
              :show-all-levels="false"
              clearable
              v-model="pageinfo.借出value"
            ></el-cascader>
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
import XLSX from "xlsx";
import { get_schoolresponseperson } from "@/api/assetaccounthandle";
import { get_allschooldepartments } from "@/api/assetaccounthandle";
import {
  get_borrowreback,
  get_borrowrebackdetail
} from "@/api/analydtathandle";
import Handle from "./components/Handle.vue";
export default {
  components: { Handle },
  data() {
    return {
      form: {},
      labelPosition: "left",
      formLabelWidth: "80px",
      tableData: [],
      查询范围options: [],
      tableDatas: [],
      loading: false,
      pageinfo: {
        pageNum: 1, //第几页
        pageSize: 10, //一页多少条
        count: 0, //数据总数
        pagesizes: [10, 20, 30, 50]
      }, //搜索条件
      radio: 3,
      aoptions: [],
      defaultProps: {
        children: "children2",
        label: "name",
        value: "id"
      },
      dis: true,
      drawer: false,
      direction: "rtl",
      hidenAll: false
    };
  },
  methods: {
    //多选框
    getRowKeys(row) {
      return row.id;
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
        if (this.pageinfo.借用value != undefined) {
          // console.log(1);
          if (this.pageinfo.借用value.length != 0) {
            this.pageinfo.borrowId = this.pageinfo.借用value[1];
          } else {
            this.pageinfo.borrowId = 0;
          }
        }
        if (this.pageinfo.借出value != undefined) {
          // console.log(2);
          if (this.pageinfo.借出value.length != 0) {
            this.pageinfo.borrowoutId = this.pageinfo.借出value[1];
          } else {
            this.pageinfo.borrowoutId = 0;
          }
        }
        if (this.pageinfo.date1 != undefined) {
          if (this.pageinfo.date1.length != 0 && this.pageinfo.date1 != null) {
            this.pageinfo.borrowbegin = this.pageinfo.date1[0];
            this.pageinfo.borrowend = this.pageinfo.date1[1];
          } else {
            this.pageinfo.borrowbegin = "";
            this.pageinfo.borrowend = "";
          }
        } else {
          this.pageinfo.borrowbegin = "";
          this.pageinfo.borrowend = "";
        }

        var data = JSON.parse(JSON.stringify(this.pageinfo));
        data.pageNum = 1;
        data.pageSize = 10000;
        get_borrowreback(data).then(res => {
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
          "借用人",
          "提交时间",
          "借用时间",
          "借出人",
          "备注信息"
        ]
      ];
      for (let i in data) {
        var str = [
          data[i].流程状态,
          data[i].单据编号,
          data[i].借用人,
          data[i].提交时间,
          data[i].借用时间,
          data[i].借出人,
          data[i].备注信息
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
    //   查看
    handle(row) {
      this.$refs.Handle.form = row;
      this.$refs.Handle.onload();
      this.$refs.Handle.dialogVisible = true;
    },
    //   搜索
    submit() {
      if (this.radio == 3) {
        this.onload();
      } else {
        this.onloads();
      }
    },
    //   切换
    radiochange(val) {
      // console.log(val);
      // this.pageinfo.count = 0;
      if (val != 3) {
        this.dis = false;
      } else {
        this.dis = true;
      }
      this.pageinfo.count = 0;
      this.tableData = [];
      this.tableDatas = [];
    },
    onload() {
      if (this.pageinfo.借用value != undefined) {
        // console.log(1);
        if (this.pageinfo.借用value.length != 0) {
          this.pageinfo.borrowId = this.pageinfo.借用value[1];
        } else {
          this.pageinfo.borrowId = 0;
        }
      }
      if (this.pageinfo.借出value != undefined) {
        // console.log(2);
        if (this.pageinfo.借出value.length != 0) {
          this.pageinfo.borrowoutId = this.pageinfo.借出value[1];
        } else {
          this.pageinfo.borrowoutId = 0;
        }
      }
      if (this.pageinfo.date1 != undefined) {
        if (this.pageinfo.date1.length != 0 && this.pageinfo.date1 != null) {
          this.pageinfo.borrowbegin = this.pageinfo.date1[0];
          this.pageinfo.borrowend = this.pageinfo.date1[1];
        } else {
          this.pageinfo.borrowbegin = "";
          this.pageinfo.borrowend = "";
        }
      } else {
        this.pageinfo.borrowbegin = "";
        this.pageinfo.borrowend = "";
      }
      this.pageinfo.departmentone = this.$store.getters.id_一级部门;
      this.pageinfo.departmenttwo = this.pageinfo.查询范围;
      if (this.pageinfo.departmenttwo == "") {
        this.pageinfo.departmenttwo = 0;
      }
      this.loading = true;
      get_borrowreback(this.pageinfo).then(res => {
        this.tableData = res.data;
        this.pageinfo.count = res.count;
        this.loading = false;
      });
    },
    onloads() {
      if (this.pageinfo.借用value != undefined) {
        // console.log(1);
        if (this.pageinfo.借用value.length != 0) {
          this.pageinfo.borrowId = this.pageinfo.借用value[1];
        } else {
          this.pageinfo.borrowId = 0;
        }
      }
      if (this.pageinfo.借出value != undefined) {
        // console.log(2);
        if (this.pageinfo.借出value.length != 0) {
          this.pageinfo.borrowoutId = this.pageinfo.借出value[1];
        } else {
          this.pageinfo.borrowoutId = 0;
        }
      }
      this.pageinfo.departmentone = this.$store.getters.id_一级部门;

      this.pageinfo.departmenttwo = this.pageinfo.查询范围;
      if (this.pageinfo.departmenttwo == "") {
        this.pageinfo.departmenttwo = 0;
      }
      this.loading = true;
      get_borrowrebackdetail(this.pageinfo).then(res => {
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
    },
    // 所有人
    get_schoolresponseperson() {
      var data = {
        departmentone: this.$store.getters.id_一级部门,
        departmentwo: this.pageinfo.查询范围
      };
      get_schoolresponseperson(data).then(res => {
        this.aoptions = res.data;
        // console.log(res.data[0]);
      });
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
    }
  },
  beforeMount() {
    this.get_schoolresponseperson();
    this.get_allschooldepartments();
  }
};
</script>

<style></style>
