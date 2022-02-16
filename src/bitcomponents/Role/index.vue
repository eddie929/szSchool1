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
import { get_userrole } from '@/api/userhandle'
export default {
  data() {
    return {
      options: [],
      value: ''
    }
  },
  beforeMount() {
    this.get_userrole()
  },
  methods: {
    get_userrole() {
      get_userrole().then((res) => {
        this.options = res.data
      })
    },
    change(val) {
    //   console.log(val);
      this.$emit('setUsers', val)
    }
  }
}
</script>

<style>
</style>
