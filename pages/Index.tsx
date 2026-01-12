import React, { useState } from 'react';
import { Droplet, Star } from 'lucide-react';

type Props = {
  isLoggedIn?: boolean;
  onPrimaryAction?: () => void;
};


type Route = 'index' | 'cadastro' | 'dashboard' | 'abasteca' | 'pontos' | 'perfil';

const Index: React.FC<Props> = ({ isLoggedIn = false, onPrimaryAction }) => {

  const [route, setRoute] = useState<Route>('dashboard');

  const handlePrimaryAction = () => {
    if (onPrimaryAction) {
      onPrimaryAction();
      return;
    }
    // Update local route state (if other parts of the app use it)
    setRoute('cadastro');
    // Perform navigation to the cadastro page
    window.location.href = '/cadastro';
  };
  return (
    <section className="text-center">
      <div className="py-6">
        <h2 className="text-2xl font-bold">Bem-vindo ao Posto Solimões</h2>
        <p className="text-sm text-gray-500 mt-2">Controle seu consumo, acumule pontos e ganhe recompensas.</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        
        <div className="w-28 h-28 rounded-full bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center shadow-md">
          <Droplet size={48} className="text-[#ef4444]" />
        </div>

        <h3 className="text-lg font-semibold">Abasteça e Ganhe</h3>
        <p className="text-sm text-gray-500 max-w-xs">Registre seus abastecimentos e transforme consumo em pontos.</p>

        <button
          onClick={handlePrimaryAction}
          className="mt-4 px-6 py-3 bg-[#ef4444] text-white rounded-full font-bold flex items-center gap-3"
        >
          <Star size={18}  />
          {isLoggedIn ? 'Registrar novo abastecimento' : 'Faça seu cadastro para começar'}
        </button>
      </div>
    </section>
  );
};

export default Index;
