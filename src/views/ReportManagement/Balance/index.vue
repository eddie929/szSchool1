<template>
  <div style="margin: 1%">
    <el-form
      ref="ruleForm"
      :label-position="labelPosition"
      :model="form"
      :inline="true"
    >
      <el-form-item label="" :label-width="formLabelWidth" prop="remark">
        <el-radio-group v-model="radio" @change="radiochange">
          <el-radio :label="3">汇总表</el-radio>
          <el-radio :label="6">明细表</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-button
        style="float: right;margin-left:10px"
        type="warning"
        @click="print"
      >
        打印
      </el-button>
      <el-button style="float: right;" type="warning" @click="handleDownload">
        导出
      </el-button>
      <el-form-item
        v-show="hidenAll"
        label="单位"
        :label-width="formLabelWidth"
        prop="remark"
      >
        <el-select
          v-model="pageinfo.查询范围"
          placeholder="请选择"
          clearable
          @change="fenleichange"
        >
          <el-option
            v-for="item in 查询范围options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            size="medium"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="账期" :label-width="formLabelWidth" prop="remark">
        <el-date-picker
          v-model="pageinfo.time"
          type="month"
          placeholder="选择月"
          value-format="yyyy-MM"
          @change="zqchange"
        />
      </el-form-item>
      <el-form-item v-show="dis" label="统计方式" :label-width="formLabelWidth">
        <el-select v-model="pageinfo.查询方式" placeholder="请选择">
          <el-option
            v-for="item in 查询方式options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-show="dis" label="层级" :label-width="formLabelWidth">
        <el-select v-model="pageinfo.level" placeholder="请选择">
          <el-option
            v-for="item in 层级options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-button size="small" type="primary" @click="submit">查询</el-button>
      <div v-show="!dis">
        <el-form-item
          label="资产分类"
          :label-width="formLabelWidth"
          prop="remark"
        >
          <AssteSort @getAssteSort="getAssteSort" />
        </el-form-item>
        <el-form-item
          label="存放地点"
          :label-width="formLabelWidth"
          prop="remark"
        >
          <el-cascader
            ref="cunfang"
            v-model="pageinfo.storagetwo"
            style="width: 100%"
            :options="存放地点options"
            :props="存放defaultProps"
            filterable
            :show-all-levels="true"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="归属部门"
          :label-width="formLabelWidth"
          prop="remark"
        >
          <el-cascader
            ref="AssetClasses"
            v-model="pageinfo.归属value"
            style="width: 100%"
            :options="归属options"
            :props="归属defaultProps"
            filterable
            :show-all-levels="false"
            :disabled="hidenOne"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-tooltip
            class="item"
            effect="dark"
            content="模糊查询字段包括:资产编号\资产名称\规格\型号\资产品牌\责任人\使用人"
            placement="top"
          >
            <el-input
              v-model="pageinfo.keycontent"
              placeholder="请输入要搜索的关键字"
              clearable
            />
          </el-tooltip>
        </el-form-item>
      </div>
    </el-form>
    <div v-show="dis">
      <el-table
        id="print"
        ref="tableDataTree"
        v-loading="loading"
        :data="tableData"
        show-summary
        max-height="900"
        row-key="id"
        border
        default-expand-all
        :header-cell-style="{
          'text-align': 'center',
          background: '#eef1f6'
        }"
        :tree-props="{ children: 'children', hasChildren: 'haschildren' }"
        :expand-on-click-node="false"
        :span-method="objectSpanMethod"
      >
        <el-table-column v-if="assets" type="" prop="" label="资产分类">
          <el-table-column type="" prop="一级分类名称" label="一级分类名称" />
          <el-table-column
            v-if="levleShowTwo"
            prop="二级分类名称"
            label="二级分类名称"
            type=""
          />
          <el-table-column
            v-if="levleShowThree"
            prop="三级分类名称"
            label="三级分类名称"
            type=""
          />
        </el-table-column>

        <el-table-column type="" prop="数量" label="数量(个)">
          <template slot-scope="{ row }">
            <div style="text-align: center">{{ row.数量 }}</div>
          </template>
        </el-table-column>
        <el-table-column type="" prop="原值" label="原值">
          <template slot-scope="{ row }">
            <div style="text-align: right">
              {{ parseFloat(row.原值).toFixed(2) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column type="" prop="本期折旧" label="本期折旧">
          <template slot-scope="{ row }">
            <div style="text-align: right">
              {{ parseFloat(row.本期折旧).toFixed(2) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column type="" prop="累计折旧" label="累计折旧">
          <template slot-scope="{ row }">
            <div style="text-align: right">
              {{ parseFloat(row.累计折旧).toFixed(2) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column type="" prop="净值" label="净值">
          <template slot-scope="{ row }">
            <div style="text-align: right">
              {{ parseFloat(row.净值).toFixed(2) }}
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- <el-table
        ref="DataTable"
        v-loading="loading"
        :data="tableData"
        border
        stripe
        :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
        style="width: 100%; margin-top: 1%"
        row-key="id"
      >
        <el-table-column
          label="序号"
          type="index"
          width="50"
          :reserve-selection="true"
        ></el-table-column>
        <el-table-column label="资产分类" prop="资产分类" />
        <el-table-column label="数量(个)" prop="数量" />
        <el-table-column label="原值" prop="原值" align="right" />
        <el-table-column label="累计折旧" prop="累计折旧" align="right" />
        <el-table-column label="净值" prop="净值" align="right" />
      </el-table> -->
    </div>
    <div v-show="!dis">
      <el-table
        id="prints"
        ref="table"
        v-loading="loading"
        :data="tableDatas"
        border
        stripe
        :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
        style="width: 100%; margin-top: 1%"
      >
        <el-table-column
          label="序号"
          type="index"
          width="50"
          :reserve-selection="true"
        />

        <el-table-column v-if="false" prop="资产Id" label="资产Id" />
        <el-table-column
          prop="资产编号"
          label="资产编号"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="资产名称"
          label="资产名称"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="所属分类"
          label="资产分类"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.一级分类名称 }}/{{ scope.row.二级分类名称 }}/{{
              scope.row.三级分类名称
            }}/{{ scope.row.四级分类名称 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="规格"
          label="规格"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="型号"
          label="型号"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="购置日期"
          label="取得日期"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="所属部门"
          label="归属部门"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="负责人"
          label="负责人"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="存放地点"
          label="存放地点"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="使用方向"
          label="使用方向"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="本期折旧"
          label="本期折旧"
          :show-overflow-tooltip="true"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.本期折旧.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="累计折旧"
          label="累计折旧"
          :show-overflow-tooltip="true"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.累计折旧.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="数量"
          label="数量(个)"
          :show-overflow-tooltip="true"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.数量.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="原值"
          label="原值"
          :show-overflow-tooltip="true"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.原值.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="净值"
          label="净值"
          :show-overflow-tooltip="true"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.净值.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="折旧年限"
          label="折旧年限"
          :show-overflow-tooltip="true"
        />

        <!-- <el-table-column
          prop="资产编号"
          label="资产编号"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="所属分类"
          label="资产分类"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              >{{ scope.row.一级分类名称 }}/{{ scope.row.二级分类名称 }}/{{
                scope.row.三级分类名称
              }}/{{ scope.row.四级分类名称 }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="资产名称"
          label="资产名称"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="规格" label="规格" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="型号" label="型号" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="使用方向" label="使用方向"> </el-table-column>
        <el-table-column
          prop="数量"
          label="数量(个)"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="原值"
          label="原值"
          :show-overflow-tooltip="true"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.原值.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="净值"
          label="净值"
          :show-overflow-tooltip="true"
          align="right"
        >
          <template slot-scope="scope">
            {{ scope.row.净值.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="存放地点"
          label="存放地点"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="所属部门"
          label="归属部门"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="负责人" label="负责人"> </el-table-column>
        <el-table-column prop="使用人" label="使用人"> </el-table-column>
        <el-table-column
          prop="购置日期"
          label="取得日期"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="资产状态" label="资产状态"> </el-table-column> -->

        <!-- <el-table-column prop="是否到期" label="是否到期">
          <template slot-scope="scope">
            <span>{{ maturity(scope.row) }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column
          prop="学校名称"
          label="所属单位"
          :show-overflow-tooltip="true"
        >
        </el-table-column> -->
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
    </div>
  </div>
</template>

<script>
import AssteSort from '@/bitcomponents/assteSort/index'
import {
  get_allschooldepartments,
  get_storagelocation,
  get_alldepartmentpeople
} from '@/api/assetaccounthandle'
import {
  get_cacheanalydata,
  get_cacheanalydatadetail,
  get_categoryall,
  get_departmentall,
  get_allstoragelocation
} from '@/api/repoartmanegement'

export default {
  components: { AssteSort },
  data() {
    return {
      assets: true,
      department: false,
      place: false,
      levleShowTwo: false,
      levleShowThree: false,
      tableDataa: [],
      radio: 3,
      form: {},
      查询方式options: [
        {
          value: '资产分类',
          label: '资产分类'
        },
        {
          value: '归属部门',
          label: '归属部门'
        },
        {
          value: '存放地点',
          label: '存放地点'
        },
        {
          value: '使用方向',
          label: '使用方向'
        }
      ],
      层级options: [
        {
          value: '一级',
          label: '一级'
        },
        {
          value: '二级',
          label: '二级'
        },
        {
          value: '三级',
          label: '三级'
        }
      ],
      labelPosition: 'right',
      formLabelWidth: '80px',
      hidenAll: false,
      归属options: [],
      归属defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id',
        checkStrictly: 'true'
      },
      查询范围options: [],
      pageinfo: {
        pageNum: 1, // 第几页
        pageSize: 10, // 一页多少条
        count: 0, // 数据总数
        pagesizes: [10, 20, 30, 50],
        departmentone2: this.$store.getters.id_一级部门,
        查询方式: '资产分类',
        level: '一级',
        time: '2021-11'
      }, // 搜索条件
      loading: false,
      dis: true,
      tableData: [], // 汇总表
      tableDatas: [], // 明细表
      存放地点options: [], // 存放地点
      hidenOne: false,
      存放defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      spanArr: [], // 二维数组，用于存放单元格合并规则
      position: 0,
      合并一级: false,
      合并二级: false,
      合并三级: false,
      switchTable: ''
    }
  },
  beforeMount() {
    this.get_allschooldepartments()
    this.get_alldepartmentpeople()
    this.get_storagelocation()
  },

  methods: {
    // 打印
    print() {
      if (this.switchTable === '') {
        this.$notify.warning('请先查询所需打印的信息!')
        return
      }
      if (this.switchTable === '汇总表') {
        if (this.tableData.length === 0) {
          this.$notify.warning('请先查询所需打印的信息!')
          return
        }
        // 获取打印的页面内容
        var print = document.getElementById('print')
        var newContent = print.innerHTML
        var oldContent = document.body.innerHTML
        document.body.innerHTML = newContent
        document.getElementsByTagName('body')[0].style.zoom = 0.78
        window.print()
        window.location.reload()
        // 将原有页面还原到页面
        document.body.innerHTML = oldContent
        return false
      } else if (this.switchTable === '明细表') {
        if (this.tableDatas.length === 0) {
          this.$notify.warning('请先查询所需打印的信息!')
          return
        }
        // 获取打印的页面内容
        var print = document.getElementById('prints')
        var newContent = print.innerHTML
        var oldContent = document.body.innerHTML
        document.body.innerHTML = newContent
        document.getElementsByTagName('body')[0].style.zoom = 0.78
        window.print()
        window.location.reload()
        // 将原有页面还原到页面
        document.body.innerHTML = oldContent
        return false
      }
    },
    // 导出
    handleDownload() {
      if (this.switchTable === '') {
        this.$notify.warning('请先查询所需导出的信息!')
        return
      }
      if (this.switchTable === '汇总表') {
        if (this.tableData.length === 0) {
          this.$notify.warning('请先查询所需导出的信息!')
          return
        }
        if (
          this.tableData[0].一级分类名称 != undefined &&
          this.tableData[0].二级分类名称 == undefined
        ) {
          import('@/vendor/Export2Excel').then(excel => {
            // excel头
            const tHeader = [
              '一级分类名称',
              '数量(个)',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            // excel数据
            const filterVal = [
              '一级分类名称',
              '数量',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            const data = this.formatJson(filterVal, this.tableData)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              //   filename: Date.parse(new Date()), //导出文件名时间戳作为文件名
              filename: '表格信息',
              autoWidth: this.autoWidth,
              bookType: this.bookType
            })
          })
        } else if (
          this.tableData[0].二级分类名称 != undefined &&
          this.tableData[0].三级分类名称 == undefined
        ) {
          import('@/vendor/Export2Excel').then(excel => {
            // excel头
            const tHeader = [
              '一级分类名称',
              '二级分类名称',
              '数量(个)',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            // excel数据
            const filterVal = [
              '一级分类名称',
              '二级分类名称',
              '数量',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            const data = this.formatJson(filterVal, this.tableData)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              //   filename: Date.parse(new Date()), //导出文件名时间戳作为文件名
              filename: '表格信息',
              autoWidth: this.autoWidth,
              bookType: this.bookType
            })
          })
        } else if (this.tableData[0].三级分类名称 != undefined) {
          import('@/vendor/Export2Excel').then(excel => {
            // excel头
            const tHeader = [
              '一级分类名称',
              '二级分类名称',
              '三级分类名称',
              '数量(个)',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            // excel数据
            const filterVal = [
              '一级分类名称',
              '二级分类名称',
              '三级分类名称',
              '数量',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            const data = this.formatJson(filterVal, this.tableData)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              //   filename: Date.parse(new Date()), //导出文件名时间戳作为文件名
              filename: '表格信息',
              autoWidth: this.autoWidth,
              bookType: this.bookType
            })
          })
        } else if (
          this.tableData[0].一级部门名称 != undefined &&
          this.tableData[0].二级部门名称 == undefined
        ) {
          import('@/vendor/Export2Excel').then(excel => {
            // excel头
            const tHeader = [
              '学校名称',
              '数量(个)',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            // excel数据
            const filterVal = [
              '一级部门名称',
              '数量',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            const data = this.formatJson(filterVal, this.tableData)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              //   filename: Date.parse(new Date()), //导出文件名时间戳作为文件名
              filename: '表格信息',
              autoWidth: this.autoWidth,
              bookType: this.bookType
            })
          })
        } else if (
          this.tableData[0].二级部门名称 != undefined &&
          this.tableData[0].三级部门名称 == undefined
        ) {
          import('@/vendor/Export2Excel').then(excel => {
            // excel头
            const tHeader = [
              '学校名称',
              '部门名称',
              '数量(个)',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            // excel数据
            const filterVal = [
              '一级部门名称',
              '二级部门名称',
              '数量',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            const data = this.formatJson(filterVal, this.tableData)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              //   filename: Date.parse(new Date()), //导出文件名时间戳作为文件名
              filename: '表格信息',
              autoWidth: this.autoWidth,
              bookType: this.bookType
            })
          })
        } else if (this.tableData[0].三级部门名称 != undefined) {
          import('@/vendor/Export2Excel').then(excel => {
            // excel头
            const tHeader = [
              '学校名称',
              '部门名称',
              '人员名称',
              '数量(个)',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            // excel数据
            const filterVal = [
              '一级部门名称',
              '二级部门名称',
              '三级部门名称',
              '数量',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            const data = this.formatJson(filterVal, this.tableData)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              //   filename: Date.parse(new Date()), //导出文件名时间戳作为文件名
              filename: '表格信息',
              autoWidth: this.autoWidth,
              bookType: this.bookType
            })
          })
        } else if (
          this.tableData[0].一级存放地点名称 != undefined &&
          this.tableData[0].二级存放地点名称 == undefined
        ) {
          import('@/vendor/Export2Excel').then(excel => {
            // excel头
            const tHeader = [
              '学校名称',
              '建筑物名称',
              '房间名称',
              '数量(个)',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            // excel数据
            const filterVal = [
              '一级存放地点名称',
              '二级存放地点名称',
              '三级存放地点名称',
              '数量',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            const data = this.formatJson(filterVal, this.tableData)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              //   filename: Date.parse(new Date()), //导出文件名时间戳作为文件名
              filename: '表格信息',
              autoWidth: this.autoWidth,
              bookType: this.bookType
            })
          })
        } else if (
          this.tableData[0].二级存放地点名称 != undefined &&
          this.tableData[0].三级存放地点名称 == undefined
        ) {
          import('@/vendor/Export2Excel').then(excel => {
            // excel头
            const tHeader = [
              '一级分类名称',
              '二级分类名称',
              '三级分类名称',
              '数量(个)',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            // excel数据
            const filterVal = [
              '一级分类名称',
              '二级分类名称',
              '三级分类名称',
              '数量',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            const data = this.formatJson(filterVal, this.tableData)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              //   filename: Date.parse(new Date()), //导出文件名时间戳作为文件名
              filename: '表格信息',
              autoWidth: this.autoWidth,
              bookType: this.bookType
            })
          })
        } else if (this.tableData[0].三级存放地点名称 != undefined) {
          import('@/vendor/Export2Excel').then(excel => {
            // excel头
            const tHeader = [
              '一级分类名称',
              '二级分类名称',
              '三级分类名称',
              '数量(个)',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            // excel数据
            const filterVal = [
              '一级分类名称',
              '二级分类名称',
              '三级分类名称',
              '数量',
              '原值',
              '本期折旧',
              '累计折旧',
              '净值'
            ]
            const data = this.formatJson(filterVal, this.tableData)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              //   filename: Date.parse(new Date()), //导出文件名时间戳作为文件名
              filename: '表格信息',
              autoWidth: this.autoWidth,
              bookType: this.bookType
            })
          })
        }
      } else if (this.switchTable === '明细表') {
        if (this.tableDatas.length === 0) {
          this.$notify.warning('请先查询所需导出的信息!')
          return
        }
        import('@/vendor/Export2Excel').then(excel => {
          // excel头
          const tHeader = [
            '资产编号',
            '资产名称',
            '一级分类名称',
            '二级分类名称',
            '三级分类名称',
            '四级分类名称',
            '规格',
            '型号',
            '取得日期',
            '归属部门',
            '负责人',
            '存放地点',
            '本期折旧',
            '累计折旧',
            '数量(个)',
            '原值',
            '净值',
            '折旧年限'
          ]
          // const tHeader = [
          //   "资产编号",
          //   "一级分类名称",
          //   "二级分类名称",
          //   "三级分类名称",
          //   "四级分类名称",
          //   "资产名称",
          //   "规格",
          //   "型号",
          //   "使用方向",
          //   "原值",
          //   "净值",
          //   "存放地点",
          //   "归属部门",
          //   "负责人",
          //   "使用人",
          //   "取得日期",
          //   "资产状态",
          //   "是否到期"
          // ];
          // excel数据
          const filterVal = [
            '资产编号',
            '资产名称',
            '一级分类名称',
            '二级分类名称',
            '三级分类名称',
            '四级分类名称',
            '规格',
            '型号',
            '购置日期',
            '所属部门',
            '负责人',
            '存放地点',
            '本期折旧',
            '累计折旧',
            '数量',
            '原值',
            '净值',
            '折旧年限'
          ]
          // const filterVal = [
          //   "资产编号",
          //   "一级分类名称",
          //   "二级分类名称",
          //   "三级分类名称",
          //   "四级分类名称",
          //   "资产名称",
          //   "规格",
          //   "型号",
          //   "使用方向",
          //   "原值",
          //   "净值",
          //   "存放地点",
          //   "所属部门",
          //   "负责人",
          //   "使用人",
          //   "购置日期",
          //   "资产状态",
          //   "是否到期"
          // ];
          const data = this.formatJson(filterVal, this.tableDatas)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            //   filename: Date.parse(new Date()), //导出文件名时间戳作为文件名
            filename: '表格信息',
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    // 处理合并单元格数据
    rowspan(idx, prop) {
      this.spanArr[idx] = []
      this.position = 0
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          this.spanArr[idx].push(1)
          this.position = 0
        } else {
          if (this.tableData[index][prop] === this.tableData[index - 1][prop]) {
            this.spanArr[idx][this.position] += 1 // 有相同项
            this.spanArr[idx].push(0) // 名称相同后往数组里面加一项0
          } else {
            this.spanArr[idx].push(1) // 同列的前后两行单元格不相同
            this.position = index
          }
        }
      })
    },
    // 合并单元格方法
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log("row", row); // 当前行
      // console.log("column", column); // 当前列
      // console.log("rowIndex", rowIndex); // 当前行号
      // console.log("columnIndex", columnIndex); // 当前列号
      // if (columnIndex === 0) {
      //   // 用于设置要合并的列
      //   if (rowIndex % 2 === 0) {
      //     return {
      //       rowspan: 2, // 合并的行数
      //       colspan: 1 // 合并的猎术, 设置为0则直接不显示
      //     };
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     };
      //   }
      // }
      if (this.合并一级 === true) {
        for (let i = 0; i < 1; i++) {
          if (columnIndex === i) {
            const _row = this.spanArr[i][rowIndex]
            const _col = _row > 0 ? 1 : 0
            // console.log('第'+rowIndex+'行','第'+i+'列','rowspan:'+_row,'colspan:'+_col)
            return {
              rowspan: _row,
              colspan: _col
            }
          }
        }
      } else if (this.合并二级 === true) {
        for (let i = 0; i < 2; i++) {
          if (columnIndex === i) {
            const _row = this.spanArr[i][rowIndex]
            const _col = _row > 0 ? 1 : 0
            // console.log('第'+rowIndex+'行','第'+i+'列','rowspan:'+_row,'colspan:'+_col)
            return {
              rowspan: _row,
              colspan: _col
            }
          }
        }
      } else if (this.合并三级 === true) {
        for (let i = 0; i < 3; i++) {
          if (columnIndex === i) {
            const _row = this.spanArr[i][rowIndex]
            const _col = _row > 0 ? 1 : 0
            // console.log('第'+rowIndex+'行','第'+i+'列','rowspan:'+_row,'colspan:'+_col)
            return {
              rowspan: _row,
              colspan: _col
            }
          }
        }
      }
    },
    // // 存放地点options
    // get_storagelocation() {
    //   console.log("pageinfo.查询范围",pageinfo.查询范围);
    //   var data = {
    //     departmentwo: this.form.查询范围,
    //   };
    //   console.log("查询范围",data);
    //   get_storagelocation(data).then((res) => {
    //     // console.log(res);
    //     this.存放地点options = res.data;
    //   });
    // },
    // 归属部门
    get_alldepartmentpeople() {
      get_alldepartmentpeople({
        departmentwo: this.$store.getters.id_二级部门
      }).then(res => {
        this.归属options = res.data
      })
    },
    // 资产分类
    getAssteSort(val) {
      this.pageinfo.categoryone = val.categoryone
      this.pageinfo.categorytwo = val.categorytwo
      this.pageinfo.categorythree = val.categorythree
      this.pageinfo.categoryfour = val.categoryfour
    },
    // 查询
    submit() {
      this.pageinfo.departmentone = this.$store.getters.id_一级部门
      this.pageinfo.departmenttwo = this.pageinfo.查询范围
      if (this.radio == 3) {
        this.onload()
        this.switchTable = '汇总表'
      } else {
        this.onloads()
        this.switchTable = '明细表'
      }
    },
    onload() {
      this.loading = true
      if (this.pageinfo.level == '二级') {
        this.levleShowTwo = true
        this.levleShowThree = false
        this.合并一级 = false
        this.合并二级 = true
        this.合并三级 = false
      } else if (this.pageinfo.level == '三级') {
        this.levleShowTwo = true
        this.levleShowThree = true
        this.合并一级 = false
        this.合并二级 = false
        this.合并三级 = true
      } else {
        this.levleShowTwo = false
        this.levleShowThree = false
        this.合并一级 = true
        this.合并二级 = false
        this.合并三级 = false
      }
      if (this.pageinfo.查询方式 == '资产分类') {
        get_categoryall(this.pageinfo).then(res => {
          this.assets = true
          this.department = false
          this.place = false
          this.tableData = res.data
          // console.log("data数据", res.data);
          this.pageinfo.count = res.count
          this.loading = false

          this.rowspan(0, '一级分类名称')
          this.rowspan(1, '二级分类名称')
          this.rowspan(2, '三级分类名称')
        })
      } else if (this.pageinfo.查询方式 == '存放地点') {
        var data = {
          departmentone: this.pageinfo.departmentone,
          departmenttwo: this.pageinfo.查询范围,
          level: this.pageinfo.level
        }
        get_allstoragelocation(data).then(res => {
          this.assets = false
          this.department = false
          this.place = true
          this.tableData = res.data
          this.pageinfo.count = res.count
          this.loading = false

          this.rowspan(0, '一级存放地点名称')
          this.rowspan(1, '二级存放地点名称')
          this.rowspan(2, '三级存放地点名称')
        })
      } else {
        var data = {
          departmentone: this.pageinfo.departmentone,
          departmenttwo: this.pageinfo.查询范围,
          level: this.pageinfo.level
        }
        get_departmentall(data).then(res => {
          this.assets = false
          this.department = true
          this.place = false
          this.tableData = res.data
          this.pageinfo.count = res.count
          this.loading = false

          this.rowspan(0, '一级部门名称')
          this.rowspan(1, '二级部门名称')
          this.rowspan(2, '三级部门名称')
        })
      }
    },
    onloads() {
      // console.log("归属:", this.pageinfo.归属value);
      if (
        this.pageinfo.归属value != undefined &&
        this.pageinfo.归属value.length != 0
      ) {
        if (
          this.pageinfo.归属value[0] != null &&
          this.pageinfo.归属value[0] != undefined
        ) {
          this.pageinfo.departmentwo2 = this.pageinfo.归属value[0]
          this.pageinfo.departmenthree = 0
        }
        if (
          this.pageinfo.归属value[1] != null &&
          this.pageinfo.归属value[1] != undefined
        ) {
          this.pageinfo.departmenthree = this.pageinfo.归属value[1]
        }
      } else {
        this.pageinfo.departmentwo2 = 0
        this.pageinfo.departmenthree = 0
      }
      //   if (this.pageinfo.storagetwo == "") {
      //     this.pageinfo.storagetwo = 0;
      //   }
      var data = JSON.parse(JSON.stringify(this.pageinfo))
      // console.log("=======", this.pageinfo.storagetwo);
      if (
        this.pageinfo.storagetwo == undefined ||
        this.pageinfo.storagetwo.length == 0
      ) {
        data.storagetwo = 0
      } else {
        data.storagetwo = this.pageinfo.storagetwo[1]
      }
      this.loading = true
      get_cacheanalydatadetail(data).then(res => {
        this.tableDatas = res.data
        this.pageinfo.count = res.count
        this.loading = false
      })
    },
    // 账期改变
    zqchange(val) {
      // console.log(val);
    },
    // 汇总-明细   切换
    radiochange(val) {
      // console.log(val);
      this.pageinfo.count = 0
      this.tableData = []
      if (val != 3) {
        this.get_storagelocation()
        this.dis = false
      } else {
        this.dis = true
      }
    },
    // 单位改变
    fenleichange(val) {},
    // 单位option
    get_allschooldepartments() {
      get_allschooldepartments({
        departmentone: this.$store.getters.id_一级部门
      }).then(res => {
        this.查询范围options = res.data
        if (this.$store.getters.id_二级部门 == 0) {
          this.pageinfo.查询范围 = ''
          this.hidenAll = true
          this.hidenOne = true
        } else {
          // console.log("ads 幼儿急");

          this.pageinfo.查询范围 = this.$store.getters.id_二级部门
          // console.log("this.pageinfo.查询范围", this.pageinfo.查询范围);
          this.hidenAll = false
          this.hidenOne = false
        }
      })
    },
    // 控制每页显示条数
    handleSizeChange(val) {
      this.pageinfo.pageSize = val
      //   this.onload();
      if (this.radio == 3) {
        this.onload()
      } else {
        // console.log("xiang");
        this.get_storagelocation()
        this.onloads()
      }
    },
    // 第几页
    handleCurrentChange(val) {
      // console.log(val)
      this.pageinfo.pageNum = val
      //   this.onload();
      if (this.radio == 3) {
        this.onload()
      } else {
        this.get_storagelocation()
        this.onloads()
      }
    },
    // 存放地点options
    get_storagelocation() {
      var data = {
        departmentwo: this.pageinfo.查询范围
      }
      // console.log("-----------------------data:", this.pageinfo.查询范围);
      get_storagelocation(data).then(res => {
        // console.log(res);
        this.存放地点options = res.data
      })
    },
    // 判断是否到期
    maturity(row) {
      // console.log("是否到期:", row.是否到期);
      if (row.是否到期 == 1) {
        return '否'
      } else {
        return '是'
      }
    }
  }
}
</script>

<style>
@page {
  size: A4 landscape; /*portrait： 纵向打印,  landscape: 横向*/
}
@media print {
  .el-table thead.is-group th {
    text-align: center;
  }
  tbody {
    text-align: center;
    border: 1px solid #000;
  }
  th {
    border: 1px solid #000;
  }
  td {
    border: 1px solid #000;
  }
}
table,
tbody,
thead {
  width: 100% !important;
}

colgroup {
  position: absolute;
  width: 100% !important;
}
</style>
