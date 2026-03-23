"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '@/utils/finance';

interface Props {
  principal: number;
  interest: number;
  tax: number;
  insurance: number;
}

export const BreakdownChart = ({ principal, interest, tax, insurance }: Props) => {
  const data = [
    { name: 'Principal & Interest', value: principal + interest, color: '#6366F1' },
    { name: 'Property Taxes', value: tax / 12, color: '#10B981' },
    { name: 'Insurance', value: insurance / 12, color: '#F43F5E' },
  ];

  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={70}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => {
              if (typeof value !== 'number') return value;
              return formatCurrency(value);
            }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};