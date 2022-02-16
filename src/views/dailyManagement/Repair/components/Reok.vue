<template>
  <el-dialog
    :title="titleDialog"
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
                label="报修单号"
                :label-width="formLabelWidth"
                prop="单据编号"
              >
                {{ form.单据编号 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="报修日期"
                :label-width="formLabelWidth"
                prop="报修日期"
              >
                {{ form.报修时间 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="报修人"
                :label-width="formLabelWidth"
                prop="报修人"
              >
                {{ form.报修人名称 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="报修人电话"
                :label-width="formLabelWidth"
                prop="报修人电话"
              >
                {{ form.报修人电话 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="报修地址"
                :label-width="formLabelWidth"
                prop="报修地址"
              >
                {{ form.报修地址 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-top: 1%">
            <el-col :span="16">
              <el-form-item
                label="故障描述"
                :label-width="formLabelWidth"
                prop="故障描述"
              >
                {{ form.故障描述 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="故障照片"
                label-width="200px"
                prop="故障照片"
                style="margin-left:16px"
              >
                <img
                  v-if="form.url"
                  :src="form.url"
                  class="avatar"
                  fit="contain"
                  style="width: 200px; height: 150px"
                />
              </el-form-item>
              <!-- <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
            style="font-size: 50px"
          ></i> -->
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
            <el-table-column prop="保留原值" label="原值"> </el-table-column>
            <el-table-column prop="保留净值" label="净值"> </el-table-column>
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
          <el-dialog
            title="结果反馈"
            :visible.sync="enddialogVisible"
            width="30%"
            :close-on-click-modal="false"
            append-to-body
          >
            <el-form-item
              label="维修结果"
              :label-width="formLabelWidth"
              prop="remark"
            >
              <el-radio-group v-model="form.维修结果">
                <el-radio label="已解决">已解决</el-radio>
                <el-radio label="未解决">未解决</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="问题说明"
              :label-width="formLabelWidth"
              prop="remark"
            >
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form.问题说明"
              >
              </el-input>
            </el-form-item>
            <div
              slot="footer"
              class="dialog-footer"
              style="text-align: center; margin-top: 2%"
            >
              <el-popconfirm
                title="再次确认提交"
                @confirm="endok()"
                style="margin-right: 20px"
              >
                <el-button type="primary" class="el-icon-check" slot="reference"
                  >提 交
                </el-button>
              </el-popconfirm>
            </div>
          </el-dialog>
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
        title="再次确认完成"
        @confirm="btnok(endText)"
        style="margin-right: 20px"
      >
        <el-button
          type="primary"
          class="el-icon-check"
          slot="reference"
          v-show="hiden"
        >
          {{ endText }}</el-button
        >
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
          v-show="!hiden"
          >{{ cxtext }}</el-button
        >
      </el-popconfirm>
    </div>
    <Peos ref="Peos" @end="end" />
  </el-dialog>
</template>

<script>
import { get_flowdata } from "@/api/filehandle";
import {
  get_purchaseacceptancelistdetail,
  purchaseacceptancelist_finaleapprovals,
  purchaseacceptancelist_repairapproval,
  purchaseacceptancelist_finaleapproval,
  assetarepairapplicantremove
} from "@/api/assetarepairhandle";
import Peos from "./peos.vue";
export default {
  components: { Peos },
  data() {
    return {
      active: 0,
      FlowList: [],
      activeName: "first",
      hiden: true,
      dialogVisible: false,
      labelPosition: "left",
      formLabelWidth: "120px",
      form: {},
      loading: false,
      tableData: [],
      titleDialog: "",
      options: [], //报修地址
      imageUrl: "",
      endText: "",
      cxtext: "",
      enddialogVisible: false
    };
  },
  methods: {
    handleClick(tab, event) {},
    end() {
      this.$emit("end");
      this.dialogVisible = false;
    },
    btnok(str) {
      // console.log("str", str);
      if (str == "撤 销") {
        let data = {
          flowId: this.form.id,
          applicantId: this.$store.getters.id_用户,
          departmenttwo: this.$store.getters.id_二级部门,
          rolename: this.$store.getters.角色名称,
          sort: 1
        };
        // console.log("data", data);
        assetarepairapplicantremove(data).then(res => {
          if (res.code != 2) {
            this.$notify.success("撤销成功!");
            this.$emit("end");
            this.dialogVisible = false;
          } else {
            this.$notify.error(res.msg);
            this.$emit("end");
            this.dialogVisible = false;
          }
        });
      } else {
        if (str == "维修完成") {
          purchaseacceptancelist_repairapproval({
            维修单ID: this.form.id
          }).then(res => {
            this.get_box(res.code, "维修已完成!");
            this.dialogVisible = false;
            this.$emit("end");
          });
        } else {
          // console.log("结果反馈", this.form);
          this.form.维修结果 = "";
          this.form.问题说明 = "";
          this.enddialogVisible = true;
        }
      }
    },
    endok() {
      // console.log(this.form);
      this.form.维修单ID = this.form.id;
      this.form.反馈人 = this.$store.getters.姓名;
      purchaseacceptancelist_finaleapproval(this.form).then(res => {
        this.get_box(res.code, "结果反馈成功!");
        this.dialogVisible = false;
        this.enddialogVisible = false;
        this.$emit("end");
      });
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
    onload() {
      get_purchaseacceptancelistdetail({ 维修单ID: this.form.id }).then(res => {
        this.tableData = res.data;
        for (let i of this.tableData) {
          if (i.存放地点 === "") {
            i.存放地点 = i.建筑名称;
          } else {
            i.存放地点 = i.建筑名称 + "/" + i.存放地点;
          }
        }
      });
      setTimeout(() => {
        get_flowdata({ flowId: this.form.id, flowname: "资产报修" }).then(
          res => {
            this.FlowList = res.data;
            this.active = res.values;
          }
        );
      }, 500);
    }
  }
};
</script>

<style></style>
