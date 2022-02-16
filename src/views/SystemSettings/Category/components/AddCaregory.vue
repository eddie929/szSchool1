<template>
  <!-- 创建 -->
  <el-dialog
    top="15vh"
    :title="dialogtitle"
    :visible.sync="newcategoryshow"
    width="30%"
    center
    @close="dialogclose"
    :close-on-click-modal="false"
  >
    <el-form
      ref="ruleForm"
      :model="newform"
      :label-position="labelPosition"
      :rules="rules"
    >
      <el-form-item
        label="分类代码"
        :label-width="formLabelWidth"
        prop="分类代码"
      >
        <el-input
          v-model="newform.分类代码"
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
          v-model="newform.分类名称"
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
          v-model="newform.记量单位"
          autocomplete="off"
          clearable
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item
        v-if="ifdisplay"
        label="使用年限"
        :label-width="formLabelWidth"
        prop="categoryservicelife"
      >
        <el-input
          v-model="newform.categoryservicelife"
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
          v-model="newform.分类描述"
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
        >
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        class="el-icon-collection-tag"
        size="small"
        @click="submitadd('ruleForm')"
      >
        保 存</el-button
      >
      <el-button
        class="el-icon-close"
        size="small"
        @click="newcategoryshow = false"
      >
        取 消</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import {
  insert_categorydata,
  insert_categorytwo,
  insert_categorythree,
  insert_categoryfour,
} from "@/api/categoryhandle";
export default {
  data() {
    return {
      newcategoryshow: false, //显示隐藏
      dialogtitle: "",
      newform: {},
      ifdisplay: false, //使用年限
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
      分类等级: "",
      displays: true, //是否显示
    };
  },
  methods: {
    submitadd(val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          if (this.displays == true) {
            this.newform.display = 1;
          } else {
            this.newform.display = 0;
          }
          this.newform.分类等级 = this.分类等级;
          if (this.分类等级 == "一级") {
            insert_categorydata(this.newform).then((res) => {
              this.insert_box(res.code, res.msg);
              this.$emit("onload");
              this.newcategoryshow = false;
            });
          } else if (this.分类等级 == "二级") {
            insert_categorytwo(this.newform).then((res) => {
              this.insert_box(res.code, res.msg);
              this.$emit("onload");
              this.newcategoryshow = false;
            });
          } else if (this.分类等级 == "三级") {
            insert_categorythree(this.newform).then((res) => {
              this.insert_box(res.code, res.msg);
              this.$emit("onload");
              this.newcategoryshow = false;
            });
          } else if (this.分类等级 == "四级") {
            insert_categoryfour(this.newform).then((res) => {
              this.insert_box(res.code, res.msg);
              this.$emit("onload");
              this.newcategoryshow = false;
            });
          }
        }
      });
    },
    // 关闭
    dialogclose() {
      this.newform = {};
    },
  },
};
</script>

<style>
</style>