"use client";

import React from "react";
import { DollarSign, Landmark, CalendarCheck, TrendingDown } from "lucide-react";
import { formatCurrency } from "@/utils/finance";

interface Props {
  monthlyPayment: number;
  totalInterest: number;
  payoffDate: string;
}

export const StatCards = ({ monthlyPayment, totalInterest, payoffDate }: Props) => {
  const stats = [
    { 
      title: "Monthly Payment", 
      value: formatCurrency(monthlyPayment), 
      icon: DollarSign, 
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    { 
      title: "Total Interest", 
      value: formatCurrency(totalInterest), 
      icon: Landmark, 
      color: "text-rose-500",
      bg: "bg-rose-50"
    },
    { 
      title: "Estimated Payoff", 
      value: payoffDate, 
      icon: CalendarCheck, 
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div 
          key={stat.title} 
          className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex items-center space-x-5 hover:shadow-md transition-shadow"
        >
          <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
            <stat.icon size={24} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">{stat.title}</p>
            <h3 className="text-xl font-black text-slate-900 leading-none">
              {stat.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};