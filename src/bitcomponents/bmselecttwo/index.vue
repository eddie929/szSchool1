<template>
  <el-select v-model="value" placeholder="请选择" :disabled="disabled">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id"
      size="medium"
    >
    </el-option>
  </el-select>
</template>

<script>
import { get_allschooldepartments } from "@/api/assetaccounthandle";
export default {
  data() {
    return {
      value: "",
      options: [],
      disabled: false,
    };
  },
  methods: {
    get_allschooldepartments() {
      var data = {
        departmentone: this.$store.getters.id_一级部门,
      };
      get_allschooldepartments(data).then((res) => {
        this.options = res.data;
      });
    },
    change(val) {},
  },
  beforeMount() {
    this.get_allschooldepartments();
    if (this.$store.getters.id_二级部门 != 0) {
      this.value = this.$store.getters.id_二级部门;
      this.disabled = true;
    } else {
      this.value = "";
      this.disabled = false;
    }
    // console.log(this.disabled);
  },
};
</script>

<style>
</style>