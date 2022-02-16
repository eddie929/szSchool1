<template>
  <div style="margin: 1%">
    <el-form ref="ruleForm" :label-position="labelPosition" :model="form">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item
            label="类别"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-select
              v-model="form.category"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in categoryOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="添加方式"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-select
              v-model="form.manner"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in addTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="排列方式"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-select
              v-model="form.arrangement"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in arrangementOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="是否到期"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-select
              v-model="form.maturity"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in maturityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div style="margin-top: 1%">
        <el-button type="primary" plain>添加资产</el-button>
        丨待报废库
        <span style="margin-left: 5%"
          >资产总数:<span style="color: red">0</span></span
        >
        <span style="margin-left: 5%"
          >原值合计:<span style="color: red">0</span></span
        >
        <span style="margin-left: 5%"
          >净值合计:<span style="color: red">0</span></span
        >
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
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column v-if="false" prop="id_用户" label="id" />
        <el-table-column label="资产编号" />
        <el-table-column label="资产分类" />
        <el-table-column label="资产名称" />
        <el-table-column label="规格" />
        <el-table-column label="型号" />
        <el-table-column label="使用方向" />
        <el-table-column label="数量(个)" />
        <el-table-column label="原值" />
        <el-table-column label="净值" />
        <el-table-column label="存放地点" />
        <el-table-column label="归属部门" />
        <el-table-column label="负责人" />
        <el-table-column label="取得日期" />
        <el-table-column label="资产状态" />
        <el-table-column label="移除" />
      </el-table>
    </el-form>    
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogTitle: "",
      dialogVisible: false,
      labelPosition: "left",
      formLabelWidth: "80px",
      form: {},
      tableData: [],
      loading: false,
      //   类别
      categoryOptions: [
        {
          value: "待报废库",
          label: "待报废库",
        },
        {
          value: "待调拨库",
          label: "待调拨库",
        },
        {
          value: "带破损库",
          label: "带破损库",
        },
        {
          value: "待出售库",
          label: "待出售库",
        },
      ],
      //   添加方式
      addTypeOptions: [
        {
          value: "普通添加",
          label: "普通添加",
        },
        {
          value: "盘亏处理",
          label: "盘亏处理",
        },
      ],
      //排列方式
      arrangementOptions: [
        {
          value: "添加时间正序",
          label: "添加时间正序",
        },
        {
          value: "添加时间倒序",
          label: "添加时间倒序",
        },
        {
          value: "购置时间正序",
          label: "购置时间正序",
        },
        {
          value: "购置时间倒序",
          label: "购置时间倒序",
        },
      ],
      //   是否到期
      maturityOptions: [
        {
          value: "全部",
          label: "全部",
        },
        {
          value: "是",
          label: "是",
        },
        {
          value: "否",
          label: "否",
        },
      ],
    };
  },
};
</script>

<style>
</style>