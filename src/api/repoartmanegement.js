import request from '@/utils/request'

// 结存分析-汇总
export function get_cacheanalydata(params) {
    return request({
      url: '/repoartmanegement/get_cacheanalydata',
      method: 'get',
      params
    })
  }
// 结存分析-明细
export function get_cacheanalydatadetail(params) {
    return request({
      url: '/repoartmanegement/get_cacheanalydatadetail',
      method: 'get',
      params
    })
  }
// 折旧分析-汇总
export function get_depreciationdata(params) {
    return request({
      url: '/repoartmanegement/get_depreciationdata',
      method: 'get',
      params
    })
  }
// 折旧分析-明细
export function get_depreciationdatadetail(params) {
    return request({
      url: '/repoartmanegement/get_depreciationdatadetail',
      method: 'get',
      params
    })
  }
// 增减分析-汇总
export function get_cachecreateremove(params) {
    return request({
      url: '/repoartmanegement/get_cachecreateremove',
      method: 'get',
      params
    })
  }
// 临界到期查询
export function get_assetsistotime(params) {
    return request({
      url: '/repoartmanegement/get_assetsistotime',
      method: 'get',
      params
    })
  }
// 结存的
export function get_categoryall(params) {
    return request({
      url: '/repoartmanegement/get_categoryall',
      method: 'get',
      params
    })
  }
// 结存的 归属信息
export function get_departmentall(params) {
    return request({
      url: '/repoartmanegement/get_departmentall',
      method: 'get',
      params
    })
  }
// 结存的 存放地点
export function get_allstoragelocation(params) {
    return request({
      url: '/repoartmanegement/get_allstoragelocation',
      method: 'get',
      params
    })
  }

  // 查询账期
export function get_accountingperiod(params) {
  return request({
    url: '/repoartmanegement/get_accountingperiod',
    method: 'get',
    params
  })
}

// 按二级部门id查询存放地点
export function get_balancebilllocation(params) {
  return request({
    url: '/repoartmanegement/get_balancebilllocation',
    method: 'get',
    params
  })
}

// 按二级部门id查询部门
export function get_balancebillldepartment(params) {
  return request({
    url: '/repoartmanegement/get_balancebillldepartment',
    method: 'get',
    params
  })
}
// 结存统计
export function get_balancebill(params) {
  return request({
    url: '/repoartmanegement/get_balancebill',
    method: 'get',
    params
  })
}
