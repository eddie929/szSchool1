<template>
  <el-dialog
    append-to-body
    :title="titleDialog"
    :visible.sync="dialogVisible"
    width="75%"
    center
    :close-on-click-modal="false"
  >
    <el-form
      :model="form"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-divider content-position="left">必填</el-divider>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="资产类别" prop="AssetClassesvalue">
            <el-cascader
              style="width: 100%"
              ref="AssetClasses"
              :options="AssetClassesoptions"
              :props="defaultProps"
              filterable
              :show-all-levels="true"
              clearable
              v-model="AssetClassesvalue"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资产名称" prop="资产名称">
            <el-input v-model="form.资产名称"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="存放地点" prop="存放地点">
            <!-- <el-select
              style="width: 100%"
              v-model="form.存放地点value"
              placeholder="请选择"
              clearable
              value-key="存放地点二级ID"
            >
              <el-option
                v-for="item in 存放地点options"
                :key="item.存放地点二级ID"
                :label="item.房间名称"
                :value="item"
                size="medium"
              >
              </el-option>
            </el-select> -->
            <el-cascader
              style="width: 100%"
              ref="cunfang"
              :options="存放地点options"
              :props="存放defaultProps"
              filterable
              :show-all-levels="true"
              clearable
              v-model="form.存放地点value"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top: 2%" :gutter="24">
        <el-col :span="8">
          <el-form-item label="使用方向" prop="使用方向">
            <el-select
              v-model="form.使用方向"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数量(个)" prop="数量">
            <el-input-number
              v-model="form.数量"
              :min="1"
              style="width: 100%"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="原值" prop="原值">
            <el-input-number
              v-model="form.原值"
              :precision="2"
              :step="1"
              :min="0"
              style="width: 100%"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top: 2%" :gutter="24">
        <el-col>
          <el-form-item label="归属部门" prop="repair_describe">
            <el-select
              v-model="form.归属部门value"
              placeholder="请选择"
              clearable
              style="width: 100%"
              value-key="部门Id"
            >
              <el-option
                v-for="item in 归属部门options"
                :key="item.部门Id"
                :label="item.部门名称"
                :value="item"
                size="medium"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">选填</el-divider>
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item label="负责人" prop="负责人">
            <el-cascader
              style="width: 100%"
              :options="fuoptions"
              :props="fuprops"
              clearable
              @change="负责人change;"
              v-model="form.负责人value"
              ref="fuzecascader"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="使用人" prop="使用人">
            <el-cascader
              style="width: 100%"
              :options="syoptions"
              :props="fuprops"
              clearable
              v-model="form.使用人value"
              @change="使用人change;"
              ref="shiyongren"
            ></el-cascader>
          </el-form-item>
        </el-col>
          <el-col :span="8">
          <el-form-item label="品牌" prop="品牌">
            <el-input v-model="form.品牌"> </el-input>
          </el-form-item>
        </el-col>
  
      
      </el-row>

      <el-row :gutter="24" style="margin-top: 2%">
              <el-col :span="8">
          <el-form-item label="规格" prop="规格">
            <el-input v-model="form.规格"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="型号" prop="型号">
            <el-input v-model="form.型号"> </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <!-- <el-form-item label="折旧年限" prop="折旧年限">
            <el-input-number
              v-model="form.折旧年限"
              :min="0"
              style="width: 100%"
            ></el-input-number>
          </el-form-item> -->
        </el-col>
        <el-col :span="8"></el-col>
      </el-row>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <el-popconfirm
        title="再次确认提交"
        @confirm="btnok('ruleForm')"
        style="margin-right: 20px"
      >
        <el-button type="primary" class="el-icon-check" slot="reference">
          提 交</el-button
        >
      </el-popconfirm>
      <el-button class="el-icon-close" @click="dialogVisible = false">
        取 消</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { get_categoryalldata } from "@/api/categoryhandle";
import {
  get_storagelocation,
  get_schoolresponseperson,
} from "@/api/assetaccounthandle";
import { get_allschooldepartment } from "@/api/assetaccounthandle";
export default {
  data() {
    return {
      titleDialog: "", //标题
      dialogVisible: false, //显示隐藏
      rules: {
        资产名称: [
          { required: true, message: "请输入资产名称", trigger: "blur" },
        ],
        // 使用方向: [
        //   { required: true, message: "请选择使用方向", trigger: "change" },
        // ],
      },
      form: {
        存放地点value: "",
        归属value: "",
        数量: 1,
        原值: 0,
        负责人value: 0,
        使用人value: 0,
      },
      存放地点options: [],
      归属部门options: [],
      // 使用方向
      options: [
        {
          value: "教学",
          label: "教学",
        },
        {
          value: "科研",
          label: "科研",
        },
        {
          value: "行政",
          label: "行政",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      defaultProps: {
        children: "children",
        label: "分类名称",
        value: "id",
      },
      存放defaultProps: {
        children: "children",
        label: "name",
        value: "id",
      },

      deProps: {
        children: "children",
        label: "name",
        value: "id",
      },
      didianprops: {
        children: "children",
        label: "房间名称",
        value: "id",
        // checkStrictly: true,
      },
      deoptions: [], //归属部门
      fuoptions: [], //负责人
      syoptions: [], //使用人
      fuprops: {
        children: "children2",
        label: "name",
        value: "id",
        checkStrictly: false, //是否可以选择任意一级
      },
      AssetClassesoptions: [], //资产分类
      AssetClassesvalue: "",
      didianoptions: [],
    };
  },
  methods: {
    // 提交
    btnok(form) {
      // console.log(this.form.归属部门value);
      this.$refs[form].validate((valid) => {
        if (valid) {
          // 类别验证
          if (this.AssetClassesvalue.length == 0) {
            this.msg("警告", "请选择资产类别!");
            return;
          }
          if (this.form.使用方向 === undefined) {
            this.msg("警告", "请选择使用方向!");
            return;
          }
          this.form.一级类别Id = 0;
          this.form.二级类别Id = 0;
          this.form.三级类别Id = 0;
          this.form.四级类别Id = 0;
          if (this.AssetClassesvalue.length > 0) {
            this.form.一级类别Id = this.AssetClassesvalue[0];
          }
          if (this.AssetClassesvalue.length > 1) {
            this.form.二级类别Id = this.AssetClassesvalue[1];
          }
          if (this.AssetClassesvalue.length > 2) {
            this.form.三级类别Id = this.AssetClassesvalue[2];
          }
          if (this.AssetClassesvalue.length > 3) {
            this.form.四级类别Id = this.AssetClassesvalue[3];
          }

          // console.log("存放地点value", this.form);
          if (
            this.form.存放地点value.length == 0 ||
            this.form.存放地点value.length == undefined
          ) {
            this.msg("警告", "请选择存放地点!");
            return;
          }
          // this.form.存放地点一级 = this.form.存放地点value[0];
          // this.form.存放地点二级 = this.form.存放地点value[1];
          this.form.存放地点一级 =
            this.form.存放地点value[0] != undefined
              ? this.form.存放地点value[0]
              : 0;
          this.form.存放地点二级 =
            this.form.存放地点value[1] != undefined
              ? this.form.存放地点value[1]
              : 0;
          // console.log("存放地点", this.$refs.cunfang);
          this.form.存放地点 = this.$refs.cunfang.inputValue;
          // return;

          if (
            this.form.归属部门value == "" ||
            this.form.归属部门value == 0 ||
            this.form.归属部门value == undefined ||
            this.form.归属部门value.length == 0
          ) {
            this.msg("警告", "请选择归属部门!");
            return;
          }
          this.form.一级归属部门Id = this.$store.getters.id_一级部门;
          this.form.二级归属部门Id = this.$store.getters.id_二级部门;
          this.form.三级归属部门Id = this.form.归属部门value.部门Id;
          this.form.归属部门 = this.form.归属部门value.部门名称;
          if (this.form.负责人value.length > 0) {
            this.form.负责人 = this.form.负责人value[1];
          }
          if (this.form.使用人value.length > 0) {
            this.form.使用人 = this.form.使用人value[1];
          }
          var data = this.$refs.AssetClasses.inputValue.split("/");
          for (var i in data) {
            data[i] = data[i].trim();
          }
          this.form.资产分类 = this.$refs.AssetClasses.inputValue.split("/");

          this.form.负责人name = this.$refs.fuzecascader.inputValue;
          this.form.使用人name = this.$refs.shiyongren.inputValue;

          // console.log("data", data);
          this.form.二级分类名称 = data[1];
          // console.log("this.form.二级类别,", this.form);
          // return;
          // console.log("返回", this.form);
          this.form.一级归属部门Id = this.$store.getters.id_一级部门;
          this.form.二级归属部门Id = this.$store.getters.id_二级部门;
          this.form.三级归属部门Id = this.form.归属部门value.部门Id;
          // console.log("传值前", this.form);
          // return;
          if (this.form.二级分类名称 != "图书、档案") {
            var sum = this.form.数量;
            this.form.原值 = this.form.原值 / this.form.数量;
            this.form.保留原值 = this.form.原值.toFixed(2);
            for (var i = 0; i < sum; i++) {
              this.form.数量 = 1;
              this.$emit("putData", this.form);
            }
          } else {
            this.form.保留原值 = this.form.原值.toFixed(2);
            this.$emit("putData", this.form);
          }

          this.AssetClassesvalue = [];
          this.form = {
            存放地点value: "",
            归属value: "",
            数量: 1,
            原值: 0,
            负责人value: 0,
            使用人value: 0,
          };
          this.dialogVisible = false;
          // console.log("填写详情页:", this.form);
        }
      });
    },

    // 存放地点options
    get_storagelocation() {
      // console.log("000");
      var data = {
        departmentwo: this.$store.getters.id_二级部门,
      };
      // console.log("粗办法");
      get_storagelocation(data).then((res) => {
        // console.log(res);
        this.存放地点options = res.data;
      });
    },
    // 类别初始化
    get_categoryalldata() {
      get_categoryalldata().then((res) => {
        this.AssetClassesoptions = res.data;
      });
    },
    // 归属部门
    get_allschooldepartment() {
      var data = {
        departmentwo: this.$store.getters.id_二级部门,
      };
      get_allschooldepartment(data).then((res) => {
        this.归属部门options = res.data;
      });
    },

    // 负责人 使用人查询
    get_schoolresponseperson() {
      var data = {
        departmentone: this.$store.getters.id_一级部门,
        departmentwo: this.$store.getters.id_二级部门,
      };
      get_schoolresponseperson(data).then((res) => {
        this.fuoptions = res.data;
        this.syoptions = res.data;
      });
    },
    // 类别选择
    // AssetClasseschange(val) {},

    负责人change(val) {
      // console.log("负责人", val);
    },
    使用人change(val) {
      // console.log("使用人", val);
    },
  },
  beforeMount() {
    this.get_categoryalldata(); //类别
    this.get_storagelocation(); //存放地点
    this.get_allschooldepartment(); //归属部门
    this.get_schoolresponseperson(); // 负责人 使用人
  },
};
</script>

<style>
</style>