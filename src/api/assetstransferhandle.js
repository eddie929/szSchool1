import request from "@/utils/request";
// 查询资产转移单
export function get_assetstransferdatal(params) {
    return request({
        url: "/assetstransferhandle/get_assetstransferdatal",
        method: "get",
        params
    });
}
// 创建单
export function create_assetstransfer(data) {
    return request({
        url: "/assetstransferhandle/create_assetstransfer",
        method: "post",
        data
    });
}
// 详情
export function create_assetstransferdetail(data) {
    return request({
        url: "/assetstransferhandle/create_assetstransferdetail",
        method: "post",
        data
    });
}
// 查明细
export function get_assetstransferdatalbyId(params) {
    return request({
        url: "/assetstransferhandle/get_assetstransferdatalbyId",
        method: "get",
        params
    });
}

// 财务审批
export function assetstransfer_approval(params) {
    return request({
        url: "/assetstransferhandle/assetstransfer_approval",
        method: "post",
        params
    });
}
// 重新发起
export function assetstransfer_finaleapprovalsubmit(params) {
    return request({
        url: "/assetstransferhandle/assetstransfer_finaleapprovalsubmit",
        method: "post",
        params
    });
}
// 申请撤销
export function assetstransferapplicantremove(params) {
    return request({
        url: "/assetstransferhandle/assetstransferapplicantremove",
        method: "post",
        params
    });
}