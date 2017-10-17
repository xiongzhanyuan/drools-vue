import fetch from '@/utils/fetch'

export function getMapeInfo(id) {
  return fetch({
    url: '/map/get_map_info?id=' + id,
    method: 'get'
  })
}

export function selectMapList(params) {
  return fetch({
    url: '/map/select_map_list',
    method: 'post',
    data: params
  })
}

export function updateMap(params) {
  return fetch({
    url: '/map/update_map',
    method: 'post',
    data: params
  })
}

export function addMap(params) {
  return fetch({
    url: '/map/add_map',
    method: 'post',
    data: params
  })
}

export function deleteMap(params) {
  return fetch({
    url: '/map/delete_map',
    method: 'post',
    data: params
  })
}

export function isDefault(params) {
  debugger
  return fetch({
    url: '/map/is_default',
    method: 'post',
    data: params
  })
}

