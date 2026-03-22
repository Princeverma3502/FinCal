"use client";

import React from "react";
import { AmortizationPeriod } from "@/types";
import { formatCurrency } from "@/utils/finance";

interface Props {
  schedule: AmortizationPeriod[];
}

export const AmortizationTable = ({ schedule }: Props) => {
  // We filter to show the end of each year (Month 12, 24, 36...)
  const yearlyData = schedule.filter((item) => item.month % 12 === 0);

  return (
    <div className="bg-white rounded-fintech border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50">
        <h2 className="font-semibold text-slate-800 uppercase text-xs tracking-wider">Annual Schedule</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase">
              <th className="px-6 py-4 font-semibold">Year</th>
              <th className="px-6 py-4 font-semibold">Principal Paid</th>
              <th className="px-6 py-4 font-semibold">Interest Paid</th>
              <th className="px-6 py-4 font-semibold">Remaining Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {yearlyData.map((year) => (
              <tr key={year.month} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-700">Year {year.month / 12}</td>
                <td className="px-6 py-4 text-sm text-emerald-600 font-medium">
                  {formatCurrency(year.principalPaid * 12)}
                </td>
                <td className="px-6 py-4 text-sm text-rose-500 font-medium">
                  {formatCurrency(year.interestPaid * 12)}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900 font-bold">
                  {formatCurrency(year.remainingBalance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};