import React from 'react'
import AdminLogin from './Pages/AdminLogin'
import AdminDashboard from './Pages/AdminDashboard'
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <Routes>

        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
       
      </Routes>
    </div>
  )
}

export default App