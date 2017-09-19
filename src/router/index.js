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

/* user page */
const UserList = _import('user/user_list')

Vue.use(Router)

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: Err404, hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Home',
    hidden: true,
    children: [{ path: 'dashboard', component: dashboard }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    redirect: 'noredirect',
    name: '系统管理',
    icon: 'zujian',
    children: [
      { path: 'userList', component: UserList, name: '用户管理', icon: 'zonghe' }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '组件',
    icon: 'tubiao',
    children: [
      { path: 'uploadImage', component: UploadImage, name: '上传图片'}
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
