"use client";

import React, { useState, useEffect } from 'react';
import { useMortgage } from "@/hooks/useMortgage";
import { StatCards } from "@/components/dashboard/StatCards";
import { InputSidebar } from "@/components/dashboard/InputSidebar";
import { AmortizationTable } from "@/components/dashboard/AmortizationTable";
import { exportToCSV } from "@/utils/export";
import { generatePDF } from "@/utils/pdfGenerator";
import { FileText, Settings2, LayoutDashboard, Table as TableIcon, Globe, Menu, X, Download, Share2 } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] w-full overflow-x-hidden">
      {/* PROFESSIONAL NAVBAR */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-[200] w-full">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black">F</div>
            <span className="text-xl font-black text-slate-900 tracking-tighter">FinCal</span>
          </div>

          {/* Desktop Only Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <PrivacyToggle />
            <div className="flex items-center bg-slate-100 rounded-xl px-2 h-9 border border-slate-200">
              <Globe size={14} className="text-slate-400 mr-2" />
              <select value={currency} onChange={(e) => setCurrency(e.target.value as CurrencyCode)} className="bg-transparent text-xs font-bold outline-none">
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <button onClick={() => generatePDF(inputs, results, currency)} className="p-2 bg-slate-900 text-white rounded-lg"><Download size={18}/></button>
          </div>

          {/* Mobile Hamburger Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-slate-600 bg-slate-100 rounded-xl">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE DRAWER (The List View) */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-2xl z-[190] p-4 space-y-2 animate-in slide-in-from-top duration-200">
            <button onClick={() => {setActiveTab('inputs'); setIsMenuOpen(false);}} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold ${activeTab === 'inputs' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600'}`}><Settings2 size={20}/> Edit Inputs</button>
            <button onClick={() => {setActiveTab('analysis'); setIsMenuOpen(false);}} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold ${activeTab === 'analysis' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600'}`}><LayoutDashboard size={20}/> View Analysis</button>
            <button onClick={() => {setActiveTab('schedule'); setIsMenuOpen(false);}} className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold ${activeTab === 'schedule' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600'}`}><TableIcon size={20}/> Payment Schedule</button>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button onClick={() => generatePDF(inputs, results, currency)} className="flex items-center justify-center gap-2 p-4 bg-slate-900 text-white rounded-2xl font-bold text-xs"><FileText size={16}/> PDF</button>
              <button onClick={() => exportToCSV(results.schedule, 'FinCal')} className="flex items-center justify-center gap-2 p-4 bg-indigo-600 text-white rounded-2xl font-bold text-xs"><Download size={16}/> CSV</button>
            </div>
            <div className="flex justify-between items-center p-2 pt-4">
              <PrivacyToggle />
              <ShareButton />
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
          <aside className={`lg:col-span-4 space-y-6 ${activeTab === 'inputs' ? 'block' : 'hidden lg:block'}`}>
            <InputSidebar inputs={inputs} updateInput={updateInput} currency={currency} />
          </aside>

          <section className={`lg:col-span-8 space-y-8 ${activeTab !== 'inputs' ? 'block' : 'hidden lg:block'}`}>
            <StatCards monthlyPayment={results.monthlyPayment} totalInterest={results.totalInterest} payoffDate={results.payoffDate} currency={currency} />
            
            {activeTab === 'analysis' && (
              <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
                <h2 className="font-bold text-slate-800 text-xl mb-6">Equity Growth</h2>
                <div className="h-[300px]"><InterestPrincipalChart data={results.schedule} currency={currency} /></div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <AmortizationTable schedule={results.schedule} currency={currency} />
            )}
          </section>
        </div>
      </main>

      {/* STICKY FOOTER SUMMARY */}
      <div className="lg:hidden fixed bottom-6 left-4 right-4 bg-slate-900/95 backdrop-blur-md text-white px-6 py-4 rounded-3xl shadow-2xl z-[150] flex justify-between items-center">
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Monthly EMI</p>
          <p className="text-xl font-black text-indigo-400 privacy-sensitive">{formatCurrency(results.monthlyPayment, currency)}</p>
        </div>
        <button onClick={() => setIsMenuOpen(true)} className="bg-white/10 p-3 rounded-2xl"><Menu size={20}/></button>
      </div>
    </div>
  );
}