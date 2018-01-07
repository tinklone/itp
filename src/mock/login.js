import { param2Obj } from '@/utils'

const userMap = {
  admin : {
    role: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
  },
  editor : {
    role: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
  },
  developer : {
    role: ['developer'],
    token: 'developer',
    introduction: '我是开发',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '工程师小王',
  }
}

const userList = [
  {
    id : '10001',
    role: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    email: '888888@qq.com',
    password:'111111',
    permission: [{'projectid':'460000200511072770','projectname':'项目1'},{'projectid':'110000199711064542','projectname':'项目2'}],
    lastlogintime : '2018.1.7'
  },
  {
    id :'10002',
    role: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    email: '7777777@qq.com',
    password:'111111',
    permission: [{'projectid':'460000200511072770','projectname':'项目1'}],
    lastlogintime : '2018.1.7'
  },
  {
    id :'10003',
    role: ['developer'],
    token: 'developer',
    introduction: '我是开发',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '工程师小王',
    email: '666666@qq.com',
    password:'111111',
    permission: [{'projectid':'110000199711064542','projectname':'项目2'}],
    lastlogintime : '2018.1.7'
  }
]


var user_map = JSON.parse(window.localStorage.getItem('userMap')) || userMap
var user_list = JSON.parse(window.localStorage.getItem('userList')) || userList

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return {"code":0,"data":{"token": userMap[username]["token"]}}
  },

  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return {"code":0,"data":userMap[token]}
    } else {
      return false
    }
  },

  logout: () => ({"code":0,"data":'success'}),

  userList: () => ({
    code: 0,
    data: {
      items: user_list,
    },
  }),

  userSave: config => {
    const user_info = JSON.parse(config.body)
    // project_info['region'] = 'app'

    const user_id = user_info['token']
    user_info['id'] = '10005'
    // const proinfo = {
    //   id: project_id,
    //   title: project_info['name'],
    //   status: 'published',
    //   author: 'maxlong',
    //   display_time: '2017-02-19 05:31:39',
    //   pageviews: 3337,
    // }
    user_list.push(user_info)
    user_map[user_id] = user_info
    window.localStorage.setItem('projectmap', JSON.stringify(project_map))
    window.localStorage.setItem('userList', JSON.stringify(user_list))
    // const { username } = JSON.parse(config.body)
    return { code: 0, data: {}, message: '保存成功' }
  },

}
