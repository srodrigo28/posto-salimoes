
import React from 'react';
import { Home, Filter, Star, Trophy } from 'lucide-react';

type BottomNavProps = {
  activeRoute?: string;
  onNavigate?: (route: string) => void;
};

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  route: string;
  active?: boolean;
  onClick?: (route: string) => void;
}> = ({ icon, label, route, active = false, onClick }) => (
  <button
    onClick={() => onClick && onClick(route)}
    className={`flex flex-col items-center gap-1 p-2 flex-1 transition-colors rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 ${
      active ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'
    }`}
    aria-label={label}
  >
    <div className={`${active ? 'scale-110' : ''} transition-transform`}>
      {icon}
    </div>
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

const BottomNav: React.FC<BottomNavProps> = ({ activeRoute = 'cadastro', onNavigate }) => {
  return (
    <nav
      className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 pb-6 flex justify-between items-center z-10 md:rounded-b-[2.5rem]"
      aria-label="Navegação Principal"
    >
      <NavItem icon={<Home size={26} />} label="Início" route="dashboard" active={activeRoute === 'dashboard'} onClick={onNavigate} />
      <NavItem icon={<Filter size={26} />} label="Abasteça" route="abasteca" active={activeRoute === 'abasteca'} onClick={onNavigate} />
      <NavItem icon={<Star size={26} />} label="Pontos" route="pontos" active={activeRoute === 'pontos'} onClick={onNavigate} />
      <NavItem icon={<Trophy size={26} />} label="Perfil" route="perfil" active={activeRoute === 'perfil'} onClick={onNavigate} />
    </nav>
  );
};

export default BottomNav;
