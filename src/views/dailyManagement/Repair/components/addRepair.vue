<template>
  <el-dialog
    :title="titleDialog"
    :visible.sync="dialogVisible"
    width="80%"
    center
    top="3vh"
    :close-on-click-modal="false"
  >
    <el-form ref="ruleForm" :label-position="labelPosition" :model="form">
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
            label="报修日期"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-input
              v-model="form.报修时间"
              placeholder="请输入内容"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="报修人"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-input
              v-model="form.报修人名称"
              placeholder="请输入内容"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="margin-top: 1%">
        <el-col :span="16">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                label="报修人电话"
                :label-width="formLabelWidth"
                prop="remark"
              >
                <el-input
                  v-model="form.报修人电话"
                  placeholder="请输入内容"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="报修地址"
                :label-width="formLabelWidth"
                prop="remark"
              >
                <el-cascader
                  style="width: 100%"
                  ref="cunfang"
                  :options="options"
                  :props="存放defaultProps"
                  filterable
                  :show-all-levels="true"
                  clearable
                  v-model="form.报修地址value"
                ></el-cascader>
                <!-- <el-select
                  style="width: 100%"
                  v-model="form.报修地址value"
                  placeholder="请选择"
                  value-key="存放地点二级ID"
                  clearable
                >
                  <el-option
                    v-for="item in options"
                    :key="item.存放地点二级ID"
                    :label="item.房间名称"
                    :value="item"
                  >
                  </el-option>
                </el-select> -->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-top: 1%">
            <el-col :span="24">
              <el-form-item
                label="故障描述"
                :label-width="formLabelWidth"
                prop="remark"
              >
                <el-input
                  :rows="6"
                  clearable
                  type="textarea"
                  v-model="form.故障描述"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="故障照片"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-upload
              class="avatar-uploader"
              action="http://82.156.97.125:8082/filehandle/flie_insert"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
                style="font-size: 50px"
              ></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row style="margin-top: 1%" :gutter="24">
        <el-col :span="24"> </el-col>
      </el-row>
      <el-button type="primary" plain style="margin-top: 2%" @click="addAsste"
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
        max-height="360px"
      >
        <el-table-column
          label="序号"
          type="index"
          width="50"
          :reserve-selection="true"
        ></el-table-column>

        <el-table-column prop="资产Id" label="资产Id" v-if="false">
        </el-table-column>
        <el-table-column
          prop="资产编号"
          label="资产编号"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="所属分类"
          label="资产分类"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              >{{ scope.row.一级分类名称 }}/{{ scope.row.二级分类名称 }}/{{
                scope.row.三级分类名称
              }}/{{ scope.row.四级分类名称 }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="资产名称"
          label="资产名称"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="规格"
          label="规格"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="型号"
          label="型号"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="使用方向" label="使用方向"> </el-table-column>
        <el-table-column prop="数量" label="数量(个)"> </el-table-column>
        <el-table-column prop="保留原值" label="原值" align="right">
        </el-table-column>
        <el-table-column prop="保留净值" label="净值" align="right">
        </el-table-column>
        <el-table-column
          prop="存放地点"
          label="存放地点"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="所属部门"
          label="归属部门"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="负责人" label="负责人"> </el-table-column>
        <el-table-column prop="使用人" label="使用人"> </el-table-column>
        <el-table-column
          prop="购置日期"
          label="取得日期"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="资产状态" label="资产状态"> </el-table-column>

        <el-table-column prop="是否到期" label="是否到期">
          <template slot-scope="scope">
            <span>{{ maturity(scope.row) }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="card(scope.row)"
              >卡片</el-button
            >
          </template>
        </el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >
              移除
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer"
      style="text-align: center; margin-top: 2%"
    >
      <el-popconfirm
        title="再次确认提交"
        @confirm="btnok(1)"
        style="margin-right: 20px"
      >
        <el-button type="primary" class="el-icon-check" slot="reference">
          提 交</el-button
        >
      </el-popconfirm>
      <el-popconfirm
        title="再次确认保存"
        @confirm="btnok(-2)"
        style="margin-right: 20px"
      >
        <el-button class="el-icon-collection-tag" slot="reference">
          保 存</el-button
        >
      </el-popconfirm>
    </div>
    <Asstecard ref="Asstecard" @tableSelect="tableSelect" />
    <People ref="People" @end="end" />
    <CardRepair ref="CardRepair" @select="select" />
  </el-dialog>
</template>

<script>
import Asstecard from "../components/AssteCard";
import People from "./people.vue";
import CardRepair from "./cardRepair";
import {
  get_storagelocation,
  get_accountleaderbyleaderId
} from "@/api/assetaccounthandle";
import {
  create_purchaseacceptance,
  create_purchaseacceptancedetail,
  get_purchaseacceptancelistdetail,
  save_purchaseacceptances
} from "@/api/assetarepairhandle";
export default {
  components: { Asstecard, People, CardRepair },
  data() {
    return {
      存放defaultProps: {
        children: "children",
        label: "name",
        value: "id"
      },
      dialogVisible: false,
      labelPosition: "left",
      formLabelWidth: "120px",
      form: {},
      loading: false,
      tableData: [],
      titleDialog: "",
      options: [], //报修地址
      imageUrl: ""
    };
  },
  methods: {
    select() {},
    // 卡片
    card(val) {
      // console.log("val", val);
      // this.$refs.CardRepair.dialogVisible = true;
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      // console.log(val.资产Id);
      get_accountleaderbyleaderId({
        ledgerId: parseInt(val.资产Id),
        // categoryname: val.一级分类名称,
        // categorytwoname: val.二级分类名称,
        categoryname: val.一级分类名称 !== null ? val.一级分类名称 : "",
        categorytwoname: val.二级分类名称 !== null ? val.二级分类名称 : ""
      }).then(res => {
        // console.log("卡片数据", val);
        if (val.categoryname == "车辆") {
          // description
          // console.log("val", val.categoryname);
          this.$refs.CardRepair.descriptions = false;
          this.$refs.CardRepair.carif = true; //车辆
          this.$refs.CardRepair.Cultural = false; //文物
          this.$refs.CardRepair.land = false; //土地
          this.$refs.CardRepair.fangwu = false; //房屋
        } else if (val.categoryname == "文物") {
          this.$refs.CardRepair.descriptions = false;
          this.$refs.CardRepair.carif = false; //车辆
          this.$refs.CardRepair.Cultural = true; //文物
          this.$refs.CardRepair.land = false; //土地
          this.$refs.CardRepair.fangwu = false; //房屋
        } else if (val.categoryname == "土地、海域及无居民海岛") {
          this.$refs.CardRepair.descriptions = false;
          this.$refs.CardRepair.carif = false; //车辆
          this.$refs.CardRepair.Cultural = false; //文物
          this.$refs.CardRepair.land = true; //土地
          this.$refs.CardRepair.fangwu = false; //房屋
        } else if (val.categoryname == "房屋" || val.categoryname == "构筑物") {
          this.$refs.CardRepair.descriptions = false;
          this.$refs.CardRepair.carif = false; //车辆
          this.$refs.CardRepair.Cultural = false; //文物
          this.$refs.CardRepair.land = false; //土地
          this.$refs.CardRepair.fangwu = true; //房屋
        } else {
          this.$refs.CardRepair.descriptions = true;
          this.$refs.CardRepair.carif = false; //车辆
          this.$refs.CardRepair.Cultural = false; //文物
          this.$refs.CardRepair.land = false; //土地
          this.$refs.CardRepair.fangwu = false; //房屋
        }
        this.$refs.CardRepair.onload(res.data[0]);
        var that = this;
        setTimeout(function() {
          loading.close();
          that.$refs.CardRepair.activeName = "first";
          that.$refs.CardRepair.dialogVisible = true;
        }, 600);
        // console.log(res.data)
      });
    },
    btnok(str) {
      if (
        this.form.报修地址value == undefined ||
        this.form.报修地址value.length == 0
      ) {
        this.msg("警告", "请选择报修地址!");
        return;
      }
      if (this.tableData.length == 0) {
        this.msg("警告", "请选择报修资产!");
        return;
      }
      this.form.流程代码 = str;
      this.form.一级机构ID = this.$store.getters.id_一级部门;
      this.form.二级机构ID = this.$store.getters.id_二级部门;
      this.form.fk_user = this.$store.getters.id_用户;
      this.form.报修地址Id一级 = this.form.报修地址value[0];
      this.form.报修地址Id二级 = this.form.报修地址value[1];
      if (this.form.报修地址Id二级 == undefined) {
        this.form.报修地址Id二级 = 0;
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      if (this.$store.getters.职务 == "资产管理员") {
        if (str == -2) {
          if (this.form.id == "" || this.form.id == undefined) {
            create_purchaseacceptance(this.form).then(res => {
              var putdata = [];
              for (var i in this.tableData) {
                var data = {
                  资产ID: this.tableData[i].资产Id,
                  repaiirId: res.data
                };
                putdata.push(data);
              }
              create_purchaseacceptancedetail(putdata).then(res => {
                loading.close();
                this.get_box(res.code, "派单成功!");
                this.dialogVisible = false;
                this.$emit("end");
              });
            });
          } else {
            this.form.维修单ID = this.form.id;
            save_purchaseacceptances(this.form).then(res => {
              var putdata = [];
              for (var i in this.tableData) {
                var data = {
                  资产ID: this.tableData[i].资产Id,
                  repaiirId: this.form.id
                };
                putdata.push(data);
              }
              create_purchaseacceptancedetail(putdata).then(res => {
                loading.close();
                this.get_box(res.code, "提交成功!");
                this.dialogVisible = false;
                this.$emit("end");
              });
            });
          }
          this.$refs.People.shifou = "保存";
        } else {
          loading.close();
          this.$refs.People.shifou = "";
          this.$refs.People.onload();
          this.$refs.People.form = this.form;
          this.$refs.People.tableDatas = this.tableData;
          this.$refs.People.dialogVisible = true;
        }
      } else {
        if (this.form.id == null || this.form.id == undefined) {
          create_purchaseacceptance(this.form).then(res => {
            var putdata = [];
            for (var i in this.tableData) {
              var data = {
                资产ID: this.tableData[i].资产Id,
                repaiirId: res.data
              };
              putdata.push(data);
            }

            create_purchaseacceptancedetail(putdata).then(res => {
              loading.close();
              this.get_box(res.code, "提交成功!");
              this.dialogVisible = false;
              this.$emit("end");
            });
          });
        } else {
          this.form.维修单ID = this.form.id;
          save_purchaseacceptances(this.form).then(res => {
            var putdata = [];
            for (var i in this.tableData) {
              var data = {
                资产ID: this.tableData[i].资产Id,
                repaiirId: this.form.id
              };
              putdata.push(data);
            }
            create_purchaseacceptancedetail(putdata).then(res => {
              loading.close();
              this.get_box(res.code, "提交成功!");
              this.dialogVisible = false;
              this.$emit("end");
            });
          });
        }
      }
    },
    end() {
      this.dialogVisible = false;
      this.$emit("end");
    },
    get_purchaseacceptancelistdetail(val) {
      get_purchaseacceptancelistdetail({ 维修单ID: val }).then(res => {
        this.tableData = res.data;
      });
    },
    // 追加资产
    tableSelect(row) {
      this.tableData = row;
    },
    // 添加资产
    addAsste() {
      this.$refs.Asstecard.get_alldepartmentpeople();
      this.$refs.Asstecard.onload();
      this.$refs.Asstecard.dialogVisible = true;
    },
    // 移除
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // 判断是否到期
    maturity(row) {
      // console.log("是否到期:", row.是否到期);
      if (row.是否到期 == 1) {
        return "否";
      } else {
        return "是";
      }
    },
    //上传前验证
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 20MB!");
      }
      //文件名转码
      var suffix = file.name;
      var key = encodeURI(`${suffix}`);
      // console.log(key);
      return isLt2M;
    },
    //上传成功
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.url; //文件具体信息
      this.assetimageid = res.code; //图片ID
      this.form.故障照片Id = res.code;
      // console.log("返回的res", res);
      // console.log(file);
      // return
    },
    // 报修地址
    get_storagelocation() {
      get_storagelocation({
        departmentwo: this.$store.getters.id_二级部门
      }).then(res => {
        this.options = res.data;
      });
    }
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
