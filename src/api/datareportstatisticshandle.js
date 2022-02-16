import request from "@/utils/request";
// 待办
export function get_agencydatal(params) {
  return request({
    url: "/datareportstatisticshandle/get_agencydatal",
    method: "get",
    params
  });
}
//代办流程名
export function get_agencydataselect(params) {
  return request({
    url: "/datareportstatisticshandle/get_agencydataselect",
    method: "get",
    params
  });
}
//资产分类
export function get_proportionassetclasses(params) {
  return request({
    url: "/datareportstatisticshandle/get_proportionassetclasses",
    method: "get",
    params
  });
}
//资产状态
export function get_proportionamountquantity(params) {
  return request({
    url: "/datareportstatisticshandle/get_proportionamountquantity",
    method: "get",
    params
  });
}
//增减趋势
export function get_increaseordecreaseinassets(params) {
  return request({
    url: "/datareportstatisticshandle/get_increaseordecreaseinassets",
    method: "get",
    params
  });
}
//首页各种数据
export function get_proportionamountquantitycount(params) {
  return request({
    url: "/datareportstatisticshandle/get_proportionamountquantitycount",
    method: "get",
    params
  });
}
//消息中心
export function get_noticelist(params) {
  return request({
    url: "/datareportstatisticshandle/get_noticelist",
    method: "get",
    params
  });
}
//设为已读
export function get_noticelistcount(params) {
  return request({
    url: "/datareportstatisticshandle/get_noticelistcount",
    method: "PUT",
    params
  });
}

