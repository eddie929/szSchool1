<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <!-- 树 -->
    <transition name="el-zoom-in-top">
      <el-card style="margin: 0px 0px 0px 0px; height: 90vh">
        <div slot="header" class="clearfix">
          <el-button
            type="primary"
            plain
            size="mini"
            style="margin-left: 10px"
            icon="el-icon-circle-plus"
            @click="newcategory()"
            >新建类别</el-button
          >
        </div>

        <el-row style="margin: 0px 10px 0px 0px; height: 100%; width: 300px">
          <el-col :span="24">
            <el-tree
              ref="tree"
              v-loading="treeloading"
              :data="treedata"
              :props="defaultProps"
              :highlight-current="true"
              node-key="id"
              accordion
              class="filter-tree"
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
            >
              <span slot-scope="{ node, data }" class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                    v-if="data.分类等级 != '四级'"
                    type="text"
                    size="mini"
                    icon="el-icon-plus"
                    @click="newflow(data)"
                    >新建下级
                  </el-button>
                </span>
              </span>
            </el-tree>
          </el-col>
        </el-row>
      </el-card>
    </transition>
    <!-- 编辑 删除等... -->

    <RightForm ref="RightForm" @onload="onload" />
    <AddCaregory ref="AddCaregory" @onload="onload" />
  </el-container>
</template>

<script>
import { get_categoryall } from "@/api/categoryhandle";
import RightForm from "./components/RightForm.vue";
import AddCaregory from "./components/AddCaregory.vue";
export default {
  components: { RightForm, AddCaregory },
  data() {
    return {
      treeloading: false, //树加载
      treedata: [], //树数据
      defaultProps: {
        children: "children",
        label: "分类名称",
        value: "id",
        checkStrictly: true,
      },
    };
  },
  methods: {
    // 新建类别
    newcategory() {
      this.$refs.AddCaregory.newcategoryshow = true;
      this.$refs.AddCaregory.dialogtitle = "新建资产类别";
      this.$refs.AddCaregory.分类等级 = "一级";
      this.$refs.AddCaregory.ifdisplay = false;

    },
    // 新家下级
    newflow(val) {
      // console.log(val);
      if (val.分类等级 == "一级") {
        this.$refs.AddCaregory.分类等级 = "二级";
      } else if (val.分类等级 == "二级") {
        this.$refs.AddCaregory.分类等级 = "三级";
      } else if (val.分类等级 == "三级") {
        this.$refs.AddCaregory.分类等级 = "四级";
      }

      this.$refs.AddCaregory.newform.fk_id = val.id;
      this.$refs.AddCaregory.ifdisplay = true;
      this.$refs.AddCaregory.dialogtitle = "新建资产类别";
      this.$refs.AddCaregory.newcategoryshow = true;
    },
    // 树点击
    handleNodeClick(val) {
      if (val.分类等级 == "一级") {
        this.$refs.RightForm.disp = false;
      } else {
        this.$refs.RightForm.disp = true;
      }
      this.$refs.RightForm.flowinfo = val;
      if (val.display == 1) {
        this.$refs.RightForm.displays = true;
      } else {
        this.$refs.RightForm.displays = false;
      }
    },
    // o
    onload() {
      get_categoryall().then((res) => {
        if (res.code == 100) {
          this.treedata = res.data;
        } else {
          this.treedata = [];
        }
      });
    },
  },
  beforeMount() {
    this.onload();
  },
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
