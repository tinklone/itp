import {
  param2Obj,JSONLength
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
var count = 0
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
    console.log('api_info = ',api_info)
    var api_id = Date.now().toString()
    // count = count +1
    // var api_id = count
    console.log('api_id = ',api_id)
    apimap[api_id] = api_info
    console.log('apimap = ',apimap)
    window.localStorage.setItem('apimap', JSON.stringify(apimap))
    // window.localStorage.setItem('count', count)
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
  deleteapis: config => {
    console.log('ss = ',config.body)
    var api_idlist = JSON.parse(config.body).idlist
    console.log(api_idlist)
    for(var i in api_idlist){
    console.log('i = ',i)
    console.log('api_idlist[i] = ',api_idlist[i])
    delete apimap[api_idlist[i]]}
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
  getPageList: config => {
    var api_info = JSON.parse(config.body)
    console.log('api_info = ',api_info)
    var criteria = api_info['criteria'],pageNum=api_info['pageNum'],pageSize=api_info['pageSize'];
    console.log('criteria = ',criteria,'pageNum = ',pageNum,'pageSize = ',pageSize)
    apimap = JSON.parse(window.localStorage.getItem('apimap'))||{}
    apilist = []   
    if (!criteria){ 
      var ll = JSONLength(apimap)
      console.log('ll = ',ll)
      var keys =[]
      for (var key in apimap){
        keys.push(key)
      }
      console.log('keys = ',keys)
      var totalPage = Math.ceil(ll/pageSize)
      console.log('totalPage = ',totalPage)
      for(var j=0;j<totalPage;j++){
        var apitemp = []
        console.log('the page is = ',j)
        if (totalPage>1 && j<totalPage-1){var size = pageSize}
        else{
          if (ll!=0 && ll%pageSize==0){
            var size = pageSize
          }
          else{
          var size = ll%pageSize}}
        console.log('--size = ',size)
        for(var i=0;i<size;i++){
          // console.log('--key = ',i,key[i])
          if(j>0){var x = pageSize*j+i}
          else{var x = i}
          console.log('x = ',x)
          var info = apimap[keys[x]]['baseinfo']
            console.log('info = ',info)
            info['id'] = keys[x]
            // if(criteria){
            //   if (info['api_url'].indexOf(criteria)>-1 || info['api_name'].indexOf(criteria)>-1){
            //     apitemp.push(info)
            //   }
            // }
            // else{
            apitemp.push(info)//}
        }
      console.log('apitemp = ',apitemp)
      apilist.push(apitemp)
    }  console.log('apilist = ',apilist)
      }
    else{
      console.log('11')
      var keys =[]
      var tempList = [];
      for (var key in apimap){
        var tt = apimap[key]['baseinfo']
        if (tt['api_url'].indexOf(criteria)>-1 || tt['api_name'].indexOf(criteria)>-1){
        keys.push(key)
        tempList.push(apimap[key])}
      }
      console.log('tt = ',tt,tempList)
      ll = tempList.length
      console.log('ll = ',ll)
      var totalPage = Math.ceil(ll/pageSize)
      console.log('totalPage = ',totalPage)
      for(var j=0;j<totalPage;j++){
        var apitemp = []
        console.log('the page is = ',j)
        if (totalPage>1 && j<totalPage-1){var size = pageSize}
        else{
          if (ll!=0 && ll%pageSize==0){
            var size = pageSize
          }
          else{
          var size = ll%pageSize}
        }
        console.log('--size = ',size)
        for(var i=0;i<size;i++){
          // console.log('--key = ',i,key[i])
          if(j>0){var x = pageSize*j+i}
          else{var x = i}
          console.log('x = ',x)
          var info = tempList[x]['baseinfo']
            console.log('info = ',info)
            info['id'] = keys[x]
            apitemp.push(info)
        }
      console.log('apitemp = ',apitemp)
      apilist.push(apitemp)
    }  console.log('apilist = ',apilist)
    }
    return {
    "code": 0,
    "data": {
      "items": apilist[pageNum-1],
      "total": keys.length
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
