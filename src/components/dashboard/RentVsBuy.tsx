"use client";

import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { formatCurrency, CurrencyCode } from '@/utils/finance';

interface Props {
  monthlyMortgage: number;
  downPayment: number;
  homeValue: number;
  currency: CurrencyCode; // Fixed error here
}

export const RentVsBuy = ({ monthlyMortgage, downPayment, homeValue, currency }: Props) => {
  const estimatedRent = (homeValue * 0.004); 
  const monthlyOpportunityCost = (downPayment * 0.07) / 12;
  const totalMonthlyRentCost = estimatedRent + monthlyOpportunityCost;

  const buyIsBetter = monthlyMortgage < totalMonthlyRentCost;

  return (
    <div className={`p-6 rounded-[2.5rem] border transition-colors duration-500 ${buyIsBetter ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
      <div className="flex items-center gap-3 mb-4">
        {buyIsBetter ? (
          <TrendingDown className="text-emerald-600" />
        ) : (
          <TrendingUp className="text-amber-600" />
        )}
        <h3 className="font-bold text-slate-800">Rent vs. Buy</h3>
      </div>
      
      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
        Estimated monthly renting cost is 
        <strong className="text-slate-900"> {formatCurrency(totalMonthlyRentCost, currency)}</strong>.
      </p>

      <div className="mt-4 p-3 bg-white/50 rounded-2xl text-[10px] md:text-xs font-bold text-slate-700 border border-white/50">
        {buyIsBetter 
          ? "✅ Buying is currently more cost-effective."
          : "⚠️ Renting and investing the down payment might be better."}
      </div>
    </div>
  );
};