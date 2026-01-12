import React from 'react';
import PointsChart from '../components/PointsChart';

const Pontos: React.FC = () => {
  return (
    <section>
      <h2 className="text-xl font-bold mb-2">Meus Pontos</h2>
      <p className="text-sm text-gray-500 mb-4">Visualize seu histórico e o gráfico semanal/mensal.</p>

      <div className="p-4 rounded-xl bg-white border">
        <PointsChart />
      </div>
    </section>
  );
};

export default Pontos;
