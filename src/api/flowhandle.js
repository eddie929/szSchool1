import request from '@/utils/request'

// 查询流程类别,流程信息
export function get_flowinit() {
  return request({
    url: '/flowhandle/get_flowinit',
    method: 'get'
  })
}
// 查询流程绑定节点
export function get_flownode(params) {
  return request({
    url: '/flowhandle/get_flownode',
    method: 'get',
    params
  })
}
// 查询图标
export function get_icon() {
  return request({
    url: '/flowhandle/get_icon',
    method: 'get'
  })
}
// 创建节点
export function insert_node(data) {
  return request({
    url: '/flowhandle/insert_node',
    method: 'PUT',
    data
  })
}
// 修改节点
export function alter_flownode(data) {
  return request({
    url: '/flowhandle/alter_flownode',
    method: 'post',
    data
  })
}
// 删除节点
export function del_node(params) {
  return request({
    url: '/flowhandle/del_node',
    method: 'delete',
    params
  })
}
// 创建节点连线
export function insert_nodeline(data) {
  return request({
    url: '/flowhandle/insert_nodeline',
    method: 'PUT',
    data
  })
}
// 创建节点连线
export function del_nodeline(params) {
  return request({
    url: '/flowhandle/del_nodeline',
    method: 'DELETE',
    params
  })
}
// 修改连线
export function alter_nodeline(data) {
  return request({
    url: '/flowhandle/alter_nodeline',
    method: 'POST',
    data
  })
}
// 创建节点绑定
export function insert_nodebinding(data) {
  return request({
    url: '/flowhandle/insert_nodebinding',
    method: 'PUT',
    data
  })
}
// 修改节点绑定
export function alter_nodebinding(data) {
  return request({
    url: '/flowhandle/alter_nodebinding',
    method: 'POST',
    data
  })
}
// 修改节点绑定
export function insert_flowinfo(data) {
  return request({
    url: '/flowhandle/insert_flowinfo',
    method: 'PUT',
    data
  })
}

// 创建流程类别
export function insert_flowcategory(data) {
  return request({
    url: '/flowhandle/insert_flowcategory',
    method: 'PUT',
    data
  })
}

// 创建流程
export function insert_flow(data) {
  return request({
    url: '/flowhandle/insert_flow',
    method: 'PUT',
    data
  })
}
// 修改流程类别，流程 一级二级必须存在
export function alter_flow(data) {
  return request({
    url: '/flowhandle/alter_flow',
    method: 'POST',
    data
  })
}
// 删除流程类别/流程
export function del_flow(params) {
  return request({
    url: '/flowhandle/del_flow',
    method: 'delete',
    params
  })
}

