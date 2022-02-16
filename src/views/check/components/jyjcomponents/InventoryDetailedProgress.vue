<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="80%"
    center
    append-to-body
    :close-on-click-modal="false"
  >
    <el-form
      ref="ruleForm"
      :label-position="labelPosition"
      :inline="true"
      :model="form"
    >
      <el-form-item style="margin-left:100px">
        <label>{{ name }}</label>
      </el-form-item>
      <el-form-item style="margin-left:100px">
        <el-radio-group v-model="isCheck" @change="onload">
          <el-radio value="未盘点" label="未盘点"></el-radio>
          <el-radio value="已盘点" label="已盘点"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      height="600px"
      :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" width="55" />
      <el-table-column
        label="资产编号"
        width="150"
        prop="资产编号"
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
      <el-table-column label="原值" prop="原值">
        <template slot-scope="{ row }">
          <div style="text-align:right">{{ row.原值 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="净值" prop="净值">
        <template slot-scope="{ row }">
          <div style="text-align:right">{{ row.净值 }}</div>
        </template>
      </el-table-column>
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
        label="取得日期"
        prop="购置日期"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="资产状态"
        prop="资产状态"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        v-if="isShow"
        label="盘点时间"
        prop="盘点时间"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        v-if="isShow"
        label="盘点方式"
        prop="盘点方式"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="资产卡片">
        <template slot-scope="{ row }">
          <el-button type="text" size="mini" @click="searchCard(row)"
            >查看卡片</el-button
          >
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
    <Card ref="Card" @onload="onload" />
  </el-dialog>
</template>

<script>
import {
  get_assetstobecounted,
  get_assetstobecountedbyflowstate
} from "@/api/inventoryhandle";
import {
  get_accountleader,
  get_accountleaderbyleaderId,
  get_allschoolsupplier,
  get_allschooldepartment,
  get_allschooldepartments,
  get_storagelocation
} from "@/api/assetaccounthandle";
import Card from "@/views/CardManagement/AssetCard/components/Card.vue";
export default {
  components: { Card },
  data() {
    return {
      dynamicValidateForm: {
        domains: []
      },
      tableData: [], //动态创建的下拉数组
      pointPerson: {}, //匹配
      PDID: 0, //匹配
      dialogTitle: "盘点进度-查看详情",
      dialogVisible: false,
      formLabelWidth: "80px",
      labelPosition: "left",
      name: "",
      isCheck: "未盘点",
      isShow: false,
      form: {},
      pageinfo: {
        page: 1, //第几页
        limit: 10, //一页多少条
        count: 0, //数据总数
        pagesize: [10, 20, 50]
      }
    };
  },
  methods: {
    searchCard(row) {
      this.$refs.Card.isShowUpdateBtn = false;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      //   console.log(row.资产Id);
      get_accountleaderbyleaderId({
        ledgerId: parseInt(row.资产Id),
        categoryname: row.所属分类,
        categorytwoname: row.categoryname
      }).then(res => {
        // console.log("卡片数据", row);
        if (row.categoryname == "车辆") {
          // description
          // console.log("row", row.categoryname);
          this.$refs.Card.descriptions = false;
          this.$refs.Card.carif = true; //车辆
          this.$refs.Card.Cultural = false; //文物
          this.$refs.Card.land = false; //土地
          this.$refs.Card.fangwu = false; //房屋
        } else if (row.categoryname == "文物") {
          this.$refs.Card.descriptions = false;
          this.$refs.Card.carif = false; //车辆
          this.$refs.Card.Cultural = true; //文物
          this.$refs.Card.land = false; //土地
          this.$refs.Card.fangwu = false; //房屋
        } else if (row.categoryname == "土地、海域及无居民海岛") {
          this.$refs.Card.descriptions = false;
          this.$refs.Card.carif = false; //车辆
          this.$refs.Card.Cultural = false; //文物
          this.$refs.Card.land = true; //土地
          this.$refs.Card.fangwu = false; //房屋
        } else if (row.categoryname == "房屋" || row.categoryname == "构筑物") {
          this.$refs.Card.descriptions = false;
          this.$refs.Card.carif = false; //车辆
          this.$refs.Card.Cultural = false; //文物
          this.$refs.Card.land = false; //土地
          this.$refs.Card.fangwu = true; //房屋
        } else {
          this.$refs.Card.descriptions = true;
          this.$refs.Card.carif = false; //车辆
          this.$refs.Card.Cultural = false; //文物
          this.$refs.Card.land = false; //土地
          this.$refs.Card.fangwu = false; //房屋
        }
        this.$refs.Card.onload(res.data[0]);
        var that = this;
        setTimeout(function() {
          loading.close();
          that.$refs.Card.activeName = "first";
          that.$refs.Card.dialogVisible = true;
        }, 600);
        // console.log(res.data)
      });
    },
    //每页多少条数据
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
    // changeCheck() {
    //   //   console.log("切换了吗");
    //   this.onload();
    // },
    onload() {
      this.tableData = [];
      this.name = this.pointPerson.人员名称;

      let reqdata = {
        taskId: this.PDID,
        fk_user: this.pointPerson.fk_user,
        pageNum: this.pageinfo.page,
        pageSize: this.pageinfo.limit
      };
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      //   console.log("请求参数:", reqdata);
      if (this.isCheck == "已盘点") {
        this.isShow = false;
        get_assetstobecountedbyflowstate(reqdata)
          .then(res => {
            // console.table("已盘点");
            // console.table(res.data);
            if (res.code === 100) {
              this.tableData = res.data;
            }
            // loading.close();
          })
          .catch(error => {});
      } else if (this.isCheck == "未盘点") {
        this.isShow = true;
        get_assetstobecounted(reqdata)
          .then(res => {
            // console.table("未盘点");
            // console.table(res.data);
            // console.log(res);
            if (res.code === 100) {
              this.tableData = res.data;
            }
          })
          .catch(error => {});
      }
      loading.close();
    }
  },
  beforeMount() {
    // this.getAllDepartmentPeople(); //查询负责人
    // this.getAllcategory(); //查询负责人
    // this.getAllSchoolDepartment(); //查询归属部门
    // this.getStorageLocation(); //存放地点
  }
};
</script>

<style lang="scss" scoped>
// .el-cascader__dropdown .el-cascader-menu:first-child .el-cascader-node label {
//   display: none;
// }
</style>
