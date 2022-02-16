<template>
  <el-dialog
    v-loading="loading"
    :title="'编辑——' + form.姓名"
    :close-on-click-modal="true"
    :visible.sync="dialogVisible"
    width="50%"
    style="text-align: center"
    top="10vh"
    @opened="opened"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      :label-width="labelWidth"
      :label-position="labelPosition"
    >
      <el-divider content-position="left">基本信息</el-divider>
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item label="登录名" prop="登录名">
            <el-input v-model="form.登录名" placeholder="暂无数据" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码" prop="用户密码">
            <el-input
              v-model="form.用户密码"
              type="password"
              placeholder="暂无数据"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top: 3%" :gutter="24">
        <el-col :span="12">
          <el-form-item label="姓名" prop="姓名">
            <el-input v-model="form.姓名" placeholder="暂无数据" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色" prop="fk_role">
            <el-select
              v-model="form.fk_role"
              placeholder="请选择系统角色"
              clearable
              style="width: 100%"
              @change="userRolechange"
              @input="updateView($event)"
            >
              <el-option
                v-for="item in userRoleoptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top: 3%" :gutter="24">
        <el-col :span="12">
          <el-form-item label="工号">
            <el-input v-model="form.工号" placeholder="暂无数据" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="手机">
            <el-input v-model="form.手机" placeholder="暂无数据" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="margin-top: 3%">
        <el-col :span="12">
          <el-form-item label="邮箱">
            <el-input v-model="form.邮箱" placeholder="暂无数据" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="办公电话">
            <el-input v-model="form.办公电话" placeholder="暂无数据" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="margin-top: 3%">
        <el-col :span="24">
          <el-form-item label="职务">
            <el-input
              v-model="form.职务"
              style="width: 100%"
              placeholder="暂无数据"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="margin-top: 3%">
        <el-col :span="24">
          <el-form-item label="部门">
            <Departmentall
              ref="Departmentall"
              style="width: 100%"
              @getDepartmentall="getDepartmentall"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="margin-top: 3%">
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="form.备注" placeholder="暂无数据" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-collapse
        v-if="userdisplay"
        v-model="activeNames"
        style="margin-top: 20px"
      >
        <el-collapse-item title="资产管理范围" name="1">
          <el-row :gutter="24" style="margin-top: 3%">
            <el-col :span="24">
              <el-form-item label="管理部门">
                <el-cascader
                  ref="department_datas"
                  v-model="form.department_datas"
                  style="width: 100%"
                  :options="managementOptions"
                  :props="defaultProps"
                  clearable
                  :show-all-levels="false"
                  @change="managementchange"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <el-button type="primary" class="el-icon-check" @click="btnok('form')">
        确 定</el-button>
      <!-- <el-button @click="close" class="el-icon-close"> 取 消</el-button> -->
    </div>
  </el-dialog>
</template>

<script>
import { get_departmentall } from '@/api/syshandle' // 查询全部部门API
import Departmentall from '@/bitcomponents/Departmentall/index'
import { get_userrole, up_sysuser } from '@/api/userhandle'
// import { get_userrole } from "@/api/userhandle";

export default {
  components: { Departmentall },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      form: {
        fk_role: '',
        passwords: ''
      }, // 数据载体
      labelWidth: '80px', // 表单label宽度
      labelPosition: 'right', // 表单对齐方向
      // 表单验证
      rules: {
        // 登录名
        登录名: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          {
            min: 2,
            max: 15,
            message: '长度在 2 到 15 个字符',
            trigger: 'blur'
          }
        ],
        // 密码
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 1,
            max: 20,
            message: '长度在 1 到 20 个字符',
            trigger: 'blur'
          }
        ],
        // 姓名
        姓名: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
      displayde: false,
      // 管理部门
      managementOptions: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id',
        // checkStrictly: true,
        multiple: true
      },
      userRoleoptions: [], // 角色
      userdisplay: false,
      activeNames: 'first'
    }
  },
  watch: {
    form: {
      handler(newValue, oldValue) {
        // console.log(newValue)
      }
    }
  },
  methods: {
    getDepartmentall(val) {
      this.form.id_一级部门 = val.onebm
      this.form.id_二级部门 = val.twobm
      this.form.id_三级部门 = val.thrbm
    },
    // 保存
    btnok(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          var data = {
            id: this.form.id_用户,
            login_name: this.form.登录名,
            user_name: this.form.姓名,
            password: this.form.用户密码,
            number: this.form.工号,
            fk_role: this.form.fk_role,
            post: this.form.职务,
            email: this.form.邮箱,
            work_phone: this.form.办公电话,
            phone: this.form.手机,
            remark: this.form.备注,
            fk_departmentone: this.form.id_一级部门,
            fk_departmenttwo: this.form.id_二级部门,
            fk_departmentthree: this.form.id_三级部门,
            department_limits: this.form.department_limits
          }
          const role_name = this.form.fk_role
            ? this.userRoleoptions.find(ele => ele.id === this.form.fk_role)
                .name
            : ''
          if (role_name === '普通员工') {
            if (this.form.id_二级部门 === 0) {
              this.$message({
                message: '普通员工部门必须选择到二级',
                type: 'warning'
              })
              return
            }
          }
          if (this.form.department_datas.length > 0) {
            data.department_limits = ''
            for (var i in this.form.department_datas) {
              data.department_limits += this.form.department_datas[i][1] + ','
            }
            data.department_limits = data.department_limits.slice(
              0,
              data.department_limits.length - 1
            )
            // console.log(data.department_limits)
          } else {
            // 如果没写管理范围就给默认当前部门
            // console.log("没有")
            // 当用户为一级部门
            if (data.fk_departmenttwo === 0) {
              data.department_limits = '全部'
            } else {
              // 有二级部门
              data.department_limits = data.fk_departmenttwo + ''
            }
          }
          up_sysuser(data).then(res => {
            if (res.code === 100) {
              this.dialogVisible = false
              this.$emit('select') // 刷新页面
              this.alter_box(res.code, '修改成功')
            } else if (res.code === 101) {
              this.alter_box(res.code, res.msg)
              return
            } else if (res.code === 102) {
              this.alter_box(res.code, res.msg)
              return
            } else if (res.code === -1) {
              this.alter_box(res.code, res.msg)
              return
            }
          })
        }
      })
    },
    //   角色选择
    userRolechange(val) {
      const deptName = val
        ? this.userRoleoptions.find(ele => ele.id === val).name
        : ''
      if (deptName === '资产管理员') {
        this.get_departmentall()
        this.userdisplay = true
      } else {
        this.userdisplay = false
      }
    },
    // 部门选择
    managementchange(val) {},
    // 打开回调
    opened() {
      this.getUsersRole()
      this.form.fk_role = this.form.id_角色
      if (this.form.角色名称 === '资产管理员') {
        this.userdisplay = true

        this.get_departmentall()
      } else {
        this.userdisplay = false
      }
      if (this.form.id_三级部门 !== 0) {
        this.$refs.Departmentall.value = [
          this.form.id_一级部门,
          this.form.id_二级部门,
          this.form.id_三级部门
        ] // 部门
        // console.log("1");
      } else if (this.form.id_三级部门 === 0 && this.form.id_二级部门 !== 0) {
        // console.log(2);
        this.$refs.Departmentall.value = []
        this.$refs.Departmentall.value = [
          this.form.id_一级部门,
          this.form.id_二级部门
        ]
      } else if (this.form.id_二级部门 === 0) {
        this.$refs.Departmentall.value = []
        this.$refs.Departmentall.value = [this.form.id_一级部门]
      }
      var that = this
      if (
        this.form.管理范围部门 === undefined ||
        this.form.管理范围部门 === '' ||
        this.form.管理范围部门 === '全部'
      ) {
        this.form.department_datas = []
      } else {
        var str = this.form.管理范围部门.split(',')
        var arry = []
        var arrys = []
        // console.log(str);
        for (var i = 0; i < str.length; i++) {
          // console.log(parseInt(str[i]));
          arry.push(25)
          arry.push(parseInt(str[i]))
          arrys.push(arry)
          arry = []
        }
        that.form.department_datas = arrys
        // console.log(that.form.department_datas);
      }
    },
    // 获取所有角色
    getUsersRole() {
      get_userrole().then(res => {
        this.userRoleoptions = res.data
      })
    },
    // 管理部门查询
    get_departmentall() {
      get_departmentall().then(res => {
        this.managementOptions = res.data
      })
    },
    // input双向绑定失效解决方法
    updateView(e) {
      //   console.log(e);
      this.$forceUpdate()
    }
  }
}
</script>

<style></style>
