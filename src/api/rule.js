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

export function updateColumn(params) {
  return fetch({
    url: '/column/update_column',
    method: 'post',
    data: params
  })
}

export function onLineColumn(params) {
  return fetch({
    url: '/column/on_line',
    method: 'post',
    data: params
  })
}

export function offLineColumn(params) {
  return fetch({
    url: '/column/off_line',
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


export function selectConditionList(params) {
  return fetch({
    url: '/column/select_condition_list',
    method: 'post',
    data: params
  })
}

export function selectResultList(params) {
  return fetch({
    url: '/column/select_result_list',
    method: 'post',
    data: params
  })
}

export function selectRuleList(params) {
  return fetch({
    url: '/rules/select_list',
    method: 'post',
    data: params
  })
}

export function addRule(params) {
  return fetch({
    url: '/rules/add_rule',
    method: 'post',
    data: params
  })
}

export function updateRule(params) {
  return fetch({
    url: '/rules/update_rule',
    method: 'post',
    data: params
  })
}

export function onLineRule(params) {
  return fetch({
    url: '/rules/on_line',
    method: 'post',
    data: params
  })
}

export function offLineRule(params) {
  return fetch({
    url: '/rules/off_line',
    method: 'post',
    data: params
  })
}

export function getRuleInfo(params) {
  return fetch({
    url: '/rules/get_rule_info',
    method: 'post',
    data: params
  })
}


