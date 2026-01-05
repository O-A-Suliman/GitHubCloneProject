import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as auth from '../services/authService'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Register({ setUser }){
  const [form, setForm] = useState({ first_name:'', last_name:'', email:'', password:'' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const navigate = useNavigate()

  function handleChange(e){
    setForm({...form,[e.target.name]:e.target.value})
  }

  async function handleSubmit(e){
    e.preventDefault(); setErrors(null); setLoading(true)
    try{
      const data = await auth.register(form)
      if (data.token) localStorage.setItem('token', data.token)
      if (data.user) setUser(data.user)
      navigate('/blogs')
    }catch(err){
      setErrors(err.response?.data || { detail: 'Registration failed' })
    }finally{setLoading(false)}
  }

  return (
    <div className="container">
      <div className="card">
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>First name</label>
            <input name="first_name" value={form.first_name} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Last name</label>
            <input name="last_name" value={form.last_name} onChange={handleChange} />
          </div>
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
            <button className="btn" disabled={loading}>{loading ? <LoadingSpinner/> : 'Register'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
