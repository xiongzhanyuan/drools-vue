import fetch from '@/utils/fetch'

export function getHomeInfo(id) {
  return fetch({
    url: '/home_page/get_info?id=' + id,
    method: 'get'
  })
}

export function getHomeList(params) {
  return fetch({
    url: '/home_page/select_list',
    method: 'post',
    data: params
  })
}

export function updateHome(params) {
  return fetch({
    url: '/home_page/update_info',
    method: 'post',
    data: params
  })
}

export function addHome(params) {
  return fetch({
    url: '/home_page/add_info',
    method: 'post',
    data: params
  })
}

export function deleteHome(params) {
  return fetch({
    url: '/home_page/delete_info',
    method: 'post',
    data: params
  })
}

export function multiDownHome(params) {
  debugger
  return fetch({
    url: '/home_page/multi_down',
    method: 'post',
    data: params
  })
}

