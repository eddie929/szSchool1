<template>
  <div style="margin:1%;">
    <p style="color:blue">
      确定结账前,务必与财务核对下列固定资产汇总表!
      本单位已经与财政资产云对接，共创软件不再接收撤销账期处理。请您仔细与财务核对，确认无误后再结账。
    </p>
    <el-button plain>月结帐</el-button>
    <p style="font-size:20px">固定资产汇总表</p>
    <p>账期:2022年01月</p>
    <el-table
      ref="table"
      v-loading="loading"
      :data="tableData"
      stripe
      :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
      style="width: 100%; margin-top: 10px"
    >
      <el-table-column prop="固定资产类别" label="固定资产类别" width="150" />
      <!-- <el-table-column label="期初">
        <el-table-column prop="name" label="数量/面积" width="120" />
        <el-table-column prop="name" label="原值" width="120" />
        <el-table-column prop="name" label="累计折旧" width="120" />
        <el-table-column prop="name" label="净值" width="120" />
      </el-table-column>
      <el-table-column label="期末">
        <el-table-column prop="name" label="数量/面积" width="120" />
        <el-table-column prop="name" label="原值" width="120" />
        <el-table-column prop="name" label="累计折旧" width="120" />
        <el-table-column prop="name" label="净值" width="120" />
      </el-table-column>
      <el-table-column label="新增">
        <el-table-column prop="name" label="数量/面积" width="120" />
        <el-table-column prop="name" label="原值" width="120" />
        <el-table-column prop="name" label="累计折旧" width="120" />
      </el-table-column>
      <el-table-column label="原值变动">
        <el-table-column prop="name" label="增加" width="120" />
        <el-table-column prop="name" label="减少" width="120" />
        <el-table-column prop="name" label="折旧冲销" width="120" />
      </el-table-column>
      <el-table-column label="处置">
        <el-table-column prop="name" label="数量/面积" width="120" />
        <el-table-column prop="name" label="原值" width="120" />
        <el-table-column prop="name" label="累计折旧" width="120" />
        <el-table-column prop="name" label="净值" width="120" />
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { get_monthlysettlementdata } from '@/api/monthlysettlement'
export default {
  components: {},
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  beforeMount() {
    this.get_monthlysettlementdata()
  },
  methods: {
    get_monthlysettlementdata() {
      get_monthlysettlementdata({
        departmenttwo: this.$store.getters.id_二级部门 || 0
      }).then(res => {
        console.log(res.data)
        this.tableData = res.data.期初
        this.loading = false
      })
      this.loading = false
    }
  }
}
</script>

<style></style>
