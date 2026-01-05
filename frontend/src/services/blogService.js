import api from './api'

export const fetchBlogs = (params) => api.get('/blogs/', { params })
export const fetchBlog = (id) => api.get(`/blogs/${id}/`)
export const createBlog = (data) => api.post('/blogs/', data)
export const updateBlog = (id, data) => api.put(`/blogs/${id}/`, data)
export const deleteBlog = (id) => api.delete(`/blogs/${id}/`)

export default { fetchBlogs, fetchBlog, createBlog, updateBlog, deleteBlog }
