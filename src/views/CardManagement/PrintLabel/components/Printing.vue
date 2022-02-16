<template>
  <div>
    <div>
      <div id="left">
        <!-- <div id="qrcode" ref="qrcode"></div> -->

        <div style="margin: 0 auto" id="qrcode2" v-html="printHtml"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { get_handledata } from "@/api/printlabelhandle";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      data: [],
      printHtml: "",
      sum: 0,
      timer: "",
      loading: "",
      // str:new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')，
    };
  },
  methods: {
    qrCode(data) {
      this.$nextTick(function () {
        // document.getElementById("right1").innerHTML = data.资产名称;
        // document.getElementById("right2").innerHTML = data.资产编号;
        let qrcode = new QRCode("qrcode", {
          width: 80,
          height: 80,
          text: data.资产名称 + "\n" + data.资产编号,
          colorDark: "#000",
          colorLight: "#fff",
        });
      });
    },
    get() {
      this.sum++;
      // console.log(this.sum);
      if (this.sum == 2) {
        this.loading.close();
        setTimeout(() => {
          this.open();
        }, 100);
      }
    },

    open() {
      window.print(); //打印刚才新建的网页
      window.location.reload();
    },
  },
  beforeMount: function () {
    // console.log(this.$route.query);
    // return;
    get_handledata({ leaderId: this.$route.query.data }).then((res) => {
      if (res.code > 0) {
        let data = res.data;
        // console.log("data!",data);
        if (data && data.length > 0) {
          this.data = data;

          let _self = this;
          let head_str = "<html><head></head><body>"; //先生成头部
          let foot_str = "</body></html>"; //生成尾部

          let printContent =
            "<div id='zuida' style=' width:700px;margin:0 auto;overflow:hidden;'>";
          let pLength = _self.data.length; //pLength为所要打印的数组对象的长度

          for (let i = 0; i < pLength; i++) {
            // console.log("_self.data[i].资产编号", _self.data[i].资产编号);
            if (_self.data[i].资产编号.lastIndexOf("_") == -1) {
              _self.data[i].资产编号缩写 = _self.data[i].资产编号.substring(
                _self.data[i].资产编号.length - 6
              );
            } else {
              _self.data[i].index = _self.data[i].资产编号.lastIndexOf("_");
              _self.data[i].资产编号缩写bf = _self.data[i].资产编号.substring(
                _self.data[i].资产编号.length - 5,
                6
              );
              _self.data[i].资产编号缩写af = _self.data[i].资产编号.substring(
                _self.data[i].index + 1,
                _self.data[i].资产编号.length
              );
              _self.data[i].资产编号缩写 =
                _self.data[i].资产编号缩写bf +
                "_" +
                _self.data[i].资产编号缩写af;
            }
            printContent +=
              "<div id='zong' style='margin-top:42px;height:120px;font-size:8px;font-weight:bold;float:left;width:50%;margin-left:0%;paddingbackground-color:#ecf5ff; '><h2 style='margin-top:-28px;margin-left:26px;text-align:center;font-size:14px;'>" +
              _self.data[i].学校名称 +
              "</h2><div  style='margin-top:28px;margin-left:50px;margin-right:20px;width:40%' id='XQ" +
              i +
              "'></div><div style='width:100%;margin-left:0px; '><p style='display:block;height:70px;margin-top:-92px;margin-left:144px;font-size:15px;font-weight:500'>名称:" +
              _self.data[i].资产名称 +
              "</p><p style='margin-top:-32px;font-size:15px;margin-left:144px;font-weight:500'>编号:" +
              _self.data[i].资产编号缩写 +
              "</p><p style='margin-top:-12px;font-size:15px;margin-left:144px;font-weight:500'>购置日期:" +
              _self.data[i].购置日期 +
              "</p></div></div>";
          }
          //console.log(printContent);
          _self.printHtml = printContent + "</div>";

          // document.getElementById("qrcode2").innerHTML = _self.printHtml;
          // console.log(1);
          // let new_str = document.getElementById("qrcode2").innerHTML; //获取指定打印区域
          let new_str = _self.printHtml; //获取指定打印区域
          // console.log(2);
          //构建新网页(关键步骤,必须先构建新网页,在生成二维码,否则不能显示二维码)
          document.body.innerHTML = head_str + new_str + foot_str;
          //console.log(_self.data);
          for (let j = 0; j < _self.data.length; j++) {
            document.getElementById("XQ" + j).innerHTML = ""; //置空
            //console.log(_self.data[j].id);
            this.$nextTick(function () {
              let qrcode = new QRCode("XQ" + j, {
                text: _self.data[j].资产编号 + "",
                width: 90,
                height: 90,
                colorDark: "#000000",
                colorLight: "#ffffff",
              });
            });
          }
          this.loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          this.timer = setInterval(this.get, 1000);

          // if (this.sum == 5) {
          //   window.print(); //打印刚才新建的网页
          //   window.location.reload();
          // }

          return false;
        } else {
          this.data = [];
        }
      }
    });
  },
};
</script>

<style>
</style>