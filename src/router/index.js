import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

/* login */
const Login = _import('login/index')

/* dashboard */
const dashboard = _import('dashboard/index')

/* error page */
const Err404 = _import('404')

/* demo */
const UploadImage = _import('common/uploadImage')
const UploadImageMulti = _import('common/uploadImageMulti')
const UploadVideo = _import('common/uploadVideo')
const UploadAudio = _import('common/uploadAudio')
const Table = _import('common/table')
const UploadImageBig = _import('common/uploadImageBig')
const UploadAll = _import('common/uploadAll')
// const Tinymce = _import('tmscq/tmsActivityNew')

/* homePage */
const HomePage = _import('home/homePage')

/* user page */
const UserList = _import('user/user_list')

const RuleDetail = _import('rule/ruleDetail')

const RuleInsert = _import('rule/ruleInsert')

const ColumnList = _import('rule/columnList')

const RuleList = _import('rule/ruleList')



Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [{
    path: '/login',
    component: Login,
    hidden: true
  },
  {
    path: '/404',
    component: Err404,
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Home',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: dashboard
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    redirect: 'noredirect',
    name: '系统管理',
    icon: 'wujiaoxing',
    children: [{
      path: 'userList',
      component: UserList,
      name: '用户管理',
      icon: 'zonghe'
    }]
  },
  {
    path: '/rules',
    component: Layout,
    redirect: 'noredirect',
    name: '规则管理',
    icon: 'theme',
    children: [{
      path: 'ruleList',
      component: RuleList,
      name: '规则列表',
      icon: 'zonghe'
    },
    {
      path: 'columnList',
      component: ColumnList,
      name: '规则字段管理',
      icon: 'zonghe'
    },
    {
      path: 'ruleDetail/:id',
      component: RuleDetail,
      hidden: true
    },
    {
      path: 'ruleInsert',
      component: RuleInsert,
      hidden: true
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
