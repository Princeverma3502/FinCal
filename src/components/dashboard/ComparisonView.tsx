'use client';
import { TrendingDown, TrendingUp, ArrowRight } from 'lucide-react';

export default function ComparisonView({ current, saved }: any) {
  const diffInterest = current.totalInterest - saved.totalInterest;
  const diffMonthly = current.monthlyPayment - saved.monthlyPayment;
  const format = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);

  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-xl animate-in zoom-in-95 duration-300">
      <div className="bg-indigo-600 px-6 py-4 text-white font-bold">Scenario Comparison</div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase">Monthly Change</span>
          <div className={`text-2xl font-black ${diffMonthly <= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {diffMonthly <= 0 ? <TrendingDown className="inline mr-1" /> : <TrendingUp className="inline mr-1" />}
            {format(Math.abs(diffMonthly))}
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase">Interest Impact</span>
          <div className={`text-2xl font-black ${diffInterest <= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {diffInterest <= 0 ? 'SAVED ' : 'EXTRA '}
            {format(Math.abs(diffInterest))}
          </div>
        </div>
      </div>
    </div>
  );
}