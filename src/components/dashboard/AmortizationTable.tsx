"use client";

import React, { useState } from 'react';
import { formatCurrency, CurrencyCode } from '@/utils/finance';
import { Table as TableIcon, Calendar, ArrowRightLeft } from 'lucide-react';

interface Props {
  schedule: any[];
  currency: CurrencyCode;
}

export const AmortizationTable = ({ schedule, currency }: Props) => {
  const [view, setView] = useState<'monthly' | 'yearly'>('yearly');

  // Logic to aggregate data for yearly view or filter accordingly
  const displayData = view === 'yearly' 
    ? schedule.filter(item => item.month % 12 === 0 || item.remainingBalance === 0)
    : schedule;

  return (
    <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden w-full max-w-full">
      {/* HEADER SECTION */}
      <div className="p-5 md:p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <TableIcon size={20} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-lg md:text-xl tracking-tight">Payment Schedule</h2>
            <p className="text-slate-400 text-[10px] md:text-xs font-medium">Principal vs Interest breakdown</p>
          </div>
        </div>
        
        {/* VIEW TOGGLE */}
        <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          {(['monthly', 'yearly'] as const).map((v) => (
            <button 
              key={v}
              onClick={() => setView(v)}
              className={`flex-1 sm:px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200 ${
                view === v 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto scrollbar-hide min-w-0 w-full touch-auto relative">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead className="sticky top-0 bg-white/95 backdrop-blur-md z-20">
            <tr>
              {['Period', 'Principal', 'Interest', 'Balance'].map((h) => (
                <th 
                  key={h} 
                  className="px-6 md:px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] border-b border-slate-100"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {displayData.length > 0 ? (
              displayData.map((item) => (
                <tr key={`${view}-${item.month}`} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 md:px-8 py-4 text-xs font-bold text-slate-700 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                      {view === 'yearly' ? `Year ${Math.ceil(item.month / 12)}` : `Month ${item.month}`}
                    </div>
                  </td>
                  <td className="px-6 md:px-8 py-4 text-xs text-emerald-600 font-bold whitespace-nowrap">
                    {formatCurrency(item.principalPayment, currency)}
                  </td>
                  <td className="px-6 md:px-8 py-4 text-xs text-rose-500 font-bold whitespace-nowrap">
                    {formatCurrency(item.interestPayment, currency)}
                  </td>
                  <td className="px-6 md:px-8 py-4 text-xs text-slate-900 font-black whitespace-nowrap privacy-sensitive">
                    {formatCurrency(item.remainingBalance, currency)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 text-sm italic">
                  No data available for the current inputs.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* MOBILE SCROLL INDICATOR */}
      <div className="lg:hidden p-4 bg-slate-50/50 text-center border-t border-slate-100">
          <div className="flex items-center justify-center gap-2">
            <ArrowRightLeft size={10} className="text-slate-400" />
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Swipe horizontally to view full balance
            </p>
          </div>
      </div>
    </div>
  );
};