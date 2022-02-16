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
              v-loading="loading"
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
                  prop="供应商"
                >
                  {{ form.供应商 }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="联系方式"
                  :label-width="formLabelWidth"
                  prop="remark"
                >
                  {{ form.联系方式 }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="合同编号"
                  :label-width="formLabelWidth"
                  prop="remark"
                >
                  {{ form.合同编号 }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="发票号"
                  :label-width="formLabelWidth"
                  prop="remark"
                  >{{ form.发票号 }}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 1%" :gutter="24" v-if="han()">
              <el-col :span="6">
                <el-form-item
                  label="验收人"
                  :label-width="formLabelWidth"
                  prop="remark"
                >
                  {{ form.验收人名称 }}
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="验收时间"
                  :label-width="formLabelWidth"
                  prop="remark"
                >
                  {{ form.验收时间 }}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="处理意见"
                  :label-width="formLabelWidth"
                  prop="remark"
                >
                  {{ form.验收意见 }}
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
                title="再次确认同意"
                @confirm="btnok(form.btntext, '同意')"
                style="margin-right: 20px"
              >
                <el-button
                  type="primary"
                  class="el-icon-check"
                  slot="reference"
                >
                  {{ form.btntext }}</el-button
                >
              </el-popconfirm>
              <el-popconfirm
                title="再次确认退回"
                @confirm="btnok(form.qxtext, '退回')"
                style="margin-right: 20px"
              >
                <el-button class="el-icon-close" slot="reference">{{
                  form.qxtext
                }}</el-button>
              </el-popconfirm>
            </div>
            <!-- <div
              slot="footer"
              class="dialog-footer"
              style="text-align: center; margin-top: 2%"
              v-if="!dis"
            >
              <el-popconfirm
                title="再次确认撤销"
                @confirm="btnok(form.cxtext, '撤销')"
                style="margin-right: 20px"
              >
                <el-button
                  type="primary"
                  class="el-icon-close"
                  slot="reference"
                  >{{ form.cxtext }}</el-button
                >
              </el-popconfirm>
            </div> -->
          </div>
          <el-dialog
            width="30%"
            title="请填写意见"
            :visible.sync="innerVisible"
            append-to-body
            :before-close="handleClose"
            :close-on-click-modal="false"
            v-if="dis"
          >
            <el-form-item
              v-if="hiden"
              label="记账凭证号"
              :label-width="formLabelWidth"
              prop="remark"
            >
              <el-input
                type="text"
                placeholder="请输入内容"
                v-model="form.numberno"
                @input="updateView($event)"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              label="记账意见"
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
              <el-popconfirm
                title="再次确认提交"
                @confirm="submit()"
                style="margin-right: 20px"
              >
                <el-button class="el-icon-check" type="primary" slot="reference"
                  >提 交</el-button
                >
              </el-popconfirm>
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
  purchaseacceptance_finaleapproval,
  purchaseawithdrawremove
} from "@/api/purchaseacceptancehandle";
export default {
  components: { UploadFileOn, UploadFileDown },
  data() {
    return {
      active: 0,
      FlowList: [],
      activeName: "first",
      dis: true,
      dialogVisible: false,
      titleDialog: "固定资产入库单",
      labelPosition: "left",
      form: {
        btntext: ""
      },
      hiden: false,
      formLabelWidth: "90px",
      tableData: [],
      innerVisible: false,
      loading: false
    };
  },
  methods: {
    handleClick(tab, event) {},
    onload(flowId) {
      if (flowId != undefined) {
        this.form.id = flowId;
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.loading = true;
      get_purchaseacceptancedatadetails({ ID: this.form.id }).then(res => {
        this.tableData = res.data;
        setTimeout(() => {
          this.form.flowname = "验收入库";
          this.$refs.UploadFileOn.onload(this.form);
          this.$refs.UploadFileDown.onload(this.form);
          loading.close();
          this.loading = false;
          this.dialogVisible = true;
        }, 200);
      });
      get_flowdata({ flowId: this.form.id, flowname: "验收入库" }).then(res => {
        this.FlowList = res.data;
        this.active = res.values;
      });
    },
    // 判断是否是汉推
    han() {
      if (this.$store.getters.二级部门名称 == "苏州市汉语国际推广中学") {
        return true;
      } else {
        return false;
      }
    },
    // 提交
    submit() {
      this.form.executive_name = this.$store.getters.姓名;
      this.form.fk_executive = this.$store.getters.id_用户;
      // console.log(this.form);
      purchaseacceptance_finaleapproval(this.form).then(res => {
        this.alter_box(res.code, "提交成功");
        this.innerVisible = false;
        this.dialogVisible = false;
        this.$emit("onload");
      });
    },
    // 解决双向绑定失效
    updateView(e) {
      this.$forceUpdate();
    },
    handleClose() {
      this.form.numberno = "";
      this.form.executive_agreenot = "";
      this.innerVisible = false;
    },
    btnok(str) {
      // if (str == "同 意") {
      if (str == "确认记账") {
        this.hiden = true;
        this.form.sort = 1;
      } else if (str == "撤 销") {
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
        this.hiden = false;
        this.form.sort = -1;
      }
      this.innerVisible = true;
    },
    toreturn(val) {
      // console.log(val);
      if (val == "取 消") {
        this.dialogVisible = false;
      }
      if (val == "保 存") {
      }
    }
  }
};
</script>

<style></style>
