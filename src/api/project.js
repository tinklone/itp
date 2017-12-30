import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/project/list',
    method: 'get',
    params
  })
}

export function getInfo(project_id) {
  return request({
    url: '/project/info',
    method: 'get',
    params:{project_id}
  })
}

export function save(name, desc) {
  return request({
    url: '/project/save',
    method: 'post',
    data: {
      name,
      desc
    }
  })
}

export function saveapi(baseinfo,params) {
  return request({
    url: '/api/save',
    method: 'post',
    data: {
      baseinfo,
      params
    }
  })
}

export function getApiList(params) {
  return request({
    url: '/api/list',
    method: 'get',
    params
  })
}

export function getApiDetail(api_id) {
  return request({
    url: '/api/:api_id',
    method: 'get',
    params:{api_id}
  })
}

export function deleteApi(id) {
  return request({
    url: '/api/delete',
    method: 'get',
    params:{id}
  })
}