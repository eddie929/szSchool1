import request from "@/utils/request";
// 汇总
export function get_depreciationassets(params) {
  return request({
    url: "/depreciationhandle/get_depreciationassets",
    method: "get",
    params
  });
}
// 明细
export function get_depreciationassetsdetail(params) {
  return request({
    url: "/depreciationhandle/get_depreciationassetsdetail",
    method: "get",
    params
  });
}
// 发起折旧
export function create_depreciationdata(data) {
  return request({
    url: "/depreciationhandle/create_depreciationdata",
    method: "post",
    data
  });
}
// 发起折旧
export function get_depreciationlist(params) {
  return request({
    url: "/depreciationhandle/get_depreciationlist",
    method: "get",
    params
  });
}
// 发起折旧汇总
export function create_depreciationdatadetailsum(data) {
  return request({
    url: "/depreciationhandle/create_depreciationdatadetailsum",
    method: "post",
    data
  });
}
// 发起折旧汇总
export function depreciation_finaleapproval(params) {
  return request({
    url: "/depreciationhandle/depreciation_finaleapproval",
    method: "put",
    params
  });
}
// 查折旧汇总
export function get_depresimdata(params) {
  return request({
    url: "/depreciationhandle/get_depresimdata",
    method: "get",
    params
  });
}
// 差折旧汇总明细
export function get_depresimdatamessage(params) {
  return request({
    url: "/depreciationhandle/get_depresimdatamessage",
    method: "get",
    params
  });
}
// 查询是否存在账期
export function get_querytime(params) {
  return request({
    url: "/depreciationhandle/get_querytime",
    method: "get",
    params
  });
}
// 撤销
export function depreciationdataithdrawremove(params) {
  return request({
    url: "/depreciationhandle/depreciationdataithdrawremove",
    method: "post",
    params
  });
}
// 折旧列表--待完善信息
export function get_adddepreciationlist(params) {
  return request({
    url: '/depreciationhandle/get_adddepreciationlist',
    method: 'get',
    params
  })
}