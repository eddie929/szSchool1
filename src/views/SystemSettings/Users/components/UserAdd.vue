<template>
  <el-dialog
    :close-on-click-modal="false"
    top="10vh"
    title="新增用户"
    :visible.sync="dialogVisible"
    width="50%"
    append-to-body
    center
    @close="close"
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
          <el-form-item label="登录名" prop="login_name">
            <el-input v-model="form.login_name" placeholder="请输入登录名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              show-password
              type="password"
              placeholder="请输入密码"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="margin-top: 3%" :gutter="24">
        <el-col :span="12">
          <el-form-item label="姓名" prop="user_name">
            <el-input v-model="form.user_name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="角色" prop="fk_role">
            <Role ref="Role" style="width: 100%" @setUsers="setUsers" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="margin-top: 3%" :gutter="24">
        <el-col :span="12">
          <el-form-item label="工号">
            <el-input v-model="form.number" placeholder="请输入工号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24" style="margin-top: 3%">
        <el-col :span="12">
          <el-form-item label="邮箱">
            <el-input v-model="form.email" placeholder="请输入邮箱" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="办公电话">
            <el-input v-model="form.work_phone" placeholder="请输入办公电话" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24" style="margin-top: 3%">
        <el-col :span="24">
          <el-form-item label="职务">
            <el-input
              v-model="form.post"
              style="width: 100%"
              placeholder="请输入职务"
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
            <el-input v-model="form.remark" placeholder="请输入备注" />
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
        提 交</el-button
      >
      <el-button class="el-icon-close" @click="dialogVisible = false">
        取 消</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { insert_user } from "@/api/userhandle";
import { get_departmentall } from "@/api/syshandle"; // 查询全部部门API
import Role from "@/bitcomponents/Role/index";
import Departmentall from "@/bitcomponents/Departmentall/index";
export default {
  components: { Role, Departmentall },
  data() {
    return {
      dialogVisible: false, // 显示隐藏
      form: {},
      labelWidth: "80px", // 表单label宽度
      labelPosition: "right", // 表单对齐方向
      rules: {
        // 登录名
        login_name: [
          { required: true, message: "请输入登录名", trigger: "blur" },
          {
            min: 2,
            max: 12,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        // 密码
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
          // 系统角色
        ],
        // 姓名
        user_name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
      },
      userdisplay: false, // 角色判断,资产管理员显示

      managementOptions: [], // 管理部门数据
      defaultProps: {
        children: "children",
        label: "name",
        value: "id",
        // checkStrictly: true,
        multiple: true,
      },
      activeNames: "first",
    };
  },
  methods: {
    // 提交
    btnok(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.form.fk_role === "" || this.form.fk_role === undefined) {
            this.$message({
              message: "请选择系统角色.",
              type: "warning",
            });
            return;
          }
          if (this.form.fk_departmentone === undefined) {
            this.$message({
              message: "请选择部门.",
              type: "warning",
            });
            return;
          }
          if (this.form.fk_roleName === "普通员工") {
            if (this.form.fk_departmenttwo === 0) {
              this.$message({
                message: "普通员工部门必须选择到部门.",
                type: "warning",
              });
              return;
            }
          }
          if (this.form.department_datas !== undefined) {
            if (this.form.department_datas.length > 0) {
              this.form.department_limits = "";
              for (var i in this.form.department_datas) {
                this.form.department_limits +=
                  this.form.department_datas[i][1] + ",";
              }
              this.form.department_limits = this.form.department_limits.slice(
                0,
                this.form.department_limits.length - 1
              );
            }
          } else {
            this.form.department_limits = "";
            this.form.department_lable = "";
            if (
              this.form.fk_roleName === "资产管理员" &&
              this.form.fk_departmenttwo === 0
            ) {
              this.form.department_limits = "全部";
              this.form.department_lable = "全部";
            } else if (this.form.fk_roleName === "资产管理员") {
              this.form.department_limits = this.form.fk_departmenttwo + "";
              this.form.department_lable = "";
            }
          }

          insert_user(this.form).then((res) => {
            if (res.code == 100) {
              this.$message({
                message: "创建成功",
                type: "success",
              });
              this.$emit("select");
              this.dialogVisible = false;
            } else if (res.code == 108) {
              this.msg("警告", "已有此登录名存在!");
              return;
            }
          });
        }
      });
    },
    // 部门选择
    getDepartmentall(val) {
      this.form.fk_departmentone = val.onebm;
      this.form.fk_departmenttwo = val.twobm;
      this.form.fk_departmentthree = val.thrbm;
    },
    close() {
      // 清除值
      this.form = {};
      this.$refs.Role.value = "";
      this.$refs.Departmentall.value = [];
    },
    // 选择用户角色赋值给form
    setUsers(val) {
      if (
        val.name === "资产管理员" // ||
        // val.name === '物资管理员' ||
        // val.name === '系统管理员'
      ) {
        this.get_departmentall();
        this.userdisplay = true;
      } else {
        this.userdisplay = false;
      }
      this.form.fk_role = val.id;
      this.form.fk_roleName = val.name;
    },
    // 管理部门查询
    get_departmentall() {
      get_departmentall().then((res) => {
        this.managementOptions = res.data;
      });
    },
    // 管理部门选择
    managementchange(val) {},
  },
};
</script>

<style></style>
