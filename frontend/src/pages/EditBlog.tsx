import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as blogService from '../services/blogService'
import LoadingSpinner from '../components/LoadingSpinner'
import { Blog } from '../types'

export default function EditBlog(){
  const { id } = useParams()
  const [form, setForm] = useState<Partial<Blog>>({ title:'', content:'', is_draft:false })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(()=>{
    if (!id) return
    blogService.fetchBlog(id).then(res=>setForm({ title:res.data.title, content:res.data.content, is_draft:res.data.is_draft })).catch(()=>alert('Failed to load')).finally(()=>setLoading(false))
  },[id])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const { name, value, type } = e.target as HTMLInputElement
    if (type === 'checkbox') {
      setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault(); setSaving(true); setErrors(null)
    try{
      if (id) await blogService.updateBlog(id, form)
      navigate('/blogs')
    }catch(err:any){ setErrors(err.response?.data || { detail:'Update failed' }) }
    finally{ setSaving(false) }
  }

  if (loading) return <div className="container"><div className="card"><LoadingSpinner /></div></div>

  return (
    <div className="container">
      <div className="card">
        <h3>Edit Blog</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Title</label>
            <input name="title" value={form.title as string} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label>Content</label>
            <textarea name="content" value={form.content as string} onChange={handleChange} />
          </div>
          <div className="form-row">
            <label><input type="checkbox" name="is_draft" checked={!!form.is_draft} onChange={handleChange} /> Save as draft</label>
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
