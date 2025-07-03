import React from 'react'
import AdminLogin from './Pages/AdminLogin'
import AdminDashboard from './Pages/AdminDashboard'
import { Routes, Route } from "react-router-dom";
import UsersPage from './Pages/users';

function App() {
  return (
    <div>
      <Routes>

        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/users" element={<UsersPage />} />    
      </Routes>
    </div>
  )
}

export default App