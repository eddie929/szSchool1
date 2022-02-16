<template>
  <div>
    <el-tabs type="border-card" style="margin: 1%">
      <el-tab-pane label="存放地视图">
        <cfdd ref="cfdd" />
      </el-tab-pane>
      <el-tab-pane label="部门视图">
        <bm ref="bm" />
      </el-tab-pane>
      <el-tab-pane label="人员视图">
        <cuser ref="cuser" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import cfdd from './components/cfdd.vue'
import bm from './components/bm.vue'
import cuser from './components/cuser.vue'
export default {
  components: { cfdd, bm, cuser },
  data() {
    return {}
  },
  beforeMount() {},
  methods: {}
}
</script>

<style></style>
