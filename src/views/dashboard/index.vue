<template>
  <div style="padding: 1%" class="dashboard-editor-container">
    <el-card class="box-card">
      <el-form :inline="true">
        <span style="font-size: 20px; color: red">
          资产总数:{{ zichansum }}
        </span>
        <span style="font-size: 20px; color: #D3D3D3">|</span>
        <span style="font-size: 20px; color: red">
          原值合计:{{ yzsum }}
        </span>
        <span style="font-size: 20px; color: #D3D3D3">|</span>
        <span style="font-size: 20px; color: red">
          净值合计:{{ jzsum }}
        </span>
      </el-form>
    </el-card>

    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="todosome">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="assetdb" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">待办中心</div>
            <count-to
              :start-val="0"
              :end-val="todosums"
              :duration="5000"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="xiaoxi">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="仓库" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">待处置库</div>
            <count-to
              :start-val="0"
              :end-val="this.dczksum"
              :duration="5000"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>

      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div
          class="card-panel"
          @click="$router.push({ path: '/abnormal/index' })"
        >
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="预警" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">异常资产</div>
            <count-to
              :start-val="0"
              :end-val="0"
              :duration="3600"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div
          class="card-panel"
          @click="$router.push({ path: '/Critical/index' })"
        >
          <div class="card-panel-icon-wrapper icon-shopping">
            <svg-icon icon-class="到期" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">临界到期</div>
            <count-to
              :start-val="0"
              :end-val="0"
              :duration="3200"
              class="card-panel-num"
            />
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="40">
      <div class="Echarts">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="grid-content bg-purple-light" style="padding: 10px">
            <div
              id="main1"
              ref="main1"
              style="width: 100%; height: 400px; z-index: 6"
            />
            <div style="overflow: hidden; z-index: 8; height: 55px">
              <div
                class="linka"
                style="
                  float: right;
                  z-index: 8;
                  cursor: pointer;
                  margin-top: 35px;
                "
              >
                <el-link
                  :type="mian1sizemoney"
                  class="el-collapse-transition"
                  :style="style1mongy"
                  @click="main1click('金额')"
                >金额</el-link>
                <el-link
                  :type="mian1sizesum"
                  class="el-collapse-transition"
                  :style="style1sum"
                  @click="main1click('数量')"
                >数量</el-link>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="grid-content bg-purple" style="padding: 10px">
            <div
              id="main2"
              ref="main2"
              style="width: 100%; height: 400px"
            />
            <div style="overflow: hidden; z-index: 8; height: 55px">
              <div
                class="linka"
                style="
                  float: right;
                  z-index: 8;
                  cursor: pointer;
                  margin-top: 35px;
                "
              >
                <el-link
                  :type="mian2sizemoney"
                  class="el-collapse-transition"
                  :style="style2mongy"
                  @click="main1click2('金额')"
                >金额</el-link>
                <el-link
                  :type="mian2sizesum"
                  class="el-collapse-transition"
                  :style="style2sum"
                  @click="main1click2('数量')"
                >数量</el-link>
              </div>
            </div>
          </div>
        </el-col>
      </div>
    </el-row>
    <!-- <el-row :gutter="40" style="margin-top: 30px">
      <div class="Echarts">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="grid-content bg-purple-light" style="padding: 10px">
            <div
              id="main3"
              ref="main3"
              style="width: 100%; height: 500px"
            />
            <div style="overflow: hidden; z-index: 8; height: 55px">
              <div
                class="linka"
                style="
                  float: right;
                  z-index: 8;
                  cursor: pointer;
                  margin-top: 35px;
                "
              >
                <el-link
                  :type="mian3sizemoney"
                  class="el-collapse-transition"
                  :style="style3mongy"
                  @click="main1click3('金额')"
                >金额</el-link>
                <el-link
                  :type="mian3sizesum"
                  class="el-collapse-transition"
                  :style="style3sum"
                  @click="main1click3('数量')"
                >数量</el-link>
              </div>
            </div>
          </div>
        </el-col>
      </div>
    </el-row> -->

    <el-drawer
      center
      :visible.sync="drawer"
      :direction="direction"
      :with-header="false"
      size="65%"
    >
      <h4 style="font-size: 16px; color: #00000073; text-align: center">
        消息中心
      </h4>
      <el-table
        ref="DataTable"
        v-loading="loading"
        :data="tableData"
        style="width: 98%; margin-top: 1%; margin: 0 auto"
        :highlight-current-row="true"
        border
        stripe
        :fit="true"
        :cell-style="yellowBg"
        :header-cell-style="{
          'text-align': 'center',
          background: '#eef1f6',
        }"
      >
        <el-table-column
          label="序号"
          type="index"
          width="50"
          :reserve-selection="true"
        />
        <el-table-column prop="消息事项" label="消息事项" />
        <el-table-column
          prop="消息内容"
          label="消息内容"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="发布人"
          label="发布人"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="发布时间"
          label="发布时间"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="通知类型"
          label="通知类型"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="" label="是否已读" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ maturity(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="hande(scope.row)">
              已 读
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin: 10px 0px 0px 10px">
        <el-col :span="24">
          <el-pagination
            background
            :current-page="pageinfo.pageNum"
            :page-sizes="pageinfo.pageSizes"
            :page-size="pageinfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageinfo.count"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'
import {
  get_agencydatal,
  get_proportionassetclasses,
  get_proportionamountquantity,
  get_increaseordecreaseinassets,
  get_proportionamountquantitycount,
  get_noticelist,
  get_noticelistcount
} from '@/api/datareportstatisticshandle'
import 'echarts/theme/浅色.js' // 引用Echarts主题
export default {
  components: { CountTo },
  data() {
    return {
      times: 15,
      tableData: [], // 消息中心数据
      direction: 'rtl',
      drawer: false,
      todosums: 0,

      mian1sizesum: 'info',
      mian1sizemoney: 'primary',
      style1sum: 'font-size:12px;',
      style1mongy: 'font-size:16px;',

      mian2sizesum: 'info',
      mian2sizemoney: 'primary',
      style2sum: 'font-size:12px;',
      style2mongy: 'font-size:16px;',

      mian3sizesum: 'info',
      mian3sizemoney: 'primary',
      style3sum: 'font-size:12px;',
      style3mongy: 'font-size:16px;',

      zichansum: 0,
      yzsum: 0,
      jzsum: 0,
      ddyksum: 0,
      dczksum: 0,
      ljdq: 0,

      loading: false,

      pageinfo: {
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50],
        count: 0,
        fk_user: this.$store.getters.id_用户,
        fk_role: this.$store.getters.id_角色,
        departmentone: this.$store.getters.id_一级部门,
        departmenttwo: this.$store.getters.id_二级部门
      }
    }
  },
  beforeMount() {
    this.onload()
    if (window.name == '') {
      // console.log("页面首次加载111");
      window.name = 'reload'
      this.tips() // 未读消息
    } else {
      // console.log("页面被刷新222");
    }
  },
  mounted() {
    this.myEcharts1('金额')
    this.myEcharts2('金额')
    this.myEcharts3('金额')
    this.get_proportionamountquantitycount()
    this.get_noticelist()
  },
  methods: {
    // 跳转资产处置
    gotochuzhi() {
      this.$router.push({ path: '/assetDisposal/index' })
    },
    hande(row) {
      // console.log(row);
      get_noticelistcount({ id: row.id, isread: 1 }).then((res) => {
        this.get_noticelist()
      })
    },
    maturity(row) {
      if (row.是否已读 == 0) {
        return '未读'
      } else {
        return '已读'
      }
    },
    yellowBg({ row, column, rowIndex, columnIndex }) {
      // console.log(row.是否已读);
      if (row.是否已读 == 0) {
        return {
          background: '#d9ecff'
        }
      } else {
        return {
          background: ''
        }
      }
    },
    // 打开消息
    xiaoxi() {
      this.$router.push({ path: '/assetDisposal/index' })
    },
    main1click(val) {
      if (val == '金额') {
        this.mian1sizesum = 'info'
        this.mian1sizemoney = 'primary'
        this.style1sum = 'font-size:12px;'
        this.style1mongy = 'font-size:16px;'
      } else {
        this.style1sum = 'font-size:16px;'
        this.style1mongy = 'font-size:12px;'
        this.mian1sizesum = 'primary'
        this.mian1sizemoney = 'info'
      }
      this.myEcharts1(val)
    },
    main1click2(val) {
      if (val == '金额') {
        this.mian2sizesum = 'info'
        this.mian2sizemoney = 'primary'
        this.style2sum = 'font-size:12px;'
        this.style2mongy = 'font-size:16px;'
      } else {
        this.style2sum = 'font-size:16px;'
        this.style2mongy = 'font-size:12px;'
        this.mian2sizesum = 'primary'
        this.mian2sizemoney = 'info'
      }
      this.myEcharts2(val)
    },
    main1click3(val) {
      if (val == '金额') {
        this.mian3sizesum = 'info'
        this.mian3sizemoney = 'primary'
        this.style3sum = 'font-size:12px;'
        this.style3mongy = 'font-size:16px;'
      } else {
        this.style3sum = 'font-size:16px;'
        this.style3mongy = 'font-size:12px;'
        this.mian3sizesum = 'primary'
        this.mian3sizemoney = 'info'
      }
      this.myEcharts3(val)
    },
    // 资产分类
    myEcharts1(val) {
      // 基于准备好的dom，初始化echarts实例
      const echarts = require('echarts')
      const myChart = echarts.init(this.$refs.main1, '浅色')
      var str = []
      var sum = []
      var list = []
      var data = {
        departmentone: this.$store.getters.id_一级部门,
        departmenttwo: this.$store.getters.id_二级部门,
        checkway: val
      }
      get_proportionassetclasses(data).then((res) => {
        if (res.code > 0) {
          for (var i = 0; i < res.data.length; i++) {
            str.push(res.data[i].类别)
            sum.push(res.data[i].数量)
            const j = {
              value: res.data[i].数量,
              name: res.data[i].类别
            }
            list.push(j)
          }
          // console.log(list)
          this.option = {
            title: {
              text: '资产分类占比',
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: str
            },
            series: [
              {
                name: val,
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                data: list,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(this.option)
          setTimeout(function() {
            window.onresize = function() {
              myChart.resize()
            }
          }, 200)
        }
      })
    },
    // 资产状态
    myEcharts2(val) {
      // if (val == "金额") {
      //   this.mian1sizesum = "info";
      //   this.mian1sizemoney = "primary";
      //   this.style1sum = "font-size:12px;";
      //   this.style1mongy = "font-size:16px;";
      // } else {
      //   this.style1sum = "font-size:16px;";
      //   this.style1mongy = "font-size:12px;";
      //   this.mian1sizesum = "primary";
      //   this.mian1sizemoney = "info";
      // }
      // 基于准备好的dom，初始化echarts实例
      const echarts = require('echarts')
      const myChart = echarts.init(this.$refs.main2, '浅色')
      var str = []
      var sum = []
      var list = []
      var data = {
        departmentone: this.$store.getters.id_一级部门,
        departmenttwo: this.$store.getters.id_二级部门,
        checkway: val
      }
      get_proportionamountquantity(data).then((res) => {
        if (res.code > 0) {
          for (var i = 0; i < res.data.length; i++) {
            str.push(res.data[i].资产状态)
            sum.push(res.data[i].数量)
            const j = {
              value: res.data[i].数量,
              name: res.data[i].资产状态
            }
            list.push(j)
          }
          // console.log(list)
          this.option = {
            title: {
              text: '资产状态占比',
              left: 'center'
            },
            color: ['#EE6666', '#73C0DE', '#91CB74', '#FAC858'],
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: str
            },
            series: [
              {
                name: val,
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                data: list,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(this.option)
          setTimeout(function() {
            window.onresize = function() {
              myChart.resize()
            }
          }, 200)
        }
      })
    },
    // 12个月
    myEcharts3(val) {
      // if (val == "金额") {
      //   this.mian1sizesum = "info";
      //   this.mian1sizemoney = "primary";
      //   this.style1sum = "font-size:12px;";
      //   this.style1mongy = "font-size:16px;";
      // } else {
      //   this.style1sum = "font-size:16px;";
      //   this.style1mongy = "font-size:12px;";
      //   this.mian1sizesum = "primary";
      //   this.mian1sizemoney = "info";
      // }
      const echarts = require('echarts')
      const myChart = echarts.init(this.$refs.main3, '浅色')

      var data = {
        departmentone: this.$store.getters.id_一级部门,
        departmenttwo: this.$store.getters.id_二级部门,
        checkway: val,
        year: this.dayjs().year()
      }
      var name = []
      var str = []
      var list = []
      var value = []
      get_increaseordecreaseinassets(data).then((res) => {
        if (res.code > 0) {
          // list = res.data[0];
          for (var i = 0; i < res.data.length; i++) {
            name.push(res.data[i].月份)
            value.push(res.data[i].增加数量)
            list.push(res.data[i].减少数量)
          }

          this.option = {
            title: {
              text: '年增减分析',
              left: 'center'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: res.data.月份,
              orient: 'vertical',
              left: 'left'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: name
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '增加',
                type: 'line',
                stack: 'Total',
                data: value,
                smooth: false
              },
              {
                name: '减少',
                type: 'line',
                stack: 'Total',
                data: list,
                smooth: false
              }
            ]
          }
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(this.option)
          setTimeout(function() {
            window.onresize = function() {
              myChart.resize()
            }
          }, 200)
        }
      })
    },
    todosome() {
      // console.log(1);
      // /TodoCenter
      this.$router.push({ path: '/Todo/index' })
    },
    // 待办总数
    tosum() {
      var data = {}
      data.pageNum = 1
      data.pageSize = 10
      data.fk_user = this.$store.getters.id_用户
      data.fk_role = this.$store.getters.id_角色
      data.departmentone = this.$store.getters.id_一级部门
      data.departmenttwo = this.$store.getters.id_二级部门

      get_agencydatal(data).then((res) => {
        this.todosums = res.count
      })
    },
    onload() {
      this.tosum()
    },
    // 资产分类
    get_proportionassetclasses() {
      var data = {
        departmentone: this.$store.getters.id_一级部门,
        departmenttwo: this.$store.getters.id_二级部门
      }
    },
    // 首页数据
    get_proportionamountquantitycount() {
      var data = {
        departmentone: this.$store.getters.id_一级部门,
        departmenttwo: this.$store.getters.id_二级部门
      }
      get_proportionamountquantitycount(data).then((res) => {
        this.zichansum = res.data.资产总数
        this.yzsum = res.data.原值合计
        this.jzsum = res.data.净值合计
        this.dczksum = res.data.待处置库
        this.ljdq = res.data.临界到期数
      })
    },
    // 消息中心
    get_noticelist() {
      this.loading = true
      get_noticelist(this.pageinfo).then((res) => {
        this.loading = false
        this.tableData = res.data
        this.pageinfo.count = res.count
      })
    },
    // 控制每页显示条数
    handleSizeChange(val) {
      this.pageinfo.pageSize = val
      this.get_noticelist()
    },
    // 第几页
    handleCurrentChange(val) {
      // console.log(val)
      this.pageinfo.pageNum = val
      this.get_noticelist()
    },
    // 未读消息
    tips() {
      const TIME_COUNT = 20
      if (!this.timer) {
        this.count = TIME_COUNT
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
            const dom = document.querySelector('#countDownNumber')
            dom.innerText = this.count
          } else {
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
      const data = {
        pageNum: 1,
        pageSize: 999999,
        fk_user: this.$store.getters.id_用户,
        fk_role: this.$store.getters.id_角色,
        departmentone: this.$store.getters.id_一级部门,
        departmenttwo: this.$store.getters.id_二级部门
      }
      get_noticelist(data).then((res) => {
        const dataa = {
          pageNum: 1,
          pageSize: 999999,
          fk_user: this.$store.getters.id_用户,
          fk_role: this.$store.getters.id_角色,
          departmentone: this.$store.getters.id_一级部门,
          departmenttwo: this.$store.getters.id_二级部门
        }
        get_agencydatal(dataa).then((ress) => {
          if (res.unreadcount != 0 && ress.count != 0) {
            this.$notify({
              // title: "欢迎" + this.$store.getters.角色名称 + "登陆系统!",
              // message: "您有" + res.unreadcount + "条未读消息!",
              dangerouslyUseHTMLString: true,
              // message: `<div>活动剩余时间:${this.count}</div>`,
              message: `
            <h3 style="color: #FFA500;font-size: 14px">欢迎<span style="color: #808080;font-size: 16px">${this.$store.getters.姓名}</span>登陆系统</h3>
            <p style="color: #FFA500;font-size: 14px">您有:<p>
            <p style="color: #FFA500;font-size: 14px">消息中心 ( <span style="color: #FF0000;">${res.unreadcount}</span> ) 条未读消息!<p>
            <p style="color: #FFA500;font-size: 14px">待办中心 ( <span style="color: #FF0000;">${ress.count}</span> ) 项待处理业务!<p>
            <h3></h3>
            <span style="color: #808080;font-size: 14px">点击关闭窗口<span>
            <i id="countDownNumber" style="color: #FF0000;font-weight:700;padding: 0 0.01rem">${this.count}</i>秒`,
              position: 'bottom-right',
              // type: "warning",
              showClose: false,
              duration: 20000,
              onClick() {
                this.close()
              }
            })
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.linka a {
  margin-left: 10px;
}
//
.dev {
  font-size: 16px;
  margin-top: 150px;
  text-align: center;
  margin-bottom: 20px;
}
.dev div {
  //width: 224px;
  margin-top: 150px;
  margin: 0 auto;
  font-size: 20px;
  // margin-left: 40%;
  height: auto;
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.bottom {
  background-color: #fff;
  box-shadow: 5px 5px 5px #77777759;
  border-radius: 4px;
  margin-top: 30px;
  //color: #000;
  padding: 30px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #fff;
  box-shadow: 5px 5px 5px #77777759;
}
.bg-purple-light {
  background: #fff;
  box-shadow: 5px 5px 5px #77777759;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

//
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 5px 5px 5px #77777759;

    // box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #f0cd07;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
