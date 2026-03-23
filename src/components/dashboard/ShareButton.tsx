"use client";

import React, { useState, useEffect } from 'react';
import { Share2, Check } from 'lucide-react';

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
}

// REMOVED 'async' from the function definition
export default function ShareButton({ 
  title = "FinCal | Mortgage Pro", 
  text = "Check out my mortgage projection and equity growth on FinCal!", 
  url 
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  // Safely check for navigator.share after mount to avoid hydration mismatch
  useEffect(() => {
    setCanShare(!!navigator.share);
  }, []);

  const handleShare = async () => {
    // Determine the URL inside the handler to ensure window is defined
    const shareUrl = url || window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error("Error sharing:", err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${text} ${shareUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      title={canShare ? "Share results" : "Copy link to results"}
      className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-indigo-50 transition-all active:scale-95 shadow-sm group"
    >
      {copied ? (
        <>
          <Check size={16} className="text-emerald-500 animate-in zoom-in" />
          <span className="text-xs font-bold text-emerald-600">Copied!</span>
        </>
      ) : (
        <>
          <Share2 size={16} className="text-slate-600 group-hover:text-indigo-600 transition-colors" />
          <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-700 transition-colors">
            {canShare ? "Share" : "Copy Link"}
          </span>
        </>
      )}
    </button>
  );
}