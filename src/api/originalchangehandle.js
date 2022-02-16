import request from "@/utils/request";
// 原值变动
export function get_originaldatal(params) {
    return request({
        url: "/originalchangehandle/get_originaldatal",
        method: "get",
        params
    });
}
// 创建原值变动
export function create_originaldata(data) {
    return request({
        url: "/originalchangehandle/create_originaldata",
        method: "post",
        data
    });
}
// 创建原值变动详情
export function create_originaldatadetail(data) {
    return request({
        url: "/originalchangehandle/create_originaldatadetail",
        method: "post",
        data
    });
}
// 第二次保存提交
export function originaldata_finaleapprovalsubmit(params) {
    return request({
        url: "/originalchangehandle/originaldata_finaleapprovalsubmit",
        method: "post",
        params
    });
}
// 查详情
export function get_originaldatalbyId(params) {
    return request({
        url: "/originalchangehandle/get_originaldatalbyId",
        method: "get",
        params
    });
}
// 财务审批
export function originaldata_finaleapproval(params) {
    return request({
        url: "/originalchangehandle/originaldata_finaleapproval",
        method: "post",
        params
    });
}
// 申请撤销
export function originalapplicantremove(params) {
    return request({
        url: "/originalchangehandle/originalapplicantremove",
        method: "post",
        params
    });
}