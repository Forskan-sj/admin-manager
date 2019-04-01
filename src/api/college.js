import request from '@/utils/request'

// 获取列表
export function getLists(path, data) {
  return request({
    url: path + '/list',
    method: 'post',
    data
  })
}

//  添加
export function add(path, data) {
  return request({
    url: path + '/edit',
    method: 'post',
    data
  })
}

//  获取单条信息
export function getInfo(type, data) {
  return request({
    url: type + '/get',
    method: 'post',
    data
  })
}

export function getBatchList(data) {
  return request({
    url: 'batch/list',
    method: 'post',
    data
  })
}

// 获取oss配置信息
export function getOSSparams(data) {
  return request({
    url: 'index/getOssSign',
    method: 'post',
    data
  })
}

// 删除
export function del(type, data) {
  return request({
    url: type + '/del',
    method: 'post',
    data
  })
}

export function getUsers(type, data) {
  return request({
    url: type + '/getUsers',
    method: 'post',
    data
  })
}

export function setStatus(type, data) {
  return request({
    url: type + '/setStatus',
    method: 'post',
    data
  })
}

// export function getManagers(type, data) {
//   return request({
//     url: type + '/getManager',
//     method: 'post',
//     data
//   })
// }

