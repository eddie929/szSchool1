<template>
  <div>
    <div style="margin: 1% 1% 0% 1%">
      <p
        style="
          text-align: center;
          font-size: 20px;
          margin-bottom: 2%;
          font-weight: 700;
        "
      >
        <el-button
          type="text"
          class="el-icon-refresh-left"
          @click="back"
          style="float: left; font-weight: 500"
        >
          返回
        </el-button>
        资产借还单
      </p>
      <el-form ref="ruleForm" :label-position="labelPosition" :model="form">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="处置单" name="first">
            <el-row :gutter="24">
              <el-col :span="8">
                <el-form-item
                  label="流程状态"
                  :label-width="formLabelWidth"
                  prop="remark"
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
                  label="申请日期"
                  :label-width="formLabelWidth"
                  prop="remark"
                >
                  <el-input
                    v-model="form.申请时间"
                    placeholder="请输入内容"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24" style="margin-top: 1%">
              <el-col :span="8">
                <el-form-item
                  label="借用人"
                  :label-width="formLabelWidth"
                  prop="remark"
                >
                  <el-input
                    v-model="form.借用人"
                    placeholder="请输入内容"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="借用日期"
                  :label-width="formLabelWidth"
                  prop="借用时间"
                >
                  <el-date-picker
                    v-model="form.借用时间"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    :picker-options="pickerOptions"
                    @input="updateViews($event)"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="借出人"
                  :label-width="formLabelWidth"
                  prop="remark"
                >
                  <el-select
                    style="width: 100%"
                    v-model="form.借出人value"
                    placeholder="请选择"
                    value-key="id"
                    @change="hange"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.name"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24" style="margin-top: 1%">
              <el-col :span="8">
                <el-form-item
                  label="预计归还日期"
                  :label-width="formLabelWidth"
                  prop="remark"
                >
                  <el-date-picker
                    v-model="form.预计归还时间"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    style="width: 100%"
                    :picker-options="pickerOptions"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item
                  label="备注信息"
                  :label-width="formLabelWidth"
                  prop="remark"
                >
                  <el-input
                    v-model="form.备注信息"
                    placeholder="请输入内容"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-button
              type="text"
              class="el-icon-plus"
              style="margin-top: 1%"
              @click="addAsset"
              >添加资产</el-button
            >
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
                prop="所属分类"
                label="资产分类"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span
                    >{{ scope.row.一级分类名称 }}/{{
                      scope.row.二级分类名称
                    }}/{{ scope.row.三级分类名称 }}/{{
                      scope.row.四级分类名称
                    }}</span
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
              <el-table-column prop="资产状态" label="资产状态">
              </el-table-column>

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
      <div style="text-align: center; margin: 22px 0px">
        <el-popconfirm
          title="再次确认提交"
          @confirm="btnok(1)"
          style="margin-right: 20px"
        >
          <el-button
            style="width: 10%"
            type="primary"
            class="el-icon-check"
            slot="reference"
          >
            提 交</el-button
          >
        </el-popconfirm>
        <el-popconfirm title="再次确认保存" @confirm="btnok(2)">
          <el-button
            style="width: 10%"
            class="el-icon-collection-tag"
            slot="reference"
          >
            保 存</el-button
          >
        </el-popconfirm>
        <Ledger ref="Ledger" @tableSelect="tableSelect" />
      </div>
    </div>
  </div>
</template>

<script>
import { get_flowdata } from "@/api/filehandle";
import { get_schoolresponseperson } from "@/api/assetaccounthandle";
import {
  create_assetlendingdata,
  create_assetlendingdatadetail,
  get_assetlendingdatabyId,
  assetlendingdata_finaleapprovalsubmit
} from "@/api/assetlendinghandle";
import Ledger from "@/bitcomponents/Ledger/Ledger.vue";
export default {
  components: { Ledger },
  data() {
    return {
      active: 0,
      FlowList: [],
      activeName: "first",
      dialogVisible: false,
      labelPosition: "left", // 对齐方向
      formLabelWidth: "100px", // label宽度
      form: {},
      loading: false,
      tableData: [],
      dialogTitle: "",
      options: [], // 借出人
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      }
    };
  },
  methods: {
    handleClick(tab, event) {},
    back() {
      this.$router.push({ path: "/Borrow/index" });
    },
    // 解决双向绑定失效
    updateViews(e) {
      this.$forceUpdate();
    },
    // 提交
    btnok(str) {
      // console.log(this.form);
      // console.log(this.tableData);
      // return
      if (this.form.借出人value == undefined || this.form.借出人value == "") {
        this.msg("警告", "请选择借出人");
        return;
      }
      if (this.tableData.length == 0) {
        this.msg("警告", "请选择资产");
        return;
      }
      if (
        this.form.借用时间 == undefined ||
        this.form.借用时间 == null ||
        this.form.借用时间 == ""
      ) {
        this.msg("警告", "请选择借用时间");
        return;
      }

      if (
        this.form.预计归还时间 == undefined ||
        this.form.预计归还时间 == null ||
        this.form.预计归还时间 == ""
      ) {
        this.msg("警告", "请选择预计归还时间");
        return;
      }
      this.form.借出人Id = this.form.借出人value.id;
      if (str == 1) {
        this.form.流程代码 = 1;
      } else {
        this.form.流程代码 = 2;
      }
      this.form.一级机构ID = this.$store.getters.id_一级部门;
      this.form.二级机构ID = this.$store.getters.id_二级部门;
      this.form.借用人Id = this.$store.getters.id_用户;
      this.form.借用人 = this.$store.getters.姓名;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      // console.log(this.form.流程状态);
      if (this.form.流程状态 != "已退回" && this.form.流程状态 != "已保存") {
        // console.log("第一次");
        create_assetlendingdata(this.form).then(res => {
          for (var i in this.tableData) {
            this.tableData[i].借还单Id = res.data;
          }
          create_assetlendingdatadetail(this.tableData).then(res => {
            loading.close();
            this.get_box(res.code, "创建成功!");
            // this.$emit("onload");
            // this.dialogVisible = false;
            this.$router.push({ path: "/Borrow/index" });
          });
        });
      } else {
        // console.log("第二次");
        assetlendingdata_finaleapprovalsubmit(this.form).then(res => {
          for (var i in this.tableData) {
            this.tableData[i].借还单Id = this.form.id;
          }
          create_assetlendingdatadetail(this.tableData).then(res => {
            loading.close();
            this.get_box(res.code, "创建成功!");
            // this.$emit("onload");
            // this.dialogVisible = false;
            this.$router.push({ path: "/Borrow/index" });
          });
        });
      }
    },
    // 借出人改变事件
    hange(val) {
      // console.log(val);
      if (
        val.name == this.$store.getters.姓名 &&
        val.id == this.$store.getters.id_用户
      ) {
        // console.log("完全一样了");
        this.form.借出人value = "";
        this.tableData = [];
        this.msg("警告", "不可以向自己借资产");
        return;
      }
      this.tableData = [];
      this.$refs.table.clearSelection();
    },
    // 再一次
    onemoretime() {
      // console.log(this.form);
      var data = {
        id: this.form.id
      };
      this.loading = true;
      get_assetlendingdatabyId(data).then(res => {
        this.tableData = res.data;
        // console.log(this.tableData);
        this.loading = false;
      });
    },
    //选择的资产
    tableSelect(row) {
      this.tableData = row;
    },
    // 借出人
    get_schoolresponseperson() {
      var data = {
        departmentone: this.$store.getters.id_一级部门,
        departmentwo: this.$store.getters.id_二级部门
      };
      get_schoolresponseperson(data).then(res => {
        this.options = res.data[0].children2;
        // console.log("options", this.options);
        for (let i in this.options) {
          if (this.options[i].name === this.$store.getters.姓名) {
            this.options.splice(i, 1);
          }
        }
      });
    },
    // 添加资产
    addAsset() {
      // console.log("this.form.借出人value", this.form.借出人value);
      if (
        this.form.借出人value == undefined ||
        this.form.借出人value == "" ||
        this.form.借出人value == {}
      ) {
        this.msg("警告", "请选择借出人");
        return;
      }
      // return;

      this.$refs.Ledger.pageinfo.peopleId = this.form.借出人value.id;
      this.$refs.Ledger.pageinfo.fk_user = this.form.借出人value.id;
      this.$refs.Ledger.onload();
      this.$refs.Ledger.get_categoryalldata();
      this.$refs.Ledger.get_alldepartmentpeople();
      this.$refs.Ledger.dialogVisible = true;
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
    // 移除
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    onload() {
      setTimeout(() => {
        get_flowdata({ flowId: this.form.id, flowname: "资产借还" }).then(
          res => {
            this.FlowList = res.data;
            this.active = res.values;
          }
        );
      }, 500);
    }
  },
  beforeMount() {
    this.get_schoolresponseperson();
    this.tableData = [];
    this.form = {
      申请时间: this.dayjs().format("YYYY-MM-DD"),
      借用时间:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
      借用人: this.$store.getters.姓名,
      流程状态: "已提交",
      预计归还时间: "",
      借出人value: "",
      备注信息: ""
    };
    // if (this.$route.query.data.id == null) {
    //   this.$store.dispatch("tagsView/delView", this.$route); // 关闭当前标签
    //   this.$router.go(-1); // 返回上一级
    //   return;
    // }
    // console.log("+++++++++++++++++++++", this.$route.query.data);
    // this.form = this.$route.query.data;
  }
};
</script>

<style scoped></style>
