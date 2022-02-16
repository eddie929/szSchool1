// 购置验收
import request from "@/utils/request";

// 查询购置验收
export function get_purchaseacceptance(params) {
    return request({
        url: "/purchaseacceptancehandle/get_purchaseacceptance",
        method: "get",
        params
    });
}
//创建购置
export function create_purchaseacceptance(data) {
    return request({
        url: "/purchaseacceptancehandle/create_purchaseacceptance",
        method: "POST",
        data
    });
}
//创建购置详情
export function create_purchaseacceptancedetail(data) {
    return request({
        url: "/purchaseacceptancehandle/create_purchaseacceptancedetail",
        method: "POST",
        data
    });
}
// 查询详情
export function get_purchaseacceptancedatadetails(params) {
    return request({
        url: "/purchaseacceptancehandle/get_purchaseacceptancedatadetails",
        method: "get",
        params
    });
}
// 保存
export function saveedits_purchaseacceptancerebacksave(params) {
    return request({
        url: "/purchaseacceptancehandle/saveedits_purchaseacceptancerebacksave",
        method: "PUT",
        params
    });
}
// 验收
export function purchaseacceptance_approval(params) {
    return request({
        url: "/purchaseacceptancehandle/purchaseacceptance_approval",
        method: "PUT",
        params
    });
}
// 财务记账
export function purchaseacceptance_finaleapproval(params) {
    return request({
        url: "/purchaseacceptancehandle/purchaseacceptance_finaleapproval",
        method: "PUT",
        params
    });
}
// 财务记账
export function emport(data) {
    return request({
        url: "/purchaseacceptancehandle/emport",
        method: "POST",
        data
    });
}
// 撤销
export function purchaseawithdrawremove(params) {
    return request({
        url: "/purchaseacceptancehandle/purchaseawithdrawremove",
        method: "POST",
        params
    });
}