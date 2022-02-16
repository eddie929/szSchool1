<template>
  <!-- <el-drawer
    title="查看详情"
    :visible.sync="inventorywindow"
    :close-on-click-modal="false"
    direction="rtl"
    style="text-align:center;"
    size="89%"
  > -->
  <el-form ref="form" :model="form" label-width="70px">
    <el-card class="box-card" shadow="never" style="margin:1% 1% 0 1%">
      <div slot="header" style="text-align:left">
        <span>基础信息</span>
        <span style="float:right">
          <el-button
            type="primary"
            v-show="form.流程状态 == '未开始'"
            @click="undoTesk"
            size="mini"
            >撤销任务</el-button
          >
          <el-button
            type="primary"
            v-show="showSubmitTask"
            @click="submitTask"
            size="mini"
            >提交任务</el-button
          >
          <!-- <el-button type="success" @click="checkReport" size="mini"
            >盘点报告</el-button
          > -->
        </span>
      </div>
      <div>
        <el-row :gutter="24" style="margin:1%">
          <el-col
            :xs="12"
            :sm="12"
            :lg="{ span: '4-8' }"
            class="card-panel-col"
          >
            <el-form-item label="流程状态">
              <el-input v-model="form.流程状态" readonly> </el-input>
            </el-form-item>
          </el-col>
          <el-col
            :xs="12"
            :sm="12"
            :lg="{ span: '4-8' }"
            class="card-panel-col"
          >
            <el-form-item label="单据编号">
              <el-input v-model="form.单据编号" readonly>
              </el-input> </el-form-item
          ></el-col>
          <el-col
            :xs="12"
            :sm="12"
            :lg="{ span: '4-8' }"
            class="card-panel-col"
          >
            <el-form-item label="任务名称">
              <el-input v-model="form.任务名称" readonly>
              </el-input> </el-form-item
          ></el-col>
          <el-col
            :xs="12"
            :sm="12"
            :lg="{ span: '4-8' }"
            class="card-panel-col"
          >
            <el-form-item label="发布方">
              <el-input v-model="form.发布方" readonly>
              </el-input> </el-form-item
          ></el-col>
          <el-col
            :xs="12"
            :sm="12"
            :lg="{ span: '4-8' }"
            class="card-panel-col"
          >
            <el-form-item label="发布日期">
              <el-input v-model="form.发布时间" readonly>
              </el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="24" style="margin:1%">
          <el-col
            :xs="12"
            :sm="12"
            :lg="{ span: '4-8' }"
            class="card-panel-col"
          >
            <el-form-item label="开始日期">
              <el-input v-model="form.开始时间" readonly> </el-input>
            </el-form-item>
          </el-col>
          <el-col
            :xs="12"
            :sm="12"
            :lg="{ span: '4-8' }"
            class="card-panel-col"
          >
            <el-form-item label="结束日期">
              <el-input v-model="form.结束时间" readonly>
              </el-input> </el-form-item
          ></el-col>
          <el-col
            :xs="12"
            :sm="12"
            :lg="{ span: '4-8' }"
            class="card-panel-col"
          >
            <el-form-item label="盘点方式">
              <el-input v-model="form.盘点方式" readonly>
              </el-input> </el-form-item
          ></el-col>
          <el-col
            :xs="12"
            :sm="12"
            :lg="{ span: '4-8' }"
            class="card-panel-col"
          >
            <el-form-item label="盘点范围" v-if="false">
              <el-input v-model="form.盘点范围" readonly>
              </el-input> </el-form-item
          ></el-col>
          <el-col
            :xs="12"
            :sm="12"
            :lg="{ span: '4-8' }"
            class="card-panel-col"
          >
            <el-form-item label="盘点人员">
              <el-input v-model="form.盘点指定人员" readonly>
              </el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row :gutter="24" style="margin:1%">
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.备注" readonly type="textarea">
              </el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col
            :xs="12"
            :sm="12"
            :lg="{ span: '4-8' }"
            class="card-panel-col"
          >
            <el-form-item style="float:right">
              <el-button type="primary" size="small">提交任务</el-button>
            </el-form-item>
          </el-col> -->
        </el-row>
      </div>
    </el-card>

    <el-row :gutter="24">
      <el-col :span="24">
        <el-tabs
          shadow="never"
          @tab-click="handleClick"
          type="border-card"
          style="margin:1%"
        >
          <el-tab-pane label="盘点进度">
            <InventoryProgress ref="InventoryProgress" />
          </el-tab-pane>
          <el-tab-pane label="拍照审核"
            ><PhotoReview ref="photoReview"
          /></el-tab-pane>
          <el-tab-pane
            label="盈亏处理"
            v-if="this.$store.getters.id_二级部门 != 0"
            ><ProfitLossTreatments ref="profitLossTreatments"
          /></el-tab-pane>
          <!-- <el-tab-pane
            label="盘点报告"
            :disabled="mainRow.流程状态 == '正在进行' ? true : false"
          >
            <ProfitLossReport
              ref="profitLossReport"
              v-if="tabnames == '盘点报告' ? true : false"
              style="width:100%"
            />
          </el-tab-pane> -->
          <el-tab-pane label="盘点报告">
            <ProfitLossReport
              ref="profitLossReport"
              v-if="tabnames == '盘点报告' ? true : false"
              style="width:100%"
            />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </el-form>
  <!-- </el-drawer> -->
</template>

<script>
import InventoryProgress from "./InventoryProgress.vue";
import PhotoReview from "./photoReview.vue";
import ProfitLossReport from "./ProfitLossReport.vue";
import ProfitLossTreatments from "./profitLossTreatments.vue";
import {
  inventory_sunmitdetail,
  inventorytaskwithdrawremove
} from "@/api/inventoryhandle";
export default {
  components: {
    InventoryProgress,
    PhotoReview,
    ProfitLossReport,
    ProfitLossTreatments
  },
  //   inject: ["newFoo"],
  data() {
    return {
      inventorywindow: false,
      loading: false,
      form: {},
      mainRow: {},
      gridData: [],
      timer: null,
      tabnames: "",
      showSubmitTask: false
    };
  },
  methods: {
    undoTesk() {
      let req = {
        flowId: this.mainRow.ID,
        applicantId: this.$store.getters.id_用户,
        departmenttwo: this.$store.getters.id_二级部门
      };
      //   console.log(req);
      this.$confirm("确定要撤销盘点任务吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          inventorytaskwithdrawremove(req)
            .then(res => {
              if (res.code == 100) {
                this.$message.success("盘点任务撤销成功!");
                loading.close();
                this.$router.push({ name: "/check" });
              } else {
                this.$message.danger("盘点任务撤销失败!");
              }
            })
            .catch(error => {
              loading.close();
            });
        })
        .catch(() => {});
    },
    checkReport() {
      this.$router.push({
        path: "/CheckContent",
        query: { data: this.mainRow }
      });
      //   this.$router.push({ path: "/CheckContent" });
    },
    submitTask() {
      this.$confirm("确定要提交盘点任务吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          var reqdata = {};
          if (this.$store.getters.id_二级部门 == 0) {
            reqdata = {
              id: 0,
              departmentone: this.$store.getters.id_一级部门,
              departmenttwo: this.$store.getters.id_二级部门,
              eductId: this.mainRow.ID
            };
          } else {
            reqdata = {
              id: this.mainRow.ID,
              eductId: this.mainRow.ID,
              departmentone: this.$store.getters.id_一级部门,
              departmenttwo: this.$store.getters.id_二级部门
            };
          }
          //   console.log(reqdata);
          inventory_sunmitdetail(reqdata)
            .then(response => {
              if (response.code == 100) {
                this.$message.success("盘点任务提交成功!");
                loading.close();
                // 调用全局挂载的方法,关闭当前标签页
                this.$store.dispatch("tagsView/delView", this.$route);
                // 返回上一步路由
                this.$router.go(-1);
              } else {
                this.$message.error("盘点任务提交失败!");
              }
              loading.close();
            })
            .catch(error => {
              loading.close();
            });
        })
        .catch(() => {});
    },
    handleClick(tab, event) {
      //   console.log(tab.label, event);
      if (tab.label == "盘点进度") {
      } else if (tab.label == "拍照审核") {
        // this.$refs.photoReview.pdID = this.form.ID;
        this.$refs.photoReview.mainRow = this.mainRow;
        this.$refs.photoReview.onloads();
      } else if (tab.label == "盈亏处理") {
        this.$refs.profitLossTreatments.mainRow = this.mainRow;
        this.$refs.profitLossTreatments.onloads();
      } else if (tab.label == "盘点报告") {
        this.tabnames = tab.label;
        this.$nextTick(() => {
          this.$refs.profitLossReport.pdID = this.form.ID;
          this.$refs.profitLossReport.department = "全部";
          this.$refs.profitLossReport.onloads();
        });
      }
      //   this.tabnames = tab.label;
    },
    handleClose(done) {
      this.inventorywindow = false;
      if (this.loading) {
        return;
      }
    },
    cancelForm() {
      this.loading = false;
      clearTimeout(this.timer);
    },
    onload() {
      // console.log("儿子aaaa:", this.newFoo);
      this.$refs.InventoryProgress.pdID = this.form.ID;
      this.$refs.InventoryProgress.onloads();
    }
  },
  mounted() {
    this.onload();
  },
  beforeMount() {
    let row = this.$route.params.rows;
    if (row == undefined) {
      // 调用全局挂载的方法,关闭当前标签页
      this.$store.dispatch("tagsView/delView", this.$route);
      // 返回上一步路由
      this.$router.go(-1);
    } else {
      this.mainRow = row;
      this.form = row;
      if (row.流程状态 == "正在进行") {
        this.showSubmitTask = true;
      } else {
        this.showSubmitTask = false;
      }
    }
  }
};
</script>
<style scoped>
.el-col-lg-4-8 {
  width: 20%;
}
.el-col-lg-4-8-a {
  width: 80%;
}
</style>
<style scoped>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
