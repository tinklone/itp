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