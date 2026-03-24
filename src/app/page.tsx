"use client";

import React, { useState } from 'react';
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

  const toggleTab = (tab: 'inputs' | 'analysis' | 'schedule') => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] w-full overflow-x-hidden flex flex-col">
      {/* NAVBAR */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-[200] w-full">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/icon.png" alt="FinCal Logo" className="w-7 h-7 rounded-lg" />
            <span className="text-xl font-black text-slate-900 tracking-tighter">FinCal</span>
          </div>

          <div className="flex items-center gap-3">
            {/* LAPTOP EXPORT BUTTONS */}
            <div className="hidden lg:flex items-center gap-2 border-r border-slate-200 pr-4 mr-2">
               <button 
                 onClick={() => generatePDF(inputs, results, currency)} 
                 className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all"
                 aria-label="Desktop Export PDF"
               >
                 <FileText size={14}/> PDF
               </button>
               <button 
                 onClick={() => exportToCSV(results.schedule, 'FinCal')} 
                 className="flex items-center gap-2 px-3 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-500 transition-all"
                 aria-label="Desktop Export CSV"
               >
                 <Download size={14}/> CSV
               </button>
            </div>

            <div className="hidden md:flex gap-2">
               <PrivacyToggle />
               <ShareButton />
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 text-slate-600 bg-slate-100 rounded-xl lg:hidden"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU LIST */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-2xl z-[190] p-4 flex flex-col gap-2 animate-in slide-in-from-top duration-200">
            <button onClick={() => toggleTab('inputs')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold ${activeTab === 'inputs' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600'}`}>
              <Settings2 size={20}/> Edit Inputs
            </button>
            <button onClick={() => toggleTab('analysis')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold ${activeTab === 'analysis' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600'}`}>
              <LayoutDashboard size={20}/> View Analysis
            </button>
            <button onClick={() => toggleTab('schedule')} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold ${activeTab === 'schedule' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600'}`}>
              <TableIcon size={20}/> Payment Table
            </button>
            <div className="h-px bg-slate-100 my-2" />
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => generatePDF(inputs, results, currency)} className="flex items-center justify-center gap-2 p-4 bg-slate-900 text-white rounded-2xl font-bold text-xs" aria-label="Mobile Export PDF">
                <FileText size={16}/> PDF
              </button>
              <button onClick={() => exportToCSV(results.schedule, 'FinCal')} className="flex items-center justify-center gap-2 p-4 bg-indigo-600 text-white rounded-2xl font-bold text-xs" aria-label="Mobile Export CSV">
                <Download size={16}/> CSV
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto p-4 lg:p-8 w-full flex-1 overflow-x-hidden">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
          <aside className={`w-full lg:col-span-4 space-y-6 ${activeTab === 'inputs' ? 'block' : 'hidden lg:block'}`}>
            <InputSidebar inputs={inputs} updateInput={updateInput} currency={currency} />
            <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
               <h2 className="font-bold mb-4 flex items-center gap-2"><PieIcon size={18} className="text-indigo-600"/> Breakdown</h2>
               <BreakdownChart principal={results.monthlyPayment * 0.7} interest={results.monthlyPayment * 0.3} tax={0} insurance={0} currency={currency} />
            </div>
          </aside>

          <section className={`w-full lg:col-span-8 space-y-8 ${activeTab !== 'inputs' ? 'block' : 'hidden lg:block'}`}>
            <StatCards monthlyPayment={results.monthlyPayment} totalInterest={results.totalInterest} payoffDate={results.payoffDate} currency={currency} />
            <div className={`${activeTab === 'analysis' ? 'block' : 'hidden lg:block'} overflow-hidden`}>
              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h2 className="font-bold text-slate-800 text-xl mb-6">Equity Growth</h2>
                <div className="h-[300px] w-full"><InterestPrincipalChart data={results.schedule} currency={currency} /></div>
              </div>
            </div>
            <div className={`${activeTab === 'schedule' ? 'block' : 'hidden lg:block'} overflow-hidden`}>
              <AmortizationTable schedule={results.schedule} currency={currency} />
            </div>
          </section>
        </div>
      </main>

      {/* MOBILE STICKY FOOTER */}
      <div data-testid="mobile-sticky-footer" className="lg:hidden fixed bottom-6 left-4 right-4 bg-slate-900/95 backdrop-blur-md text-white px-6 py-4 rounded-3xl shadow-2xl z-[150] flex justify-between items-center border border-white/10">
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Monthly EMI</p>
          <p className="text-xl font-black text-indigo-400 privacy-sensitive">{formatCurrency(results.monthlyPayment, currency)}</p>
        </div>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 lg:hidden"
          aria-label="Open Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      </div>
    </div>
  );
}