<template>
  <div>
    <div style="margin: 1% 1% 0% 1%">
      <p
        style="
          text-align: center;
          font-size: 20px;
          margin-bottom: 2%;
          font-weight: 700;
        "
      >
        <el-button
          type="text"
          class="el-icon-refresh-left"
          @click="back"
          style="float: left; font-weight: 500"
        >
          返回
        </el-button>
        固定资产入库单
      </p>
      <el-form
        ref="ruleForm"
        :label-position="labelPosition"
        :rules="rules"
        :model="form"
      >
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item
              label="流程状态"
              :label-width="formLabelWidth"
              prop="remark"
            >
              <el-input
                v-model="form.流程状态"
                placeholder="请输入内容"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item
              label="申请人"
              :label-width="formLabelWidth"
              prop="remark"
            >
              <el-input
                v-model="form.申请人"
                placeholder="请输入内容"
                disabled
              ></el-input>
              <!-- {{ form.申请人 }} -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="申请日期"
              :label-width="formLabelWidth"
              prop="申请日期"
            >
              <!-- {{ form.申请日期 }} -->
              <el-date-picker
                style="width: 100%"
                disabled
                v-model="form.申请日期"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" style="margin-top: 2%">
          <el-col :span="8">
            <el-form-item
              label="取得方式"
              :label-width="formLabelWidth"
              prop="取得方式"
            >
              <el-select
                v-model="form.取得方式"
                clearable
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
            <el-form-item
              label="取得日期"
              :label-width="formLabelWidth"
              prop="取得日期"
            >
              <el-date-picker
                v-model="form.取得日期"
                type="date"
                clearable
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="备注信息"
              :label-width="formLabelWidth"
              prop="remark"
            >
              <el-input
                style="width: 100%"
                v-model="form.备注"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button
          type="text"
          class="el-icon-plus"
          style="margin-top: 1%"
          @click="addDetail"
          >添加资产</el-button
        >
        <el-table
          ref="table"
          v-loading="loading"
          :data="tableData"
          border
          stripe
          :header-cell-style="{ 'text-align': 'center', background: '#eef1f6' }"
          style="width: 100%; margin-top: 1%"
          max-height="450px"
          show-summary
          :summary-method="getSummaries"
        >
          <el-table-column v-if="false" prop="id_用户" label="id" />
          <!-- <el-table-column label="资产编号" /> -->
          <el-table-column
            label="资产分类"
            prop="资产分类"
            :show-overflow-tooltip="true"
            width="200"
          />
          <el-table-column
            label="资产名称"
            prop="资产名称"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="规格"
            prop="规格"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="型号"
            prop="型号"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="使用方向"
            prop="使用方向"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="数量(个)"
            prop="数量"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="原值"
            prop="保留原值"
            align="right"
            :show-overflow-tooltip="true"
            width="150"
          />
          <!-- <el-table-column label="保留净值" /> -->
          <el-table-column
            label="存放地点"
            prop="存放地点"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="归属部门"
            prop="归属部门"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="负责人"
            prop="负责人name"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="使用人"
            prop="使用人name"
            :show-overflow-tooltip="true"
          />
          <!-- <el-table-column label="资产状态" /> -->
          <!-- <el-table-column label="完善信息"> </el-table-column> -->
          <el-table-column label="操作">
            <!-- <i class="el-icon-remove"></i> -->
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                :disabled="!hide(scope.row)"
                @click="edit(scope.row, scope.$index)"
                >完善</el-button
              >
              <el-button
                type="text"
                size="mini"
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-row style="margin-top: 2%" :gutter="24">
          <el-col :span="6">
            <el-form-item
              label="供应商"
              :label-width="formLabelWidth"
              prop="remark"
            >
              <el-select
                v-model="form.供应商"
                filterable
                clearable
                placeholder="请选择"
                value-key="id"
                allow-create
                @change="gyschange"
              >
                <el-option
                  v-for="item in gyoptions"
                  :key="item.id"
                  :label="item.供应商名称"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="联系方式"
              :label-width="formLabelWidth"
              prop="remark"
            >
              <el-input
                style="width: 100%"
                v-model="form.联系方式"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="合同编号"
              :label-width="formLabelWidth"
              prop="remark"
            >
              <el-input
                style="width: 100%"
                v-model="form.合同编号"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="发票号"
              :label-width="formLabelWidth"
              prop="remark"
            >
              <el-input
                style="width: 100%"
                v-model="form.发票号"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center; margin: 22px 0px">
        <el-popconfirm
          title="再次确认提交"
          @confirm="btnok('ruleForm', '提交')"
          style="margin-right: 20px"
        >
          <el-button
            style="width: 10%"
            type="primary"
            class="el-icon-check"
            slot="reference"
          >
            提 交</el-button
          >
        </el-popconfirm>
        <el-popconfirm
          title="再次确认保存"
          @confirm="btnok('ruleForm', '保存')"
          style="margin-right: 20px"
        >
          <el-button
            style="width: 10%"
            class="el-icon-collection-tag"
            slot="reference"
          >
            保 存</el-button
          >
        </el-popconfirm>
        <el-popconfirm
          title="再次确认撤销"
          @confirm="btnok('ruleForm', '撤销')"
        >
          <el-button
            style="width: 10%"
            type="danger"
            class="el-icon-refresh-left"
            slot="reference"
          >
            撤 销</el-button
          >
        </el-popconfirm>
        <Addasset ref="Addasset" @putData="putData" />
        <Extend ref="Extend" @addForm="addForm" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  get_allschoolsupplier,
  insert_supplierdata,
} from "@/api/assetaccounthandle";
import Addasset from "./Addasset.vue";
import Extend from "./Extend.vue";
import {
  create_purchaseacceptance,
  create_purchaseacceptancedetail,
  saveedits_purchaseacceptancerebacksave,
  purchaseawithdrawremove,
} from "@/api/purchaseacceptancehandle";
import { get_purchaseacceptancedatadetails } from "@/api/purchaseacceptancehandle";
export default {
  components: { Addasset, Extend },
  data() {
    return {
      form: {
        申请日期: this.dayjs().format("YYYY-MM-DD"),
        申请人: this.$store.getters.姓名, // 申请人
        流程状态: "",
        流程代码: 1,
        取得日期: "",
        供应商创建: "",
        联系方式: "",
      },
      rules: {
        // 取得日期: [
        //   {
        //     required: true,
        //     message: "请选择日期",
        //     trigger: "change",
        //   },
        // ],
      },
      dialogVisible: false,
      labelPosition: "left",
      formLabelWidth: "80px",
      options: [
        {
          value: "购置",
          label: "购置",
        },
        {
          value: "无偿调入",
          label: "无偿调入",
        },
        {
          value: "接受捐赠",
          label: "接受捐赠",
        },
        {
          value: "盘盈",
          label: "盘盈",
        },
        {
          value: "自建",
          label: "自建",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],
      loading: false,
      tableData: [],
      titleDialog: "",
      gyoptions: [], //供应商
      gysid: 0,
      tableindex: 0,
    };
  },
  methods: {
    back() {
      this.$router.push({ path: "/Purchase/index" });
    },
    // 自定义合计方法
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (column.property === "保留原值") {
          const values = data.map((item) => Number(item[column.property]));
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            // sums[index] += " 元";
            sums[index] = sums[index].toFixed(2);
          } else {
            sums[index] = "N/A";
          }
        } else if (column.property === "数量") {
          const values = data.map((item) => Number(item[column.property]));
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += " 个";
          } else {
            sums[index] = "N/A";
          }
        }
      });
      return sums;
    },
    // 关闭之前
    handleClose(val) {
      if (this.tableData.length == 0 || this.form.id != undefined) {
        this.dialogVisible = false;
      } else {
        this.$confirm("是否保存", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.btnok("ruleForm", "保存");
          })
          .catch(() => {
            // this.dialogVisible = false;
          });
      }
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    addForm(val) {
      // var row = JSON.parse(JSON.stringify(val));
      this.tableData[this.tableindex] = val;
      // console.log(this.tableData);
    },
    // 再一次编辑
    onemoretime(val) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });

      get_purchaseacceptancedatadetails({ ID: this.form.id }).then((res) => {
        for (var i in res.data) {
          res.data[i].资产分类 =
            res.data[i].一级分类名称 +
            "/" +
            res.data[i].二级分类名称 +
            "/" +
            res.data[i].三级分类名称 +
            "/" +
            res.data[i].四级分类名称;
        }
        this.tableData = res.data;
        // console.log(" this.tableData", this.tableData);
        setTimeout(() => {
          loading.close();
          this.dialogVisible = true;
        }, 200);
      });
    },
    // 找供应商
    selectgys(val) {
      if (val == 0) {
        this.form.供应商 = "";
      }
      for (var i in this.gyoptions) {
        if (this.gyoptions[i].id == val) {
          this.form.供应商 = this.gyoptions[i];
        }
      }
    },
    // 提交
    btnok(form, str) {
      if (str == "撤销") {
        let data = {
          flowId: this.form.id,
          applicantId: this.$store.getters.id_用户,
          departmenttwo: this.$store.getters.id_二级部门,
        };
        purchaseawithdrawremove(data).then((res) => {
          this.alter_box(res.code, "撤销成功");
        //   this.dialogVisible = false;
          this.$emit("onload");
          this.$router.push({ path: "/Purchase/index" });
        });
      } else {
      this.$refs[form].validate((valid) => {
        if (valid) {
          if (this.form.取得方式 == "" || this.form.取得方式 == undefined) {
            this.msg("警告", "请选择取得方式!");
            return;
          }
          if (this.form.取得日期 == "" || this.form.取得日期 == undefined) {
            this.msg("警告", "请选择取得日期!");
            return;
          }
          if (this.tableData.length == 0) {
            this.msg("警告", "请添加资产!");
            return;
          }
          for (var i in this.tableData) {
            if (this.tableData[i].车架号 == null) {
              this.tableData[i].车架号 = "";
            }
            if (this.tableData[i].车牌号 == null) {
              this.tableData[i].车牌号 = "";
            }
            if (this.tableData[i].车辆产地 == null) {
              this.tableData[i].车辆产地 = "";
            }
            if (this.tableData[i].车辆用途 == null) {
              this.tableData[i].车辆用途 = "";
            }
            if (this.tableData[i].生产厂家 == null) {
              this.tableData[i].生产厂家 = "";
            }
            if (this.tableData[i].发动机号 == null) {
              this.tableData[i].发动机号 = "";
            }
            if (this.tableData[i].排气量 == null) {
              this.tableData[i].排气量 = "";
            }
            if (this.tableData[i].拓展备注 == null) {
              this.tableData[i].拓展备注 = "";
            }
            if (this.tableData[i].文物等级 == null) {
              this.tableData[i].文物等级 = "";
            }
            if (this.tableData[i].落成年代 == null) {
              this.tableData[i].落成年代 = "";
            }
            if (this.tableData[i].来源地 == null) {
              this.tableData[i].来源地 = "";
            }
            if (this.tableData[i].坐标位置 == null) {
              this.tableData[i].坐标位置 = "";
            }
            if (this.tableData[i].丘号 == null) {
              this.tableData[i].丘号 = "";
            }
            if (this.tableData[i].权属证号 == null) {
              this.tableData[i].权属证号 = "";
            }
            if (this.tableData[i].土地来源 == null) {
              this.tableData[i].土地来源 = "";
            }
            if (this.tableData[i].发证日期 == null) {
              this.tableData[i].发证日期 = "";
            }
            if (this.tableData[i].权属性质 == null) {
              this.tableData[i].权属性质 = "";
            }
            if (this.tableData[i].证载面积 == null) {
              this.tableData[i].证载面积 = "";
            }
            if (this.tableData[i].在用面积 == null) {
              this.tableData[i].在用面积 = "";
            }
            if (this.tableData[i].出租出借面积 == null) {
              this.tableData[i].出租出借面积 = "";
            }
            if (this.tableData[i].毁损待报废面积 == null) {
              this.tableData[i].毁损待报废面积 = "";
            }
            if (this.tableData[i].对外投资面积 == null) {
              this.tableData[i].对外投资面积 = "";
            }
            if (this.tableData[i].担保面积 == null) {
              this.tableData[i].担保面积 = "";
            }
            if (this.tableData[i].闲置面积 == null) {
              this.tableData[i].闲置面积 = "";
            }
            if (this.tableData[i].其他面积 == null) {
              this.tableData[i].其他面积 = "";
            }
            if (this.tableData[i].坐落位置 == null) {
              this.tableData[i].坐落位置 = "";
            }
            if (this.tableData[i].建筑结构 == null) {
              this.tableData[i].建筑结构 = "";
            }
            if (this.tableData[i].施工单位 == null) {
              this.tableData[i].施工单位 = "";
            }
            if (this.tableData[i].权属证号 == null) {
              this.tableData[i].权属证号 = "";
            }
            if (this.tableData[i].证载面积 == null) {
              this.tableData[i].证载面积 = "";
            }
            if (this.tableData[i].建筑面积 == null) {
              this.tableData[i].建筑面积 = "";
            }
            if (this.tableData[i].在用面积 == null) {
              this.tableData[i].在用面积 = "";
            }
            if (this.tableData[i].出租出借面积 == null) {
              this.tableData[i].出租出借面积 = "";
            }
            if (this.tableData[i].对外投资面积 == null) {
              this.tableData[i].对外投资面积 = "";
            }
            if (this.tableData[i].其他面积 == null) {
              this.tableData[i].其他面积 = "";
            }
            if (this.tableData[i].栋号 == null) {
              this.tableData[i].栋号 = "";
            }
            if (this.tableData[i].楼层数 == null) {
              this.tableData[i].楼层数 = "";
            }
            if (this.tableData[i].竣工日期 == null) {
              this.tableData[i].竣工日期 = "";
            }
            if (this.tableData[i].发证日期 == null) {
              this.tableData[i].发证日期 = "";
            }
            if (this.tableData[i].占地面积 == null) {
              this.tableData[i].占地面积 = "";
            }
            if (this.tableData[i].使用面积 == null) {
              this.tableData[i].使用面积 = "";
            }
            if (this.tableData[i].闲置面积 == null) {
              this.tableData[i].闲置面积 = "";
            }
            if (this.tableData[i].毁损待报废面积 == null) {
              this.tableData[i].毁损待报废面积 = "";
            }
            if (this.tableData[i].担保面积 == null) {
              this.tableData[i].担保面积 = "";
            }
            if (this.tableData[i].占地面积 == null) {
              this.tableData[i].占地面积 = "";
            }
          }

          this.form.申请人ID = this.$store.getters.id_用户;
          this.form.申请人 = this.$store.getters.姓名;
          this.form.一级机构ID = this.$store.getters.id_一级部门;
          this.form.二级机构ID = this.$store.getters.id_二级部门;
          this.form.申请机构名称 = this.$store.getters.二级部门名称;
          if (str == "提交") {
            this.form.流程代码 = 1;
          } else if (str == "保存") {
            this.form.流程代码 = 2;
          }
          this.form.购置方式 = this.form.取得方式;
          if (this.form.供应商创建 == "是") {
            var data = {
              一级机构Id: this.$store.getters.id_一级部门,
              二级机构Id: this.$store.getters.id_二级部门,
              供应商名称: this.form.供应商,
              手机号: this.form.联系方式,
            };
            // console.log(data);
            insert_supplierdata(data).then((res) => {
              this.form.供应商Id = res.data;
              this.gysid = res.data;
              this.get_allschoolsupplier();
            });
          } else if (this.form.供应商创建 == "否") {
            this.form.供应商Id = this.form.供应商.id;
            this.form.供应商名称 = this.form.供应商.供应商名称;
          } else {
            if (this.form.供应商 != "" && this.form.供应商 != undefined) {
              this.form.供应商Id = this.form.供应商Id;
            } else {
              this.form.供应商Id = 0;
            }
          }
          // console.log(this.form);
          // console.log(this.tableData);
          setTimeout(() => {
            if (this.form.id == 0 || this.form.id == undefined) {
              const loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
              });
              create_purchaseacceptance(this.form).then((res) => {
                if (res.code == 100) {
                  for (var i = 0; i < this.tableData.length; i++) {
                    this.tableData[i].入库单ID = res.data;
                  }
                  create_purchaseacceptancedetail(this.tableData).then(
                    (res) => {
                      if (res.code == 100) {
                        loading.close();
                        this.alter_box(res.code, "提交成功");
                        // this.$emit("onload");
                        // this.dialogVisible = false;
                        this.$router.push({ path: "/Purchase/index" });
                      }
                    }
                  );
                }
              });
            } else {
              this.form.Id = this.form.id;
              const loading = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)",
              });
              let data = {
                流程代码: this.form.流程代码,
                Id: this.form.Id,
                申请机构名称: this.form.申请机构名称,
                供应商Id: this.form.供应商Id,
                合同编号: this.form.合同编号,
                联系方式: this.form.联系方式,
                发票号: this.form.发票号,
                购置方式: this.form.购置方式,
                取得日期: this.form.取得日期,
                备注: this.form.备注,
                一级机构ID: this.form.一级机构ID,
                二级机构ID: this.form.二级机构ID,
              };
              saveedits_purchaseacceptancerebacksave(data).then((res) => {
                for (var i = 0; i < this.tableData.length; i++) {
                  this.tableData[i].入库单ID = this.form.id;
                }
                create_purchaseacceptancedetail(this.tableData).then((res) => {
                  if (res.code == 100) {
                    loading.close();
                    this.alter_box(res.code, "提交成功");
                    this.$emit("onload");
                    this.$router.push({ path: "/Purchase/index" });
                    // this.dialogVisible = false;
                  }
                });
              });
            }
          }, 200);
        }
      });
      }
    },
    //供应商选择
    gyschange(val) {
      // console.log("val:", val);
      // console.log("val.id:", val.id);
      //创建
      if (val !== "" && val.id == undefined) {
        // console.log("创建");
        this.form.供应商创建 = "是";
      } else {
        // console.log("正常选");
        this.form.供应商创建 = "否";
        if (val.id == undefined) {
          this.form.供应商创建 = "";
          this.form.供应商Id = 0;
        }
      }
    },
    // 编辑
    edit(row, index) {
      // console.log(this.tableData);
      // console.log("编辑row", row);
      // console.log("编辑row", this.tableData[index]);
      // console.log("编辑", index);
      // this.$refs.Extend.qingkong();
      this.$refs.Extend.titleDialog = "完善信息";

      this.$refs.Extend.carif = false;
      this.$refs.Extend.land = false;
      this.$refs.Extend.fangwu = false;
      this.$refs.Extend.Cultural = false;
      this.$refs.Extend.form = {};
      if (row.二级分类名称 == "车辆") {
        this.$refs.Extend.carif = true;
      }
      if (row.二级分类名称 == "土地、海域及无居民海岛") {
        this.$refs.Extend.land = true;
      }
      if (row.二级分类名称 == "房屋" || row.二级分类名称 == "构筑物") {
        this.$refs.Extend.fangwu = true;
      }
      if (row.二级分类名称 == "文物") {
        this.$refs.Extend.Cultural = true;
      }
      // row.index = index;
      // let rows = JSON.parse(JSON.stringify(row));
      // rows.index = index;
      this.tableindex = index;
      let collRow = JSON.parse(JSON.stringify(this.tableData[index]));
      this.$refs.Extend.form = collRow;

      // console.log("编辑里面的内容", this.$refs.Extend.form);
      // this.$set(this.$refs.Extend.form, row);
      // this.$refs.Extend.form.index = index;
      this.$refs.Extend.dialogVisible = true;
    },
    // 隐藏
    hide(row) {
      // row.二级类别名称 = row.二级分类名称;
      // console.log("隐藏", row);
      if (
        row.二级分类名称 == "车辆" ||
        row.二级分类名称 == "文物" ||
        row.二级分类名称 == "土地、海域及无居民海岛" ||
        row.二级分类名称 == "房屋" ||
        row.二级分类名称 == "构筑物"
      ) {
        return true;
      } else {
        return false;
      }
    },

    addDetail() {
      // console.log(this.form.取得日期);
      // console.log(this.form.取得方式);
      if (this.form.取得方式 == "" || this.form.取得方式 == undefined) {
        this.msg("警告", "请选择取得方式!");
        return;
      }
      if (this.form.取得日期 == "" || this.form.取得日期 == undefined) {
        this.msg("警告", "请选择取得日期!");
        return;
      }
      this.$refs.Addasset.titleDialog = "添加资产";
      this.$refs.Addasset.dialogVisible = true;
    },
    // 追加资产
    putData(row) {
      this.tableData.push(row);
      // console.log("追加完毕的表格:", this.tableData);

      // for (var i = 0; i < this.tableData.length; i++) {
      //   this.tableData[i].index = i;
      // }
    },
    //供应商
    get_allschoolsupplier() {
      var data = {
        departmentwo: this.$store.getters.id_二级部门,
      };
      get_allschoolsupplier(data).then((res) => {
        this.gyoptions = res.data;
        // console.log("供应商", res.data);
      });
    },
  },
  beforeMount() {
    this.get_allschoolsupplier();
    this.form = this.$route.query.data;
    this.form.取得方式 = this.$route.query.data.购置方式
    this.onemoretime(this.$route.query.data.id)
    this.selectgys(this.$route.query.data.供应商)
    // if (this.$route.query.data.id == null) {
    //   this.$store.dispatch("tagsView/delView", this.$route); // 关闭当前标签
    //   this.$router.go(-1); // 返回上一级
    //   return;
    // }
    // console.log("+++++++++++++++++++++", this.$route.query.data);
    // this.form = this.$route.query.data;
  },
};
</script>

<style scoped>
</style>
