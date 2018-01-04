import { param2Obj } from '@/utils'

const projectList = [
  {
    id: '460000200511072770',
    title: '微信开放平台接口',
    status: 'draft',
    author: 'alisa',
    display_time: '2017-12-01 21:02:03',
    pageviews: 4607,
  },
  {
    id: '110000199711064542',
    title: '微信公众号接口',
    status: 'published',
    author: 'maxlong',
    display_time: '2017-02-19 05:31:39',
    pageviews: 3337,
  },
]

const projectInfoMap = {
  '460000200511072770': {
    name: '微信开放平台接口',
    region: 'app',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: 'testetst',
  },
  '110000199711064542': {
    name: '微信公众号接口',
    region: 'app',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: 'testetst',
  },
}

const project_list = JSON.parse(window.localStorage.getItem('projectlist')) || projectList
const project_map = JSON.parse(window.localStorage.getItem('projectmap')) || projectInfoMap
const apimap = JSON.parse(window.localStorage.getItem('apimap')) || {}
// const apilist = []
// for (var key in apimap) {
//   console.log(key)
//   var info = apimap[key]['baseinfo']
//   console.log(info)
//   info['id'] = key
//   apilist.push(info)
// }
// console.log(JSON.stringify(apilist))

export default {
  saveApi: config => {
    var api_info = JSON.parse(config.body)
    if (param2Obj(config.url).id){
      var api_id = param2Obj(config.url).id
    }
    else{
      var api_id = Date.now().toString()
    } 
    apimap[api_id] = api_info  
    window.localStorage.setItem('apimap', JSON.stringify(apimap))
    // const { username } = JSON.parse(config.body)
    return { code: 0, data: {}, message: '保存成功' }
  },

  getApiList: () => {   
    var apilist = []
    for(var key in apimap){
      console.log(key)
      var info = apimap[key]['baseinfo']
      info['id'] = key
      apilist.push(info)    
    }
    return {
    code: 0,
    data: {
      items: apilist,
    },
  }},


  getApiInfo: config => {
    //const { id } = param2Obj(config.url) 
    var api_id = param2Obj(config.url).id
    console.log('api_id = ',api_id)
    if (api_id)
    {
      console.log(api_id)
      return {
        "code": 0,
        "data": apimap[api_id]['baseinfo']
      }
    }
    else
    {
      return {
        "code": 0,
        "data": {}
      }
    }
  
  },

  deleteApi: config => {
    var api_id = param2Obj(config.url).id
    delete apimap[api_id]
    window.localStorage.setItem('apimap', JSON.stringify(apimap))
    // const { username } = JSON.parse(config.body)
    //window.localStorage.removeItem(apimap.api_id)
    return { "code": 0, "data": {}, "message": "删除成功" }
  },

}
