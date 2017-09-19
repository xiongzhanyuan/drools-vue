import fetch from '@/utils/fetch'

export function getToken(params) {
  return fetch({
    url: '/common/get_token',
    method: 'post',
  })
}
