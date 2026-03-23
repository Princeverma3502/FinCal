"use client";

import React from "react";
import { LoanInputs } from "@/types";
import { CurrencyCode, CURRENCY_CONFIG } from "@/utils/finance";

interface Props {
  inputs: LoanInputs;
  updateInput: (key: keyof LoanInputs, value: number) => void;
  currency: CurrencyCode;
}

export const InputSidebar = ({ inputs, updateInput, currency }: Props) => {
  const symbol = CURRENCY_CONFIG[currency]?.symbol || "₹";

  const controls = [
    // Label changed to "Home Price" to match your test: page.getByLabel(/Home Price/i)
    { label: "Home Price", id: "home-price", key: "principal" as keyof LoanInputs, min: 100000, max: 100000000, step: 50000, useCurrency: true },
    { label: "Interest Rate", id: "interest-rate", key: "interestRate" as keyof LoanInputs, min: 1, max: 20, step: 0.05, suffix: "%" },
    { label: "Tenure", id: "loan-tenure", key: "years" as keyof LoanInputs, min: 1, max: 30, step: 1, suffix: " Yrs" },
    { label: "Extra Monthly", id: "extra-payment", key: "extraPayment" as keyof LoanInputs, min: 0, max: 200000, step: 1000, useCurrency: true },
    { label: "Lump Sum (Yearly)", id: "lump-sum", key: "lumpSumAmount" as keyof LoanInputs, min: 0, max: 1000000, step: 5000, useCurrency: true },
  ];

  return (
    <div className="space-y-6">
      {controls.map((ctrl) => (
        <div key={ctrl.key} className="group">
          <div className="flex justify-between items-center mb-3">
            <label 
              htmlFor={ctrl.id} 
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-600 transition-colors cursor-pointer"
            >
              {ctrl.label}
            </label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus-within:ring-2 ring-indigo-500/20 transition-all">
              {ctrl.useCurrency && <span className="text-slate-400 text-xs font-bold mr-1">{symbol}</span>}
              <input
                id={ctrl.id}
                type="number"
                value={inputs[ctrl.key] || 0}
                onChange={(e) => updateInput(ctrl.key, Number(e.target.value))}
                className="w-20 bg-transparent text-right text-xs font-black text-slate-900 focus:outline-none"
              />
              {ctrl.suffix && <span className="text-slate-400 text-xs font-bold ml-1">{ctrl.suffix}</span>}
            </div>
          </div>
          <input
            type="range"
            aria-label={`${ctrl.label} range`}
            min={ctrl.min}
            max={ctrl.max}
            step={ctrl.step}
            value={inputs[ctrl.key] || 0}
            onChange={(e) => updateInput(ctrl.key, parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all"
          />
        </div>
      ))}
    </div>
  );
};