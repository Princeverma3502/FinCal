"use client";

import { useMortgage } from "@/hooks/useMortgage";
import { StatCards } from "@/components/dashboard/StatCards";
import { InputSidebar } from "@/components/dashboard/InputSidebar";
import { PaymentChart } from "@/components/dashboard/PaymentChart";
import { AmortizationTable } from "@/components/dashboard/AmortizationTable";
import { BreakdownChart } from "@/components/dashboard/BreakdownChart";
import { formatCurrency } from "@/utils/finance";
import { ShieldCheck, Info } from "lucide-react";

export default function MortgageDashboard() {
  const { inputs, results, updateInput } = useMortgage();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-100">F</div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">FinCal<span className="text-indigo-600">.</span></h1>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
            <ShieldCheck size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Bank-Grade Precision</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <h2 className="font-black text-slate-800 text-lg mb-8 flex items-center gap-2">
                Loan Inputs <Info size={16} className="text-slate-300" />
              </h2>
              <InputSidebar inputs={inputs} updateInput={updateInput} />
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <h2 className="font-black text-slate-800 text-lg mb-4">Payment Split</h2>
              <BreakdownChart 
                principal={results.monthlyPayment - (inputs.propertyTax/12) - (inputs.insurance/12)} 
                interest={0} // Logic handled inside BreakdownChart
                tax={inputs.propertyTax}
                insurance={inputs.insurance}
              />
            </div>
          </aside>

          <section className="lg:col-span-8 space-y-8">
            <StatCards 
              monthlyPayment={results.monthlyPayment}
              totalInterest={results.totalInterest}
              payoffDate={results.payoffDate} 
            />
            
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-10">
                <h2 className="font-black text-slate-800 text-xl">Balance Projection</h2>
                <span className="text-xs font-bold text-slate-400">0% Interest vs Actual</span>
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