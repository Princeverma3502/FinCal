"use client";

import React from "react";
import { LoanInputs } from "@/types";
import { CurrencyCode, CURRENCY_CONFIG } from "@/utils/finance";

interface Props {
  inputs: LoanInputs;
  updateInput: (key: keyof LoanInputs, value: number) => void;
  currency: CurrencyCode; // Added currency prop
}

export const InputSidebar = ({ inputs, updateInput, currency }: Props) => {
  // Get the correct symbol from our config utility
  const symbol = CURRENCY_CONFIG[currency]?.symbol || "₹";

  const controls = [
    { label: "Loan Amount", key: "principal" as const, min: 100000, max: 100000000, step: 50000, useCurrency: true },
    { label: "Interest Rate", key: "interestRate" as const, min: 1, max: 20, step: 0.05, suffix: "%" },
    { label: "Tenure", key: "years" as const, min: 1, max: 30, step: 1, suffix: " Yrs" },
    { label: "Extra Monthly", key: "extraPayment" as const, min: 0, max: 200000, step: 1000, useCurrency: true },
    { label: "Lump Sum (Yearly)", key: "lumpSumAmount" as const, min: 0, max: 1000000, step: 5000, useCurrency: true },
  ];

  return (
    <div className="space-y-6">
      {controls.map((ctrl) => (
        <div key={ctrl.key} className="group">
          <div className="flex justify-between items-center mb-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-600 transition-colors">
              {ctrl.label}
            </label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:ring-2 ring-indigo-500/20 transition-all">
              {ctrl.useCurrency && <span className="text-slate-400 text-xs font-bold mr-1">{symbol}</span>}
              <input
                type="number"
                value={inputs[ctrl.key]}
                onChange={(e) => updateInput(ctrl.key, Number(e.target.value))}
                className="w-20 bg-transparent text-right text-xs font-black text-slate-900 focus:outline-none"
              />
              {ctrl.suffix && <span className="text-slate-400 text-xs font-bold ml-1">{ctrl.suffix}</span>}
            </div>
          </div>
          <input
            type="range"
            min={ctrl.min}
            max={ctrl.max}
            step={ctrl.step}
            value={inputs[ctrl.key]}
            onChange={(e) => updateInput(ctrl.key, parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all"
          />
        </div>
      ))}
    </div>
  );
};