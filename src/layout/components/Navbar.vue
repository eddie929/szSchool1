<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="right-menu">
      <template>
        <!--帮助/使用手册 -->
        <!-- <el-tooltip
          class="item"
          effect="dark"
          content="使用说明"
          placement="bottom"

        > -->
        <el-badge
          style="height: 20px; margin-bottom: 40px; margin-right: 3px;margin-top:-10px"
        >
          <el-link
            class="el-icon-question"
            style="font-size: 25px; margin-bottom: 34px; color: #409eff"
          />
        </el-badge>
        <!-- </el-tooltip> -->
        <span style="margin-left:-44px;font-size: 5px">使用说明</span>
        <!-- <el-tooltip
          class="item"
          effect="dark"
          content="消息"
          placement="bottom"
        > -->
        <el-badge
          :is-dot="isdot"
          icon-class="消息"
          style="height: 20px; margin-bottom: 40px; margin-right: 3px;margin-left:20px;margin-top:-10px;"
        >
          <el-link
            class="el-icon-s-opportunity"
            style="font-size: 25px; margin-bottom: 34px; color: #409eff"
            @click="xiaoxi"
          />
        </el-badge>
        <!-- </el-tooltip> -->
        <span style="margin-left:-44px;font-size: 5px">消息中心</span>
        <!-- <svg-icon
            icon-class="消息"
            class-name="card-panel-icon"
            style="font-size: 20px"
          /> -->
        <!-- <el-badge
          :value="12"
          class="item"
          is-dot
          icon-class="消息"
          style="height: 15px; margin-bottom: 60px; margin-right: 10px"
          >消息
        </el-badge> -->
        <!-- <svg-icon
          icon-class="消息"
          :is-dot="true"
          class-name="card-panel-icon"
          style="font-size: 20px"
        >
          评论
          <el-badge
            :value="12"
            class="item"
            style="height: 15px; margin-bottom: 50px; margin-right: 10px"
            >消息
          </el-badge>
        </svg-icon> -->

        <!-- <el-tooltip
          v-if="true"
          class="item"
          effect="dark"
          content="全屏"
          placement="bottom"
        ><screenfull id="screenfull" class="right-menu-item hover-effect" />
        </el-tooltip> -->
      </template>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <span class="avatar-dropdown">
          <img class="user-avatar" :src="logo" alt="">

          <div class="user-name">
            {{ 姓名 }}
            <i class="el-icon-arrow-down el-icon--right" />
          </div>
        </span>
        <!--用户姓名 -->
        <!-- <div class="avatar-wrapper">
          <el-button
            type="text"
            style="color: black"
          >{{ 姓名 }}<i
            class="el-icon-caret-bottom"
          /></el-button>
        </div> -->

        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>首　　页</el-dropdown-item>
          </router-link>
          <router-link to="/profile/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span
              style="display: block"
              @click="dialogVisible = true"
            >修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display: block" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 修改密码窗口 -->
      <el-dialog
        title="修改密码"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        append-to-body
      >
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="oldword">
            <el-input
              v-model="ruleForm.oldword"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="新密码" prop="pass">
            <el-input
              v-model="ruleForm.pass"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              v-model="ruleForm.checkPass"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        center
        append-to-body
        :visible.sync="drawer"
        :direction="direction"
        :with-header="false"
        width="60%"
        top="11vh"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-switch
              v-model="switchValue"
              active-text="全部未读"
              inactive-text="全部已读"
              style="float:left; margin:10px;"
              @change="switchChange"
            />
          </el-col>
        </el-row>
        <el-table
          ref="DataTable"
          v-loading="loading"
          :data="tableData"
          style="width: 98%; margin-top: 5px; margin: 0 auto"
          :highlight-current-row="true"
          border
          stripe
          max-height="500"
          :fit="true"
          :cell-style="yellowBg"
          :header-cell-style="{
            'text-align': 'center',
            background: '#eef1f6'
          }"
        >
          <el-table-column
            label="序号"
            type="index"
            width="50"
            :reserve-selection="true"
          />
          <el-table-column prop="消息事项" label="消息事项" />
          <el-table-column
            prop="消息内容"
            label="消息内容"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="发布人"
            label="发布人"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="发布时间"
            label="发布时间"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="通知类型"
            label="通知类型"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop=""
            label="是否已读"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ maturity(scope.row) }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.是否已读 == 0"
                type="text"
                size="small"
                @click="hande(scope.row)"
              >
                已 读
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row style="margin: 10px 0px 0px 10px">
          <el-col :span="24">
            <el-pagination
              background
              :current-page="pageinfo.pageNum"
              :page-sizes="pageinfo.pageSizes"
              :page-size="pageinfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageinfo.count"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { get_noticelistcount } from '@/api/datareportstatisticshandle'
import { mapGetters } from 'vuex'
import { alter_password } from '@/api/userhandle' // 修改密码
import { get_noticelist } from '@/api/datareportstatisticshandle'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import Screenfull from '@/components/Screenfull'
// import Search from '@/components/HeaderSearch'
import userlogo from '@/assets/sysimages/userlogo.png'
export default {
  components: {
    Breadcrumb,
    Hamburger
    // Search
  },
  computed: {
    ...mapGetters(['sidebar', 'device', '姓名'])
  },
  mounted() {},
  beforeMount() {
    this.get_noticelist()
  },
  methods: {
    switchChange(val) {
      // 全部已读
      let wholeread = 0
      if (val === false) {
        wholeread = 2
      } else {
        wholeread = 3
      }
      const resData = {
        id: 0,
        isread: 0,
        wholeread: wholeread,
        departmenttwo: this.$store.getters.id_二级部门
      }
       get_noticelistcount(resData).then(res => {
        this.get_noticelist()
      })
    },
    // 打开消息
    xiaoxi() {
      this.drawer = true
    },
    // 设为已读
    hande(row) {
      // console.log(row);
      get_noticelistcount({ id: row.id, isread: 1 }).then(res => {
        this.get_noticelist()
      })
    },
    yellowBg({ row, column, rowIndex, columnIndex }) {
      // console.log(row.是否已读);
      if (row.是否已读 == 0) {
        return {
          background: '#d9ecff'
        }
      } else {
        return {
          background: ''
        }
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    // 退出登录
    async logout() {
      await this.$store.dispatch('user/logout')
      location.reload()
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    handleClose(done) {
      this.dialogVisible = false
      this.resetForm('ruleForm')
    },
    maturity(row) {
      if (row.是否已读 == 0) {
        return '未读'
      } else {
        return '已读'
      }
    },
    // 修改密码提交按钮
    submitForm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          const reqdata = {
            userid: this.$store.getters.id_用户,
            oldpass: this.ruleForm.oldword,
            newpass: this.ruleForm.checkPass
          }
          alter_password(reqdata)
            .then(response => {
              // 成功
              if (response.code === 100) {
                this.$message({
                  message: '密码修改成功,请重新登录系统!',
                  type: 'success'
                })
                this.logout()
                this.dialogVisible = false
              } else if (response.code === -2) {
                this.$message({
                  message: response.msg,
                  type: 'error'
                })
                return
              } else if (response.code === 102) {
                this.$message({
                  message: response.msg,
                  type: 'warning'
                })
                return
              } else {
                this.$message({
                  message: response.msg,
                  type: 'error'
                })
                return
              }
            })
            .catch()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 消息中心
    get_noticelist() {
      this.loading = true
      get_noticelist(this.pageinfo).then(res => {
        this.loading = false
        this.tableData = res.data
        this.pageinfo.count = res.count
        for (var i in this.tableData) {
          if (this.tableData[i].是否已读 === 0) {
            this.isdot = true
            return
          } else {
            this.isdot = false
          }
        }
      })
    },
    // 控制每页显示条数
    handleSizeChange(val) {
      this.pageinfo.pageSize = val
      this.get_noticelist()
    },
    // 第几页
    handleCurrentChange(val) {
      // console.log(val)
      this.pageinfo.pageNum = val
      this.get_noticelist()
    }
  },

  data() {
    // 修改密码窗口的验证
    var validateOldPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('原密码不能为空'))
      }
      callback()
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      switchValue: '',
      username: '',
      ruleForm: {
        pass: '',
        checkPass: '',
        oldword: ''
      },
      pageinfo: {
        pageNum: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50],
        count: 0,
        fk_user: this.$store.getters.id_用户,
        fk_role: this.$store.getters.id_角色,
        departmentone: this.$store.getters.id_一级部门,
        departmenttwo: this.$store.getters.id_二级部门
      },
      isdot: false,
      tableData: [],
      direction: 'rtl',
      loading: false,
      drawer: false,
      title: '用户logo',
      logo: userlogo,
      dialogVisible: false,
      rules: {
        oldword: [{ validator: validateOldPass, trigger: 'blur' }],
        pass: [
          { validator: validatePass, trigger: 'blur' },
          {
            min: 5,
            max: 12,
            message: '长度在 5 到 12 个字符',
            trigger: 'blur'
          }
        ],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-dropdown {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: 50px;
  padding: 0;

  .user-avatar {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
  }

  .user-name {
    position: relative;
    margin-left: 5px;
    margin-left: 5px;
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
  }
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    // .user-avatar {
    //   width: 40px;
    //   height: 40px;
    //   border-radius: 10px;
    // }
    // .avatar-container {
    //   margin-right: 30px;

    //   .avatar-wrapper {
    //     margin-top: 3px;
    //     position: relative;

    //     .user-avatar {
    //       cursor: pointer;
    //       width: 40px;
    //       height: 40px;
    //       border-radius: 10px;
    //     }

    //     .el-icon-caret-bottom {
    //       cursor: pointer;
    //       position: absolute;
    //       right: -20px;
    //       // top: 25px;
    //       font-size: 15px;
    //     }
    //   }
    // }
    .el-badge {
      margin-right: 15px;
      padding: 0;
    }
  }
}
</style>
