import fetch from '@/utils/fetch'

export function updateNoticeInfo(params) {
  return fetch({
    url: '/legend/update_legend',
    method: 'post',
    data: params
  })
}

export function addLegendInfo(params) {
  return fetch({
    url: '/legend/add_legend',
    method: 'post',
    data: params
  })
}

export function getLegendInfo() {
  return fetch({
    url: '/legend/get_legend',
    method: 'get'
  })
}

export function fetchLegendActivityList(params) {
  return fetch({
    url: '/legend/fetch_legend_activity_list',
    method: 'post',
    data: params
  })
}

export function getLegendActivityInfo(id) {
  return fetch({
    url: '/legend/get_legend_activity_info?id=' + id,
    method: 'get'
  })
}

export function addLegendActivityInfo(params) {
  return fetch({
    url: '/legend/add_legend_activity_info',
    method: 'post',
    data: params
  })
}

export function updateLegendActivityInfo(params) {
  return fetch({
    url: '/legend/update_legend_activity_info',
    method: 'post',
    data: params
  })
}

export function deleteLegendActivityInfo(params) {
  return fetch({
    url: '/legend/delete_legend_activity_info',
    method: 'post',
    data: params
  })
}

