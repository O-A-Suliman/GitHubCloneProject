import api from './api'

export const fetchUser = () => api.get('/auth/user/')
export const updateUser = (data) => api.put('/auth/user/', data)

export default { fetchUser, updateUser }
