<template>
  <el-dialog
    :title="titleDialog"
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
                {{ form.申请人名称 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="联系方式"
                :label-width="formLabelWidth"
                prop="联系方式"
              >
                {{ form.联系方式 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 1%">
            <el-col :span="24">
              <el-form-item
                label="备注信息"
                :label-width="formLabelWidth"
                prop="备注信息"
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
            style="width: 100%; margin-top: 2%"
            max-height="470px"
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
              prop="保留原值"
              label="原值"
              align="right"
              :show-overflow-tooltip="true"
            >
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
          </el-table>
          <el-row style="margin-top: 1%" :gutter="24">
            <el-col :span="8">
              <el-form-item
                label="存放地点变更为"
                prop="存放地点变更为"
                :label-width="formLabelWidth"
              >
                {{ form.变更新存放地点 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="归属部门变更为"
                prop="归属部门变更为"
                :label-width="formLabelWidth"
              >
                {{ form.变更新部门 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="负责人变更为"
                prop="负责人变更为"
                :label-width="formLabelWidth"
              >
                {{ form.变更新负责人 }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-dialog
            title="财务审批"
            :visible.sync="enddialogVisible"
            width="30%"
            :close-on-click-modal="false"
            append-to-body
          >
            <el-form-item
              label="审批意见"
              :label-width="formLabelWidth"
              prop="remark"
            >
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="form.审核是否同意"
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
                @confirm="btnok(1)"
                style="margin-right: 20px"
              >
                <el-button type="primary" class="el-icon-check" slot="reference"
                  >提 交
                </el-button>
              </el-popconfirm>
              <el-popconfirm
                title="再次确认退回"
                @confirm="btnok(-1)"
                style="margin-right: 20px"
              >
                <el-button class="el-icon-close" slot="reference"
                  >退 回</el-button
                >
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
    <!-- <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <el-button type="primary" class="el-icon-check" @click="openend()">
        审 批</el-button
      >
    </div> -->
  </el-dialog>
</template>

<script>
import { get_flowdata } from "@/api/filehandle";
import {
  get_assetstransferdatalbyId,
  assetstransfer_approval
} from "@/api/assetstransferhandle";
export default {
  data() {
    return {
      active: 0,
      FlowList: [],
      activeName: "first",
      titleDialog: "资产转移单",
      dialogVisible: false,
      form: {},
      tableData: [],
      loading: false,
      formLabelWidth: "120px",
      labelPosition: "left",
      enddialogVisible: false
    };
  },
  methods: {
    handleClick(tab, event) {},
    onload() {
      setTimeout(() => {
        get_flowdata({ flowId: this.form.id, flowname: "资产转移" }).then(
          res => {
            this.FlowList = res.data;
            this.active = res.values;
          }
        );
      }, 500);
    },
    openend() {
      this.enddialogVisible = true;
    },
    btnok(val) {
      // console.log(val);
      if (this.form.审核是否同意 == "") {
        this.msg("警告", "请输入审批意见!");
        return;
      }
      this.form.审核人名称 = this.$store.getters.姓名;
      this.form.流程代码 = val;
      this.form.审核人Id = this.$store.getters.id_用户;
      assetstransfer_approval(this.form).then(res => {
        this.get_box(res.code, "发起成功!");
        this.$emit("select");
        this.enddialogVisible = false;
        this.dialogVisible = false;
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
    get_assetstransferdatalbyId() {
      this.loading = true;
      get_assetstransferdatalbyId({ id: this.form.id }).then(res => {
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
    }
  }
};
</script>

<style></style>
