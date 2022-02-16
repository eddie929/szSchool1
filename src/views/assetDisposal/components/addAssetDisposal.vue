<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="80%"
    center
    top="5vh"
    :close-on-click-modal="false"
  >
    <el-form ref="ruleForm" :label-position="labelPosition" :model="form">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="处置类别" :label-width="formLabelWidth" prop="">
            <el-select
              v-model="pageinfo.categoryname"
              placeholder="请选择"
              style="width: 100%"
              clearable
              @change="onload"
            >
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="添加方式"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-select
              @change="onload"
              v-model="pageinfo.addway"
              placeholder="请选择"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="item in addTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="排列方式"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-select
              @change="onload"
              v-model="pageinfo.sort"
              placeholder="请选择"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="item in arrangementOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="是否到期"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-select
              @change="onload"
              v-model="pageinfo.istotime"
              placeholder="请选择"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="item in maturityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div style="margin-top: 1%">
        <el-button type="primary" plain @click="add">添加资产</el-button>
        <el-button @click="deletable">移除资产</el-button>
        <span style="margin-left: 5%"
          >资产总数:<span style="color: red"
            ><el-link type="danger" :underline="false">{{
              result.总数据
            }}</el-link></span
          ></span
        >
        <span style="margin-left: 5%"
          >原值合计:<span style="color: red"
            ><el-link type="danger" :underline="false">{{
              result.原值合计
            }}</el-link></span
          ></span
        >
        <span style="margin-left: 5%"
          >净值合计:<span style="color: red"
            ><el-link type="danger" :underline="false">{{
              result.净值合计
            }}</el-link></span
          ></span
        >
        <!-- <el-button
          @click="submit"
          icon="el-icon-search"
          size="medium "
          style="float: right"
          >搜索</el-button
        > -->
      </div>
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
        <el-table-column type="selection" width="55"> </el-table-column>
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
        <el-table-column prop="数量" label="数量(个)"></el-table-column>
        <el-table-column prop="保留原值" label="原值" align="right">
          <!-- <template slot-scope="scope">
            <span>{{ scope.row.原值.toFixed(2) }}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="保留净值" label="净值" align="right">
          <!-- <template slot-scope="scope">
            <span>{{ scope.row.净值.toFixed(2) }}</span>
          </template> -->
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
        <el-table-column prop="资产状态" label="资产状态"></el-table-column>
        <el-table-column prop="是否到期" label="是否到期">
          <template slot-scope="scope">
            <span>{{ maturity(scope.row) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >
              移除
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <el-row style="margin: 10px 0px 0px 10px">
        <el-col :span="24">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageinfo.pageNum"
            :page-sizes="pageinfo.pagesizes"
            :page-size="pageinfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageinfo.count"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <el-popconfirm
        title="再次确认申报"
        @confirm="btnok('form')"
        style="margin-right: 20px"
      >
        <el-button type="primary" class="el-icon-check" slot="reference">
          确认申报</el-button
        >
      </el-popconfirm>
      <el-button class="el-icon-close" @click="dialogVisible = false">
        取 消</el-button
      >
    </div>
    <el-dialog
      title="资产处置"
      :visible.sync="dialog"
      width="30%"
      append-to-body
    >
      <el-form ref="ruleForm" :label-position="labelPosition">
        <el-form-item
          label="处置方式"
          :label-width="formLabelWidth"
          prop="remark"
        >
          <el-select
            v-model="zclb"
            placeholder="请选择"
            style="width: 100%"
            clearable
          >
            <el-option
              v-for="item in 处置方式"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <el-popconfirm
        title="再次确认提交"
        @confirm="queadd('form')"
        style="margin-right: 20px"
      >
        <el-button type="primary" class="el-icon-check" slot="reference">
          提 交</el-button
        >
      </el-popconfirm>
      <el-button class="el-icon-close" @click="dialog = false">
        取 消</el-button
      >
    </div>
    <AssteCard ref="AssteCard" @tableSelect="tableSelect" />
    <AddDis ref="AddDis" @select="select" />
    <AddFlow ref="AddFlow" @select="select" />
  </el-dialog>
</template>

<script>
import AddDis from "./addDis.vue";
import AssteCard from "@/bitcomponents/AssteCard";
import AddFlow from "../componentss/addFlow.vue";
import {
  get_handledata,
  create_handleassets,
  delassetlendingdata
} from "@/api/assetretirementhandle";
export default {
  components: { AssteCard, AddDis, AddFlow },
  data() {
    return {
      dialogTitle: "",
      dialogVisible: false,
      dialog: false,
      labelPosition: "left",
      formLabelWidth: "80px",
      form: {},
      result: {},
      tableData: [],
      zclb: "",
      处置方式: [
        {
          value: "报废",
          label: "转入待报废库"
        },
        {
          value: "调拨",
          label: "转入待调拨库"
        },
        {
          value: "转入待报损库",
          label: "转入待报损库",
          disabled: true
        },
        {
          value: "转入待出售库",
          label: "转入待出售库",
          disabled: true
        }
      ],
      loading: false,
      // 类别
      categoryOptions: [
        {
          value: "报废",
          label: "待报废库"
        },
        {
          value: "调拨",
          label: "待调拨库"
        },
        {
          value: "破损",
          label: "待破损库"
        },
        {
          value: "出售",
          label: "待出售库"
        }
      ],
      // 添加方式
      addTypeOptions: [
        {
          value: "普通添加",
          label: "普通添加"
        },
        {
          value: "盘亏处理",
          label: "盘亏处理"
        }
      ],
      // 排列方式
      arrangementOptions: [
        {
          value: 1,
          label: "添加时间正序"
        },
        {
          value: 2,
          label: "添加时间倒序"
        },
        {
          value: 3,
          label: "购置时间正序"
        },
        {
          value: 4,
          label: "购置时间倒序"
        }
      ],
      //   是否到期
      maturityOptions: [
        {
          value: 2,
          label: "是"
        },
        {
          value: 1,
          label: "否"
        }
      ],
      pageinfo: {
        pageNum: 1, //第几页
        pageSize: 10, //一页多少条
        count: 0, //数据总数
        pagesizes: [10, 20, 30, 50],
        categoryname: "报废"
      }, //搜索条件
      fortable: []
    };
  },
  methods: {
    btnok() {
      if (this.$refs.table.selection.length == 0) {
        this.msg("警告", "请选择要申报的资产!");
        return;
      }
      // console.log(this.pageinfo.categoryname);
      if (this.pageinfo.categoryname == "") {
        this, msg("警告", "请选择处置类别!");
        return;
      }
      if (
        this.pageinfo.categoryname != "报废" &&
        this.pageinfo.categoryname != "调拨"
      ) {
        this.msg("警告", "不能发起" + this.pageinfo.categoryname + "处置!");
        return;
      }

      if (this.pageinfo.categoryname == "报废") {
        this.$refs.AddDis.dialogTitle = "资产处置单";
        this.$refs.AddDis.activeName = "first";
        this.$refs.AddDis.form.流程状态 = "待审核";
        this.$refs.AddDis.form.申报单位 = this.$store.getters.二级部门名称;
        this.$refs.AddDis.form.申请人名称 = this.$store.getters.姓名;
        this.$refs.AddDis.form.申请人职务 = this.$store.getters.职务;
        this.$refs.AddDis.form.电话 = this.$store.getters.手机;
        this.$refs.AddDis.form.处置方式 =
          "资产处置-" + this.pageinfo.categoryname;
        this.$refs.AddDis.form.申报日期 = this.dayjs().format("YYYY-MM-DD");
        for (var i in this.$refs.table.selection) {
          this.$refs.table.selection[i].处置方式 =
            "待" + this.pageinfo.categoryname;
        }

        this.$refs.AddDis.tableData = this.$refs.table.selection;
        this.$refs.AddDis.dialogVisible = true;
      } else if (this.pageinfo.categoryname == "调拨") {
        // console.log("调拨");
        this.$refs.AddFlow.dialogTitle = "资产处置单";
        this.$refs.AddFlow.activeName = "first";
        this.$refs.AddFlow.form.流程状态 = "待审核";
        this.$refs.AddFlow.form.申报日期 = this.dayjs().format("YYYY-MM-DD");
        for (var i in this.$refs.table.selection) {
          this.$refs.table.selection[i].处置方式 =
            "待" + this.pageinfo.categoryname;
        }
        this.$refs.AddFlow.form.处置方式 =
          "资产处置-" + this.pageinfo.categoryname;
        this.$refs.AddFlow.form.申请人 = this.$store.getters.姓名;
        this.$refs.AddFlow.form.职务 = this.$store.getters.职务;
        this.$refs.AddFlow.form.电话 = this.$store.getters.手机;
        this.$refs.AddFlow.form.申报单位 = this.$store.getters.二级部门名称;
        this.$refs.AddFlow.form.原因说明 = "";
        this.$refs.AddFlow.form.申报文号 = "";
        this.$refs.AddFlow.form.批复文号 = "";
        this.$refs.AddFlow.get_allschooldepartments();
        this.$refs.AddFlow.tableData = this.$refs.table.selection;
        this.$refs.AddFlow.dialogVisible = true;
      }
    },
    // 移除待处置库
    deletable() {
      if (this.$refs.table.selection.length == 0) {
        this.msg("警告", "请选择要移除的资产!");
        return;
      }
      // console.log(this.$refs.table.selection);
      var data = [];
      for (var i in this.$refs.table.selection) {
        data.push(this.$refs.table.selection[i].资产Id);
      }
      // console.log(data);

      this.$confirm(
        "将待" + this.pageinfo.categoryname + "库已选择资产移除, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          delassetlendingdata(data).then(res => {
            this.get_box(res.code, "移除成功!");
            this.onload();
          });
        })
        .catch(() => {});
    },
    //搜索
    submit() {
      // console.log(this.pageinfo.sort);
      this.onload();
    },
    // 确认转入
    queadd() {
      if (this.fortable.length == 0) {
        this.msg("警告", "请选择待处置资产!");
        return;
      }
      if (this.zclb == "" || this.zclb == null) {
        this.msg("警告", "请选择处置方式!");
        return;
      }
      this.$confirm("将资产转入待" + this.zclb + "库, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(this.zclb);
          for (var i in this.fortable) {
            this.fortable[i].添加方式 = "普通添加";
            this.fortable[i].资产类别 = this.zclb;
            this.fortable[i].一级机构ID = this.$store.getters.id_一级部门;
            this.fortable[i].二级机构ID = this.$store.getters.id_二级部门;
          }
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });

          create_handleassets(this.fortable).then(res => {
            loading.close();
            this.get_box(res.code, "添加成功!");
            this.onload();
            this.dialog = false;
          });
        })
        .catch(() => {});

      // console.log(this.fortable);
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
    // get_handledata() {
    //   get_handledata(this.pageinfo).then((res) => {
    //     this.tableData = res.data;
    //   });
    // },
    add() {
      this.$refs.AssteCard.onload();
      this.$refs.AssteCard.get_alldepartmentpeople();
      this.$refs.AssteCard.dialogVisible = true;
    },
    tableSelect(val) {
      this.fortable = val;
      this.dialog = true;
    },
    //控制每页显示条数
    handleSizeChange(val) {
      this.pageinfo.pageSize = val;
      this.onload();
    },
    //第几页
    handleCurrentChange(val) {
      this.pageinfo.pageNum = val;
      this.onload();
    },
    // 移除
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    onload() {
      this.loading = true;
      var data = {
        pageNum: this.pageinfo.pageNum,
        pageSize: this.pageinfo.pageSize,
        categoryname: this.pageinfo.categoryname,
        istotime: this.pageinfo.istotime,
        addway: this.pageinfo.addway,
        sort: this.pageinfo.sort,
        departmentone: this.$store.getters.id_一级部门,
        departmenttwo: this.$store.getters.id_二级部门
      };
      // console.log("查询条件", data.istotime);
      if (data.sort == "") {
        data.sort = 0;
      }
      if (data.istotime == "") {
        data.istotime = 0;
      }
      if (data.categoryname == "") {
        this.msg("警告", "请选择类别!");
        return;
      }
      get_handledata(data).then(res => {
        this.loading = false;
        this.tableData = res.data;
        for (let i of this.tableData) {
          if (i.存放地点 === "") {
            i.存放地点 = i.建筑名称;
          } else {
            i.存放地点 = i.建筑名称 + "/" + i.存放地点;
          }
        }
        this.result = res.result;
        this.pageinfo.count = res.result.总数据;
      });
    },
    select() {
      this.$emit("onload");
      this.dialogVisible = false;
    }
  }
};
</script>

<style></style>
