<template>
  <div style="margin:1%;">
    <el-tabs type="border-card" style="margin-top:10px;">
      <el-tab-pane label="借还分析">
        <JHFX ref="JHFX" />
      </el-tab-pane>
      <el-tab-pane label="报修分析">
        <BXFX ref="BXFX" />
      </el-tab-pane>
      <el-tab-pane label="转移分析">
        <ZYFX ref="ZYFX" />
      </el-tab-pane>
      <el-tab-pane label="盘点分析">
        正在开发...
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import JHFX from './components/JHFX.vue'
import BXFX from './components/BXFX.vue'
import ZYFX from './components/ZYFX.vue'
export default {
  components: { JHFX, BXFX, ZYFX },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped></style>
