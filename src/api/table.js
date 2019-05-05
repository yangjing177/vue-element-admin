import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/goods/table',
    method: 'get',
    params
  })
}
export function getUsersList(params) {
  return request({
    url: '/users/table',
    method: 'get',
    params
  })
}

export function getOrderList(params) {
  return request({
    url: '/order/table',
    method: 'get',
    params
  })
}

export function getList1(params) {
  return request({
    url: '/admin/users',
    method: 'get',
    params
  })
}

export function getMonth(params) {
  return request({
    url: '/schedule/month',
    method: 'post',
    params
  })
}

export function updateArticle(data) {
  return request({
    url: '/goods/update',
    method: 'post',
    data
  })
}

export function updateUsers(data) {
  return request({
    url: '/users/update',
    method: 'post',
    data
  })
}

export function updateOrderInfo(data) {
  return request({
    url: '/order/update',
    method: 'post',
    data
  })
}

export function deleteTable(data) {
  return request({
    url: '/goods/delete',
    method: 'post',
    data
  })
}

export function deleteUsers(data) {
  return request({
    url: '/users/delete',
    method: 'post',
    data
  })
}

export function deleteOrderInfo(data) {
  return request({
    url: '/order/delete',
    method: 'post',
    data
  })
}

export function addTable(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}
