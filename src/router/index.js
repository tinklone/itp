import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [{
    path: '/login',
    component: _import('login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: _import('404'),
    hidden: true
  },
  {
    path: '/projectlist',
    component: _import('project/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },
  {
    path: '/:project_id/project',
    component: Layout,
    redirect: '/:project_id/project/info',
    name: 'project',
    meta: {
      title: '项目管理',
      icon: 'help'
    },
    children: [{
        path: 'info',
        name: '项目信息',
        component: _import('form/index'),
        meta: {
          title: '项目信息',
          icon: 'table'
        }
      },
      {
        path: 'api',
        name: '接口信息',
        component: _import('interface/index'),
        meta: {
          title: '接口信息',
          icon: 'table'
        }
      },
      {
        path: 'apilist',
        name: '接口列表',
        component: _import('interface/list'),
        meta: {
          title: '接口列表',
          icon: 'table'
        }
      }
      ,
      {
        path: 'apidetail',
        name: '接口详情',
        component: _import('interface/detail'),
        meta: {
          title: '接口详情',
          icon: 'eye'
        }
      }
    ]
  },
  {
    path: '/:project_id/example',
    component: Layout,
    redirect: '/:project_id/example/table',
    name: 'example',
    meta: {
      title: '测试管理',
      icon: 'example'
    },
    children: [{
        path: 'table',
        name: 'Table',
        component: _import('table/index'),
        meta: {
          title: '测试用例列表',
          icon: 'table'
        }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: _import('tree/index'),
        meta: {
          title: '测试报告',
          icon: 'tree'
        }
      },
      {
        path: 'addcase',
        name: '添加用例',
        component: _import('table/addcase'),
        meta: {
          title: '添加用例',
          icon: 'table'
        },
      },
      //   children:[{
      //     path: 'info',
      //     name: '步骤信息',
      //     component: _import('table/info'),
      // }] 
      {
          path: 'info',
          name: '步骤信息',
          component: _import('table/info'),
          meta: {
            title: '步骤信息',
          },
          hidden: true
      },
      
    ]
  },
  {
    path: '/:project_id/other',
    component: Layout,
    redirect: '',
    name: 'other',
    meta: {
      title: '其他管理',
      icon: 'example'
    },
    children: [{
        path: 'test1',
        name: 'test1',
        component: _import('other/test'),
        meta: {
          title: '其他页面1',
          icon: 'table'
        }
      },
      {
        path: 'test2',
        name: 'test2',
        component: _import('other/test2'),
        meta: {
          title: '其他页面2',
          icon: 'tree'
        }
      }
    ]
  },
  {
    path: '/dashboard/other',
    component: Layout,
    redirect: '',
    name: 'other',
    hidden: true,
    children: [{
      path: 'test',
      component: _import('other/test')
    }]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
