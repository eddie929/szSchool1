import request from '@/utils/request'

// 查询用户
export function get_alluser(params) {
    return request({
      url: '/userHandle/get_alluser',
      method: 'post',
      params
    })
  }
// 查询系统角色
export function get_userrole() {
    return request({
      url: '/UserHandle/get_userrole',
      method: 'get'

    })
  }
// 创建用户
export function insert_user(data) {
    return request({
      url: '/UserHandle/insert_user',
      method: 'put',
      data
    })
  }
// 修改用户
export function up_sysuser(data) {
    return request({
      url: '/UserHandle/up_sysuser',
      method: 'post',
      data
    })
  }

// 修改个人信息
export function up_activeuser(params) {
  return request({
    url: '/UserHandle/up_activeuser',
    method: 'post',
    params
  })
}

// 修改用户密码
export function alter_password(params) {
  return request({
    url: '/UserHandle/alter_password',
    method: 'post',
    params
  })
}

// 根据用户id 返回用户详细信息
export function get_userinfobyid(params) {
  return request({
    url: '/UserHandle/get_userinfobyid',
    method: 'post',
    params
  })
}

// 删除用户
export function del_sysuser(data) {
    return request({
      url: '/UserHandle/del_sysuser',
      method: 'delete', //
      data
    })
  }
