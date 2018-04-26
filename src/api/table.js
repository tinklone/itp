import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
export function saveStepName(name) {
  return request({
    url: '/table/saveStepName',
    method: 'post',
    data:{
      name,
    }
  })
}
export function getStepValue() {
  return request({
    url: '/table/getStepValue',
    method: 'post',
    data:{
    }
  })
}


export function saveCaseInfo(caseInfo,other) {
  return request({
    url: '/table/saveCaseInfo',
    method: 'post',
    data:{
      caseInfo,
      other,
    }
  })
}
export function getCaseValue() {
  return request({
    url: '/table/getCaseValue',
    method: 'post',
    data:{
    }
  })
}

export function saveStepInfo(stepInfo) {
  return request({
    url: '/table/saveStepInfo',
    method: 'post',
    data:{
      stepInfo
    }
  })
}