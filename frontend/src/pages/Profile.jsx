import React, { useEffect, useState } from 'react'
import { updateUser, fetchUser } from '../services/userService'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Profile({ setUser }){
  const [form, setForm] = useState({ first_name:'', last_name:'', email:'' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState(null)

  useEffect(()=>{
    fetchUser().then(res=>setForm({ first_name:res.data.first_name, last_name:res.data.last_name, email:res.data.email })).catch(()=>{}).finally(()=>setLoading(false))
  },[])

  function handleChange(e){ setForm({...form,[e.target.name]:e.target.value}) }

  async function handleSubmit(e){
    e.preventDefault(); setSaving(true); setErrors(null)
    try{
      const res = await updateUser(form)
      setUser(res.data)
      alert('Profile updated')
    }catch(err){ setErrors(err.response?.data || { detail:'Update failed' }) }
    finally{ setSaving(false) }
  }

  if (loading) return <div className="container"><div className="card"><LoadingSpinner/></div></div>

  return (
    <div className="container">
      <div className="card">
        <h3>Profile</h3>
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
          {errors && <div className="small-muted">{JSON.stringify(errors)}</div>}
          <div style={{marginTop:12}}>
            <button className="btn" disabled={saving}>{saving ? <LoadingSpinner/> : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
