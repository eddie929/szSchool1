import request from "@/utils/request";
// 查询维修工
export function get_assetsrepairpeople(params) {
    return request({
        url: "/assetarepairhandle/get_assetsrepairpeople",
        method: "get",
        params
    });
}
// 查询流程
export function get_purchaseacceptancelist(params) {
    return request({
        url: "/assetarepairhandle/get_purchaseacceptancelist",
        method: "get",
        params
    });
}
//创建报修流程
export function create_purchaseacceptance(data) {
    return request({
        url: "/assetarepairhandle/create_purchaseacceptance",
        method: "post",
        data
    });
}
//创建明细
export function create_purchaseacceptancedetail(data) {
    return request({
        url: "/assetarepairhandle/create_purchaseacceptancedetail",
        method: "post",
        data
    });
}
//创建明细
export function get_purchaseacceptancelistdetail(params) {
    return request({
        url: "/assetarepairhandle/get_purchaseacceptancelistdetail",
        method: "get",
        params
    });
}
//派单
export function purchaseacceptancelist_finaleapprovals(params) {
    return request({
        url: "/assetarepairhandle/purchaseacceptancelist_finaleapprovals",
        method: "post",
        params
    });
}
//维修完成
export function purchaseacceptancelist_repairapproval(params) {
    return request({
        url: "/assetarepairhandle/purchaseacceptancelist_repairapproval",
        method: "post",
        params
    });
}
//结果反馈
export function purchaseacceptancelist_finaleapproval(params) {
    return request({
        url: "/assetarepairhandle/purchaseacceptancelist_finaleapproval",
        method: "post",
        params
    });
}
//退回重新发起
export function save_purchaseacceptances(data) {
    return request({
        url: "/assetarepairhandle/save_purchaseacceptances",
        method: "post",
        data
    });
}
// 申请撤销
export function assetarepairapplicantremove(params) {
    return request({
        url: "/assetarepairhandle/assetarepairapplicantremove",
        method: "post",
        params
    });
}