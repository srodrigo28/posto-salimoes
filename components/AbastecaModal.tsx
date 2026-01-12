import React from 'react';

type Props = {
  visible: boolean;
  points: number;
  onClose: () => void;
};

const AbastecaModal: React.FC<Props> = ({ visible, points, onClose }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-white rounded-xl p-6 w-11/12 max-w-sm text-center shadow-lg">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h3 className="text-lg font-semibold mb-2">Obrigado!</h3>
        <p className="text-sm text-gray-600 mb-4">Abastecimento registrado com sucesso.</p>

        <div className="text-5xl font-extrabold text-[#ef4444] mb-1">+{points} pts</div>
        <div className="text-xs text-gray-500">Pontos gerados</div>
      </div>
    </div>
  );
};

export default AbastecaModal;
