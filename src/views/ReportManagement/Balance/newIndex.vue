<template>
  <div style="margin: 1%">
    <el-form :inline="true" style="overflow:hidden; margin:0px 0px -10px 0px;">
      <div style="float: right; margin-right: 10px">
        <el-form-item label="截至账期" prop="remark">
          <!-- 选择账期组件 -->
          <selectZQ ref="selectZQ" style="width: 100%" @setzq="setzq" />
        </el-form-item>
        <el-form-item label="存放地点">
          <!-- 选择存放地点 -->
          <selectCFDD ref="selectCFDD" style="width: 100%" @setcfdd="setcfdd" />
        </el-form-item>
        <el-form-item label="部门">
          <!-- 选择部门 -->

          <selectBM ref="selectBM" style="width: 100%" @setbm="setbm" />
        </el-form-item>
        <el-form-item label="分类">
          <selectZCLB ref="selectZCLB" style="width: 100%" @setzclb="setzclb" />
        </el-form-item>
        <el-button
          size="medium"
          icon="el-icon-search"
          @click="btnok"
        >搜索</el-button>
        <el-button
          size="medium"
          icon="el-icon-folder"
          @click="handleExport"
        >导出</el-button>
      </div>
    </el-form>
    <el-card>
      <div
        slot="header"
        class="clearfix"
        style="height:100%;display:table;width:100%"
      >
        <H2 style="display:table-cell;text-align:center;vertical-align:middle ">
          固定资产结存账统计表
        </H2>
      </div>
      <div>
        单位:{{ this.$store.getters.二级部门名称 }}
        <br>
        账期:{{ zqvalue }}
        <el-table
          ref="table"
          v-loading="loading"
          :data="tableData"
          max-height="800"
          stripe
          :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
          style="width: 100%; margin-top: 10px"
        >
          <el-table-column v-if="false" prop="id" label="id" />

          <el-table-column
            prop="固定资产类别"
            label="固定资产类别"
            :show-overflow-tooltip="true"
            align="center"
          />
          <el-table-column
            prop="数量"
            label="数量/面积"
            :show-overflow-tooltip="true"
            align="center"
          />
          <el-table-column
            prop="原值"
            label="原值"
            :show-overflow-tooltip="true"
            align="center"
          />
          <el-table-column
            prop="累计折旧"
            label="累计折旧"
            :show-overflow-tooltip="true"
            align="center"
          />
          <el-table-column
            prop="净值"
            label="净值"
            :show-overflow-tooltip="true"
            align="center"
          />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import selectZQ from '@/bitcomponents/selectZQ/index.vue'
import selectCFDD from '@/bitcomponents/selectCFDD/index.vue'
import selectBM from '@/bitcomponents/selectBM/index.vue'
import selectZCLB from '@/bitcomponents/selectZCLB/index.vue'
import { get_balancebill } from '@/api/repoartmanegement'
export default {
  components: { selectZQ, selectCFDD, selectBM, selectZCLB },
  data() {
    return {
      searchs: {
        departmentone: this.$store.getters.id_一级部门,
        departmenttwo: this.$store.getters.id_二级部门,
        departmentthree: 0,
        categoryone: 0,
        categorytwo: 0,
        categorythree: 0,
        categoryfour: 0,
        storageone: 0,
        storagetwo: 0,
        billtime: ''
      },
      zqvalue: '',
      tableData: [],
      loading: false
    }
  },
  beforeMount() {},
  created() {},
  methods: {
    // 搜索事件
    btnok() {
      this.searchs.billtime = this.$refs.selectZQ.value.name
      this.loading = true
      get_balancebill(this.searchs).then(res => {
        this.tableData = res.data
        this.addData()
        this.loading = false
      })
      this.loading = false
    },
    // 选择存放地点
    setcfdd(val) {
      this.searchs.storageone = val.storageone
      this.searchs.storagetwo = val.storagetwo
    },
    // 选择部门
    setbm(val) {
      // this.searchs.departmentone = val.departmentone
      this.searchs.departmenttwo = val.departmenttwo
      this.searchs.departmentthree = val.departmentthree
    },
    // 选择资产类别
    setzclb(val) {
      this.searchs.categoryone = val.categoryone
      this.searchs.categorytwo = val.categorytwo
      this.searchs.categorythree = val.categorythree
      this.searchs.categoryfour = val.categoryfour
    },
    // 选择账期
    setzq(val) {
      this.zqvalue = val.name
    },
    // 导出
    async handleExport() {
      if (this.tableData.length === 0) {
        this.msg('警告', '导出数据不能为空!')
        return
      }
      import('@/vendor/Export2Excel').then(excel => {
        // excel头
        const tHeader = [
          '固定资产类别',
          '数量/面积',
          '原值',
          '累计折旧',
          '净值'
        ]
        // excel数据
        const filterVal = ['固定资产类别', '数量', '原值', '累计折旧', '净值']
        const data = this.formatJson(filterVal, this.tableData)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '结存统计表',
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return null
          } else {
            return v[j]
          }
        })
      )
    },
    // 合计
    addData() {
      const obj = {
        固定资产类别: '合计',
        数量: null,
        原值: null,
        累计折旧: null,
        净值: null
      }
      this.tableData.unshift(obj)

      this.tableData[0].数量 = this.sum(this.tableData, '数量').toFixed(2)
      this.tableData[0].原值 = this.sum(this.tableData, '原值').toFixed(2)
      this.tableData[0].累计折旧 = this.sum(this.tableData, '累计折旧').toFixed(2)
      this.tableData[0].净值 = this.sum(this.tableData, '净值').toFixed(2)
    },

    sum(data, columnName) {
      return data
        .map(row => Number(row[columnName]))
        .reduce((val, sum) => val + sum)
    }
  }
}
</script>

<style lang="scss" scoped></style>
