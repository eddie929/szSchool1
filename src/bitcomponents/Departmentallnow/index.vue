<template>
  <el-cascader
    ref="cascader"
    :options="options"
    :props="props"
    clearable   
    
    @change="change"
  ></el-cascader>
</template>

<script>
// 当前机构归属部门
import { get_allschooldepartment } from "@/api/assetaccounthandle";
export default {
  data() {
    return {
      options: [],
      props: {
        children: "children",
        label: "name",
        value: "id",
        checkStrictly: true,
      },
    };
  },
  methods: {
    get_allschooldepartment() {
      var data = {
        departmentone: this.$store.getters.id_一级部门,
        departmentwo: this.$store.getters.id_二级部门,
      };
      get_allschooldepartment(data).then((res) => {
        this.options = res.data;
      });
    },
    //改变
    change(val) {
      this.$emit("Departmentallnow", val);
    },
  },
  beforeMount() {
    this.get_allschooldepartment();
  },
};
</script>

<style>
</style>