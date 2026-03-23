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

// Dynamic imports for heavy chart components to improve performance
const PaymentChart = dynamic(() => import('@/components/dashboard/PaymentChart').then(mod => mod.PaymentChart), { ssr: false });
const InterestPrincipalChart = dynamic(() => import('@/components/dashboard/InterestPrincipalChart').then(mod => mod.InterestPrincipalChart), { ssr: false });
const BreakdownChart = dynamic(() => import('@/components/dashboard/BreakdownChart').then(mod => mod.BreakdownChart), { ssr: false });

export default function MortgageDashboard() {
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const { inputs, results, updateInput } = useMortgage(currency);
  const [baseline, setBaseline] = useState<BaselineData | null>(null);
  const [activeTab, setActiveTab] = useState<'inputs' | 'analysis' | 'schedule'>('inputs');

  // Sync URL parameters with state for shareable links
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
    <div className="min-h-screen bg-[#F8FAFC] antialiased pb-24 lg:pb-0">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-4 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* BRANDING LOGO */}
          <div className="flex items-center gap-3 group cursor-pointer transition-transform active:scale-95">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-100 group-hover:rotate-3 transition-transform">
              F
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-900 tracking-tighter leading-none">FinCal</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Mortgage Pro</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative flex items-center bg-slate-100 rounded-xl px-2 border border-slate-200">
              <Globe size={14} className="text-slate-400 ml-2" />
              <select 
                value={currency} 
                aria-label="Select Currency"
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-transparent border-none text-[10px] font-black p-2 outline-none cursor-pointer text-slate-700"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
            <button 
              onClick={() => setBaseline({ inputs, results })} 
              className="hidden sm:flex items-center gap-2 text-xs font-bold bg-white border border-slate-200 px-4 py-2.5 rounded-xl hover:bg-indigo-50 transition-all active:scale-95"
            >
              <Copy size={14} /> {baseline ? "Update Baseline" : "Set Baseline"}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        {/* MOBILE NAVIGATION */}
        <div className="lg:hidden flex bg-white p-1 rounded-2xl border border-slate-200 mb-6 sticky top-20 z-[90] shadow-sm">
          <button onClick={() => setActiveTab('inputs')} className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl transition-all ${activeTab === 'inputs' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500'}`}><Settings2 size={14}/> Inputs</button>
          <button onClick={() => setActiveTab('analysis')} className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl transition-all ${activeTab === 'analysis' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500'}`}><LayoutDashboard size={14}/> Analysis</button>
          <button onClick={() => setActiveTab('schedule')} className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold rounded-xl transition-all ${activeTab === 'schedule' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500'}`}><TableIcon size={14}/> Table</button>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
          {/* SIDEBAR SECTION */}
          <aside className={`w-full lg:col-span-4 space-y-6 lg:sticky lg:top-28 ${activeTab === 'inputs' ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <InputSidebar inputs={inputs} updateInput={updateInput} currency={currency} />
            </div>

            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-6 text-slate-800">
                <PieIcon size={18} className="text-indigo-600" />
                <h2 className="font-bold">Monthly Payment Breakdown</h2>
              </div>
              <BreakdownChart 
                principal={results.monthlyPayment - (results.totalInterest / (inputs.years * 12))} // Approximate principal
                interest={results.totalInterest / (inputs.years * 12)} 
                tax={2500 * 12} // Example static values or from inputs
                insurance={1200 * 12} 
                currency={currency} 
              />
            </div>

            <GoalTracker principal={inputs.principal} interestRate={inputs.interestRate} currency={currency} />
            
            <div className="bg-emerald-600 p-6 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group">
              <ShieldCheck className="absolute -right-4 -bottom-4 text-white/10 w-24 h-24 group-hover:scale-110 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4"><ShieldCheck size={20}/><h2 className="font-bold">Tax Benefit</h2></div>
                <p className="text-3xl font-black tracking-tight">{formatCurrency(results.totalTaxSavings, currency)}</p>
                <p className="text-[10px] uppercase font-bold text-emerald-100 mt-1 opacity-80">Estimated Savings</p>
              </div>
            </div>

            <RentVsBuy monthlyMortgage={results.monthlyPayment} downPayment={inputs.principal * 0.2} homeValue={inputs.principal * 1.25} currency={currency} />
          </aside>

          {/* MAIN CONTENT SECTION */}
          <section className={`w-full lg:col-span-8 space-y-8 ${activeTab !== 'inputs' ? 'block' : 'hidden lg:block'}`}>
            <StatCards monthlyPayment={results.monthlyPayment} totalInterest={results.totalInterest} payoffDate={results.payoffDate} currency={currency} />

            <div className={`space-y-8 ${activeTab === 'analysis' ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h2 className="font-bold text-slate-800 text-xl mb-6">Equity Growth</h2>
                <div className="h-[400px]"><InterestPrincipalChart data={results.schedule} currency={currency} /></div>
              </div>
              
              <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h2 className="font-bold text-slate-800 text-xl mb-6">Balance Projection</h2>
                <div className="h-[350px]"><PaymentChart data={results.schedule} baselineData={baseline?.results?.schedule} currency={currency} /></div>
              </div>
            </div>

            <div className={activeTab === 'schedule' ? 'block' : 'hidden lg:block'}>
              <AmortizationTable schedule={results.schedule} currency={currency} />
            </div>
          </section>
        </div>
      </main>

      {/* MOBILE STICKY FOOTER */}
      <div className="lg:hidden fixed bottom-6 left-4 right-4 bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-3xl shadow-2xl z-[110] flex justify-between items-center border border-white/10">
        <div className="pl-2">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Monthly EMI</p>
          <p className="text-xl font-black text-indigo-400">{formatCurrency(results.monthlyPayment, currency)}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => generatePDF(inputs, results, currency)} className="p-3 bg-white/10 rounded-2xl active:scale-95 transition-all"><FileText size={20}/></button>
          <button onClick={() => exportToCSV(results.schedule, 'Loan_Schedule')} className="bg-indigo-600 px-5 py-3 rounded-2xl font-bold text-sm active:scale-95 transition-all">Export</button>
        </div>
      </div>
    </div>
  );
}