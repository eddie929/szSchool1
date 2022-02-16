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
          </el-row>
          <el-row style="margin-top: 1%" :gutter="24">
            <el-col :span="8">
              <el-form-item
                label="申报(调出)单位"
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
            <el-col :span="8">
              <el-form-item
                label="申请人"
                :label-width="formLabelWidth"
                prop="申请人"
              >
                <el-input
                  v-model="form.申请人"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="申报日期"
                :label-width="formLabelWidth"
                prop="申报日期"
              >
                <el-input
                  v-model="form.申报日期"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-top: 1%" :gutter="24">
            <el-col :span="8">
              <el-form-item
                label="职务"
                :label-width="formLabelWidth"
                prop="职务"
              >
                <el-input
                  v-model="form.职务"
                  placeholder="请输入内容"
                  disabled
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="电话"
                :label-width="formLabelWidth"
                prop="电话"
              >
                <el-input
                  v-model="form.电话"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item
                label="调入单位"
                :label-width="formLabelWidth"
                prop="调入单位"
              >
                <el-select
                  style="width: 100%"
                  v-model="form.调入单位"
                  placeholder="请选择"
                  value-key="id"
                  clearable
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top: 1%">
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
          <el-row :gutter="24" style="margin-top: 1%">
            <el-col :span="24">
              <el-form-item
                label="原因说明"
                :label-width="formLabelWidth"
                prop="原因说明"
              >
                <el-input
                  v-model="form.原因说明"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button
          type="primary"
          @click="openAdd"
          class="el-icon-suitcase"
          style="margin-top: 1%"
        >
          待处置库</el-button
        >
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
          <el-table-column prop="原值" label="原值">
            <template slot-scope="scope">
              <span>{{ scope.row.原值.toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="净值" label="净值"> </el-table-column>
          <el-table-column prop="处置方式" label="处置方式"> </el-table-column>
        </el-table>
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
      <el-popconfirm
        title="再次确认确定"
        @confirm="btnok(1)"
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
    <Chuzhiku ref="Chuzhiku" @putselect="putselect" />
  </el-dialog>
</template>

<script>
import { get_flowDocumentNo } from "@/api/filehandle";
import Chuzhiku from "./chuzhiku.vue";
import { get_allschooldepartments } from "@/api/assetaccounthandle";
import {
  create_assetallocation,
  create_assetallocationdetail,
  get_assetallocationatabyId,
  assetallocation_rebacksubmit
} from "@/api/assetallocationhandle";
export default {
  components: { Chuzhiku },
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
        申报文号: "",
        单据编号: ""
      },
      options: [], //所有学校
      loading: false,
      tableData: []
    };
  },
  methods: {
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
      this.form.流程状态 = "待审核";
      console.log(this.form);
      console.log(this.tableData);
      assetallocation_rebacksubmit(this.form).then(res => {
        for (var i in this.tableData) {
          this.tableData[i].id = this.form.id;
        }
        create_assetallocationdetail(this.tableData).then(res => {
          this.get_box(res.code, "创建成功!");
          this.$emit("onload");
          this.dialogVisible = false;
        });
      });
      //   create_assetallocation(this.form).then((res) => {
      //     for (var i in this.tableData) {
      //       this.tableData[i].id = res.data;
      //     }
      //     create_assetallocationdetail(this.tableData).then((res) => {
      //       this.get_box(res.code, "创建成功!");
      //       this.$emit("onload");
      //       this.dialogVisible = false;
      //     });
      //   });
    },
    // 打开待处置库
    openAdd() {
      // console.log(this.form.处置方式);
      this.$refs.Chuzhiku.pageinfo.categoryname = this.form.处置方式;
      this.$refs.Chuzhiku.submit();
      this.$refs.Chuzhiku.dialogVisible = true;
    },
    putselect(row) {
      // console.log(row);
      this.tableData = row;
    },
    //   处置单  切换 详情单
    handleClick() {},
    // 查询所有学校
    get_allschooldepartments() {
      get_allschooldepartments({ departmentone: 25 }).then(res => {
        this.options = res.data;
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
    },
    //   查看详情
    onload(val) {
      this.loading = true;
      get_assetallocationatabyId({ id: val }).then(res => {
        for (var i in res.data) {
          res.data[i].处置方式 = "调拨";
        }
        this.tableData = res.data;
        this.loading = false;
      });
    },
    // 单据编号
    get_flowDocumentNo() {
      get_flowDocumentNo({
        flowname: "资产调拨",
        departmenttwo: this.$store.getters.id_二级部门
      }).then(res => {
        this.form.单据编号 = res.data;
      });
    }
  },
  beforeMount() {
    this.get_flowDocumentNo();
  }
};
</script>

<style></style>
