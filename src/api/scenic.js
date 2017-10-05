import fetch from '@/utils/fetch'

export function getScenicList(params) {
  return fetch({
    url: '/scenic/select_list',
    method: 'post',
    data: params
  })
}

export function updateScenicInfo(params) {
  return fetch({
    url: '/scenic/update_scenic',
    method: 'post',
    data: params
  })
}

export function addScenicInfo(params) {
  return fetch({
    url: '/scenic/add_scenic',
    method: 'post',
    data: params
  })
}

export function deleteScenicInfo(params) {
  return fetch({
    url: '/scenic/delete_scenic',
    method: 'post',
    data: params
  })
}

export function getScenicInfo(id) {
  return fetch({
    url: '/scenic/get_info?id=' + id,
    method: 'get'
  })
}


