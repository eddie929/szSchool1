<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="80%"
    center
    top="10vh"
    :close-on-click-modal="false"
  >
    <el-form ref="ruleForm" :label-position="labelPosition" :model="form">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item
            label="流程状态"
            :label-width="formLabelWidth"
            prop="remark"
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
            prop="remark"
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
            prop="remark"
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
            label="变动方式"
            :label-width="formLabelWidth"
            prop="remark"
          >
            {{ form.变动方式 }}
            <!-- <el-select
              v-model="form.变动方式"
              placeholder="请选择"
              style="width: 100%"
              @change="biandongchange"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item
            label="变动原因"
            :label-width="formLabelWidth"
            prop="remark"
          >
            {{ form.变动原因 }}
            <!-- <el-input
              v-model="form.变动原因"
              placeholder="请输入内容"
            ></el-input> -->
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-button type="primary" plain style="margin-top: 2%" @click="openadd"
        >添加资产</el-button
      > -->
      <el-table
        ref="table"
        v-loading="loading"
        :data="tableData"
        border
        stripe
        :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
        style="width: 100%; margin-top: 2%"
        max-height="450px"
        :cell-style="yellowBg"
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
        <el-table-column
          prop="原值"
          label="变动前原值"
          width="120"
          align="right"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.原值.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="变动金额"
          label="变动金额"
          width="120"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.变动金额 }}
            <!-- <el-input
              v-model="scope.row.变动金额"
              :precision="2"
              style="width: 100%; text-align: right"
              @input="updateViews($event, scope.row, scope.$index)"
              oninput="value=value
                    .replace(/[^\d.]/g, '')
                    .replace(/\.{2,}/g, '.')
                    .replace('.', '$#$')
                    .replace(/\./g, '')
                    .replace('$#$', '.')
                    .replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')"
              min="0"
            ></el-input> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="变动后原值"
          label="变动后原值"
          width="120"
          align="right"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.变动后原值 }}</span>
          </template>
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
      <el-form-item
        label="处理意见"
        :label-width="formLabelWidth"
        prop="remark"
        style="margin-top: 2%"
        v-if="hiden"
      >
        {{ form.处理意见 }}
        <!-- <el-input v-model="form.处理意见" placeholder="请输入内容"></el-input> -->
      </el-form-item>
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
      <el-button type="primary" class="el-icon-check" @click="hidens()">
        重新发起</el-button
      >
    </div>
    <AssteCard ref="AssteCard" @tableSelect="tableSelect" />
  </el-dialog>
</template>

<script>
import AssteCard from "@/bitcomponents/AssteCard/index.vue";
import {
  create_originaldata,
  create_originaldatadetail,
  originaldata_finaleapprovalsubmit,
  get_originaldatalbyId,
} from "@/api/originalchangehandle";
export default {
  components: { AssteCard },
  data() {
    return {
      dialogVisible: false,
      labelPosition: "left",
      formLabelWidth: "100px",
      form: {},
      options: [
        {
          value: "盘盈",
          label: "盘盈",
        },
        {
          value: "资产核资增加",
          label: "资产核资增加",
        },
        {
          value: "其他增加",
          label: "其他增加",
        },
        {
          value: "盘亏",
          label: "盘亏",
        },
        {
          value: "资产核资减少",
          label: "资产核资减少",
        },
        {
          value: "其他减少",
          label: "其他减少",
        },
      ],
      tableData: [],
      loading: false,
      dialogTitle: "",
      hiden: false,
      tableDatas: [],
    };
  },
  methods: {
    hidens() {
      this.$router.push({ path: "/originals", query: { data: this.form } });
    },
    // b变动方式
    biandongchange(val) {
      // console.log(val);
      // console.log(this.tableData);
      this.loading = true;
      var data = JSON.parse(JSON.stringify(this.tableData));
      if (val == "盘盈" || val == "资产核资增加" || val == "其他增加") {
        // console.log(this.tableData);
        // console.log("增加");
        for (var i = 0; i < data.length; i++) {
          data[i].变动后原值 =
            parseFloat(data[i].变动前原值) + parseFloat(data[i].变动金额);
          // console.log("data[i].变动后原值", data[i].变动后原值);
          if (data[i].变动后原值 < 0) {
            data[i].变动后原值 = 0;
          }
        }
        this.loading = false;
      } else {
        // console.log("减少");
        for (var i = 0; i < data.length; i++) {
          // console.log(i);
          data[i].变动后原值 =
            parseFloat(data[i].变动前原值) - parseFloat(data[i].变动金额);
          // console.log("剪发data[i].变动后原值", data[i].变动后原值);
          if (data[i].变动后原值 < 0) {
            data[i].变动后原值 = 0;
          }
        }
        this.loading = false;
      }
      this.tableData = data;
      for (let i of this.tableData) {
        i.变动后原值 = i.变动后原值.toFixed(2);
      }
      // console.log(this.tableData);
    },
    //解决双向绑定失效
    updateViews(e, row, index) {
      this.$forceUpdate();
      // console.log(e);
      // console.log(this.tableData);

      row.变动前原值 = row.原值;
      // console.log("form.变动方式", this.form.变动方式);
      row.变动后原值 = row.变动前原值 + row.变动金额;
      if (
        this.form.变动方式 == "盘盈" ||
        this.form.变动方式 == "资产核资增加" ||
        this.form.变动方式 == "其他增加"
      ) {
        this.tableData[index].变动后原值 = parseFloat(
          (parseFloat(row.变动前原值) + parseFloat(row.变动金额)).toFixed(2)
        );
        if (this.tableData[index].变动后原值 < 0) {
          this.tableData[index].变动后原值 = 0;
        }
      } else {
        this.tableData[index].变动后原值 = parseFloat(
          (parseFloat(row.变动前原值) - parseFloat(row.变动金额)).toFixed(2)
        );
        if (this.tableData[index].变动后原值 < 0) {
          this.tableData[index].变动后原值 = 0;
        }
      }
      for (let i of this.tableData) {
        i.变动后原值 = i.变动后原值.toFixed(2);
      }
      // parseFloat(row.变动前原值,2) + parseFloat(row.变动金额,2);
    },
    blur(row, index) {
      //   this.$set(
      //   this.tableData[index],
      //   "变动金额",
      //   parseFloat((row.price * row.num).toFixed(2))
      // );
      // console.log(row);
      row.变动前原值 = row.原值;
      row.变动后原值 = row.变动前原值 + row.变动金额;
      if (
        this.form.变动方式 == "盘盈" ||
        this.form.变动方式 == "资产核资增加" ||
        this.form.变动方式 == "其他增加"
      ) {
        this.tableData[index].变动后原值 = parseFloat(
          (parseFloat(row.变动前原值) + parseFloat(row.变动金额)).toFixed(2)
        );
        if (this.tableData[index].变动后原值 < 0) {
          this.tableData[index].变动后原值 = 0;
        }
      } else {
        this.tableData[index].变动后原值 = parseFloat(
          (parseFloat(row.变动前原值) - parseFloat(row.变动金额)).toFixed(2)
        );
        if (this.tableData[index].变动后原值 < 0) {
          this.tableData[index].变动后原值 = 0;
        }
      }
    },
    yellowBg({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 9) {
        return {
          background: "#F5F5F5",
        };
      }
    },
    gettable(val) {
      get_originaldatalbyId({ id: val }).then((res) => {
        this.tableData = res.data;
        for (let i of this.tableData) {
          if (i.存放地点 === "") {
            i.存放地点 = i.建筑名称;
          } else {
            i.存放地点 = i.建筑名称 + "/" + i.存放地点;
          }
        }
      });
    },
    btnok(str) {
      // console.log(this.form.变动方式);
      if (this.form.变动方式 == "" || this.form.变动方式 == undefined) {
        this.msg("警告", "请选择变动方式!");
        return;
      }
      if (this.tableData.length == 0) {
        this.msg("警告", "请添加变动资产!");
        return;
      }
      for (var i in this.tableData) {
        // console.log(this.tableData[i].变动金额);
        if (
          this.tableData[i].变动金额 == 0 ||
          this.tableData[i].变动金额 == undefined
        ) {
          this.msg(
            "警告",
            "请填写" + this.tableData[i].资产名称 + "的变动金额!"
          );
          return;
        }
      }
      this.form.流程代码 = str;
      if (
        this.form.Id == 0 ||
        this.form.Id == "" ||
        this.form.Id == undefined
      ) {
        create_originaldata(this.form).then((res) => {
          for (var i in this.tableData) {
            this.tableData[i].id = res.data;
            this.tableData[i].变动方式 = this.form.变动方式;
            this.tableData[i].变动金额 = parseFloat(this.tableData[i].变动金额);
            this.tableData[i].变动后原值 = parseFloat(
              this.tableData[i].变动后原值
            );
          }
          create_originaldatadetail(this.tableData).then((Response) => {
            this.get_box(res.code, "发起成功!");
            this.$emit("select");
            this.dialogVisible = false;
          });
        });
      } else {
        originaldata_finaleapprovalsubmit(this.form).then((res) => {
          for (var i in this.tableData) {
            this.tableData[i].id = this.form.Id;
          }
          create_originaldatadetail(this.tableData).then((Response) => {
            this.get_box(res.code, "发起成功!");
            this.$emit("select");
            this.dialogVisible = false;
          });
        });
      }
    },
    openadd() {
      // console.log(this.form.变动方式);
      if (this.form.变动方式 == undefined) {
        this.msg("警告", "请先选择变动方式");
        return;
      }
      // this.tableDatas = this.tableData;
      // console.log(this.tableDatas);
      this.$refs.AssteCard.onload();
      this.$refs.AssteCard.get_alldepartmentpeople();
      this.$refs.AssteCard.dialogVisible = true;
    },
    tableSelect(row) {
      this.tableData = [];
      let rows = JSON.parse(JSON.stringify(row));
      this.tableData = rows;
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
  },
};
</script>

<style>
</style>