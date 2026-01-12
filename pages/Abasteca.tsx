import React, { useState, useEffect } from 'react';

const Abasteca: React.FC = () => {
  const [cliente, setCliente] = useState('Jhonathan Silva');
  const [placa, setPlaca] = useState('ODZ-3040');
  const [data, setData] = useState('');

  const [litros, setLitros] = useState('');
  const [valor, setValor] = useState('');

  const [litrosError, setLitrosError] = useState<string | null>(null);

  useEffect(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setData(`${yyyy}-${mm}-${dd}`);
  }, []);

  const formatCurrency = (raw: string) => {
    const only = raw.replace(/[^0-9,\.]/g, '');
    if (!only) return '';
    const normalized = only.replace(/,/g, '.');
    const num = parseFloat(normalized);
    if (Number.isNaN(num)) return '';
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleValorChange = (value: string) => {
    const formatted = formatCurrency(value);
    setValor(formatted);
  };

  const handleLitrosChange = (value: string) => {
    const cleaned = value.replace(/[^0-9,\.]/g, '');
    const normalized = cleaned.replace(/,/g, '.');
    const re = /^\d{0,3}(?:\.\d{0,2})?$/;
    if (normalized === '') {
      setLitros('');
      setLitrosError(null);
      return;
    }
    if (!re.test(normalized)) {
      return;
    }
    const num = parseFloat(normalized);
    if (!Number.isNaN(num) && num > 120) {
      setLitrosError('Máximo permitido: 120 litros');
    } else {
      setLitrosError(null);
    }
    const display = normalized.includes('.') ? normalized.replace('.', ',') : normalized;
    setLitros(display);
  };

  const formatPlate = (value: string) => {
    const limpa = value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 7);
    if (limpa.length <= 3) return limpa;
    return `${limpa.slice(0, 3)}-${limpa.slice(3)}`;
  };

  const handlePlacaChange = (value: string) => {
    setPlaca(formatPlate(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const litrosNum = parseFloat(litros.replace(',', '.')) || 0;
    const valorNum = Number((valor || '').replace(/[^0-9,\.]/g, '').replace(/,/g, '.')) || 0;

    if (litrosNum <= 0) {
      setLitrosError('Informe a quantidade de litros');
      return;
    }
    if (litrosNum > 120) {
      setLitrosError('Máximo permitido: 120 litros');
      return;
    }

    alert(`Abastecimento registrado: ${cliente} — ${placa} — ${data} — R$ ${valorNum.toFixed(2).replace('.', ',')} — ${litrosNum} L. +10 pontos`);
    setLitros('');
    setValor('');
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-2">Abasteça e Ganhe</h2>
      <p className="text-sm text-gray-500 mb-4">Registre rapidamente seu abastecimento e ganhe pontos.</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Cliente</label>
          <div className="flex items-center gap-3">
            <div className="text-2xl">👤</div>
            <input value={cliente} onChange={(e) => setCliente(e.target.value)} className="flex-1 p-3 rounded-xl border" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Placa</label>
          <div className="flex items-center gap-3">
            <div className="text-2xl">🚗</div>
            <input value={placa} onChange={(e) => handlePlacaChange(e.target.value)} className="flex-1 p-3 rounded-xl border" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Data</label>
          <div className="flex items-center gap-3">
            <div className="text-2xl">📅</div>
            <input type="date" value={data} onChange={(e) => setData(e.target.value)} className="flex-1 p-3 rounded-xl border" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Litros</label>
          <div className="flex items-center gap-3">
            <div className="text-2xl">💧</div>
            <input value={litros} onChange={(e) => handleLitrosChange(e.target.value)} placeholder="0,00" className="flex-1 p-3 rounded-xl border" />
          </div>
          {litrosError && <p className="text-xs text-red-500 mt-1">{litrosError}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Valor</label>
          <div className="flex items-center gap-3">
            <div className="text-2xl">💵</div>
            <input value={valor} onChange={(e) => handleValorChange(e.target.value)} placeholder="R$ 0,00" className="flex-1 p-3 rounded-xl border" />
          </div>
        </div>

        <button type="submit" className="w-full bg-[#ef4444] text-white py-3 rounded-full font-bold">Registrar Abastecimento</button>
      </form>
    </section>
  );
};

export default Abasteca;
