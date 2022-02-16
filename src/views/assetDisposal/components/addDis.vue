<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="80%"
    center
    top="5vh"
    :close-on-click-modal="false"
    append-to-body
    ><el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="处置单" name="first">
        <el-form
          ref="ruleForm"
          :label-position="labelPosition"
          :model="form"
          :rules="rules"
        >
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item
                label="流程状态"
                :label-width="formLabelWidth"
                prop="流程状态"
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
                label="单据编号"
                :label-width="formLabelWidth"
                prop="单据编号"
              >
                <el-input
                  v-model="form.单据编号"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="申报单位"
                :label-width="formLabelWidth"
                prop="申报单位"
              >
                <el-input
                  v-model="form.申报单位"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
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
                <el-input
                  v-model="form.申报日期"
                  placeholder="请输入内容"
                  value-format="yyyy-MM-dd"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="处置方式"
                :label-width="formLabelWidth"
                prop="处置方式"
              >
                <el-input
                  v-model="form.处置方式"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="记账凭证"
                :label-width="formLabelWidth"
                prop="记账凭证"
              >
                <el-input
                  v-model="form.记账凭证"
                  placeholder=""
                  disabled
                ></el-input>
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
                <el-input
                  v-model="form.申请人名称"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="职务"
                :label-width="formLabelWidth"
                prop="职务"
              >
                <el-input
                  v-model="form.申请人职务"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="联系电话"
                :label-width="formLabelWidth"
                prop="电话"
              >
                <el-input
                  v-model="form.电话"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 1%">
            <el-col :span="8">
              <el-form-item
                label="处置原因"
                :label-width="formLabelWidth"
                prop="原因说明"
              >
                <el-input
                  v-model="form.原因说明"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="申报文号"
                :label-width="formLabelWidth"
                prop="申报文号"
              >
                <el-input
                  v-model="form.申报文号"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="批复文号"
                :label-width="formLabelWidth"
                prop="批复文号"
              >
                <el-input
                  v-model="form.批复文号"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
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
          style="width: 100%; margin-top: 2%"
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
            <!-- <template slot-scope="scope">
              <span>{{ scope.row.原值.toFixed(2) }}</span>
            </template> -->
          </el-table-column>
          <el-table-column prop="保留净值" label="净值" align="right">
          </el-table-column>
          <el-table-column prop="处置方式" label="处置方式"> </el-table-column>
        </el-table>
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
          <el-table-column prop="保留原值" label="原值" align="right">
            <!-- <template slot-scope="scope">
              <span>{{ scope.row.原值.toFixed(2) }}</span>
            </template> -->
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
      <!-- <el-tab-pane label="流程" name="fourth">
        <el-row :gutter="24" style="margin-top:20px">
          <el-col :span="24">
            <el-steps :active="2" finish-status="success">
              <el-step
                v-for="item in FlowList"
                :title="item.title"
                :key="item.id"
              ></el-step>
            </el-steps>
          </el-col>
        </el-row>
      </el-tab-pane> -->
    </el-tabs>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <el-popconfirm
        title="再次确认确定"
        @confirm="btnok('ruleForm')"
        style="margin-right: 20px"
      >
        <el-button type="primary" class="el-icon-check" slot="reference">
          确 定</el-button
        >
      </el-popconfirm>
      <el-button class="el-icon-close" @click="dialogVisible = false">
        取 消</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
// import { get_flowdata } from "@/api/filehandle";
import UploadFileOn from "@/bitcomponents/GeneralUploadAttachment/index.vue";
import UploadFileDown from "@/bitcomponents/GeneralUploadFile/index.vue";
import { get_flowDocumentNo } from "@/api/filehandle";
import {
  create_assetretirement,
  create_assetretirementdetail
} from "@/api/assetretirementhandle";
export default {
  components: { UploadFileOn, UploadFileDown },
  data() {
    return {
      active: 0,
      FlowList: [],
      dialogTitle: "",
      dialogVisible: false,
      activeName: "first",
      form: { 单据编号: "", 电话: this.$store.getters.手机 },
      rules: {
        申报文号: [
          {
            required: true,
            message: "请填写申报文号",
            trigger: "change"
          }
        ]
      },
      labelPosition: "left",
      formLabelWidth: "80px",
      tableData: [],
      loading: false
    };
  },
  methods: {
    onload() {
      setTimeout(() => {
        this.form.flowname = "资产报废";
        this.$refs.UploadFileOn.onload(this.form);
        this.$refs.UploadFileDown.onload(this.form);
      }, 500);
      // get_flowdata({
      //   flowId: this.form.id,
      //   flowname: "资产报废"
      // }).then(res => {
      //   this.FlowList = res.data;
      //   this.active = res.values;
      // });
    },
    handleClick(val) {
      // console.log(val);
    },
    btnok(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.二级机构ID = this.$store.getters.id_二级部门;
          this.form.一级机构ID = this.$store.getters.id_一级部门;
          this.form.申请人Id = this.$store.getters.id_用户;
          this.form.流程代码 = 1;
          // console.log(this.form);

          // console.log(this.tableData);
          create_assetretirement(this.form).then(res => {
            for (var i in this.tableData) {
              this.tableData[i].flowId = res.data;
            }
            create_assetretirementdetail(this.tableData).then(res => {
              this.get_box(res.code, "创建成功!");
              this.$emit("select");
              this.dialogVisible = false;
            });
          });
        }
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
        if (index != 2) {
          sums[index] = "";
          return;
        }
        if (index === 5) {
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
          sums[index] += 0;
        } else {
          sums[index] = 0;
        }

        sums[index] = sums[index].toFixed(2); //保留2位小数
        sums[2] = parseInt(sums[2]);
        sums[2] += " 个";
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
          index === 6 ||
          index === 9 ||
          index === 10 ||
          index === 11 ||
          index === 12 ||
          index === 13 ||
          index === 14 ||
          index === 15 ||
          index === 16
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
          sums[index] += 0;
        } else {
          sums[index] = 0;
        }

        sums[index] = sums[index].toFixed(2); //保留2位小数
        sums[7] = parseInt(sums[7]);
        sums[7] += " 个";
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
    // 单据编号
    get_flowDocumentNo() {
      get_flowDocumentNo({
        flowname: "资产报废",
        departmenttwo: this.$store.getters.id_二级部门
      }).then(res => {
        this.form.单据编号 = res.data;
      });
    }
  }
};
</script>

<style scoped></style>
