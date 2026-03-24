"use client";

import { Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PrivacyToggle() {
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    const savedPrivacy = localStorage.getItem('privacy-mode') === 'true';
    setIsPrivate(savedPrivacy);
  }, []);

  useEffect(() => {
    if (isPrivate) {
      document.documentElement.classList.add('privacy-mode');
      localStorage.setItem('privacy-mode', 'true');
    } else {
      document.documentElement.classList.remove('privacy-mode');
      localStorage.setItem('privacy-mode', 'false');
    }
  }, [isPrivate]);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setIsPrivate(!isPrivate);
      }}
      aria-label="Toggle Privacy"
      data-testid="privacy-toggle-btn"
      type="button"
      className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-bold transition-all w-full lg:w-auto ${
        isPrivate 
          ? 'bg-amber-100 text-amber-700' 
          : 'bg-white border border-slate-200 text-slate-600'
      }`}
    >
      {isPrivate ? <EyeOff size={16} /> : <Eye size={16} />}
      <span>Privacy {isPrivate ? 'ON' : 'OFF'}</span>
    </button>
  );
}