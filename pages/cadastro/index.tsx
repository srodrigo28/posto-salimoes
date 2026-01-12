import React, { useState } from 'react';
import RegistrationForm from '../../components/RegistrationForm';

type Props = {
  onRegistered?: () => void;
};

const Cadastro: React.FC<Props> = ({ onRegistered }) => {
  const [formData, setFormData] = useState({ nome: '', nascimento: '', whatsapp: '', placa: '', km: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você chamaria a API para salvar o cadastro
    alert('Cadastro enviado com sucesso! 🎉');
    if (onRegistered) onRegistered();
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-2">Crie sua conta</h2>
      <p className="text-sm text-gray-500 mb-4">Complete seus dados para começar a acumular pontos.</p>
      <div className="scrollable-form p-2 rounded-md">
        <RegistrationForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default Cadastro;
