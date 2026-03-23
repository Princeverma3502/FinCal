"use client";
import { useState, useEffect } from "react";
import { Download, X, Smartphone } from "lucide-react";

export const InstallPopup = () => {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // 1. Capture the official browser install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Only show our popup if the app isn't already installed
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // 2. Fallback timer for iOS (since iOS doesn't support the event above)
    const timer = setTimeout(() => {
      const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (isIOS && !isStandalone) {
        setShow(true);
      }
    }, 5000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Trigger the real Android/Chrome install dialog
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShow(false);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback for iOS or other browsers
      alert("To Install: Tap the Share icon (or browser menu) and select 'Add to Home Screen'");
      setShow(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-96 bg-slate-900 text-white p-6 rounded-[2rem] shadow-2xl z-[100] border border-slate-800 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <button 
        onClick={() => setShow(false)} 
        className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-full transition-colors"
      >
        <X size={16} className="text-slate-400" />
      </button>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Smartphone size={24} className="text-white" />
        </div>
        <div>
          <h4 className="font-bold text-base">Install FinCal Pro</h4>
          <p className="text-xs text-slate-400">Add to home screen for offline use</p>
        </div>
      </div>

      <button 
        onClick={handleInstallClick}
        className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-100 transition-all active:scale-95"
      >
        <Download size={16} />
        Install Web App
      </button>
    </div>
  );
};