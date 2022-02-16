<template>
  <el-cascader
    :options="options"
    :props="props"
    clearable
    @change="change"
    ref="cascader"   
  ></el-cascader>
</template>

<script>
import { get_storagelocation } from "@/api/assetaccounthandle";
export default {
  data() {
    return {
      options: [],
      props: {
        children: "children",
        label: "房间名称",
        value: "id",
        checkStrictly: true,
      },
    };
  },
  methods: {
    get_storagelocation() {
      var data = {
        departmentone: this.$store.getters.id_一级部门,
        departmentwo: this.$store.getters.id_二级部门,
      };

      get_storagelocation(data).then((res) => {
        this.options = res.data;
      });
    },
    change(val) {
      var data = {
        storeone: 0,
        storagetwo: 0,
      };
      if (val.length > 0) {
        data.storeone = val[0];
      }
      if (val.length > 1) {
        data.storagetwo = val[1];
      }
      this.$emit("getLocation", data);
    },
    cascader(){
      // console.log("重置存放地点")
      // console.log(this.$refs.cascader)
      this.$refs.cascader.inputValue="";
    },
  },
  beforeMount() {
    this.get_storagelocation();
  },
};
</script>

<style>
</style>