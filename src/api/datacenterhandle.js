// 数据中心
import request from '@/utils/request'
//  存放地视图查询
export function get_buildingview(params) {
  return request({
    url: '/datacenterhandle/get_buildingview',
    method: 'get',
    params
  })
}

//  部门视图
export function get_departmentview(params) {
  return request({
    url: '/datacenterhandle/get_departmentview',
    method: 'get',
    params
  })
}

//  用户视图
export function get_peopleview(params) {
  return request({
    url: '/datacenterhandle/get_peopleview',
    method: 'get',
    params
  })
}

// 数据看板/资产分布
export function get_assetdistribution(params) {
  return request({
    url: '/datacenterhandle/get_assetdistribution',
    method: 'get',
    params
  })
}

// 数据看板/标签情况
export function get_labeldata(params) {
  return request({
    url: '/datacenterhandle/get_labeldata',
    method: 'get',
    params
  })
}

// 数据看板/登录数据
export function get_logindata(params) {
  return request({
    url: '/datacenterhandle/get_logindata',
    method: 'get',
    params
  })
}
// 数据看板/整体数据
export function get_wholedata(params) {
  return request({
    url: '/datacenterhandle/get_wholedata',
    method: 'get',
    params
  })
}
