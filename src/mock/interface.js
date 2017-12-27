import {
    param2Obj
  } from '@/utils'
  
  const interfaceList = [{
    "id": "1",
    "interAddr": "//test1",
    "interName": "degku",
    "method": "get"
  }, {
    "id": "2",
    "interAddr": "//dasdasd",
    "interName": "zhuc",
    "method": "post"
  }, {
    "id": "3",
    "interAddr": "//dasdasd",
    "interName": "zhuc",
    "method": "post"
  }
]

const interface_list = JSON.parse(window.localStorage.getItem('interfaceList')) || interfaceList

console.log(JSON.stringify(interface_list))

export default {

  getInterList: () => ({
    "code": 0,
    "data": {
      "items": interface_list
    }
  })
}
  