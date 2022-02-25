import request from '@/utils/request'
// 汇总
export function get_depreciationassets(params) {
  return request({
    url: '/newdepreciationhandle/get_depreciationassets',
    method: 'get',
    params
  })
}

// 创建折旧单
export function create_depreciationdata(data) {
  return request({
    url: '/newdepreciationhandle/create_depreciationdata',
    method: 'post',
    data
  })
}
