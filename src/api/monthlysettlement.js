// 月结账
import request from '@/utils/request'
//  存放地视图查询
export function get_monthlysettlementdata(params) {
  return request({
    url: '/monthlysettlement/get_monthlysettlementdata',
    method: 'get',
    params
  })
}

