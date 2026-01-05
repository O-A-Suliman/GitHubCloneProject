import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="container">
      <div className="card">
        <h2>Welcome to DjangoBlog</h2>
        <p className="small-muted">A simple React frontend ready to integrate with your Django REST API.</p>
        <div style={{marginTop:12}}>
          <Link to="/blogs" className="btn">View Blogs</Link>
        </div>
      </div>
    </div>
  )
}
