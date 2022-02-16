<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="80%"
    center
    top="9vh"
    :close-on-click-modal="false"
    append-to-body
    ><el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="处置单" name="first">
        <el-form ref="ruleForm" :label-position="labelPosition" :model="form">
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
                label="申报单位"
                :label-width="formLabelWidth"
                prop="申报单位"
              >
                {{ form.申报单位 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="申报日期"
                :label-width="formLabelWidth"
                prop="申报日期"
              >
                {{ form.申报日期 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="处置方式"
                :label-width="formLabelWidth"
                prop="处置方式"
              >
                {{ form.处置方式 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="记账凭证"
                :label-width="formLabelWidth"
                prop="记账凭证"
              >
                {{ form.记账凭证 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="申请人名称"
                :label-width="formLabelWidth"
                prop="申请人名称"
              >
                {{ form.申请人名称 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="职务"
                :label-width="formLabelWidth"
                prop="申请人职务"
              >
                {{ form.申请人职务 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="联系电话"
                :label-width="formLabelWidth"
                prop="电话"
              >
                {{ form.电话 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-top: 1%" :gutter="24">
            <el-col :span="8">
              <el-form-item
                label="调入单位"
                :label-width="formLabelWidth"
                prop="调入单位"
              >
                {{ form.调入单位名称 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="申报文号"
                :label-width="formLabelWidth"
                prop="申报文号"
              >
                {{ form.申报文号 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="批复文号"
                :label-width="formLabelWidth"
                prop="批复文号"
              >
                {{ form.批复文号 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-top: 1%" :gutter="24">
            <el-col :span="24">
              <el-form-item
                label="处置原因"
                :label-width="formLabelWidth"
                prop="原因说明"
              >
                {{ form.原因说明 }}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table
          ref="table"
          v-loading="loading"
          :data="tableData"
          border
          stripe
          show-summary
          :summary-method="getSummaries"
          :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
          style="width: 100%; margin-top: 1%"
          max-height="400px"
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
          <el-table-column prop="数量" label="数量(个)"> </el-table-column>
          <el-table-column prop="保留原值" label="原值" align="right">
          </el-table-column>
          <el-table-column prop="保留净值" label="净值" align="right">
          </el-table-column>
        </el-table>
        <el-form ref="ruleForm" :label-position="labelPosition" :model="sform">
          <el-row :gutter="24" style="margin-top: 2%">
            <el-col :span="8">
              <el-form-item
                label="调出单位(分管领导)"
                label-width="140px"
                prop="调出单位分管领导名称"
              >
                <el-input
                  v-model="form.调出单位分管领导名称"
                  disabled
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="处理意见"
                label-width="140px"
                prop="调出单位分管领导意见"
              >
                <el-input
                  v-model="form.调出单位分管领导意见"
                  placeholder="请输入内容"
                  :disabled="form.流程代码 > 1"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="处理时间"
                label-width="140px"
                prop="调出单位分管领导处理时间"
              >
                <el-input
                  disabled
                  v-model="form.调出单位分管领导处理时间"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 2%" v-if="form.流程代码 > 1">
            <el-col :span="8">
              <el-form-item
                label="调入单位(管理员)"
                label-width="140px"
                prop="调入单位资产管理员名称"
              >
                <el-input
                  v-model="form.调入单位资产管理员名称"
                  disabled
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="处理意见"
                label-width="140px"
                prop="调入单位资产管理员意见"
              >
                <el-input
                  v-model="form.调入单位资产管理员意见"
                  placeholder="请输入内容"
                  :disabled="form.流程代码 > 2"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="处理时间"
                label-width="140px"
                prop="调入单位资产管理员处理时间"
              >
                <el-input
                  v-model="form.调入单位资产管理员处理时间"
                  disabled
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 2%" v-if="form.流程代码 > 2">
            <el-col :span="8">
              <el-form-item
                label="调入单位(分管领导)"
                label-width="140px"
                prop="调入单位分管领导名称"
              >
                <el-input
                  v-model="form.调入单位分管领导名称"
                  disabled
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="处理意见"
                label-width="140px"
                prop="调入单位分管领导意见"
              >
                <el-input
                  v-model="form.调入单位分管领导意见"
                  placeholder="请输入内容"
                  :disabled="form.流程代码 > 3"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="处理时间"
                label-width="140px"
                prop="调入单位分管领导处理时间"
              >
                <el-input
                  v-model="form.调入单位分管领导处理时间"
                  disabled
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 2%" v-if="form.流程代码 > 3">
            <el-col :span="8">
              <el-form-item
                label="主管领导"
                label-width="140px"
                prop="主管领导名称"
              >
                <el-input
                  v-model="form.主管领导名称"
                  disabled
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="处理意见"
                label-width="140px"
                prop="主管领导意见"
              >
                <el-input
                  v-model="form.主管领导意见"
                  placeholder="请输入内容"
                  :disabled="form.流程代码 > 4"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="处理时间"
                label-width="140px"
                prop="主管领导处理时间"
              >
                <el-input
                  v-model="form.主管领导处理时间"
                  disabled
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 2%" v-if="form.流程代码 == 4">
            <el-col :span="8">
              <el-form-item
                label="批复文号"
                label-width="140px"
                prop="批复文号"
              >
                <el-input
                  v-model="form.批复文号"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="明细" name="second">
        <el-table
          ref="table"
          v-loading="loading"
          :data="tableData"
          border
          stripe
          show-summary
          :summary-method="getSummariess"
          :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
          style="width: 100%; margin-top: 1%"
          max-height="400px"
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
          <el-table-column prop="使用方向" label="使用方向"> </el-table-column>
          <el-table-column prop="数量" label="数量(个)"> </el-table-column>
          <el-table-column prop="原值" label="原值"> </el-table-column>
          <el-table-column prop="净值" label="净值"> </el-table-column>
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
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="附件" name="third">
        <el-row :gutter="24" style="margin-top:20px">
          <el-col :span="24">
            <UploadFileOn ref="UploadFileOn" @select="onload" />
          </el-col>
        </el-row>
        <el-row :gutter="24" style="margin-top:40px">
          <el-col :span="24">
            <UploadFileDown ref="UploadFileDown" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="流程" name="fourth">
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
        <el-button type="primary" class="el-icon-check" slot="reference">
          确 定</el-button
        >
      </el-popconfirm>
      <el-button class="el-icon-close" @click="btnok(-1)">拒 绝</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { get_flowdata } from "@/api/filehandle";
import UploadFileOn from "@/bitcomponents/GeneralUploadAttachment/index.vue";
import UploadFileDown from "@/bitcomponents/GeneralUploadFile/index.vue";
import {
  get_assetallocationatabyId,
  assetallocation_approval,
  assetallocation_approvalhandle,
  assetallocation_mangerapprovalhandle,
  assetallocation_mangerapprovalhandles
} from "@/api/assetallocationhandle";
export default {
  components: { UploadFileOn, UploadFileDown },
  data() {
    return {
      active: 0,
      FlowList: [],
      dialogTitle: "",
      dialogVisible: false,
      activeName: "first",
      form: {},
      sform: {},
      labelPosition: "left",
      formLabelWidth: "120px",
      tableData: [],
      loading: false
    };
  },
  methods: {
    // 提交
    btnok(val) {
      if (this.form.流程代码 == 1) {
        if (
          this.form.调出单位分管领导意见 == "" ||
          this.form.调出单位分管领导意见 == null
        ) {
          this.msg("警告", "请填写处理意见");
          return;
        }
        this.form.流程代码 = val;
        // console.log(this.form);
        var data = {
          id: this.form.id,
          调出单位分管领导名称: this.form.调出单位分管领导名称,
          调出单位分管领导意见: this.form.调出单位分管领导意见,
          调出单位分管领导Id: this.form.调出单位分管领导Id,
          流程代码: val,
          调入单位: this.form.调入单位
        };
        // console.log(data);
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        assetallocation_approval(data).then(res => {
          loading.close();
          this.get_box(res.code, "审批成功!");
          this.$emit("onload");
          this.dialogVisible = false;
        });
      } else if (this.form.流程代码 == 2) {
        // console.log(this.form);
        if (
          this.form.调入单位资产管理员意见 == "" ||
          this.form.调入单位资产管理员意见 == null
        ) {
          this.msg("警告", "请输入调入单位管理员意见");
          return;
        }
        var data = {
          id: this.form.id,
          调入单位资产管理员名称: this.$store.getters.姓名,
          调入单位资产管理员意见: this.form.调入单位资产管理员意见,
          调入单位资产管理员Id: this.$store.getters.id_用户,
          流程代码: val
        };
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        // console.log(data);
        // return;
        assetallocation_approvalhandle(data).then(res => {
          loading.close();
          this.get_box(res.code, "审批成功!");
          this.$emit("onload");
          this.dialogVisible = false;
        });
      } else if (this.form.流程代码 == 3) {
        if (
          this.form.调入单位分管领导意见 == "" ||
          this.form.调入单位分管领导意见 == null
        ) {
          this.msg("警告", "请输入调入分管领导意见");
          return;
        }
        var data = {
          id: this.form.id,
          调入单位分管领导名称: this.form.调入单位分管领导名称,
          调入单位分管领导意见: this.form.调入单位分管领导意见,
          调入单位分管领导Id: this.$store.getters.id_用户,
          流程代码: val
        };
        // console.log(data);
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        assetallocation_mangerapprovalhandle(data).then(res => {
          loading.close();
          this.get_box(res.code, "审批成功!");
          this.$emit("onload");
          this.dialogVisible = false;
        });
      } else if (this.form.流程代码 == 4) {
        if (this.form.主管领导意见 == "" || this.form.主管领导意见 == null) {
          this.msg("警告", "请输入主管领导意见");
          return;
        }
        if (this.form.批复文号 == "" || this.form.批复文号 == null) {
          this.msg("警告", "请输入批复文号");
          return;
        }
        var data = {
          id: this.form.id,
          主管领导名称: this.form.主管领导名称,
          主管领导意见: this.form.主管领导意见,
          批复文号: this.form.批复文号,
          主管领导Id: this.$store.getters.id_用户,
          流程代码: val,
          调出单位: this.form.调出单位
        };
        // console.log(data);
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        assetallocation_mangerapprovalhandles(data).then(res => {
          loading.close();
          this.get_box(res.code, "审批成功!");
          this.$emit("onload");
          this.dialogVisible = false;
        });
      } else if (this.form.流程代码 == 5) {
      }
    },
    // 查看详情
    onload(val) {
      this.loading = true;
      //   this.form.调出单位分管领导名称 = this.$store.getters.姓名;
      //   this.form.调出单位分管领导Id = this.$store.getters.id_用户;
      get_assetallocationatabyId({ id: val }).then(res => {
        for (var i in res.data) {
          res.data[i].处置方式 = "调拨";
        }
        this.tableData = res.data;
        this.loading = false;
        setTimeout(() => {
          let data = [];
          data.单据编号 = this.form.单据编号;
          data.flowname = "资产调拨";
          this.$refs.UploadFileOn.onload(data);
          this.$refs.UploadFileDown.onload(data);
        }, 500);
      });
      get_flowdata({ flowId: this.form.id, flowname: "资产调拨" }).then(res => {
        this.FlowList = res.data;
        this.active = res.values;
      });
    },
    handleClick() {},
    // 合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index === 1) {
          sums[index] = "";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = sums[index].toFixed(2); //保留2位小数
          sums[2] = parseInt(sums[2]);
          sums[2] += " 个";
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
    getSummariess(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (
          index === 1 ||
          index === 2 ||
          index === 3 ||
          index === 4 ||
          index === 5 ||
          index === 9 ||
          index === 10 ||
          index === 11 ||
          index === 12 ||
          index === 13 ||
          index === 14 ||
          index === 15
        ) {
          sums[index] = "";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = sums[index].toFixed(2); //保留2位小数
          sums[6] = parseInt(sums[6]);
          sums[6] += " 个";
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
    // 判断是否到期
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
