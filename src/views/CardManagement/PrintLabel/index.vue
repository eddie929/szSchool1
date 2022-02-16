<template>
  <div style="margin: 1%">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div style="text-align: center; font-size: 16px">待打印库</div>
      </div>
      <div class="text item">
        <el-form
          ref="ruleForm"
          :label-position="labelPosition"
          :model="form"
          :inline="true"
        >
          <el-button class="el-icon-circle-plus" type="text" @click="add"
            >添加资产</el-button
          >
          <el-button
            class="el-icon-remove"
            style="margin-right: 10px"
            type="text"
            @click="delet"
            >移除资产</el-button
          >
          <el-form-item label="添加方式" :label-width="formLabelWidth" prop="">
            <el-select
              v-model="pageinfo.addway"
              placeholder="请选择"
              clearable
              @change="tjchang"
            >
              <el-option
                v-for="item in 添加option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="排列方式"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-select
              v-model="pageinfo.sortway"
              placeholder="请选择"
              clearable
              @change="plchang"
            >
              <el-option
                v-for="item in 排列option"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-dropdown type="warning" size="small" @command="print" split-button
            >打印菜单
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="单列打印">单列打印</el-dropdown-item>
              <el-dropdown-item command="双列打印">双列打印</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form>
        <el-table
          :data="tableData"
          ref="DataTable"
          style="width: 100%; margin-top: 1%"
          v-loading="loading"
          :highlight-current-row="true"
          border
          stripe
          height="580"
          max-height="580"
          :fit="true"
          :header-cell-style="{
            'text-align': 'center',
            background: '#eef1f6'
          }"
          :row-key="getRowKeys"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
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
          <el-table-column prop="数量" label="数量(个)"> </el-table-column>
          <el-table-column
            prop="保留原值"
            label="原值"
            align="right"
            :show-overflow-tooltip="true"
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
    </el-card>
    <AssteCard ref="AssteCard" @tableSelect="tableSelect" />
  </div>
</template>

<script>
import AssteCard from "@/bitcomponents/AssteCard";
import {
  get_printlabelhandle,
  create_printlabelh,
  del_printlabelh,
  create_printlabelflow
} from "@/api/printlabelhandle";
export default {
  components: { AssteCard },
  data() {
    return {
      form: {},
      labelPosition: "left",
      formLabelWidth: "90px",
      添加option: [
        {
          value: "管理员添加",
          label: "管理员添加"
        },
        {
          value: "负责人/使用人添加",
          label: "负责人/使用人添加"
        },
        {
          value: "盘盈添加",
          label: "盘盈添加"
        },
        {
          value: "新增入库",
          label: "新增入库"
        }
      ],
      排列option: [
        {
          value: 1,
          label: "添加时间"
        },
        {
          value: 2,
          label: "负责人"
        },
        {
          value: 3,
          label: "存放地点"
        },
        {
          value: 4,
          label: "购置日期"
        }
      ],
      tableData: [],
      loading: false,
      pageinfo: {
        pageNum: 1, //第几页
        pageSize: 10, //一页多少条
        count: 0, //数据总数
        pagesizes: [10, 20, 30, 50]
      } //搜索条件
    };
  },
  methods: {
    // 打印
    print(val) {
      if (this.tableData.length > 200) {
        this.$notify.warning("单次打印不得多于200条数据!");
        return;
      }
      if (val === "单列打印") {
        if (this.$refs.DataTable.selection.length == 0) {
          this.msg("警告", "请选择资产!");
          return;
        }
        var sid = "";
        const _selectData = this.$refs.DataTable.selection; //获取table选中
        // console.log(_selectData);
        for (var i in _selectData) {
          _selectData[i].一级机构ID = this.$store.getters.id_一级部门;
          _selectData[i].二级机构ID = this.$store.getters.id_二级部门;
          _selectData[i].操作人Id = this.$store.getters.id_用户;
        }
        for (var i = 0; i < _selectData.length; i++) {
          sid += _selectData[i].资产Id + ",";
        }
        sid = sid.substring(0, sid.length - 1);
        let routeUrl = this.$router.resolve({
          path: "/Printings",
          query: { data: sid }
        });
        window.open(routeUrl.href, "_blank");
        // return;
        this.$confirm("是否已打印?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning"
        })
          .then(() => {
            create_printlabelflow(_selectData).then(res => {
              // console.log(sid);
              // return;
              this.onload();
            });
          })
          .catch(() => {});
      } else if (val === "双列打印") {
        if (this.$refs.DataTable.selection.length == 0) {
          this.msg("警告", "请选择资产!");
          return;
        }
        var sid = "";
        const _selectData = this.$refs.DataTable.selection; //获取table选中
        // console.log(_selectData);
        for (var i in _selectData) {
          _selectData[i].一级机构ID = this.$store.getters.id_一级部门;
          _selectData[i].二级机构ID = this.$store.getters.id_二级部门;
          _selectData[i].操作人Id = this.$store.getters.id_用户;
        }
        for (var i = 0; i < _selectData.length; i++) {
          sid += _selectData[i].资产Id + ",";
        }
        sid = sid.substring(0, sid.length - 1);
        let routeUrl = this.$router.resolve({
          path: "/Printing",
          query: { data: sid }
        });
        window.open(routeUrl.href, "_blank");
        // return;
        this.$confirm("是否已打印?", "提示", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning"
        })
          .then(() => {
            create_printlabelflow(_selectData).then(res => {
              // console.log(sid);
              // return;
              this.onload();
            });
          })
          .catch(() => {});
      }
    },
    // 移除待打印库
    delet() {
      // console.log(this.$refs.DataTable.selection);
      if (this.$refs.DataTable.selection.length == 0) {
        this.msg("警告", "请选择资产");
        return;
      }
      var data = [];
      for (var i in this.$refs.DataTable.selection) {
        data.push(this.$refs.DataTable.selection[i].id);
      }
      // console.log(data);
      del_printlabelh(data).then(res => {
        this.onload();
        this.get_box(res.code, "移除成功!");
      });
    },
    // 添加待打印库
    tableSelect(row) {
      // this.tableData = row;

      for (var i in row) {
        row[i].添加方式 = "管理员添加";
      }
      // console.log(row);
      for (var i in row) {
        row[i].一级机构ID = this.$store.getters.id_一级部门;
        row[i].二级机构ID = this.$store.getters.id_二级部门;
      }
      create_printlabelh(row).then(res => {
        this.onload();
        this.get_box(res.code, "添加成功!");
      });
    },
    // 打开添加资产
    add() {
      this.$refs.AssteCard.onload();
      this.$refs.AssteCard.get_alldepartmentpeople();
      this.$refs.AssteCard.dialogVisible = true;
    },
    // 添加方式
    tjchang() {
      this.onload();
    },
    // 排列方式
    plchang() {
      this.onload();
    },
    onload() {
      // console.log(this.pageinfo);
      var data = {
        pageNum: this.pageinfo.pageNum,
        pageSize: this.pageinfo.pageSize,
        addway: this.pageinfo.addway,
        sortway: this.pageinfo.sortway,
        departmentone: this.$store.getters.id_一级部门,
        departmenttwo: this.$store.getters.id_二级部门
      };
      if (data.sortway == "") {
        data.sortway = 0;
      }
      this.loading = true;
      get_printlabelhandle(data).then(res => {
        this.loading = false;
        this.tableData = res.data;
        for (let i of this.tableData) {
          if (i.存放地点 === "") {
            i.存放地点 = i.建筑名称;
          } else {
            i.存放地点 = i.建筑名称 + "/" + i.存放地点;
          }
        }
        this.pageinfo.count = res.count;
      });
    },
    //多选框
    getRowKeys(row) {
      return row.资产Id;
    },
    // 判断是否到期
    maturity(row) {
      // console.log("是否到期:", row.是否到期);
      if (row.是否到期 == 1) {
        return "否";
      } else {
        return "是";
      }
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
    }
  },
  beforeMount() {
    this.onload();
  }
};
</script>

<style>
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
