import api from './api'
import { Blog } from '../types'

export const fetchBlogs = (params?: any) => api.get<Blog[]>('/blogs/', { params })
export const fetchBlog = (id: number | string) => api.get<Blog>(`/blogs/${id}/`)
export const createBlog = (data: Partial<Blog>) => api.post('/blogs/', data)
export const updateBlog = (id: number | string, data: Partial<Blog>) => api.put(`/blogs/${id}/`, data)
export const deleteBlog = (id: number | string) => api.delete(`/blogs/${id}/`)

export default { fetchBlogs, fetchBlog, createBlog, updateBlog, deleteBlog }
