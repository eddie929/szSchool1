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
                label="处置方式"
                :label-width="formLabelWidth"
                prop="处置方式"
              >
                {{ form.处置方式 }}
              </el-form-item>
            </el-col>
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
          </el-row>
          <el-row style="margin-top: 1%" :gutter="24">
            <el-col :span="8">
              <el-form-item
                label="电话"
                :label-width="formLabelWidth"
                prop="电话"
              >
                {{ form.电话 }}
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
                label="原因说明"
                :label-width="formLabelWidth"
                prop="原因说明"
              >
                {{ form.原因说明 }}
              </el-form-item>
            </el-col>
          </el-row>

          <el-table
            ref="table"
            v-loading="loading"
            :data="tableData"
            border
            stripe
            show-summary
            :summary-method="getSummaries"
            :header-cell-style="{
              'text-align': 'center',
              background: '#eef1f6'
            }"
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
            <el-table-column prop="原值" label="原值">
              <template slot-scope="scope">
                <span>{{ scope.row.原值.toFixed(2) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="净值" label="净值"> </el-table-column>
            <el-table-column prop="处置方式" label="处置方式">
            </el-table-column>
          </el-table>
        </el-form>
        <!-- <el-collapse v-model="activeNames" accordion>
          <el-collapse-item title="处理信息" name="1"> -->
            <el-divider content-position="left">处理信息</el-divider>
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
                    <el-input
                      v-model="form.调出单位分管领导名称"
                      disabled
                      placeholder="暂无信息"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item
                    label="处理意见"
                    label-width="140px"
                    prop="remark"
                  >
                    <el-input
                      v-model="form.调出单位分管领导意见"
                      placeholder="暂无信息"
                      disabled
                    ></el-input>
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
                    <el-input
                      v-model="form.调入单位资产管理员名称"
                      disabled
                      placeholder="暂无信息"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item
                    label="处理意见"
                    label-width="140px"
                    prop="remark"
                  >
                    <el-input
                      v-model="form.调入单位资产管理员意见"
                      placeholder="暂无信息"
                      disabled
                    ></el-input>
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
                    <el-input
                      v-model="form.调入单位分管领导名称"
                      disabled
                      placeholder="暂无信息"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item
                    label="处理意见"
                    label-width="140px"
                    prop="remark"
                  >
                    <el-input
                      v-model="form.调入单位分管领导意见"
                      placeholder="暂无信息"
                      disabled
                    ></el-input>
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
                    <el-input
                      v-model="form.主管领导名称"
                      disabled
                      placeholder="暂无信息"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="批复文号"
                    label-width="140px"
                    prop="remark"
                  >
                    <el-input
                      v-model="form.批复文号"
                      placeholder="暂无信息"
                      disabled
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="处理意见"
                    label-width="140px"
                    prop="remark"
                  >
                    <el-input
                      v-model="form.主管领导意见"
                      placeholder="暂无信息"
                      disabled
                    ></el-input>
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
                    <el-input
                      v-model="form.主管领导处理时间"
                      disabled
                      placeholder="暂无信息"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="调出单位管理员"
                    label-width="140px"
                    prop="remark"
                  >
                    <el-input
                      v-model="form.调出单位确认人名称"
                      disabled
                      placeholder="暂无信息"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="处理时间"
                    label-width="140px"
                    prop="remark"
                  >
                    <el-input
                      v-model="form.调出单位确认时间"
                      disabled
                      placeholder="暂无信息"
                    ></el-input>
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
                    <el-input
                      v-model="form.调出单位确认人名称"
                      disabled
                      placeholder="暂无信息"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="调出单位确认时间"
                    label-width="140px"
                    prop="remark"
                  >
                    <el-input
                      v-model="form.调出单位确认时间"
                      disabled
                      placeholder="暂无信息"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="调入单位确认人名称"
                    label-width="140px"
                    prop="remark"
                  >
                    <el-input
                      v-model="form.调入单位确认人名称"
                      disabled
                      placeholder="暂无信息"
                    ></el-input>
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
                    <el-input
                      v-model="form.调入单位确认时间"
                      disabled
                      placeholder="暂无信息"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="调出单位记账人"
                    label-width="140px"
                    prop="remark"
                  >
                    <el-input
                      v-model="form.调出单位财务记账人员名称"
                      disabled
                      placeholder="暂无信息"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="记账时间"
                    label-width="140px"
                    prop="remark"
                  >
                    <el-input
                      v-model="form.调出单位财务处理时间"
                      disabled
                      placeholder="暂无信息"
                    ></el-input>
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
                    <el-input
                      v-model="form.调入单位财务记账人员名称"
                      disabled
                      placeholder="暂无信息"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="记账时间"
                    label-width="140px"
                    prop="remark"
                  >
                    <el-input
                      v-model="form.调入单位财务处理时间"
                      disabled
                      placeholder="暂无信息"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          <!-- </el-collapse-item>
        </el-collapse> -->
      </el-tab-pane>
      <el-tab-pane label="详情单" name="second">
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
          <el-table-column prop="原值" label="原值">
            <template slot-scope="scope">
              <span>{{ scope.row.原值.toFixed(2) }}</span>
            </template>
          </el-table-column>
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
      <el-button type="primary" class="el-icon-check" @click="sublim()">
        重新发起</el-button
      >
    </div>
    <Morem ref="Morem" @onload="onloads" />
  </el-dialog>
</template>

<script>
import { get_allschooldepartments } from "@/api/assetaccounthandle";
import {
  create_assetallocation,
  create_assetallocationdetail,
  get_assetallocationatabyId
} from "@/api/assetallocationhandle";
import Morem from "./Morem.vue";
export default {
  components: { Morem },
  data() {
    return {
      dialogTitle: "",
      dialogVisible: false,
      activeName: "frist",
      labelPosition: "left",
      formLabelWidth: "120px",
      form: {
        原因说明: "",
        电话: this.$store.getters.电话,
        申报文号: ""
      },
      options: [], //所有学校
      loading: false,
      tableData: [],
      activeNames: "",
      sform: {}
    };
  },
  methods: {
    onloads() {
      // this.$emit("onloads");
    },
    //   重新发起
    sublim() {
      this.$router.push({
        path: "/pendingDisposal",
        query: { data: this.form }
      });
      return;
      this.$refs.Morem.dialogTitle = "资产处置单";
      this.$refs.Morem.activeName = "first";
      this.$refs.Morem.form = this.form;
      // console.log("id", this.form.id);
      this.$refs.Morem.onload(this.form.id);
      this.$refs.Morem.get_allschooldepartments();
      this.$refs.Morem.dialogVisible = true;
      this.dialogVisible = false;
    },
    //   提交
    btnok() {
      if (this.form.调入单位 == "" || this.form.调入单位 == undefined) {
        this.msg("警告", "请选择调入单位");
        return;
      }
      this.form.一级机构ID = this.$store.getters.id_一级部门;
      this.form.二级机构ID = this.$store.getters.id_二级部门;
      this.form.流程代码 = 1;
      this.form.申请人Id = this.$store.getters.id_用户;
      this.form.申请人名称 = this.$store.getters.姓名;
      this.form.申请人职务 = this.$store.getters.职务;
      // console.log(this.form);
      // console.log(this.tableData);
      create_assetallocation(this.form).then(res => {
        for (var i in this.tableData) {
          this.tableData[i].id = res.data;
        }
        create_assetallocationdetail(this.tableData).then(res => {
          this.get_box(res.code, "创建成功!");
          this.$emit("onload");
          this.dialogVisible = false;
        });
      });
    },
    //   处置单  切换 详情单
    handleClick() {},
    // 查询所有学校
    get_allschooldepartments() {
      get_allschooldepartments({ departmentone: 25 }).then(res => {
        this.options = res.data;
      });
    },
    //   查看详情
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
