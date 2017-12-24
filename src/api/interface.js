import request from '@/utils/request'

export function getApiDetail(params) {
  return request({
    url: '/api/test',
    method: 'get',
    params
  })
}