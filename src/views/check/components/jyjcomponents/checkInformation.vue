<template>
  <el-drawer
    title="查看详情"
    :visible.sync="inventorywindow"
    :close-on-click-modal="false"
    direction="rtl"
    style="text-align:center;"
    size="89%"
  >
    <el-form ref="form" :model="form" label-width="70px">
      <el-card class="box-card" style="margin:0 1% 0 1%">
        <div slot="header" style="text-align:left">
          <span>基础信息</span>
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
          </el-row>
        </div>
      </el-card>

      <el-row :gutter="24">
        <el-col :span="24">
          <el-tabs
            @tab-click="handleClick"
            type="border-card"
            style="height:60vh;margin:1%"
          >
            <el-tab-pane label="盘点进度">
              <div v-if="isrefush">
                <InventoryProgress ref="InventoryProgress" />
              </div>
            </el-tab-pane>
            <el-tab-pane label="拍照审核"><PhotoReview /></el-tab-pane>
            <el-tab-pane label="盈亏处理">盈亏处理</el-tab-pane>
            <el-tab-pane label="盘点报告">盘点报告</el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-form>
  </el-drawer>
</template>

<script>
import InventoryProgress from "./InventoryProgress.vue";
import PhotoReview from "./photoReview.vue";
export default {
  components: { InventoryProgress, PhotoReview },
  inject: ["newFoo"],
  data() {
    return {
      inventorywindow: false,
      loading: false,
      form: {},
      gridData: [],
      timer: null,
      isrefush: false
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab.label, event);
      if (tab.label == "盘点进度") {
      }
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
      this.isrefush = true;
      // console.log("儿子aaaa:", this.newFoo);
      this.$refs.InventoryProgress.onloads();
      // this.$refs.Progress.inventoryID = this.form.ID;
    }
  }
};
</script>
<style>
.el-col-lg-4-8 {
  width: 20%;
}
</style>
<style scoped>
/* .el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
} */
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
