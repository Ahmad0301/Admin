import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    { id: 1, name: 'Emily Carter', email: 'emily@example.com', role: 'Admin' },
    { id: 2, name: 'David Lee', email: 'david@example.com', role: 'Editor' },
    { id: 3, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'User' },
    { id: 4, name: 'Michael Brown', email: 'michael@example.com', role: 'User' }
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [addingUser, setAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (user) => {
    setEditingUser({ ...user });
  };

  const handleSave = () => {
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === editingUser.id ? editingUser : u))
    );
    setEditingUser(null);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (confirm) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const handleAddUser = () => {
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    setUsers([...users, { id: newId, ...newUser }]);
    setNewUser({ name: '', email: '', role: 'User' });
    setAddingUser(false);
  };

  const startVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      setSearchQuery(spoken);
    };

    recognition.onerror = (event) => {
      alert("Voice search failed. Try again.");
    };
  };

  const menuItems = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
    { name: 'Users', icon: UsersIcon, path: '/users', active: true },
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
          <p className="text-[32px] font-bold leading-tight">Users</p>
        </div>

        <h2 className="text-[22px] font-bold tracking-tight pb-3 pt-5">User Management</h2>

        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-3 py-2 rounded bg-[#1c2126] border border-[#3c4753] text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={startVoiceSearch}
            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-400 text-white text-sm"
          >
            🎤 Voice Search
          </button>
          <button
            onClick={() => setAddingUser(true)}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white text-sm"
          >
            ➕ Add User
          </button>
        </div>

        <div className="overflow-auto border border-[#3c4753] rounded-xl bg-[#111418]">
          <table className="w-full">
            <thead className="bg-[#1c2126]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) =>
                  user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((user) => (
                  <tr key={user.id} className="border-t border-[#3c4753]">
                    <td className="px-4 py-2 text-[#9daab8] text-sm">{user.name}</td>
                    <td className="px-4 py-2 text-[#9daab8] text-sm">{user.email}</td>
                    <td className="px-4 py-2 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'Admin' ? 'bg-red-500' :
                        user.role === 'Editor' ? 'bg-yellow-500' : 'bg-blue-500'
                      } text-white`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <button onClick={() => handleEdit(user)} className="text-blue-400 hover:underline mr-4">Edit</button>
                      <button onClick={() => handleDelete(user.id)} className="text-red-400 hover:underline">Delete</button>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {editingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#1c2126] p-6 rounded-xl w-[400px]">
              <h3 className="text-xl font-bold mb-4">Edit User</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  className="w-full p-2 bg-[#111418] text-white rounded border border-[#3c4753]"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                />
                <input
                  type="email"
                  className="w-full p-2 bg-[#111418] text-white rounded border border-[#3c4753]"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                />
                <select
                  className="w-full p-2 bg-[#111418] text-white rounded border border-[#3c4753]"
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {addingUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#1c2126] p-6 rounded-xl w-[400px]">
              <h3 className="text-xl font-bold mb-4">Add New User</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 bg-[#111418] text-white rounded border border-[#3c4753]"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 bg-[#111418] text-white rounded border border-[#3c4753]"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <select
                  className="w-full p-2 bg-[#111418] text-white rounded border border-[#3c4753]"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => setAddingUser(false)}
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-sm"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

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

export default UsersPage;
