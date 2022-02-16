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

