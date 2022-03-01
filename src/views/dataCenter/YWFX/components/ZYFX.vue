<template>
  <div>
    <el-row :gutter="10" style="margin:1%; ">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card
          class="box-card"
          style="margin:-10px; height:450px; margin: -10px 10px 0px -10px; "
        >
          <div class="cladiv1">
            <div style="margin:10px 10px;">
              <i class="el-icon-plus" />
              <span style="font-size: 20px; color: DarkSlateGray; ">
                增加资产数量：10
              </span>
              <br>
              <br>

              <i class="el-icon-minus" />
              <span style="font-size: 20px; color: DarkSlateGray; ">
                减少资产数量：10
              </span>
              <br>
              <br>
              <i class="el-icon-minus" />
              <span style="font-size: 20px; color: DarkSlateGray; ">
                减少资产数量：10
              </span>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card class="box-card" style="margin:-10px; height:450px;  ">
          <div slot="header" class="clearfix" style="height:18px">
            <span>频率分析</span>
          </div>
          <div id="main" class="mymain" />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" style="margin:1%; margin-top:30px;">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card
          class="box-card"
          style="margin:-10px; height:450px; margin: -10px 10px 0px -10px; "
        >
          <div slot="header" class="clearfix" style="height:18px">
            <span>借用人排行</span>
          </div>
          <div id="main1" class="mymain" />
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card class="box-card" style="margin:-10px; height:450px; ">
          <div slot="header" class="clearfix" style="height:18px">
            <span>分类占比分析</span>
          </div>
          <div id="main2" class="mymain" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AddData',
  components: {},

  data() {
    return {}
  },
  computed: {},
  mounted() {
    this.myecharts()
    this.myecharts1()
    this.myecharts2()
  },
  methods: {
    myecharts() {
      var echarts = require('echarts')
      var chartDom = document.getElementById('main')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 160, 0, 0, 0],
            type: 'line'
          }
        ]
      }

      setTimeout(() => {
        myChart.setOption(option)
        myChart.resize()
      }, 500)
    },
    myecharts1() {
      var echarts = require('echarts')
      var chartDom = document.getElementById('main1')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }

      setTimeout(() => {
        myChart.setOption(option)
        myChart.resize()
      }, 500)
    },
    myecharts2() {
      var echarts = require('echarts')
      var chartDom = document.getElementById('main2')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }

      setTimeout(() => {
        myChart.setOption(option)
        myChart.resize()
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.cladiv1 {
  width: 100%;
  height: 100px;
  //color: red;
  //background-color: red;
  margin: -10px 0px 0px -10px;
  // border: 1px solid #ddd;
  // border-radius: 3px;
}
.cladiv2 {
  width: 100%;
  height: 100px;
  //color: red;
  //background-color: red;
  margin: 10px 0px 0px -10px;
  border: 1px solid #ddd;
  border-radius: 3px;
}
.mymain {
  margin-bottom: 0px;
  width: 100%;
  height: 350px;
  z-index: 6;
}
</style>
