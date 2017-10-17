import fetch from '@/utils/fetch'

export function fetchVoiceManageList(params) {
  return fetch({
    url: '/voice/fetch_voice_manage_list',
    method: 'post',
    data: params
  })
}

export function getVoiceManageInfo(id) {
  return fetch({
    url: '/voice/get_voice_manage_info?id=' + id,
    method: 'get'
  })
}

export function addVoiceManageInfo(params) {
  return fetch({
    url: '/voice/add_voice_manage_info',
    method: 'post',
    data: params
  })
}

export function updateVoiceManageInfo(params) {
  return fetch({
    url: '/voice/update_voice_manage_info',
    method: 'post',
    data: params
  })
}

export function deleteVoiceManageInfo(params) {
  return fetch({
    url: '/voice/delete_voice_manage_info',
    method: 'post',
    data: params
  })
}

