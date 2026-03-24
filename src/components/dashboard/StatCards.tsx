"use client";

import React from "react";
import { DollarSign, Landmark, CalendarCheck, Sparkles } from "lucide-react";
import { formatCurrency, CurrencyCode } from "@/utils/finance";

interface Props {
  monthlyPayment: number;
  totalInterest: number;
  payoffDate: Date | string;
  currency: CurrencyCode;
}

export const StatCards = ({ monthlyPayment, totalInterest, payoffDate, currency }: Props) => {
  const formattedDate = payoffDate instanceof Date 
    ? payoffDate.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    : payoffDate;

  const stats = [
    { 
      title: "Monthly EMI", 
      value: formatCurrency(monthlyPayment, currency), 
      subValue: "Total Outflow",
      icon: DollarSign, 
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      className: "col-span-2 md:col-span-1" 
    },
    { 
      title: "Total Interest", 
      value: formatCurrency(totalInterest, currency), 
      subValue: "Bank Profit",
      icon: Landmark, 
      color: "text-rose-500",
      bg: "bg-rose-50",
      className: "col-span-1"
    },
    { 
      title: "Payoff Date", 
      value: formattedDate, 
      subValue: "Debt Free",
      icon: CalendarCheck, 
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      className: "col-span-1"
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 w-full max-w-full overflow-hidden">
      {stats.map((stat) => (
        <div 
          key={stat.title} 
          className={`bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col min-w-0 overflow-hidden ${stat.className}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon size={16} strokeWidth={3} />
            </div>
            <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider truncate">
              {stat.title}
            </p>
          </div>
          <div className="min-w-0">
            <h3 className="text-lg md:text-2xl font-black text-slate-900 truncate">
              {stat.value}
            </h3>
            <p className="text-[9px] text-slate-400 font-medium flex items-center gap-1">
              <Sparkles size={10} className="text-amber-400 shrink-0" /> 
              <span className="truncate">{stat.subValue}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};