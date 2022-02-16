<template>
  <div>
    <div style="margin-bottom:5px;margin-left:20px">
      <el-radio-group v-model="assetType" @change="changeAssetType">
        <el-radio label="盘盈">盘盈资产</el-radio>
        <el-radio label="盘亏" :disabled="mainRow.流程状态 != '已结束'"
          >盘亏资产</el-radio
        >
      </el-radio-group>
      <el-divider direction="vertical"></el-divider>
      <el-button
        size="mini"
        type="primary"
        v-show="addAssetButton"
        @click="addAssets"
        >添加盘盈资产</el-button
      >
      <el-button size="mini" type="danger" v-show="false"
        >移除(这个是多选的)</el-button
      >
      <el-button
        size="mini"
        type="info"
        class="el-icon-delete"
        v-show="isShowScrap"
        :disabled="isDisable"
        @click="becomeScrapped"
        style="float:right;margin-bottom:5px"
        >转入待报废库</el-button
      >
      <el-button
        size="mini"
        v-show="isShowWarehousing"
        :disabled="isDisable"
        style="float:right;margin-bottom:5px"
        type="primary"
        @click="submitWarehouse"
        >提交入库</el-button
      >
    </div>
    <el-table
      :data="tableData"
      @select="selectFn"
      @select-all="selectAllFn"
      :row-key="row => row.资产Id"
      border
      ref="multipleTable"
      style="width: 100%;"
      height="50vh"
    >
      <!-- <el-table-column
        type="selection"
        :row-key="row => row.id_用户"
        :selectable="checkSelect"
        :reserve-selection="true"
        width="55"
      > 
      </el-table-column>-->
      <el-table-column
        type="selection"
        :reserve-selection="true"
        width="55"
        v-if="isShowCheckbox"
      />
      <el-table-column type="index" label="序号" width="55"> </el-table-column>
      <!-- <el-table-column
        prop="资产编码"
        label="资产编号"
        v-show="true"
      ></el-table-column> -->
      <el-table-column
        prop="一级分类名称"
        label="资产分类"
        :show-overflow-tooltip="true"
      >
        <!-- <template slot-scope="{ row }">
          {{ row.一级分类名称 }}-{{ row.二级分类名称 }}-{{
            row.三级分类名称
          }}-{{ row.四级分类名称 }}
        </template> -->
      </el-table-column>
      <el-table-column
        prop="资产名称"
        label="资产名称"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="规格"
        label="规格"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="型号"
        label="型号"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="使用方向" label="使用方向" />
      <el-table-column prop="数量" label="数量(个)" />
      <el-table-column prop="原值" label="原值">
        <template slot-scope="{ row }">
          <div style="text-align:right">{{ row.原值 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="净值" label="净值">
        <template slot-scope="{ row }">
          <div style="text-align:right">{{ row.净值 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="存放地点" label="存放地点" />
      <el-table-column prop="所属部门" label="归属部门" />
      <el-table-column prop="负责人" label="负责人" />
      <el-table-column prop="资产状态" label="资产状态" />
      <el-table-column label="操作" width="120px" v-if="assetType == '盘盈'">
        <template slot-scope="{ row, $index }">
          <el-button
            type="text"
            size="mini"
            :disabled="!hide(row)"
            @click="edit(row, $index)"
            >完善</el-button
          >
          <el-button
            type="text"
            style="color:red"
            @click="remove(row, $index)"
            size="mini"
            >移除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog></el-dialog>
    <AddPurchase ref="adPurchase" @addTable="addTable" />
    <Addasset ref="addasset" @putData="putData" />
    <Extend ref="Extend" @addForm="addForm" />
  </div>
</template>

<script>
// import Purchase from "@/views/dailyManagement/Purchase";
import Addasset from "./addAssets.vue";
import Extend from "./Extend.vue";
import AddPurchase from "@/views/dailyManagement/Purchase/components/addPurchase.vue";
import {
  inventorygaininventory,
  create_handleassets
} from "@/api/inventoryhandle";
import {
  create_purchaseacceptance,
  create_purchaseacceptancedetail
} from "@/api/purchaseacceptancehandle";
// 在一个对象数据中寻找某个对象的下标,通过key的值相等，判断数组中是否包含对象
const arrFindObjIndex = (arr, obj, key) => {
  let index = -1;
  arr.forEach((item, idx) => {
    if (item[key] === obj[key]) {
      index = idx;
    }
  });
  return index;
};
export default {
  components: { AddPurchase, Addasset, Extend },
  // inject: ["newFoo"], //获取参数用this.newFoo
  data() {
    return {
      selection: [], //选中的数组
      tableData: [],
      inventoryID: "",
      pdID: 0,
      assetType: "盘盈",
      归属部门: "",
      mainRow: {},
      isShowWarehousing: false,
      addAssetButton: true,
      isShowScrap: false,
      isDisable: true,
      isShowCheckbox: false,
      belongpartOptions: [],
      tableIndex: 0
    };
  },
  methods: {
    addForm(val) {
      // console.log("传回来的form", val);
      // console.log("传回来的form", this.tableIndex);
      this.tableData[this.tableIndex] = val;
      // console.log("--------------", this.tableData);

      // this.form = val;
    },
    // 隐藏
    hide(row) {
      // row.二级类别名称 = row.二级分类名称;
      // console.log("隐藏", row);
      // if(){

      // }
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
    // 完善编辑
    edit(row, index) {
      // console.log("编辑row", row);
      // console.log("编辑", index);
      this.$refs.Extend.qingkong();
      // return;
      this.$refs.Extend.titleDialog = "完善信息";
      this.$refs.Extend.carif = false;
      this.$refs.Extend.land = false;
      this.$refs.Extend.fangwu = false;
      this.$refs.Extend.Cultural = false;
      // this.$refs.Extend.form = {};
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
      let collRow = JSON.parse(JSON.stringify(this.tableData[index]));
      this.$refs.Extend.form = collRow;
      this.tableIndex = index;
      // this.$set(this.$refs.Extend.form, row);
      // this.$refs.Extend.form.index = index;
      this.$refs.Extend.dialogVisible = true;
    },
    submitWarehouse() {
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
      //购置验收单,返回后产生的资产ID  加入清单中
      let data = {
        流程状态: "",
        流程代码: 1,
        申请人: this.$store.getters.姓名,
        申请人ID: this.$store.getters.id_用户,
        一级机构ID: this.$store.getters.id_一级部门,
        二级机构ID: this.$store.getters.id_二级部门,
        申请机构名称: this.$store.getters.二级部门名称,
        申请日期: this.dayjs().format("YYYY-MM-DD"),
        购置方式: "盘盈",
        取得日期: this.dayjs().format("YYYY-MM-DD"),
        供应商Id: 0,
        联系方式: "",
        合同编号: "",
        发票号: "",
        备注: ""
      };
      // console.log("入库单:", data);
      // console.log("明细:", this.tableData);
      setTimeout(() => {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        create_purchaseacceptance(data).then(res => {
          // console.log(res);
          if (res.code == 100) {
            for (var i = 0; i < this.tableData.length; i++) {
              this.tableData[i].入库单ID = res.data;
            }
            create_purchaseacceptancedetail(this.tableData).then(res => {
              if (res.code == 100) {
                loading.close();
                this.alter_box(res.code, "提交成功");
                this.onloads();
              }
              loading.close();
            });
          }
        });
      });
    },
    //   翻页之后调用该方法
    toggleSelection() {
      //翻页之后要勾选上一页选中的,增加延时,在列表渲染完成后选中
      setTimeout(() => {
        this.selection.forEach(item => {
          if (arrFindObjIndex(this.selection, item, "资产Id") !== -1) {
            this.$refs["multipleTable"].toggleRowSelection(item);
          }
        });
      }, 500);
    },
    selectAllFn(selection) {
      if (!selection.length) {
        // 全选时，选中的数据为空时，要清理掉缓存中当页的数据
        this.tableData.forEach(item => {
          const index = arrFindObjIndex(this.selection, item, "资产Id");
          if (index !== -1) {
            this.selection.splice(index, 1);
          }
        });
      } else {
        // 全选时，选中的数据不为空时，要在缓存中添加当页的数据
        selection.forEach(item => {
          const index = arrFindObjIndex(this.selection, item, "资产Id");
          if (index === -1) {
            this.selection.push(item);
          }
        });
      }
      // console.log("全选：", selection);
    },
    selectFn(selection, row) {
      const flag = selection.some(item => {
        return item.id_用户 === row.id_用户;
      });
      const index = arrFindObjIndex(this.selection, row, "资产Id");
      if (!flag) {
        // selection中不包含row则是取消选中该行
        if (index !== -1) {
          this.selection.splice(index, 1);
        }
      } else {
        // selection中不包含row则是选中该行
        if (index === -1) {
          this.selection.push(row);
        }
      }
    },
    becomeScrapped() {
      // var idArray = [];
      // console.log(this.selection);
      // for (let i in this.selection) {
      //   idArray.push(this.selection[i].资产Id);
      // }
      if (this.selection.length == 0) {
        this.$message.warning("请选择要报废的资产!");
        return;
      }
      this.$confirm("确定要转入待报废库吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let scrappArray = [];
          for (let i in this.selection) {
            let data = {
              资产Id: this.selection[i].资产Id,
              一级机构ID: this.$store.getters.id_一级部门,
              二级机构ID: this.$store.getters.id_二级部门,
              资产编号: this.selection[i].资产编码,
              原值: this.selection[i].原值,
              净值: this.selection[i].净值,
              资产类别: "报废",
              添加方式: "盘亏处理"
            };
            scrappArray.push(data);
          }
          // console.log(scrappArray);
          create_handleassets(scrappArray).then(res => {
            if (res.code === 100) {
              // this.del_box(res.code, "转入成功");
              this.$message.success("转入成功");
              this.onloads();
            } else if (res.code === 101) {
              // this.del_box(res.code, res.msg);
              return;
            } else if (res.code === 102) {
              // this.del_box(res.code, res.msg);
              return;
            } else if (res.code === -1) {
              // this.del_box(res.code, res.msg);
              return;
            }
          });
        })
        .catch(() => {});
    },
    addTable(form, tableData) {
      // console.log("返回值form:", form);
      // console.log("返回值tableData:", tableData);
      if (this.tableData.length > 0) {
        this.isShowWarehousing = true;
      } else {
        this.isShowWarehousing = false;
      }

      // console.log("返回的表格:", this.tableData);
    },

    addAssets() {
      // this.$refs.adPurchase.isSave = false;
      // this.$refs.adPurchase.isPDSave = true;
      // this.$refs.adPurchase.isDisabled = true;
      // this.$refs.adPurchase.titleDialog = "盘盈入库";
      // this.$refs.adPurchase.form.取得方式 = "盘盈";
      // this.$refs.adPurchase.dialogVisible = true;
      this.$refs.addasset.titleDialog = "添加资产";
      this.$refs.addasset.AssetClassesvalue = "";
      this.$refs.addasset.dialogVisible = true;
    },
    // 追加资产
    putData(row) {
      // console.log(row);
      // for (let i in row) {
      //   row[i].资产状态 = "空闲中";
      // }
      this.tableData.push(row);
      if (this.tableData.length > 0) {
        this.isShowWarehousing = true;
      } else {
        this.isShowWarehousing = false;
      }
      // console.log("追加完毕的表格:", this.tableData);
    },
    changeAssetType(val) {
      this.$refs.multipleTable.clearSelection(); //清空选中
      this.selection = []; //清空多选数组
      // console.log(val);
      if (val == "盘盈") {
        this.isShowCheckbox = false; //盘盈不用显示多选框
        this.isShowScrap = false;
        this.addAssetButton = true;
        this.tableData = [];
      } else if (val == "盘亏") {
        this.isShowCheckbox = true;
        this.isShowScrap = true;
        this.addAssetButton = false;
        this.onloads();
      }
      // console.log(this.isShowScrap);
      // this.onloads();
    },
    remove(row, index) {
      this.tableData.splice(index, 1);
      if (this.tableData.length == 0) {
        this.isShowWarehousing = false;
      } else {
        this.isShowWarehousing = true;
      }
    },
    onloads() {
      this.isDisable = false; //测试用,当测试完删掉
      // if (this.mainRow.流程状态 == "正在进行") {
      //   this.isDisable = true;
      // } else {
      //   this.isDisable = false;
      // }
      if (this.assetType == "盘盈") {
        this.tableData = [];
        return;
      }
      if (this.mainRow.ID == undefined) {
        // 调用全局挂载的方法,关闭当前标签页
        this.$store.dispatch("tagsView/delView", this.$route);
        // 返回上一步路由
        this.$router.go(-1);
        return;
      }
      this.tableData = [];
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });

      let reqdata = { ID: this.mainRow.ID, statename: this.assetType };
      // console.log(reqdata);
      inventorygaininventory(reqdata)
        .then(res => {
          if (res.code == 100) {
            this.tableData = res.data;
            // if (this.tableData.length > 0 && this.assetType == "盘盈") {
            //   this.isShowWarehousing = true;
            // } else {
            //   this.isShowWarehousing = false;
            // }
          }
          loading.close();
        })
        .catch(error => {
          loading.close();
        });
    }
  },
  mounted() {
    // this.onloads();
  },
  beforeMount() {}
};
</script>

<style scoped>
.echart {
  margin: 2% 0% 2% 0%;
  background-color: #ffffff;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)" */
}
</style>
