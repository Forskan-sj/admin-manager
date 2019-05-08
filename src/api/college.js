import request from '@/utils/request'

// 获取列表
export function getLists(path, data) {
  return request({
    url: path + '/list',
    method: 'post',
    data
  })
}

// 获取得奖列表列表
export function getGiftLists(path, data) {
  return request({
    url: path + '/getUser',
    method: 'post',
    data
  })
}

// 授予勋章
export function giveMedal(path, data) {
  return request({
    url: path + '/giveMedal',
    method: 'post',
    data
  })
}

// 获取抽奖说明
export function getInfoContent(path, data) {
  return request({
    url: path + '/getContent',
    method: 'post',
    data
  })
}

// 保存抽奖说明
export function editInfoContent(path, data) {
  return request({
    url: path + '/editContent',
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

// 获取课程评价
export function getEvaluate(type, data) {
  return request({
    url: type + '/getEvaluate',
    method: 'post',
    data
  })
}
// 设置精选评价
export function topEvaluate(type, data) {
  return request({
    url: type + '/doJx',
    method: 'post',
    data
  })
}
// 回复评论
export function addEvaluate(type, data) {
  return request({
    url: type + '/addEvaluate',
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

