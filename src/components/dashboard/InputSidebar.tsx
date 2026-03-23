"use client";

import React from "react";
import { LoanInputs } from "@/types";

interface Props {
  inputs: LoanInputs;
  updateInput: (key: keyof LoanInputs, value: number) => void;
}

export const InputSidebar = ({ inputs, updateInput }: Props) => {
  const controls = [
    { label: "Loan Amount", key: "principal", min: 50000, max: 2000000, step: 5000, prefix: "$" },
    { label: "Interest Rate", key: "interestRate", min: 0.1, max: 15, step: 0.1, suffix: "%" },
    { label: "Loan Term", key: "years", min: 5, max: 30, step: 5, suffix: " Yrs" },
    { label: "Extra Monthly Pay", key: "extraPayment", min: 0, max: 5000, step: 50, prefix: "$" },
    { label: "Property Tax (Yearly)", key: "propertyTax", min: 0, max: 25000, step: 100, prefix: "$" },
    { label: "Insurance (Yearly)", key: "insurance", min: 0, max: 10000, step: 100, prefix: "$" },
  ];

  return (
    <div className="space-y-8">
      {controls.map((control) => (
        <div key={control.key} className="group">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold text-slate-600 group-hover:text-indigo-600 transition-colors">
              {control.label}
            </label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
              {control.prefix && <span className="text-slate-400 text-xs mr-1">{control.prefix}</span>}
              <input 
                type="number"
                value={inputs[control.key as keyof LoanInputs]}
                onChange={(e) => updateInput(control.key as keyof LoanInputs, Number(e.target.value))}
                className="w-20 bg-transparent text-right text-sm font-bold text-slate-900 focus:outline-none"
              />
              {control.suffix && <span className="text-slate-400 text-xs ml-1">{control.suffix}</span>}
            </div>
          </div>
          <input
            type="range"
            min={control.min}
            max={control.max}
            step={control.step}
            value={inputs[control.key as keyof LoanInputs]}
            onChange={(e) => updateInput(control.key as keyof LoanInputs, parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      ))}
    </div>
  );
};