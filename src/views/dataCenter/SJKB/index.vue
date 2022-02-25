<template>
  <div style="margin:1%;">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="box-card">
          <el-row :gutter="10">
            <el-col :span="8">
              <div>
                <span style="font-size: 20px; color: SlateGray">
                  资产总数:{{ 123 }}件
                </span>
              </div>
            </el-col>

            <el-col :span="8">
              <div>
                <span style="font-size: 20px; color: SlateGray">
                  资产总数:{{ 123 }}件
                </span>
              </div>
            </el-col>

            <el-col :span="8">
              <div>
                <span style="font-size: 20px; color: SlateGray">
                  资产总数:{{ 123 }}件
                </span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <el-row :gutter="10">
            <el-col :span="8">
              <div>
                <span style="font-size: 20px; color: SlateGray">
                  资产总数:{{ 123 }}件
                </span>
              </div>
            </el-col>

            <el-col :span="8">
              <div>
                <span style="font-size: 20px; color: SlateGray">
                  资产总数:{{ 123 }}件
                </span>
              </div>
            </el-col>

            <el-col :span="8">
              <div>
                <span style="font-size: 20px; color: SlateGray">
                  资产总数:{{ 123 }}件
                </span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" style="margin-top: 10px;">
      <el-col :span="12">
        <el-card class="box-card" style="height:400px;">
          <div slot="header" class="clearfix">
            <span>标签情况</span>
          </div>
          <el-alert title="二维码标签数量" type="success" :closable="false" />
          <el-alert
            style="margin-top:10px"
            title="二维码标签数量"
            type="warning"
            :closable="false"
          />
          <el-alert
            style="margin-top:10px"
            title="二维码标签数量"
            type="success"
            :closable="false"
          />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" style="height:400px;">
          <div id="main" ref="main" slot="header" class="clearfix mymain">
            <span>资产分析</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div />
  </div>
</template>

<script>
import 'echarts/theme/浅色.js' // 引用Echarts主题
export default {
  name: 'SKJB',
  data() {
    return {}
  },
  mounted() {
    this.myecharts()
  },
  methods: {
    myecharts() {
      var echarts = require('echarts')
      var chartDom = document.getElementById('main')
      var myChart = echarts.init(chartDom)
      var app = {}
      var option
      const posList = [
        'left',
        'right',
        'top',
        'bottom',
        'inside',
        'insideTop',
        'insideLeft',
        'insideRight',
        'insideBottom',
        'insideTopLeft',
        'insideTopRight',
        'insideBottomLeft',
        'insideBottomRight'
      ]
      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
          }
        },
        position: {
          options: posList.reduce(function(map, pos) {
            map[pos] = pos
            return map
          }, {})
        },
        distance: {
          min: 0,
          max: 100
        }
      }
      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function() {
          const labelOption = {
            rotate: app.config.rotate,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            position: app.config.position,
            distance: app.config.distance
          }
          myChart.setOption({
            series: [
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              },
              {
                label: labelOption
              }
            ]
          })
        }
      }
      const labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {}
        }
      }
      option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Forest', 'Steppe', 'Desert', 'Wetland']
        },
        // toolbox: {
        //   show: true,
        //   orient: 'vertical',
        //   left: 'right',
        //   top: 'center',
        //   feature: {
        //     mark: { show: true },
        //     dataView: { show: true, readOnly: false },
        //     magicType: { show: true, type: ['line', 'bar', 'stack'] },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: ['2012', '2013', '2014', '2015', '2016']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Forest',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390]
          },
          {
            name: 'Steppe',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290]
          },
          {
            name: 'Desert',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190]
          },
          {
            name: 'Wetland',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [98, 77, 101, 99, 40]
          }
        ]
      }

      myChart.setOption(option)
      // setTimeout(function() {
      //   window.onresize = function() {
      //     myChart.resize()
      //   }
      // }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
.mymain {
  width: 100%;
  height: 400px;
}
</style>
