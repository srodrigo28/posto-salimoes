import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <section>
      <h2 className="text-xl font-bold mb-2">Dashboard</h2>
      <p className="text-sm text-gray-500 mb-4">Resumo rápido dos seus pontos e últimos abastecimentos.</p>

      <div className="grid grid-cols-1 gap-3">
        <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-white border">
          <h3 className="text-sm text-gray-500">Saldo de pontos</h3>
          <p className="text-3xl font-extrabold text-green-600 mt-2">120</p>
        </div>

        <div className="p-4 rounded-xl bg-white border">
          <h3 className="text-sm text-gray-500">Último abastecimento</h3>
          <p className="text-base font-medium mt-2">Posto Solimões — 28/02 — R$ 120,00 — +12 pontos</p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
