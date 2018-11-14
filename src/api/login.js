import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login' + '?username=' + username + '&password=' + password,
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info' + '?username=' + token,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
