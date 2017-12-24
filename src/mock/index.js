import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import tableAPI from './table'
import projectAPI from './project'
import remoteSearchAPI from './remoteSearch'
import apiApi from './api'


Mock.setup({
  timeout: '350-600'
})

// 登录相关
Mock.mock(/\/user\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/user\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)


// 项目相关
Mock.mock(/\/project\/list/, 'get', projectAPI.getList)
Mock.mock(/\/project\/info/, 'get', projectAPI.getInfo)
Mock.mock(/\/project\/save/, 'post', projectAPI.save)

Mock.mock(/\/api\/save/, 'post', apiApi.saveapi)
Mock.mock(/\/api\/list/, 'get', apiApi.getApiList)
Mock.mock(/\/api\/detail/, 'get', apiApi.getApiList)

//接口相关
// Mock.mock(/\/api\/save/, 'post', apiApi.saveapi)

// Mock.mock(/\/api\/detail/, 'get', apiApi.getApiList)

// 表格相关
Mock.mock(/\/table\/list/, 'get', tableAPI.getList)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

export default Mock
