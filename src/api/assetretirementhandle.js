import request from "@/utils/request";
// 查询 待处置库
export function get_handledata(params) {
  return request({
    url: "/assetretirementhandle/get_handledata",
    method: "get",
    params
  });
}
// 添加 待处置库
export function create_handleassets(data) {
  return request({
    url: "/assetretirementhandle/create_handleassets",
    method: "post",
    data
  });
}
// 移除 待处置库
export function delassetlendingdata(data) {
  return request({
    url: "/assetretirementhandle/delassetlendingdata",
    method: "delete",
    data
  });
}
// 创建 报废
export function create_assetretirement(data) {
  return request({
    url: "/assetretirementhandle/create_assetretirement",
    method: "post",
    data
  });
}
// 创建 报废 详情
export function create_assetretirementdetail(data) {
  return request({
    url: "/assetretirementhandle/create_assetretirementdetail",
    method: "post",
    data
  });
}
// 查询
export function get_assetretirementdata(params) {
  return request({
    url: "/assetretirementhandle/get_assetretirementdata",
    method: "get",
    params
  });
}
// 查询 详情
export function get_assetretirementdatadetail(params) {
  return request({
    url: "/assetretirementhandle/get_assetretirementdatadetail",
    method: "get",
    params
  });
}
// 报废 分管领导审批
export function assetretirement_approval(params) {
  return request({
    url: "/assetretirementhandle/assetretirement_approval",
    method: "post",
    params
  });
}
// 报废  主管领导审批
export function assetretirementleader_approval(params) {
  return request({
    url: "/assetretirementhandle/assetretirementleader_approval",
    method: "post",
    params
  });
}
//报废  财务记账
export function assetretirementleader_finallyapproval(params) {
  return request({
    url: "/assetretirementhandle/assetretirementleader_finallyapproval",
    method: "post",
    params
  });
}
//报废  t退回再发起
export function assetlendingdata_rebacksubmit(params) {
  return request({
    url: "/assetretirementhandle/assetlendingdata_rebacksubmit",
    method: "post",
    params
  });
}
