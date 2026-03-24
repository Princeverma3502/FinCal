"use client";

import React, { useState } from 'react';
import { formatCurrency, CurrencyCode } from '@/utils/finance';

interface Props {
  schedule: any[];
  currency: CurrencyCode;
}

export const AmortizationTable = ({ schedule, currency }: Props) => {
  const [view, setView] = useState<'monthly' | 'yearly'>('yearly');

  const displayData = view === 'yearly' 
    ? schedule.filter(item => item.month % 12 === 0 || item.remainingBalance === 0)
    : schedule;

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden w-full">
      <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-bold text-slate-800 text-xl tracking-tight">Payment Schedule</h2>
          <p className="text-slate-400 text-xs">Principal vs Interest breakdown</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          {['monthly', 'yearly'].map((v) => (
            <button 
              key={v}
              onClick={() => setView(v as 'monthly' | 'yearly')}
              className={`flex-1 sm:px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${view === v ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* This wrapper allows the table to scroll internally on mobile */}
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto scrollbar-hide">
        <table className="w-full text-left border-collapse min-w-[450px]">
          <thead className="sticky top-0 bg-slate-50/95 backdrop-blur-sm z-20">
            <tr>
              {['Period', 'Principal', 'Interest', 'Balance'].map((h) => (
                <th key={h} className="px-4 md:px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {displayData.map((item) => (
              <tr key={item.month} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 md:px-8 py-4 text-xs font-bold text-slate-700 whitespace-nowrap">
                  {view === 'yearly' ? `Year ${Math.ceil(item.month / 12)}` : `Mo ${item.month}`}
                </td>
                <td className="px-4 md:px-8 py-4 text-xs text-emerald-600 font-bold">
                  {formatCurrency(item.principalPayment, currency)}
                </td>
                <td className="px-4 md:px-8 py-4 text-xs text-rose-500 font-bold">
                  {formatCurrency(item.interestPayment, currency)}
                </td>
                <td className="px-4 md:px-8 py-4 text-xs text-slate-900 font-black">
                  {formatCurrency(item.remainingBalance, currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};