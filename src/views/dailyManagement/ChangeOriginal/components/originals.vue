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
        原值变动单
      </p>
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
              label="申请日期"
              :label-width="formLabelWidth"
              prop="申请日期"
            >
              <el-input
                v-model="form.申请日期"
                placeholder="请输入内容"
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
                v-model="form.申请人"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="变动方式"
              :label-width="formLabelWidth"
              prop="变动方式"
            >
              <el-select
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
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="变动原因"
              :label-width="formLabelWidth"
              prop="变动原因"
            >
              <el-input
                v-model="form.变动原因"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button
          type="text"
          class="el-icon-plus"
          style="margin-top: 1%"
          @click="openadd"
          >添加资产</el-button
        >
        <el-table
          ref="table"
          v-loading="loading"
          :data="tableData"
          border
          stripe
          :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
          style="width: 100%; margin-top: 1%"
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
              <el-input
                size="mini"
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
              ></el-input>
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
        <el-popconfirm
          title="再次确认保存"
          @confirm="btnok(2)"
          style="margin-right: 20px"
        >
          <el-button
            style="width: 10%"
            class="el-icon-collection-tag"
            slot="reference"
          >
            保 存</el-button
          >
        </el-popconfirm>
        <el-popconfirm title="再次确认撤销" @confirm="btnok(3)" v-if="hiden">
          <el-button
            style="width: 10%"
            type="danger"
            class="el-icon-refresh-left"
            slot="reference"
          >
            撤 销</el-button
          >
        </el-popconfirm>
        <AssteCard ref="AssteCard" @tableSelect="tableSelect" />
      </div>
    </div>
  </div>
</template>

<script>
import { get_flowDocumentNo } from "@/api/filehandle";
import AssteCard from "@/bitcomponents/AssteCard/index.vue";
import {
  create_originaldata,
  create_originaldatadetail,
  originaldata_finaleapprovalsubmit,
  get_originaldatalbyId,
  originalapplicantremove
} from "@/api/originalchangehandle";
export default {
  components: { AssteCard },
  data() {
    return {
      hiden: false,
      dialogVisible: false,
      labelPosition: "left",
      formLabelWidth: "100px",
      form: {},
      options: [
        {
          value: "盘盈",
          label: "盘盈"
        },
        {
          value: "资产核资增加",
          label: "资产核资增加"
        },
        {
          value: "其他增加",
          label: "其他增加"
        },
        {
          value: "盘亏",
          label: "盘亏"
        },
        {
          value: "资产核资减少",
          label: "资产核资减少"
        },
        {
          value: "其他减少",
          label: "其他减少"
        }
      ],
      tableData: [],
      loading: false,
      dialogTitle: "",
      tableDatas: []
    };
  },
  methods: {
    back() {
      this.$router.push({ path: "/ChangeOriginal/index" });
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
          background: "#F5F5F5"
        };
      }
    },
    gettable(val) {
      get_originaldatalbyId({ id: val }).then(res => {
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
      if (str === 3) {
        let data = {
          flowId: this.form.Id,
          applicantId: this.$store.getters.id_用户,
          departmenttwo: this.$store.getters.id_二级部门,
          sort: -2
        };
        originalapplicantremove(data).then(res => {
          if (res.code != 2) {
            this.$notify.success("撤销成功!");
            this.$router.push({ path: "/ChangeOriginal/index" });
          } else {
            this.$notify.error(res.msg);
            this.$router.push({ path: "/ChangeOriginal/index" });
          }
        });
      } else {
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
          create_originaldata(this.form).then(res => {
            for (var i in this.tableData) {
              this.tableData[i].id = res.data;
              this.tableData[i].变动方式 = this.form.变动方式;
              this.tableData[i].变动金额 = parseFloat(
                this.tableData[i].变动金额
              );
              this.tableData[i].变动后原值 = parseFloat(
                this.tableData[i].变动后原值
              );
            }
            create_originaldatadetail(this.tableData).then(Response => {
              this.get_box(res.code, "发起成功!");
              this.$router.push({ path: "/ChangeOriginal/index" });
              // this.$emit("select");
              // this.dialogVisible = false;
            });
          });
        } else {
          originaldata_finaleapprovalsubmit(this.form).then(res => {
            for (var i in this.tableData) {
              this.tableData[i].id = this.form.Id;
            }
            create_originaldatadetail(this.tableData).then(Response => {
              this.get_box(res.code, "发起成功!");
              this.$router.push({ path: "/ChangeOriginal/index" });
              // this.$emit("select");
              // this.dialogVisible = false;
            });
          });
        }
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
    // 单据编号
    get_flowDocumentNo() {
      get_flowDocumentNo({
        flowname: "原值变动",
        departmenttwo: this.$store.getters.id_二级部门
      }).then(res => {
        this.form.单据编号 = res.data;
      });
    }
  },
  beforeMount() {
    this.form = {
      流程状态: "待审核",
      一级机构ID: this.$store.getters.id_一级部门,
      二级机构ID: this.$store.getters.id_二级部门,
      申请人: this.$store.getters.姓名,
      申请人Id: this.$store.getters.id_用户,
      申请日期: this.dayjs().format("YYYY-MM-DD"),
      单据编号:"",
    };
    this.tableData = [];
    this.get_flowDocumentNo();
    // console.log("this.$route.query.data", this.$route.query.data);
    if (this.$route.query.data === undefined) {
    } else {
      if (
        this.$route.query.data.流程状态 === "已退回" ||
        this.$route.query.data.流程状态 === "已保存"
      ) {
        this.form = this.$route.query.data;
        this.gettable(this.form.Id);
        this.hiden = true;
      }
    }
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
