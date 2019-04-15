import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import college from './college'
// import lib from './lib'
// import helpfeed from './helpfeed'
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
// Router.prototype.goBackAndRefreshList = (_self, path) => {
//   _self.
// }

export const constantRouterMap = [{
    path: '/login',
    component: () =>
      import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () =>
      import('@/views/404'),
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
      component: () =>
        import('@/views/dashboard/index')
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
    path: '/userlist',
    component: Layout,
    children: [{
      path: 'index',
      name: 'manager',
      component: () =>
        import('@/views/userlist/index'),
      meta: {
        title: '会员管理',
        icon: 'user',
        roles: ['admin', 'editor']
      }
    }]
  },
  {
    path: '/enterprise',
    name: 'EnterPrise',
    redirect: '/enterprise/index',
    component: Layout,
    meta: {
      title: '专训营',
      icon: 'form'
    },
    children: [{
      path: 'index',
      name: 'EnterpriseList',
      component: () =>
        import('@/views/enterprise/list'),
      meta: {
        title: '专训营',
        icon: 'form'
      }
    },
    {
      path: 'options/:id(\\d+)',
      name: 'EnterpriseEdit',
      component: () =>
        import('@/views/enterprise/options'),
      meta: {
        title: '专训营编辑',
        icon: 'form'
      },
      hidden: true
    }
    // {
    //   path: 'department',
    //   name: 'Department',
    //   component: () =>
    //     import('@/views/enterprise/department'),
    //   meta: {
    //     title: '编辑部门',
    //     icon: 'form'
    //   }
    // }
  ]
  },
  college,
  {
    path: '/admanager',
    name: 'ComplexTablepage',
    component: Layout,
    redirect: '/admanager/index',
    meta: {
      title: '轮播图',
      icon: 'form'
    },
    children: [{
      path: 'index',
      name: 'ComplexTableEdit',
      component: () =>
        import('@/views/admanager/options'),
      meta: {
        title: '轮播图',
        icon: 'form'
      }
    }]
  },
  {
    path: '/invitePoster',
    name: 'ComplexInvitePoster',
    component: Layout,
    redirect: '/invitePoster/index',
    meta: {
      title: '邀请海报',
      icon: 'form'
    },
    children: [{
      path: 'index',
      name: 'ComplexInvitePosterEdit',
      component: () =>
        import('@/views/invitePoster/options'),
      meta: {
        title: '邀请海报',
        icon: 'form'
      }
    }]
  },
  // lib,
  // helpfeed,
  // {
  //   path: '/hotsearch',
  //   name: 'Hotsearch',
  //   redirect: '/hotsearch/index',
  //   component: Layout,
  //   meta: {
  //     title: '',
  //     icon: 'form'
  //   },
  //   children: [{
  //     path: 'index',
  //     name: 'HotsearchList',
  //     component: () =>
  //       import('@/views/hotsearch/index'),
  //     meta: {
  //       title: '热门搜索',
  //       icon: 'form'
  //     }
  //   }]
  // },
  // {
  //   path: '/tipses',
  //   name: 'Tipses',
  //   redirect: '/tipses/index',
  //   component: Layout,
  //   meta: {
  //     title: '',
  //     icon: 'form'
  //   },
  //   children: [{
  //     path: 'index',
  //     name: 'TipsesList',
  //     component: () =>
  //       import('@/views/tipses/index'),
  //     meta: {
  //       title: '课程提示',
  //       icon: 'form'
  //     }
  //   }]
  // },
  // {
  //   path: '/senswords',
  //   name: 'SensWords',
  //   redirect: '/senswords/index',
  //   component: Layout,
  //   meta: {
  //     title: '',
  //     icon: 'form'
  //   },
  //   children: [{
  //     path: 'index',
  //     name: 'SensWordsList',
  //     component: () =>
  //       import('@/views/senswords/index'),
  //     meta: {
  //       title: '敏感词库',
  //       icon: 'form'
  //     }
  //   }]
  // },
  // {
  //   path: '/version',
  //   name: 'Version',
  //   redirect: '/version/index',
  //   component: Layout,
  //   meta: {
  //     title: '版本信息',
  //     icon: 'form'
  //   },
  //   children: [{
  //     path: 'index',
  //     name: 'VersionList',
  //     component: () =>
  //       import('@/views/version/list'),
  //     meta: {
  //       title: '版本信息',
  //       icon: 'form'
  //     }
  //   },
  //   {
  //     path: 'options/:id(\\d+)',
  //     name: 'VersionEdit',
  //     component: () =>
  //       import('@/views/version/options'),
  //     meta: {
  //       title: '编辑版本信息',
  //       icon: 'form'
  //     },
  //     hidden: true
  //   }]
  // },

  // {
  //   path: '/notice',
  //   name: 'NoticePage',
  //   component: Layout,
  //   redirect: '/notice/index',
  //   meta: {
  //     title: '消息管理',
  //     icon: 'form'
  //   },
  //   children: [{
  //     path: 'index',
  //     name: 'NoticeList',
  //     component: () =>
  //       import('@/views/notice/list'),
  //     meta: {
  //       title: '消息管理',
  //       icon: 'form'
  //     }
  //   },
  //   {
  //     path: 'options/:id(\\d+)',
  //     name: 'NoticeEdit',
  //     component: () =>
  //       import('@/views/notice/options'),
  //     meta: {
  //       title: '编辑消息',
  //       icon: 'form'
  //     },
  //     hidden: true
  //   }]
  // },
  // {
  //   path: '/permissionEdit',
  //   name: 'PermissionEdit',
  //   redirect: '/permissionEdit/index',
  //   component: Layout,
  //   meta: {
  //     title: '权限管理',
  //     icon: 'user'
  //   },
  //   children: [{
  //     path: 'index',
  //     name: 'PermissionList',
  //     component: () =>
  //       import('@/views/permissionEdit/list'),
  //     meta: {
  //       title: '角色权限',
  //       icon: 'user'
  //     }
  //   },
  //   {
  //     path: 'options/:id(\\d+)',
  //     name: 'PermissionEdits',
  //     component: () =>
  //       import('@/views/permissionEdit/options'),
  //     meta: {
  //       title: '编辑权限',
  //       icon: 'user'
  //     },
  //     hidden: true
  //   },
  //   {
  //     path: 'manageroptions/:id(\\d+)',
  //     name: 'PermissionManagers',
  //     component: () =>
  //       import('@/views/permissionEdit/manageroptions'),
  //     meta: {
  //       title: '设置管理员',
  //       icon: 'user'
  //     },
  //     hidden: true
  //   },
  //   {
  //     path: 'permissionList',
  //     name: 'PermissionLists',
  //     component: () =>
  //       import('@/views/permissionEdit/permissionList'),
  //     meta: {
  //       title: '管理员',
  //       icon: 'user'
  //     }
  //   }]
  // },
  { path: '*', redirect: '/404', hidden: true }
]
