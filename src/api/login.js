import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
  // return true
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
  // return true
}

export function refresh() {
  return request({
    url: '/index/updateCache',
    method: 'post'
  })
  // return true
}
