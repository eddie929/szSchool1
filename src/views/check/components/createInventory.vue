<template>
  <!-- <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="55%"
    center
    :close-on-click-modal="false"
  > -->
  <div style="margin:1%">
    <el-form
      ref="ruleForm"
      :rules="rules"
      :label-position="labelPosition"
      :model="form"
    >
      <el-card shadow="never">
        基本信息
        <el-row :gutter="24" style="margin-top: 1%">
          <el-col :span="12">
            <el-form-item
              label="任务名称"
              :label-width="formLabelWidth"
              prop="任务名称"
            >
              <el-input
                class="input1"
                v-model="form.任务名称"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开始/截止日期" label-width="120px" prop="时间">
              <el-date-picker
                style="width:100%"
                v-model="form.时间"
                type="daterange"
                range-separator="-"
                :picker-options="pickerOptions"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col>
            <el-form-item
              label="备注信息"
              :label-width="formLabelWidth"
              prop="备注"
            >
              <el-input
                v-model="form.备注"
                type="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-row style="margin-top: 1%">
        <el-col>
          <el-card shadow="never">
            <el-form-item
              label="盘点方式"
              :label-width="formLabelWidth"
              prop="盘点方式"
            >
              <el-checkbox-group v-model="form.盘点方式">
                <el-checkbox label="扫码盘点" disabled></el-checkbox>
                <el-checkbox label="拍照盘点"></el-checkbox>
                <el-checkbox label="批量盘点"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-card>
        </el-col>
      </el-row>
      <el-card
        shadow="never"
        v-show="this.$store.getters.id_二级部门 != 0"
        style="margin-top: 1%"
      >
        <!-- <span style="color:red">*注:(不选则下面四个分类表示盘点全部资产)</span> -->
        <el-row style="margin-top: 1%" :gutter="24">
          <el-col :span="24">
            <el-form-item
              label="盘点范围"
              :label-width="formLabelWidth"
              prop="盘点范围"
            >
              <el-radio-group v-model="form.盘点范围" @change="updateArea">
                <el-radio label="全部">全部</el-radio>
                <el-radio label="自定义">自定义</el-radio>
              </el-radio-group>
            </el-form-item></el-col
          ></el-row
        >
        <el-row v-show="hiddenArea" style="margin-top: 1%" :gutter="24">
          <el-col :span="24">
            <el-form-item
              label="资产分类"
              :label-width="formLabelWidth"
              prop="资产分类"
            >
              <el-select
                style="width: 100%"
                v-model="form.资产分类"
                placeholder="请选择"
                clearable
                multiple
                filterable
                @clear="pointPerson = {}"
                @change="changeCategory"
              >
                <el-option
                  v-for="item in categoryOptions"
                  :key="item.value"
                  :label="item.categoryname"
                  :disabled="item.id == 1 || item.id == 6"
                  :value="{ value: item.id, label: item.categoryname }"
                  size="medium"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="hiddenArea" style="margin-top: 1%" :gutter="24">
          <el-col :span="24">
            <el-form-item
              label="存放地点"
              :label-width="formLabelWidth"
              prop="存放地点"
            >
              <!-- <el-select
                style="width: 100%"
                v-model="form.存放地点"
                placeholder="请选择"
                clearable
                multiple
                filterable
                @clear="pointPerson = {}"
                @change="changeAddress"
                :disabled="hidenOne"
              >
                <el-option
                  v-for="item in addressOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="{ value: item.id, label: item.name }"
                  size="medium"
                >
                </el-option>
              </el-select> -->
              <el-cascader
                style="width: 100%"
                class="assssaa"
                :options="addressOptions"
                :show-all-levels="false"
                @change="changeAddress"
                :props="props"
                clearable
              ></el-cascader>
            </el-form-item> </el-col
        ></el-row>
        <el-row v-show="hiddenArea" style="margin-top: 1%" :gutter="24">
          <el-col :span="24">
            <el-form-item
              label="归属部门"
              :label-width="formLabelWidth"
              prop="归属部门"
            >
              <el-select
                v-model="form.归属部门"
                placeholder="请选择"
                clearable
                multiple
                filterable
                :disabled="hidenDepartment"
                @clear="pointPerson = {}"
                @change="changeDepartment"
                style="width:100%"
              >
                <el-option
                  v-for="item in belongpartOptions"
                  :key="item.部门Id"
                  :label="item.部门名称"
                  :value="{ value: item.部门Id, label: item.部门名称 }"
                  size="medium"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="hiddenArea" style="margin-top: 1%" :gutter="24">
          <el-col :span="24">
            <el-form-item
              label="负责人"
              :label-width="formLabelWidth"
              prop="负责人"
            >
              <el-select
                v-model="form.负责人"
                placeholder="请选择"
                clearable
                multiple
                filterable
                :disabled="hidenPerson"
                @clear="pointPerson = {}"
                @change="handlePerson"
                style="width:100%"
              >
                <el-option
                  v-for="item in personOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="{ value: item.id, label: item.name }"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card shadow="never" style="margin-top: 1%">
        <el-row :gutter="24" style="margin-top: 1%">
          <el-col :span="24">
            <el-form-item
              label="盘点人员"
              prop="radio"
              :label-width="formLabelWidth"
            >
              <el-radio-group v-model="form.radio" @change="userRadio">
                <el-radio label="各负责人">各负责人</el-radio>
                <el-radio label="管理员">管理员</el-radio>
                <el-radio
                  label="指定人员"
                  v-show="this.$store.getters.id_二级部门 != 0"
                  >指定人员</el-radio
                >
                <el-radio
                  label="各单位自行分配"
                  v-show="this.$store.getters.id_二级部门 == 0"
                  >各单位自行分配</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" style="margin-top: 20px">
          <el-col :span="12">
            <el-form-item :label-width="formLabelWidth">
              <el-select
                v-show="userDisplay"
                v-model="form.指定人员"
                placeholder="请选择"
                clearable
                multiple
                filterable
                @change="designatedPersonnel"
                style="width:100%"
              >
                <el-option
                  v-for="item in personOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="{ value: item.id, label: item.name }"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card
        v-show="taskAllocationHidden"
        shadow="never"
        style="margin-top: 1%;height:0 auto"
      >
        任务分配
        <el-row :gutter="24" style="margin-top: 1%">
          <el-col :span="12">
            <el-form-item label="分配方式" :label-width="formLabelWidth">
              <el-select
                v-model="form.分配方式"
                @change="distributionMode"
                style="width:100%"
              >
                <el-option
                  v-for="item in taskAllocationOptions"
                  :key="item.value"
                  :label="item"
                  :value="item"
                >
                </el-option
              ></el-select>
            </el-form-item>
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :label="domain.label"
              :key="domain.id"
              :label-width="formLabelWidth"
            >
              <el-select
                placeholder="请选择"
                v-model="pointPerson[index]"
                @change="changeTypeHidden"
                style="width:100%"
                multiple
              >
                <el-option
                  v-for="item in testData"
                  :key="item.value"
                  :label="item.label"
                  v-show="item.isSelected"
                  :value="{
                    value: item.value,
                    label: item.label,
                    isSelected: item.isSelected
                  }"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-card
        shadow="never"
        v-show="this.$store.getters.id_二级部门 == 0"
        style="margin-top: 1%;height:0 auto"
      >
        <el-row style="margin-top: 1%" :gutter="24">
          <el-col :span="24">
            <el-form-item label="涵盖单位选择" label-width="98px">
              <el-select
                placeholder="请选择涵盖单位,默认为全部"
                style="width:100%"
                clearable
                multiple
                filterable
                @change="changeSchool"
                v-model="schooljyj"
              >
                <el-option
                  v-for="item in schoolOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="{ value: item.id, label: item.name }"
                  size="medium"
                ></el-option>
              </el-select> </el-form-item></el-col
        ></el-row>
        <el-row style="margin-top: 1%" :gutter="24"
          ><el-col :span="24">
            <el-form-item label="资产分类选择" label-width="98px">
              <el-select
                style="width: 100%"
                placeholder="请选择资产分类,默认为全部"
                clearable
                v-model="categoryjyj"
                multiple
                filterable
                @change="changeCategory"
              >
                <el-option
                  v-for="item in categoryOptions"
                  :key="item.value"
                  :label="item.categoryname"
                  :disabled="item.id == 1 || item.id == 6"
                  :value="{ value: item.id, label: item.categoryname }"
                  size="medium"
                >
                </el-option>
              </el-select> </el-form-item></el-col
        ></el-row>
      </el-card>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <el-button
        v-show="this.$store.getters.id_二级部门 != 0"
        type="primary"
        class="el-icon-check"
        @click="submit('ruleForm')"
      >
        提 交</el-button
      >
      <el-button
        v-show="this.$store.getters.id_二级部门 == 0"
        type="primary"
        class="el-icon-check"
        @click="jyjsubmit('ruleForm')"
      >
        提 交</el-button
      >
      <el-button class="el-icon-close" @click="cancel"> 取 消</el-button>
    </div>
  </div>
  <!-- </el-dialog> -->
</template>

<script>
import {
  get_allcategoryname,
  create_inventorytask,
  create_inventorysendtask,
  create_educationtask
} from "@/api/inventoryhandle";
import { get_departmentall } from "@/api/syshandle";
import AssteSort from "@/bitcomponents/assteSort"; //资产分类
import {
  get_storagelocation,
  get_allschooldepartment,
  get_schoolresponseperson
} from "@/api/assetaccounthandle";
export default {
  components: { AssteSort },
  data() {
    return {
      categoryjyj: "",
      schooljyj: [],
      // value: [],
      pickerOptions: {
        disabledDate(v) {
          return v.getTime() < new Date().getTime() - 86400000;
        }
      },
      dynamicValidateForm: {
        domains: []
      },
      testData: [], //动态创建的下拉数组
      pointPerson: {}, //匹配
      centerArray: [], //中间数组,选中的会插入此数组中
      // dialogTitle: "",
      // dialogVisible: false,
      formLabelWidth: "80px",
      labelPosition: "left",
      form: {
        盘点方式: ["扫码盘点", "拍照盘点", "批量盘点"],
        盘点范围: "全部",
        任务名称: "",
        时间: [],
        负责人: "",
        指定人员: "",
        备注: "",
        radio: ""
      },
      options: [],
      value: "",
      belongpartOptions: [], //归属部门
      addressOptions: [], //存放地点
      addressOption_a: [], //存放地点
      personOptions: [], //负责人
      categoryOptions: [], //资产分类
      choseCategoryOptions: [], //选中资产分类
      choseDepartmentOptions: [], //选中归属部门
      choseAddressOptions: [], //选中存放地点
      chosePersonOptions: [], //选中负责人
      taskAllocationOptions: [],
      schoolOptions: [],
      chooseSchoolOptions: [],
      props: {
        children: "children",
        label: "name",
        value: "id",
        multiple: true
        // checkStrictly: true
        // emitPath: false
      },
      hidenOne: false,
      hidenDepartment: false,
      hidenPerson: false,
      userDisplay: false,
      hidenPersonFinger: false,
      taskAllocation: false,
      hiddenArea: false, //盘点范围
      taskAllocationHidden: false, //指定人员任务分配
      distributionType: "", //任务分配方式
      rules: {
        任务名称: [
          { required: true, message: "请输入任务名称", trigger: "blur" }
        ],
        radio: [
          { required: true, message: "请选择盘点人员", trigger: "change" }
        ],
        时间: [{ required: true, message: "请选择日期", trigger: "change" }]
      }
    };
  },
  methods: {
    changeSchool(val) {
      // console.log(val);
      this.chooseSchoolOptions = val;
    },
    cancel() {
      // 调用全局挂载的方法,关闭当前标签页
      this.$store.dispatch("tagsView/delView", this.$route);
      // 返回上一步路由
      this.$router.go(-1);
    },
    //打开创建窗口清空所有数据
    clearAllInfo(ruleForm) {
      this.hiddenArea = false;
      this.testData = [];
      this.pointPerson = {};
      this.dynamicValidateForm.domains = [];
      this.form.指定人员 = [];
      this.userDisplay = false;
      this.taskAllocationHidden = false;
      if (this.$refs[ruleForm] !== undefined) {
        this.$refs[ruleForm].resetFields();
      }
    },
    //指定人员分配类别下拉选中后隐藏选中的
    changeTypeHidden(row) {
      // 选中集合
      let chosedOption = [];
      // 选中集合ID
      let chosedIDOption = [];
      // 取消选择的集合
      let testDataIDOption = [];
      // //选中的分类放到选中数组中
      // for (let j in this.pointPerson) {
      //   chosedOption.push(this.pointPerson[j]);
      // }
      //获取选中的选项下标并隐藏该选项
      for (let i in row) {
        let index = this.testData.findIndex(function(obj) {
          return obj.label == row[i].label;
        });
        this.testData[index].isSelected = false;
      }
      //选项取消的要将 isSelected 改成 true 呈现在页面上
      for (let i in this.testData) {
        testDataIDOption.push(this.testData[i].value);
      }
      for (let i in this.pointPerson) {
        for (let j in this.pointPerson[i]) {
          //选中ID
          chosedIDOption.push(this.pointPerson[i][j].value);
        }
      }
      //获取差集
      let diff = testDataIDOption.filter(function(val) {
        return chosedIDOption.indexOf(val) === -1;
      });
      //修改显示隐藏
      for (let i in this.testData) {
        for (let l in diff) {
          if (diff[l] == this.testData[i].value) {
            this.testData[i].isSelected = true;
          }
        }
      }
    },
    // 选择分配方式
    distributionMode(val) {
      this.pointPerson = {};
      if (val == "按资产分类") {
        this.distributionType = "资产分类";
        this.testData = this.choseCategoryOptions;
      } else if (val == "按存放地点") {
        this.distributionType = "存放地点";
        this.testData = this.choseAddressOptions;
      } else if (val == "按归属部门") {
        this.distributionType = "归属部门";
        this.testData = this.choseDepartmentOptions;
      } else if (val == "按负责人") {
        this.distributionType = "负责人";
        this.testData = this.chosePersonOptions;
      }
      //将隐藏的显示出来
      for (let i in this.testData) {
        this.testData[i].isSelected = true;
      }
      // console.log("看一下下拉:", this.testData);
      // this.testData = console.log(this.testData);
    },
    //分配任务去重
    unique(arr) {
      return Array.from(new Set(arr));
    },
    //选择指定人员
    designatedPersonnel(rows) {
      // console.log(rows);
      if (rows.length > 0) {
        this.taskAllocationHidden = true;
      } else {
        this.taskAllocationHidden = false;
      }
      for (let i in rows) {
        this.dynamicValidateForm.domains.push({
          用户: rows[i].label,
          用户ID: rows[i].value
        });
      }
      var temp = {};
      var result = [];
      //数组去重
      this.dynamicValidateForm.domains.map(function(item, index) {
        if (!temp[item.用户ID]) {
          result.push(item);
          temp[item.用户ID] = true;
        }
      });
      //如果选项取消了要从中去掉
      // const newArr = obj.filter(item => ary.includes(item.id);
      const newArr = rows.filter(x => {
        return this.dynamicValidateForm.domains.some(y => {
          return x.value == y.用户ID;
        });
      });
      this.dynamicValidateForm.domains = newArr;
      this.unique(this.dynamicValidateForm.domains);
      this.taskAllocationOptions = this.unique(this.taskAllocationOptions);
    },
    clearSomething() {
      //清空分配方式下拉
      this.form.分配方式 = "";
      //清空人员分配方式下拉
      this.testData = [];
      //清空分配方式,此字段只作为调用api时使用
      this.distributionType = "";
    },
    //选择资产分类
    changeCategory(val) {
      //为选中的选项赋值isSelected = true,控制下拉的显隐性字段
      for (let i in val) {
        val[i].isSelected = true;
      }
      this.choseCategoryOptions = val;
      if (val.length == 0) {
        //获取数组下标并删除
        let index = this.taskAllocationOptions.findIndex(function(obj) {
          return obj == "按资产分类";
        });
        this.taskAllocationOptions.splice(index, 1);
      } else {
        this.taskAllocationOptions.push("按资产分类");
        //去重再赋值
        // this.taskAllocationOptions = this.unique(this.taskAllocationOptions);
      }
      //去重再赋值
      this.taskAllocationOptions = this.unique(this.taskAllocationOptions);
      //清空分配方式下拉,清空人员分配方式下拉
      this.clearSomething();
    },
    //选择存放地点
    changeAddress(val) {
      // console.log(val);
      let addressArray = [];
      for (let i in val) {
        let result = this.addressOption_a.find(item => {
          return item.id == val[i][1];
        });
        let col = {
          label: result.name,
          value: result.id
        };
        addressArray.push(col);
      }
      //为选中的选项赋值isSelected = true,控制下拉的显隐性字段
      for (let i in val) {
        val[i].isSelected = true;
      }
      // console.log("地点:", addressArray);
      // this.choseAddressOptions = val;
      this.choseAddressOptions = addressArray;
      if (val.length == 0) {
        //获取数组下标并删除
        let index = this.taskAllocationOptions.findIndex(function(obj) {
          return obj == "按存放地点";
        });
        this.taskAllocationOptions.splice(index, 1);
      } else {
        this.taskAllocationOptions.push("按存放地点");

        // this.taskAllocationOptions = this.unique(this.taskAllocationOptions);
      }
      //去重再赋值
      this.taskAllocationOptions = this.unique(this.taskAllocationOptions);
      //清空分配方式下拉,清空人员分配方式下拉
      this.clearSomething();
    },
    //选择归属部门禁用负责人
    changeDepartment(val) {
      // console.log(val);
      //为选中的选项赋值isSelected = true,控制下拉的显隐性字段
      for (let i in val) {
        val[i].isSelected = true;
      }
      this.choseDepartmentOptions = val;
      if (val.length == 0) {
        this.hidenPerson = false;
      } else {
        this.form.负责人 = "";
        this.taskAllocationOptions.push("按归属部门");
        // //去重再赋值
        // this.taskAllocationOptions = this.unique(this.taskAllocationOptions);
        this.hidenPerson = true;
      }
      //去重再赋值
      this.taskAllocationOptions = this.unique(this.taskAllocationOptions);
      //清空分配方式下拉,清空人员分配方式下拉
      this.clearSomething();
    },
    //选择负责人禁用归属部门
    handlePerson(val) {
      //为选中的选项赋值isSelected = true,控制下拉的显隐性字段
      for (let i in val) {
        val[i].isSelected = true;
      }
      this.chosePersonOptions = val;
      if (val.length == 0) {
        this.hidenDepartment = false;
      } else {
        this.form.归属部门 = "";
        this.hidenDepartment = true;
        this.taskAllocationOptions.push("按负责人");
      }
      this.taskAllocationOptions = this.unique(this.taskAllocationOptions);
      //清空分配方式下拉,清空人员分配方式下拉
      this.clearSomething();
    },
    // 存放地点
    getStorageLocation() {
      this.addressOptions = [];
      var data = { departmentwo: this.$store.getters.id_二级部门 };
      get_storagelocation(data).then(res => {
        // console.log("存放地点", res);
        let schoolarray = [];
        // if (res.code == 100) {
        //   for (let i in res.data[0].children) {
        //     schoolarray.push(res.data[0].children[i]);
        //   }
        //   this.addressOptions = schoolarray;
        // }
        if (res.code == 100) {
          this.addressOptions = res.data;
          for (let i in res.data[0].children) {
            schoolarray.push(res.data[0].children[i]);
          }
          this.addressOption_a = schoolarray;
        }
      });
    },
    // 归属部门
    getAllSchoolDepartment() {
      this.belongpartOptions = [];
      var data = {
        departmentwo: this.form.查询范围
      };
      get_allschooldepartment(data).then(res => {
        this.belongpartOptions = res.data;
      });
    },
    // 修改盘点范围
    updateArea(val) {
      if (val == "自定义") {
        this.hiddenArea = true;
      } else {
        this.form.资产分类 = [];
        this.form.存放地点 = [];
        this.form.归属部门 = [];
        this.form.负责人 = [];
        this.hiddenArea = false;
      }
      // this.getAllDepartmentPeople(); //查询负责人
      // this.getAllcategory(); //查询负责人
      // this.getAllSchoolDepartment(); //查询归属部门
      // this.getStorageLocation(); //存放地点
    },
    // 指定人员选择
    userRadio(val) {
      // 选择指定人员必须选择盘点范围
      if (
        val == "指定人员" &&
        this.choseCategoryOptions.length == 0 &&
        this.choseDepartmentOptions.length == 0 &&
        this.choseAddressOptions.length == 0 &&
        this.chosePersonOptions.length == 0
      ) {
        this.form.radio = "";
        this.$message.warning("未选择盘点范围,无法指定人员!");
        return;
      }
      if (val == "指定人员") {
        this.userDisplay = true;
        // this.taskAllocationHidden = true;
      } else {
        this.userDisplay = false;
        // this.taskAllocationHidden = false;
      }
    },
    //创建教育局盘点
    jyjsubmit(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          let pointpeople = 0;
          let pointpeopleName = "";
          if (this.form.radio == "各负责人") {
            pointpeople = 1;
            pointpeopleName = "各负责人";
          } else if (this.form.radio == "管理员") {
            pointpeople = 2;
            pointpeopleName = "管理员";
          } else if (this.form.radio == "各单位自行分配") {
            pointpeople = 3;
            pointpeopleName = "各单位自行分配";
          }
          let choseCategoryArray = [];
          let choseSchoolArray = [];
          let choseSchoolIDArray = [];
          if (this.choseCategoryOptions.length != 0) {
            for (let i in this.choseCategoryOptions) {
              choseCategoryArray.push(this.choseCategoryOptions[i].value);
            }
          }
          // console.log(this.schoolOptions);
          // if (this.chooseSchoolOptions.length == 0) {
          //   for (let i in this.schoolOptions) {
          //     choseSchoolArray.push(this.schoolOptions[i].name);
          //   }
          // } else
          if (this.chooseSchoolOptions.length != 0) {
            for (let i in this.chooseSchoolOptions) {
              choseSchoolArray.push(this.chooseSchoolOptions[i].label);
              choseSchoolIDArray.push(this.chooseSchoolOptions[i].value);
            }
            // for (let i in this.chooseSchoolOptions) {
            //   choseSchoolArray.push(this.chooseSchoolOptions[i].label);
            // }
          }
          //全屏加载
          const loading = this.$loading({
            lock: true,
            text: "加载中......",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          let reqdata = {
            任务名称: this.form.任务名称,
            开始时间: this.form.时间[0],
            结束时间: this.form.时间[1],
            盘点方式: this.form.盘点方式.toString(),
            备注: this.form.备注,
            盘点人员: pointpeople,
            盘点人员名称: pointpeopleName,
            盘点单位: choseSchoolArray.toString(),
            盘点类别: choseCategoryArray.toString(),
            一级机构ID: this.$store.getters.id_一级部门
          };
          // console.log("教育局:", reqdata);
          // return;
          create_educationtask(reqdata)
            .then(res => {
              if (res.code == 100) {
                // console.log(res);
                loading.close();
                // this.dialogVisible = false;
                // this.$emit("Refresh");
                this.$message.success("盘点任务创建成功!");
                // 调用全局挂载的方法,关闭当前标签页
                this.$store.dispatch("tagsView/delView", this.$route);
                // 返回上一步路由
                this.$router.go(-1);
              }
            })
            .catch(error => {
              loading.close();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //创建盘点
    submit(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          var pointArray = []; //分配任务请求数组
          if (this.form.radio == "指定人员") {
            // console.log(this.form.分配方式);
            if (this.form.分配方式 == "") {
              this.$message.warning("请选择分配方式!");
              return;
            }

            //判断是否指定的人员都有任务
            if (
              Object.keys(this.pointPerson).length !=
              this.dynamicValidateForm.domains.length
            ) {
              this.$message.warning(
                "选择的指定人员有人未分配到盘点任务,请合理安排盘点任务!"
              );
              return;
            }
            for (let i in this.testData) {
              if (this.testData[i].isSelected == true) {
                this.$message.warning("有盘点范围未分配给指定人员!");
                return;
              }
            }
          }
          // console.log(this.dynamicValidateForm.domains);
          // console.log(this.dynamicValidateForm.domains.length);
          // console.log(this.testData);
          // console.log(this.testData.length);
          // return;
          let pointpeople = 0;
          if (this.form.radio == "各负责人") {
            pointpeople = 1;
          } else if (this.form.radio == "管理员") {
            pointpeople = 2;
          } else if (this.form.radio == "指定人员") {
            pointpeople = 3;
          }
          let choseCategoryArray = [];
          let choseDepartmentArray = [];
          let choseAddressArray = [];
          let chosePersonArray = [];
          if (this.choseCategoryOptions.length != 0) {
            for (let i in this.choseCategoryOptions) {
              choseCategoryArray.push(this.choseCategoryOptions[i].value);
            }
          }
          if (this.choseDepartmentOptions.length != 0) {
            for (let i in this.choseDepartmentOptions) {
              choseDepartmentArray.push(this.choseDepartmentOptions[i].value);
            }
          }
          if (this.choseAddressOptions.length != 0) {
            for (let i in this.choseAddressOptions) {
              choseAddressArray.push(this.choseAddressOptions[i].value);
            }
          }
          if (this.chosePersonOptions.length != 0) {
            for (let i in this.chosePersonOptions) {
              chosePersonArray.push(this.chosePersonOptions[i].value);
            }
          }
          // console.log(this.pointPerson);//1
          // console.log(this.dynamicValidateForm.domains); //2
          let reqdata = {
            任务名称: this.form.任务名称,
            开始时间: this.form.时间[0],
            结束时间: this.form.时间[1],
            盘点方式: this.form.盘点方式.toString(),
            发布人: this.$store.getters.id_用户,
            一级机构ID: this.$store.getters.id_一级部门,
            二级机构ID: this.$store.getters.id_二级部门,
            三级机构ID: this.$store.getters.id_三级部门,
            发布时间: this.dayjs().format("YYYY-MM-DD HH:mm:ss"),
            发布方: this.$store.getters.二级部门名称,
            备注: this.form.备注
          };
          //全屏加载
          const loading = this.$loading({
            lock: true,
            text: "加载中......",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          // 创建盘点;
          create_inventorytask(reqdata)
            .then(response => {
              if (response.code == 100) {
                // console.log(response);
                //调用任务分配创建
                if (this.form.radio == "指定人员") {
                  //将选定人和选定人分配的任务合在一起
                  for (let i in this.dynamicValidateForm.domains) {
                    //定义一个数组,将选中的范围的id存到数组中
                    var taskArray = [];
                    //循环之后存到选定人的数组中,方便api取值
                    for (let j in this.pointPerson[i]) {
                      taskArray.push(this.pointPerson[i][j].value);
                    }
                    this.dynamicValidateForm.domains[
                      i
                    ].Inventory = taskArray.toString(); //定义的分配任务盘点范围的id级为Inventory
                  }
                  for (let i in this.dynamicValidateForm.domains) {
                    let setTest = {
                      id: response.data,
                      一级机构ID: this.$store.getters.id_一级部门,
                      二级机构ID: this.$store.getters.id_二级部门,
                      三级机构ID: this.$store.getters.id_三级部门,
                      盘点指定人员: pointpeople, //1 各负责人 2 管理员 3 指定人员
                      盘点一级类别ID: choseCategoryArray.toString(),
                      盘点一级存放地点: choseAddressArray.toString(),
                      盘点三级部门ID: choseDepartmentArray.toString(),
                      盘点负责人ID: chosePersonArray.toString(),
                      盘点分配方式: this.distributionType, //指定人员
                      分配人员ID: this.dynamicValidateForm.domains[i].value, //指定人员
                      分配数据名称: this.dynamicValidateForm.domains[i]
                        .Inventory //指定人员
                    };
                    pointArray.push(setTest);
                  }
                } else {
                  if (this.form.盘点范围 == "全部") {
                    let setTest = {
                      id: response.data,
                      一级机构ID: this.$store.getters.id_一级部门,
                      二级机构ID: this.$store.getters.id_二级部门,
                      三级机构ID: this.$store.getters.id_三级部门,
                      盘点指定人员: pointpeople, //1 各负责人 2 管理员 3 指定人员
                      盘点一级类别ID: "",
                      盘点一级存放地点: "",
                      盘点三级部门ID: "",
                      盘点负责人ID: "",
                      盘点分配方式: this.distributionType, //指定人员
                      分配人员ID: 0, //指定人员
                      分配数据名称: "" //指定人员
                    };
                    pointArray.push(setTest);
                  } else {
                    let setTest = {
                      id: response.data,
                      一级机构ID: this.$store.getters.id_一级部门,
                      二级机构ID: this.$store.getters.id_二级部门,
                      三级机构ID: this.$store.getters.id_三级部门,
                      盘点指定人员: pointpeople, //1 各负责人 2 管理员 3 指定人员
                      盘点一级类别ID: choseCategoryArray.toString(),
                      盘点一级存放地点: choseAddressArray.toString(),
                      盘点三级部门ID: choseDepartmentArray.toString(),
                      盘点负责人ID: chosePersonArray.toString(),
                      盘点分配方式: this.distributionType, //指定人员
                      分配人员ID: 0, //指定人员
                      分配数据名称: "" //指定人员
                    };
                    pointArray.push(setTest);
                  }
                }
                create_inventorysendtask(pointArray)
                  .then(res => {
                    if (res.code == 100) {
                      // console.log(res);
                      loading.close();
                      // this.dialogVisible = false;
                      // this.$emit("Refresh");
                      this.$message.success("盘点任务创建成功!");
                      // 调用全局挂载的方法,关闭当前标签页
                      this.$store.dispatch("tagsView/delView", this.$route);
                      // 返回上一步路由
                      this.$router.go(-1);
                    }
                  })
                  .catch(error => {});
                loading.close();
              }
            })
            .catch(error => {
              console.error(error);
              loading.close();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getAllDepartmentPeople() {
      this.personOptions = [];
      get_schoolresponseperson({
        departmentone: this.$store.getters.id_一级部门,
        departmentwo: this.$store.getters.id_二级部门
      })
        .then(response => {
          this.personOptions = response.data[0].children2;
        })
        .catch(error => {});
    },
    getAllcategory() {
      this.categoryOptions = [];
      get_allcategoryname()
        .then(response => {
          // console.log(response.data);
          this.categoryOptions = response.data;
        })
        .catch(error => {});
    },
    onload() {
      this.getAllDepartmentPeople(); //查询负责人
      this.getAllcategory(); //查询负责人
      this.getAllSchoolDepartment(); //查询归属部门
      this.getStorageLocation(); //存放地点
      if (this.$store.getters.id_二级部门 == 0) {
        get_departmentall().then(response => {
          let schoolarray = [];
          if (response.code == 100) {
            for (let i in response.data[0].children) {
              schoolarray.push(response.data[0].children[i]);
            }
            this.schoolOptions = schoolarray;
          }
        });
      }
    }
  },
  beforeMount() {
    let row = this.$route.params.rows;
    let state = this.$route.params.state;
    // console.log(row);
    // console.log(state);
    // this.$refs.AddCheck.hiddenArea = true;
    // this.$router.push({ name: "createCheck" });
    // this.dialogTitle = "清查盘点-创建任务";
    if (state != "分配任务") {
      this.clearAllInfo("ruleForm");
    }
    this.onload();
    // this.dialogVisible = true;
  }
};
</script>

<style lang="scss" scoped>
/* // .assssaa {
//   border: 1px solid red;
// } */
// ::v-deep .el-input--small .el-input__inner {
//   border-radius: 16px;
//   padding-right: 32px;
//   background: rgba(9, 233, 128, 0.2);
//   border: none;
// }

/* // .el-checkbox__input {
//   display: none;
// }*/
// ::v-deep .assssaa {
//   .el-cascader__dropdown .el-cascader-menu:first-child .el-cascader-node label {
//     display: none;
//   }
// }
</style>
