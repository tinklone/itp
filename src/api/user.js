import request from '@/utils/request'

export function userList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

export function userSave(data) {
  return request({
    url: '/user/save',
    method: 'post',
    data:{
        data
    }
  })
}


