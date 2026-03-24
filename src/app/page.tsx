"use client";

import React, { useState, useEffect } from 'react';
import { useMortgage } from "@/hooks/useMortgage";
import { StatCards } from "@/components/dashboard/StatCards";
import { InputSidebar } from "@/components/dashboard/InputSidebar";
import { AmortizationTable } from "@/components/dashboard/AmortizationTable";
import { exportToCSV } from "@/utils/export";
import { generatePDF } from "@/utils/pdfGenerator";
import { FileText, Settings2, LayoutDashboard, Table as TableIcon, Menu, X, Download, PieChart as PieIcon } from "lucide-react";
import { formatCurrency, CurrencyCode } from "@/utils/finance";
import dynamic from 'next/dynamic';

import PrivacyToggle from '@/components/dashboard/PrivacyToggle';
import ShareButton from '@/components/dashboard/ShareButton';

const InterestPrincipalChart = dynamic(() => import('@/components/dashboard/InterestPrincipalChart').then(mod => mod.InterestPrincipalChart), { ssr: false });
const BreakdownChart = dynamic(() => import('@/components/dashboard/BreakdownChart').then(mod => mod.BreakdownChart), { ssr: false });

export default function MortgageDashboard() {
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const { inputs, results, updateInput } = useMortgage(currency);
  const [activeTab, setActiveTab] = useState<'inputs' | 'analysis' | 'schedule'>('inputs');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // PREVENT SCROLL: Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  const toggleTab = (tab: 'inputs' | 'analysis' | 'schedule') => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] w-full overflow-x-hidden flex flex-col relative">
      
      {/* NAVBAR */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-[200] w-full">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/icon.png" alt="FinCal Logo" className="w-7 h-7 rounded-lg" />
            <span className="text-xl font-black text-slate-900 tracking-tighter">FinCal</span>
          </div>

          <div className="flex items-center gap-3">
            {/* DESKTOP ACTIONS */}
            <div className="hidden lg:flex items-center gap-3">
               <button 
                 onClick={() => generatePDF(inputs, results, currency)} 
                 className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all"
                 aria-label="Export PDF"
               >
                 <FileText size={14}/> Export PDF
               </button>
               <PrivacyToggle />
               <ShareButton />
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2.5 text-slate-600 bg-slate-100 rounded-xl lg:hidden active:scale-95 transition-transform"
              aria-label="Open Menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-2xl z-[190] p-5 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
            <div>
              <h2 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 px-2">Navigation</h2>
              <div className="space-y-2">
                <button onClick={() => toggleTab('inputs')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${activeTab === 'inputs' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 bg-slate-50'}`}>
                  <Settings2 size={20}/> Edit Inputs
                </button>
                <button onClick={() => toggleTab('analysis')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${activeTab === 'analysis' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 bg-slate-50'}`}>
                  <LayoutDashboard size={20}/> Analysis
                </button>
              </div>
            </div>

            <div className="h-px bg-slate-100" />
            
            <div>
              <h2 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 px-2">Actions</h2>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => generatePDF(inputs, results, currency)} 
                  className="flex items-center justify-center gap-3 p-4 bg-slate-900 text-white rounded-2xl font-bold text-sm active:scale-[0.98] transition-transform"
                >
                  <FileText size={18}/> Export PDF
                </button>
                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-50 rounded-2xl p-1"><PrivacyToggle /></div>
                  <div className="flex-1 bg-slate-50 rounded-2xl p-1"><ShareButton /></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto p-4 lg:p-8 w-full flex-1">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
          
          <aside className={`w-full lg:col-span-4 space-y-6 ${activeTab === 'inputs' ? 'block' : 'hidden lg:block'}`}>
            <InputSidebar inputs={inputs} updateInput={updateInput} currency={currency} />
          </aside>

          <section className={`w-full lg:col-span-8 space-y-8 ${activeTab !== 'inputs' ? 'block' : 'hidden lg:block'}`}>
            <StatCards monthlyPayment={results.monthlyPayment} totalInterest={results.totalInterest} payoffDate={results.payoffDate} currency={currency} />
            
            <div className={`${activeTab === 'analysis' ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <InterestPrincipalChart data={results.schedule} currency={currency} />
              </div>
            </div>

            <div className={`${activeTab === 'schedule' ? 'block' : 'hidden lg:block'}`}>
              <AmortizationTable schedule={results.schedule} currency={currency} />
            </div>
          </section>
        </div>
      </main>

      {/* MOBILE STICKY FOOTER */}
      <div 
        data-testid="mobile-sticky-footer" 
        className="lg:hidden fixed bottom-6 left-4 right-4 bg-slate-900/95 backdrop-blur-xl text-white px-6 py-5 rounded-[2rem] shadow-2xl z-[150] flex justify-between items-center border border-white/10"
      >
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Monthly EMI</span>
          <span className="text-2xl font-black text-indigo-400 privacy-sensitive">
            {formatCurrency(results.monthlyPayment, currency)}
          </span>
        </div>
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="bg-white/10 p-3 rounded-xl active:scale-90 transition-transform"
          aria-label="Toggle Settings"
        >
          <Settings2 size={20} />
        </button>
      </div>
    </div>
  );
}