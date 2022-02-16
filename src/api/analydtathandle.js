import request from '@/utils/request'
//  验收入库单
export function get_enterhouseshaow(params) {
  return request({
    url: '/analydtathandle/get_enterhouseshaow',
    method: 'get',
    params
  })
}
//  验收入库
export function get_enterhouse(params) {
  return request({
    url: '/analydtathandle/get_enterhouse',
    method: 'get',
    params
  })
}
// 资产借还
export function get_borrowreback(params) {
  return request({
    url: '/analydtathandle/get_borrowreback',
    method: 'get',
    params
  })
}
// 资产借还明细
export function get_borrowrebackdetail(params) {
  return request({
    url: '/analydtathandle/get_borrowrebackdetail',
    method: 'get',
    params
  })
}

//  报修
export function get_assetsrepair(params) {
  return request({
    url: '/analydtathandle/get_assetsrepair',
    method: 'get',
    params
  })
}
// 明细
export function get_assetsrepairdetail(params) {
  return request({
    url: '/analydtathandle/get_assetsrepairdetail',
    method: 'get',
    params
  })
}
// 转移单
export function get_assettransfer(params) {
  return request({
    url: '/analydtathandle/get_assettransfer',
    method: 'get',
    params
  })
}
// 明细
export function get_assettransferdetail(params) {
  return request({
    url: '/analydtathandle/get_assettransferdetail',
    method: 'get',
    params
  })
}
// 原值变动
export function get_originalaluequery(params) {
  return request({
    url: '/analydtathandle/get_originalaluequery',
    method: 'get',
    params
  })
}
// 原值变动
export function get_originalaluequerydetail(params) {
  return request({
    url: '/analydtathandle/get_originalaluequerydetail',
    method: 'get',
    params
  })
}
// 资产处置单
export function get_assetshandle(params) {
  return request({
    url: '/analydtathandle/get_assetshandle',
    method: 'get',
    params
  })
}
// 处置明细
export function get_assetshandledetail(params) {
  return request({
    url: '/analydtathandle/get_assetshandledetail',
    method: 'get',
    params
  })
}
