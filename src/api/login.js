import fetch from '@/utils/fetch'

export function login(userName, password) {
  return fetch({
    url: '/user/login',
    method: 'post',
    data: {
      userName,
      password
    }
  })
}

export function getInfo(token) {
  return fetch({
    url: '/user/get_info',
    method: 'post',
    data: {

    }
  })
}