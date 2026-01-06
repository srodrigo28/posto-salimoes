
import React from 'react';
import { User, Calendar, Phone, Car, Gauge, ArrowRight } from 'lucide-react';

interface FormProps {
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const InputGroup: React.FC<{
  label: string;
  id: string;
  icon: React.ReactNode;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  colSpan?: string;
}> = ({ label, id, icon, type = 'text', placeholder, value, onChange, colSpan = "col-span-2" }) => (
  <div className={colSpan}>
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1 ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
        {icon}
      </div>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent border-2 focus:border-red-400 focus:bg-white rounded-2xl text-gray-900 placeholder-gray-400 shadow-sm transition-all text-base"
        required
      />
    </div>
  </div>
);

const RegistrationForm: React.FC<FormProps> = ({ formData, setFormData, onSubmit }) => {
  const updateField = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
      <InputGroup 
        label="Nome completo" 
        id="nome" 
        icon={<User size={20} />} 
        placeholder="Digite seu nome"
        value={formData.nome}
        onChange={(v) => updateField('nome', v)}
      />
      
      <InputGroup 
        label="Data nascimento" 
        id="nascimento" 
        icon={<Calendar size={20} />} 
        type="date"
        placeholder="00/00/0000"
        value={formData.nascimento}
        onChange={(v) => updateField('nascimento', v)}
        colSpan="col-span-1"
      />

      <InputGroup 
        label="WhatsApp" 
        id="whatsapp" 
        icon={<Phone size={20} />} 
        type="tel"
        placeholder="(00) 0 0000-0000"
        value={formData.whatsapp}
        onChange={(v) => updateField('whatsapp', v)}
        colSpan="col-span-1"
      />

      <InputGroup 
        label="Placa do Veículo" 
        id="placa" 
        icon={<Car size={20} />} 
        placeholder="ABC-1234"
        value={formData.placa}
        onChange={(v) => updateField('placa', v)}
      />

      <InputGroup 
        label="Km Atual" 
        id="km" 
        icon={<Gauge size={20} />} 
        type="number"
        placeholder="000.000"
        value={formData.km}
        onChange={(v) => updateField('km', v)}
      />

      <button
        type="submit"
        className="col-span-2 mt-4 bg-[#ef4444] text-white py-4 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-red-600 active:scale-[0.98] transition-all shadow-lg focus:ring-4 focus:ring-red-200"
      >
        FINALIZAR CADASTRO
        <ArrowRight size={22} strokeWidth={3} />
      </button>
    </form>
  );
};

export default RegistrationForm;
