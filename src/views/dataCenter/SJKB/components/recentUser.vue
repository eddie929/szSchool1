<template>
  <div>
    <el-row
      style="width: 100%; margin: 0 auto; margin-top: -10px; font-size: 15px"
      :gutter="24"
    >
      <el-col
        v-for="item in options"
        :key="item.用户Id"
        :span="3"
        style="
          margin-top: 10px;
          height: 140px;
          width:320px;
          min-height: 300px;
          max-height: 800px;
        "
      >
        <el-card
          class="box-card"
          shadow="hover"
          style="background-color: #ecf5ff; width:300px;  "
        >
          <!-- <div slot="header" class="clearfix" align="center">
            <span style="font-weight: bold;"> <i /> {{ item.用户名 }}</span>
          </div> -->
          <div align="center">
            <el-avatar shape="circle" :size="60" fit="contain" :src="ul" />
            <div class="user-name text-center" @click="btntext(item)">
              <el-link type="primary">{{ item.用户名 }} </el-link>
              <div class="user-name text-center">手机号:{{ item.手机号 }}</div>
              <div class="user-name text-center">
                部门名称:{{ item.部门名称 }}
              </div>
              <div class="user-name text-center">
                登录时间:{{ item.登录时间 }}
              </div>
            </div>
          </div>

          <el-divider />
          <div
            class="text item"
            style="color: #409eff; margin-top: 10px"
            @click="click(item)"
          >
            <el-tag
              type="info"
              style="margin-top: -10px"
              effect="plain"
            >管理的资产： {{ item.管理资产 }}
            </el-tag>
            <el-divider direction="vertical" />
            <el-tag
              effect="plain"
              type="info"
              style="margin-top: 10px;"
            >管理的地点 {{ item.管理地点 }}
            </el-tag>
            <br>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userlogo from '@/assets/sysimages/userlogo.png'
import nuserlogo from '@/assets/sysimages/nuserlogo.png'
import { get_logindata } from '@/api/datacenterhandle'
// import { number } from 'echarts'
export default {
  props: {
    islogin: {
      type: Number,
      default: 1,
      required: true // 必须传
    }
  },
  data() {
    return {
      ul: userlogo,
      value: [],
      options: [],
      bmname: this.$store.getters.二级部门名称
    }
  },
  // watch: {
  //   islogin: {
  //     handler(newValue, oldValue) {
  //       console.log(newValue)
  //     }
  //   }
  // },
  beforeMount() {
    this.get_logindata()
  },
  methods: {
    // 流程图标
    // ficon(val) {
    //   return 'el-icon-menu'
    // },
    // 建筑物视图查询
    get_logindata() {
      get_logindata({
        departmenttwo: this.$store.getters.id_二级部门 || 0,
        islogin: this.islogin
      }).then(res => {
        if (res.code === 100) {
          this.options = res.data
          if (this.islogin === 0) {
            this.ul = nuserlogo
          } else {
             this.ul = userlogo
          }
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
