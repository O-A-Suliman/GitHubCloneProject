import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import BlogList from './pages/BlogList'
import CreateBlog from './pages/CreateBlog'
import EditBlog from './pages/EditBlog'
import Profile from './pages/Profile'
import api from './services/api'

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.get('/auth/user/').then(res => setUser(res.data)).catch(() => {
        localStorage.removeItem('token')
        setUser(null)
      })
    }
  }, [])

  return (
    <div className="app-root">
      <Navbar user={user} setUser={setUser} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/blogs" element={<BlogList user={user} />} />
          <Route path="/blogs/create" element={<PrivateRoute><CreateBlog /></PrivateRoute>} />
          <Route path="/blogs/:id/edit" element={<PrivateRoute><EditBlog /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile setUser={setUser} /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
