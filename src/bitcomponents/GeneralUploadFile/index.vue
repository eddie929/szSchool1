<template>
  <div>
    <!-- <a href=" " download="http://117.78.26.128:8013/file/wbwd.txt">aaaa</a>
    <a href="./file/08acfc1a-d335-45db-bd7e-661280da3a71.docx"
      download="wmwdz.docx"
      >下载</a> -->
    <!-- download  下载之后的名 -->
    <el-table
      :data="tableFileData"
      :header-cell-style="{
        'text-align': 'center',
        background: '#eef1f6'
      }"
      border
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column width="55" label="序号" type="index"></el-table-column>
      <el-table-column label="文件名" prop="name"></el-table-column>
      <el-table-column label="文件类型" prop="suffix"></el-table-column>
      <el-table-column label="上传时间" prop="creator_time"></el-table-column>
      <el-table-column label="操作" width="150px" prop="操作">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :href="scope.row.url"
            :download="scope.row.name"
            >下载</el-link
          >
          <!-- :download="scope.row.name" -->
          <!-- :href="'./file/' + scope.row.name_key" -->
          <el-link type="danger" @click="deletefile(scope.row)">删除</el-link>

          <!-- <el-button
            @click.native.prevent="download(scope.$index, scope.row)"
            type="text"
            size="small"
          >
            下载
          </el-button> -->
          <!-- <a href=" " download="http://117.78.26.128:8013/file/wbwd.txt">aaaa</a> -->
          <!-- <a href="./file/wmwdz.txt" download="wmwdz.txt">下载</a> -->
        </template>
      </el-table-column>
    </el-table>

    <div></div>
  </div>
</template>

<script>
import { del_filedocument } from "@/api/filehandle";
import { get_flowfile } from "@/api/filehandle";
export default {
  data() {
    return {
      documentId: "",
      flowname: "",
      assetsnum: "",
      tableFileData: []
    };
  },
  methods: {
    deletefile(val) {
      this.$confirm("确定删除" + val.name + ", 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        del_filedocument({ id_file: val.id }).then(res => {
          val.单据编号 = this.documentId
          val.资产编号 = this.assetsnum
          this.onload(val);
          this.$notify.success("删除成功");
        });
      });
    },
    onload(val) {
      this.flowname = val.flowname;
      this.documentId = val.单据编号;
      this.assetsnum = val.资产编号;
      get_flowfile({
        flowname: val.flowname,
        documentId: val.单据编号,
        assetsnum: val.资产编号,
      }).then(res => {
        this.tableFileData = res.data;
      });
    }
    // download(index, row) {
    //   console.log(index);
    //   console.log(row);
    // },
    //下载
    // handleList(file) {
    //   let url = "/file/downLoadToLocal";
    //   http
    //     .get(url, file.url ? { filePath: file.url } : {}, {
    //       responseType: "blob"
    //     })
    //     .then(res => {
    //       let fileName = decodeURIComponent(
    //         res.headers["content-disposition"].slice(
    //           res.headers["content-disposition"].indexOf("=") + 2
    //         )
    //       );
    //       this.downloadFile(res.data, fileName);
    //     });
    // },

    // downloadFile(content, fileName) {
    //   fileName &&
    //     fileName.indexOf(".") !== -1 &&
    //     (fileName = fileName.slice(0, fileName.indexOf(".")));
    //   const blob = new Blob([content], {
    //     type: content.type
    //   });
    //   if (
    //     "download" in document.createElement("a") &&
    //     navigator.userAgent.indexOf("Edge") <= -1
    //   ) {
    //     // 非IE 及edge下载
    //     const elink = document.createElement("a");
    //     fileName && (elink.download = fileName);
    //     elink.style.display = "none";
    //     elink.href = URL.createObjectURL(blob);
    //     document.body.appendChild(elink);
    //     elink.click();
    //     URL.revokeObjectURL(elink.href); // 释放URL 对象
    //     document.body.removeChild(elink);
    //   } else {
    //     // IE10+下载
    //     fileName
    //       ? navigator.msSaveOrOpenBlob(blob, fileName)
    //       : navigator.msSaveOrOpenBlob(blob);
    //   }
    // }
  }
};
</script>

<style></style>
