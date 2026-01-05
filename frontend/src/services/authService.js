import api from './api'

export async function register(data){
  // expected: POST /auth/register/ { first_name,last_name,email,password }
  const res = await api.post('/auth/register/', data)
  return res.data
}

export async function login(data){
  // expected: POST /auth/login/ { email,password }
  const res = await api.post('/auth/login/', data)
  return res.data
}

export default { register, login }
