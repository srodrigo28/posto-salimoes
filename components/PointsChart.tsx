import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

const weeklyData = [
  { name: 'Seg', points: 10 },
  { name: 'Ter', points: 12 },
  { name: 'Qua', points: 8 },
  { name: 'Qui', points: 15 },
  { name: 'Sex', points: 6 },
  { name: 'Sáb', points: 9 },
  { name: 'Dom', points: 4 },
];

const monthlyData = Array.from({ length: 4 }).map((_, i) => ({ name: `Sem ${i + 1}`, points: Math.floor(30 + Math.random() * 40) }));

const PointsChart: React.FC = () => {
  const [mode, setMode] = useState<'week' | 'month'>('week');

  const data = mode === 'week' ? weeklyData : monthlyData;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setMode('week')}
            className={`px-3 py-1 rounded-full font-semibold ${mode === 'week' ? 'bg-[#ef4444] text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Semana
          </button>
          <button
            onClick={() => setMode('month')}
            className={`px-3 py-1 rounded-full font-semibold ${mode === 'month' ? 'bg-[#ef4444] text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Mês
          </button>
        </div>
        <div className="text-sm text-gray-500">Total: {data.reduce((s, d) => s + d.points, 0)} pts</div>
      </div>

      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 10, right: 16, left: -8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value: any) => [`${value} pts`, 'Pontos']} />
            <Legend />
            <Bar dataKey="points" fill="#ef4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PointsChart;
