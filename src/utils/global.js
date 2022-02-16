// import { MessageBox } from 'element-ui'
import { Message } from "element-ui";
// 创建状态通知
function insert_box(code, oktitle) {
  if (code === 100) {
    this.$notify({
      title: "成功",
      message: oktitle || "创建成功",
      type: "success"
    });
  } else if (code === 101) {
    this.$notify({
      title: "警告",
      message: oktitle || "参数无效请重试。",
      type: "warning"
    });
  } else if (code === 102) {
    this.$notify({
      title: "警告",
      message: oktitle || "参数为空请重试。",
      type: "warning"
    });
  } else if (code === -1) {
    this.$notify.error({
      title: "错误",
      message: oktitle || "API错误，请联系管理员。"
    });
  }
}

function del_box(code, oktitle) {
  if (code === 100) {
    this.$notify({
      title: "成功",
      message: oktitle || "删除成功",
      type: "success"
    });
  } else if (code === 101) {
    this.$notify({
      title: "警告",
      message: oktitle || "参数无效请重试。",
      type: "warning"
    });
  } else if (code === 102) {
    this.$notify({
      title: "警告",
      message: oktitle || "参数为空请重试。",
      type: "warning"
    });
  } else if (code === -1) {
    this.$notify.error({
      title: "错误",
      message: oktitle || "API错误，请联系管理员。"
    });
  } else if (code === 110) {
    this.$notify({
      title: "警告",
      message: oktitle || "请选择...",
      type: "warning"
    });
  }
}

function alter_box(code, oktitle) {
  if (code === 100) {
    this.$notify({
      title: "成功",
      message: oktitle || "修改成功",
      type: "success"
    });
  } else if (code === 101) {
    this.$notify({
      title: "警告",
      message: oktitle || "参数无效请重试。",
      type: "warning"
    });
  } else if (code === 102) {
    this.$notify({
      title: "警告",
      message: oktitle || "参数为空请重试。",
      type: "warning"
    });
  } else if (code === -1) {
    this.$notify.error({
      title: "错误",
      message: oktitle || "API错误，请联系管理员。"
    });
  }
}

function get_box(code, oktitle) {
  if (code === 100) {
    this.$notify({
      title: "成功",
      message: oktitle || "查询成功",
      type: "success"
    });
  } else if (code === 101) {
    this.$notify({
      title: "警告",
      message: oktitle || "参数无效请重试。",
      type: "warning"
    });
  } else if (code === 102) {
    this.$notify({
      title: "警告",
      message: oktitle || "参数为空请重试。",
      type: "warning"
    });
  } else if (code === -1) {
    this.$notify.error({
      title: "错误",
      message: oktitle || "API错误，请联系管理员。"
    });
  }
}
function msg(title, data) {
  if (title == "成功") {
    Message.success(data);
  } else if (title == "警告") {
    Message.warning(data);
  } else if (title == "错误") {
    Message.error(data);
  } else {
    Message.info(data);
  }
}
function maturity(row) {
  // console.log("是否到期:", row.是否到期);
  if (row.是否到期 == 1) {
    return "否";
  } else {
    return "是";
  }
}

export default {
  install(Vue, opeions) {
    Vue.prototype.insert_box = insert_box;
    Vue.prototype.del_box = del_box;
    Vue.prototype.alter_box = alter_box;
    Vue.prototype.get_box = get_box;
    Vue.prototype.msg = msg;
    Vue.prototype.maturity = maturity;
  }
};
