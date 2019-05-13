import { asyncRouterMap, constantRouterMap } from '@/router'
// import Layout from '@/views/layout/Layout'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.includes(role))
//   } else {
//     return true
//   }
// }

function hasPermissionSelf(roles, route) {
  if (route.id) {
    return roles.includes(route.id)
  }
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermissionSelf(roles, tmp)) {
    // if (hasPermission(roles, tmp)) {
      // console.log(tmp)
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      // const temp = [{
      //   path: '/permission',
      //   component: Layout,
      //   redirect: '/permission/index',
      //   alwaysShow: true, // will always show the root menu
      //   meta: {
      //     title: '测试',
      //     icon: 'lock'
      //     // roles: ['admin', 'editor'] // you can set roles in root nav
      //   },
      //   children: [
      //     {
      //       path: 'page',
      //       component: () => import('@/views/permission/page'),
      //       name: '阿斯顿发',
      //       meta: {
      //         title: '2是否'
      //         // roles: ['admin'] // or you can only set roles in sub nav
      //       }
      //     },
      //     {
      //       path: 'directive',
      //       component: () => import('@/views/permission/directive'),
      //       name: '阿斯顿23发',
      //       meta: {
      //         title: 'directivePermission'
      //         // if do not set roles, means: this page does not require permission
      //       }
      //     }
      //   ]
      // },
      // {
      //   path: '/Icon',
      //   component: Layout,
      //   children: [
      //     {
      //       path: 'index',
      //       component: () => import('@/views/svg-icons/index'),
      //       name: '3534534',
      //       meta: {
      //         title: '34354',
      //         icon: 'icon',
      //         // roles: ['admin', 'editor'],
      //         noCache: true
      //       }
      //     }
      //   ]
      // }]

      state.addRouters = routers
      // console.log(temp)
      state.routers = constantRouterMap.concat(routers)
      // state.routers = constantRouterMap.concat(temp)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        let accessedRouters
        if (roles.includes('admin')) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        // console.log(accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
