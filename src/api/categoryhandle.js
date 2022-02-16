import request from '@/utils/request'

// 查询全部分类
export function get_categoryall() {
    return request({
      url: '/categoryhandle/get_categoryall',
      method: 'get'
    })
  }
// 查询全部分类
export function up_categorydata(data) {
    return request({
      url: '/categoryhandle/up_categorydata',
      method: 'PUT',
      data
    })
  }
// 新建一级类别
export function insert_categorydata(data) {
    return request({
      url: '/categoryhandle/insert_categorydata',
      method: 'post',
      data
    })
  }
// 新建二级类别
export function insert_categorytwo(data) {
    return request({
      url: '/categoryhandle/insert_categorytwo',
      method: 'post',
      data
    })
  }
// 新建三级类别
export function insert_categorythree(data) {
    return request({
      url: '/categoryhandle/insert_categorythree',
      method: 'post',
      data
    })
  }
// 新建四级类别
export function insert_categoryfour(data) {
    return request({
      url: '/categoryhandle/insert_categoryfour',
      method: 'post',
      data
    })
  }
// 删除类别
export function del_categorydata(params) {
    return request({
      url: '/categoryhandle/del_categorydata',
      method: 'delete',
      params
    })
  }
// 查询资产类别(系统用)
export function get_categoryalldata() {
    return request({
      url: '/categoryhandle/get_categoryalldata',
      method: 'get'

    })
  }
