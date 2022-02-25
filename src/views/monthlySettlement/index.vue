<template>
  <div style="margin:1%;">
    <p style="color:blue">
      确定结账前,务必与财务核对下列固定资产汇总表!
      本单位已经与财政资产云对接，共创软件不再接收撤销账期处理。请您仔细与财务核对，确认无误后再结账。
    </p>
    <el-button plain @click="btnok">月结帐</el-button>
    <p style="font-size:20px">固定资产汇总表</p>
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
      <el-table-column label="期初">
        <el-table-column prop="期初数量" label="数量/面积" width="120" />
        <el-table-column prop="期初原值" label="原值" width="120" />
        <el-table-column prop="期初累计折旧" label="累计折旧" width="120" />
        <el-table-column prop="期初净值" label="净值" width="120" />
      </el-table-column>
      <el-table-column label="期末">
        <el-table-column prop="期末数量" label="数量/面积" width="120" />
        <el-table-column prop="期末原值" label="原值" width="120" />
        <el-table-column prop="期末累计折旧" label="累计折旧" width="120" />
        <el-table-column prop="期末净值" label="净值" width="120" />
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
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  get_monthlysettlementdata,
  monthlyclosingsubmit
} from '@/api/monthlysettlement'
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
    this.get_monthlysettlementdata()
  },
  methods: {
    get_monthlysettlementdata() {
      get_monthlysettlementdata({
        departmenttwo: this.$store.getters.id_二级部门 || 0
      }).then(res => {
        this.bill = res.bill
        const arr = []
        res.data.forEach((item, index, array) => {
          if (item.固定资产类别 === '其中：房屋') {
            item.固定资产类别 = '　　其中：房屋'
          } else if (item.固定资产类别 === '其中：汽车') {
            item.固定资产类别 = '　　其中：汽车'
          } else if (item.固定资产类别 === '其中：（1）文物') {
            item.固定资产类别 = '　　其中：（1）文物'
          } else if (item.固定资产类别 === '（2）陈列品') {
            item.固定资产类别 = '　　　　　（2）陈列品'
          } else if (item.固定资产类别 === '其中：图书资料') {
            item.固定资产类别 = '　　其中：图书资料'
          } else if (item.固定资产类别 === '其中：家具用具') {
            item.固定资产类别 = '　　其中：家具用具'
          }
          arr.push(item)
        })
        this.tableData = arr
        this.addData()
        this.loading = false
      })
      this.loading = false
    },
    // 合计
    addData() {
      const obj = {
        固定资产类别: '合计',
        期初数量: null,
        期初原值: null,
        期初累计折旧: null,
        期初净值: null,
        期末数量: null,
        期末原值: null,
        期末累计折旧: null,
        期末净值: null
      }
      this.tableData.unshift(obj)

      this.tableData[0].期初数量 = this.sum(this.tableData, '期初数量').toFixed(
        2
      )
      this.tableData[0].期初原值 = this.sum(this.tableData, '期初原值').toFixed(
        2
      )
      this.tableData[0].期初累计折旧 = this.sum(
        this.tableData,
        '期初累计折旧'
      ).toFixed(2)
      this.tableData[0].期初净值 = this.sum(this.tableData, '期初净值').toFixed(
        2
      )

      this.tableData[0].期末数量 = this.sum(this.tableData, '期末数量').toFixed(
        2
      )
      this.tableData[0].期末原值 = this.sum(this.tableData, '期末原值').toFixed(
        2
      )
      this.tableData[0].期末累计折旧 = this.sum(
        this.tableData,
        '期末累计折旧'
      ).toFixed(2)
      this.tableData[0].期末净值 = this.sum(this.tableData, '期末净值').toFixed(
        2
      )
    },
    sum(data, columnName) {
      return data
        .map(row => Number(row[columnName]))
        .reduce((val, sum) => val + sum)
    },
    // 提交月结账
    btnok() {
      const resData = {
        二级部门Id: this.$store.getters.id_二级部门,
        二级部门名称: this.$store.getters.二级部门名称,
        结账人: this.$store.getters.姓名,
        账期: this.bill
      }
       monthlyclosingsubmit(resData).then(res => {
        if (res.code === 100) {
          this.$notify({
            title: '成功',
            message: '提交成功',
            type: 'success'
          })
          this.get_monthlysettlementdata()
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
