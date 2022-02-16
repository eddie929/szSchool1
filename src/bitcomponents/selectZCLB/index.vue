// 查询资产类别

<template>
  <el-cascader
    ref="selectZCLB"
    v-model="value"
    :style="style"
    :options="options"
    :props="defaultProps"
    clearable
    @change="change"
  />
</template>

<script>
import { get_categoryalldata } from '@/api/categoryhandle'

export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: '分类名称',
        value: 'id',
        checkStrictly: true
      },
      value: [],
      options: [],
      style: 'width:350px;'
    }
  },
  beforeMount: function() {
    this.get_categoryalldata()
  },
  methods: {
    // 查询全部部门方法
    get_categoryalldata() {
      // 调用查询全部部门api
      get_categoryalldata().then(res => {
        if (res.code === 100) {
          this.options = res.data
        } else if (res.code === 101) {
          this.get_box(res.code, res.msg)
          return
        } else if (res.code === 102) {
          this.get_box(res.code, res.msg)
          return
        } else if (res.code === -1) {
          this.get_box(res.code, res.msg)
          return
        }
      })
    },
    // 改变选择事件 获取选择内容
    change(val) {
      var categorys = {}
      // 三元运算判断用户选择  没选则为0
      categorys.categoryone = val[0] !== undefined ? val[0] : 0
      categorys.categorytwo = val[1] !== undefined ? val[1] : 0
      categorys.categorythree = val[2] !== undefined ? val[2] : 0
      categorys.categoryfour = val[3] !== undefined ? val[3] : 0

      this.$emit('setzclb', categorys)
    },
    clearSelect() {
      this.value = []
    }
  }
}
</script>

<style></style>
