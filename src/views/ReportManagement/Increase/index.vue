<template>
  <div style="margin: 1%">
    <el-form
      ref="ruleForm"
      :label-position="labelPosition"
      :model="form"
      :inline="true"
    >
      <!-- <el-form-item label="" :label-width="formLabelWidth" prop="remark">
        <el-radio-group v-model="radio" @change="radiochange">
          <el-radio :label="3">汇总表</el-radio>
          <el-radio :label="6">明细表</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-button
        style="float: right;margin-left:10px"
        type="warning"
        @click="print"
      >
        打印
      </el-button>
      <el-button style="float: right;" type="warning" @click="handleDownload">
        导出
      </el-button>
      <el-form-item
        label="单位"
        :label-width="formLabelWidth"
        v-show="hidenAll"
      >
        <el-select
          v-model="pageinfo.查询范围"
          placeholder="请选择"
          clearable
          @input="updateViews($event)"
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
        label="存放地点"
        :label-width="formLabelWidth"
        prop="remark"
      >
        <!-- <el-select
          style="width: 100%"
          v-model="pageinfo.storagetwo"
          placeholder="请选择"
          clearable
          :disabled="hidenOne"
        >
          <el-option
            v-for="item in 存放地点options"
            :key="item.存放地点二级ID"
            :label="item.房间名称"
            :value="item.存放地点二级ID"
            size="medium"
          >
          </el-option>
        </el-select> -->
        <el-cascader
          style="width: 100%"
          ref="cunfang"
          :options="存放地点options"
          :props="存放defaultProps"
          filterable
          :show-all-levels="true"
          clearable
          v-model="form.存放地点"
        ></el-cascader>
      </el-form-item>
      <el-form-item
        label="归属信息"
        :label-width="formLabelWidth"
        prop="remark"
      >
        <el-cascader
          style="width: 100%"
          ref="AssetClasses"
          :options="归属options"
          :props="归属defaultProps"
          filterable
          :show-all-levels="false"
          :disabled="hidenOne"
          clearable
          v-model="pageinfo.归属value"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="账期" :label-width="formLabelWidth" prop="remark">
        <el-date-picker
          v-model="pageinfo.time"
          type="month"
          placeholder="选择月"
          value-format="yyyy-MM"
          @change="zqchange"
        >
        </el-date-picker>
      </el-form-item>
      <el-button size="small" @click="submit" type="primary">查询</el-button>
    </el-form>
    <el-table
      id="print"
      :data="tableData"
      style="width: 100%"
      :fit="true"
      :header-cell-style="{
        'text-align': 'center',
        background: '#eef1f6'
      }"
    >
      <el-table-column
        label="序号"
        type="index"
        width="50"
        :reserve-selection="true"
      ></el-table-column>
      <el-table-column label="资产分类">
        <el-table-column prop="资产分类" label="一级分类名称">
        </el-table-column>
      </el-table-column>
      <el-table-column label="增加">
        <el-table-column prop="增加数量" label="数量(个)"> </el-table-column>
        <el-table-column prop="增加原值" label="原值" align="right">
          <template slot-scope="scope">
            {{ scope.row.增加原值.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="减少">
        <el-table-column prop="减少数量" label="数量(个)"> </el-table-column>
        <el-table-column prop="减少原值" label="原值" align="right">
          <template slot-scope="scope">
            {{ scope.row.减少原值.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="结存">
        <el-table-column prop="结存数量" label="数量(个)"> </el-table-column>
        <el-table-column prop="结存原值" label="原值" align="right">
          <template slot-scope="scope">
            {{ scope.row.结存原值.toFixed(2) }}
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import AssteSort from "@/bitcomponents/assteSort/index";
import {
  get_allschooldepartments,
  get_storagelocation,
  get_alldepartmentpeople
} from "@/api/assetaccounthandle";
import { get_cachecreateremove } from "@/api/repoartmanegement";
export default {
  components: { AssteSort },
  data() {
    return {
      存放defaultProps: {
        children: "children",
        label: "name",
        value: "id"
      },
      归属defaultProps: {
        children: "children",
        label: "name",
        value: "id",
        checkStrictly: "true"
      },
      tableData: [],
      radio: 3,
      form: {},
      hidenAll: false,
      labelPosition: "right",
      formLabelWidth: "80px",
      查询范围options: [],
      loading: false,
      pageinfo: {
        pageNum: 1, //第几页
        pageSize: 10, //一页多少条
        count: 0, //数据总数
        pagesizes: [10, 20, 30, 50],
        departmentone2: this.$store.getters.id_一级部门
      }, //搜索条件
      hidenOne: false,
      存放地点options: [],
      归属options: []
    };
  },
  methods: {
    // 打印
    print() {
      if (this.tableData.length === 0) {
        this.$notify.warning("请先查询所需打印的信息!");
        return;
      }
      //获取打印的页面内容
      var print = document.getElementById("print");
      var newContent = print.innerHTML;
      var oldContent = document.body.innerHTML;
      document.body.innerHTML = newContent;
      document.getElementsByTagName("body")[0].style.zoom = 0.78;
      window.print();
      window.location.reload();
      //将原有页面还原到页面
      document.body.innerHTML = oldContent;
      return false;
    },
    // 导出
    handleDownload() {
      if (this.tableData.length === 0) {
        this.$notify.warning("请先查询所需导出的信息!");
        return;
      }
      import("@/vendor/Export2Excel").then(excel => {
        const multiHeader = [["资产分类", "增加", "", "减少", "", "结存", ""]];
        //excel头
        const tHeader = [
          "一级分类名称",
          "数量(个)",
          "原值",
          "数量(个)",
          "原值",
          "数量(个)",
          "原值"
        ];
        //excel数据
        const filterVal = [
          "资产分类",
          "增加数量",
          "增加原值",
          "减少数量",
          "减少原值",
          "结存数量",
          "结存原值"
        ];
        const data = this.formatJson(filterVal, this.tableData);
        // 进行所有表头的单元格合并
        const merges = ["B1:C1", "D1:E1", "F1:G1"];
        excel.export_json_to_excel({
          multiHeader: multiHeader,
          header: tHeader,
          merges: merges,
          data,
          //   filename: Date.parse(new Date()), //导出文件名时间戳作为文件名
          filename: "表格信息",
          autoWidth: this.autoWidth,
          bookType: this.bookType
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    //解决双向绑定失效
    updateViews(e) {
      // console.log(e);
      this.$forceUpdate();
    },
    submit() {
      var data = {
        schoolone: this.$store.getters.id_一级部门,
        schooltwo: this.pageinfo.查询范围
      };
      if (data.schooltwo == "") {
        data.schooltwo = 0;
      }
      get_cachecreateremove(data).then(res => {
        this.tableData = res.data;
      });
    },
    //   账期改变
    zqchange(val) {
      console.log(val);
    },
    // 归属信息
    get_alldepartmentpeople() {
      get_alldepartmentpeople({
        departmentwo: this.$store.getters.id_二级部门
      }).then(res => {
        this.归属options = res.data;
      });
    },
    // 存放地点options
    get_storagelocation() {
      var data = {
        departmentwo: this.$store.getters.id_二级部门
      };
      get_storagelocation(data).then(res => {
        this.存放地点options = res.data;
      });
    },
    // 资产分类
    getAssteSort(val) {
      this.pageinfo.categoryone = val.categoryone;
      this.pageinfo.categorytwo = val.categorytwo;
      this.pageinfo.categorythree = val.categorythree;
      this.pageinfo.categoryfour = val.categoryfour;
    },

    //   单位option
    get_allschooldepartments() {
      get_allschooldepartments({
        departmentone: this.$store.getters.id_一级部门
      }).then(res => {
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
    }
  },
  beforeMount() {
    this.get_allschooldepartments();
    this.get_storagelocation();
    this.get_alldepartmentpeople();
  }
};
</script>

<style></style>
