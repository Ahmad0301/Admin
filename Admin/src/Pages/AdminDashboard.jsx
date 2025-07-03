import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredLogs = logs.filter(log =>
    (filter === 'All' || log.eventType === filter) &&
    (log.description.toLowerCase().includes(search.toLowerCase()) || log.user.toLowerCase().includes(search.toLowerCase()))
  );

  const startVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearch(transcript);
    };
    recognition.onerror = () => alert('Voice search failed');
  };

  const menuItems = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/dashboard', active: true },
    { name: 'Users', icon: UsersIcon, path: '/users' },
    { name: 'Content', icon: ContentIcon, path: '/content' },
    { name: 'Settings', icon: SettingsIcon, path: '/settings' },
    { name: 'Help', icon: HelpIcon, path: '/help' }
  ];

  return (
    <div className="min-h-screen bg-[#111418] text-white font-sans flex">
      {/* Sidebar */}
      <aside className="w-80 p-4">
        <div className="flex flex-col min-h-[700px] justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-base font-medium">Admin Panel</h1>
            <nav className="flex flex-col gap-2">
              {menuItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer transition-colors ${
                    item.active ? 'bg-[#293038]' : 'hover:bg-[#1c2126]'
                  }`}
                >
                  <item.icon />
                  <p className="text-sm font-medium">{item.name}</p>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-[32px] font-bold mb-4">Admin Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatsCard label="Total Users" value="4" />
          <StatsCard label="Active Sessions" value="2" />
          <StatsCard label="System Logs" value={logs.length} />
        </div>

        {/* Filters + Search */}
        <div className="flex flex-wrap gap-3 mb-4">
          <select
            className="px-3 py-2 bg-[#1c2126] border border-[#3c4753] rounded text-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Login">Login</option>
            <option value="Logout">Logout</option>
            <option value="Content Update">Content Update</option>
            <option value="User Registration">User Registration</option>
            <option value="Password Reset">Password Reset</option>
          </select>

          <input
            type="text"
            placeholder="Search logs..."
            className="px-3 py-2 flex-1 min-w-[220px] bg-[#1c2126] border border-[#3c4753] rounded text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={startVoiceSearch}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white text-sm"
          >
            🎤 Voice Search
          </button>
        </div>

        {/* Logs Table */}
        <div className="overflow-auto border border-[#3c4753] rounded-xl bg-[#111418]">
          <table className="w-full">
            <thead className="bg-[#1c2126]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Timestamp</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Event Type</th>
                <th className="px-4 py-3 text-left text-sm font-medium">User</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log, idx) => (
                <tr key={idx} className="border-t border-[#3c4753]">
                  <td className="px-4 py-2 text-[#9daab8] text-sm">{log.timestamp}</td>
                  <td className="px-4 py-2 text-[#9daab8] text-sm">{log.eventType}</td>
                  <td className="px-4 py-2 text-[#9daab8] text-sm">{log.user}</td>
                  <td className="px-4 py-2 text-[#9daab8] text-sm">{log.description}</td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-[#9daab8] py-6">No logs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ label, value }) => (
  <div className="bg-[#1c2126] p-5 rounded-xl border border-[#3c4753] shadow-sm">
    <p className="text-sm text-[#9daab8]">{label}</p>
    <h3 className="text-2xl font-bold mt-1">{value}</h3>
  </div>
);

// Logs Data
const logs = [
  { timestamp: '2024-03-15 10:00', eventType: 'Login', user: 'Emily Carter', description: 'User logged in successfully' },
  { timestamp: '2024-03-15 10:15', eventType: 'Content Update', user: 'David Lee', description: "Article 'Exploring the Cosmos' updated" },
  { timestamp: '2024-03-15 10:30', eventType: 'User Registration', user: 'Sarah Johnson', description: 'New user registered' },
  { timestamp: '2024-03-15 10:45', eventType: 'Password Reset', user: 'Michael Brown', description: 'User requested password reset' },
  { timestamp: '2024-03-15 11:00', eventType: 'Logout', user: 'Emily Carter', description: 'User logged out' }
];

// Icons
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M224,115.55V208a16..." />
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M117.25,157.92a60,60..." />
  </svg>
);

const ContentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M213.66,82.34l-56-56..." />
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M128,80a48,48..." />
  </svg>
);

const HelpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
    <path d="M140,180a12,12..." />
  </svg>
);

export default AdminDashboard;
