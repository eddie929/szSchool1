<template>
  <el-dialog
    :title="choosePeopleTitle"
    :visible.sync="dialogVisible"
    width="55%"
    center
    :close-on-click-modal="false"
  >
    <el-form ref="ruleForm" label-position="left" :inline="true">
      <div style="float: right; margin-right: 10px">
        <el-form-item label="归属部门">
          <!-- 所有部门单选 -->
          <Departmentall @getDepartmentall="getDepartmentall" />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.searchtext"
            placeholder="模糊查询"
            clearable
            style="width: 250px"
          />
        </el-form-item>
        <el-button
          type="primary"
          size="medium"
          icon="el-icon-search"
          @click="selectUsers"
          >搜索</el-button
        >
        <el-button type="primary" @click="test">测试</el-button>
      </div>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      v-loading="loading"
      :row-key="row => row.id_用户"
      @select="selectFn"
      @select-all="selectAllFn"
      border
      stripe
      style="width: 100%;margin-top:1%"
      height="320px"
    >
      <el-table-column type="selection" :reserve-selection="true" width="55" />
      <el-table-column
        label="序号"
        type="index"
        :reserve-selection="true"
        width="55"
      />
      <el-table-column prop="姓名" label="姓名" />
      <el-table-column prop="工号" label="工号" :show-overflow-tooltip="true" />
      <el-table-column prop="职务" label="职务" :show-overflow-tooltip="true" />
      <el-table-column prop="手机" label="手机" :show-overflow-tooltip="true" />
      <el-table-column
        v-if="false"
        prop="一级部门名称"
        label="一级部门"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="二级部门名称"
        label="二级部门"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="三级部门名称"
        label="三级部门"
        :show-overflow-tooltip="true"
      />
    </el-table>
    <div class="block" style="margin-top: 15px">
      <el-pagination
        background
        :current-page="pageinfo.pageNum"
        :page-sizes="pageinfo.pagesizes"
        :page-size="pageinfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageinfo.count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div slot="footer" class="dialog-footer" style="text-align: center; ">
      <el-button type="primary" class="el-icon-check" @click="submit('form')">
        确 定</el-button
      >
      <el-button class="el-icon-close" @click="dialogVisible = false">
        取 消</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
// import { get_alldepartmentpeople } from "@/api/inventoryhandle";
import Departmentall from "@/bitcomponents/Departmentall/index";
import { get_alluser } from "@/api/userhandle";
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
  components: { Departmentall },
  data() {
    return {
      loading: false, // 加载动画
      form: {}, // 搜索条件
      tableData: [],
      selection: [],
      department: "",
      choosePeopleTitle: "",
      dialogVisible: false,
      pageinfo: {
        pageNum: 1, // 第几页
        pageSize: 10, // 一页多少条
        count: 0, // 数据总数
        pagesizes: [10, 20, 30, 50],
        bmoneid: this.$store.getters.id_一级部门, // 一级部门
        bmtwoid: this.$store.getters.id_二级部门, // 二级部门
        bmtwoid: 0, // 二级部门
        searchtext: "" // 模糊查询
      }
    };
  },
  methods: {
    // 控制每页显示条数
    handleSizeChange(val) {
      this.pageinfo.pageSize = val;
      this.onload();
    },
    // 第几页
    handleCurrentChange(val) {
      this.pageinfo.pageNum = val;
      this.onload();
    },
    // 搜索条件  部门选择
    getDepartmentall(val) {
      this.pageinfo.bmoneid = val.onebm;
      this.pageinfo.bmtwoid = val.twobm;
      this.pageinfo.bmthreeid = val.thrbm;
    },
    // 搜索按钮
    selectUsers() {
      this.pageinfo.searchtext = this.form.searchtext;
      this.onload();
    },
    test() {
      var aaa = [
        {
          id_用户: 224,
          id_角色: 2,
          id_一级部门: 25,
          id_二级部门: 180,
          id_三级部门: 293,
          登录名: "17388494083",
          姓名: "朱刚",
          工号: "",
          职务: "普通员工",
          邮箱: "",
          办公电话: "",
          手机: "",
          备注: "",
          管理范围部门: "",
          管理范围部门lable: "",
          角色名称: "普通员工",
          用户密码: "123456",
          一级部门编号: "01",
          一级部门名称: "教育局",
          二级部门编号: "01",
          二级部门名称: "苏州市汉语国际推广中学",
          三级部门编号: "",
          三级部门名称: "0801 馆藏2号"
        },
        {
          id_用户: 237,
          id_角色: 13,
          id_一级部门: 25,
          id_二级部门: 180,
          id_三级部门: 490,
          登录名: "13506213633",
          姓名: "叶敏",
          工号: "",
          职务: "分管领导",
          邮箱: "",
          办公电话: "",
          手机: "",
          备注: "",
          管理范围部门: "",
          管理范围部门lable: "",
          角色名称: "分管领导",
          用户密码: "123456",
          一级部门编号: "01",
          一级部门名称: "教育局",
          二级部门编号: "01",
          二级部门名称: "苏州市汉语国际推广中学",
          三级部门编号: "",
          三级部门名称: "综合办"
        },
        {
          id_用户: 225,
          id_角色: 2,
          id_一级部门: 25,
          id_二级部门: 180,
          id_三级部门: 294,
          登录名: "13862000880",
          姓名: "杨权栋",
          工号: "",
          职务: "普通员工",
          邮箱: "",
          办公电话: "",
          手机: "",
          备注: "",
          管理范围部门: "",
          管理范围部门lable: "",
          角色名称: "普通员工",
          用户密码: "123456",
          一级部门编号: "01",
          一级部门名称: "教育局",
          二级部门编号: "01",
          二级部门名称: "苏州市汉语国际推广中学",
          三级部门编号: "",
          三级部门名称: "0801  馆藏4号"
        }
      ];
      // this.selection.forEach(item => {
      //   if (arrFindObjIndex(aaa, item, "id_用户") !== -1) {
      //     this.$refs.multipleTable.toggleRowSelection(item);
      //   }
      // });
      // this.$refs.multipleTable.selection = aaa;
      // console.log(this.$refs.multipleTable.data[0]);
      // this.$refs.multipleTable.toggleRowSelection(
      //   this.$refs.multipleTable.data[0],
      //   true
      // );
      this.toggleSelectionaa(aaa);
    },
    toggleSelectionaa(aaa) {
      aaa.forEach(item => {
        // console.log(item);
        this.$nextTick(() => {
          if (arrFindObjIndex(aaa, item, "id_用户") !== -1) {
            // this.$refs["multipleTable"].toggleRowSelection(item);
            // console.log(item);
            this.$refs["multipleTable"].toggleRowSelection(item, true);
          }
        });
      });
    },
    changeState(val) {},
    //  翻页之后调用该方法
    toggleSelection() {
      // console.log("使用了吗");
      //翻页之后要勾选上一页选中的,增加延时,在列表渲染完成后选中
      setTimeout(() => {
        // console.log(this.selection);
        this.selection.forEach(item => {
          if (arrFindObjIndex(this.selection, item, "id_用户") !== -1) {
            this.$refs["multipleTable"].toggleRowSelection(item);
          }
        });
      }, 500);
    },
    selectAllFn(selection) {
      if (!selection.length) {
        // 全选时，选中的数据为空时，要清理掉缓存中当页的数据
        this.tableData.forEach(item => {
          const index = arrFindObjIndex(this.selection, item, "id_用户");
          if (index !== -1) {
            this.selection.splice(index, 1);
          }
        });
      } else {
        // 全选时，选中的数据不为空时，要在缓存中添加当页的数据
        selection.forEach(item => {
          const index = arrFindObjIndex(this.selection, item, "id_用户");
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
      const index = arrFindObjIndex(this.selection, row, "id_用户");
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
    //创建盘点
    submit(form) {},
    onload() {
      this.loading = true;
      get_alluser(this.pageinfo).then(res => {
        this.tableData = res.data;
        this.pageinfo.count = res.count;
        this.loading = false;
      });

      // get_alldepartmentpeople({ departmentwo: this.$store.getters.id_二级部门 })
      //   .then(response => {
      //     console.log(response.data);

      //     for (let i in response.data) {
      //       for (let j in response.data[i].children) {
      //         this.tableData.push(response.data[i].children[j]);
      //       }
      //     }
      //     // this.tableData = response.data;
      //   })
      //   .catch(error => {});
    }
  },
  beforeMount() {
    this.onload(); //查询负责人
  }
};
</script>

<style scoped></style>
