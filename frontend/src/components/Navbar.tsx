import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../types'

export default function Navbar({ user, setUser }: { user: User | null; setUser: (u: User | null) => void }){
  const navigate = useNavigate()

  function logout(){
    localStorage.removeItem('token')
    setUser(null)
    navigate('/login')
  }

  return (
    <nav className="navbar container">
      <div className="nav-left">
        <div className="brand">DjangoBlog</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/blogs/create">Create</Link>
        </div>
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span style={{marginRight:12}} className="small-muted">{user.first_name} {user.last_name}</span>
            <Link to="/profile" className="btn ghost">Profile</Link>
            <button onClick={logout} className="btn" style={{marginLeft:8}}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn ghost" style={{marginRight:8}}>Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
