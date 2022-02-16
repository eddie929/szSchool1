<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="80%"
    center
    :close-on-click-modal="false"
  >
    <el-form
      ref="ruleForm"
      :label-position="labelPosition"
      :inline="true"
      :model="form"
    >
      <el-form-item label="类型" label-width="40px">
        <el-select
          v-model="detailedSummary"
          @change="changeDetailedSummary"
          filterable
          style="width:90px"
        >
          <el-option value="汇总表">汇总表</el-option>
          <el-option value="明细表">明细表</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="ykradio" @change="onload">
          <el-radio label="盘盈"></el-radio>
          <el-radio label="盘亏"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="资产分类" label-width="70px">
        <AssteSort
          ref="AssteSort"
          style="width: 100%"
          @getAssteSort="getAssteSort"
        />
      </el-form-item>
      <el-form-item label="存放地点" label-width="70px">
        <!-- <el-select
          style="width: 100%"
          v-model="form.存放地点"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="item in saveAddressOptions"
            :key="item.存放地点二级ID"
            :label="item.房间名称"
            :value="item.存放地点二级ID"
            size="medium"
          >
          </el-option>
        </el-select> -->
        <el-cascader
          style="width: 100%"
          v-model="form.存放地点"
          :options="saveAddressOptions"
          :show-all-levels="false"
          @change="changeAddress"
          :props="props"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="归属信息" label-width="70px">
        <el-select v-model="form.归属部门" placeholder="请选择" clearable>
          <el-option
            v-for="item in departmentOptions"
            :key="item.部门Id"
            :label="item.部门名称"
            :value="item.部门Id"
            size="medium"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="onload">搜索</el-button>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="warning" size="small">导出</el-button>
      </el-form-item>
    </el-form>
    <!-- 汇总表 -->
    <el-table
      :data="tableData"
      v-show="isshowtableone"
      height="600px"
      style="width: 100%"
    >
      <el-table-column
        prop="姓名"
        label="整体/个人"
        width="150"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column label="通用设备">
        <el-table-column prop="通用设备数量" label="数量(个)"> </el-table-column>
        <el-table-column prop="通用设备金额" label="金额">
          <template slot-scope="{ row }">
            <div style="text-align:right">{{ row.通用设备金额 }}</div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="专用设备">
        <el-table-column prop="专用设备数量" label="数量(个)"> </el-table-column>
        <el-table-column prop="专用设备金额" label="金额">
          <template slot-scope="{ row }">
            <div style="text-align:right">{{ row.专用设备金额 }}</div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="家具,用具,装具">
        <el-table-column prop="家具用具装具及动植物数量" label="数量(个)">
        </el-table-column>
        <el-table-column prop="家具用具装具及动植物金额" label="金额">
          <template slot-scope="{ row }">
            <div style="text-align:right">
              {{ row.家具用具装具及动植物金额 }}
            </div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="文物,陈列品">
        <el-table-column prop="文物和陈列品数量" label="数量(个)">
        </el-table-column>
        <el-table-column prop="文物和陈列品金额" label="金额">
          <template slot-scope="{ row }">
            <div style="text-align:right">{{ row.文物和陈列品金额 }}</div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="盈亏数量合计" label="盈亏数量合计">
      </el-table-column>
      <el-table-column prop="盈亏金额合计" label="盈亏金额合计">
        <template slot-scope="{ row }">
          <div style="text-align:right">{{ row.盈亏金额合计 }}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      v-show="isshowtabletwo"
      :data="tableDatamx"
      border
      height="600px"
      :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="55" />
      <el-table-column
        label="资产编号"
        width="150"
        prop="资产编码"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="资产分类"
        prop="一级分类名称"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="资产名称"
        prop="资产名称"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="规格"
        prop="规格"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="型号"
        prop="型号"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="使用方向" prop="使用方向" />
      <el-table-column label="数量(个)" prop="数量" />
      <el-table-column label="原值" prop="原值" />
      <el-table-column label="净值" prop="净值" />
      <el-table-column
        label="存放地点"
        prop="存放地点"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="归属部门"
        prop="所属部门"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="负责人" prop="负责人" />
      <el-table-column
        label="盘点时间"
        prop="盘点时间"
        :show-overflow-tooltip="true"
      />
      <!-- <el-table-column
        label="资产状态"
        prop="资产状态"
        :show-overflow-tooltip="true"
      /> -->
    </el-table>
    <el-row v-show="isshowtabletwo" style="margin: 20px 0px 20px 0px">
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
  </el-dialog>
</template>

<script>
import { inventorydetailsum, inventorydetail } from "@/api/inventoryhandle";
import {
  get_allschooldepartment,
  get_storagelocation
} from "@/api/assetaccounthandle";
import AssteSort from "@/bitcomponents/assteSort"; //资产分类
export default {
  components: { AssteSort },
  data() {
    return {
      dynamicValidateForm: {
        domains: []
      },
      departmentOptions: [],
      saveAddressOptions: [],
      tableData: [],
      tableDatamx: [],
      dialogTitle: "",
      dialogVisible: false,
      formLabelWidth: "80px",
      labelPosition: "left",
      detailedSummary: "汇总表",
      ykradio: "盘盈",
      department: 0,
      pdID: 0,
      form: {
        categoryone: 0, //类别
        categorytwo: 0,
        categorythree: 0,
        categoryfour: 0,
        归属部门: "",
        存放地点: ""
      },
      props: {
        children: "children",
        label: "name",
        value: "id",
        multiple: false
        // checkStrictly: true
        // emitPath: false
      },
      isshowtableone: true,
      isshowtabletwo: false,
      pageinfo: {
        page: 1, //第几页
        limit: 10, //一页多少条
        count: 0, //数据总数
        pagesize: [10, 20, 50]
      }
    };
  },
  methods: {
    //选择存放地点
    changeAddress(val) {
      // console.log(val);
    },
    // 存放地点options
    get_storagelocation() {
      var data = {
        departmentwo: this.$store.id_二级部门
      };
      get_storagelocation(data).then(res => {
        // console.log(res);
        this.saveAddressOptions = res.data;
      });
    },
    // 归属部门
    get_allschooldepartment() {
      var data = {
        departmentwo: this.$store.id_二级部门
      };
      get_allschooldepartment(data).then(res => {
        this.departmentOptions = res.data;
      });
    },
    // 资产分类选择事件
    getAssteSort(val) {
      // console.log(val);
      this.form.categoryone = val.categoryone;
      this.form.categorytwo = val.categorytwo;
      this.form.categorythree = val.categorythree;
      this.form.categoryfour = val.categoryfour;
    },
    changeDetailedSummary(val) {
      if (val == "汇总表") {
        this.isshowtableone = true;
        this.isshowtabletwo = false;
      } else if (val == "明细表") {
        this.isshowtableone = false;
        this.isshowtabletwo = true;
      }
      this.onload();
    },
    handleSizeChange(val) {
      this.pageinfo.limit = val;
      this.pageinfo.page = 1;
      this.onload();
    },
    //当前第几页
    handleCurrentChange(val) {
      this.pageinfo.page = val;
      this.onload();
    },
    onload() {
      if (this.pdID == undefined) {
        // 调用全局挂载的方法,关闭当前标签页
        this.$store.dispatch("tagsView/delView", this.$route);
        // 返回上一步路由
        this.$router.go(-1);
        return;
      }
      // console.log("盘点ID:", this.pdID);
      this.tableData = [];
      this.tableDatamx = [];
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      if (this.detailedSummary == "汇总表") {
        let reqdata = {};
        if (this.$store.getters.id_二级部门 == 0) {
          reqdata = {
            ID: this.pdID,
            Iseduction: 1,
            departmentone: this.$store.getters.id_一级部门,
            departmenttwo:
              this.department == "全部" ? 0 : this.department.value,
            checkway: this.ykradio
          };
        } else {
          reqdata = {
            ID: this.pdID,
            Iseduction: 0,
            departmentone: this.$store.getters.id_一级部门,
            departmenttwo: this.$store.getters.id_二级部门,
            checkway: this.ykradio
          };
        }
        // console.log(this.department);
        // console.log(reqdata);
        // let reqdata = {
        //   ID: this.pdID,
        //   Iseduction: this.$store.getters.id_二级部门 == 0 ? 1 : 0,
        //   departmentone: this.$store.getters.id_一级部门,
        //   departmenttwo: this.department == "全部" ? 0 : this.department.value,
        //   checkway: this.ykradio
        // };
        inventorydetailsum(reqdata)
          .then(response => {
            if (response.code == 100) {
              // console.table(response.data);
              this.tableData = response.data;
            }
            loading.close();
          })
          .catch(error => {
            loading.close();
          });
      } else if (this.detailedSummary == "明细表") {
        let reqdata = {};
        if (this.$store.getters.id_二级部门 == 0) {
          reqdata = {
            taskId: this.pdID,
            departmentone: this.$store.getters.id_一级部门,
            departmenttwo: this.$store.getters.id_二级部门,
            statename: this.ykradio,
            Iseduction: 1,
            PageNum: this.pageinfo.page,
            pageSize: this.pageinfo.limit,
            categoryone: this.form.categoryone,
            categorytwo: this.form.categorytwo,
            categorythree: this.form.categorythree,
            categoryfour: this.form.categoryfour,
            departmentwo: this.$store.getters.id_二级部门,
            publicdepartwo: this.department.value,
            departmenthree: this.form.归属部门 == "" ? 0 : this.form.归属部门,
            storeone: this.form.存放地点 == "" ? 0 : this.form.存放地点
          };
        } else {
          reqdata = {
            taskId: this.pdID,
            departmentone: this.$store.getters.id_一级部门,
            departmenttwo: this.$store.getters.id_二级部门,
            statename: this.ykradio,
            PageNum: this.pageinfo.page,
            pageSize: this.pageinfo.limit,
            categoryone: this.form.categoryone,
            categorytwo: this.form.categorytwo,
            categorythree: this.form.categorythree,
            categoryfour: this.form.categoryfour,
            departmentwo: this.$store.getters.id_二级部门,
            publicdepartwo: this.$store.getters.id_二级部门,
            departmenthree: this.form.归属部门 == "" ? 0 : this.form.归属部门,
            storeone: this.form.存放地点 == "" ? 0 : this.form.存放地点
          };
        }

        inventorydetail(reqdata)
          .then(response => {
            if (response.code == 100) {
              // console.table(response.data);
              this.tableDatamx = response.data;
            }
            loading.close();
          })
          .catch(error => {
            loading.close();
          });
      }
    }
  },
  beforeMount() {
    this.get_allschooldepartment();
    this.get_storagelocation();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
// .el-cascader__dropdown .el-cascader-menu:first-child .el-cascader-node label {
//   display: none;
// }
</style>
