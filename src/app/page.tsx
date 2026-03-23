"use client";

import { useMortgage } from "@/hooks/useMortgage";
import { StatCards } from "@/components/dashboard/StatCards";
import { InputSidebar } from "@/components/dashboard/InputSidebar";
import { PaymentChart } from "@/components/dashboard/PaymentChart";
import { AmortizationTable } from "@/components/dashboard/AmortizationTable";
import { BreakdownChart } from "@/components/dashboard/BreakdownChart";
import { AffordabilityMeter } from "@/components/dashboard/AffordabilityMeter";
import { calculateAffordability } from "@/utils/analysis";

export default function MortgageDashboard() {
  const { inputs, results, updateInput } = useMortgage();

  // Temporary calculation for the meter using assumed income of $120k
  const affordability = calculateAffordability(120000, 500, inputs.principal * 0.2, inputs.interestRate);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      <nav className="bg-white border-b border-slate-200 px-8 py-4 mb-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black">F</div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">FinCal<span className="text-indigo-600">.</span></span>
          </div>
          <button className="text-xs font-bold bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:shadow-lg transition-all">
            Download Report
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls & Meters */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <h2 className="font-bold mb-8 text-slate-800 text-lg uppercase tracking-tight">Loan Controls</h2>
              <InputSidebar inputs={inputs} updateInput={updateInput} />
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <h2 className="font-bold mb-6 text-slate-800 text-lg">Risk Assessment</h2>
              <AffordabilityMeter dti={affordability.dtiRatio} />
            </div>
            
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <h2 className="font-bold mb-4 text-slate-800 text-lg">Payment Split</h2>
              <BreakdownChart 
                principal={results.monthlyPayment - (inputs.propertyTax/12) - (inputs.insurance/12)} 
                interest={0} // Handled by total in component
                tax={inputs.propertyTax}
                insurance={inputs.insurance}
              />
            </div>
          </aside>

          {/* Charts & Tables */}
          <section className="lg:col-span-8 space-y-8">
            <StatCards 
              monthlyPayment={results.monthlyPayment}
              totalInterest={results.totalInterest}
              payoffDate={results.payoffDate} 
            />
            
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200">
              <h2 className="font-bold text-slate-800 text-xl mb-8">Loan Maturity Projection</h2>
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