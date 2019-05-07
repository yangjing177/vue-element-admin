import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/admin/login' + '?username=' + username + '&password=' + password,
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/info' + '?username=' + token,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/users/logout',
    method: 'post'
  })
}
