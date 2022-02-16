import request from "@/utils/request";
// 查询待打印库
export function get_printlabelhandle(params) {
  return request({
    url: "/printlabelhandle/get_printlabelhandle",
    method: "get",
    params
  });
}
// 添加待打印库
export function create_printlabelh(data) {
  return request({
    url: "/printlabelhandle/create_printlabelh",
    method: "post",
    data
  });
}
// 添加待打印库
export function del_printlabelh(data) {
  return request({
    url: "/printlabelhandle/del_printlabelh",
    method: "delete",
    data
  });
}
// 按照id, 查资产
export function get_handledata(params) {
  return request({
    url: "/printlabelhandle/get_handledata",
    method: "get",
    params
  });
}
// 打印记录
export function create_printlabelflow(data) {
  return request({
    url: "/printlabelhandle/create_printlabelflow",
    method: "post",
    data
  });
}
