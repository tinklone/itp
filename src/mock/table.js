import { param2Obj,getCookie,timestampToTime } from '@/utils'

const userMap = {
  admin: {
    role: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    role: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  developer: {
    role: ['develop'],
    token: 'develop',
    introduction: '我是开发',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '工程师小王'
  }
}
var id = 1
var stepList = []
var caseList = []
export default {
  getList: () => (
    {
      "code": 0,
      "data": {
        "items": [{
          "id": "460000200511072770",
          "title": "Hilsewqcw qkvjjvb ucr fgfxfq rdhxjzedr uchevgbnn dgttjc xwmi spao mnjyln fjrp qiqjoe.",
          "status": "draft",
          "author": "name",
          "display_time": "1974-12-01 21:02:03",
          "pageviews": 4607
        }, {
          "id": "110000199711064542",
          "title": "Nudq zwagvqwn japgsw mhjocnvkr upqa eptk saee jbufa vgem hxiqbf hhyo kwey pbixb.",
          "status": "draft",
          "author": "name",
          "display_time": "2015-02-19 05:31:39",
          "pageviews": 3337
        }, {
          "id": "360000200505153634",
          "title": "Obypfbcp uoaxnjcr ebsrb giajcc nqsufbo emno wbwxep rurryvjx zweohm vrdcvrcf ypbisahic depg rotal esh.",
          "status": "draft",
          "author": "name",
          "display_time": "1991-02-19 01:11:20",
          "pageviews": 997
        }, {
          "id": "350000201009037549",
          "title": "Nhshthhs gwolnmuxf dwaq qytucmbpi lhrnp eafohdgi sahtwfcj intvk ajtfrbtto hiycjfeyg bxkxiiwo ciqcs fidxuvclv tnckcifd jxdkftai wueflcmw.",
          "status": "published",
          "author": "name",
          "display_time": "1977-11-12 03:15:58",
          "pageviews": 2243
        }, {
          "id": "640000197801242642",
          "title": "Skky wcrf uudzu ovgvsgmoeh leztzjiu hvoajtkpd dpfagicwc tkgl spyq othhqhow fvruhsf sfg swxtnz ghpud.",
          "status": "draft",
          "author": "name",
          "display_time": "2014-05-17 21:21:50",
          "pageviews": 920
        }, {
          "id": "350000198703153406",
          "title": "Nerecm nods bxgk guelrwb iimpva uolo wnyhjjpyt cmimvk hwlqfh ywnor xtscfgubf oftlmd weki kuarh lqulvuoqso lwezjjyih ngtjwmer.",
          "status": "draft",
          "author": "name",
          "display_time": "2009-11-14 18:47:32",
          "pageviews": 4859
        }, {
          "id": "210000201211081227",
          "title": "Klxikx eoouyfw smqp sxmfu wsol hofdiqechw vsol expqwf yaot pmilt xjzvduagh rjsomqiku hiok yevbrechc ijlxqqhvjr yyouvf yiirmgvym.",
          "status": "deleted",
          "author": "name",
          "display_time": "1971-08-11 05:15:50",
          "pageviews": 2512
        }, {
          "id": "61000020091119015X",
          "title": "Cpbievr nxdkgjsqe xzmbux hckkrr rhgbfbw jppyftn jyud ogfid rynoptbp mpre gfeeo obt tbdmznt.",
          "status": "deleted",
          "author": "name",
          "display_time": "1983-09-07 10:27:15",
          "pageviews": 2811
        }]
      }
    }
  ),
  saveStepName: config => {

    var stepMap= {}
    var name = JSON.parse(config.body).name
    var step = 'step'+id.toString()
    id +=1
    // console.log('step = ',step)
    console.log('name = ',name)
    stepMap['stepId'] = step
    stepMap['name'] = name
    // console.log('stepMap = ',stepMap)
    stepList.push(stepMap)
    // console.log('stepList = ',stepList)
    window.localStorage.setItem('stepList', JSON.stringify(stepList))
    return {"code":0,"data":{},"message":"添加成功"}
  },
  getStepValue: config => {
    var tempList = JSON.parse(window.localStorage.getItem('stepList'))||[]
    return {
      "code": 0,
      "data": {
        "items": tempList
      }
    }
  },
  saveCaseInfo: config => {
    console.log(111)
    var caseMap= {}
    var temp = JSON.parse(config.body).caseInfo
    var other = JSON.parse(config.body).other
    var user = getCookie('Admin-Token')
    console.log('user = ',user)
    temp['stepNum']=other.length
    temp['id']= Date.now().toString()
    temp['user']= user
    temp['time']=timestampToTime(Date.now())
    console.log('temp = ',temp)
    caseList.push(temp)
    window.localStorage.setItem('caseList', JSON.stringify(caseList))
    console.log('caseList = ',caseList)
    window.localStorage.removeItem('stepList', JSON.stringify(stepList))
    stepList = []
    return {"code":0,"data":{},"message":"添加成功"}
  },
  getCaseValue: config => {
    var tempList = JSON.parse(window.localStorage.getItem('caseList'))||[]
    return {
      "code": 0,
      "data": {
        "items": tempList
      }
    }
  },
  deleteStep: config => {
    var tempList = JSON.parse(window.localStorage.getItem('caseList'))||[]
    return {
      "code": 0,
      "data": {
        "items": tempList
      }
    }
  },
  saveStepInfo: config => {
    // var tempList = JSON.parse(window.localStorage.getItem('caseList'))||[]
    console.log('-----')
    var stepInfo = JSON.parse(config.body).stepInfo
    console.log('stepInfo = ',stepInfo)
    return {
      "code": 0,
      "data": {
        "items": []
      },
      "msg":'213'
    }
  },
}
