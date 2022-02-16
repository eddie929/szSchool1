import request from "@/utils/request";
// 创建调拨单
export function create_assetallocation(data) {
  return request({
    url: "/assetallocationhandle/create_assetallocation",
    method: "post",
    data
  });
}
// 创建详情
export function create_assetallocationdetail(data) {
  return request({
    url: "/assetallocationhandle/create_assetallocationdetail",
    method: "post",
    data
  });
}
// 调拨详情
export function get_assetallocationatabyId(params) {
  return request({
    url: "/assetallocationhandle/get_assetallocationatabyId",
    method: "get",
    params
  });
}
// 调拨 分管处理
export function assetallocation_approval(params) {
  return request({
    url: "/assetallocationhandle/assetallocation_approval",
    method: "post",
    params
  });
}
// 调拨 调入单位 管理员审批
export function assetallocation_approvalhandle(params) {
  return request({
    url: "/assetallocationhandle/assetallocation_approvalhandle",
    method: "post",
    params
  });
}
// 调拨 调入单位 分管领导审批
export function assetallocation_mangerapprovalhandle(params) {
  return request({
    url: "/assetallocationhandle/assetallocation_mangerapprovalhandle",
    method: "post",
    params
  });
}
// 调拨 主管领导审批
export function assetallocation_mangerapprovalhandles(params) {
  return request({
    url: "/assetallocationhandle/assetallocation_mangerapprovalhandles",
    method: "post",
    params
  });
}
// 调拨 调出单位 确认
export function assetallocation_lhandles(params) {
  return request({
    url: "/assetallocationhandle/assetallocation_lhandles",
    method: "post",
    params
  });
}
// 调拨 调入单位 确认
export function assetallocation_lhandle(params) {
  return request({
    url: "/assetallocationhandle/assetallocation_lhandle",
    method: "post",
    params
  });
}
// 调拨 调出财务记账
export function assetallocationfinally(params) {
  return request({
    url: "/assetallocationhandle/assetallocationfinally",
    method: "post",
    params
  });
}
// 调拨 调入财务记账
export function assetallocationouytfinally(params) {
  return request({
    url: "/assetallocationhandle/assetallocationouytfinally",
    method: "post",
    params
  });
}
// 调拨 重新发起
export function assetallocation_rebacksubmit(data) {
  return request({
    url: "/assetallocationhandle/assetallocation_rebacksubmit",
    method: "post",
    data
  });
}
// 调拨 申请撤销
export function applicantwithdrawremove(params){
  return request({
    url:'/assetallocationhandle/applicantwithdrawremove',
    method:'post',
    params
  })
}