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
          <el-col :span="8">
            <el-form-item label="任务名称" :label-width="formLabelWidth">
              <el-input
                class="input"
                readonly
                v-model="form.任务名称"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始日期" label-width="70px">
              <el-input
                class="input"
                v-model="form.开始时间"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="截止日期" label-width="70px">
              <el-input
                class="input"
                v-model="form.结束时间"
                readonly
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col>
            <el-form-item label="备注信息" :label-width="formLabelWidth">
              <el-input v-model="form.备注" type="textarea" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-card>
      <el-row style="margin-top: 1%">
        <el-col>
          <el-card shadow="never">
            <el-form-item label="盘点方式" :label-width="formLabelWidth">
              <el-checkbox-group v-model="form.盘点方式">
                <el-checkbox label="扫码盘点" disabled></el-checkbox>
                <el-checkbox label="拍照盘点" disabled></el-checkbox>
                <el-checkbox label="批量盘点" disabled></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-card>
        </el-col>
      </el-row>

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
                <el-radio label="指定人员">指定人员</el-radio>
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
                disabled
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
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <el-button
        type="primary"
        class="el-icon-check"
        @click="submit('ruleForm')"
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
  create_inventorysendtask,
  updateset_inventorytask
} from "@/api/inventoryhandle";
import AssteSort from "@/bitcomponents/assteSort"; //资产分类
import { get_schoolresponseperson } from "@/api/assetaccounthandle";
export default {
  components: { AssteSort },
  data() {
    return {
      dynamicValidateForm: {
        domains: []
      },
      testData: [], //动态创建的下拉数组
      pointPerson: {}, //匹配
      formLabelWidth: "80px",
      labelPosition: "left",
      form: {
        盘点方式: "",
        任务名称: "",
        负责人: "",
        指定人员: "",
        备注: "",
        radio: ""
      },
      value: "",
      jyjtype: "",
      personOptions: [], //负责人
      categoryOptions: [], //资产分类
      choseCategoryOptions: [], //选中资产分类
      choseDepartmentOptions: [], //选中归属部门
      choseAddressOptions: [], //选中存放地点
      chosePersonOptions: [], //选中负责人
      taskAllocationOptions: [],
      userDisplay: false,
      taskAllocationHidden: false, //指定人员任务分配
      distributionType: "", //任务分配方式
      rules: {
        radio: [
          { required: true, message: "请选择盘点人员", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    cancel() {
      // 调用全局挂载的方法,关闭当前标签页
      this.$store.dispatch("tagsView/delView", this.$route);
      // 返回上一步路由
      this.$router.go(-1);
    },
    // //打开创建窗口清空所有数据
    // clearAllInfo(ruleForm) {
    //   this.pointPerson = {};
    //   this.dynamicValidateForm.domains = [];
    //   this.form.指定人员 = [];
    //   this.userDisplay = false;
    //   this.taskAllocationHidden = false;
    //   if (this.$refs[ruleForm] !== undefined) {
    //     this.$refs[ruleForm].resetFields();
    //   }
    // },
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
      //   this.pointPerson = {};
      //   if (val == "按资产分类") {
      //     this.distributionType = "资产分类";
      //     this.testData = this.choseCategoryOptions;
      //   } else if (val == "按存放地点") {
      //     this.distributionType = "存放地点";
      //     this.testData = this.choseAddressOptions;
      //   } else if (val == "按归属部门") {
      //     this.distributionType = "归属部门";
      //     this.testData = this.choseDepartmentOptions;
      //   } else if (val == "按负责人") {
      //     this.distributionType = "负责人";
      //     this.testData = this.chosePersonOptions;
      //   }
      //   //将隐藏的显示出来
      //   for (let i in this.testData) {
      //     this.testData[i].isSelected = true;
      //   }
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
        // this.taskAllocationHidden = true;
      } else {
        // this.taskAllocationHidden = false;
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
    // 指定人员选择
    userRadio(val) {
      if (val == "指定人员") {
        this.getAllcategory(this.jyjtype);
        this.testData = [];
        this.pointPerson = {};
        this.personOptions = [];
        this.form.指定人员 = "";
        this.dynamicValidateForm.domains = [];
        this.userDisplay = true;
        this.taskAllocationHidden = true;
        this.getAllDepartmentPeople(); //查询负责人
      } else {
        this.userDisplay = false;
        this.taskAllocationHidden = false;
      }
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
            for (let i in this.pointPerson) {
              if (this.pointPerson[i].length == 0) {
                this.$message.warning(
                  "选择的指定人员有人未分配到盘点任务,请合理安排盘点任务!"
                );
                return;
              }
            }
          }
          //   console.log(this.dynamicValidateForm.domains);
          //   console.log(this.dynamicValidateForm.domains.length);
          //   console.log(this.testData);
          //   console.log(this.testData.length);
          //   console.log(this.pointPerson);
          //   console.log(this.pointPerson.length);
          //   return;
          let pointpeople = 0;
          if (this.form.radio == "各负责人") {
            pointpeople = 1;
          } else if (this.form.radio == "管理员") {
            pointpeople = 2;
          } else if (this.form.radio == "指定人员") {
            pointpeople = 3;
          }
          let choseCategoryArray = [];

          // console.log(this.pointPerson);//1
          // console.log(this.dynamicValidateForm.domains); //2
          let reqdata = {
            // 发布人: this.form.发布人,
            // 发布人一级机构ID: this.form.发布人一级机构ID,
            // 发布人二级机构ID: this.form.发布人二级机构ID,
            // 发布人三级机构ID: this.form.发布人三级机构ID,
            发布人: this.$store.getters.id_用户,
            发布人一级机构ID: this.$store.getters.id_一级部门,
            发布人二级机构ID: this.$store.getters.id_二级部门,
            发布人三级机构ID: this.$store.getters.id_三级部门,
            发布方: this.form.发布方,
            教育局盘点ID: this.form.教育局盘点ID,
            id: this.form.ID
          };
          // console.log("reqdata:", reqdata);
          //全屏加载
          const loading = this.$loading({
            lock: true,
            text: "加载中......",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          // 创建盘点;
          updateset_inventorytask(reqdata)
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
                      盘点一级存放地点: "",
                      盘点三级部门ID: "",
                      盘点负责人ID: "",
                      盘点分配方式: this.distributionType, //指定人员
                      分配人员ID: this.dynamicValidateForm.domains[i].value, //指定人员
                      分配数据名称: this.dynamicValidateForm.domains[i]
                        .Inventory //指定人员
                    };
                    pointArray.push(setTest);
                  }
                } else {
                  //   if (this.form.盘点范围 == "全部") {
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
                  //   } else {
                  //     let setTest = {
                  //       id: response.data,
                  //       一级机构ID: this.$store.getters.id_一级部门,
                  //       二级机构ID: this.$store.getters.id_二级部门,
                  //       三级机构ID: this.$store.getters.id_三级部门,
                  //       盘点指定人员: pointpeople, //1 各负责人 2 管理员 3 指定人员
                  //       盘点一级类别ID: choseCategoryArray.toString(),
                  //       盘点一级存放地点: choseAddressArray.toString(),
                  //       盘点三级部门ID: choseDepartmentArray.toString(),
                  //       盘点负责人ID: chosePersonArray.toString(),
                  //       盘点分配方式: this.distributionType, //指定人员
                  //       分配人员ID: 0, //指定人员
                  //       分配数据名称: "" //指定人员
                  //     };
                  //     pointArray.push(setTest);
                  //   }
                }
                // console.log("pointArray:", pointArray);
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
    getAllcategory(jyjtype) {
      // console.log(jyjtype);
      if (jyjtype == null) {
        this.categoryOptions = [];
        get_allcategoryname()
          .then(response => {
            // console.log(response.data);
            this.categoryOptions = response.data;
            for (let i in response.data) {
              if (response.data[i].id != 1 && response.data[i].id != 6) {
                this.testData.push({
                  label: response.data[i].categoryname,
                  value: response.data[i].id,
                  isSelected: true
                });
              }
            }
          })
          .catch(error => {});
      } else {
        let arrtype = (jyjtype || "").split(",");
        this.categoryOptions = [];
        get_allcategoryname()
          .then(response => {
            // console.log(response.data);
            this.categoryOptions = response.data;
            for (let i in response.data) {
              if (arrtype.length > 0) {
              }
              for (var j in arrtype) {
                if (response.data[i].id == arrtype[j]) {
                  this.testData.push({
                    label: response.data[i].categoryname,
                    value: response.data[i].id,
                    isSelected: true
                  });
                }
              }
            }
          })
          .catch(error => {});
      }
    },
    onload(jyjtype) {
      this.getAllDepartmentPeople(); //查询负责人
      this.getAllcategory(jyjtype); //查询类别
    }
  },
  created() {
    try {
      let row = JSON.parse(JSON.stringify(this.$route.params.rows));
      // console.log(row == undefined);
      this.form = row;
      if (row == undefined) {
        // 调用全局挂载的方法,关闭当前标签页
        this.$store.dispatch("tagsView/delView", this.$route);
        // 返回上一步路由
        this.$router.go(-1);
        return;
      }
      // console.log(row.盘点方式);
      if (row.盘点方式) {
        this.form.盘点方式 = (row.盘点方式.toString() || "").split(",");
      }
      this.taskAllocationOptions.push("按资产分类");
      this.form.分配方式 = "按资产分类";
      this.jyjtype = row.教育局指定类别;
      this.onload(row.教育局指定类别);
    } catch (error) {
      console.log(error);
      // 调用全局挂载的方法,关闭当前标签页
      this.$store.dispatch("tagsView/delView", this.$route);
      // 返回上一步路由
      this.$router.go(-1);
    }
    // var row = {};
    // try {
    //   row = JSON.parse(JSON.stringify(this.$route.params.rows));
    //   this.form = row;
    //   this.taskAllocationOptions.push("按资产分类");
    //   this.form.分配方式 = "按资产分类";
    //   this.jyjtype = row.教育局指定类别;
    //   this.onload(row.教育局指定类别);
    // } catch (error) {
    //   console.log(error);
    //   // 调用全局挂载的方法,关闭当前标签页
    //   this.$store.dispatch("tagsView/delView", this.$route);
    //   // 返回上一步路由
    //   this.$router.go(-1);
    // }
    // this.form.盘点方式 = (row.盘点方式.toString() || "").split(",");
    // console.log(row == undefined);
    // this.form = row;
    // if (row == undefined) {
    //   // 调用全局挂载的方法,关闭当前标签页
    //   this.$store.dispatch("tagsView/delView", this.$route);
    //   // 返回上一步路由
    //   this.$router.go(-1);
    //   return;
    // }
    // console.log(row.盘点方式);
    // if (row.盘点方式) {
    //   this.form.盘点方式 = (row.盘点方式.toString() || "").split(",");
    // }
    // try {
    //   this.taskAllocationOptions.push("按资产分类");
    //   this.form.分配方式 = "按资产分类";
    //   this.jyjtype = row.教育局指定类别;
    //   this.onload(row.教育局指定类别);
    // } catch (error) {
    //   console.log(error);
    //   // 调用全局挂载的方法,关闭当前标签页
    //   this.$store.dispatch("tagsView/delView", this.$route);
    //   // 返回上一步路由
    //   this.$router.go(-1);
    // }
  },
  beforeMount() {}
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
