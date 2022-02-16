<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="75%"
    center
    :close-on-click-modal="false"
  >
    <el-form ref="ruleForm" :label-position="labelPosition" :model="form">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item
            label="流程状态"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-input
              v-model="form.流程状态"
              placeholder="请输入内容"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="账期"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-input
              v-model="form.账期"
              placeholder="请输入内容"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="申请人"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-input
              v-model="form.申请人"
              placeholder="请输入内容"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="margin-top: 1%">
        <el-col :span="24">
          <el-form-item
            label="备注信息"
            :label-width="formLabelWidth"
            style="width: 100%"
            prop="remark"
          >
            <el-input
              style="width: 100%"
              v-model="form.备注信息"
              placeholder="请输入内容"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-radio-group
      v-model="radio"
      @change="radiochange"
      style="margin-top: 1%"
    >
      <el-radio :label="3">汇总表</el-radio>
      <el-radio :label="6">明细表</el-radio>
    </el-radio-group>
    <div v-show="dis">
      <el-table
        ref="table"
        v-loading="loading"
        :data="tableData"
        border
        stripe
        :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
        style="width: 100%; margin-top: 1%"
      >
        <el-table-column label="资产分类" prop="资产分类" />
        <el-table-column label="数量(个)" prop="数量" />
        <el-table-column
          label="原值"
          prop="原值"
          align="right"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            {{ scope.row.原值.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          label="本期折旧"
          prop="本期折旧"
          align="right"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            {{ scope.row.本期折旧.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          label="累计折旧"
          prop="累计折旧"
          align="right"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            {{ scope.row.累计折旧.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          label="净值"
          prop="净值"
          align="right"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            {{ scope.row.净值.toFixed(2) }}
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
        height="400"
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
          prop="资产分类"
          label="资产分类"
          :show-overflow-tooltip="true"
        >
          <!-- <template slot-scope="scope">
            <span
              >{{ scope.row.一级分类名称 }}/{{ scope.row.二级分类名称 }}/{{
                scope.row.三级分类名称
              }}/{{ scope.row.四级分类名称 }}</span
            >
          </template> -->
        </el-table-column>
        <el-table-column
          prop="资产名称"
          label="资产名称"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="取得日期"
          label="取得日期"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="数量" label="数量(个)" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="原值"
          label="原值"
          align="right"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            {{ scope.row.原值.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="本期折旧"
          label="本期折旧"
          align="right"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            {{ scope.row.本期折旧.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="累计折旧"
          label="累计折旧"
          align="right"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            {{ scope.row.累计折旧.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="净值"
          label="净值"
          align="right"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            {{ scope.row.净值.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="折旧年限"
          label="折旧年限"
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
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <el-button type="primary" class="el-icon-check" @click="btnok(1)">
        确 定</el-button
      >
      <el-button class="el-icon-close" @click="dialogVisible = false">
        取 消</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import {
  get_depreciationassets,
  get_depreciationassetsdetail,
  create_depreciationdata,
  create_depreciationdatadetailsum,
} from "@/api/depreciationhandle";
export default {
  data() {
    return {
      dialogTitle: "计提本期折旧",
      dialogVisible: false,
      labelPosition: "left", // 对齐方向
      formLabelWidth: "100px", // label宽度
      form: {
        流程状态: "待记账",
        申请人: this.$store.getters.姓名,
        账期: this.dayjs().format("YYYY年MM月"),
      },
      radio: 3,
      loading: false,
      tableData: [],
      dis: true,
      tableDatas: [],
      pageinfo: {
        pageNum: 1, //第几页
        pageSize: 10, //一页多少条
        count: 0, //数据总数
        pagesizes: [10, 20, 30, 50],
      },
    };
  },
  methods: {
    //   提交
    btnok() {
      this.form.申请人Id = this.$store.getters.id_用户;
      this.form.一级机构ID = this.$store.getters.id_一级部门;
      this.form.二级机构ID = this.$store.getters.id_二级部门;
      // console.log(this.form);
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      create_depreciationdata(this.form).then((res) => {
        for (var i in this.tableData) {
          this.tableData[i].id = res.data;
        }
        // console.log(this.tableData);
        create_depreciationdatadetailsum(this.tableData).then((ress) => {
          loading.close();
          this.get_box(ress.code, "创建成功!");
          this.$emit("onload");
          this.dialogVisible = false;
        });
      });
    },
    radiochange(val) {
      this.pageinfo.count = 0;
      //   this.tableData = [];
      //   this.tableDatas = [];
      if (val != 3) {
        this.onloads();
        this.dis = false;
      } else {
        this.onload();
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
    onload() {
      var data = {
        departmentone: this.$store.getters.id_一级部门,
        departmenttwo: this.$store.getters.id_二级部门,
      };
      this.loading = true;
      get_depreciationassets(data).then((res) => {
        this.tableData = res.data;
        this.loading = false;
      });
    },
    onloads() {
      this.loading = true;
      this.pageinfo.departmentone = this.$store.getters.id_一级部门;
      this.pageinfo.departmenttwo = this.$store.getters.id_二级部门;
      get_depreciationassetsdetail(this.pageinfo).then((res) => {
        this.tableDatas = res.data;
        this.pageinfo.count = res.count;
        this.loading = false;
      });
    },
  },
};
</script>

<style>
</style>