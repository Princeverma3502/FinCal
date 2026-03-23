"use client";

import React from "react";
import { AmortizationPeriod } from "@/types";
import { formatCurrency } from "@/utils/finance";
import { ArrowDownCircle } from "lucide-react";

interface Props {
  schedule: AmortizationPeriod[];
}

export const AmortizationTable = ({ schedule }: Props) => {
  // Show data for the end of each year
  const yearlyData = schedule.filter((item) => item.month % 12 === 0 || item.remainingBalance === 0);

  return (
    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h2 className="font-bold text-slate-800 text-xl">Annual Breakdown</h2>
          <p className="text-sm text-slate-400">Year-over-year principal and interest progress</p>
        </div>
        <button className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
          <ArrowDownCircle size={14} />
          Full Monthly View
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
              <th className="px-8 py-4">Timeline</th>
              <th className="px-8 py-4">Principal Paid</th>
              <th className="px-8 py-4">Interest Paid</th>
              <th className="px-8 py-4 text-right">Remaining Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {yearlyData.map((year, index) => (
              <tr key={year.month} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                  <span className="text-sm font-bold text-slate-900">Year {Math.ceil(year.month / 12)}</span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-semibold text-emerald-600">
                    {formatCurrency(year.principalPaid * 12)}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-semibold text-rose-400">
                    {formatCurrency(year.interestPaid * 12)}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <span className="text-sm font-black text-slate-900">
                    {formatCurrency(year.remainingBalance)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};