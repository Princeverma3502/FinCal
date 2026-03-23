"use client";
import React, { useState } from 'react';
import { Target, Zap } from 'lucide-react';
import { formatCurrency, CurrencyCode } from '@/utils/finance';

interface Props {
  principal: number;
  interestRate: number;
  currency: CurrencyCode;
}

export const GoalTracker = ({ principal, interestRate, currency }: Props) => {
  const [targetYear, setTargetYear] = useState(new Date().getFullYear() + 10);
  
  const yearsToTarget = targetYear - new Date().getFullYear();
  const monthlyRate = (interestRate / 100) / 12;
  const totalMonths = yearsToTarget * 12;
  
  const requiredPayment = monthlyRate === 0 
    ? principal / totalMonths 
    : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths));

  return (
    <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-2xl relative overflow-hidden group">
      <div className="absolute -right-4 -top-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
        <Target size={100} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-indigo-500 rounded-lg"><Zap size={18} fill="currentColor"/></div>
          <h2 className="font-bold text-lg">Freedom Goal</h2>
        </div>

        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
              <span>Target Year</span>
              <span className="text-indigo-400 text-sm">{targetYear}</span>
            </div>
            <input 
              type="range" min={2026} max={2055} value={targetYear}
              onChange={(e) => setTargetYear(parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-400"
            />
          </div>

          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <p className="text-[10px] text-slate-400 uppercase font-black mb-1">Total Monthly Required</p>
            <p className="text-2xl font-black text-indigo-400">{formatCurrency(requiredPayment, currency)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};