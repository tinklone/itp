import {
  param2Obj
} from '@/utils'

const projectList = [{
  "id": "460000200511072770",
  "title": "微信开放平台接口",
  "status": "draft",
  "author": "alisa",
  "display_time": "2017-12-01 21:02:03",
  "pageviews": 4607
}, {
  "id": "110000199711064542",
  "title": "微信公众号接口",
  "status": "published",
  "author": "maxlong",
  "display_time": "2017-02-19 05:31:39",
  "pageviews": 3337
}]

const projectInfoMap = {
  "460000200511072770": {
    name: '微信开放平台接口',
    region: 'app',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: 'testetst'
  },
  "110000199711064542": {
    name: '微信公众号接口',
    region: 'app',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: 'testetst'
  }
}

const project_list = JSON.parse(window.localStorage.getItem('projectlist')) || projectList
const project_map = JSON.parse(window.localStorage.getItem('projectmap')) || projectInfoMap
// var apimap = JSON.parse(window.localStorage.getItem('apimap')) ||  {}
var apimap = {}
var apilist = []
// for(var key in apimap){
//   console.log(key)
//   var info = apimap[key]['baseinfo']
//   console.log(info)
//   info['id'] = key
//   apilist.push(info)

// }
console.log(JSON.stringify(apilist))

export default {
  save: config => {
    const project_info = JSON.parse(config.body)
    project_info['region'] = 'app'
    
    const project_id = Date.now().toString()
    const proinfo = {
      "id": project_id,
      "title": project_info['name'],
      "status": "published",
      "author": "maxlong",
      "display_time": "2017-02-19 05:31:39",
      "pageviews": 3337
    }
    project_list.push(proinfo)
    project_map[project_id] = project_info
    window.localStorage.setItem('projectmap', JSON.stringify(project_map))
    window.localStorage.setItem('projectlist', JSON.stringify(project_list))
    // const { username } = JSON.parse(config.body)
    return {"code":0,"data":{},"message":"保存成功"}
  },

  saveapi: config => {
    var api_info = JSON.parse(config.body)
    
    var api_id = Date.now().toString()
    apimap[api_id] = api_info

    window.localStorage.setItem('apimap', JSON.stringify(apimap))
    // const { username } = JSON.parse(config.body)
    return {"code":0,"data":{},"message":"新增成功"}
  },
  editapi: config => {
    console.log('config.body = ',config.body)
    var api_info = JSON.parse(config.body)
    var api_id = JSON.parse(config.body).id
    console.log('api_id = ',api_id)
    console.log('api_info = ',api_info)
    apimap[api_id] = api_info

    window.localStorage.setItem('apimap', JSON.stringify(apimap))
    // const { username } = JSON.parse(config.body)
    return {"code":0,"data":{},"message":"修改成功"}
  },

  deleteapi: config => {
    console.log(config.url)
    var api_id = param2Obj(config.url).id
    console.log(api_id)
    delete apimap[api_id]
    window.localStorage.setItem('apimap', JSON.stringify(apimap))
    // const { username } = JSON.parse(config.body)
    return {"code":0,"data":{},"message":"删除成功"}
  },

  getList: () => ({
    "code": 0,
    "data": {
      "items": project_list
    }
  }),
  // getApiList: () => ({
  //   "code": 0,
  //   "data": {
  //     "items": apilist
  //   }
  // }),
  getApiList: () => {
    apimap = JSON.parse(window.localStorage.getItem('apimap'))||{}
    apilist = []
    for(var key in apimap){
      console.log(key)
      var info = apimap[key]['baseinfo']
      console.log(info)
      info['id'] = key
      apilist.push(info)    
    }
    return {
    "code": 0,
    "data": {
      "items": apilist
    }
  }},
  getInfo: config => {
    const {
      project_id
    } = param2Obj(config.url)
    return {
      "code": 0,
      "data": project_map[project_id]
    }
  },
  getInterInfo: config => {
    console.log('config.url = ',config.url)
    var inter_id = param2Obj(config.url).id
    console.log('inter_id = ',inter_id)
    if (inter_id)
    {
      console.log('1111')
    return {
      "code": 0,
      "data": apimap[inter_id]['baseinfo']
    }}
    else
    {
      return {
        "code": 0,
        "data": {}
      }
    }
  }
}
