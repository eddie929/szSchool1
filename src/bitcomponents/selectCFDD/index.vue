// 按用户id查询存放地点

<template>
  <el-cascader
    ref="selectCFDD"
    v-model="value"
    :style="style"
    :options="options"
    :props="defaultProps"
    clearable
    @change="change"
  />
</template>

<script>
import { get_balancebilllocation } from '@/api/repoartmanegement'
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id',
        checkStrictly: true
      },
      value: [],
      options: [],
      style: 'width:350px;'
    }
  },
  beforeMount: function() {
    this.get_balancebilllocation()
  },
  methods: {
    // 查询全部部门方法
    get_balancebilllocation() {
      // 调用查询全部部门api
      get_balancebilllocation({ departmentwo: this.$store.getters.id_二级部门 || 0 }).then(res => {
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
      var cfddval = {}
      // 三元运算判断用户选择  没选则为0
      cfddval.storageone = val[0] !== undefined ? val[0] : 0
      cfddval.storagetwo = val[1] !== undefined ? val[1] : 0
      this.$emit('setcfdd', cfddval)
    },
    clearSelect() {
      this.value = []
    }
  }
}
</script>

<style></style>
