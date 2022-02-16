<template>
  <el-cascader
    v-model="value"
    ref="cascader"
    :options="options"
    :props="props"
    clearable
    @change="change"
    style="width: 100%"
  ></el-cascader>
</template>

<script>
import { get_schoolresponseperson } from "@/api/assetaccounthandle";
export default {
  data() {
    return {
      options: [],
      value: "",
      props: {
        children: "children2",
        label: "name",
        value: "id",
        checkStrictly: false, //是否可以选择任意一级
      },
    };
  },
  methods: {
    change(val) {
      // console.log(val);
      this.$emit("UsersSelect", val);
    },
    cascader() {
      this.$refs.cascader.inputValue = "";
    },
    onload() {
      var data = {
        departmentone: this.$store.getters.id_一级部门,
        departmentwo: this.$store.getters.id_二级部门,
      };
      get_schoolresponseperson(data).then((res) => {
        this.options = res.data;
      });
    },
  },
  beforeMount() {
    this.onload();
  },
};
</script>

<style>
</style>