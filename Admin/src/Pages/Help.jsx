import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HelpPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [contact, setContact] = useState({ name: '', email: '', message: '' });

  const faqs = [
    { q: 'How do I enable microphone?', a: 'Go to browser settings and allow microphone access for this site.' },
    { q: 'What is the default wake word?', a: 'The default wake word is "Hey VoiceApp".' },
    { q: 'Can I change the theme?', a: 'Yes, navigate to the settings page to toggle between dark and light themes.' },
    { q: 'What voice commands can I use?', a: 'Try commands like "Go to Dashboard", "Open Users", "Log out", etc.' }
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.q.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const simulateChatbotResponse = (question) => {
    const matched = faqs.find(f => question.toLowerCase().includes(f.q.toLowerCase()));
    return matched ? matched.a : "Sorry, I couldn't find an answer to that. Please contact support.";
  };

  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserQuestion(transcript);
      setChatResponse(simulateChatbotResponse(transcript));
    };
  };

  const handleContactChange = (field, value) => {
    setContact(prev => ({ ...prev, [field]: value }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert("Support request submitted. We'll get back to you soon.");
    setContact({ name: '', email: '', message: '' });
  };

  const menuItems = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
    { name: 'Users', icon: UsersIcon, path: '/users' },
    { name: 'Content', icon: ContentIcon, path: '/content' },
    { name: 'Settings', icon: SettingsIcon, path: '/settings' },
    { name: 'Help', icon: HelpIcon, path: '/help', active: true }
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

      {/* Main */}
      <main className="flex-1 p-6 max-w-[960px] space-y-8">
        <h1 className="text-[32px] font-bold mb-2">Help & Support</h1>

        {/* FAQ Search */}
        <div>
          <label className="text-sm font-medium">Search FAQs</label>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full mt-1 p-2 bg-[#1c2126] border border-[#3c4753] rounded"
            placeholder="Type your question..."
          />
          <ul className="mt-3 space-y-2 text-sm text-[#cbd5e1]">
            {filteredFaqs.map((faq, i) => (
              <li key={i}><strong>Q:</strong> {faq.q}<br /><strong>A:</strong> {faq.a}</li>
            ))}
          </ul>
        </div>

        {/* Voice Controlled Help */}
        <div>
          <label className="text-sm font-medium">Ask by Voice</label>
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={handleVoiceInput}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              🎙️ Start Voice
            </button>
            {userQuestion && (
              <div className="text-sm">
                <p><strong>You asked:</strong> {userQuestion}</p>
                <p><strong>Bot says:</strong> {chatResponse}</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Contact Support</h2>
          <form onSubmit={handleContactSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              value={contact.name}
              onChange={(e) => handleContactChange('name', e.target.value)}
              required
              className="w-full p-2 bg-[#1c2126] border border-[#3c4753] rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={contact.email}
              onChange={(e) => handleContactChange('email', e.target.value)}
              required
              className="w-full p-2 bg-[#1c2126] border border-[#3c4753] rounded"
            />
            <textarea
              placeholder="Your Message"
              value={contact.message}
              onChange={(e) => handleContactChange('message', e.target.value)}
              required
              rows="4"
              className="w-full p-2 bg-[#1c2126] border border-[#3c4753] rounded"
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-500"
            >
              Submit Request
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

// SVG Icons (replace paths as needed)
const DashboardIcon = () => <svg width="24" height="24" fill="currentColor"><path d="M224,115.55..." /></svg>;
const UsersIcon = () => <svg width="24" height="24" fill="currentColor"><path d="M117.25,157.92..." /></svg>;
const ContentIcon = () => <svg width="24" height="24" fill="currentColor"><path d="M213.66,82.34..." /></svg>;
const SettingsIcon = () => <svg width="24" height="24" fill="currentColor"><path d="M128,80..." /></svg>;
const HelpIcon = () => <svg width="24" height="24" fill="currentColor"><path d="M140,180..." /></svg>;

export default HelpPage;
