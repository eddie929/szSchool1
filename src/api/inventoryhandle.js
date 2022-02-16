import request from '@/utils/request'

// 页面--界面显示
export function get_inventorylist(params) {
    return request({
        url: '/inventoryhandle/get_inventorylist',
        method: 'GET',
        params
    })
}
// 页面--创盘点
export function create_inventorytask(data) {
    return request({
        url: '/inventoryhandle/create_inventorytask',
        method: 'POST',
        data
    })
}

// 页面--创分配
export function create_inventorysendtask(data) {
    return request({
        url: '/inventoryhandle/create_inventorysendtask',
        method: 'POST',
        data
    })
}

// 查询--学校部门人员
export function get_alldepartmentpeople(params) {
    return request({
        url: '/inventoryhandle/get_alldepartmentpeople',
        method: 'GET',
        params
    })
}
// 查询--盘点特定类
export function get_allcategoryname() {
    return request({
        url: '/inventoryhandle/get_allcategoryname',
        method: 'GET',
    })
}
// 页面--详情进度
export function get_checkprocessprogress(params) {
    return request({
        url: '/inventoryhandle/get_checkprocessprogress',
        method: 'GET',
        params
    })
}
// 代办--已盘点
export function get_assetstobecountedbyflowstate(params) {
    return request({
        url: '/inventoryhandle/get_assetstobecountedbyflowstate',
        method: 'GET',
        params
    })
}
// 代办--未盘点
export function get_assetstobecounted(params) {
    return request({
        url: '/inventoryhandle/get_assetstobecounted',
        method: 'GET',
        params
    })
}
// 报告--类别占比显示
export function proportionofasset(params) {
    return request({
        url: '/inventoryhandle/proportionofasset',
        method: 'GET',
        params
    })
}
// 报告--盘点方式占比显示
export function proportionowayfasset(params) {
    return request({
        url: '/inventoryhandle/proportionowayfasset',
        method: 'GET',
        params
    })
}
// 报告--整体数据
export function proportionwholedata(params) {
    return request({
        url: '/inventoryhandle/proportionwholedata',
        method: 'GET',
        params
    })
}
// 报告--盈亏分析
export function profitlossanalysis(params) {
    return request({
        url: '/inventoryhandle/profitlossanalysis',
        method: 'GET',
        params
    })
}
// 盈亏处理--盘盈/盘亏
export function inventorygaininventory(params) {
    return request({
        url: '/inventoryhandle/inventorygaininventory',
        method: 'GET',
        params
    })
}
// 报告--盘亏详情汇总
export function inventorydetailsum(params) {
    return request({
        url: '/inventoryhandle/inventorydetailsum',
        method: 'GET',
        params
    })
}

// 报告--盘亏/盘盈详情明细
export function inventorydetail(params) {
    return request({
        url: '/inventoryhandle/inventorydetail',
        method: 'GET',
        params
    })
}
// 拍照审核--列表
export function get_photoreviewlist(params) {
    return request({
        url: '/inventoryhandle/get_photoreviewlist',
        method: 'GET',
        params
    })
}
// 盈亏处理--加报废库
export function create_handleassets(data) {
    return request({
        url: '/inventoryhandle/create_handleassets',
        method: 'POST',
        data
    })
}
// 页面详情--提交任务
export function inventory_sunmitdetail(params) {
    return request({
        url: '/inventoryhandle/inventory_sunmitdetail',
        method: 'PUT',
        params
    })
}
// 盘点申请撤销
export function inventorytaskwithdrawremove(params) {
    return request({
        url: '/inventoryhandle/inventorytaskwithdrawremove',
        method: 'POST',
        params
    })
}
// 教育局--创盘点
export function create_educationtask(data) {
    return request({
        url: '/inventoryhandle/create_educationtask',
        method: 'POST',
        data
    })
}
// 教育局--界面
export function get_educationinventorylist(params) {
    return request({
        url: '/inventoryhandle/get_educationinventorylist',
        method: 'GET',
        params
    })
}
// 管理员完善--盘点任务
export function updateset_inventorytask(data) {
    return request({
        url: '/inventoryhandle/updateset_inventorytask',
        method: 'POST',
        data
    })
}
// 教育局--学校查询
export function get_allschool(params) {
    return request({
        url: '/inventoryhandle/get_allschool',
        method: 'GET',
        params
    })
}
// 教育局--流程信息
export function get_eductionpocessprogress(params) {
    return request({
        url: '/inventoryhandle/get_eductionpocessprogress',
        method: 'GET',
        params
    })
}
// 教育局--盈亏分析
export function eductionprofitlossanalysis(params) {
    return request({
        url: '/inventoryhandle/eductionprofitlossanalysis',
        method: 'GET',
        params
    })
}
// 教育局报告--整体数据
export function eductionwholedata(params) {
    return request({
        url: '/inventoryhandle/eductionwholedata',
        method: 'GET',
        params
    })
}
// 教育局进度--查看进度(已盘)
export function get_eductiontobecountedbyflowstate(params) {
    return request({
        url: '/inventoryhandle/get_eductiontobecountedbyflowstate',
        method: 'GET',
        params
    })
}
// 教育局详情--查看进度(未盘)
export function get_eductiontobecounted(params) {
    return request({
        url: '/inventoryhandle/get_eductiontobecounted',
        method: 'GET',
        params
    })
}