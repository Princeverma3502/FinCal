"use client";

import React from "react";
import { LoanInputs } from "@/types";

interface Props {
  inputs: LoanInputs;
  updateInput: (key: keyof LoanInputs, value: number) => void;
}

export const InputSidebar = ({ inputs, updateInput }: Props) => {
  const controls = [
    { label: "Loan Amount", key: "principal", min: 10000, max: 1000000, step: 5000, prefix: "$" },
    { label: "Interest Rate", key: "interestRate", min: 0.1, max: 15, step: 0.1, suffix: "%" },
    { label: "Loan Term", key: "years", min: 1, max: 30, step: 1, suffix: " Years" },
    { label: "Annual Property Tax", key: "propertyTax", min: 0, max: 20000, step: 100, prefix: "$" },
    { label: "Annual Insurance", key: "insurance", min: 0, max: 10000, step: 100, prefix: "$" },
  ];

  return (
    <div className="space-y-8">
      {controls.map((control) => (
        <div key={control.key} className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-slate-600">{control.label}</label>
            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
              {control.prefix}{inputs[control.key as keyof LoanInputs].toLocaleString()}{control.suffix}
            </span>
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