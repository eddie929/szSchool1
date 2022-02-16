<template>
  <div style="margin: 1%">
    <el-form
      :inline="true"
      :v-model="form"
      ref="ruleForm"
      label-width="100px"
      style="text-align: center"
      class="demo-ruleForm"
    >
      <!-- <el-form-item label="盘点任务:" style="margin-bottom: 0px">
        <el-link type="primary">{{ form.任务名称 }}</el-link>
      </el-form-item> -->
      <el-form-item style="text-align: right">
        <!-- <el-button type="success" size="small" @click="exportWord"
          >导出</el-button
        > -->
      </el-form-item>
      <el-form-item v-show="false">
        <el-link
          type="info"
          :underline="false"
          style="margin: 0px 10px 0px 10px:text-decoration:none;"
          >本次盘点任务总资产共({{ form.allSum }}) 资产总值({{
            form.allMoney
          }})</el-link
        >
        <!-- <el-link
          type="success"
          :underline="false"
          style="margin: 0px 5px 0px 5px"
          >已盘点({{ form.yesSum }})</el-link
        >
        <el-link
          type="danger"
          :underline="false"
          style="margin: 0px 5px 0px 5px"
          >未盘点({{ form.noSum }})</el-link
        > -->
      </el-form-item>
    </el-form>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <h3 style="text-align: center; font-size: 20px">盘点报告</h3>
        <!-- <el-collapse v-model="activeNames">
        <el-collapse-item title="任务" name="1"> -->
        <el-divider content-position="left">基本信息</el-divider>
        <el-form
          style="padding-left:30%"
          ref="forms"
          :model="forms"
          :label-width="labelwidth"
          :label-position="labelPosition"
        >
          <el-form-item label="单据编号">
            {{ form.单据编号 }}
          </el-form-item>
          <el-form-item label="任务名称">
            {{ form.任务名称 }}
          </el-form-item>
          <el-form-item label="发起人">
            {{ form.发布人 }}
          </el-form-item>
          <el-form-item label="发布方">
            {{ form.发布方 }}
          </el-form-item>
          <el-form-item label="完成日期">
            {{ this.dayjs().format("YYYY-MM-DD") }}</el-form-item
          >

          <el-form-item label="盘点人员" prop="crew_way">
            {{ form.盘点指定人员 }}
          </el-form-item>
          <el-form-item label="盘点方式" prop="crew_way">
            {{ form.盘点方式 }}
          </el-form-item>
          <el-form-item label="结束日期" prop="crew_way">
            {{ form.结束时间 }}
          </el-form-item>
          <el-form-item label="开始日期" prop="crew_way">
            {{ form.开始时间 }}
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            {{ form.remark }}
          </el-form-item>
          <!-- <el-divider content-position="left">盘点范围</el-divider>
          <el-form-item label="资产状态" prop="fk_nowstate">
            {{ form.nowstate_lable }}
          </el-form-item>
          <el-form-item label="资产原值" prop="original_money">
            {{ form.original_money }}
          </el-form-item>
          <el-form-item label="取得日期" prop="atdate_lable">
            {{ form.atdate_lable }}
          </el-form-item>
          <el-form-item label="资产类别" prop="at_edate">
            {{ form.atsorttwo_lable }}
          </el-form-item>
          <el-form-item label="盘点部门" prop="at_edate">
            {{ form.departmenttwo_lable }}
          </el-form-item>
          <el-form-item label="盘点地点" prop="at_edate">
            {{ form.storagetwo_lable }}
          </el-form-item> -->
        </el-form>
      </el-col>
    </el-row>

    <el-divider content-position="left">盘点结果</el-divider>

    <!-- </el-tab-pane>
      </el-tabs> -->
    <el-form :model="form">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="盘盈合计" prop="at_edate">
            <el-link type="primary">{{ 盘盈总值 }}</el-link>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="盘盈数量" prop="at_edate">
            <el-link type="primary">{{ 盘盈件数 }}</el-link>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="ytableData"
      ref="itsmDataTable"
      style="width: 100%; margin-top: 1%"
      v-loading="ploading"
      :highlight-current-row="true"
      stripe
      border
      :fit="true"
      :header-cell-style="{
        'text-align': 'center',
        background: '#eef1f6'
      }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column
        type="selection"
        :reserve-selection="true"
        v-if="displayselection"
        width="55"
      ></el-table-column>
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column
        prop="资产编号"
        label="资产编号"
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
        prop="一级类别名称"
        label="资产类别"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="原值" label="原值" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="一级部门名称"
        label="使用部门"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="资产品牌"
        label="资产品牌"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="资产型号"
        label="资产型号"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="责任人"
        label="责任人"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
    </el-table>
    <!-- </el-tab-pane>
        <el-tab-pane label="盘亏明细" name="盘亏明细"> -->
    <el-form :model="form">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="盘亏合计" prop="at_edate">
            <!-- <el-input v-model="盘亏价值" readonly></el-input> -->
            <el-link type="primary">{{ 盘亏价值 }}</el-link>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="盘亏数量" prop="at_edate">
            <!-- <el-input v-model="盘亏数目" readonly></el-input> -->
            <el-link type="primary">{{ 盘亏数目 }}</el-link>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="ntableData"
      ref="itsmDataTable"
      style="width: 100%; margin-top: 1%"
      v-loading="ploading"
      :highlight-current-row="true"
      border
      stripe
      :fit="true"
      :header-cell-style="{
        'text-align': 'center',
        background: '#eef1f6'
      }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column
        type="selection"
        :reserve-selection="true"
        v-if="displayselection"
        width="55"
      ></el-table-column>
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column
        prop="资产编码"
        label="资产编号"
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
        prop="一级分类名称"
        label="资产类别"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="原值" label="原值" :show-overflow-tooltip="true">
        <template slot-scope="{ row }">
          <span style="float:right"> {{ row.原值 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="净值" label="净值" :show-overflow-tooltip="true">
        <template slot-scope="{ row }">
          <span style="float:right"> {{ row.净值 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="所属部门"
        label="归属部门"
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
      <el-table-column
        prop="使用方向"
        label="使用方向"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="负责人"
        label="负责人"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="使用人"
        label="使用人"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  inventorygaininventory,
  checkatinfo_insert,
  get_checksum,
  get_checkatstate,
  get_checkatsort,
  get_checkatledgertotal,
  get_checkreport
} from "@/api/inventoryhandle";
// import "echarts/theme/walden.js"; //引用Echarts主题
// import "echarts/theme/vintage.js"; //引用Echarts主题
// import "echarts/theme/macarons.js"; //引用Echarts主题
// import "echarts/theme/浅色.js"; //引用Echarts主题
// import Docxtemplater from "docxtemplater";
// import PizZip from "pizzip";
// import JSZipUtils from "jszip-utils";
// import { saveAs } from "file-saver";
export default {
  data() {
    return {
      lookDetail: { name: "李四", order_date: "2020-02-26" }, //测试
      labelwidth: "85px", //表单label宽度
      labelPosition: "left", //表单label对齐方式
      form: {},
      forms: {},
      checkyeorsno: false, //已盘未盘切换
      ploading: false,
      tableData: [],
      ytableData: [], //盘盈
      ntableData: [], //盘亏
      pageinfo: {
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50],
        count: 0,
        check_state: "未盘点",
        id_check: 0,
        id_user: 0
      },
      activeName: "盘盈明细", //盘点报告 || 盘点明细
      radio: "全部盘点资产", //全部盘点资产  ||  我得盘点资产
      displayselection: false,

      activeNames: "2",
      盘盈总值: "",
      盘盈件数: "",
      盘亏数目: "",
      盘亏价值: ""
    };
  },
  methods: {
    // 点击导出word
    exportWord() {
      const that = this;
      // 读取并获得模板文件的二进制内容//./gy-agree-service.docx
      JSZipUtils.getBinaryContent("Demo.docx", function(error, content) {
        // gy-agree-service.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
        // 抛出异常
        console.log("执行:", error);
        if (error) {
          console.log(error);
          throw error;
        }
        // console.log(content);
        // 创建一个PizZip实例，内容为模板的内容
        const zip = new PizZip(content);
        // 创建并加载docxtemplater实例对象
        const doc = new Docxtemplater().loadZip(zip);
        // 设置模板变量的值
        doc.setData({
          name: that.lookDetail.name,
          order_date: that.lookDetail.order_time
        });
        try {
          // 用模板变量的值替换所有模板变量
          doc.render();
        } catch (error) {
          // 抛出异常
          const e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          };
          // console.log(JSON.stringify({ error: e }));
          throw error;
        }

        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        const out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, "同意书.docx");
      });
    },

    // 查询盘点报告
    get_checkreport(id) {
      get_checkreport({ fk_check: id }).then(res => {
        if (res.code >= 0) {
          this.盘盈总值 = res.data.盘盈合计;
          this.盘盈件数 = res.data.盘盈数量;
          this.盘亏数目 = res.data.盘亏数量;
          this.盘亏价值 = res.data.盘亏合计;
          this.ytableData = res.data.盘盈资产;
          this.ntableData = res.data.盘亏资产;
        }
      });
    },

    //获取全部任务数量
    getAllSum() {
      this.getAllSums({
        id_check: this.form.id,
        id_user: 0,
        check_state: "全部"
      });
    },
    //获取全部数量
    getAllSums(data) {
      get_checksum(data).then(res => {
        if (res.code > 0) {
          this.form.allSum = res.count;
        }
      });
    },

    //查询 盘点资产 总价
    get_checkatledgertotal(id) {
      get_checkatledgertotal({ id_check: id }).then(res => {
        if (res.code >= 0) {
          this.form.allMoney = res.count;
          // console.log(res.count)
        }
      });
    },
    //form转换
    formToforms(row) {
      // 原值
      if (row.original_money == 0) {
        row.original_money = "全部";
      }
      //购置日期
      if (row.atdate_lable == null) {
        row.atdate_lable = "全部";
      }
      //存放地点
      if (row.storage_lable == null && row.storagetwo_lable == null) {
        row.storagetwo_lable = "全部";
      }
      if (row.storage_lable != null && row.storagetwo_lable != null) {
        row.storagetwo_lable = row.storage_lable + "," + row.storagetwo_lable;
      }
      if (row.storage_lable != null && row.storagetwo_lable == null) {
        row.storagetwo_lable = row.storage_lable;
      }
      // 类别
      if (row.atsort_lable == null && row.atsorttwo_lable == null) {
        row.atsorttwo_lable = "全部";
      }
      if (row.atsort_lable != null && row.atsorttwo_lable != null) {
        row.atsorttwo_lable = row.atsort_lable + "," + row.atsorttwo_lable;
      }
      if (row.atsort_lable != null && row.atsorttwo_lable == null) {
        row.atsorttwo_lable = row.atsort_lable;
      }
      // 部门
      if (row.departmenttwo_lable == null) {
        row.departmenttwo_lable = "全部";
      }
      //手动选择
      if (row.freedom == "是") {
        row.freedom = true;
      } else {
        row.freedom = false;
      }
      this.forms = row;
    },
    //判断是否允许手动盘点
    judge() {
      // console.log("freedom", this.form.freedom);
      if (this.form.freedom == false) {
        this.displayselection = false;
      } else {
        this.displayselection = true;
        if (this.radio == "全部盘点资产") {
          this.displayselection = false;
        } else {
          this.displayselection = true;
        }
      }
      if (this.form.sort == 0) {
        this.displayselection = false;
      }
    },
    getinventorygaininventory() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let reqdata = { ID: this.form.ID, statename: "盘亏" };
      // console.log(reqdata);
      inventorygaininventory(reqdata)
        .then(res => {
          if (res.code == 100) {
            this.ntableData = res.data;
            // if (this.tableData.length > 0 && this.assetType == "盘盈") {
            //   this.isShowWarehousing = true;
            // } else {
            //   this.isShowWarehousing = false;
            // }
          }
          loading.close();
        })
        .catch(error => {
          loading.close();
        });
    }
  },
  mounted() {},
  beforeMount: function() {
    this.form = [];
    if (this.$route.query.data.ID == null) {
      this.$store.dispatch("tagsView/delView", this.$route); //关闭当前标签
      this.$router.go(-1); //返回上一级
      return;
    }
    this.form = this.$route.query.data;
    // this.onload(this.form);
    this.formToforms(this.form);
    this.getinventorygaininventory();
    return;
    this.getAllSum();
    this.get_checkatledgertotal(this.form.id);
    this.judge();
    this.get_checkreport(this.form.id);
    //  this.myEcharts1();
  }
};
</script>

<style></style>
