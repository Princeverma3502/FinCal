"use client";

import { useMortgage } from "@/hooks/useMortgage";
import { StatCards } from "@/components/dashboard/StatCards";
import { InputSidebar } from "@/components/dashboard/InputSidebar";
import { PaymentChart } from "@/components/dashboard/PaymentChart";
import { AmortizationTable } from "@/components/dashboard/AmortizationTable";
import { formatCurrency } from "@/utils/finance";
import { Info } from "lucide-react";

export default function MortgageDashboard() {
  const { inputs, results, updateInput } = useMortgage();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Industry Style Header */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-200">F</div>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-none">FinCal Pro</h1>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Mortgage Suite</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Total Payoff Cost</p>
              <p className="text-sm font-bold text-slate-900">{formatCurrency(results.totalCost)}</p>
            </div>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all">
              Export PDF
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Area */}
          <aside className="lg:col-span-4">
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-200 sticky top-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-bold text-slate-800 text-xl">Parameters</h2>
                <Info size={18} className="text-slate-300 cursor-help" />
              </div>
              <InputSidebar inputs={inputs} updateInput={updateInput} />
              
              {results.monthsSaved > 0 && (
                <div className="mt-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                  <p className="text-emerald-700 text-sm font-semibold">
                    🎉 Extra payments are saving you {Math.floor(results.monthsSaved / 12)} years and {results.monthsSaved % 12} months!
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* Main Visualization Area */}
          <section className="lg:col-span-8 space-y-8">
            <StatCards 
              monthlyPayment={results.monthlyPayment}
              totalInterest={results.totalInterest}
              payoffDate={results.payoffDate} 
            />
            
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h2 className="font-bold text-slate-800 text-xl">Equity Projection</h2>
                  <p className="text-sm text-slate-400">Visualization of principal vs time</p>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                  <span className="px-3 py-1 bg-white shadow-sm rounded-lg text-xs font-bold text-indigo-600">Balance</span>
                  <span className="px-3 py-1 text-xs font-bold text-slate-400 cursor-not-allowed">Comparison</span>
                </div>
              </div>
              <div className="h-[400px]">
                <PaymentChart data={results.schedule} />
              </div>
            </div>

            <AmortizationTable schedule={results.schedule} />
          </section>
        </div>
      </main>
    </div>
  );
}