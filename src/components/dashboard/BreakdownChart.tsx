"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export const BreakdownChart = ({ principal, interest, taxes }: any) => {
  const data = [
    { name: 'Principal', value: principal, color: '#6366F1' },
    { name: 'Interest', value: interest, color: '#F43F5E' },
    { name: 'Taxes/Ins', value: taxes, color: '#10B981' },
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
            {data.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
          </Pie>
          <Tooltip />
          <Legend iconType="circle" layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};