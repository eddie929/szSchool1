<template>
  <el-dialog
    :title="titleDialog"
    :visible.sync="dialogVisible"
    width="80%"
    center
    top="3vh"
    :close-on-click-modal="false"
  >
    <el-form ref="ruleForm" :label-position="labelPosition" :model="form">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item
            label="流程状态"
            :label-width="formLabelWidth"
            prop="流程状态"
          >
            {{ form.流程状态 }}
            <!-- <el-input
              v-model="form.流程状态"
              placeholder="请输入内容"
              disabled
            ></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="申请人"
            :label-width="formLabelWidth"
            prop="申请人"
          >
            {{ form.申请人 }}
            <!-- <el-input
              v-model="form.申请人"
              placeholder="请输入内容"
              disabled
            ></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="申请日期"
            :label-width="formLabelWidth"
            prop="申请日期"
          >
            {{ form.申请日期 }}
            <!-- <el-input
              v-model="form.申请日期"
              placeholder="请输入内容"
              disabled
            ></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="margin-top: 1%">
        <el-col :span="8">
          <el-form-item
            label="联系方式"
            :label-width="formLabelWidth"
            prop="联系方式"
          >
            {{ form.联系方式 }}
            <!-- <el-input
              v-model="form.联系方式"
              placeholder="请输入内容"
              oninput="value=value.replace(/[^\d]/g,'')"
            ></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item
            label="备注信息"
            :label-width="formLabelWidth"
            prop="备注信息"
          >
            {{ form.备注信息 }}
            <!-- <el-input
              v-model="form.备注信息"
              placeholder="请输入内容"
            ></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-button type="primary" plain style="margin-top: 2%" @click="addAseet"
        >添加资产</el-button
      > -->
      <el-table
        ref="table"
        v-loading="loading"
        :data="tableData"
        border
        stripe
        :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
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
          prop="一级分类名称"
          label="资产分类"
          :show-overflow-tooltip="true"
        >
          <!-- <template slot-scope="scope">
            <span
              >{{ scope.row.一级分类名称 }}/{{ scope.row.二级分类名称 }}/{{
                scope.row.三级分类名称
              }}/{{ scope.row.四级分类名称 }}</span
            >
          </template> -->
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

        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >
              移除
            </el-button>
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
            <!-- <el-select
              v-model="form.存放地点value"
              placeholder="请选择"
              style="width: 85%"
              value-key="存放地点二级ID"
              clearable
            >
              <el-option
                v-for="item in 存放地点options"
                :key="item.存放地点二级ID"
                :label="item.房间名称"
                :value="item"
              >
              </el-option>
            </el-select> -->
            <!-- <el-cascader
              style="width: 100%"
              ref="cunfang"
              :options="存放地点options"
              :props="存放defaultProps"
              filterable
              :show-all-levels="true"
              clearable
              v-model="form.存放地点value"
            ></el-cascader> -->
            {{
              form.存放地点value.存放地点一级 +
              "/" +
              form.存放地点value.存放地点
            }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="归属部门变更为"
            prop="归属部门变更为"
            :label-width="formLabelWidth"
          >
            <!-- <el-select
              v-model="form.归属部门value"
              placeholder="请选择"
              style="width: 85%"
              value-key="部门Id"
              clearable
            >
              <el-option
                v-for="item in 归属部门options"
                :key="item.部门Id"
                :label="item.部门名称"
                :value="item"
              >
              </el-option>
            </el-select> -->
            {{ form.归属部门value.部门名称 }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="负责人变更为"
            prop="负责人变更为"
            :label-width="formLabelWidth"
          >
            <!-- <el-select
              v-model="form.负责人value"
              placeholder="请选择"
              style="width: 85%"
              value-key="id"
              clearable
              filterable
            >
              <el-option
                v-for="item in 负责人options"
                :key="item.id"
                :label="item.name"
                :value="item"
              >
              </el-option>
            </el-select> -->
            {{ form.负责人value.name }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top: 1%" :gutter="24" v-if="hiden">
        <el-col :span="8">
          <el-form-item
            label="审批人"
            prop="审批人"
            :label-width="formLabelWidth"
          >
            {{ form.审核人名称 }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="审批时间"
            prop="审批时间"
            :label-width="formLabelWidth"
          >
            {{ form.审核时间 }}
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="审批意见"
            prop="审核意见"
            :label-width="formLabelWidth"
          >
            {{ form.审核意见 }}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
      v-if="!hiden"
    >
      <el-popconfirm
        title="再次确认提交"
        @confirm="btnok(1)"
        style="margin-right: 20px"
      >
        <el-button type="primary" class="el-icon-check" slot="reference">
          提 交</el-button
        >
      </el-popconfirm>
      <el-popconfirm
        title="再次确认保存"
        @confirm="btnok(2)"
        style="margin-right: 20px"
      >
        <el-button class="el-icon-collection-tag" slot="reference">
          保 存</el-button
        >
      </el-popconfirm>
    </div>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
      v-if="hiden"
    >
      <el-button type="primary" class="el-icon-check" @click="chongxin()">
        重新发起</el-button
      >
    </div>
    <AssteCard ref="AssteCard" @tableSelect="tableSelect" />
  </el-dialog>
</template>

<script>
import {
  get_storagelocation,
  get_allschooldepartment,
  get_schoolresponseperson,
} from "@/api/assetaccounthandle";
import {
  create_assetstransfer,
  create_assetstransferdetail,
  get_assetstransferdatalbyId,
  assetstransfer_finaleapprovalsubmit,
} from "@/api/assetstransferhandle";
import AssteCard from "@/bitcomponents/AssteCard";
export default {
  components: { AssteCard },
  data() {
    return {
      formLabelWidth: "120px",
      labelPosition: "left",
      dialogVisible: false,
      form: {
        存放地点value: "",
        归属部门value: "",
        负责人value: "",
      },
      loading: false,
      tableData: [],
      titleDialog: "",
      存放地点options: [],
      归属部门options: [],
      负责人options: [],
      hiden: false,
      存放defaultProps: {
        children: "children",
        label: "name",
        value: "id",
      },
    };
  },
  methods: {
    chongxin() {
      this.$router.push({ path: "/transfers", query: { data: this.form } });
    },
    btnok(str) {
      this.form.一级机构ID = this.$store.getters.id_一级部门;
      this.form.二级机构ID = this.$store.getters.id_二级部门;
      this.form.申请人名称 = this.$store.getters.姓名;
      this.form.申请人Id = this.$store.getters.id_用户;
      this.form.流程代码 = str;
      if (this.tableData.length == 0) {
        this.msg("警告", "请添加转移资产!");
        return;
      }
      if (
        (this.form.负责人value == "" || this.form.负责人value == undefined) &&
        (this.form.归属部门value == "" ||
          this.form.归属部门value == undefined) &&
        (this.form.存放地点value == "" || this.form.存放地点value == undefined)
      ) {
        this.msg("警告", "请最少选择一种转移方式!");
        return;
      }
      // console.log(this.form.负责人value);
      // console.log(this.form.归属部门value);
      // console.log(this.form.存放地点value);
      if (this.form.负责人value != "" && this.form.负责人value != undefined) {
        this.form.负责人Id = this.form.负责人value.id;
      } else {
        this.form.负责人Id = 0;
      }
      if (
        this.form.归属部门value != "" &&
        this.form.归属部门value != undefined
      ) {
        this.form.归属部门Id = this.form.归属部门value.部门Id;
      } else {
        this.form.归属部门Id = 0;
      }
      if (
        this.form.存放地点value[0] == "" ||
        this.form.存放地点value[0] == undefined
      ) {
        this.form.存放地点Id = 0;
        this.form.存放地点一级Id = 0;
      } else if (
        this.form.存放地点value[1] == "" ||
        this.form.存放地点value[1] == undefined
      ) {
        this.form.存放地点Id = 0;
        this.form.存放地点一级Id = this.form.存放地点value[0];
      } else {
        this.form.存放地点Id = this.form.存放地点value[1];
        this.form.存放地点一级Id = this.form.存放地点value[0];
      }
      // console.log("存放地点", this.form.存放地点Id);
      // console.log("存放地点一级Id", this.form.存放地点一级Id);
      // console.log("form", this.form);
      // return;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      create_assetstransfer(this.form).then((res) => {
        for (var i in this.tableData) {
          this.tableData[i].变更存放地点二级 = this.form.存放地点一级Id;
          this.tableData[i].变更存放地点三级 = this.form.存放地点Id;
          this.tableData[i].归属部门二级 = this.form.归属部门Id;
          this.tableData[i].负责人Id = this.form.负责人Id;
          this.tableData[i].资产转移单Id = res.data;
        }
        // console.log("table", this.tableData);
        create_assetstransferdetail(this.tableData).then((Response) => {
          loading.close();
          this.get_box(res.code, "发起成功!");
          this.$emit("select");
          this.dialogVisible = false;
        });
      });
      // assetstransfer_finaleapprovalsubmit(this.form).then((res) => {
      //   for (var i in this.tableData) {
      //     this.tableData[i].变更存放地点二级 = this.form.存放地点一级Id;
      //     this.tableData[i].变更存放地点三级 = this.form.存放地点Id;
      //     this.tableData[i].归属部门二级 = this.form.归属部门Id;
      //     this.tableData[i].负责人Id = this.form.负责人Id;
      //     this.tableData[i].资产转移单Id = this.form.id;
      //   }
      //   create_assetstransferdetail(this.tableData).then((Response) => {
      //     loading.close();
      //     this.get_box(res.code, "发起成功!");
      //     this.$emit("select");
      //     this.dialogVisible = false;
      //   });
      // });
      // console.log(this.form);
    },
    // 添加资产
    addAseet() {
      this.$refs.AssteCard.onload();
      // this.$refs.AssteCard.onload();
      this.$refs.AssteCard.get_alldepartmentpeople();
      this.$refs.AssteCard.dialogVisible = true;
    },
    // 查存放地点
    get_storagelocation() {
      get_storagelocation({
        departmentwo: this.$store.getters.id_二级部门,
      }).then((res) => {
        this.存放地点options = res.data;
      });
    },
    // 归属部门
    get_allschooldepartment() {
      get_allschooldepartment({
        departmentwo: this.$store.getters.id_二级部门,
      }).then((res) => {
        this.归属部门options = res.data;
      });
    },
    // 负责人
    get_schoolresponseperson() {
      var data = {
        departmentone: this.$store.getters.id_一级部门,
        departmentwo: this.$store.getters.id_二级部门,
      };
      get_schoolresponseperson(data).then((res) => {
        this.负责人options = res.data[0].children2;
      });
    },
    // 选择的资产
    tableSelect(row) {
      this.tableData = row;
    },
    // 移除
    deleteRow(index, rows) {
      rows.splice(index, 1);
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
    gettable() {
      get_assetstransferdatalbyId({ id: this.form.id }).then((res) => {
        this.tableData = res.data;
        this.loading = false;
      });
    },
  },
};
</script>

<style>
</style>