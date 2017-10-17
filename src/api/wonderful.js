import fetch from '@/utils/fetch'

export function fetchWonderfulPhotoList(params) {
  return fetch({
    url: '/wonderful/fetch_wonderful_photo_list',
    method: 'post',
    data: params
  })
}

export function getWonderfulPhotoInfo(id) {
  return fetch({
    url: '/wonderful/get_wonderful_photo_info?id=' + id,
    method: 'get'
  })
}

export function addWonderfulPhotoInfo(params) {
  return fetch({
    url: '/wonderful/add_wonderful_photo_info',
    method: 'post',
    data: params
  })
}

export function updateWonderfulPhotoInfo(params) {
  return fetch({
    url: '/wonderful/update_wonderful_photo_info',
    method: 'post',
    data: params
  })
}

export function onLineWonderfulPhotoInfo(params) {
  return fetch({
    url: '/wonderful/online_wonderful_photo_info',
    method: 'post',
    data: params
  })
}

export function offLineWonderfulPhotoInfo(params) {
  return fetch({
    url: '/wonderful/offline_wonderful_photo_info',
    method: 'post',
    data: params
  })
}

