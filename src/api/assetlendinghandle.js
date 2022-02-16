import request from "@/utils/request";
// 创建资产借还单
export function create_assetlendingdata(data) {
    return request({
        url: "/assetlendinghandle/create_assetlendingdata",
        method: "post",
        data
    });
}
// 创建详情
export function create_assetlendingdatadetail(data) {
    return request({
        url: "/assetlendinghandle/create_assetlendingdatadetail",
        method: "post",
        data
    });
}
// 查询个人负责资产
export function get_accountbyId(params) {
    return request({
        url: "/assetlendinghandle/get_accountbyId",
        method: "get",
        params
    });
}
// 查流程
export function get_assetlendingdata(params) {
    return request({
        url: "/assetlendinghandle/get_assetlendingdata",
        method: "get",
        params
    });
}
// 查流程明细
export function get_assetlendingdatabyId(params) {
    return request({
        url: "/assetlendinghandle/get_assetlendingdatabyId",
        method: "get",
        params
    });
}
// 出借人是否同意
export function assetlendingdata_finaleapproval(params) {
    return request({
        url: "/assetlendinghandle/assetlendingdata_finaleapproval",
        method: "POST",
        params
    });
}
// 归还
export function assetlendingdata_Isnotfinaleapproval(params) {
    return request({
        url: "/assetlendinghandle/assetlendingdata_Isnotfinaleapproval",
        method: "POST",
        params
    });
}
// 确认归还
export function assetlendingdata_borrowIsnotfinaleapproval(params) {
    return request({
        url: "/assetlendinghandle/assetlendingdata_borrowIsnotfinaleapproval",
        method: "POST",
        params
    });
}
// 再发起
export function assetlendingdata_finaleapprovalsubmit(params) {
    return request({
        url: "/assetlendinghandle/assetlendingdata_finaleapprovalsubmit",
        method: "POST",
        params
    });
}
// 申请撤销
export function assetlendingapplicantremove(params) {
    return request({
        url: "/assetlendinghandle/assetlendingapplicantremove",
        method: "POST",
        params
    });
}