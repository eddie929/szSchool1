<template>
  <div style="margin: 1%">
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="80px"
      class="demo-ruleForm"
      size="medium"
      :inline="true"
    >
      <el-dropdown @command="handleCommanddao">
        <el-button type="warning" size="small">
          导出
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="导出本页">导出本页</el-dropdown-item>
          <el-dropdown-item command="导出全部">导出全部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div style="float: right">
        <el-form-item label="查询范围" prop="departmentwo" v-show="hidenAll">
          <!-- <BmselectTwo ref="BmselectTwo" style="width: 100%" /> -->
          <el-select
            v-model="form.查询范围"
            placeholder="请选择"
            clearable
            @change="fenleichange"
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

        <el-form-item label="资产分类" prop="departmentwo">
          <AssteSort
            ref="AssteSort"
            style="width: 100%"
            @getAssteSort="getAssteSort"
          />
        </el-form-item>

        <el-form-item label="归属部门" prop="departmentwo">
          <!-- <Departmentallnow
            ref="Departmentallnow"
            style="width: 100%"
            @Departmentallnow="Departmentallnows"
          /> -->
          <el-select
            v-model="form.归属部门"
            placeholder="请选择"
            clearable
            :disabled="hidenOne"
          >
            <el-option
              v-for="item in 归属部门options"
              :key="item.部门Id"
              :label="item.部门名称"
              :value="item.部门Id"
              size="medium"
            >
            </el-option>
          </el-select>
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
        <el-button @click="drawerc = true" size="medium ">更多</el-button>
      </div>
    </el-form>
    <el-drawer
      size="35%"
      title="高级搜索"
      :visible.sync="drawerc"
      :direction="direction"
      center
      :before-close="drawerhandleClose"
      :with-header="false"
      :show-close="true"
    >
      <h2 style="color: #606266; text-align: center; font-size: 16px">
        高级搜索
      </h2>
      <hr />
      <div style="padding: 0 2% 0 2%">
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          label-width="80px"
          label-position="left"
          class="demo-ruleForm"
          size="medium"
        >
          <el-form-item label="资产状态" prop="departmentwo">
            <el-select
              v-model="form.ledger_state"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in stateoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否到期" prop="departmentwo">
            <el-select
              v-model="form.sfValue"
              placeholder="请选择"
              clearable
              @input="updateViews($event)"
            >
              <el-option
                v-for="item in sfoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用方向" prop="departmentwo">
            <el-select
              v-model="form.syfxValue"
              placeholder="请选择"
              clearable
              @input="updateViews($event)"
            >
              <el-option
                v-for="item in syfxoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="取得方式" prop="departmentwo">
            <el-select v-model="form.qdfsValue" placeholder="请选择" clearable>
              <el-option
                v-for="item in qdfsoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="原值区间" prop="departmentwo">
            <el-tooltip
              class="item"
              effect="dark"
              content="如果只输入此字段将查询大于此字段的原值"
              placement="top"
            >
              <el-input-number
                v-model="form.originnum"
                :precision="2"
                :step="0.1"
                clearable
              ></el-input-number>
            </el-tooltip>
            至
            <el-tooltip
              class="item"
              effect="dark"
              content="如果只输入此字段将查询小于此字段的原值"
              placement="top"
            >
              <el-input-number
                v-model="form.endoriginnum"
                :precision="2"
                :step="0.1"
                clearable
              ></el-input-number>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="净值区间" prop="departmentwo">
            <el-tooltip
              class="item"
              effect="dark"
              content="如果只输入此字段将查询大于此字段的净值"
              placement="top"
            >
              <el-input-number
                v-model="form.networthbegin"
                :precision="2"
                :step="0.1"
                clearable
              ></el-input-number>
            </el-tooltip>
            至
            <el-tooltip
              class="item"
              effect="dark"
              content="如果只输入此字段将查询小于此字段的净值"
              placement="top"
            >
              <el-input-number
                v-model="form.networthend"
                :precision="2"
                :step="0.1"
                clearable
              ></el-input-number>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="供应商" prop="departmentwo">
            <el-select
              @input="updateViews($event)"
              v-model="form.供应商"
              placeholder="请选择"
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="item in 供应商options"
                :key="item.id"
                :label="item.供应商名称"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="存放地点" prop="departmentwo">
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
            <!-- <el-select
              @input="updateViews($event)"
              style="width: 100%"
              v-model="form.存放地点"
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
          </el-form-item>

          <el-form-item
            label="取得日期"
            prop="departmentwo"
            style="width: 100%"
          >
            <el-date-picker
              style="width: 100%"
              v-model="form.date"
              type="daterange"
              range-separator="至"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div style="text-align: center; margin-top: 4%">
          <span slot="footer" class="dialog-footer" style="margin: 0 auto">
            <el-button @click="Reset" size="medium">重置</el-button>
            <el-button type="primary" size="medium" @click="Insubmit()"
              >确 定</el-button
            >
          </span>
        </div>
      </div>
    </el-drawer>

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
        background: '#eef1f6',
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
      <el-table-column
        prop="所属分类"
        label="资产分类"
        :show-overflow-tooltip="true"
      >
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
      <el-table-column prop="原值" label="原值" align="right">
      </el-table-column>
      <el-table-column prop="净值" label="净值" align="right">
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
      <el-table-column
        prop="二级机构名称"
        label="所属单位"
        :show-overflow-tooltip="true"
        v-if="company == 0"
      >
      </el-table-column>
      <el-table-column fixed="right" width="120" label="">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handle(scope.row)"
            >卡片</el-button
          >
          <el-button type="text" size="mini" @click="lvli(scope.row)"
            >履历</el-button
          >
        </template>
      </el-table-column>
    </el-table>
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
    <Resume ref="Resume" />
  </div>
</template>

<script>
import XLSX from "xlsx";
import BmselectTwo from "@/bitcomponents/bmselecttwo"; //查询范围
import Usercarse from "@/bitcomponents/Usercarse"; // 负责人
import UsercarseUse from "@/bitcomponents/Usercarse"; // 负责人
import AssteSort from "@/bitcomponents/assteSort"; //资产分类
import Location from "@/bitcomponents/location";
import Departmentallnow from "@/bitcomponents/Departmentallnow"; //当前归属部门
import Card from "./components/Card.vue";
import {
  get_accountleader,
  get_accountleaderbyleaderId,
  get_allschoolsupplier,
  get_allschooldepartment,
  get_allschooldepartments,
  get_storagelocation,
} from "@/api/assetaccounthandle";

import Resume from "./components/Resume.vue";
import { get_alluser } from "@/api/userhandle";
export default {
  components: {
    BmselectTwo,
    AssteSort,
    Location,
    Departmentallnow,
    Card,
    Usercarse,
    UsercarseUse,
    Resume,
  },
  data() {
    return {
      company:this.$store.getters.id_二级部门,
      activeName: "",
      查询范围options: [], //查询范围
      存放地点options: [], //存放地点
      供应商options: [], //存放地点
      form: {
        categoryone: 0, //类别
        categorytwo: 0,
        categorythree: 0,
        categoryfour: 0,
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50],
        count: 0,
        storeone: 0, //存放地点12级
        storagetwo: 0,
        fk_suppliers: 0, //供应商
        ledger_state: "",
      },
      drawerc: false, //扩展搜索条件
      rules: {},
      stateoptions: [
        { label: "使用中", value: "使用中" },
        { label: "空闲中", value: "空闲中" },
        { label: "维修中", value: "维修中" },
        { label: "借用中", value: "借用中" },
        { label: "处置中", value: "处置中" },
      ],
      sfoptions: [
        {
          value: "是",
          label: "是",
        },
        {
          value: "否",
          label: "否",
        },
      ],
      // 使用方向
      syfxoptions: [
        {
          label: "教学",
          value: "教学",
        },
        {
          label: "科研",
          value: "科研",
        },
        {
          label: "行政",
          value: "行政",
        },
        {
          label: "其它",
          value: "其它",
        },
      ],
      // 供应商
      gysoptions: [],
      defaultProps: {
        children: "children3",
        label: "name",
        value: "id",
      },
      存放defaultProps: {
        children: "children",
        label: "name",
        value: "id",
      },
      // 取得方式
      qdfsoptions: [
        {
          label: "购置",
          value: "购置",
        },
        {
          label: "无偿调入",
          value: "无偿调入",
        },
        {
          label: "接受捐赠",
          value: "接受捐赠",
        },
        {
          label: "盘盈",
          value: "盘盈",
        },
        {
          label: "自建",
          value: "自建",
        },
        {
          label: "其他",
          value: "其他",
        },
      ],
      loading: false,
      tableData: [],
      direction: "rtl", //高级搜索 右侧展示
      归属部门options: [],
      hidenAll: false, //查询分类禁用
      hidenOne: false,
    };
  },
  methods: {
    // 归属分类选择事件
    fenleichange(val) {
      if (this.form.查询范围 == "" || this.form.查询范围 == undefined) {
        this.hidenOne = true;
      } else {
        this.hidenOne = false;
        this.get_allschooldepartment();
        this.get_storagelocation();
      }
      // console.log(this.归属部门options);
    },
    // 归属部门
    get_allschooldepartment() {
      var data = {
        departmentwo: this.form.查询范围,
      };
      get_allschooldepartment(data).then((res) => {
        this.归属部门options = res.data;
      });
    },
    // 存放地点options
    get_storagelocation() {
      var data = {
        departmentwo: this.form.查询范围,
      };
      get_storagelocation(data).then((res) => {
        // console.log(res);
        this.存放地点options = res.data;
      });
    },
    //解决双向绑定失效
    updateViews(e) {
      // console.log(e);
      this.$forceUpdate();
    },
    // 重置
    Reset() {
      setTimeout(() => {
        this.form.ledger_state = "";
        this.form.sfValue = "";
        // this.$refs.Location.cascader(); //存放地点
        this.form.存放地点 = ""; //存放地点
        // this.$set(this.form, "cfdd", "");
        this.form.storagetwo = 0;
        this.form.storageone = 0;
        this.form.begintime = ""; //开始时间
        this.form.endtime = ""; //结束时间
        this.form.date = ""; //时间
        this.form.fk_supplier = 0; //供应商
        this.form.供应商 = ""; //供应商
        this.$set(this.form, "供应商", "");
        this.form.networthbegin = 0; //净值开始
        this.form.networthend = 0; //净值开始
        this.form.originnum = 0; //原值开始
        this.form.endoriginnum = 0; //原直结束
        this.form.syfxValue = ""; //使用方向
        this.form.userdescibtion = 0; //使用方向
        // console.log("fk_supplier",this.form);

        // console.log("this.form.存放地点>>",this.form.cfdd);
        // console.log("this.form.供应商>>",this.form.供应商);
      }, 200);
    },
    gyschange(val) {
      // console.log("供应商",val);
      // console.log("供应商1",this.form.fk_suppliers);
    },
    // 导出
    async handleCommanddao(val) {
      // console.log(val);
      if (val == "导出本页") {
        // console.log("本页");
        if (this.tableData.length == 0) {
          this.msg("警告", "导出数据不能为空!");
          return;
        }
        this.exportExcel(this.tableData, 1);
      } else {
        var data = {
          networthbegin: this.form.networthbegin,
          networthend: this.form.networthend,
          fk_supplier: this.form.fk_supplier,
          originnum: this.form.originnum,
          endoriginnum: this.form.endoriginnum,
          userdescibtion: this.form.userdescibtion,
          ledger_state: this.form.ledger_state,
          keycontent: this.form.keycontent,
          pageNum: this.form.pageNum,
          pageSize: 10000,
          fk_user: this.form.fk_user,
          rolename: this.form.rolename,
          categoryone: this.form.categoryone,
          categorytwo: this.form.categorytwo,
          categorythree: this.form.categorythree,
          categoryfour: this.form.categoryfour,
          departmentone: this.form.departmentone,
          departmentwo: this.form.departmentwo,
          departmenthree: this.form.departmenthree,
          begintime: this.form.begintime,
          endtime: this.form.endtime,
          responseId: this.form.responseId,
          storeone: this.form.storeone,
          storagetwo: this.form.storagetwo,
          Istotime: this.form.Istotime,
          userId: this.form.userId,
          fk_suppliers: this.form.fk_suppliers,
        };

        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });

        for (var i = 1; i <= Math.ceil(this.form.count / 10000); i++) {
          data.pageNum = i;
          await get_accountleader(data).then((response) => {
            // console.log("数组", response);
            this.exportExcel(response.data, i);
          });
        }

        loading.close();
      }
    },
    //导出exl资产
    exportExcel(data, i) {
      // console.log(data);
      var _data = [
        [
          "资产编号",
          "所属分类",
          "规格型号",
          "使用方向",
          "数量",
          "原值",
          "净值",
          "存放地点",
          "所属部门",
          "负责人",
          "使用人",
          "购置日期",
          "资产状态",
          "是否到期",
        ],
      ];
      for (let i in data) {
        var str = [
          data[i].资产编号,
          data[i].所属分类,
          data[i].规格型号,
          data[i].使用方向,
          data[i].数量,
          data[i].原值,
          data[i].净值,
          data[i].存放地点,
          data[i].所属部门,
          data[i].负责人,
          data[i].使用人,
          data[i].购置日期,
          data[i].资产状态,
          data[i].是否到期,
        ];
        _data.push(str);
      }
      // console.log(_data)
      // return;
      const ws = XLSX.utils.aoa_to_sheet(_data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      /* save to file */
      XLSX.writeFile(
        wb,
        "资产台账" + this.dayjs().format("YYYY-MM-DD") + "_" + i + ".xlsx"
      );
    },
    // 打开履历
    lvli(row) {
      // console.log(row);
      this.$refs.Resume.title =
        row.资产编号 + " _ " + row.资产名称 + " _  履历";
      this.$refs.Resume.getResume(row.资产Id);
      this.$refs.Resume.dialogFormVisible = true;
    },
    // 高级搜索弹窗关闭回调
    drawerhandleClose() {
      this.drawerc = false;
    },
    // 打开更多扩展搜索条件
    More() {},
    //控制每页显示条数
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.onload();
    },
    //第几页
    handleCurrentChange(val) {
      // console.log(val)
      this.form.pageNum = val;
      this.onload();
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
        background: "rgba(0, 0, 0, 0.7)",
      });
      // console.log("row",row);
      get_accountleaderbyleaderId({
        ledgerId: parseInt(row.资产Id),
        分类名称: row.一级分类名称,
        categorytwoname: row.categoryname,
      }).then((res) => {
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
        setTimeout(function () {
          loading.close();
          that.$refs.Card.activeName = "first";
          that.$refs.Card.dialogVisible = true;
        }, 600);
        // console.log(res.data)
      });
    },
    onload() {
      this.form.fk_user = this.$store.getters.id_用户;
      this.form.rolename = this.$store.getters.角色名称;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      // loading.close();
      get_accountleader(this.form).then((res) => {
        loading.close();
        if (res.code == 100) {
          this.tableData = res.data;
          // this.tableData[0].所属分类 = "1",
          // this.tableData[0].二级分类名称 = "2",
          // this.tableData[0].三级分类名称 = "3",
          // this.tableData[0].四级分类名称 = "4",
          for (let i of this.tableData) {
            if (i.存放地点 === "") {
              i.存放地点 = i.建筑名称;
            } else {
              i.存放地点 = i.建筑名称 + "/" + i.存放地点;
            }
            if (
              i.四级分类名称 === "" &&
              i.三级分类名称 != "" &&
              i.二级分类名称 != "" &&
              i.所属分类 != ""
            ) {
              i.所属分类 =
                i.所属分类 + "/" + i.二级分类名称 + "/" + i.三级分类名称;
            } else if (
              i.三级分类名称 === "" &&
              i.二级分类名称 != "" &&
              i.所属分类 != ""
            ) {
              i.所属分类 = i.所属分类 + "/" + i.二级分类名称;
            } else if (i.二级分类名称 === "" && i.所属分类 != "") {
              i.所属分类 = i.所属分类;
            } else if (
              i.四级分类名称 != "" &&
              i.三级分类名称 != "" &&
              i.二级分类名称 != "" &&
              i.所属分类 != ""
            ) {
              i.所属分类 =
                i.所属分类 +
                "/" +
                i.二级分类名称 +
                "/" +
                i.三级分类名称 +
                "/" +
                i.四级分类名称;
            }
            // i.所属部门 = i.二级机构名称
          }
          this.form.count = res.count;
        } else {
          this.tableData = [];
          this.form.count = 0;
        }
      });
    },
    // 确定查询
    Insubmit() {
      this.drawerc = false;
      this.submit();
    },
    // 供应商
    get_supplier() {
      var data = {
        departmentwo: this.form.查询范围,
      };
      get_allschoolsupplier(data).then((res) => {
        this.供应商options = res.data;
      });
    },
    // 查询
    submit() {
      // console.log(this.form.归属部门);
      this.form.pageNum = 1;
      this.form.departmenthree = this.form.归属部门;
      if (this.form.departmenthree == "") {
        this.form.departmenthree = 0;
      }
      this.form.departmentwo = this.form.查询范围;
      this.form.fk_supplier = this.form.供应商;
      if (this.form.fk_supplier == "") {
        this.form.fk_supplier = 0;
      }
      if (this.form.存放地点 != undefined) {
        this.form.storagetwo = this.form.存放地点[1];
      }

      if (this.form.storagetwo == undefined) {
        this.form.storagetwo = 0;
      }
      if (this.form.date != null || this.form.date != undefined) {
        this.form.begintime = this.form.date[0];
        this.form.endtime = this.form.date[1];
      } else {
        this.form.begintime = "";
        this.form.endtime = "";
      }
      // console.log(this.form);
      if (this.form.sfValue == "否") {
        this.form.Istotime = 1;
      } else if (this.form.sfValue == "是") {
        this.form.Istotime = 2;
      } else {
        this.form.Istotime = 0;
      }

      this.form.userdescibtion = this.form.syfxValue; //使用方向
      this.form.ledger_state = this.form.ledger_state; //资产状态
      if (this.$store.getters.id_二级部门 == 0) {
        this.form.rolename = "";
      }
      // this.form.ledger_state=this.form.ledger_state;
      this.onload();
    },
    // 负责人选择
    UsersSelect(val) {
      // console.log(val);
      this.form.responseId = val[1];
    },
    //使用人
    UsersSelectUse(val) {
      // console.log(val);
      this.form.userId = val[1];
    },
    // 资产分类选择事件
    getAssteSort(val) {
      // console.log(val);
      this.form.categoryone = val.categoryone;
      this.form.categorytwo = val.categorytwo;
      this.form.categorythree = val.categorythree;
      this.form.categoryfour = val.categoryfour;
    },
    // 地点选择事件
    getLocation(val) {
      // console.log(val);
      this.form.storeone = val.storeone;
      this.form.storagetwo = val.storagetwo;
    },

    // 查询范围
    get_allschooldepartments() {
      var data = {
        departmentone: this.$store.getters.id_一级部门,
      };
      get_allschooldepartments(data).then((res) => {
        this.查询范围options = res.data;
        if (this.$store.getters.id_二级部门 == 0) {
          this.form.查询范围 == "";
          this.hidenAll = true;
          this.hidenOne = true;
        } else {
          this.form.查询范围 = this.$store.getters.id_二级部门;
          this.hidenAll = false;
          this.hidenOne = false;
          this.get_allschooldepartment(); //归属部门
          this.get_storagelocation(); //存放地点
        }
      });
    },
  },
  beforeMount() {
    this.get_allschooldepartments(); //查询范围
    this.onload();
    this.get_supplier();
    // this.get_allschooldepartment(); //归属部门
  },
};
</script>

<style>
</style>