<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="80%"
    center
    top="7vh"
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
                label="申请时间"
                :label-width="formLabelWidth"
                prop="申请时间"
              >
                {{ form.提交时间 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="借用人"
                :label-width="formLabelWidth"
                prop="借用人"
              >
                {{ form.借用人 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="借出人"
                :label-width="formLabelWidth"
                prop="借出人"
                >{{ form.借出人 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="借用时间"
                :label-width="formLabelWidth"
                prop="借用时间"
              >
                {{ form.借用时间 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="预计归还时间"
                :label-width="formLabelWidth"
                prop="预计归还时间"
              >
                {{ form.预计归还时间 }}
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item
                label="备注信息"
                :label-width="formLabelWidth"
                prop="remark"
              >
                {{ form.备注信息 }}
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
            style="width: 100%; margin-top: 1%"
            max-height="450px"
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
            <el-table-column prop="保留原值" label="原值" align="right">
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
            <el-table-column prop="资产状态" label="资产状态">
            </el-table-column>

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
      v-if="hiden"
    >
      <el-popconfirm
        title="再次确认同意"
        @confirm="btnok(oktext)"
        style="margin-right: 20px"
      >
        <el-button
          type="primary"
          class="el-icon-check"
          slot="reference"
          v-show="show"
          >{{ oktext }}</el-button
        >
      </el-popconfirm>
      <el-popconfirm
        title="再次确认拒绝"
        @confirm="btnok(notext)"
        style="margin-right: 20px"
      >
        <el-button class="el-icon-close" slot="reference" v-show="show">{{
          notext
        }}</el-button>
      </el-popconfirm>
      <el-popconfirm
        title="再次确认撤销"
        @confirm="btnok(cxtext)"
        style="margin-right: 20px"
      >
        <el-button
          type="danger"
          class="el-icon-refresh-left"
          slot="reference"
          v-show="!show"
          >{{ cxtext }}</el-button
        >
      </el-popconfirm>
    </div>
  </el-dialog>
</template>

<script>
import { get_flowdata } from "@/api/filehandle";
import {
  get_assetlendingdatabyId,
  assetlendingdata_finaleapproval,
  assetlendingdata_Isnotfinaleapproval,
  assetlendingdata_borrowIsnotfinaleapproval,
  assetlendingapplicantremove
} from "@/api/assetlendinghandle";
export default {
  data() {
    return {
      active: 0,
      FlowList: [],
      activeName: "first",
      hiden: true,
      dialogVisible: false,
      dialogTitle: "资产借还单",
      tableData: [],
      form: {
        流程状态: "已提交"
      },
      labelPosition: "left",
      formLabelWidth: "100px",
      loading: false,
      oktext: "",
      notext: "",
      cxtext: "",
      show: false
    };
  },
  methods: {
    handleClick(tab, event) {},
    //  提交
    btnok(str) {
      // console.log("form", this.form);
      // console.log("str", str);
      if (str == "撤 销") {
        let data = {
          flowId: this.form.id,
          applicantId: this.$store.getters.id_用户,
          departmenttwo: this.$store.getters.id_二级部门,
          sort: 1
        };
        // console.log("data", data);
        assetlendingapplicantremove(data).then(res => {
          if (res.code != 2) {
            this.$notify.success("撤销成功!");
            this.$emit("onload");
            this.dialogVisible = false;
          } else {
            this.$notify.error(res.msg);
            this.$emit("onload");
            this.dialogVisible = false;
          }
        });
      }
      this.form.executive_name = this.form.借出人;
      this.form.borrowId = this.form.借用人Id;
      if (str == "同 意") {
        this.form.sort = 1;
        this.form.executive_agreenot = "同意";
        this.assetlendingdata_finaleapproval();
      } else if (str == "拒 绝") {
        this.form.sort = -1;
        this.form.executive_agreenot = "拒绝";
        this.assetlendingdata_finaleapproval();
      } else if (str == "归 还") {
        this.assetlendingdata_Isnotfinaleapproval();
      } else if (str == "确认归还") {
        this.assetlendingdata_borrowIsnotfinaleapproval();
      } else {
        this.dialogVisible = false;
      }
    },
    // 第一步 是否同意
    assetlendingdata_finaleapproval() {
      assetlendingdata_finaleapproval(this.form).then(res => {
        this.$emit("onload");
        this.get_box(res.code, "处理成功!");
        this.dialogVisible = false;
      });
    },
    // 第二部归还
    assetlendingdata_Isnotfinaleapproval() {
      this.form.borrowerid = this.form.借出人Id;
      assetlendingdata_Isnotfinaleapproval(this.form).then(res => {
        this.$emit("onload");
        this.get_box(res.code, "归还成功!");
        this.dialogVisible = false;
      });
    },
    // 第三部 确认归还
    assetlendingdata_borrowIsnotfinaleapproval() {
      assetlendingdata_borrowIsnotfinaleapproval(this.form).then(res => {
        this.$emit("onload");
        this.get_box(res.code, "确认归还成功!");
        this.dialogVisible = false;
      });
    },
    onload() {
      this.loading = true;
      get_assetlendingdatabyId({ id: this.form.id }).then(res => {
        this.tableData = res.data;
        for (let i of this.tableData) {
          if (i.存放地点 === "") {
            i.存放地点 = i.建筑名称;
          } else {
            i.存放地点 = i.建筑名称 + "/" + i.存放地点;
          }
        }
        this.loading = false;
      });
      setTimeout(() => {
        get_flowdata({ flowId: this.form.id, flowname: "资产借还" }).then(
          res => {
            this.FlowList = res.data;
            this.active = res.values;
          }
        );
      },500);
    },
    maturity(row) {
      // console.log("是否到期:", row.是否到期);
      if (row.是否到期 == 1) {
        return "否";
      } else {
        return "是";
      }
    }
  }
};
</script>

<style></style>
