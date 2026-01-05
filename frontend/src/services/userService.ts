import api from './api'
import { User } from '../types'

export const fetchUser = () => api.get<User>('/auth/user/')
export const updateUser = (data: Partial<User>) => api.put<User>('/auth/user/', data)

export default { fetchUser, updateUser }
