import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 获取文章列表
export function getArticles(params) {
  return api.get('/articles', { params })
}

// 获取个人信息
export function getProfile() {
  return api.get('/profile')
}

// 获取搜索历史
export function getSearchHistory() {
  return api.get('/search/history')
}

// 添加搜索历史
export function addSearchHistory(keyword) {
  return api.post('/search/history', { keyword })
}

// 删除搜索历史
export function deleteSearchHistory(keyword) {
  return api.delete(`/search/history/${keyword}`)
}

// 清空搜索历史
export function clearSearchHistory() {
  return api.delete('/search/history')
}

// 获取文章详情
export function getArticleDetail(id) {
  return api.get(`/articles/${id}`)
}
