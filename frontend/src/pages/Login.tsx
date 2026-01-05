import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as auth from '../services/authService'
import LoadingSpinner from '../components/LoadingSpinner'
import { User } from '../types'

export default function Login({ setUser }: { setUser: (u: User | null) => void }){
  const [form, setForm] = useState({ email:'', password:'' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>(null)
  const navigate = useNavigate()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){ setForm({...form,[e.target.name]:e.target.value}) }

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault(); setErrors(null); setLoading(true)
    try{
      const data = await auth.login(form)
      if (data.token) localStorage.setItem('token', data.token)
      if (data.user) setUser(data.user)
      navigate('/blogs')
    }catch(err:any){ setErrors(err.response?.data || { detail:'Login failed' }) }
    finally{ setLoading(false) }
  }

  return (
    <div className="container">
      <div className="card">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} />
          </div>
          {errors && <div className="small-muted">{JSON.stringify(errors)}</div>}
          <div style={{marginTop:12}}>
            <button className="btn" disabled={loading}>{loading ? <LoadingSpinner/> : 'Login'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
