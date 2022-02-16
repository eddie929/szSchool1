<template>
  <div style="width: 100%">
    <el-upload
      class="upload-demo upload-flex"
      :action="action"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :file-list="fileList"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :on-change="handleChange"
      :before-upload="beforeAvatarUpload"
    >
      <el-button slot="trigger" size="mini" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">附件上传(最大5M)</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      documentId: "",
      assetsnum: "",
      fileList: [],
      requestUrl: {},
      action: ""
    };
  },
  methods: {
    handlePreview(file) {
      // console.log(file);
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleChange(file, fileList) {
      //上传文件变化时
      this.fileList = fileList;
      // const isJPG = file.type === "image/jpeg";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isLt5M) {
        this.$message.warning("文件大小不能超过 5MB!");
      }
      if (isLt5M) {
        // console.log(file.raw);
        // this.fileList = file.raw || null;
      } else {
        fileList.splice(-1, 1);
      }
    },
    //上传前验证
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 20MB!");
      }
      //文件名转码
      var suffix = file.name;
      var key = encodeURI(`${suffix}`);
      // console.log(key);
      return isLt2M;
    },
    //上传成功
    handleAvatarSuccess(res, file, fileList) {
      this.requestUrl.ID = parseInt(res.code);
      this.$emit("select");
    },
    onload(val) {
      // console.log("=========", val);
      if (val.资产编号 != undefined) {
        this.documentId = val.单据编号;
        this.assetsnum = val.资产编号;
        this.action =
          "http://82.156.97.125:8082/filehandle/flie_insert?fk_user=" +
          this.$store.getters.id_用户 +
          "&documentId=" +
          val.单据编号 +
          "&flowname=" +
          val.flowname +
          "&assetsnum=" +
          val.资产编号
      } else {
        this.documentId = val.单据编号;
        this.action =
          "http://82.156.97.125:8082/filehandle/flie_insert?fk_user=" +
          this.$store.getters.id_用户 +
          "&documentId=" +
          val.单据编号 +
          "&flowname=" +
          val.flowname;
      }
    }
  }
};
</script>

<style></style>
