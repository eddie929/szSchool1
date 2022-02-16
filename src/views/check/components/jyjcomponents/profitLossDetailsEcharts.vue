<template>
  <div style="padding-right: 1%; padding-left: 1%;width:100%">
    <!-- <div></div> -->

    <el-row :gutter="24">
      <!-- 盈亏分析 -->
      <el-col :span="20">
        <div
          class="echart"
          style="
              box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.22),
                0 0 6px rgba(0, 0, 0, 0.04);
              border-radius: 4px;
            "
        >
          <div
            id="ProfitLossAnalysis"
            ref="ProfitLossAnalysis"
            style="width: 100%; height: 50vh; padding: 1% 1% 0% 2%"
          ></div>
        </div>
      </el-col>
      <el-col :span="4" v-show="false">
        <el-radio-group v-model="checkbox" style="margin-top:100%">
          <el-radio label="递增"></el-radio>
          <el-radio label="递减"></el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row :gutter="24" v-if="showAll">
      <!-- 盘点方式 -->
      <el-col :span="10">
        <div
          class="echart"
          style="
              box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.22),
                0 0 6px rgba(0, 0, 0, 0.04);
              border-radius: 4px;
            "
        >
          <div
            id="CountingMethod"
            ref="CountingMethod"
            style="width: 98%; height: 55vh; padding: 2% 1% 0% 2%"
          ></div>
        </div>
      </el-col>
      <!-- 分类占比 -->
      <el-col :span="10">
        <div
          class="echart"
          id="ClassificationProportion"
          ref="ClassificationProportion"
          style="width: 98%; height: 55vh; padding: 2% 1% 0% 2%"
        ></div>
      </el-col>
      <el-col :span="4">
        <el-radio-group
          v-model="radio"
          @change="changeRadio"
          style="margin-top:100%"
        >
          <el-radio label="盘盈"></el-radio>
          <el-radio label="盘亏"></el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import "echarts/theme/浅色.js"; //引用Echarts主题
import {
  proportionofasset,
  proportionowayfasset,
  profitlossanalysis,
  eductionprofitlossanalysis
} from "@/api/inventoryhandle";
export default {
  data() {
    return {
      radio: "盘盈",
      checkbox: "递增",
      pdID: 0,
      showAll: false,
      qualtityMoney: "",
      countingMethodName: "",
      distributionMode: 0,
      department: 0
      //   screenWidth: document.body.clientWidth
    };
  },
  methods: {
    //改变盘点分类盘盈盘亏
    changeRadio() {
      this.changeDateYear();
    },
    onload() {
      //   console.log("来了吗2");
      //   console.log("盘点ID", this.qualtityMoney);
      this.$nextTick(() => {
        // this.changeYear_t();
        // this.changeDateYear();
        // this.changeDate();
      });
    },
    //盈亏分析
    changeYear_t() {
      let quality = [];
      let Name = [];

      let reqdata = {
        ID: this.pdID,
        checkway: this.countingMethodName,
        selectway: this.qualtityMoney,
        sort: this.distributionMode
      };
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      //   console.log("盈亏分析", reqdata);
      profitlossanalysis(reqdata)
        .then(resqonse => {
          if (resqonse.code == 100) {
            // console.log("-----------",resqonse.data);
            for (let index in resqonse.data) {
              quality.push(resqonse.data[index].数量);
              Name.push(resqonse.data[index].姓名);
            }
            this.putinstoragetable(quality, Name);
          }
          loading.close();
        })
        .catch(error => {
          console.log(error);
          //请求失败
          this.$message.error("请求失败");
        });
    },
    //盈亏分析 教育局
    changeYear_jyj() {
      let quality = [];
      let Name = [];

      let reqdata = {
        eductId: this.pdID,
        checkway: this.countingMethodName,
        selectway: this.qualtityMoney
        // sort: this.distributionMode
      };
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      // console.log("盈亏分析", reqdata);
      eductionprofitlossanalysis(reqdata)
        .then(resqonse => {
          if (resqonse.code == 100) {
            console.log("-----------",resqonse.data);
            for (let index in resqonse.data) {
              quality.push(resqonse.data[index].数量);
              Name.push(resqonse.data[index].姓名);
            }
            this.putinstoragetable(quality, Name);
          }
          loading.close();
        })
        .catch(error => {
          console.log(error);
          //请求失败
          this.$message.error("请求失败");
        });
    },
    //盘点方式
    changeDate(val) {
      let money = [];
      let qualtity = [];
      let moneyName = [];
      let reqdata = {};
      if (this.$store.getters.id_二级部门 == 0) {
        reqdata = {
          taskId: this.pdID,
          selectway: this.qualtityMoney,
          departmentone: this.$store.getters.id_一级部门,
          departmenttwo: this.department == "全部" ? 0 : this.department.value
        };
      } else {
        reqdata = {
          taskId: this.pdID,
          selectway: this.qualtityMoney,
          departmentone: this.$store.getters.id_一级部门,
          departmenttwo: this.$store.getters.id_二级部门
        };
      }

      //   console.log("盘点方式", reqdata);
      proportionowayfasset(reqdata)
        .then(resqonse => {
          if (resqonse.code == 100) {
            // console.log(resqonse.data);
            for (let index in resqonse.data) {
              money.push(resqonse.data[index].盘点金额);
              qualtity.push(resqonse.data[index].盘点数量);
              moneyName.push(resqonse.data[index].盘点方式);
            }
            this.printOne(moneyName, money, qualtity);
          }
        })
        .catch(error => {
          console.log(error);
          //请求失败
          this.$message.error("请求失败");
        });
    },
    //分类占比
    changeDateYear(val) {
      let qualtity = [];
      let money = [];
      let qualtityName = [];
      let reqdata = {};
      if (this.$store.getters.id_二级部门 == 0) {
        reqdata = {
          taskId: this.pdID,
          checkway: this.radio,
          selectway: this.qualtityMoney,
          departmentone: this.$store.getters.id_一级部门,
          departmenttwo: this.department == "全部" ? 0 : this.department.value
        };
      } else {
        reqdata = {
          taskId: this.pdID,
          checkway: this.radio,
          selectway: this.qualtityMoney,
          departmentone: this.$store.getters.id_一级部门,
          departmenttwo: this.$store.getters.id_二级部门
        };
      }

      //   console.log("分类占比", reqdata);
      proportionofasset(reqdata)
        .then(resqonse => {
          if (resqonse.code == 100) {
            // console.log(resqonse.data);
            for (let index in resqonse.data) {
              qualtity.push(resqonse.data[index].数量);
              money.push(resqonse.data[index].金额);
              qualtityName.push(resqonse.data[index].分类);
            }
            this.printTwo(qualtityName, qualtity, money);
          }
        })
        .catch(error => {
          //请求失败
          this.$message.error("请求失败");
        });
    },

    putinstoragetable(money, moneyName) {
      this.$nextTick(() => {
        let echarts = require("echarts");
        let myChartsss = echarts.init(this.$refs.ProfitLossAnalysis, "浅色");
        myChartsss.setOption({
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 0,
              end: 30
            }
          ],
          title: {
            text: "盈亏分析",
            // subtext: "模拟数据",//副标题
            x: "center"
          },
          xAxis: {
            type: "category",
            data: moneyName
            // 设置X轴数据旋转倾斜
            //   axisLabel: {
            //     rotate: 30, // 旋转角度
            //     interval: 0 //设置X轴数据间隔几个显示一个，为0表示都显示
            //   }
          },
          // grid: {
          //   width: "100%",
          //   left: "10%",
          //   bottom: "37%"
          // },
          // 提示框
          tooltip: {
            trigger: "axis"
          },

          yAxis: {
            type: "value"
          },
          series: [
            {
              data: money,
              // type: "line",
              barWidth: 100, //柱图宽度
              type: "bar"
            }
          ]
        });
      });
    },
    printOne(moneyName, money, qualtity) {
      this.$nextTick(() => {
        //   console.log("数量:", qualtity);
        //   console.log("金额:", money);
        //   let myChartss = this.$echarts.init(
        //     document.getElementById("CountingMethod"),
        //     "walden"
        //   );
        let echarts = require("echarts");
        let myChartss = echarts.init(this.$refs.CountingMethod, "浅色");
        myChartss.setOption({
          // dataZoom: [
          //   {
          //     show: true,
          //     realtime: true,
          //     start: 0,
          //     end: 30
          //   }
          // ],
          title: {
            text: "盘点方式",
            // subtext: "模拟数据",//副标题
            x: "center"
          },
          xAxis: {
            type: "category",
            data: moneyName
            // 设置X轴数据旋转倾斜
            //   axisLabel: {
            //     rotate: 30, // 旋转角度
            //     interval: 0 //设置X轴数据间隔几个显示一个，为0表示都显示
            //   }
          },
          // grid: {
          //   width: "100%",
          //   left: "10%",
          //   bottom: "37%"
          // },
          // 提示框
          tooltip: {
            trigger: "axis"
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: this.qualtityMoney == "数量" ? qualtity : money,
              barWidth: 100, //柱图宽度
              // type: "line",
              type: "bar"
            }
          ]
        });
      });
    },

    printTwo(qualtityName, qualtity, money) {
      this.$nextTick(() => {
        let echarts = require("echarts");
        let myChartss = echarts.init(
          this.$refs.ClassificationProportion,
          "浅色"
        );
        myChartss.setOption({
          // dataZoom: [
          //   {
          //     show: true,
          //     realtime: true,
          //     start: 0,
          //     end: 30
          //   }
          // ],
          title: {
            text: "分类占比",
            // subtext: "模拟数据",//副标题
            x: "center"
          },
          xAxis: {
            type: "category",
            data: qualtityName
            // 设置X轴数据旋转倾斜
            //   axisLabel: {
            //     rotate: 30, // 旋转角度
            //     interval: 0 //设置X轴数据间隔几个显示一个，为0表示都显示
            //   }
          },
          // grid: {
          //   width: "100%",
          //   left: "10%",
          //   bottom: "37%"
          // },
          // 提示框
          tooltip: {
            trigger: "axis"
          },

          yAxis: {
            type: "value"
          },
          series: [
            {
              data: this.qualtityMoney == "数量" ? qualtity : money,
              barWidth: 100, //柱图宽度
              type: "bar"
            }
          ]
        });
      });
    }
  },
  mounted() {
    // const that = this;
    // window.onresize = () => {
    //   return (() => {
    //     window.screenWidth = document.body.clientWidth;
    //     that.screenWidth = window.screenWidth;
    //   })();
    // };
  },
  watch: {
    // screenWidth(val) {
    //   // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
    //   if (!this.timer) {
    //     location.reload(); //刷新页面
    //     // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
    //     this.screenWidth = val;
    //     this.timer = true;
    //     let that = this;
    //     // this.drawLine();
    //     setTimeout(function() {
    //       // 打印screenWidth变化的值
    //       that.timer = false;
    //     }, 400);
    //   }
    // }
  }
};
</script>
<style scoped>
/* .echart {
  margin: 2% 0% 2% 0%;
  background-color: #ffffff;
} */
</style>
