<template>
  <div>
    <el-row
      style="width: 100%; margin: 0 auto; margin-top: -10px; font-size: 15px"
      :gutter="24"
    >
      <el-col
        v-for="item in options"
        :key="item.部门名称"
        :span="3"
        style="
          margin-top: 10px;
          height: 200px;
            width:220px;
          min-height: 380px;
          max-height: 800px;
        "
      >
        <el-card
          class="box-card"
          shadow="hover"
          style="background-color: #ecf5ff; width:195px;  "
        >
          <div slot="header" class="clearfix" align="center">
            <span style="font-weight: bold;"> <i /> {{ item.部门名称 }}</span>
          </div>
          <div align="center">
            <el-avatar shape="circle" :size="60" fit="contain" :src="ul" />
            <div class="user-name text-center" @click="btntext(item)">
              <el-link type="primary">{{ item.部门名称 }} </el-link>
            </div>
          </div>

          <el-divider />
          <div
            class="text item"
            style="color: #409eff; margin-top: 10px"
          >
            <el-tag
              type="info"
              style="margin-top: -10px"
              effect="plain"
            >资产： {{ item.资产数量 }}
            </el-tag>

            <br>
            <el-tag
              effect="plain"
              type="info"
              style="margin-top: 10px;"
            >人员： {{ item.人员数量 }}
            </el-tag>
            <br>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bm from '@/assets/sysimages/企业部门.png'
import { get_departmentview } from '@/api/datacenterhandle'
export default {
  data() {
    return {
      ul: bm,
      value: [],
      options: [],
      bmname: this.$store.getters.二级部门名称
    }
  },
  beforeMount() {
    this.get_departmentview()
  },
  methods: {
    // 流程图标
    // ficon(val) {
    //   return 'el-icon-menu'
    // },
    // 建筑物视图查询
    get_departmentview() {
      get_departmentview({
        departmenttwo: this.$store.getters.id_二级部门 || 0
      }).then(res => {
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
    btntext(val) {
      // console.log(val)
    }
  }
}
</script>

<style>
.el-card__body {
  background-color: #fff;
}
.user-name {
  font-weight: bold;
  color: darkgray;
  margin-top: 10px;
}
</style>
