import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

    const navigate = useNavigate();

  const handleLogin = () => {
    // Add login logic here
    navigate('/dashboard');
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#111418] overflow-x-hidden"
      style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between border-b border-[#293038] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold tracking-tight">Admin Panel</h2>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="flex flex-col w-full max-w-[512px] py-5">
            <h2 className="text-white text-[28px] font-bold text-center pb-3 pt-5">
              Admin Login
            </h2>
            <div className="flex flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium pb-2">Username</p>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input w-full rounded-xl text-white border border-[#3c4753] bg-[#1c2126] h-14 p-[15px] text-base placeholder:text-[#9daab8] focus:outline-none focus:border-[#3c4753]"
                />
              </label>
            </div>
            <div className="flex flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium pb-2">Password</p>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input w-full rounded-xl text-white border border-[#3c4753] bg-[#1c2126] h-14 p-[15px] text-base placeholder:text-[#9daab8] focus:outline-none focus:border-[#3c4753]"
                />
              </label>
            </div>
            <div className="flex justify-center px-4 py-3">
              <button
                onClick={handleLogin}
                className="min-w-[84px] cursor-pointer rounded-full h-10 px-4 bg-[#197ce5] text-white text-sm font-bold"
              >
                <span className="truncate">Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
