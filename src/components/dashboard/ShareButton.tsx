"use client";

import React, { useState, useEffect } from 'react';
import { Share2, Check } from 'lucide-react';

export default function ShareButton({ 
  title = "FinCal | Mortgage Pro", 
  text = "Check out my mortgage projection on FinCal!", 
  url 
}: { title?: string, text?: string, url?: string }) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(!!navigator.share);
  }, []);

  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch (err) { /* silent fail on abort */ }
    } else {
      await navigator.clipboard.writeText(`${text} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label="Share Results"
      className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 w-full lg:w-auto font-bold text-xs"
    >
      {copied ? <Check size={16} className="text-emerald-500" /> : <Share2 size={16} />}
      <span>{copied ? "Link Copied" : "Share Results"}</span>
    </button>
  );
}