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
const Tinymce = _import('tmscq/tmsActivityNew')

/* homePage */
const HomePage = _import('home/homePage')

/* tmscq */
const TmsContent = _import('tmscq/tmsContent')
const TmsActivity = _import('tmscq/tmsActivityNew')

/* scenicSpot */
const ScenicSpot = _import('scenic/scenicSpot')

/* customNotice */
const CustomNotice = _import('notice/customNotice')

/* feedBack */
const FeedBack = _import('feedBack/feedBack')

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
    path: '/homePage',
    component: Layout,
    redirect: '/homePage/index',
    icon: 'tubiao',
    noDropdown: true,
    children: [{ path: 'homePage', name: '首页功能管理', component: HomePage}]
  },

  {
    path: '/scenicSpot',
    component: Layout,
    redirect: '/scenicSpot/index',
    icon: 'tab',
    noDropdown: true,
    children: [{ path: 'scenicSpot', name: '景区管理', component: ScenicSpot}]
  },

  {
    path: '/customNotice',
    component: Layout,
    redirect: '/customNotice/index',
    icon: 'theme',
    noDropdown: true,
    children: [{ path: 'customNotice', name: '游客须知', component: CustomNotice}]
  },

  {
    path: '/feedBack',
    component: Layout,
    redirect: '/feedBack/index',
    icon: 'mima',
    noDropdown: true,
    children: [{ path: 'feedBack', name: '用户反馈', component: FeedBack}]
  },

  {
    path: '/tms',
    component: Layout,
    redirect: 'noredirect',
    name: '天门山传奇',
    icon: 'table',
    children: [
      { path: 'tmsContent', component: TmsContent, name: '内容', icon: 'zonghe' },
      { path: 'tmsActivity', component: TmsActivity, name: '活动', icon: 'zonghe' }
      
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: 'noredirect',
    name: '组件',
    icon: 'tubiao',
    children: [
      { path: 'uploadImageMulti', component: UploadImageMulti, name: '批量上传'},
      { path: 'uploadVideo', component: UploadVideo, name: '视频上传'},
      { path: 'uploadAudio', component: UploadAudio, name: '音频上传'},
      { path: 'table', component: Table, name: '表格'},
      { path: 'uploadImage', component: UploadImage, name: '图片上传'},
      // { path: 'uploadAll', component: UploadAll, name: '都能上传'},
      // { path: 'tinymce', component: Tinymce, name: '富文本'}
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
