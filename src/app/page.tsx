"use client";

import React, { useState, useMemo } from 'react';
import { useMortgage } from "@/hooks/useMortgage";
import { StatCards } from "@/components/dashboard/StatCards";
import { InputSidebar } from "@/components/dashboard/InputSidebar";
import { AmortizationTable } from "@/components/dashboard/AmortizationTable";
import { generatePDF } from "@/utils/pdfGenerator";
import { FileText, Settings2, LayoutDashboard, Table as TableIcon, Menu, X, TrendingUp, Activity } from "lucide-react";
import { CurrencyCode, calculateMortgage } from "@/utils/finance";
import dynamic from 'next/dynamic';

// UI Components
import PrivacyToggle from '@/components/dashboard/PrivacyToggle';
import ShareButton from '@/components/dashboard/ShareButton';
import { RentVsBuy } from "@/components/dashboard/RentVsBuy";
import { GoalTracker } from '@/components/dashboard/GoalTracker';
import { AffordabilityMeter } from '@/components/dashboard/AffordabilityMeter';
import { TaxBenefit } from '@/components/dashboard/TaxBenefit';
import { InstallPopup } from '@/components/ui/InstallPopup';
import ComparisonView from '@/components/dashboard/ComparisonView';

// Charts
const InterestPrincipalChart = dynamic(() => import('@/components/dashboard/InterestPrincipalChart').then(mod => mod.InterestPrincipalChart), { ssr: false });
const BreakdownChart = dynamic(() => import('@/components/dashboard/BreakdownChart').then(mod => mod.BreakdownChart), { ssr: false });
const PaymentChart = dynamic(() => import('@/components/dashboard/PaymentChart').then(mod => mod.PaymentChart), { ssr: false });

export default function MortgageDashboard() {
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const { inputs, results, updateInput } = useMortgage(currency);
  const [activeTab, setActiveTab] = useState<'inputs' | 'analysis' | 'schedule'>('inputs');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Compute baseline results (no extra payments) for scenario comparison
  const baselineResults = useMemo(() => {
    return calculateMortgage({ ...inputs, extraPayment: 0, lumpSumAmount: 0 }, currency);
  }, [inputs, currency]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] w-full overflow-x-hidden flex flex-col relative">
      
      {/* NAVBAR */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-[200] w-full">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/icon.png" alt="FinCal" className="w-7 h-7 rounded-lg" />
            <span className="text-xl font-black text-slate-900 tracking-tighter">FinCal</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-4">
               <PrivacyToggle />
               <ShareButton />
               <button onClick={() => generatePDF(inputs, results, currency)} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">Export PDF</button>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2.5 text-slate-600 bg-slate-100 rounded-xl lg:hidden active:scale-95 transition-transform">
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE HAMBURGER MENU */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-2xl z-[190] p-6 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 rounded-2xl p-1 border border-slate-100"><PrivacyToggle /></div>
                <div className="bg-slate-50 rounded-2xl p-1 border border-slate-100"><ShareButton /></div>
              </div>
              <button 
                onClick={() => { generatePDF(inputs, results, currency); setIsMenuOpen(false); }} 
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm flex justify-center gap-2 items-center"
              >
                <FileText size={18}/> Export PDF Report
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* TOP TAB NAVIGATION - UI POSITIONED TOP BELOW NAVBAR */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-[100] lg:hidden">
        <div className="flex p-2 gap-1 overflow-x-auto scrollbar-hide">
          {[
            { id: 'inputs', label: 'Inputs', icon: Settings2 },
            { id: 'analysis', label: 'Analysis', icon: LayoutDashboard },
            { id: 'schedule', label: 'Table', icon: TableIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[11px] font-black uppercase tracking-tight transition-all ${
                activeTab === tab.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400'
              }`}
            >
              <tab.icon size={14} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-4 lg:p-8 w-full flex-1">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
          
          {/* TAB 1: INPUTS SECTION */}
          <aside className={`w-full lg:col-span-4 space-y-6 ${activeTab === 'inputs' ? 'block' : 'hidden lg:block'}`}>
            <InputSidebar inputs={inputs} updateInput={updateInput} currency={currency} />
            
            {/* Payment Breakdown */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
               <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Payment Breakdown</h3>
               <BreakdownChart 
                principal={results.schedule[0]?.principalPayment || 0} 
                interest={results.schedule[0]?.interestPayment || 0} 
                tax={inputs.propertyTax || 0}
                insurance={inputs.insurance || 0}
                currency={currency} 
               />
            </div>

            {/* Freedom Goal - Corrected Props */}
            <GoalTracker 
              principal={inputs.principal} 
              interestRate={inputs.interestRate} 
              currency={currency} 
            />

            {/* Tax Benefits */}
            <TaxBenefit 
              totalInterest={results.totalInterest} 
              taxBracket={inputs.taxBracket} 
              totalTaxSavings={results.totalTaxSavings} 
              currency={currency} 
            />

            {/* Affordability - Corrected Props */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
               <AffordabilityMeter dti={inputs.principal > 0 ? (results.monthlyPayment / (inputs.principal / 240)) * 100 : 0} />
            </div>

            {/* Rent vs Buy */}
            <RentVsBuy monthlyMortgage={results.monthlyPayment} downPayment={0} homeValue={inputs.principal} currency={currency} />
          </aside>

          {/* TAB 2 & 3: ANALYSIS & TABLE */}
          <section className={`w-full lg:col-span-8 space-y-8 ${activeTab !== 'inputs' ? 'block' : 'hidden lg:block'}`}>
            
            {/* ANALYSIS CONTENT */}
            <div className={`space-y-8 ${activeTab === 'analysis' ? 'block' : 'hidden lg:block'}`}>
               <StatCards monthlyPayment={results.monthlyPayment} totalInterest={results.totalInterest} payoffDate={results.payoffDate} currency={currency} />
               
               <div className="grid grid-cols-1 gap-8">
                  <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 text-slate-800">
                      <TrendingUp size={20} className="text-emerald-500" />
                      <h3 className="font-bold text-lg">Equity Growth</h3>
                    </div>
                    <InterestPrincipalChart data={results.schedule} currency={currency} />
                  </div>

                  {/* Balance Projection - Curve View */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-2 text-slate-800 relative z-10">
                      <Activity size={20} className="text-indigo-500" />
                      <h3 className="font-bold text-lg">Balance Projection Curve</h3>
                    </div>
                    <p className="text-xs text-slate-400 mb-8 relative z-10 font-medium italic">Visualization of debt reduction over time.</p>
                    <PaymentChart 
                      data={results.schedule} 
                      baselineData={baselineResults.schedule}
                      currency={currency} 
                    />
                  </div>
               </div>

               {/* Scenario Comparison */}
               <ComparisonView current={results} saved={baselineResults} />
            </div>

            {/* TABLE CONTENT */}
            <div className={`${activeTab === 'schedule' ? 'block' : 'hidden lg:block'}`}>
               <AmortizationTable schedule={results.schedule} currency={currency} />
            </div>
          </section>
        </div>
      </main>

      {/* PWA Install Popup */}
      <InstallPopup />
    </div>
  );
}