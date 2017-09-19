import fetch from '@/utils/fetch'

export function getUserList(params) {
  return fetch({
    url: '/user/select_list',
    method: 'post',
    data: params
  })
}

export function updateUserInfo(params) {
  return fetch({
    url: '/user/update_user',
    method: 'post',
    data: params
  })
}

export function addUserInfo(params) {
  return fetch({
    url: '/user/add_user',
    method: 'post',
    data: params
  })
}

export function deleteUserInfo(params) {
  return fetch({
    url: '/user/delete_user',
    method: 'post',
    data: params
  })
}

export function resetPassword(params) {
  return fetch({
    url: '/user/reset_password',
    method: 'post',
    data: params
  })
}
