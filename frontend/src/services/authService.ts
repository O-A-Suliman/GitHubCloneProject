import api from './api'
import { User } from '../types'

export interface AuthResponse { user?: User; token?: string }

export async function register(data: { first_name: string; last_name: string; email: string; password: string; }): Promise<AuthResponse> {
  const res = await api.post('/auth/register/', data)
  return res.data
}

export async function login(data: { email: string; password: string; }): Promise<AuthResponse> {
  const res = await api.post('/auth/login/', data)
  return res.data
}

export default { register, login }
