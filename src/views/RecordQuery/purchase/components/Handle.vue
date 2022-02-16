<template>
  <el-dialog
    :title="titleDialog"
    :visible.sync="dialogVisible"
    append-to-body
    width="80%"
    center
    top="7vh"
    :close-on-click-modal="false"
  >
    <el-form ref="ruleForm" :label-position="labelPosition" :model="form">
      <div>
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
              label="申请人"
              :label-width="formLabelWidth"
              prop="remark"
            >
              <!-- <el-input
              v-model="form.申请人"
              placeholder="请输入内容"
              disabled
            ></el-input> -->
              {{ form.申请人 }}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="申请日期"
              :label-width="formLabelWidth"
              prop="申请日期"
            >
              {{ form.申请日期 }}
              <!-- <el-date-picker
              style="width: 100%"
              disabled
              v-model="form.申请日期"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" style="margin-top: 2%">
          <el-col :span="8">
            <el-form-item
              label="取得方式"
              :label-width="formLabelWidth"
              prop="取得方式"
            >
              <!-- <el-select
              v-model="form.取得方式"
              clearable
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> -->
              {{ form.购置方式 }}
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              label="取得日期"
              :label-width="formLabelWidth"
              prop="取得日期"
            >
              {{ form.取得日期 }}
              <!-- <el-date-picker
              v-model="form.取得日期"
              type="date"
              clearable
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            >
            </el-date-picker> -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="备注信息"
              :label-width="formLabelWidth"
              prop="remark"
            >
              {{ form.备注 }}
              <!-- <el-input
              style="width: 100%"
              v-model="form.备注"
              placeholder="请输入内容"
            ></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-table
          ref="table"
          :data="tableData"
          border
          stripe
          :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
          style="width: 100%; margin-top: 2%"
          max-height="400px"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column v-if="false" prop="id_用户" label="id" />
          <!-- <el-table-column label="资产编号" /> -->
          <el-table-column
            label="资产分类"
            prop="二级分类名称"
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
            label="资产名称"
            prop="资产名称"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="规格"
            label="规格"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="型号"
            label="型号"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="使用方向"
            prop="使用方向"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="数量(个)"
            prop="数量"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="原值"
            prop="保留原值"
            align="right"
            :show-overflow-tooltip="true"
          />
          <!-- <el-table-column label="净值" /> -->
          <el-table-column
            label="存放地点"
            prop="存放地点"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="归属部门"
            prop="归属部门"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="负责人"
            prop="负责人name"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="使用人"
            prop="使用人name"
            :show-overflow-tooltip="true"
          />
        </el-table>
        <el-row style="margin-top: 2%" :gutter="24">
          <el-col :span="6">
            <el-form-item
              label="供应商"
              :label-width="formLabelWidth"
              prop="供应商"
            >
              {{ form.供应商 }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="联系方式"
              :label-width="formLabelWidth"
              prop="联系方式"
            >
              {{ form.联系方式 }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="合同编号"
              :label-width="formLabelWidth"
              prop="合同编号"
            >
              {{ form.合同编号 }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="发票号"
              :label-width="formLabelWidth"
              prop="发票号"
              >{{ form.发票号 }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 1%" :gutter="24" v-if="han()">
          <el-col :span="6">
            <el-form-item
              label="验收人"
              :label-width="formLabelWidth"
              prop="验收人名称"
            >
              {{ form.验收人名称 }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="验收时间"
              :label-width="formLabelWidth"
              prop="验收时间"
            >
              {{ form.验收时间 }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="验收意见"
              :label-width="formLabelWidth"
              prop="验收意见"
            >
              {{ form.验收意见 }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 1%" :gutter="24">
          <el-col :span="6">
            <el-form-item
              label="记账人"
              :label-width="formLabelWidth"
              prop="财务处理人名称"
            >
              {{ form.财务处理人名称 }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="处理时间"
              :label-width="formLabelWidth"
              prop="财务处理时间"
            >
              {{ form.财务处理时间 }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="记账凭证号"
              :label-width="formLabelWidth"
              prop="财务记账凭证号"
            >
              {{ form.财务记账凭证号 }}
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="处理意见"
              :label-width="formLabelWidth"
              prop="财务处理意见"
            >
              {{ form.财务处理意见 }}
            </el-form-item>
          </el-col>
        </el-row>
        <div
          slot="footer"
          class="dialog-footer"
          style="text-align: center; margin-top: 2%"
          v-if="hiden"
        ></div>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import {
  get_purchaseacceptancedatadetails,
  purchaseacceptance_finaleapproval,
} from "@/api/purchaseacceptancehandle";

export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
      titleDialog: "固定资产入库单",
      labelPosition: "left",
      form: {
        btntext: "",
      },
      formLabelWidth: "90px",
      tableData: [],
      innerVisible: false,
      hiden: false,
    };
  },
  methods: {
    // 自定义合计方法
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (column.property === "保留原值") {
          const values = data.map((item) => Number(item[column.property]));
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            // sums[index] += " 元";
            sums[index] = sums[index].toFixed(2);
          } else {
            sums[index] = "N/A";
          }
        } else if (column.property === "数量") {
          const values = data.map((item) => Number(item[column.property]));
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += " 个";
          } else {
            sums[index] = "N/A";
          }
        }
      });
      return sums;
    },
    hide(row) {
      // console.log("rowwwww", row);
      if (
        row.二级分类名称 == "车辆" ||
        row.二级分类名称 == "文物" ||
        row.二级分类名称 == "土地、海域及无居民海岛" ||
        row.二级分类名称 == "房屋" ||
        row.二级分类名称 == "构筑物"
      ) {
        return true;
      } else {
        return false;
      }
    },
    onload() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      if (this.form.流程状态 == "已退回") {
        this.hiden = true;
      } else {
        this.hiden = false;
      }
      get_purchaseacceptancedatadetails({ ID: this.form.id }).then((res) => {
        this.tableData = res.data;
        setTimeout(() => {
          loading.close();
          this.dialogVisible = true;
        }, 200);
      });
    },
    // 判断是否是汉推
    han() {
      if (this.$store.getters.二级部门名称 == "苏州市汉语国际推广中学") {
        return true;
      } else {
        return false;
      }
    },

    // 解决双向绑定失效
    updateView(e) {
      this.$forceUpdate();
    },
  },
};
</script>

<style>
</style>