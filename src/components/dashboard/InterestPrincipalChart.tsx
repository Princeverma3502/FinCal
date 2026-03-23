"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useChartDimensions } from '@/hooks/useChartDimensions';
import { formatCurrency, CurrencyCode } from '@/utils/finance';

interface Props {
  data: any[];
  currency: CurrencyCode; // Added currency prop
}

export const InterestPrincipalChart = ({ data = [], currency }: Props) => {
  const [containerRef, width] = useChartDimensions();

  const yearlyData = data.reduce((acc: any[], curr) => {
    const year = Math.ceil(curr.month / 12);
    const existingYear = acc.find(d => d.year === year);

    if (existingYear) {
      existingYear.principal += curr.principalPayment;
      existingYear.interest += curr.interestPayment;
    } else {
      acc.push({
        year,
        principal: curr.principalPayment,
        interest: curr.interestPayment,
      });
    }
    return acc;
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[400px] mt-8">
      {width > 0 ? (
        <BarChart width={width} height={400} data={yearlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis 
            dataKey="year" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            // FIXED: Uses global formatCurrency for the Y-Axis labels
            tickFormatter={(val) => formatCurrency(val, currency)}
            tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }}
          />
          <Tooltip 
            cursor={{ fill: '#F8FAFC' }}
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
            // FIXED: Uses global formatCurrency for tooltips
            formatter={(val: number) => [formatCurrency(val, currency), ""]}
          />
          <Legend verticalAlign="top" align="center" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '12px', fontWeight: 'bold' }} />
          <Bar name="Principal (Equity)" dataKey="principal" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
          <Bar name="Interest (Cost)" dataKey="interest" stackId="a" fill="#F43F5E" radius={[4, 4, 0, 0]} />
        </BarChart>
      ) : (
        <div className="w-full h-full bg-slate-50 animate-pulse rounded-3xl" />
      )}
    </div>
  );
};