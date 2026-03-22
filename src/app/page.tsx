"use client";

import { useMortgage } from "@/hooks/use-mortgage";
import { StatCards } from "@/components/dashboard/StatCards";
// Note: We will create InputSidebar and PaymentChart next
import { InputSidebar } from "@/components/dashboard/InputSidebar";
// import { PaymentChart } from "@/components/dashboard/PaymentChart";

export default function MortgageDashboard() {
  const { inputs, results, updateInput } = useMortgage();

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">FinCal.</h1>
          <p className="text-slate-500">Professional Mortgage & Loan Analysis</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Controls (4 columns) */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-white p-6 rounded-fintech shadow-sm border border-slate-100">
                <h2 className="font-semibold mb-6 text-slate-800 uppercase text-xs tracking-wider">Loan Parameters</h2>
                <div className="lg:col-span-4">
                  <div className="bg-white p-6 rounded-fintech shadow-sm border border-slate-100 sticky top-8">
                    <h2 className="font-semibold mb-6 text-slate-800 uppercase text-xs tracking-wider">Loan Parameters</h2>
                    <InputSidebar inputs={inputs} updateInput={updateInput} />
                  </div>
                </div>
                <p className="text-sm text-slate-400">Sidebar component loading...</p>
             </div>
          </div>

          {/* Main Content - Results (8 columns) */}
          <div className="lg:col-span-8">
            <StatCards 
              monthlyPayment={results.monthlyPayment}
              totalInterest={results.totalInterest}
              payoffDate="Mar 2056" // Hardcoded for now, will automate later
            />
            
            <div className="bg-white p-6 rounded-fintech shadow-sm border border-slate-100 h-[400px]">
              <h2 className="font-semibold mb-6 text-slate-800 uppercase text-xs tracking-wider">Balance Over Time</h2>
              {/* Chart component will go here */}
              <div className="h-full flex items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
                <p className="text-slate-400">Chart Visualization Area</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}