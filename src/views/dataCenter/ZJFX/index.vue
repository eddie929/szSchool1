<template>
  <div style="margin:1%;">
    <el-card class="box-card">
      <el-form
        ref="form"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        style="height:40px;"
      >
        <el-form-item label="起始账期">
          <el-select
            v-model="formInline.起始账期"
            clearable
            placeholder="请选择"
            style="width:150px;"
          >
            <el-option
              v-for="item in zqOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="截至账期">
          <el-select
            v-model="formInline.截至账期"
            clearable
            placeholder="请选择"
            style="width:150px;"
          >
            <el-option
              v-for="item in zqOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <template>
            <el-radio
              v-model="formInline.radioVale"
              label="金额"
            >金额</el-radio>
            <el-radio
              v-model="formInline.radioVale"
              label="数量"
            >数量</el-radio>
          </template>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-tabs type="border-card" style="margin-top:10px;">
      <el-tab-pane label="增加">
        <addData ref="addData" />
      </el-tab-pane>
      <el-tab-pane label="减少">
        <reduceData ref="reduceData" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import addData from './components/addData.vue'
import reduceData from './components/reduceData.vue'
import { get_accountingperiod } from '@/api/repoartmanegement'
export default {
  components: { addData, reduceData },
  data() {
    return {
      formInline: {
        起始账期: '',
        截至账期: '',
        radioVale: '金额'
      },
      zqOptions: []
    }
  },
  mounted() {
    this.get_accountingperiod()
  },
  methods: {
    // 加载账期
    get_accountingperiod() {
      get_accountingperiod({
        departmentwo: this.$store.getters.id_二级部门
      }).then(res => {
        this.zqOptions = res.data
      })
    },
    // 查询
    onSubmit() {}
  }
}
</script>

<style lang="scss" scoped></style>
