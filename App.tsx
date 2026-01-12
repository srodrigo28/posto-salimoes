
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import BottomNav from './components/BottomNav';
import logo from './assets/logo.jpeg';

import Cadastro from './pages/cadastro';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Abasteca from './pages/Abasteca';
import Pontos from './pages/Pontos';
import Perfil from './pages/Perfil';

type Route = 'index' | 'cadastro' | 'dashboard' | 'abasteca' | 'pontos' | 'perfil';

const App: React.FC = () => {
    const [route, setRoute] = useState<Route>('index');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-start md:items-center overflow-x-hidden">
      <div className="relative w-full max-w-md bg-white min-h-screen md:h-[850px] md:max-h-[90vh] 
        md:rounded-[3rem] md:shadow-2xl overflow-hidden md:overflow-y-auto flex flex-col border-0 border-transparent md:border-black scrollbar-hide">

        {/* Top Branding Area (Red) */}
        <div className="bg-[#ef4444] pt-6 pb-6 px-6 relative rounded-b-[2.5rem] shadow-lg z-5">
          <button
            aria-label="Ir para a tela inicial"
            className="text-white hover:bg-red-600 p-2 rounded-full transition-colors focus:outline-none 
            focus:ring-2 focus:ring-white"
            onClick={() => setRoute('index')}
          >
            <ArrowLeft size={24} />
          </button>

          <div className="flex flex-col items-center mt-0">
            <div className="bg-white p-3 rounded-xl shadow-sm mb-2" aria-hidden="true">
              <img
                src={logo}
                alt="Logo Solimões"
                className="h-10 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://picsum.photos/seed/solimoes/100/40";
                }}
              />
            </div>
            <h1 className="text-white text-2xl font-bold tracking-tight">Solimões Plus</h1>
          </div>
        </div>

        {/* Content area */}
        <main className="flex-1 px-6 mt-8 pb-24 absolute top-[140px] z-10 w-full">
          <div className="bg-white rounded-[2rem] shadow-xl p-4 border border-gray-50 min-h-[60vh]">
            {route === 'index' && (
              <Index
                isLoggedIn={isLoggedIn}
                onPrimaryAction={() => setRoute(isLoggedIn ? 'abasteca' : 'cadastro')}
              />
            )}

            {route === 'cadastro' && (
              <Cadastro
                onRegistered={() => {
                  setIsLoggedIn(true);
                  setRoute('dashboard');
                }}
              />
            )}

            {route === 'dashboard' && <Dashboard />}
            {route === 'abasteca' && <Abasteca />}
            {route === 'pontos' && <Pontos />}
            {route === 'perfil' && <Perfil />}
          </div>
        </main>

        <BottomNav activeRoute={route} onNavigate={(r) => setRoute(r as Route)} />

        <div className="sr-only" role="status" aria-live="polite">
          Aplicativo carregado.
        </div>
      </div>
    </div>
  );
};

export default App;
