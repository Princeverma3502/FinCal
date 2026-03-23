"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useChartDimensions } from '@/hooks/useChartDimensions';
import { formatCurrency, CurrencyCode } from '@/utils/finance';

interface Props {
  data: any[];
  baselineData?: any[];
  currency: CurrencyCode;
}

export const PaymentChart = ({ data = [], baselineData, currency }: Props) => {
  const [containerRef, width] = useChartDimensions();

  // Merge the current data and baseline data for the chart
  const chartData = data?.filter((item) => item.month % 12 === 0).map((item) => {
    const year = item.month / 12;
    const baseItem = baselineData?.find(b => b.month === item.month);
    
    return {
      year: year,
      current: Math.round(item.remainingBalance),
      baseline: baseItem ? Math.round(baseItem.remainingBalance) : null,
    };
  }) || [];

  return (
    <div ref={containerRef as React.RefObject<HTMLDivElement>} className="w-full h-[350px]">
      {width > 0 ? (
        <AreaChart width={width} height={350} data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
            </linearGradient>
          </defs>
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
            tickFormatter={(val: number) => formatCurrency(val, currency)}
            tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 700 }}
          />
          <Tooltip 
  cursor={{ fill: '#F8FAFC' }}
  contentStyle={{ 
    borderRadius: '16px', 
    border: 'none', 
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
  }}
  formatter={((value: number) => [formatCurrency(value, currency), ""]) as any}
/>

          {/* Baseline Line */}
          {baselineData && (
            <Area 
              name="Baseline"
              type="monotone" 
              dataKey="baseline" 
              stroke="#94A3B8" 
              fill="transparent" 
              strokeWidth={2} 
              strokeDasharray="5 5"
              connectNulls
            />
          )}

          {/* Current Selection */}
          <Area 
            name="Current"
            type="monotone" 
            dataKey="current" 
            stroke="#6366F1" 
            fill="url(#colorCurrent)" 
            strokeWidth={3} 
          />
        </AreaChart>
      ) : (
        <div className="w-full h-full bg-slate-50 animate-pulse rounded-3xl" />
      )}
    </div>
  );
};