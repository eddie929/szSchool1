<template>
  <el-dialog
    :title="titleDialog"
    :visible.sync="dialogVisible"
    append-to-body
    width="80%"
    center
    top="3vh"
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
                  prop="remark"
                >
                  {{ form.流程状态 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="单据编号"
                  :label-width="formLabelWidth"
                  prop="remark"
                >
                  {{ form.单据编号 }}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="申请人"
                  :label-width="formLabelWidth"
                  prop="remark"
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
              max-height="350px"
              :height="theight"
              show-summary
              :summary-method="getSummaries"
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
                align="right"
                prop="保留原值"
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
              <el-table-column>
                <!-- <i class="el-icon-remove"></i> -->
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    :disabled="!hide(scope.row)"
                    @click="edit(scope.row)"
                    >查看</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <el-row style="margin-top: 2%" :gutter="24">
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
            <div
              style="margin-top: 1%;margin-bottom: 1%;border-style: double;border-width:3px"
              v-if="han()"
            >
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
                    label="验收意见"
                    :label-width="formLabelWidth"
                    prop="remark"
                  >
                    {{ form.验收意见 }}
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
              </el-row>
              <el-row style="margin-top: 1%;margin-bottom: 1%;" :gutter="24">
                <el-col :span="6">
                  <el-form-item
                    label="记账人"
                    :label-width="formLabelWidth"
                    prop="remark"
                  >
                    {{ form.财务处理人名称 }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="处理意见"
                    :label-width="formLabelWidth"
                    prop="remark"
                  >
                    {{ form.财务处理意见 }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="处理时间"
                    :label-width="formLabelWidth"
                    prop="remark"
                  >
                    {{ form.财务处理时间 }}
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item
                    label="记账凭证号"
                    :label-width="formLabelWidth"
                    prop="remark"
                  >
                    {{ form.财务记账凭证号 }}
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div
              slot="footer"
              class="dialog-footer"
              style="text-align: center; margin-top: 2%"
              v-if="hiden"
            >
              <el-button class="el-icon-check" type="primary" @click="submit()"
                >重新发起</el-button
              >
            </div>
          </div>
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
    <MoerSee ref="MoerSee" />
    <AddPurchase ref="AddPurchase" />
  </el-dialog>
</template>

<script>
import { get_flowdata } from "@/api/filehandle";
import UploadFileOn from "@/bitcomponents/GeneralUploadAttachment/index.vue";
import UploadFileDown from "@/bitcomponents/GeneralUploadFile/index.vue";
import AddPurchase from "./addPurchase.vue";
import {
  get_purchaseacceptancedatadetails,
  purchaseacceptance_finaleapproval
} from "@/api/purchaseacceptancehandle";
import MoerSee from "./moerSee.vue";
export default {
  components: { MoerSee, AddPurchase, UploadFileOn, UploadFileDown },
  props: {
    filetitle: { type: String, default: "" }
  },
  data() {
    return {
      active: 0,
      FlowList: [],
      activeName: "first",
      dialogVisible: false,
      titleDialog: "固定资产入库单",
      labelPosition: "left",
      form: {
        btntext: ""
      },
      formLabelWidth: "90px",
      tableData: [],
      innerVisible: false,
      hiden: false,
      theight: 350,
      height: 350
    };
  },
  methods: {
    handleClick(tab, event) {},
    // 自定义合计方法
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      // 解决elementUI table合计行初始页面不显示问题  this.height由父组件传递过来 this.theight未表格绑定的高度
      // 延时执行   要不然会一直刷新
      window.setTimeout(() => {
        if (this.theight === this.height) {
          this.theight -= 0.5;
        } else {
          this.theight = this.height;
        }
      }, 100);
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (column.property === "保留原值") {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
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
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
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
    submit() {
      this.$router.push({
        path: "handlePurchases",
        query: { data: this.form }
      });
      return;
      this.dialogVisible = false;
      // console.log(this.form);
      // console.log(this.tableData);
      this.$refs.AddPurchase.form = this.form;
      this.$refs.AddPurchase.form.取得方式 = this.form.购置方式;
      this.$refs.AddPurchase.onemoretime(this.form.id);
      this.$refs.AddPurchase.dialogVisible = true;
    },
    edit(row) {
      // console.log(row);
      this.$refs.MoerSee.carif = false;
      this.$refs.MoerSee.land = false;
      this.$refs.MoerSee.fangwu = false;
      this.$refs.MoerSee.Cultural = false;
      if (row.二级分类名称 == "车辆") {
        this.$refs.MoerSee.carif = true;
      }
      if (row.二级分类名称 == "土地、海域及无居民海岛") {
        this.$refs.MoerSee.land = true;
      }
      if (row.二级分类名称 == "房屋" || row.二级分类名称 == "构筑物") {
        this.$refs.MoerSee.fangwu = true;
      }
      if (row.二级分类名称 == "文物") {
        this.$refs.MoerSee.Cultural = true;
      }

      this.$refs.MoerSee.form = row;
      this.$refs.MoerSee.dialogVisible = true;
    },
    hide(row) {
      // console.log("rowwwww", row);
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
    onload() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      if (this.form.流程状态 == "已退回") {
        this.hiden = true;
      } else {
        this.hiden = false;
      }
      get_purchaseacceptancedatadetails({ ID: this.form.id }).then(res => {
        this.tableData = res.data;
        setTimeout(() => {
          this.form.flowname = "验收入库";
          this.$refs.UploadFileOn.onload(this.form);
          this.$refs.UploadFileDown.onload(this.form);
          loading.close();
          this.dialogVisible = true;
        }, 500);
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
    // 解决双向绑定失效
    updateView(e) {
      this.$forceUpdate();
    }
  }
};
</script>

<style></style>
