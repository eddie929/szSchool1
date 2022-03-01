<template>
  <div style="margin: 1%">
    <!-- <el-button type="primary" @click="Addbegin" class="el-icon-plus">
      发起处置</el-button
    > -->
    <el-button type="text" class="el-icon-suitcase" @click="openAdd">
      待处置库</el-button>
    <div style="float: right; margin-right: 10px">
      <el-form ref="ruleForm" :label-position="labelPosition" :inline="true">
        <el-form-item
          label="流程状态"
          :label-width="formLabelWidth"
          style="margin-left: 10px"
          prop="remark"
        >
          <el-select
            v-model="state"
            placeholder="请选择"
            size="small"
            @change="stateChange"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="处置方式"
          :label-width="formLabelWidth"
          style="margin-left: 10px"
          prop="remark"
        >
          <el-select
            v-model="dtype"
            placeholder="请选择"
            size="small"
            @change="typeChange"
          >
            <el-option
              v-for="item in optionss"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="table"
      v-loading="loading"
      :data="tableData"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
      style="width: 100%; margin-top: 1%"
    >
      <el-table-column v-if="false" prop="id_用户" label="id" />
      <el-table-column
        label="流程状态"
        prop="流程状态"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="单据编号"
        prop="单据编号"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="数量合计"
        prop="数量合计"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="原值合计"
        prop="原值合计"
        align="right"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.原值合计.toFixed(2) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="处置方式"
        prop="处置方式"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="申报单位"
        prop="申报单位"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="申请人"
        prop="申请人名称"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="申报日期"
        prop="申报日期"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="原因说明"
        prop="原因说明"
        :show-overflow-tooltip="true"
      />
      <el-table-column fixed="right" width="120" label="">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="mini" @click="handle(scope.row)"
            >处理</el-button
          > -->
          <el-button
            v-if="handleHide(scope.row)"
            type="text"
            size="mini"
            @click="handle(scope.row)"
          >处理</el-button>
          <el-button
            v-if="handleLook(scope.row)"
            type="text"
            size="mini"
            @click="look(scope.row)"
          >查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin: 10px 0px 0px 10px">
      <el-col :span="24">
        <el-pagination
          background
          :current-page="pageinfo.pageNum"
          :page-sizes="pageinfo.pagesizes"
          :page-size="pageinfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageinfo.count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
    <AddAssetDisposal ref="AddAssetDisposal" @onload="onload" />
    <AssteCard ref="AssteCard" />
    <Handle ref="Handle" @onload="onload" />
    <HandleC ref="HandleC" @onload="onload" />
    <AddDis ref="AddDis" />
    <MoreAdd ref="MoreAdd" @onload="onload" />
    <AddFlow ref="AddFlow" />
    <Handled ref="Handled" @onload="onload" />
    <HandledDC ref="HandledDC" @onload="onload" />
    <More ref="More" @onloads="onload" />
    <Look ref="Look" @onload="onload" />
    <Looks ref="Looks" @onload="onload" />
  </div>
</template>

<script>
import AddAssetDisposal from './components/addAssetDisposal'
import AssteCard from '@/bitcomponents/AssteCard'
import {
  get_assetretirementdata,
  get_assetretirementdatadetail,
  assetallocation_lhandles
} from '@/api/assetretirementhandle'
import Handle from './components/Handle.vue'
import HandleC from './components/HandleC.vue'
import AddDis from './components/addDis.vue'
import MoreAdd from './components/moreAdd.vue'
import AddFlow from './componentss/addFlow.vue'
import Handled from './componentss/Handle.vue'
import HandledDC from './componentss/HandleDC.vue'
import Look from './components/Look.vue'
import More from './componentss/More.vue'
import Looks from './componentss/Looks.vue'
import { get_querytime } from '@/api/depreciationhandle'

export default {
  components: {
    AddAssetDisposal,
    AssteCard,
    Handle,
    HandleC,
    AddDis,
    MoreAdd,
    AddFlow,
    Handled,
    HandledDC,
    More,
    Look,
    Looks
  },
  data() {
    return {
      school: this.$store.getters.id_二级部门,
      roleName: this.$store.getters.角色名称,
      tableData: [],
      loading: false,
      formLabelWidth: '100px',
      labelPosition: 'left',
      state: '全部',
      options: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '待审核',
          label: '待审核'
        },
        {
          value: '已通过',
          label: '已通过'
        },
        {
          value: '未通过',
          label: '未通过'
        }
      ],
      // 处置方式
      optionss: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '报废',
          label: '报废'
        },
        {
          value: '调拨',
          label: '调拨'
        },
        {
          value: '报损',
          label: '报损'
        },
        {
          value: '出售',
          label: '出售'
        }
      ],
      dtype: '全部', // 处置方式value
      pageinfo: {
        pageNum: 1, // 第几页
        pageSize: 10, // 一页多少条
        count: 0, // 数据总数
        pagesizes: [10, 20, 30, 50],
        fk_user: this.$store.getters.id_用户,
        fk_role: this.$store.getters.id_角色,
        flow_state: '全部',
        handleway: '全部'
      } // 搜索条件
    }
  },
  beforeMount() {
    this.onload()
  },
  methods: {
    stateChange(val) {
      this.pageinfo.flow_state = val
      this.pageinfo.handleway = this.dtype
      this.onload()
    },
    typeChange(val) {
      this.pageinfo.handleway = val
      this.pageinfo.flow_state = this.state
      this.onload()
    },
    handleLook(val) {
      if (val.处置方式 === '调拨') {
        if (val.流程状态 == '已记账') {
          return true
        } else if (
          val.流程状态 == '待审核' &&
          val.调出单位 == this.$store.getters.id_二级部门
        ) {
          if (this.roleName === '资产管理员') {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      } else if (val.处置方式 === '报废') {
        if (val.流程状态 == '已记账') {
          return true
        } else if (val.流程状态 == '待审核' && this.roleName == '资产管理员') {
          return true
        } else {
          return false
        }
      }
    },
    handleHide(val) {
      if (val.处置方式 === '调拨') {
        if (
          val.流程状态 == '待审核' &&
          val.调出单位 == this.$store.getters.id_二级部门
        ) {
          if (this.roleName === '资产管理员') {
            return false
          } else {
            return true
          }
        } else if (
          val.流程状态 == '待审核' &&
          val.调入单位 == this.$store.getters.id_二级部门
        ) {
          return true
        } else if (val.流程状态 == '已记账') {
          return false
        } else if (val.流程状态 == '已退回') {
          return true
        } else if (val.流程状态 == '待审核' && this.roleName == '主管领导') {
          return true
        }
      } else if (val.处置方式 === '报废') {
        if (val.流程状态 == '待审核' && this.roleName != '资产管理员') {
          return true
        } else if (val.流程状态 == '已记账') {
          return false
        } else if (val.流程状态 == '已退回') {
          return true
        }
      }
    },
    // 发起处置
    Addbegin() {
      // console.log("打开发起处置");
      this.$refs.AddBgein.activeName = 'first'
      this.$refs.AddBgein.form.流程状态 = '待审核'
      this.$refs.AddBgein.form.申报单位 = this.$store.getters.二级部门名称
      this.$refs.AddBgein.form.申请人名称 = this.$store.getters.姓名
      this.$refs.AddBgein.form.申请人职务 = this.$store.getters.职务
      this.$refs.AddBgein.form.申报日期 = this.dayjs().format('YYYY-MM-DD')
      this.$refs.AddBgein.dialogVisible = true
    },
    // 查看
    look(row) {
      // console.log(row.处置方式);
      if (row.处置方式 == '报废') {
        this.$refs.Look.dialogTitle = '资产处置单(' + row.处置方式 + ')'
        this.$refs.Look.form = row
        this.$refs.Look.onload(row.id)
        // this.$refs.Handle.dialogTitle = "资产处置单(" + row.处置方式 + ")";
        // console.log("---------------------------", row);
        this.$refs.Look.dialogVisible = true
      } else {
        this.$refs.Looks.dialogTitle = '资产处置单(' + row.处置方式 + ')'
        this.$refs.Looks.form = row
        // console.log("---------------------------", row);
        this.$refs.Looks.onload(row.id)
        this.$refs.Looks.confirm = '记账'
        this.$refs.Looks.confirms = '取消'
        this.$refs.Looks.dialogVisible = true
      }
    },
    // 处理
    handle(row) {
      // console.log(row);
      if (row.处置方式 == '报废') {
        if (row.流程代码 == 1) {
          this.$refs.Handle.form = row
          this.$refs.Handle.form.分管领导名称 = this.$store.getters.姓名
          this.$refs.Handle.form.分管处理时间 = this.dayjs().format(
            'YYYY-MM-DD'
          )
          this.$refs.Handle.onload(row.id)
          this.$refs.Handle.dialogVisible = true
          this.$refs.Handle.dialogTitle = '资产处置单(' + row.处置方式 + ')'
        } else if (row.流程代码 == 2) {
          this.$refs.Handle.form = row
          this.$refs.Handle.form.主管领导名称 = this.$store.getters.姓名
          this.$refs.Handle.form.主管领导处理时间 = this.dayjs().format(
            'YYYY-MM-DD'
          )
          this.$refs.Handle.onload(row.id)
          this.$refs.Handle.dialogVisible = true
          this.$refs.Handle.dialogTitle = '资产处置单(' + row.处置方式 + ')'
        } else if (row.流程代码 == 3) {
          // this.$refs.Handle.form = row;
          this.$refs.HandleC.dialogTitle = '资产处置单(' + row.处置方式 + ')'
          this.$refs.HandleC.form = row
          this.$refs.HandleC.form.handletime =
            new Date().getFullYear() +
            '-' +
            (new Date().getMonth() + 1) +
            '-' +
            new Date().getDate()
          this.$refs.HandleC.form.财务人员名称 = this.$store.getters.姓名
          this.$refs.HandleC.onload(row.id)
          // this.$refs.Handle.dialogTitle = "资产处置单(" + row.处置方式 + ")";

          this.$refs.HandleC.dialogVisible = true
        } else if (row.流程代码 == -1) {
          // console.log("已退回");
          this.$refs.MoreAdd.dialogTitle = '资产处置单'
          this.$refs.MoreAdd.activeName = 'first'
          // this.$refs.MoreAdd.form.流程状态 = "待审核";
          this.$refs.MoreAdd.form.申报单位 = this.$store.getters.二级部门名称
          this.$refs.MoreAdd.form.申请人名称 = this.$store.getters.姓名
          this.$refs.MoreAdd.form.申请人职务 = this.$store.getters.职务
          this.$refs.MoreAdd.form.申报文号 = row.申报文号
          this.$refs.MoreAdd.form.原因说明 = row.原因说明
          this.$refs.MoreAdd.form.电话 = row.电话
          this.$refs.MoreAdd.form.处置方式 = row.处置方式
          this.$refs.MoreAdd.form.申报日期 = this.dayjs().format('YYYY-MM-DD')
          this.$refs.MoreAdd.form = row
          get_assetretirementdatadetail({ id: row.id }).then(res => {
            for (var i in res.data) {
              res.data[i].处置方式 = '待' + row.处置方式
            }
            this.$refs.MoreAdd.tableData = res.data
          })
          this.$refs.MoreAdd.dialogVisible = true
          this.$refs.MoreAdd.get_flowDocumentNo()
          this.$refs.MoreAdd.onload()
        }
      } else if (row.处置方式 == '调拨') {
        // this.$refs.Handled.form.调出单位分管领导意见 = "";
        this.$refs.Handled.form = {}
        this.$refs.Handled.form = row
        this.$refs.Handled.dialogTitle = '资产处置单(' + row.处置方式 + ')'
        this.$refs.Handled.onload(row.id)
        if (row.流程代码 == 1) {
          this.$refs.Handled.form.调出单位分管领导名称 = this.$store.getters.姓名
          this.$refs.Handled.form.调出单位分管领导处理时间 = this.dayjs().format(
            'YYYY-MM-DD'
          )
          this.$refs.Handled.form.调出单位分管领导Id = this.$store.getters.id_用户
          this.$refs.Handled.dialogVisible = true
        } else if (row.流程代码 == 2) {
          this.$refs.Handled.form.调入单位资产管理员名称 = this.$store.getters.姓名
          this.$refs.Handled.form.调入单位资产管理员处理时间 = this.dayjs().format(
            'YYYY-MM-DD'
          )
          this.$refs.Handled.dialogVisible = true
        } else if (row.流程代码 == 3) {
          this.$refs.Handled.form.调入单位分管领导名称 = this.$store.getters.姓名
          this.$refs.Handled.form.调入单位分管领导意见 = ''
          this.$refs.Handled.form.调入单位分管领导处理时间 = this.dayjs().format(
            'YYYY-MM-DD'
          )
          this.$refs.Handled.dialogVisible = true
        } else if (row.流程代码 == 4) {
          this.$refs.Handled.form.主管领导名称 = this.$store.getters.姓名
          this.$refs.Handled.form.主管领导意见 = ''
          this.$refs.Handled.form.主管领导处理时间 = this.dayjs().format(
            'YYYY-MM-DD'
          )
          this.$refs.Handled.dialogVisible = true
        } else if (row.流程代码 == 5) {
          this.$refs.HandledDC.dialogTitle = '资产处置单(' + row.处置方式 + ')'
          this.$refs.HandledDC.form = row
          this.$refs.HandledDC.form.调出单位确认人名称 = this.$store.getters.姓名
          this.$refs.HandledDC.form.调出单位确认时间 = this.dayjs().format(
            'YYYY-MM-DD'
          )
          this.$refs.HandledDC.onload(row.id)
          this.$refs.HandledDC.confirm = '记 账'
          this.$refs.HandledDC.confirms = '取 消'
          this.$refs.HandledDC.dialogVisible = true
        } else if (row.流程代码 == 6) {
          this.$refs.HandledDC.dialogTitle = '资产处置单(' + row.处置方式 + ')'
          this.$refs.HandledDC.form = row
          this.$refs.HandledDC.form.调入单位确认人名称 = this.$store.getters.姓名
          this.$refs.HandledDC.form.调入单位确认时间 = this.dayjs().format(
            'YYYY-MM-DD'
          )
          this.$refs.HandledDC.onload(row.id)
          this.$refs.HandledDC.confirm = '确认入库'
          this.$refs.HandledDC.confirms = '未入库'
          this.$refs.HandledDC.dialogVisible = true
        } else if (row.流程代码 == 7) {
          this.$refs.HandledDC.dialogTitle = '资产处置单(' + row.处置方式 + ')'
          this.$refs.HandledDC.form = row
          this.$refs.HandledDC.form.调出单位财务记账人员名称 = this.$store.getters.姓名
          this.$refs.HandledDC.form.调出单位财务处理时间 = this.dayjs().format(
            'YYYY-MM-DD'
          )
          this.$refs.HandledDC.onload(row.id)
          this.$refs.HandledDC.confirm = '记账'
          this.$refs.HandledDC.confirms = '取消'
          this.$refs.HandledDC.dialogVisible = true
        } else if (row.流程代码 == 8) {
          this.$refs.HandledDC.dialogTitle = '资产处置单(' + row.处置方式 + ')'
          this.$refs.HandledDC.form = row
          this.$refs.HandledDC.form.调入单位财务记账人员名称 = this.$store.getters.姓名
          this.$refs.HandledDC.form.调入单位财务处理时间 = this.dayjs().format(
            'YYYY-MM-DD'
          )
          this.$refs.HandledDC.onload(row.id)
          this.$refs.HandledDC.confirm = '记账'
          this.$refs.HandledDC.confirms = '取消'
          this.$refs.HandledDC.dialogVisible = true
        } else if (row.流程代码 == -1) {
          this.$refs.More.dialogTitle = '资产处置单（已退回）'
          this.$refs.More.activeName = 'first'
          this.$refs.More.form = row
          this.$refs.More.onload(row.id)
          this.$refs.More.get_allschooldepartments()
          this.$refs.More.dialogVisible = true
        }
      }
    },
    openAdd() {
      const data = {
        departmentone: this.$store.getters.id_一级部门,
        departmenttwo: this.$store.getters.id_二级部门
      }
      get_querytime(data).then(res => {
        if (res.data == '是') {
          this.msg('警告', '当前存在未封存账期,不允许发起资产处置!')
          return
        } else {
          this.$router.push({ path: '/pendingDisposal' })
          return
          this.$refs.AddAssetDisposal.dialogTitle = '待处置库'
          this.$refs.AddAssetDisposal.onload()
          this.$refs.AddAssetDisposal.dialogVisible = true
        }
      })
    },
    // 控制每页显示条数
    handleSizeChange(val) {
      this.pageinfo.pageSize = val
      this.onload()
    },
    // 第几页
    handleCurrentChange(val) {
      // console.log(val)
      this.pageinfo.pageNum = val
      this.onload()
    },
    onload() {
      this.loading = true
      this.pageinfo.flow_state = this.state
      this.pageinfo.handleway = this.dtype
      get_assetretirementdata(this.pageinfo).then(res => {
        this.tableData = res.data
        this.pageinfo.count = res.count
        this.loading = false
      })
    }
  }
}
</script>

<style></style>
