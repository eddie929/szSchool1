<template>
  <div style="margin:1%;">
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card class="box-card">
          <el-row :gutter="10">
            <el-col :span="8">
              <div>
                <span style="font-size: 20px; color: DarkSlateGray">
                  资产总数:{{ 资产数量 }}
                </span>
              </div>
            </el-col>

            <el-col :span="8">
              <div>
                <span style="font-size: 20px; color: DarkSlateGray">
                  资产原值：:{{ 资产原值 }}
                </span>
              </div>
            </el-col>

            <el-col :span="8">
              <div>
                <span style="font-size: 20px; color: DarkSlateGray">
                  资产净值：:{{ 资产净值 }}
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
                <span style="font-size: 20px; color: DarkSlateGray">
                  存放地:{{ 地点数量 }}
                </span>
              </div>
            </el-col>

            <el-col :span="8">
              <div>
                <span style="font-size: 20px; color: DarkSlateGray">
                  部门:{{ 部门数量 }}
                </span>
              </div>
            </el-col>

            <el-col :span="8">
              <div>
                <span style="font-size: 20px; color: DarkSlateGray">
                  人员:{{ 人员数量 }}
                </span>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" style="margin-top: 10px;">
      <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
        <el-card class="box-card" style="height:500px;">
          <div slot="header" class="clearfix">
            <span>标签情况</span>
          </div>
          <el-alert :title="待打印标签数量" type="info" :closable="false" />
          <el-alert
            style="margin-top:10px"
            :title="二维码标签数量"
            type="info"
            :closable="false"
          />
          <el-alert
            style="margin-top:10px"
            :title="电子标签数量"
            type="info"
            :closable="false"
          />
        </el-card>
      </el-col>
      <div class="Echarts">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-card class="box-card" style="height:500px;">
            <div slot="header" class="clearfix" style="height:18px">
              <span>资产分布</span>
              <div style="float:right;">
                <!-- <template>
                  <el-radio v-model="radio" label="按存放地">按存放地</el-radio>
                  <el-radio v-model="radio" label="按部门">按部门</el-radio>
                  <el-radio v-model="radio" label="按负责人">按负责人</el-radio>
                </template> -->

                <el-radio-group v-model="radio" @change="ridioChang">
                  <el-radio label="地点">按存放地</el-radio>
                  <el-radio label="部门">按部门</el-radio>
                  <el-radio label="负责人">按负责人</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div id="main" ref="main" class="mymain" />

            <div
              style="margin-top:-10px; float:right; overflow: hidden;  z-index: 8;"
            >
              <el-link
                :type="moneyType"
                class="el-collapse-transition"
                :style="moneySize"
                @click="moneyissum('金额')"
              >金额</el-link>
              &nbsp
              <el-link
                :type="sumType"
                class="el-collapse-transition"
                :style="sumSize"
                @click="moneyissum('数量')"
              >数量</el-link>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-row>

    <el-tabs type="border-card" style="margin-top: 10px;">
      <el-tab-pane label="最近登录人员">
        <recentUser ref="recentUser" :islogin="1" />
      </el-tab-pane>
      <el-tab-pane label="从未登录人员">
        <recentUser ref="recentUser" :islogin="0" />
      </el-tab-pane>
    </el-tabs>
    <div />
  </div>
</template>

<script>
import 'echarts/theme/浅色.js' // 引用Echarts主题
import {
  get_assetdistribution,
  get_labeldata,
  get_wholedata
} from '@/api/datacenterhandle'
import recentUser from './components/recentUser.vue'
export default {
  name: 'SKJB',
  components: { recentUser },
  data() {
    return {
      radio: '地点',
      moneyType: 'primary',
      sumType: 'info',
      moneySize: 'font-size:16px; font-weight:bold;',
      sumSize: 'font-size:12px; font-weight:bold',
      cIsm: '金额',
      待打印标签数量: '待打印标签数量：0',
      电子标签数量: '电子标签数量：0',
      二维码标签数量: '二维码标签数量：0',
      资产数量: 0,
      资产原值: '',
      资产净值: '',
      人员数量: 0,
      部门数量: 0,
      地点数量: 0
    }
  },
  mounted() {
    // 首次加载
    this.myecharts(this.cIsm, this.radio)
    this.get_labeldata()
    this.get_wholedata()
  },
  methods: {
    myecharts(cIsm, ridioText) {
      var echarts = require('echarts')
      var chartDom = document.getElementById('main')
      var myChart = echarts.init(chartDom)
      var option
      const reqpara = {
        departmenttwo: this.$store.getters.id_二级部门,
        countway: cIsm,
        queryway: ridioText
      }
      const viewLable = []
      const viewData = []
      get_assetdistribution(reqpara).then(res => {
        if (res.code === 100) {
          for (let index = 0; index < res.data.length; index++) {
            viewLable.push(res.data[index].名称)
            viewData.push(res.data[index].数量)
          }
        }
      })

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
            data: viewLable,
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
            name: cIsm,
            type: 'bar',
            barWidth: '70%',
            data: viewData
          }
        ]
      }
      setTimeout(() => {
        myChart.setOption(option)
      }, 500)
    },
    // 金额数量切换
    moneyissum(val) {
      if (val === '金额') {
        this.sumType = 'info'
        this.moneyType = 'primary'
        this.sumSize = 'font-size:12px; font-weight:bold'
        this.moneySize = 'font-size:16px; font-weight:bold'
        this.cIsm = val
        this.myecharts(this.cIsm, this.radio)
      } else {
        this.sumSize = 'font-size:16px; font-weight:bold'
        this.moneySize = 'font-size:12px; font-weight:bold'
        this.sumType = 'primary'
        this.moneyType = 'info'
        this.cIsm = val
        this.myecharts(this.cIsm, this.radio)
      }
    },
    // 单选切换
    ridioChang(val) {
      this.myecharts(this.cIsm, this.radio)
    },
    // 加载标签情况
    get_labeldata() {
      get_labeldata({ departmenttwo: this.$store.getters.id_二级部门 }).then(
        res => {
          this.待打印标签数量 = '待打印标签数量：' + res.data.待打印标签数量
          this.电子标签数量 = '电子标签数量：' + res.data.电子标签数量
          this.二维码标签数量 = '二维码标签数量：' + res.data.二维码标签数量
        }
      )
    },
    // 整体数据
    get_wholedata() {
      get_wholedata({ departmenttwo: this.$store.getters.id_二级部门 }).then(
        res => {
          this.资产数量 = res.data.资产数量
          this.资产原值 = res.data.资产原值
          this.资产净值 = res.data.资产净值
          this.人员数量 = res.data.人员数量
          this.部门数量 = res.data.部门数量
          this.地点数量 = res.data.地点数量
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.mymain {
  margin-bottom: 0px;
  width: 100%;
  height: 400px;
  z-index: 6;
}
// .radio {
//   position: fixed;
// }
</style>
