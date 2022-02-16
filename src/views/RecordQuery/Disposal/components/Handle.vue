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
                label="申报单位"
                :label-width="formLabelWidth"
                prop="remark"
              >
                {{ form.申报单位 }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="申报日期"
                :label-width="formLabelWidth"
                prop="remark"
              >
                {{ form.申报日期 }}
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
                label="申请人"
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
          <el-row :gutter="24" style="margin-top: 1%">
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
          <el-table-column prop="原值" label="原值" align="right">
          </el-table-column>
          <el-table-column prop="净值" label="净值" align="right">
          </el-table-column>
        </el-table>
        <el-form ref="ruleForm" :label-position="labelPosition" :model="sform">
          <el-row :gutter="24" style="margin-top: 2%">
            <el-col :span="8">
              <el-form-item
                label="申报单位(分管领导)"
                label-width="140px"
                prop="remark"
              >
                <el-input
                  v-model="form.分管领导名称"
                  disabled
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item
                label="处理意见"
                :label-width="formLabelWidth"
                prop="remark"
              >
                <el-input
                  v-model="form.分管处理意见"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item label="主管部门" label-width="140px" prop="remark">
                <el-input
                  v-model="form.主管领导名称"
                  disabled
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item
                label="处理意见"
                :label-width="formLabelWidth"
                prop="remark"
              >
                <el-input
                  v-model="form.主管领导处理意见"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item label="记账人" label-width="140px" prop="remark">
                <el-input
                  v-model="form.财务人员名称"
                  disabled
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item
                label="批复文号"
                :label-width="formLabelWidth"
                prop="remark"
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
          :summary-method="getSummaries"
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
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <el-button type="primary" class="el-icon-check" @click="btnok(1)">
        记 账</el-button
      >
      <el-button class="el-icon-close" @click="dialogVisible = false">
        取 消</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import {
  create_assetretirement,
  create_assetretirementdetail
} from "@/api/assetretirementhandle";
import {
  get_assetretirementdatadetail,
  assetretirement_approval,
  assetretirementleader_approval,
  assetretirementleader_finallyapproval
} from "@/api/assetretirementhandle";
export default {
  data() {
    return {
      dialogTitle: "",
      dialogVisible: false,
      activeName: "first",
      form: {},
      labelPosition: "left",
      formLabelWidth: "80px",
      tableData: [],
      loading: false,
      sform: {}
    };
  },
  methods: {
    handleClick(val) {
      // console.log(val);
    },
    btnok(val) {
      if (this.form.批复文号 == "" || this.form.批复文号 == null) {
        this.msg("警告", "请填写批复文号");
        return;
      }
      this.form.流程代码 = val;
      this.form.财务处理Id = this.$store.getters.id_用户;
      assetretirementleader_finallyapproval(this.form).then(res => {
        this.get_box(res.code, "审批成功!");
        this.$emit("onload");
        this.dialogVisible = false;
      });
    },
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
        if (index === 11) {
          sums[index] = "";
          return;
        }
        if (index === 12) {
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
    },
    onload(val) {
      get_assetretirementdatadetail({ id: val }).then(res => {
        this.tableData = res.data;
      });
    }
  }
};
</script>

<style scoped></style>
