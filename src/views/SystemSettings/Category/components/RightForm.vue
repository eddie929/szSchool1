<template>
  <el-container style="height: 90vh">
    <el-main>
      <el-row style="margin: 0px 0px 0px 20px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="基本信息" name="first">
            <el-form
              ref="formflow"
              :model="flowinfo"
              :label-position="labelPosition"
              :rules="rules"
            >
              <el-form-item
                label="分类代码"
                :label-width="formLabelWidth"
                prop="分类代码"
              >
                <el-input
                  v-model="flowinfo.分类代码"
                  autocomplete="off"
                  clearable
                  placeholder="请输入内容"
                />
              </el-form-item>

              <el-form-item
                label="名称"
                :label-width="formLabelWidth"
                prop="分类名称"
              >
                <el-input
                  v-model="flowinfo.分类名称"
                  autocomplete="off"
                  clearable
                  placeholder="请输入内容"
                />
              </el-form-item>

              <el-form-item
                label="计量单位"
                :label-width="formLabelWidth"
                prop="记量单位"
              >
                <el-input
                  v-model="flowinfo.记量单位"
                  autocomplete="off"
                  clearable
                  placeholder="请输入内容"
                />
              </el-form-item>
              <el-form-item
                label="使用年限"
                :label-width="formLabelWidth"
                v-if="disp"
                prop="categoryservicelife"
              >
                <el-input
                  v-model="flowinfo.categoryservicelife"
                  autocomplete="off"
                  clearable
                  placeholder="请输入内容"
                />
              </el-form-item>
              <el-form-item
                label="分类描述"
                :label-width="formLabelWidth"
                prop="分类描述"
              >
                <el-input
                  v-model="flowinfo.分类描述"
                  autocomplete="off"
                  clearable
                  placeholder="请输入内容"
                />
              </el-form-item>
              <el-form-item
                label="是否显示"
                :label-width="formLabelWidth"
                prop="displays"
              >
                <el-switch
                  style="display: block"
                  v-model="displays"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="是"
                  inactive-text="否"
                  @change="switchChange"
                >
                </el-switch>
              </el-form-item>
              <el-form-item style="float: right">
                <el-button
                  type="primary"
                  icon="el-icon-check"
                  size="small"
                  @click="altersubmit('formflow')"
                  :loading="btnLoading"
                  >保存</el-button
                >
                <el-button
                  :loading="btnLoading"
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  @click="deletesubmit()"
                  >删除</el-button
                >
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 配置数据表 -->
        </el-tabs>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { up_categorydata, del_categorydata } from "@/api/categoryhandle";
export default {
  data() {
    return {
      btnLoading: false, //按钮加载
      displays: false, //是否隐藏
      disp: true,
      activeName: "first",
      flowinfo: {
        displays: false,
      },
      labelPosition: "left", // 对齐方向
      formLabelWidth: "100px", // label宽度
      rules: {
        分类名称: [
          { required: true, message: "请填写名称", trigger: "blur" },
        ],
        分类代码: [
          { required: true, message: "请填写分类代码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 保存
    altersubmit(val) {
      // console.log(val);
      //  console.log(this.flowinfo.id)
      if (this.flowinfo.id == undefined) {
        this.msg("警告", "请选择具体类别!");
        return;
      }
      this.$refs[val].validate((valid) => {
        if (valid) {
          // console.log(this.displays);
          if (this.displays == true) {
            this.flowinfo.display = 1;
          } else {
            this.flowinfo.display = 0;
          }

          this.btnLoading = true;
          up_categorydata(this.flowinfo).then((res) => {
            this.alter_box(res.code, "修改成功");
            this.$emit("onload");
            this.btnLoading = false;
          });
        }
      });
    },
    // 是否隐藏
    switchChange(val) {
      // console.log(val);
    },
    // 删除
    deletesubmit() {
      // console.log(this.flowinfo);
      // return;
      this.btnLoading = true;
      del_categorydata({
        id: this.flowinfo.id,
        level: this.flowinfo.分类等级,
      }).then((res) => {
        this.del_box(res.code, res.msg);
        this.$emit("onload");
        this.flowinfo = {};
        this.btnLoading = false;
      });
    },
  },
};
</script>

<style>
</style>