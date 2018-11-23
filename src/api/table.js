import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/user/table',
    method: 'get',
    params
  })
}
export function getList1(params) {
  return request({
    url: '/user/kucun',
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
    url: '/user/update',
    method: 'post',
    data
  })
}

export function deleteTable(data) {
  return request({
    url: '/user/delete',
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
