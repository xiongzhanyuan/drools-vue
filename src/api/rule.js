import fetch from '@/utils/fetch'

export function reloadRule(params) {
  return fetch({
    url: '/risk/reload',
    method: 'post',
    data: params
  })
}

export function selectColumnList(params) {
  return fetch({
    url: '/column/select_list',
    method: 'post',
    data: params
  })
}

export function addColumn(params) {
  return fetch({
    url: '/column/add_column',
    method: 'post',
    data: params
  })
}

export function selectUsedList(params) {
  return fetch({
    url: '/column/select_used_list',
    method: 'post',
    data: params
  })
}


