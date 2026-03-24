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
import { Copy, ShieldCheck, FileText, Settings2, LayoutDashboard, Table as TableIcon, Globe, PieChart as PieIcon } from "lucide-react";
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
    <div className="min-h-screen bg-[#F8FAFC] antialiased pb-32 lg:pb-8 w-full max-w-[100vw] overflow-x-hidden">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-4 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-lg">F</div>
            <span className="text-lg font-black text-slate-900 tracking-tighter">FinCal</span>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <PrivacyToggle />
            <div className="flex items-center bg-slate-100 rounded-xl px-2 border border-slate-200 h-9">
              <Globe size={12} className="text-slate-400 mr-1" />
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-transparent border-none text-[10px] font-black outline-none text-slate-700"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <ShareButton />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {/* TAB BUTTONS - Forced to fit inside 100vw */}
        <div className="lg:hidden flex bg-white p-1 rounded-2xl border border-slate-200 mb-6 sticky top-20 z-[90] shadow-sm w-full">
          <button onClick={() => setActiveTab('inputs')} className={`flex-1 flex items-center justify-center gap-1 py-3 text-[10px] font-bold rounded-xl transition-all ${activeTab === 'inputs' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500'}`}><Settings2 size={12}/> Inputs</button>
          <button onClick={() => setActiveTab('analysis')} className={`flex-1 flex items-center justify-center gap-1 py-3 text-[10px] font-bold rounded-xl transition-all ${activeTab === 'analysis' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500'}`}><LayoutDashboard size={12}/> Analysis</button>
          <button onClick={() => setActiveTab('schedule')} className={`flex-1 flex items-center justify-center gap-1 py-3 text-[10px] font-bold rounded-xl transition-all ${activeTab === 'schedule' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500'}`}><TableIcon size={12}/> Table</button>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
          <aside className={`w-full lg:col-span-4 space-y-6 lg:sticky lg:top-28 ${activeTab === 'inputs' ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200">
              <InputSidebar inputs={inputs} updateInput={updateInput} currency={currency} />
            </div>
            <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-6 text-slate-800"><PieIcon size={18} className="text-indigo-600" /><h2 className="font-bold">Breakdown</h2></div>
              <BreakdownChart principal={results.monthlyPayment - (results.totalInterest / (inputs.years * 12))} interest={results.totalInterest / (inputs.years * 12)} tax={2500} insurance={1200} currency={currency} />
            </div>
          </aside>

          <section className={`w-full lg:col-span-8 space-y-8 ${activeTab !== 'inputs' ? 'block' : 'hidden lg:block'}`}>
            <StatCards monthlyPayment={results.monthlyPayment} totalInterest={results.totalInterest} payoffDate={results.payoffDate} currency={currency} />
            <div className={activeTab === 'analysis' ? 'block' : 'hidden lg:block'}>
              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm mb-8">
                <h2 className="font-bold text-slate-800 text-xl mb-6">Equity Growth</h2>
                <div className="h-[300px]"><InterestPrincipalChart data={results.schedule} currency={currency} /></div>
              </div>
            </div>
            <div className={activeTab === 'schedule' ? 'block' : 'hidden lg:block'}>
              <AmortizationTable schedule={results.schedule} currency={currency} />
            </div>
          </section>
        </div>
      </main>

      {/* STICKY FOOTER - Responsive Export Button */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-2xl z-[110] flex justify-between items-center border border-white/10">
        <div className="flex flex-col">
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Monthly EMI</p>
          <p className="text-lg font-black text-indigo-400 privacy-sensitive">{formatCurrency(results.monthlyPayment, currency)}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => generatePDF(inputs, results, currency)} className="p-3 bg-white/10 rounded-xl"><FileText size={18}/></button>
          <button onClick={() => exportToCSV(results.schedule, 'Loan_Schedule')} className="bg-indigo-600 px-4 py-2.5 rounded-xl font-bold text-xs">Export</button>
        </div>
      </div>
    </div>
  );
}