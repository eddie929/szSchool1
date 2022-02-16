<template>
  <el-select
    v-model="value"
    clearable
    placeholder="请选择"
    value-key="id"
    @change="change"
  >
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item"
    />
  </el-select>
</template>

<script>
import { get_accountingperiod } from '@/api/repoartmanegement'
export default {
  data() {
    return {
      options: [],
      value: ''
    }
  },
  beforeMount() {
    this.get_accountingperiod()
  },
  methods: {
    get_accountingperiod() {
      get_accountingperiod({
        departmentwo: this.$store.getters.id_二级部门
      }).then(res => {
        this.options = res.data
        this.value = this.options[0]
        this.$emit('setzq', this.options[0])
      })
    },
    change(val) {
      this.$emit('setzq', val)
    }
  }
}
</script>

<style></style>
