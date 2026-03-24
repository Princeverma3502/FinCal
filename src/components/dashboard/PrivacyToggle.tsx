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
        e.stopPropagation();
        setIsPrivate(!isPrivate);
      }}
      aria-label="Toggle Privacy Mode"
      aria-pressed={isPrivate}
      type="button"
      className={`relative z-[130] flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all shadow-sm ${
        isPrivate 
          ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-200' 
          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
      }`}
    >
      {isPrivate ? (
        <>
          <EyeOff size={14} className="animate-in zoom-in duration-200" /> 
          <span>Privacy: ON</span>
        </>
      ) : (
        <>
          <Eye size={14} className="animate-in zoom-in duration-200" /> 
          <span>Privacy: OFF</span>
        </>
      )}
    </button>
  );
}