import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'my_activity',
    children: [
      {
        path: 'my_activity',
        component: () => import('@/views/myActivity/index'),
        name: 'myActivity',
        meta: { title: '我的活动', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/activity_template',
    component: Layout,
    redirect: '/activity_template/point',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '活动模板',
      icon: 'dashboard',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'point',
        component: () => import('@/views/activityTemplate/point/index'),
        name: 'Guide',
        meta: { title: '积分活动', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/data_dashboard',
    component: Layout,
    redirect: '/data_dashboard/point',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '数据看板',
      icon: 'dashboard',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'point',
        component: () => import('@/views/dataDashboard/point/index'),
        name: 'Guide',
        meta: { title: '积分活动', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/prize_management',
    component: Layout,
    redirect: '/prize_management/point',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: '奖品项管理',
      icon: 'dashboard',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/prizeManagement/list/index'),
        name: 'prizeManagementList',
        meta: { title: '奖品项列表', icon: 'guide', noCache: true }
      },
      {
        path: 'detail',
        component: () => import('@/views/prizeManagement/detail/index'),
        name: 'prizeManagementDetail',
        meta: { title: '奖品兑换明细', icon: 'guide', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },
  /** When your routing table is too long, you can split it into small modules**/
  { path: '*', redirect: '/404', hidden: true }
]
