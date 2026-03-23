'use client';
import { Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function PrivacyToggle() {
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
    if (isPrivate) {
      document.documentElement.classList.add('privacy-mode');
    } else {
      document.documentElement.classList.remove('privacy-mode');
    }
  }, [isPrivate]);

  return (
    <button
      onClick={() => setIsPrivate(!isPrivate)}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
        isPrivate ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
    >
      {isPrivate ? <><EyeOff size={14} /> Privacy: ON</> : <><Eye size={14} /> Privacy: OFF</>}
    </button>
  );
}