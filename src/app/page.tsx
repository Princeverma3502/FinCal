"use client";

import { useMortgage } from "@/hooks/useMortgage";
import { StatCards } from "@/components/dashboard/StatCards";
import { InputSidebar } from "@/components/dashboard/InputSidebar";
import { PaymentChart } from "@/components/dashboard/PaymentChart";
import { AmortizationTable } from "@/components/dashboard/AmortizationTable";
import { formatCurrency } from "@/utils/finance";

export default function MortgageDashboard() {
  const { inputs, results, updateInput } = useMortgage();

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">F</div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">FinCal<span className="text-indigo-600">.</span></span>
          </div>
          <div className="text-sm font-medium text-slate-500">Mortgage Analysis Dashboard v1.0</div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Input Controls */}
          <aside className="lg:col-span-4">
            <div className="bg-white p-8 rounded-fintech shadow-sm border border-slate-200 sticky top-8">
              <h2 className="font-bold mb-8 text-slate-800 text-lg">Loan Details</h2>
              <InputSidebar inputs={inputs} updateInput={updateInput} />
              
              <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 leading-relaxed text-center">
                  Adjust sliders to see real-time impact on your monthly payments and interest.
                </p>
              </div>
            </div>
          </aside>

          {/* Right: Results & Visualization */}
          <section className="lg:col-span-8 space-y-8">
            <StatCards 
              monthlyPayment={results.monthlyPayment}
              totalInterest={results.totalInterest}
              payoffDate={`Year ${inputs.years}`} 
            />
            
            <div className="bg-white p-8 rounded-fintech shadow-sm border border-slate-200">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-bold text-slate-800 text-lg">Balance Projection</h2>
                <div className="flex gap-4 text-xs font-semibold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-600"></span> Principal Balance</span>
                </div>
              </div>
              <div className="h-[350px]">
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