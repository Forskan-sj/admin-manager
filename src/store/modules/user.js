import {
  login,
  logout,
  refresh
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  getInfo
} from '@/api/college'

// // login,// getInfo
const user = {
  state: {
    token: getToken(),
    name: '',
    nickname: '',
    avatar: '',
    roles: [],
    gruop_id: 0
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_NICKNAME: (state, name) => {
      state.nickname = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_GID: (state, g_id) => {
      state.gruop_id = g_id
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          // console.log(response)
          // const data = {
          //   code: 20000,
          //   data: {
          //     token: 'admin'
          //   }
          // }
          if (response.data.status) {
            const data = response.data.datas
            setToken(data.token)
            // commit('SET_GID', data.group_id)
            // commit('SET_ROLE', data.rule)
            commit('SET_TOKEN', data.token)
            resolve(response)
          } else {
            resolve(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

     // 获取用户信息
     GetUserInfo({ commit, state }) {
      //  console.log('object')
      return new Promise((resolve, reject) => {
        getInfo('admin', { id: -2 }).then(response => {
          const data = response.data.datas
          if (data.rule && data.rule.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.rule)
            commit('SET_GID', data.group_id)
          } else {
            reject('该账号无任何权限，联系超管授予权限！')
          }
          commit('SET_NAME', data.groupname)
          commit('SET_NICKNAME', data.nickname)
          commit('SET_AVATAR', data.avatar)
          // commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
          // commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // // 获取用户信息
    // GetInfo({
    //   commit,
    //   state
    // }) {
    //   return new Promise((resolve, reject) => {
    //     // refresh(state.token).then(response => {
    //       // const data = response.data
    //       const data = {}
    //       // console.log(data)
    //       // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
    //       //   commit('SET_ROLES', data.roles)
    //       // } else {
    //       //   reject('getInfo: roles must be a non-null array !')
    //       // }
    //       data.name = 'Super Admin'
    //       data.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    //       commit('SET_ROLES', ['admin'])
    //       commit('SET_ROLE', state.role)
    //       commit('SET_NAME', data.name)
    //       commit('SET_AVATAR', data.avatar)
    //       resolve()
    //     // }).catch(error => {
    //     //   reject(error)
    //     // })
    //   })
    // },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 刷新缓存
    Refresh({
      commit
    }) {
      return new Promise((resolve, reject) => {
        refresh().then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
