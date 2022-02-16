<template>
  <div>
    <div style="margin-bottom:5px;margin-left:20px">
      <span v-show="this.$store.getters.id_二级部门 == 0">
        统计范围:
        <el-select
          v-model="department"
          placeholder="请选择"
          @change="changeDepartment"
          filterable
          style="width:15%"
        >
          <el-option
            v-for="item in belongpartOptions"
            :key="item.id"
            :label="item.name"
            :value="{ value: item.id, label: item.name }"
          >
          </el-option>
        </el-select>
      </span>
      <el-radio-group v-model="qualtityMoney" @change="onloads">
        <el-radio label="数量(个)">数量</el-radio>
        <el-radio label="金额">金额</el-radio>
      </el-radio-group>
      <!-- <el-divider direction="vertical"></el-divider> -->
      <el-button
        size="small"
        v-if="isShowProfitLoss"
        type="success"
        @click="openWindows"
        >盈亏详情</el-button
      >
    </div>
    <el-divider></el-divider>
    <div style="text-align:center">
      <!-- <span>整体数据</span>
      <span>应盘总数:</span>
      <span>54545</span>
      <span>实际盘点:</span>
      <span>54545</span>
      <span>盘盈总数:</span>
      <span>54545</span>
      <span>盘亏总数:</span>
      <span>54545</span> -->
      <label style="font-size: 14px; color: black">整体数据</label>
      <label style="font-size: 14px; color: rgb(227, 95, 109);margin-left:20px"
        >应盘总数:</label
      >
      <label style="font-size: 14px; color: rgb(227, 95, 109)">{{
        Total
      }}</label>
      <el-divider direction="vertical"></el-divider>
      <label style="font-size: 14px; color: rgb(78, 183, 136)">实际盘点:</label>
      <label style="font-size: 14px; color: rgb(78, 183, 136)">{{
        TotalCount
      }}</label>
      <el-divider direction="vertical"></el-divider>
      <label style="font-size: 14px; color: #ABABAB">盘盈总数:</label>
      <label style="font-size: 14px; color: #ABABAB">{{
        TotalInventory
      }}</label>
      <el-divider direction="vertical"></el-divider>
      <label style="font-size: 14px; color: #009ACD">盘亏总数:</label>
      <label style="font-size: 14px; color: #009ACD">{{
        TotalInventoryLoss
      }}</label>
    </div>
    <el-divider></el-divider>
    <div style="margin-bottom:5px;text-align:center">
      <el-radio-group v-model="countingMethodName" @change="onloads">
        <el-radio label="盘盈">盘盈</el-radio>
        <el-radio label="盘亏">盘亏</el-radio>
      </el-radio-group>
      <el-divider direction="vertical"></el-divider>
      <el-radio-group
        v-show="this.$store.getters.id_二级部门 != 0"
        v-model="distributionMode"
        @change="onloads"
      >
        <el-radio label="1">按负责人</el-radio>
        <el-radio label="2">按盘点人员</el-radio>
        <el-radio label="3">按归属部门</el-radio>
      </el-radio-group>
    </div>
    <el-divider></el-divider>
    <div>
      <ProfitLossDetailsEcharts ref="showEcharts" />
    </div>
    <ProfitLossDetailComponent ref="profitLossDetail" />
  </div>
</template>

<script>
import {
  proportionwholedata,
  get_allschool,
  eductionwholedata
} from "@/api/inventoryhandle";
import ProfitLossDetailsEcharts from "./profitLossDetailsEcharts.vue";
import ProfitLossDetailComponent from "./ProfitLossDetailComponent.vue";
export default {
  // inject: ["newFoo"], //获取参数用this.newFoo
  components: {
    ProfitLossDetailsEcharts,
    ProfitLossDetailComponent
  },
  data() {
    return {
      tableData: [],
      inventoryID: "",
      pdID: 0,
      Total: 0, //总数
      TotalCount: 0, //实际盘点
      TotalInventory: 0, //盘盈总数
      TotalInventoryLoss: 0, //盘亏总数
      盘点方式: "",
      归属部门: "",
      department: "全部", //{ label: "全部", value: 0 },
      belongpartOptions: [],
      qualtityMoney: "数量",
      countingMethodName: "盘盈",
      distributionMode: "1",
      isShowProfitLoss: true
    };
  },
  methods: {
    openWindows() {
      // console.log(this.pdID);
      this.$refs.profitLossDetail.dialogVisible = true;
      this.$refs.profitLossDetail.pdID = this.pdID;
      this.$refs.profitLossDetail.department = this.department;
      this.$refs.profitLossDetail.onload();
    },
    search(row) {},
    changeQualtityMoney() {
      this.onloads();
    },
    onloads() {
      if (this.$store.getters.id_二级部门 == 0) {
        this.belongpartOptions = [];
        this.belongpartOptions.push({ name: "全部", id: 0 });
        get_allschool({ taskId: this.pdID }).then(res => {
          if (res.code == 100) {
            // console.log(res.data);
            for (let i in res.data) {
              this.belongpartOptions.push({
                name: res.data[i].name,
                id: res.data[i].id
              });
            }
          }
        });
        // console.log("加入全部:", this.belongpartOptions);
      }

      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      // console.log("1111-------------", this.department);
      if (
        this.$store.getters.id_二级部门 == 0 &&
        (this.department.label == "全部" || this.department == "全部")
      ) {
        // console.log("教育局全部");
        eductionwholedata({
          ID: this.pdID,
          countway: this.qualtityMoney
        })
          .then(res => {
            if (res.code == 100) {
              // console.log("整体数据");
              // console.log(res.data);
              this.Total = res.data.应盘总数; //总数
              this.TotalCount = res.data.实际盘点; //实际盘点
              this.TotalInventory = res.data.盘盈总数; //盘盈总数
              this.TotalInventoryLoss = res.data.盘亏总数; //盘亏总数
            } else {
              this.$message.error(res.msg);
            }
            loading.close();
          })
          .catch(error => {
            // console.log("这里吗");
            console.log(error);
          });
      } else if (
        this.$store.getters.id_二级部门 == 0 &&
        (this.department.label != "全部" || this.department != "全部")
      ) {
        proportionwholedata({
          ID: this.pdID,
          Iseduction: this.$store.getters.id_二级部门 == 0 ? 1 : 0,
          departmentone: this.$store.getters.id_一级部门,
          departmenttwo: this.department.value,
          selectway: this.qualtityMoney
        })
          .then(res => {
            if (res.code == 100) {
              // console.log("整体数据");
              // console.log(res.data);
              this.Total = res.data.应盘总数; //总数
              this.TotalCount = res.data.实际盘点; //实际盘点
              this.TotalInventory = res.data.盘盈总数; //盘盈总数
              this.TotalInventoryLoss = res.data.盘亏总数; //盘亏总数
            } else {
              this.$message.error(res.msg);
            }
            loading.close();
          })
          .catch(error => {
            // console.log("这里吗");
            console.log(error);
          });
      } else {
        proportionwholedata({
          ID: this.pdID,
          Iseduction: this.$store.getters.id_二级部门 == 0 ? 1 : 0,
          departmentone: this.$store.getters.id_一级部门,
          departmenttwo: this.$store.getters.id_二级部门,
          selectway: this.qualtityMoney
        })
          .then(res => {
            if (res.code == 100) {
              // console.log("整体数据");
              // console.log(res.data);
              this.Total = res.data.应盘总数; //总数
              this.TotalCount = res.data.实际盘点; //实际盘点
              this.TotalInventory = res.data.盘盈总数; //盘盈总数
              this.TotalInventoryLoss = res.data.盘亏总数; //盘亏总数
            } else {
              this.$message.error(res.msg);
            }
            loading.close();
          })
          .catch(error => {
            // console.log("这里吗");
            console.log(error);
          });
      }

      this.$refs.showEcharts.pdID = this.pdID;
      this.$refs.showEcharts.countingMethodName = this.countingMethodName;
      this.$refs.showEcharts.distributionMode = this.distributionMode;
      this.$refs.showEcharts.qualtityMoney = this.qualtityMoney;
      this.$refs.showEcharts.department = this.department;
      // this.$refs.showEcharts.onload();
      this.$nextTick(() => {
        this.showEchartPhoto();
      });
    },
    showEchartPhoto() {
      if (this.$store.getters.id_二级部门 == 0) {
        if (this.department.label == "全部" || this.department == "全部") {
          this.$refs.showEcharts.showAll = false;
          // console.log("执行了吗");
          this.$refs.showEcharts.changeYear_jyj();
          // console.log("进来了吗", this.department);
        } else {
          this.$refs.showEcharts.showAll = true;
          this.$refs.showEcharts.changeYear_t(); //
          this.$refs.showEcharts.changeDateYear(); //
          this.$refs.showEcharts.changeDate(); //
        }
      } else {
        this.$nextTick(() => {
          this.$refs.showEcharts.showAll = true;
          this.$refs.showEcharts.changeYear_t(); //
          this.$refs.showEcharts.changeDateYear(); //
          this.$refs.showEcharts.changeDate(); //
        });
      }
    },
    changeDepartment(val) {
      this.departmentID = val.value;
      // console.log(val);
      if (val == "全部" || val.label == "全部" || this.department == "全部") {
        this.isShowProfitLoss = false;
      } else {
        this.isShowProfitLoss = true;
      }
      this.onloads();
    }
  },
  mounted() {
    // this.onloads();
  },
  beforeMount() {}
};
</script>

<style scoped>
.echart {
  margin: 2% 0% 2% 0%;
  background-color: #ffffff;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" */
}
</style>
