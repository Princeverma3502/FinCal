"use client";

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useChartDimensions } from '@/hooks/useChartDimensions';
import { formatCurrency, CurrencyCode } from '@/utils/finance';

interface Props {
  principal: number;
  interest: number;
  tax: number;
  insurance: number;
  currency: CurrencyCode;
}

export const BreakdownChart = ({ principal, interest, tax, insurance, currency }: Props) => {
  const [containerRef, width] = useChartDimensions();

  const data = [
    { name: 'Principal & Interest', value: (principal || 0) + (interest || 0), color: '#6366F1' },
    { name: 'Taxes', value: (tax || 0) / 12, color: '#10B981' },
    { name: 'Insurance', value: (insurance || 0) / 12, color: '#F43F5E' },
  ];

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} className="w-full h-[300px] flex items-center justify-center">
      {width > 0 ? (
        <PieChart width={width} height={300}>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={90}
            paddingAngle={8}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {/* FIXED: Added currency argument to formatCurrency and fixed Tooltip signature */}
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            formatter={((val: number) => [formatCurrency(val, currency), "Monthly"]) as any} 
          />
          <Legend 
            verticalAlign="bottom" 
            iconType="circle" 
            wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 'bold' }} 
          />
        </PieChart>
      ) : (
        <div className="w-full h-full bg-slate-50 animate-pulse rounded-3xl" />
      )}
    </div>
  );
};