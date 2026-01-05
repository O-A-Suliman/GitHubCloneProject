import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as blogService from '../services/blogService'
import LoadingSpinner from '../components/LoadingSpinner'
import { Blog } from '../types'

export default function CreateBlog(){
  const [form, setForm] = useState<Partial<Blog>>({ title:'', content:'', is_draft:false })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>(null)
  const navigate = useNavigate()

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const { name, value, type } = e.target as HTMLInputElement
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setForm(prev => ({ ...prev, [name]: checked }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault(); setLoading(true); setErrors(null)
    try{
      await blogService.createBlog(form)
      navigate('/blogs')
    }catch(err:any){ setErrors(err.response?.data || { detail:'Create failed' }) }
    finally{ setLoading(false) }
  }

  return (
    <div className="container">
      <div className="card">
        <h3>Create Blog</h3>
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
            <button className="btn" disabled={loading}>{loading ? <LoadingSpinner/> : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
