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
const TmsActivityList = _import('tmscq/tmsActivityList')
// const TmsActivity = _import('tmscq/tmsActivityNew')
const TmsActivityEdit = _import('tmscq/tmsActivityNewEdit')
const TmsActivity = _import('tmscq/tmsActivityInsert')

const MinJianChuanShuoList = _import('tmscq/minJianChuanShuoList')
const MinJianChuanShuoEdit = _import('tmscq/minJianChuanShuoEdit')
const MinJianChuanShuoInsert = _import('tmscq/minJianChuanShuoInsert')

/* scenicSpot */
const ScenicSpot = _import('scenic/scenicSpot')

/* customNotice */
const CustomNotice = _import('notice/customNotice')

/* feedBack */
const FeedBack = _import('feedBack/feedBack')

/* user page */
const UserList = _import('user/user_list')

/* liveShow */
const LiveShowList = _import('liveShow/liveShowList')
const LiveShowEdit = _import('liveShow/liveShowEdit')
const LiveShowInsert = _import('liveShow/liveShowInsert')

/* voice */
const VoiceManage = _import('voice/voiceManage')

/* wonderful */
const WonderfulUserList = _import('wonderful/wonderfulUserList')
const WonderfulOrgList = _import('wonderful/wonderfulOrgList')

/* mapManage */
const MapManage = _import('map/mapManage')

const RuleDetail = _import('rule/ruleDetail')

const ColumnList = _import('rule/columnList')


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

  // {
  //   path: '/homePage',
  //   component: Layout,
  //   redirect: '/homePage/index',
  //   icon: 'tubiao',
  //   noDropdown: true,
  //   children: [{
  //     path: 'homePage',
  //     name: '首页管理',
  //     component: HomePage
  //   }]
  // },

  // {
  //   path: '/scenicSpot',
  //   component: Layout,
  //   redirect: '/scenicSpot/index',
  //   icon: 'tab',
  //   noDropdown: true,
  //   children: [{
  //     path: 'scenicSpot',
  //     name: '景观区管理',
  //     component: ScenicSpot
  //   }]
  // },
  // {
  //   path: '/map',
  //   component: Layout,
  //   redirect: '/map/index',
  //   icon: 'yanjing',
  //   noDropdown: true,
  //   children: [{
  //     path: 'mapManage',
  //     name: '手绘地图',
  //     component: MapManage
  //   }]
  // },

  // {
  //   path: '/tms',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: '天门山传奇',
  //   icon: 'table',
  //   children: [{
  //       path: 'tmsContent',
  //       component: TmsContent,
  //       name: '天门山介绍',
  //       icon: 'zonghe'
  //     },
  //     {
  //       path: 'tmsActivityList',
  //       component: TmsActivityList,
  //       name: '天门山活动',
  //       icon: 'zonghe'
  //     },
  //     {
  //       path: 'tmsActivity',
  //       component: TmsActivity,
  //       hidden: true
  //     },
  //     {
  //       path: 'tmsActivityEdit/:id',
  //       component: TmsActivityEdit,
  //       hidden: true
  //     },
  //     {
  //       path: 'minJianChuanShuoList',
  //       component: MinJianChuanShuoList,
  //       name: '民间传说',
  //       icon: 'zonghe'
  //     },
  //     {
  //       path: 'minJianChuanShuoInsert',
  //       component: MinJianChuanShuoInsert,
  //       hidden: true
  //     },
  //     {
  //       path: 'minJianChuanShuoEdit/:id',
  //       component: MinJianChuanShuoEdit,
  //       hidden: true
  //     }
  //   ]
  // },

  // {
  //   path: '/live',
  //   component: Layout,
  //   redirect: '/live/index',
  //   icon: 'mima',
  //   noDropdown: true,
  //   children: [{
  //       path: 'liveShowList',
  //       name: '实景演出',
  //       component: LiveShowList
  //     },
  //     {
  //       path: 'liveShowInsert',
  //       component: LiveShowInsert,
  //       hidden: true
  //     },
  //     {
  //       path: 'liveShowEdit/:id',
  //       component: LiveShowEdit,
  //       hidden: true
  //     }
  //   ]
  // },

  // {
  //   path: '/voice',
  //   component: Layout,
  //   redirect: '/voice/index',
  //   icon: 'tuozhuai',
  //   noDropdown: true,
  //   children: [{
  //     path: 'voiceManage',
  //     name: '语音维护',
  //     component: VoiceManage
  //   }]
  // },

  // {
  //   path: '/wonderful',
  //   component: Layout,
  //   redirect: 'wonderful',
  //   name: '精彩风景',
  //   icon: 'icons',
  //   children: [{
  //       path: 'wonderfulUserList',
  //       component: WonderfulUserList,
  //       name: '用户上传审批',
  //       icon: 'zonghe'
  //     },
  //     {
  //       path: 'wonderfulOrgList',
  //       component: WonderfulOrgList,
  //       name: '宣传片维护',
  //       icon: 'zonghe'
  //     }
  //   ]
  // },


  // {
  //   path: '/feedBack',
  //   component: Layout,
  //   redirect: '/feedBack/index',
  //   icon: 'mima',
  //   noDropdown: true,
  //   children: [{
  //     path: 'feedBack',
  //     name: '用户反馈',
  //     component: FeedBack
  //   }]
  // },
  // {
  //   path: '/customNotice',
  //   component: Layout,
  //   redirect: '/customNotice/index',
  //   icon: 'theme',
  //   noDropdown: true,
  //   children: [{
  //     path: 'customNotice',
  //     name: '游客须知',
  //     component: CustomNotice
  //   }]
  // },

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
    },{
      path: 'columnList',
      component: ColumnList,
      name: '规则字段管理',
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
      path: 'ruleDetail',
      component: RuleDetail,
      name: '拒件规则',
      icon: 'zonghe'
    }, 
    {
      path: 'ruleDetail',
      component: RuleDetail,
      name: '打回规则',
      icon: 'zonghe'
    }]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: '组件',
  //   icon: 'tubiao',
  //   children: [{
  //       path: 'uploadImageMulti',
  //       component: UploadImageMulti,
  //       name: '批量上传'
  //     },
  //     {
  //       path: 'uploadVideo',
  //       component: UploadVideo,
  //       name: '视频上传'
  //     },
  //     {
  //       path: 'uploadAudio',
  //       component: UploadAudio,
  //       name: '音频上传'
  //     },
  //     {
  //       path: 'table',
  //       component: Table,
  //       name: '表格'
  //     },
  //     {
  //       path: 'uploadImage',
  //       component: UploadImage,
  //       name: '图片上传'
  //     },
  //     // { path: 'uploadAll', component: UploadAll, name: '都能上传'},
  //     // { path: 'tinymce', component: Tinymce, name: '富文本'}
  //   ]
  // },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
