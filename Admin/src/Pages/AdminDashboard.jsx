import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

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
      <main className="flex-1 p-4 max-w-[960px]">
        <div className="mb-5">
          <p className="text-[32px] font-bold leading-tight">Dashboard</p>
        </div>
        <h2 className="text-[22px] font-bold tracking-tight pb-3 pt-5">System Logs</h2>
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
              {logs.map((log, idx) => (
                <tr key={idx} className="border-t border-[#3c4753]">
                  <td className="px-4 py-2 text-[#9daab8] text-sm">{log.timestamp}</td>
                  <td className="px-4 py-2 text-[#9daab8] text-sm">{log.eventType}</td>
                  <td className="px-4 py-2 text-[#9daab8] text-sm">{log.user}</td>
                  <td className="px-4 py-2 text-[#9daab8] text-sm">{log.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

const logs = [
  { timestamp: '2024-03-15 10:00', eventType: 'Login', user: 'Emily Carter', description: 'User logged in successfully' },
  { timestamp: '2024-03-15 10:15', eventType: 'Content Update', user: 'David Lee', description: "Article 'Exploring the Cosmos' updated" },
  { timestamp: '2024-03-15 10:30', eventType: 'User Registration', user: 'Sarah Johnson', description: 'New user registered' },
  { timestamp: '2024-03-15 10:45', eventType: 'Password Reset', user: 'Michael Brown', description: 'User requested password reset' },
  { timestamp: '2024-03-15 11:00', eventType: 'Logout', user: 'Emily Carter', description: 'User logged out' }
];

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
