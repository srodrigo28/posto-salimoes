
import React, { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import InstallButton from './components/InstallButton';
import logo from './assets/logo.jpeg';
import Splash from './components/Splash';

import Cadastro from './pages/cadastro';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Abasteca from './pages/Abasteca';
import Perfil from './pages/Perfil';

type Route = 'index' | 'cadastro' | 'dashboard' | 'abasteca' | 'pontos' | 'perfil';

const App: React.FC = () => {
  const [route, setRoute] = useState<Route>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    try {
      return localStorage.getItem('solimoes_seen_splash') !== '1';
    } catch (e) {
      return true;
    }
  });

  useEffect(() => {
    if (!showSplash) return;
    const t = setTimeout(() => {
      setShowSplash(false);
      try {
        localStorage.setItem('solimoes_seen_splash', '1');
      } catch (e) {
        /* ignore */
      }
    }, 1200);
    return () => clearTimeout(t);
  }, [showSplash]);

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-start md:items-center overflow-x-hidden">
      {showSplash && <Splash />}
      <div className="relative w-full max-w-md bg-white min-h-screen md:h-[850px] md:max-h-[90vh] 
        md:rounded-[3rem] md:shadow-2xl overflow-hidden md:overflow-y-auto flex flex-col border-0 border-transparent md:border-black scrollbar-hide">

        {/* Top Branding Area (Red) */}
        <div className="bg-[#ef4444] pt-6 pb-6 px-6 relative rounded-b-[2.5rem] shadow-lg z-5">
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

            {route === 'dashboard' && (
              <Index
                isLoggedIn={isLoggedIn}
                onPrimaryAction={() => setRoute(isLoggedIn ? 'abasteca' : 'cadastro')}
              />
            )}
            {route === 'abasteca' && <Abasteca />}
            {route === 'pontos' && <Dashboard />}
            {route === 'perfil' && <Perfil />}
          </div>
        </main>

        <InstallButton />
        <BottomNav activeRoute={route} onNavigate={(r) => setRoute(r as Route)} />

        <div className="sr-only" role="status" aria-live="polite">
          Aplicativo carregado.
        </div>
      </div>
    </div>
  );
};

export default App;
