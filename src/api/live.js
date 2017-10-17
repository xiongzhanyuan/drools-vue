import fetch from '@/utils/fetch'

export function fetchLiveShowList(params) {
  return fetch({
    url: '/live/fetch_live_show_list',
    method: 'post',
    data: params
  })
}

export function getLiveShowInfo(id) {
  return fetch({
    url: '/live/get_live_show_info?id=' + id,
    method: 'get'
  })
}

export function addLiveShowInfo(params) {
  return fetch({
    url: '/live/add_live_show_info',
    method: 'post',
    data: params
  })
}

export function updateLiveShowInfo(params) {
  return fetch({
    url: '/live/update_live_show_info',
    method: 'post',
    data: params
  })
}

export function deleteLiveShowInfo(params) {
  return fetch({
    url: '/live/delete_live_show_info',
    method: 'post',
    data: params
  })
}

