import request from '@/utils/request'

export function getApiDetail(params) {
  return request({
    url: '/api/test',
    method: 'get',
    params
  })
}
export function getInterInfo(id) {
  return request({
    url: '/api/interinfo',
    method: 'get',
    params:{id}
  })
}
export function editapi(id,baseinfo,params) {
  return request({
    url: '/api/edit',
    method: 'post',
    data: {
      id,
      baseinfo,
      params
    }
  })
}