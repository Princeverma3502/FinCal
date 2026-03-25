"use client";

import React from 'react';
import { Receipt, IndianRupee } from 'lucide-react';
import { formatCurrency, CurrencyCode } from '@/utils/finance';

interface Props {
  totalInterest: number;
  taxBracket: number;
  totalTaxSavings: number;
  currency: CurrencyCode;
}

export const TaxBenefit = ({ totalInterest, taxBracket, totalTaxSavings, currency }: Props) => {
  const yearlyInterest = totalInterest > 0 ? totalInterest / 20 : 0; // Approximate yearly
  const yearlyTaxSaving = yearlyInterest * (taxBracket / 100);

  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 relative overflow-hidden group">
      <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <Receipt size={120} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-5">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <IndianRupee size={16} className="text-emerald-600" strokeWidth={3} />
          </div>
          <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tax Benefits</h3>
        </div>

        <div className="space-y-4">
          {/* Tax Bracket */}
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500 font-medium">Tax Bracket</span>
            <span className="text-sm font-black text-slate-900">{taxBracket}%</span>
          </div>

          {/* Yearly Tax Saving */}
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
            <p className="text-[10px] text-emerald-600 uppercase font-black tracking-wide mb-1">Est. Yearly Tax Saving</p>
            <p className="text-xl font-black text-emerald-700">{formatCurrency(yearlyTaxSaving, currency)}</p>
            <p className="text-[10px] text-emerald-500 mt-1 italic">Under Section 24(b) & 80C</p>
          </div>

          {/* Lifetime Tax Saving */}
          <div className="flex justify-between items-center bg-slate-50 rounded-xl p-3 border border-slate-100">
            <span className="text-xs text-slate-500 font-medium">Total Lifetime Savings</span>
            <span className="text-sm font-black text-emerald-600">{formatCurrency(totalTaxSavings, currency)}</span>
          </div>

          {/* Effective Interest */}
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-500 font-medium">Effective Interest Paid</span>
            <span className="text-sm font-black text-rose-500">{formatCurrency(totalInterest - totalTaxSavings, currency)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
