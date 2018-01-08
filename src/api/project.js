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

export function deleteapi(idlist) {
  console.log('idlist = ',idlist)
  return request({
    url: '/api/delete',
    method: 'post',
    data:{idlist}
  })
}

export function getApiList(params) {
  return request({
    url: '/api/list',
    method: 'get',
    params
  })
}

export function getApiDetail(params) {
  return request({
    url: '/api/test',
    method: 'get',
    params
  })
}