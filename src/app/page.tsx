"use client";

import React, { useState, useEffect } from 'react';
import { useMortgage } from "@/hooks/useMortgage";
import { StatCards } from "@/components/dashboard/StatCards";
import { InputSidebar } from "@/components/dashboard/InputSidebar";
import { AmortizationTable } from "@/components/dashboard/AmortizationTable";
import { RentVsBuy } from "@/components/dashboard/RentVsBuy";
import { GoalTracker } from "@/components/dashboard/GoalTracker";
import { exportToCSV } from "@/utils/export";
import { generatePDF } from "@/utils/pdfGenerator";
import { Copy, ShieldCheck, FileText, Settings2, LayoutDashboard, Table as TableIcon, Globe, PieChart as PieIcon, Menu, X } from "lucide-react";
import { formatCurrency, CurrencyCode } from "@/utils/finance";
import { BaselineData } from "@/types";
import dynamic from 'next/dynamic';

import PrivacyToggle from '@/components/dashboard/PrivacyToggle';
import ComparisonView from '@/components/dashboard/ComparisonView';
import InstallBanner from '@/components/dashboard/InstallBanner';
import ShareButton from '@/components/dashboard/ShareButton';

const PaymentChart = dynamic(() => import('@/components/dashboard/PaymentChart').then(mod => mod.PaymentChart), { ssr: false });
const InterestPrincipalChart = dynamic(() => import('@/components/dashboard/InterestPrincipalChart').then(mod => mod.InterestPrincipalChart), { ssr: false });
const BreakdownChart = dynamic(() => import('@/components/dashboard/BreakdownChart').then(mod => mod.BreakdownChart), { ssr: false });

export default function MortgageDashboard() {
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const { inputs, results, updateInput } = useMortgage(currency);
  const [baseline, setBaseline] = useState<BaselineData | null>(null);
  const [activeTab, setActiveTab] = useState<'inputs' | 'analysis' | 'schedule'>('inputs');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For the 3-line menu

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams();
      Object.entries(inputs).forEach(([key, value]) => {
        if (typeof value === 'number' && !isNaN(value)) params.set(key, value.toString());
      });
      params.set('curr', currency);
      window.history.replaceState({}, '', `?${params.toString()}`);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputs, currency]);

  return (
    // Added overflow-x-hidden and max-width 100vw to the root container
    <div className="min-h-screen bg-[#F8FAFC] antialiased pb-32 lg:pb-8 max-w-[100vw] overflow-x-hidden">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-4 sticky top-0 z-[100] w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer transition-transform active:scale-95">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg border-2 border-white">
              F
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-900 tracking-tighter leading-none">FinCal</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Mortgage Pro</span>
            </div>
          </div>
          
          {/* 3-LINE MENU TOGGLE (Mobile) */}
          <button 
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* DESKTOP NAV / MOBILE MENU DROPDOWN */}
          <div className={`${
            isMenuOpen ? 'flex animate-in slide-in-from-top-2' : 'hidden'
          } lg:flex flex-col lg:flex-row items-center gap-2 md:gap-4 absolute lg:relative top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent p-4 lg:p-0 border-b lg:border-none border-slate-200 shadow-xl lg:shadow-none`}>
            <PrivacyToggle />
            <div className="relative flex items-center bg-slate-100 rounded-xl px-2 border border-slate-200 w-full lg:w-auto">
              <Globe size={14} className="text-slate-400 ml-1 md:ml-2" />
              <select 
                aria-label="Select Currency"
                value={currency} 
                onChange={(e) => {
                  setCurrency(e.target.value as CurrencyCode);
                  setIsMenuOpen(false);
                }}
                className="bg-transparent border-none text-[10px] font-black p-2 outline-none cursor-pointer text-slate-700 flex-1"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
            <button 
              onClick={() => {
                setBaseline({ inputs, results });
                setIsMenuOpen(false);
              }} 
              className="w-full lg:w-auto flex items-center justify-center gap-2 text-xs font-bold bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-indigo-50 transition-all active:scale-95"
            >
              <Copy size={14} /> {baseline ? "Update Baseline" : "Set Baseline"}
            </button>
            <ShareButton />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8 overflow-x-hidden">
        {/* MOBILE TABS - Fixed with w-full and overflow-hidden */}
        <div className="lg:hidden flex bg-white p-1 rounded-2xl border border-slate-200 mb-6 sticky top-20 z-[90] shadow-sm w-full overflow-hidden">
          <button onClick={() => setActiveTab('inputs')} className={`flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-bold rounded-xl transition-all ${activeTab === 'inputs' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500'}`}><Settings2 size={12}/> Inputs</button>
          <button onClick={() => setActiveTab('analysis')} className={`flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-bold rounded-xl transition-all ${activeTab === 'analysis' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500'}`}><LayoutDashboard size={12}/> Analysis</button>
          <button onClick={() => setActiveTab('schedule')} className={`flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-bold rounded-xl transition-all ${activeTab === 'schedule' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500'}`}><TableIcon size={12}/> Table</button>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
          <aside className={`w-full lg:col-span-4 space-y-6 lg:sticky lg:top-28 ${activeTab === 'inputs' ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <InputSidebar inputs={inputs} updateInput={updateInput} currency={currency} />
            </div>
            {/* Breakdown Chart and other aside items remain same */}
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-6 text-slate-800">
                <PieIcon size={18} className="text-indigo-600" />
                <h2 className="font-bold">Monthly Payment Breakdown</h2>
              </div>
              <BreakdownChart 
                principal={results.monthlyPayment - (results.totalInterest / (inputs.years * 12))}
                interest={results.totalInterest / (inputs.years * 12)} 
                tax={2500} 
                insurance={1200} 
                currency={currency} 
              />
            </div>
            <GoalTracker principal={inputs.principal} interestRate={inputs.interestRate} currency={currency} />
          </aside>

          <section className={`w-full lg:col-span-8 space-y-8 ${activeTab !== 'inputs' ? 'block' : 'hidden lg:block'}`}>
            <StatCards monthlyPayment={results.monthlyPayment} totalInterest={results.totalInterest} payoffDate={results.payoffDate} currency={currency} />
            <div className={activeTab === 'analysis' ? 'block' : 'hidden lg:block'}>
               {/* Charts... */}
               <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm mb-8">
                 <h2 className="font-bold text-slate-800 text-xl mb-6">Balance Projection</h2>
                 <div className="h-[350px] overflow-hidden"><PaymentChart data={results.schedule} baselineData={baseline?.results?.schedule} currency={currency} /></div>
               </div>
            </div>
            <div className={activeTab === 'schedule' ? 'block' : 'hidden lg:block'}>
              <AmortizationTable schedule={results.schedule} currency={currency} />
            </div>
          </section>
        </div>
      </main>

      {/* MOBILE STICKY FOOTER - Fixed for Width */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-3xl shadow-2xl z-[110] flex justify-between items-center border border-white/10">
        <div className="pl-2">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Monthly EMI</p>
          <p className="text-xl font-black text-indigo-400 privacy-sensitive">{formatCurrency(results.monthlyPayment, currency)}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => generatePDF(inputs, results, currency)} className="p-3 bg-white/10 rounded-2xl active:scale-95 transition-all"><FileText size={20}/></button>
          <button onClick={() => exportToCSV(results.schedule, 'Loan_Schedule')} className="bg-indigo-600 px-5 py-3 rounded-2xl font-bold text-sm active:scale-95 transition-all">Export</button>
        </div>
      </div>
    </div>
  );
}