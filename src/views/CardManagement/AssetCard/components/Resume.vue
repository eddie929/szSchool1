<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="40%"
    style="text-align: center"
    top="15vh"
    :close-on-click-modal="false"
  >
    <el-row style="margin: 10px 0px 0px 0px; text-align: left; height: 400px;overflow-x:auto;">
      <div class="block" v-if="show">
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(activity, index) in Resume"
            :type="activity.履历名称 === '处置' ? 'warning' : 'success'"
            :key="index"
            :timestamp="activity.记录日期"
          >
            <el-link style="text-decoration: underline">{{
              activity.履历名称
            }}</el-link>
          </el-timeline-item>
        </el-timeline>
      </div>
      <el-empty description="没有数据" v-if="!show"></el-empty>
    </el-row>
  </el-dialog>
</template>

<script>
import { get_accountrecord } from "@/api/assetaccounthandle";
export default {
  data() {
    return {
      title: "", //标题
      reverse: true, //指定排序默认正序
      dialogFormVisible: false, //显示隐藏
      Resume: [], //履历循环
      id: 0,
      show: true, //
    };
  },
  methods: {
    getResume(val) {
      // console.log(val);
      get_accountrecord({ fk_at: val }).then((res) => {
        // console.log(res.data.length);
        if (res.data.length > 0) {
          this.show = true;
        } else {
          this.show = false;
        }
        this.Resume = res.data;
      });
    },
  },
};
</script>

<style>
</style>