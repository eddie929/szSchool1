<template>
  <div>
    <div style="margin-bottom:5px;margin-left:20px">
      <span
        v-show="this.$store.getters.id_二级部门 == 0"
        style="font-size:small"
      >
        查询范围:
        <el-select
          v-model="department"
          placeholder="请选择"
          filterable
          @change="changeDepartment"
          style="width:15%"
        >
          <el-option
            v-for="item in belongpartOptions"
            :key="item.id"
            :label="item.name"
            :value="{ value: item.id, label: item.name }"
          >
          </el-option>
        </el-select>
      </span>
      <el-radio-group v-model="inventoryType" @change="changeType">
        <el-radio label="待审核">待审核</el-radio>
        <el-radio label="已通过">已通过</el-radio>
        <el-radio label="已退回">已退回</el-radio>
      </el-radio-group>
      <el-divider direction="vertical"></el-divider>
      <el-button size="small" type="success">通过</el-button>
      <el-button size="small" type="info">退回</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%;" height="50vh">
      <el-table-column type="index" label="序号" width="55"> </el-table-column>
      <el-table-column prop="盘点照片" label="盘点照片">
        <template slot-scope="{ row }">
          <el-button type="text">
            <el-image
              style="width: 25px; height: 20px"
              :src="row.盘点照片"
            ></el-image
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="资产编号"
        label="资产编号"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="资产分类"
        label="资产分类"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="{ row }">
          {{ row.一级分类名称 }}-{{ row.二级分类名称 }}-{{
            row.三级分类名称
          }}-{{ row.四级分类名称 }}
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
      <el-table-column prop="数量" label="数量(个)"> </el-table-column>
      <el-table-column prop="原值" label="原值" :show-overflow-tooltip="true">
        <template slot-scope="{ row }">
          <div style="text-align:right">{{ row.原值 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="净值" label="净值">
        <template slot-scope="{ row }">
          <div style="text-align:right">{{ row.净值 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="存放地点" label="存放地点"> </el-table-column>
      <el-table-column
        prop="所属部门"
        label="归属部门"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column prop="负责人" label="负责人"> </el-table-column>
      <el-table-column prop="盘点人员" label="盘点人员"> </el-table-column>
      <el-table-column
        prop="盘点时间"
        label="盘点时间"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="联系方式" label="联系方式"> </el-table-column>
      <el-table-column
        prop="原因"
        label="退回原因"
        v-if="isShowReason"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
    </el-table>
    <el-row style="margin: 20px 0px 20px 0px">
      <el-col :span="24">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageinfo.page"
          :page-sizes="pageinfo.pagesize"
          :page-size="pageinfo.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageinfo.count"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { get_photoreviewlist, get_allschool } from "@/api/inventoryhandle";
export default {
  // inject: ["newFoo"], //获取参数用this.newFoo
  data() {
    return {
      tableData: [],
      inventoryID: "",
      // changeDepartment: 0,
      pdID: 0,
      inventoryType: "待审核",
      盘点方式: "",
      department: "全部",
      departmentID: 0,
      mainRow: {},
      isShowReason: false,
      belongpartOptions: [],
      pageinfo: {
        page: 1, //第几页
        limit: 10, //一页多少条
        count: 0, //数据总数
        pagesize: [10, 20, 50]
      }
    };
  },
  methods: {
    //每页多少条数据
    handleSizeChange(val) {
      this.pageinfo.limit = val;
      this.pageinfo.page = 1;
      this.onload();
    },
    //当前第几页
    handleCurrentChange(val) {
      this.pageinfo.page = val;
      this.onload();
    },
    changeType(val) {
      if (val == "已退回") {
        this.isShowReason = true;
      } else {
        this.isShowReason = false;
      }
      this.onloads();
    },
    changeDepartment(val) {
      // var chosedd = JSON.parse(JSON.stringify(val));
      // console.log(val);
      this.departmentID = val.value;
      this.onloads();
    },
    onloads() {
      if (this.$store.getters.id_二级部门 == 0) {
        this.belongpartOptions = [];
        this.belongpartOptions.push({ name: "全部", id: 0 });
        get_allschool(this.mainRow.ID).then(res => {
          if (res.code == 100) {
            // console.log(res.data);
            for (let i in res.data) {
              this.belongpartOptions.push({
                name: res.data[i].name,
                id: res.data[i].id
              });
            }
          }
        });
      }
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.tableData = [];
      let reqdata = {
        pageNum: this.pageinfo.page,
        pageSize: this.pageinfo.limit,
        fk_user: this.$store.getters.id_用户,
        fk_role: this.$store.getters.id_角色,
        flow_state: this.inventoryType,
        publishone: this.$store.getters.id_一级部门,
        publishtwo:
          this.$store.getters.id_二级部门 == 0
            ? this.department == "全部"
              ? 0
              : this.departmentID
            : this.$store.getters.id_二级部门
      };
      get_photoreviewlist(reqdata)
        .then(response => {
          if (response.code == 100) {
            // console.table("拍照列表");
            // console.table(response.data);
            response.data[0].盘点照片 =
              "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg";
            response.data[1].盘点照片 =
              "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg";
            this.tableData = response.data;

            this.pageinfo.count = response.count;
          }
          loading.close();
        })
        .catch(error => {
          loading.close();
        });
    }
  }
  // mounted() {
  //   // this.onload();
  //   console.log("孙子加载:", this.newFoo.foo);
  // }
};
</script>

<style scoped></style>
