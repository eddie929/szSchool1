// 按二级机构id查询部门

<template>
  <el-cascader
    ref="selectBM"
    v-model="value"
    :style="style"
    :options="options"
    :props="defaultProps"
    clearable
    @change="change"
  />
</template>

<script>
import { get_balancebillldepartment } from '@/api/repoartmanegement'

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
    this.get_balancebillldepartment()
  },
  methods: {
    // 查询全部部门方法
    get_balancebillldepartment() {
      // 调用查询全部部门api
      get_balancebillldepartment({ departmentwo: this.$store.getters.id_二级部门 || 0 }).then(res => {
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
      var deoartmentall = {}
      // 三元运算判断用户选择  没选则为0
       // deoartmentall.departmentone = val[0] !== undefined ? val[0] : 0
      deoartmentall.departmenttwo = val[0] !== undefined ? val[0] : 0
      deoartmentall.departmentthree = val[1] !== undefined ? val[1] : 0
      this.$emit('setbm', deoartmentall)
    },
    clearSelect() {
      this.value = []
    }
  }
}
</script>

<style></style>
