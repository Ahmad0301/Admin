import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    theme: 'dark',
    voiceFeedback: true,
    autoListen: false,
    wakeWord: 'Hey VoiceApp',
    language: 'en-US',
    micSensitivity: 75
  });

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const resetDefaults = () => {
    setSettings({
      theme: 'dark',
      voiceFeedback: true,
      autoListen: false,
      wakeWord: 'Hey VoiceApp',
      language: 'en-US',
      micSensitivity: 75
    });
  };

  const themeClasses = settings.theme === 'dark'
    ? {
        page: 'bg-[#111418] text-white',
        card: 'bg-[#1c2126] border-[#3c4753]',
        sidebar: 'bg-[#111418] text-white',
        sidebarActive: 'bg-[#293038]',
        border: 'border-[#3c4753]',
        hover: 'hover:bg-[#1c2126]'
      }
    : {
        page: 'bg-gray-100 text-black',
        card: 'bg-white border-gray-300',
        sidebar: 'bg-gray-100 text-black',
        sidebarActive: 'bg-gray-300',
        border: 'border-gray-300',
        hover: 'hover:bg-gray-200'
      };

  const menuItems = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
    { name: 'Users', icon: UsersIcon, path: '/users' },
    { name: 'Content', icon: ContentIcon, path: '/content' },
    { name: 'Settings', icon: SettingsIcon, path: '/settings', active: true },
    { name: 'Help', icon: HelpIcon, path: '/help' }
  ];

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-300 ${themeClasses.page}`}>
      {/* Sidebar */}
      <aside className={`w-80 p-4 ${themeClasses.sidebar}`}>
        <div className="flex flex-col min-h-[700px] justify-between">
          <div className="flex flex-col gap-4">
            <h1 className="text-base font-medium">Admin Panel</h1>
            <nav className="flex flex-col gap-2">
              {menuItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-full cursor-pointer transition-colors ${
                    item.active ? themeClasses.sidebarActive : themeClasses.hover
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
      <main className="flex-1 p-6 max-w-[960px]">
        <h1 className="text-[32px] font-bold leading-tight mb-5">Settings</h1>
        <div className={`space-y-5 p-6 rounded-xl border ${themeClasses.card} ${themeClasses.border}`}>
          {/* Theme */}
          <div>
            <label className="text-sm font-medium">Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
              className="w-full mt-1 p-2 rounded border bg-inherit border-gray-400"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          {/* Wake Word */}
          <div>
            <label className="text-sm font-medium">Wake Word</label>
            <input
              type="text"
              value={settings.wakeWord}
              onChange={(e) => handleChange('wakeWord', e.target.value)}
              className="w-full mt-1 p-2 rounded border bg-inherit border-gray-400"
            />
          </div>

          {/* Language */}
          <div>
            <label className="text-sm font-medium">Language</label>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full mt-1 p-2 rounded border bg-inherit border-gray-400"
            >
              <option value="en-US">English (US)</option>
              <option value="ur-PK">Urdu (Pakistan)</option>
              <option value="es-ES">Spanish</option>
              <option value="fr-FR">French</option>
            </select>
          </div>

          {/* Voice Feedback */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Voice Feedback (TTS)</label>
            <input
              type="checkbox"
              checked={settings.voiceFeedback}
              onChange={(e) => handleChange('voiceFeedback', e.target.checked)}
              className="w-5 h-5"
            />
          </div>

          {/* Auto Listen Mode */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Auto Listen on Load</label>
            <input
              type="checkbox"
              checked={settings.autoListen}
              onChange={(e) => handleChange('autoListen', e.target.checked)}
              className="w-5 h-5"
            />
          </div>

          {/* Mic Sensitivity */}
          <div>
            <label className="text-sm font-medium">Mic Sensitivity ({settings.micSensitivity}%)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.micSensitivity}
              onChange={(e) => handleChange('micSensitivity', parseInt(e.target.value))}
              className="w-full mt-2"
            />
          </div>

          {/* Reset Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={resetDefaults}
              className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-500"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// Icons
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 256 256">
    <path d="M224,115.55V208a16..." />
  </svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 256 256">
    <path d="M117.25,157.92a60,60..." />
  </svg>
);
const ContentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 256 256">
    <path d="M213.66,82.34l-56-56..." />
  </svg>
);
const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 256 256">
    <path d="M128,80a48,48..." />
  </svg>
);
const HelpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 256 256">
    <path d="M140,180a12,12..." />
  </svg>
);

export default SettingsPage;
