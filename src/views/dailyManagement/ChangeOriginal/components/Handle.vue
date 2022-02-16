<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="80%"
    center
    top="5vh"
    :close-on-click-modal="false"
  >
    <el-form ref="ruleForm" :label-position="labelPosition" :model="form">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="处置单" name="first">
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item
                label="流程状态"
                :label-width="formLabelWidth"
                prop="流程状态"
              >
                {{ form.流程状态 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="单据编号"
                :label-width="formLabelWidth"
                prop="单据编号"
              >
                {{ form.单据编号 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="申请日期"
                :label-width="formLabelWidth"
                prop="申请日期"
              >
                {{ form.申请日期 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="申请人"
                :label-width="formLabelWidth"
                prop="申请人"
              >
                {{ form.申请人 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="变动方式"
                :label-width="formLabelWidth"
                prop="变动方式"
              >
                {{ form.变动方式 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="变动原因"
                :label-width="formLabelWidth"
                prop="变动原因"
              >
                {{ form.变动原因 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-table
            ref="table"
            v-loading="loading"
            :data="tableData"
            border
            stripe
            :header-cell-style="{
              'text-align': 'center',
              background: '#eef1f6'
            }"
            style="width: 100%; margin-top: 2%"
            max-height="470px"
            :cell-style="yellowBg"
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
            <el-table-column prop="使用方向" label="使用方向">
            </el-table-column>
            <el-table-column prop="数量" label="数量(个)"> </el-table-column>
            <el-table-column
              prop="原值"
              label="变动前原值"
              width="120"
              align="right"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.原值.toFixed(2) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="变动金额"
              label="变动金额"
              width="120"
              align="right"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.变动金额.toFixed(2) }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="变动后原值"
              label="变动后原值"
              width="120"
              align="right"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.变动后原值.toFixed(2) }}</span>
              </template>
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
            <el-table-column prop="资产状态" label="资产状态">
            </el-table-column>

            <el-table-column prop="是否到期" label="是否到期">
              <template slot-scope="scope">
                <span>{{ maturity(scope.row) }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-form-item
            label="处理意见"
            :label-width="formLabelWidth"
            prop="remark"
            style="margin-top: 1%"
            v-show="hiden"
          >
            <el-input
              v-model="form.财务是否同意"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="流程" name="second">
          <el-row :gutter="24" style="margin-top:20px">
            <el-col :span="24">
              <el-steps :active="active">
                <el-step
                  v-for="item in FlowList"
                  :title="item.title"
                  :key="item.id"
                ></el-step>
              </el-steps>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <el-popconfirm
        title="再次确认确定"
        @confirm="btnok(1)"
        style="margin-right: 20px"
      >
        <el-button
          type="primary"
          class="el-icon-check"
          slot="reference"
          v-show="hiden"
        >
          确 定</el-button
        >
      </el-popconfirm>
      <el-popconfirm
        title="再次确认拒绝"
        @confirm="btnok(-1)"
        style="margin-right: 20px"
      >
        <el-button class="el-icon-close" slot="reference" v-show="hiden">
          拒 绝</el-button
        >
      </el-popconfirm>
      <el-popconfirm title="再次确认撤销" @confirm="btnok(2)">
        <el-button
          type="danger"
          class="el-icon-refresh-left"
          slot="reference"
          v-show="!hiden"
        >
          撤 销</el-button
        >
      </el-popconfirm>
    </div>
  </el-dialog>
</template>

<script>
import { get_flowdata } from "@/api/filehandle";
import {
  get_originaldatalbyId,
  originaldata_finaleapproval,
  originalapplicantremove
} from "@/api/originalchangehandle";
export default {
  data() {
    return {
      active: 0,
      FlowList: [],
      activeName: "first",
      hiden: false,
      dialogTitle: "原值变动单",
      dialogVisible: false,
      labelPosition: "left",
      formLabelWidth: "100px",
      form: {},
      tableData: [],
      loading: false
    };
  },
  methods: {
    handleClick(tab, event) {},
    onload() {
      setTimeout(() => {
        get_flowdata({ flowId: this.form.Id, flowname: "原值变动" }).then(
          res => {
            this.FlowList = res.data;
            this.active = res.values;
          }
        );
      }, 500);
    },
    btnok(val) {
      if (val == 2) {
        let data = {
          flowId: this.form.Id,
          applicantId: this.$store.getters.id_用户,
          departmenttwo: this.$store.getters.id_二级部门,
          sort: 1
        };
        originalapplicantremove(data).then(res => {
          if (res.code != 2) {
            this.$notify.success("撤销成功!");
            this.$emit("select");
            this.dialogVisible = false;
          } else {
            this.$notify.error(res.msg);
            this.$emit("select");
            this.dialogVisible = false;
          }
        });
      } else {
        if (
          this.form.财务是否同意 == "" ||
          this.form.财务是否同意 == undefined
        ) {
          this.msg("警告", "请输入处理意见!");
          return;
        }
        this.form.流程代码 = val;
        this.form.id = this.form.Id;
        this.form.记账人名称 = this.$store.getters.姓名;
        this.form.记账日期 = this.dayjs().format("YYYY-MM-DD");
        originaldata_finaleapproval(this.form).then(res => {
          this.dialogVisible = false;
          this.get_box(res.code, "处理成功!");
          this.$emit("select");
        });
      }
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
    gettable(val) {
      get_originaldatalbyId({ id: val }).then(res => {
        this.tableData = res.data;
        for (let i of this.tableData) {
          if (i.存放地点 === "") {
            i.存放地点 = i.建筑名称;
          } else {
            i.存放地点 = i.建筑名称 + "/" + i.存放地点;
          }
        }
      });
    },
    yellowBg({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 9) {
        return {
          background: "#F5F5F5"
        };
      }
    }
  }
};
</script>

<style></style>
