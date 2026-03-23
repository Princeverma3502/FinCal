"use client";

import React from "react";
import { DollarSign, Landmark, CalendarCheck, Sparkles } from "lucide-react";
import { formatCurrency, CurrencyCode } from "@/utils/finance";

interface Props {
  monthlyPayment: number;
  totalInterest: number;
  payoffDate: Date | string;
  currency: CurrencyCode; // Fixed error here
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
      border: "border-indigo-100",
      className: "xs:col-span-2 md:col-span-1" 
    },
    { 
      title: "Total Interest", 
      value: formatCurrency(totalInterest, currency), 
      subValue: "Bank Profit",
      icon: Landmark, 
      color: "text-rose-500",
      bg: "bg-rose-50",
      border: "border-rose-100",
      className: "col-span-1"
    },
    { 
      title: "Payoff Date", 
      value: formattedDate, 
      subValue: "Debt Free",
      icon: CalendarCheck, 
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      className: "col-span-1"
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
      {stats.map((stat) => (
        <div 
          key={stat.title} 
          className={`group bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-200 flex flex-col items-start hover:shadow-md transition-all duration-300 relative overflow-hidden ${stat.className}`}
        >
          <div className={`hidden md:block absolute -right-4 -bottom-4 opacity-5 transition-transform group-hover:scale-110 duration-500 ${stat.color}`}>
            <stat.icon size={100} />
          </div>

          <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-4 relative z-10">
            <div className={`p-2 md:p-3 rounded-xl md:rounded-2xl ${stat.bg} ${stat.color} border ${stat.border} shadow-inner`}>
              <stat.icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={2.5} />
            </div>
            <p className="text-[8px] md:text-[10px] text-slate-400 font-black uppercase tracking-[0.1em] md:tracking-[0.2em] whitespace-nowrap truncate">
              {stat.title}
            </p>
          </div>

          <div className="relative z-10 w-full">
            <h3 className="text-sm md:text-2xl font-black text-slate-900 tracking-tight mb-0.5 md:mb-1 truncate">
              {stat.value}
            </h3>
            <p className="text-[8px] md:text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <Sparkles size={10} className="text-amber-400 shrink-0" /> 
              <span className="truncate">{stat.subValue}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};