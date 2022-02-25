<template>
  <div style="margin:1%;">
    <p style="color:blue">
      当前折旧状态:待记账。记账由记账员操作。
    </p>
    <el-button plain @click="btnok">提交折旧</el-button>
    <p>{{ this.$store.getters.二级部门名称 }}</p>
    <p>{{ bill }}</p>
    <el-table
      ref="table"
      v-loading="loading"
      :show-overflow-tooltip="true"
      :data="tableData"
      :cell-style="{ textAlign: 'left' }"
      :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
      style="width: 100%; margin-top: 10px; "
      max-height="620"
    >
      <el-table-column
        prop="固定资产类别"
        label="固定资产类别"
        width="250"
        fixed
      />
      <el-table-column prop="本期折旧" label="本期折旧" width="250" fixed />

      <el-table-column label="期末">
        <el-table-column prop="数量" label="数量/面积" width="120" />
        <el-table-column prop="原值" label="原值" width="120" />
        <el-table-column prop="累计折旧" label="累计折旧" width="120" />
        <el-table-column prop="净值" label="净值" width="120" />
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  get_depreciationassets,
  create_depreciationdata
} from '@/api/newdepreciationhandle'
export default {
  components: {},
  data() {
    return {
      tableData: [],
      loading: false,
      bill: '' // 账期
    }
  },
  beforeMount() {
    this.get_depreciationassets()
  },
  methods: {
    get_depreciationassets() {
      get_depreciationassets({
        departmentone: this.$store.getters.id_一级部门 || 0,
        departmenttwo: this.$store.getters.id_二级部门 || 0
      }).then(res => {
        this.bill = res.bill
        this.tableData = res.data
        this.addData()
        this.loading = false
      })
      this.loading = false
    },
    // 合计
    addData() {
      const obj = {
        固定资产类别: '合计',
        本期折旧: null,
        数量: null,
        原值: null,
        累计折旧: null,
        净值: null
      }
      this.tableData.unshift(obj)

      this.tableData[0].本期折旧 = this.sum(this.tableData, '本期折旧').toFixed(
        2
      )
      this.tableData[0].数量 = this.sum(this.tableData, '数量').toFixed(2)
      this.tableData[0].原值 = this.sum(this.tableData, '原值').toFixed(2)
      this.tableData[0].累计折旧 = this.sum(this.tableData, '累计折旧').toFixed(
        2
      )

      this.tableData[0].净值 = this.sum(this.tableData, '净值').toFixed(2)
    },
    sum(data, columnName) {
      return data
        .map(row => Number(row[columnName]))
        .reduce((val, sum) => val + sum)
    },
    // 提交
    btnok() {
      const resData = {
        申请人: this.$store.getters.姓名,
        申请人Id: this.$store.getters.id_用户,
        一级机构ID: this.$store.getters.id_一级部门,
        二级机构ID: this.$store.getters.id_二级部门,
        账期: this.bill,
        备注信息: ''
      }
      create_depreciationdata(resData).then(res => {
        if (res.code === 100) {
          this.$notify({
            title: '成功',
            message: '提交成功',
            type: 'success'
          })
        } else {
          this.$notify({
            title: '警告',
            message: res.msg,
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>

<style></style>
