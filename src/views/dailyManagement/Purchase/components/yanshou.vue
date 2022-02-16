<template>
  <el-dialog
    :title="titleDialog"
    :visible.sync="dialogVisible"
    width="80%"
    center
    top="5vh"
    :close-on-click-modal="false"
  >
    <el-form ref="ruleForm" :label-position="labelPosition" :model="form">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="处置单" name="first">
          <div>
            <el-row :gutter="24">
              <el-col :span="8">
                <el-form-item
                  label="流程状态"
                  :label-width="formLabelWidth"
                  prop="流程状态"
                >
                  {{ form.流程状态 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="单据编号"
                  :label-width="formLabelWidth"
                  prop="单据编号"
                >
                  {{ form.单据编号 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="申请人"
                  :label-width="formLabelWidth"
                  prop="申请人"
                >
                  {{ form.申请人 }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24" style="margin-top: 1%">
              <el-col :span="8">
                <el-form-item
                  label="申请日期"
                  :label-width="formLabelWidth"
                  prop="申请日期"
                >
                  {{ form.申请日期 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="取得方式"
                  :label-width="formLabelWidth"
                  prop="取得方式"
                >
                  {{ form.购置方式 }}
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item
                  label="取得日期"
                  :label-width="formLabelWidth"
                  prop="取得日期"
                >
                  {{ form.取得日期 }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24" style="margin-top: 1%">
              <el-col :span="8">
                <el-form-item
                  label="备注信息"
                  :label-width="formLabelWidth"
                  prop="remark"
                >
                  {{ form.备注 }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-table
              ref="table"
              :data="tableData"
              border
              stripe
              :header-cell-style="{
                'text-align': 'center',
                background: '#eef1f6'
              }"
              style="width: 100%; margin-top: 1%"
              max-height="400px"
            >
              <el-table-column v-if="false" prop="id_用户" label="id" />
              <!-- <el-table-column label="资产编号" /> -->
              <el-table-column
                label="资产分类"
                prop="二级分类名称"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span
                    >{{ scope.row.一级分类名称 }}/{{
                      scope.row.二级分类名称
                    }}/{{ scope.row.三级分类名称 }}/{{
                      scope.row.四级分类名称
                    }}</span
                  >
                </template>
              </el-table-column>

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
                prop="原值"
                :show-overflow-tooltip="true"
              />
              <!-- <el-table-column label="净值" /> -->
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
            </el-table>
            <el-row style="margin-top: 1%" :gutter="24">
              <el-col :span="6">
                <el-form-item
                  label="供应商"
                  :label-width="formLabelWidth"
                  prop="供应商名称"
                >
                  {{ form.供应商 }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="联系方式"
                  :label-width="formLabelWidth"
                  prop="联系方式"
                >
                  {{ form.联系方式 }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="合同编号"
                  :label-width="formLabelWidth"
                  prop="合同编号"
                >
                  {{ form.合同编号 }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="发票号"
                  :label-width="formLabelWidth"
                  prop="发票号"
                  >{{ form.发票号 }}
                </el-form-item>
              </el-col>
            </el-row>

            <div
              slot="footer"
              class="dialog-footer"
              style="text-align: center; margin-top: 2%"
              v-if="dis"
            >
              <el-popconfirm
                title="再次确认提交"
                @confirm="btnok('同意')"
                style="margin-right: 20px"
              >
                <el-button
                  type="primary"
                  class="el-icon-check"
                  slot="reference"
                >
                  同 意</el-button
                >
              </el-popconfirm>
              <el-popconfirm
                title="再次确认拒绝"
                @confirm="btnok('拒绝')"
                style="margin-right: 20px"
              >
                <el-button class="el-icon-close" type="danger" slot="reference"
                  >拒 绝</el-button
                >
              </el-popconfirm>
            </div>
            <div
              slot="footer"
              class="dialog-footer"
              style="text-align: center; margin-top: 2%"
              v-if="!dis"
            >
              <el-popconfirm title="再次确认撤销" @confirm="btnok('撤销')">
                <el-button
                  class="el-icon-refresh-left"
                  type="danger"
                  slot="reference"
                  >撤 销</el-button
                >
              </el-popconfirm>
            </div>
          </div>
          <el-dialog
            width="30%"
            title="请填写意见"
            :visible.sync="innerVisible"
            append-to-body
            :before-close="handleClose"
            :close-on-click-modal="false"
          >
            <el-form-item
              label="验收意见"
              :label-width="formLabelWidth"
              prop="remark"
            >
              <el-input
                type="textarea"
                :rows="3"
                placeholder="请输入内容"
                v-model="form.executive_agreenot"
                @input="updateView($event)"
              >
              </el-input>
            </el-form-item>
            <div
              slot="footer"
              class="dialog-footer"
              style="text-align: center; margin-top: 2%"
            >
              <el-button class="el-icon-check" type="primary" @click="submit()"
                >提 交</el-button
              >
            </div>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="附件" name="second">
          <el-row :gutter="24" style="margin-top:20px">
            <el-col :span="24">
              <UploadFileOn ref="UploadFileOn" @select="onload" />
            </el-col>
          </el-row>
          <el-row :gutter="24" style="margin-top:40px">
            <el-col :span="24">
              <UploadFileDown ref="UploadFileDown" />
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="流程" name="third">
          <el-row :gutter="24" style="margin-top:20px">
            <el-col :span="24">
              <el-steps :active="active">
                <el-step
                  v-for="item in FlowList"
                  :title="item.title"
                  :key="item.id"
                ></el-step>
              </el-steps>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-dialog>
</template>

<script>
import { get_flowdata } from "@/api/filehandle";
import UploadFileOn from "@/bitcomponents/GeneralUploadAttachment/index.vue";
import UploadFileDown from "@/bitcomponents/GeneralUploadFile/index.vue";
import {
  get_purchaseacceptancedatadetails,
  purchaseacceptance_approval,
  purchaseawithdrawremove
} from "@/api/purchaseacceptancehandle";
export default {
  components: { UploadFileOn, UploadFileDown },
  data() {
    return {
      active: 0,
      FlowList: [],
      activeName: "first",
      dis: false,
      titleDialog: "",
      dialogVisible: false,
      titleDialog: "固定资产入库单",
      labelPosition: "left",
      form: {
        btntext: "",
        executive_agreenot: ""
      },
      formLabelWidth: "80px",
      tableData: [],
      innerVisible: false
    };
  },
  methods: {
    handleClick(tab, event) {},
    // 解决双向绑定失效
    updateView(e) {
      this.$forceUpdate();
    },
    onload(flowId) {
      if (flowId != undefined) {
        this.form.id = flowId;
      }
      // console.log("flowId", flowId);
      get_purchaseacceptancedatadetails({ ID: this.form.id }).then(res => {
        this.tableData = res.data;
        this.form.flowname = "验收入库";
        this.$refs.UploadFileOn.onload(this.form);
        this.$refs.UploadFileDown.onload(this.form);
      });
      setTimeout(() => {
        get_flowdata({ flowId: this.form.id, flowname: "验收入库" }).then(
          res => {
            this.FlowList = res.data;
            this.active = res.values;
          }
        );
      }, 500);
    },
    // 是否通过
    btnok(val) {
      if (val == "同意") {
        this.form.sort = 1;
        this.form.executive_agreenot = "";
        // console.log("意见L:", this.form.executive_agreenot);
        this.innerVisible = true;
      } else if (val == "撤销") {
        // console.log(this.form);

        this.$confirm("是否撤销此流程?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var data = {
              flowId: this.form.id,
              applicantId: this.$store.getters.id_用户,
              departmenttwo: this.$store.getters.id_二级部门
            };
            // console.log(data);
            purchaseawithdrawremove(data).then(res => {
              this.alter_box(res.code, "撤销成功");
              this.dialogVisible = false;
              this.$emit("onload");
            });
            return;
          })
          .catch(() => {
            return;
          });
      } else {
        this.form.sort = -1;
        this.form.executive_agreenot = "";
        // console.log("意见L:", this.form.executive_agreenot);
        this.innerVisible = true;
      }
    },
    // 提交
    submit() {
      this.form.executive_name = this.$store.getters.姓名;
      this.form.fk_executive = this.$store.getters.id_用户;
      // console.log(this.form);
      purchaseacceptance_approval(this.form).then(res => {
        this.alter_box(res.code, "提交成功");
        this.innerVisible = false;
        this.dialogVisible = false;
        this.$emit("onload");
      });
    },
    handleClose() {
      this.form.executive_agreenot = "";
      this.innerVisible = false;
    }
  }
};
</script>

<style></style>
