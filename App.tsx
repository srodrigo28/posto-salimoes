
import React, { useState } from 'react';
import {
  ArrowLeft
} from 'lucide-react';
import RegistrationForm from './components/RegistrationForm';
import BottomNav from './components/BottomNav';
import logo from './assets/logo.jpeg';

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    nascimento: '',
    whatsapp: '',
    placa: '',
    km: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Cadastro enviado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-start md:items-center overflow-x-hidden">
      {/* Container simulating the mobile device shown in the image */}
      <div className="relative w-full max-w-md bg-white min-h-screen md:h-[850px] md:max-h-[90vh] md:rounded-[3rem] md:shadow-2xl overflow-hidden md:overflow-y-auto flex flex-col border-8 border-transparent md:border-black scrollbar-hide">

        {/* Top Branding Area (Red) */}
        <div className="bg-[#ef4444] pt-8 pb-16 px-6 relative rounded-b-[2.5rem] shadow-lg">
          <button
            aria-label="Voltar para a página anterior"
            className="text-white hover:bg-red-600 p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          >
            <ArrowLeft size={24} />
          </button>

          <div className="flex flex-col items-center mt-2">
            <div className="bg-white p-3 rounded-xl shadow-sm mb-4" aria-hidden="true">
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
            <h1 className="text-white text-2xl font-bold tracking-tight">Novo Cadastro</h1>
          </div>
        </div>

        {/* Form Area (Overlapping the red area) */}
        <main className="flex-1 px-6 -mt-8 pb-24">
          <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-gray-50">
            <RegistrationForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
            />

            <p className="text-center text-xs text-gray-500 mt-6 leading-relaxed">
              Ao cadastrar, você concorda com nossos <br />
              <button className="underline font-medium hover:text-red-500 focus:text-red-500">Termos de Uso</button> e <button className="underline font-medium hover:text-red-500 focus:text-red-500">Privacidade</button>.
            </p>
          </div>
        </main>

        {/* Tab Bar / Navigation */}
        <BottomNav />

        {/* Screen Reader Announcements */}
        <div className="sr-only" role="status" aria-live="polite">
          Página de novo cadastro carregada.
        </div>
      </div>
    </div>
  );
};

export default App;
