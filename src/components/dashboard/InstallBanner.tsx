'use client';
import { useEffect, useState } from 'react';
import { X, Download } from 'lucide-react';

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isStandalone) setIsVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setIsVisible(false);
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-indigo-500/20 blur-2xl" />
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600 shadow-lg">
            <span className="text-xl font-bold text-white">F</span>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-900">Install FinCal</h3>
            <p className="text-xs text-slate-600">Access your mortgage data instantly from your home screen.</p>
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={handleInstall} className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-700">
              <Download size={14} /> Install
            </button>
            <button onClick={() => setIsVisible(false)} className="flex items-center justify-center self-end text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}