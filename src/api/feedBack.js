import fetch from '@/utils/fetch'

export function getFeedBackList(params) {
  return fetch({
    url: '/feed_back/select_list',
    method: 'post',
    data: params
  })
}
export function getFeedBackInfo(id) {
  return fetch({
    url: '/feed_back/get_info?id=' + id,
    method: 'get'
  })
}


