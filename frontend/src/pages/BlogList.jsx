import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as blogService from '../services/blogService'
import LoadingSpinner from '../components/LoadingSpinner'

export default function BlogList({ user }){
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    setLoading(true); blogService.fetchBlogs().then(res=>setBlogs(res.data)).catch(e=>setError(e)).finally(()=>setLoading(false))
  },[])

  async function handleDelete(id){
    if (!confirm('Delete this blog?')) return
    try{ await blogService.deleteBlog(id); setBlogs(blogs.filter(b=>b.id !== id)) }
    catch(e){ alert('Delete failed') }
  }

  return (
    <div className="container">
      <h2 style={{marginBottom:12}}>Blogs</h2>
      {loading && <LoadingSpinner />}
      {error && <div className="small-muted">Failed to load blogs.</div>}
      <div className="grid">
        {blogs.map(blog => (
          <div key={blog.id} className="card">
            <h3 className="blog-title">{blog.title}</h3>
            <div className="blog-meta">by {blog.author?.first_name} {blog.author?.last_name} • {blog.is_draft ? 'Draft' : 'Published'}</div>
            <p style={{marginTop:10}}>{(blog.content||'').slice(0,180)}{(blog.content||'').length>180? '...':''}</p>
            <div className="actions">
              <Link to={`/blogs/${blog.id}/edit`} className="btn" style={{display: user && user.id===blog.author?.id ? 'inline-block':'none'}}>Edit</Link>
              <button className="btn danger" onClick={()=>handleDelete(blog.id)} style={{display: user && user.id===blog.author?.id ? 'inline-block':'none'}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
