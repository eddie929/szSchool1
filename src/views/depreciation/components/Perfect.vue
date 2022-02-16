<template>
  <el-dialog
    title="完善折旧信息"
    :visible.sync="dialogVisible"
    width="70%"
    center
    append-to-body
    :close-on-click-modal="false"
    ><el-form ref="form" :model="form" :inline="true">
      <el-form-item label="资产分类" prop="">
        <AssteSort
          ref="AssteSort"
          style="width: 100%"
          @getAssteSort="getAssteSort"
        />
      </el-form-item>
      <el-form-item label="存放地点" :label-width="formLabelWidth" prop="">
        <el-cascader
          style="width: 100%"
          ref="cunfang"
          :options="存放地点options"
          :props="存放地点defaultProps"
          filterable
          :show-all-levels="true"
          clearable
          v-model="form.存放地点"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="归属信息" :label-width="formLabelWidth" prop="">
        <el-cascader
          style="width: 100%"
          ref="AssetClasses"
          :options="归属信息options"
          :props="归属信息defaultProps"
          filterable
          :show-all-levels="false"
          clearable
          v-model="form.归属信息"
        ></el-cascader>
      </el-form-item>

      <el-form-item>
        <el-tooltip
          class="item"
          effect="dark"
          content="模糊查询字段包括:资产编号\资产名称\规格\型号\资产品牌\责任人\使用人"
          placement="top"
        >
          <el-input
            v-model="form.keycontent"
            placeholder="模糊查询"
            clearable
          ></el-input>
        </el-tooltip>
      </el-form-item>
      <el-button @click="submit" icon="el-icon-search" size="medium "
        >搜索</el-button
      >
      <el-table
        :data="tableData"
        ref="tableData"
        style="width: 100%; margin-top: 1%"
        border
        stripe
        max-height="500"
        height="500"
        :highlight-current-row="true"
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
        <el-table-column prop="资产Id" label="资产Id" v-if="false">
        </el-table-column>
        <el-table-column
          prop="资产编号"
          label="资产编号"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="" label="资产分类" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{
              scope.row.一级分类名称 +
                "/" +
                scope.row.二级分类名称 +
                "/" +
                scope.row.三级分类名称 +
                "/" +
                scope.row.四级分类名称
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="资产名称"
          label="资产名称"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="规格" label="规格" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="型号" label="型号" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="使用方向" label="使用方向"> </el-table-column>
        <el-table-column prop="数量" label="数量(个)"> </el-table-column>
        <el-table-column prop="原值2" label="原值" align="right">
        </el-table-column>
        <el-table-column prop="净值2" label="净值" align="right">
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
        <el-table-column fixed="right" width="120" label="">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handle(scope.row)"
              >卡片</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-row style="margin: 10px 0px 0px 10px">
      <el-col :span="24">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.pageNum"
          :page-sizes="form.pageSizes"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.count"
        ></el-pagination>
      </el-col>
    </el-row>
    <Card ref="Card" @onload="onload" />
  </el-dialog>
</template>

<script>
import Card from "./Card.vue";
import AssteSort from "@/bitcomponents/assteSort/index.vue"; // 资产分类
import { get_adddepreciationlist } from "@/api/depreciationhandle";
import {
  get_alldepartmentpeople,
  get_storagelocation,
  get_accountleaderbyleaderId
} from "@/api/assetaccounthandle";
export default {
  components: { Card, AssteSort },
  data() {
    return {
      formLabelWidth: "80px",
      form: {
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50],
        count: 0,
        schoolone: this.$store.getters.id_一级部门,
        schooltwo: this.$store.getters.id_二级部门,
        categoryone: 0,
        categorytwo: 0,
        categorythree: 0,
        categoryfour: 0,
        departmentone: 0,
        departmentwo: 0,
        departmenthree: 0,
        storagetwo: 0,
        keycontent: ""
      },
      tableData: [],
      归属信息options: [],
      存放地点options: [],
      存放地点defaultProps: {
        children: "children",
        label: "name",
        value: "id"
      },
      归属信息defaultProps: {
        children: "children",
        label: "name",
        value: "id",
        checkStrictly: "true"
      },
      dialogVisible: false
    };
  },
  methods: {
    onload() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      get_adddepreciationlist(this.form).then(res => {
        loading.close();
        this.tableData = res.data;
        this.form.count = res.count;
      });
    },
    // 控制每页显示条数
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.onload();
    },
    // 第几页
    handleCurrentChange(val) {
      this.form.pageNum = val;
      this.onload();
    },
    // 搜索
    submit() {
      this.form.storagetwo = 0
      this.form.departmentone = 0
      this.form.departmentwo = 0
      this.form.departmenthree = 0
      this.form.pageNum = 1;
      if (this.form.存放地点 != undefined) {
        this.form.storagetwo = this.form.存放地点[1];
      }
      if (this.form.归属信息 != undefined) {
        this.form.departmentone = this.$store.getters.id_一级部门;
        if (this.form.归属信息[1] != undefined) {
          this.form.departmentwo = this.form.归属信息[1];
          if (this.form.归属信息[2] != undefined) {
            this.form.departmenthree = this.form.归属信息[2];
          }
        }
      }
      this.onload();
    },
    // 归属信息
    get_alldepartmentpeople() {
      get_alldepartmentpeople({
        departmentwo: this.$store.getters.id_二级部门
      }).then(res => {
        this.归属信息options = res.data;
      });
    },
    // 存放地点
    get_storagelocation() {
      get_storagelocation({
        departmentwo: this.$store.getters.id_二级部门
      }).then(res => {
        this.存放地点options = res.data;
      });
    },
    // 资产分类选择事件
    getAssteSort(val) {
      this.form.categoryone = val.categoryone;
      this.form.categorytwo = val.categorytwo;
      this.form.categorythree = val.categorythree;
      this.form.categoryfour = val.categoryfour;
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
    // 打开卡片
    handle(row) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      get_accountleaderbyleaderId({
        ledgerId: parseInt(row.资产Id),
        分类名称: row.一级分类名称,
        categorytwoname: row.categoryname
      }).then(res => {
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
    }
  }
};
</script>

<style></style>
