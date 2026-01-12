import React, { useState, useEffect } from 'react';
import { User, Car, Calendar, Droplet, DollarSign } from 'lucide-react';
import { IMaskInput } from 'react-imask';
import AbastecaModal from '../components/AbastecaModal';

const Abasteca: React.FC = () => {
  const [cliente, setCliente] = useState('Jhonathan Silva');
  const [placa, setPlaca] = useState('ODZ-3040');
  const [data, setData] = useState('');

  const [litros, setLitros] = useState('');
  const [valor, setValor] = useState('');

  const [litrosError, setLitrosError] = useState<string | null>(null);
  const [valorError, setValorError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPoints, setModalPoints] = useState(0);

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
    // always show two decimals, comma as separator
    return num.toFixed(2).replace('.', ',');
  };

  const handleValorChange = (value: string) => {
    // Allow progressive integer typing: typing digits builds the integer part
    const raw = value.replace(/[^0-9,\.]/g, '');
    if (raw === '') {
      setValor('');
      setValorError(null);
      return;
    }

    // If user typed a decimal separator, parse as float
    if (/[\.,]/.test(raw)) {
      const normalized = raw.replace(/,/g, '.');
      const num = parseFloat(normalized);
      if (Number.isNaN(num)) return;
      if (num > 500) setValorError('Valor máximo R$ 500,00');
      else setValorError(null);
      setValor(num.toFixed(2).replace('.', ','));
      return;
    }

    // Otherwise treat as integer part typed progressively
    const onlyDigits = raw.replace(/\D/g, '');
    // limit to 3 digits for integer part (max 500)
    const intPart = onlyDigits.slice(0, 3);
    const num = parseInt(intPart || '0', 10);
    if (!Number.isNaN(num) && num > 500) setValorError('Valor máximo R$ 500,00');
    else setValorError(null);
    setValor(`${num.toString()},00`);
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
    const valorNum = parseFloat((valor || '').replace(/,/g, '.')) || 0;

    if (litrosNum <= 0) {
      setLitrosError('Informe a quantidade de litros');
      return;
    }
    if (litrosNum > 120) {
      setLitrosError('Máximo permitido: 120 litros');
      return;
    }
    if (valorNum > 500) {
      setValorError('Valor máximo R$ 500,00');
      return;
    }

    const pointsGenerated = 100;
    setModalPoints(pointsGenerated);
    setModalVisible(true);
    // auto-close after 600 seconds (600000 ms)
    setTimeout(() => setModalVisible(false), 600000);

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
            <User size={24} className="text-gray-600" />
            <input value={cliente} readOnly aria-readonly className="flex-1 p-3 rounded-xl border bg-gray-50" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="sm:w-1/2 w-full min-w-0">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Placa</label>
            <div className="flex items-center gap-3 min-w-0">
              <Car size={24} className="text-gray-600" />
              <input value={placa} readOnly aria-readonly className="w-full min-w-0 p-3 rounded-xl border bg-gray-50" />
            </div>
          </div>

          <div className="sm:w-1/2 w-full min-w-0">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Data</label>
            <div className="flex items-center gap-3 min-w-0">
              <Calendar size={24} className="text-gray-600" />
              <input type="date" value={data} readOnly aria-readonly className="w-full min-w-0 p-3 rounded-xl border bg-gray-50" />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="sm:w-1/2 w-full min-w-0">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Litros</label>
            <div className="flex items-center gap-3 min-w-0">
              <Droplet size={24} className="text-gray-600" />
              <IMaskInput
                mask={Number}
                radix="," 
                thousandsSeparator="."
                scale={2}
                mapToRadix={["."]}
                padFractionalZeros={true}
                normalizeZeros={true}
                min={0}
                max={120}
                value={litros}
                onAccept={(val: any) => handleLitrosChange(String(val))}
                placeholder="0,00"
                className="w-full min-w-0 p-3 rounded-xl border"
              />
            </div>
            {litrosError && <p className="text-xs text-red-500 mt-1">{litrosError}</p>}
          </div>

          <div className="sm:w-1/2 w-full min-w-0">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Valor</label>
            <div className="flex items-center gap-3 min-w-0">
              <DollarSign size={24} className="text-gray-600" />
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <IMaskInput
                  mask={Number}
                  radix="," 
                  thousandsSeparator="."
                  scale={2}
                  mapToRadix={["."]}
                  padFractionalZeros={true}
                  normalizeZeros={true}
                  min={0}
                  max={500}
                  value={valor}
                  onAccept={(val: any) => handleValorChange(String(val))}
                  placeholder="0,00"
                  className="w-full min-w-0 p-3 rounded-xl border"
                />
              </div>
            </div>
            {valorError && <p className="text-xs text-red-500 mt-1">{valorError}</p>}
          </div>
        </div>

        <button type="submit" className="w-full bg-[#ef4444] text-white py-3 rounded-full font-bold">Registrar Abastecimento</button>
      </form>
      <AbastecaModal visible={modalVisible} points={modalPoints} onClose={() => setModalVisible(false)} />
    </section>
  );
};

export default Abasteca;
