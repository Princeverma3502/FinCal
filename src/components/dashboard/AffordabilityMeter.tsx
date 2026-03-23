"use client";

import { cn } from "@/lib/utils";

interface Props {
  dti: number;
}

export const AffordabilityMeter = ({ dti }: Props) => {
  // Determine safety level
  const getLevel = (val: number) => {
    if (val <= 28) return { label: "Excellent", color: "bg-emerald-500", text: "text-emerald-600" };
    if (val <= 36) return { label: "Comfortable", color: "bg-amber-500", text: "text-amber-600" };
    return { label: "High Risk", color: "bg-rose-500", text: "text-rose-600" };
  };

  const level = getLevel(dti);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Debt-to-Income (DTI)</p>
          <p className={cn("text-xl font-black", level.text)}>{dti.toFixed(1)}%</p>
        </div>
        <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase", level.color)}>
          {level.label}
        </span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
        <div 
          className={cn("h-full transition-all duration-1000", level.color)} 
          style={{ width: `${Math.min(dti, 100)}%` }}
        />
      </div>
      <p className="text-[11px] text-slate-400 leading-relaxed italic">
        Lenders typically prefer a DTI ratio below 36% for mortgage approval.
      </p>
    </div>
  );
};