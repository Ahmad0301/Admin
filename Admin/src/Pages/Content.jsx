import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContentPage = () => {
  const navigate = useNavigate();

  const [commands, setCommands] = useState([
    { id: 1, command: 'Go to home', action: 'Navigates to homepage', category: 'Navigation' },
    { id: 2, command: 'Open contact page', action: 'Navigates to contact form', category: 'Navigation' },
    { id: 3, command: 'Scroll down', action: 'Scrolls the window down', category: 'General' },
    { id: 4, command: 'Submit form', action: 'Submits active form', category: 'Form Control' },
    { id: 5, command: 'Logout', action: 'Logs the user out', category: 'Authentication' }
  ]);

  const [editingCommand, setEditingCommand] = useState(null);

  const handleEdit = (cmd) => {
    setEditingCommand({ ...cmd });
  };

  const handleSave = () => {
    setCommands((prev) =>
      prev.map((cmd) => (cmd.id === editingCommand.id ? editingCommand : cmd))
    );
    setEditingCommand(null);
  };

  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this voice command?');
    if (confirm) {
      setCommands((prev) => prev.filter((cmd) => cmd.id !== id));
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
    { name: 'Users', icon: UsersIcon, path: '/users' },
    { name: 'Content', icon: ContentIcon, path: '/content', active: true },
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
          <p className="text-[32px] font-bold leading-tight">Content</p>
        </div>
        <h2 className="text-[22px] font-bold tracking-tight pb-3 pt-5">Voice Commands</h2>

        <div className="overflow-auto border border-[#3c4753] rounded-xl bg-[#111418]">
          <table className="w-full">
            <thead className="bg-[#1c2126]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Command</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {commands.map((cmd) => (
                <tr key={cmd.id} className="border-t border-[#3c4753]">
                  <td className="px-4 py-2 text-[#9daab8] text-sm">{cmd.command}</td>
                  <td className="px-4 py-2 text-[#9daab8] text-sm">{cmd.action}</td>
                  <td className="px-4 py-2 text-[#9daab8] text-sm">{cmd.category}</td>
                  <td className="px-4 py-2 text-sm">
                    <button
                      onClick={() => handleEdit(cmd)}
                      className="text-blue-400 hover:underline mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cmd.id)}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {editingCommand && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#1c2126] p-6 rounded-xl w-[400px]">
              <h3 className="text-xl font-bold mb-4">Edit Command</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm">Command</label>
                  <input
                    type="text"
                    className="w-full mt-1 p-2 bg-[#111418] text-white rounded border border-[#3c4753]"
                    value={editingCommand.command}
                    onChange={(e) =>
                      setEditingCommand({ ...editingCommand, command: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm">Action</label>
                  <input
                    type="text"
                    className="w-full mt-1 p-2 bg-[#111418] text-white rounded border border-[#3c4753]"
                    value={editingCommand.action}
                    onChange={(e) =>
                      setEditingCommand({ ...editingCommand, action: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm">Category</label>
                  <select
                    className="w-full mt-1 p-2 bg-[#111418] text-white rounded border border-[#3c4753]"
                    value={editingCommand.category}
                    onChange={(e) =>
                      setEditingCommand({ ...editingCommand, category: e.target.value })
                    }
                  >
                    <option value="Navigation">Navigation</option>
                    <option value="General">General</option>
                    <option value="Form Control">Form Control</option>
                    <option value="Authentication">Authentication</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => setEditingCommand(null)}
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

export default ContentPage;
