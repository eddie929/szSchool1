<template>
  <el-cascader
    ref="cascader"
    :options="options"
    :props="props"
    clearable
    @change="change"
    size="medium"
    :show-all-levels="false"
  ></el-cascader>
</template>

<script>
//   <!-- 资产类别 -->
import { get_categoryalldata } from "@/api/categoryhandle";
export default {
  data() {
    return {
      options: [],
      props: {
        children: "children",
        label: "分类名称",
        value: "id",
        checkStrictly: true,
      },
    };
  },
  methods: {
    get_categoryalldata() {
      get_categoryalldata().then((res) => {
        this.options = res.data;
      });
    },
    change(val) {
      // console.log(val);
      var data = {
        categoryone: 0,
        categorytwo: 0,
        categorythree: 0,
        categoryfour: 0,
      };
      if (val.length == 0) {
      }
      if (val.length > 0) {
        data.categoryone = val[0];
      }
      if (val.length > 1) {
        data.categorytwo = val[1];
      }
      if (val.length > 2) {
        data.categorythree = val[2];
      }
      if (val.length > 3) {
        data.categoryfour = val[3];
      }
      // console.log(data);
      this.$emit("getAssteSort", data);
    },
  },
  beforeMount() {
    this.get_categoryalldata();
  },
};
</script>

<style>
</style>