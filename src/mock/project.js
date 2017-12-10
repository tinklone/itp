import {
  param2Obj
} from '@/utils'

const projectlist = [{
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


export default {
  getList: () => ({
    "code": 0,
    "data": {
      "items": projectlist
    }
  }),
  getInfo: config => {
    const {
      project_id
    } = param2Obj(config.url)
    return {
      "code": 0,
      "data": projectInfoMap[project_id]
    }
  }
}
