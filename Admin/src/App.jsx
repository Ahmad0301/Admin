import React from 'react'
import AdminLogin from './Pages/AdminLogin'
import AdminDashboard from './Pages/AdminDashboard'
import { Routes, Route } from "react-router-dom";
import UsersPage from './Pages/users';
import ContentPage from './Pages/Content'
import SettingsPage from './Pages/Settings'
import HelpPage from './Pages/Help'

function App() {
  return (
    <div>
      <Routes>

        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/users" element={<UsersPage />} />  
       <Route path="/content" element={<ContentPage />} />  
       <Route path="/settings" element={<SettingsPage />} />  
       <Route path="/help" element={<HelpPage />} />

      </Routes>
    </div>
  )
}

export default App