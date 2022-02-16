<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="80%"
    center
    top="7vh"
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
                prop="remark"
              >
                {{ form.流程状态 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="单据编号"
                :label-width="formLabelWidth"
                prop="remark"
              >
                {{ form.单据编号 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="申报单位"
                :label-width="formLabelWidth"
                prop="remark"
              >
                {{ form.申报单位 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="处置方式"
                :label-width="formLabelWidth"
                prop="remark"
              >
                {{ form.处置方式 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="申请人名称"
                :label-width="formLabelWidth"
                prop="remark"
              >
                {{ form.申请人名称 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="职务"
                :label-width="formLabelWidth"
                prop="remark"
              >
                {{ form.申请人职务 }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-top: 1%" :gutter="24">
            <el-col :span="8">
              <el-form-item
                label="电话"
                :label-width="formLabelWidth"
                prop="remark"
              >
                {{ form.电话 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="申报文号"
                :label-width="formLabelWidth"
                prop="remark"
              >
                {{ form.申报文号 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="原因说明"
                :label-width="formLabelWidth"
                prop="remark"
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
          <el-table-column prop="原值" label="原值"> </el-table-column>
          <el-table-column prop="净值" label="净值"> </el-table-column>
        </el-table>
        <el-collapse v-model="activeNames" accordion>
          <el-collapse-item title="处理信息" name="1">
            <el-form
              ref="ruleForm"
              :label-position="labelPosition"
              :model="sform"
            >
              <el-row :gutter="24" style="margin-top: 1%">
                <el-col :span="8">
                  <el-form-item
                    label="调出单位(分管领导)"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.调出单位分管领导名称 }}
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item
                    label="处理意见"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.调出单位分管领导意见 }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" style="margin-top: 1%">
                <el-col :span="8">
                  <el-form-item
                    label="调入单位(管理员)"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.调入单位资产管理员名称 }}
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item
                    label="处理意见"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.调入单位资产管理员意见 }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" style="margin-top: 1%">
                <el-col :span="8">
                  <el-form-item
                    label="调入单位(分管领导)"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.调入单位分管领导名称 }}
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item
                    label="处理意见"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.调入单位分管领导意见 }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" style="margin-top: 1%">
                <el-col :span="8">
                  <el-form-item
                    label="主管领导"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.主管领导名称 }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="批复文号"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.批复文号 }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="处理意见"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.主管领导意见 }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" style="margin-top: 1%">
                <el-col :span="8">
                  <el-form-item
                    label="主管领导处理时间"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.主管领导处理时间 }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="调出单位管理员"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.调出单位确认人名称 }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="处理时间"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.调出单位确认时间 }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" style="margin-top: 1%">
                <el-col :span="8">
                  <el-form-item
                    label="调出单位确认人名称"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.调出单位确认人名称 }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="调出单位确认时间"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.调出单位确认时间 }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="调入单位确认人名称"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.调入单位确认人名称 }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" style="margin-top: 1%">
                <el-col :span="8">
                  <el-form-item
                    label="调入单位确认时间"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.调入单位确认时间 }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="调出单位记账人"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.调出单位财务记账人员名称 }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="记账时间"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.调出单位财务处理时间 }}
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24" style="margin-top: 1%">
                <el-col :span="8">
                  <el-form-item
                    label="调入单位记账人"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.调入单位财务记账人员名称 }}
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="记账时间"
                    label-width="140px"
                    prop="remark"
                  >
                    {{ form.调入单位财务处理时间 }}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-collapse-item>
        </el-collapse>
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
          max-height="300px"
          height="300px"
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
    </el-tabs>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <el-button type="primary" class="el-icon-check" @click="btnok(1)">
        {{ confirm }}</el-button
      >
      <el-button class="el-icon-close" @click="btnok(-1)">{{
        confirms
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  get_assetallocationatabyId,
  assetallocation_approval,
  assetallocation_approvalhandle,
  assetallocation_mangerapprovalhandle,
  assetallocation_mangerapprovalhandles,
  assetallocation_lhandles,
  assetallocation_lhandle,
  assetallocationfinally,
  assetallocationouytfinally
} from "@/api/assetallocationhandle";
export default {
  data() {
    return {
      dialogTitle: "",
      dialogVisible: false,
      activeName: "first",
      form: {},
      sform: {},
      labelPosition: "left",
      formLabelWidth: "120px",
      tableData: [],
      loading: false,
      confirm: "",
      confirms: "",
      activeNames: ""
    };
  },
  methods: {
    //   提交
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
        assetallocation_approval(data).then(res => {
          this.get_box(res.code, "审批成功!");
          this.$emit("onload");
          this.dialogVisible = false;
        });
      } else if (this.form.流程代码 == 2) {
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
        assetallocation_approvalhandle(data).then(res => {
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
        assetallocation_mangerapprovalhandle(data).then(res => {
          this.get_box(res.code, "审批成功!");
          this.$emit("onload");
          this.dialogVisible = false;
        });
      } else if (this.form.流程代码 == 4) {
        if (this.form.主管领导意见 == "" || this.form.主管领导意见 == null) {
          this.msg("警告", "请输入主管领导意见");
          return;
        }
        var data = {
          id: this.form.id,
          主管领导名称: this.form.主管领导名称,
          主管领导意见: this.form.主管领导意见,
          主管领导Id: this.$store.getters.id_用户,
          流程代码: val,
          调出单位: this.form.调出单位
        };
        assetallocation_mangerapprovalhandles(data).then(res => {
          this.get_box(res.code, "审批成功!");
          this.$emit("onload");
          this.dialogVisible = false;
        });
      } else if (this.form.流程代码 == 5) {
        var data = {
          id: this.form.id,
          调出单位确认Id: this.$store.getters.id_用户,
          调入单位: this.form.调入单位,
          调出单位: this.form.调出单位
        };
        if (val == 1) {
          data.调出单位是否调出 = "是";
        } else {
          data.调出单位是否调出 = "否";
        }
        assetallocation_lhandles(data).then(res => {
          this.get_box(res.code, "审批成功!");
          this.$emit("onload");
          this.dialogVisible = false;
        });
      } else if (this.form.流程代码 == 6) {
        var data = {
          id: this.form.id,
          调入单位确认人Id: this.$store.getters.id_用户,
          调入单位: this.form.调入单位
        };
        if (val == 1) {
          data.调入单位是否调入 = "是";
        } else {
          data.调入单位是否调入 = "否";
        }
        assetallocation_lhandle(data).then(res => {
          this.get_box(res.code, "审批成功!");
          this.$emit("onload");
          this.dialogVisible = false;
        });
      } else if (this.form.流程代码 == 7) {
        if (val == -1) {
          this.dialogVisible = false;
        }
        var data = {
          id: this.form.id,
          调出单位财务记账Id: this.$store.getters.id_用户,
          调出单位: this.form.调出单位,
          调入单位: this.form.调入单位
        };
        assetallocationfinally(data).then(res => {
          this.get_box(res.code, "审批成功!");
          this.$emit("onload");
          this.dialogVisible = false;
        });
      } else if (this.form.流程代码 == 8) {
        if (val == -1) {
          this.dialogVisible = false;
        }
        var data = {
          id: this.form.id,
          调入单位财务记账Id: this.$store.getters.id_用户,
          调入单位: this.form.调入单位
        };
        assetallocationouytfinally(data).then(res => {
          this.get_box(res.code, "审批成功!");
          this.$emit("onload");
          this.dialogVisible = false;
        });
      }
    },
    //   查看详情
    onload(val) {
      this.form.调出单位分管领导名称 = this.$store.getters.姓名;
      this.form.调出单位分管领导Id = this.$store.getters.id_用户;
      get_assetallocationatabyId({ id: val }).then(res => {
        for (var i in res.data) {
          res.data[i].处置方式 = "调拨";
        }
        this.tableData = res.data;
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
        if (index === 15) {
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
          sums[index] += "";
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
        if (index === 1 || index === 9 || index === 11 || index === 12) {
          sums[index] = "";
          return;
        }
        if (index === 15) {
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
          sums[index] += "";
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
