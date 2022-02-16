import request from "@/utils/request";
// 关联查询存放地点
export function get_storagelocation(params) {
  return request({
    url: "/assetaccounthandle/get_storagelocation",
    method: "get",
    params
  });
}
//   学校及其部门
export function get_allschooldepartment(params) {
  return request({
    url: "/assetaccounthandle/get_allschooldepartment",
    method: "get",
    params
  });
}
//   查询台账
export function get_accountleader(params) {
  return request({
    url: "/assetaccounthandle/get_accountleader",
    method: "get",
    params
  });
}
//   查询具体负责人
export function get_accountleaderbyleaderId(params) {
  return request({
    url: "/assetaccounthandle/get_accountleaderbyleaderId",
    method: "get",
    params
  });
}
//  查所有学校
export function get_allschoolempy() {
  return request({
    url: "/assetaccounthandle/get_allschoolempy",
    method: "get"
  });
}
//  查所有学校
export function get_allschooldepartments(params) {
  return request({
    url: "/assetaccounthandle/get_allschooldepartments",
    method: "get",
    params
  });
}
//  查学校 下的负责人
export function get_schoolresponseperson(params) {
  return request({
    url: "/assetaccounthandle/get_schoolresponseperson",
    method: "get",
    params
  });
}
//  供应商查询
export function get_allschoolsupplier(params) {
  return request({
    url: "/assetaccounthandle/get_allschoolsupplier",
    method: "get",
    params
  });
}
//  修改
export function up_accountleadger(data) {
  return request({
    url: "/assetaccounthandle/up_accountleadger",
    method: "put",
    data
  });
}
//  修改
export function get_accountrecord(params) {
  return request({
    url: "/assetaccounthandle/get_accountrecord",
    method: "get",
    params
  });
}
//  供应商创建
export function insert_supplierdata(data) {
  return request({
    url: "/assetaccounthandle/insert_supplierdata",
    method: "PUT",
    data
  });
}
//  供应商创建
export function get_alldepartmentpeople(params) {
  return request({
    url: "/assetaccounthandle/get_alldepartmentpeople",
    method: "get",
    params
  });
}
