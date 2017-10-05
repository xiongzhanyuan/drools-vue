import fetch from '@/utils/fetch'

export function updateNoticeInfo(params) {
  return fetch({
    url: '/notice/update_notice',
    method: 'post',
    data: params
  })
}

export function addNoticeInfo(params) {
  return fetch({
    url: '/notice/add_notice',
    method: 'post',
    data: params
  })
}

export function getNoticeInfo() {
  return fetch({
    url: '/notice/get_notice',
    method: 'get'
  })
}


