import request from '@/utils/request'

// 查询全部分类
export function up_atfile(params) {
  return request({
    url: '/filehandle/up_atfile',
    method: 'post',
    params
  })
}
// 文件查询
export function get_flowfile(params) {
  return request({
    url: '/filehandle/get_flowfile',
    method: 'get',
    params
  })
}
// 文件删除
export function del_filedocument(params) {
  return request({
    url: '/filehandle/del_filedocument',
    method: 'delete',
    params
  })
}
// 获取流程信息
export function get_flowdata(params) {
  return request({
    url: '/filehandle/get_flowdata',
    method: 'get',
    params
  })
}
// 获取流程单据编号
export function get_flowDocumentNo(params) {
  return request({
    url: '/filehandle/get_flowDocumentNo',
    method: 'get',
    params
  })
}