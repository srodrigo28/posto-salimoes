import React from 'react';
import PointsChart from '../components/PointsChart';

const recent = [
  { id: 1, date: '2026-01-08', station: 'Posto Solimões', value: 'R$ 120,00', points: 12 },
  { id: 2, date: '2026-01-03', station: 'AutoPosto XYZ', value: 'R$ 85,50', points: 8 },
  { id: 3, date: '2025-12-29', station: 'Posto Solimões', value: 'R$ 140,00', points: 14 },
];

const Dashboard: React.FC = () => {
  const totalPoints = recent.reduce((s, r) => s + r.points, 0) + 100; // exemplo com saldo base

  return (
    <section>
      <h2 className="text-xl font-bold mb-2">Dashboard</h2>
      <p className="text-sm text-gray-500 mb-4">Resumo dos seus pontos e últimos abastecimentos.</p>

      <div className="grid grid-cols-1 gap-3">
        <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-white border">
          <h3 className="text-sm text-gray-500">Saldo de pontos</h3>
          <p className="text-3xl font-extrabold text-green-600 mt-2">{totalPoints}</p>
        </div>

        <div className="p-4 rounded-xl bg-white border">
          <h3 className="text-sm text-gray-500 mb-2">Gráfico de pontos</h3>
          <PointsChart />
        </div>

        <div className="p-4 rounded-xl bg-white border">
          <h3 className="text-sm text-gray-500">Últimos abastecimentos</h3>
          <ul className="mt-3 space-y-2">
            {recent.map((r) => (
              <li key={r.id} className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">{r.station}</div>
                  <div className="text-xs text-gray-500">{r.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{r.value}</div>
                  <div className="text-xs text-green-600">+{r.points} pts</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
