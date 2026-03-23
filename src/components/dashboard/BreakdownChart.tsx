"use client";

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useChartDimensions } from '@/hooks/useChartDimensions';
import { formatCurrency } from '@/utils/finance';

export const BreakdownChart = ({ principal, interest, tax, insurance }: any) => {
  const [containerRef, width] = useChartDimensions();

  const data = [
    { name: 'Principal & Interest', value: (principal || 0) + (interest || 0), color: '#6366F1' },
    { name: 'Taxes', value: (tax || 0) / 12, color: '#10B981' },
    { name: 'Insurance', value: (insurance || 0) / 12, color: '#F43F5E' },
  ];

  return (
    <div ref={containerRef} className="w-full h-[300px] flex items-center justify-center">
      {width > 0 ? (
        <PieChart width={width} height={300}>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={90}
            paddingAngle={8}
            dataKey="value"
            stroke="none"
            cornerRadius={6}
          >
            {data.map((entry: any, index: number) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={((val: number) => [formatCurrency(val), "Monthly"]) as any} />
          <Legend verticalAlign="bottom" iconType="circle" />
        </PieChart>
      ) : (
        <div className="w-full h-full bg-slate-50 animate-pulse rounded-3xl" />
      )}
    </div>
  );
};