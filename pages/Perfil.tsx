import React, { useState } from 'react';

const Perfil: React.FC = () => {
  const [nome, setNome] = useState('João Silva');
  const [whatsapp, setWhatsapp] = useState('(11) 9 9999-9999');
  const [telefone, setTelefone] = useState('');

  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [complemento, setComplemento] = useState('');
  const [numero, setNumero] = useState('');

  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);

  const handleCepChange = (value: string) => {
    const onlyNums = value.replace(/\D/g, '').slice(0, 8);
    if (!onlyNums) return setCep('');
    if (onlyNums.length <= 5) return setCep(onlyNums);
    setCep(`${onlyNums.slice(0, 5)}-${onlyNums.slice(5)}`);
  };

  // Máscara para telefone/whatsapp similar ao RegistrationForm
  const formatarTelefone = (valor: string): string => {
    const numeros = valor.replace(/\D/g, '').slice(0, 11);

    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 6) return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    if (numeros.length <= 10) return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 3)} ${numeros.slice(3, 7)}-${numeros.slice(7)}`;
  };

  const handleWhatsappChange = (value: string) => {
    setWhatsapp(formatarTelefone(value));
  };

  const handleTelefoneChange = (value: string) => {
    setTelefone(formatarTelefone(value));
  };

  const handleNumeroChange = (value: string) => {
    const onlyNums = value.replace(/\D/g, '').slice(0, 6);
    setNumero(onlyNums);
  };

  const handleUfChange = (value: string) => {
    const letters = value.replace(/[^a-zA-Z]/g, '').slice(0, 2).toUpperCase();
    setUf(letters);
  };

  const buscarCep = async () => {
    const clean = cep.replace(/\D/g, '');
    if (clean.length !== 8) {
      setCepError('CEP deve ter 8 dígitos');
      return;
    }

    setLoadingCep(true);
    setCepError(null);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
      if (!res.ok) throw new Error('Erro na requisição');
      const data = await res.json();
      if (data.erro) {
        setCepError('CEP não encontrado');
      } else {
        setLogradouro(data.logradouro || '');
        setBairro(data.bairro || '');
        setCidade(data.localidade || '');
        setUf(data.uf || '');
        setComplemento(data.complemento || '');
        setCepError(null);
      }
    } catch (err) {
      setCepError('Não foi possível buscar o CEP');
    } finally {
      setLoadingCep(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // apresentação apenas — aqui seria enviada a API
    alert('Dados do perfil atualizados (apresentação)');
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-2">Meu Perfil</h2>
      <p className="text-sm text-gray-500 mb-4">Gerencie seus dados e preferências.</p>

      <form onSubmit={handleSave} className="space-y-3 p-4 rounded-xl bg-white border scrollable-form">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Nome</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} className="w-full p-3 rounded-md border" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">WhatsApp</label>
          <input value={whatsapp} onChange={(e) => handleWhatsappChange(e.target.value)} className="w-full p-3 rounded-md border" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Telefone</label>
          <input value={telefone} onChange={(e) => handleTelefoneChange(e.target.value)} className="w-full p-3 rounded-md border" placeholder="(XX) XXXX-XXXX" />
        </div>

        <div className="grid grid-cols-3 gap-2 items-end">
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1">CEP</label>
            <input value={cep} onChange={(e) => handleCepChange(e.target.value)} className="w-full p-3 rounded-md border" placeholder="00000-000" />
            {cepError && <p className="text-xs text-red-500 mt-1">{cepError}</p>}
          </div>

          <div>
            <button type="button" onClick={buscarCep} disabled={loadingCep} className="w-full bg-[#ef4444] text-white py-2 px-3 rounded-md font-semibold">
              {loadingCep ? 'Buscando...' : 'Buscar'}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Endereço (logradouro)</label>
          <input value={logradouro} onChange={(e) => setLogradouro(e.target.value)} className="w-full p-3 rounded-md border" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Número</label>
          <input value={numero} onChange={(e) => handleNumeroChange(e.target.value)} className="w-full p-3 rounded-md border" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">UF</label>
          <input value={uf} onChange={(e) => handleUfChange(e.target.value)} className="w-full p-3 rounded-md border" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Bairro</label>
            <input value={bairro} onChange={(e) => setBairro(e.target.value)} className="w-full p-3 rounded-md border" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Cidade</label>
            <input value={cidade} onChange={(e) => setCidade(e.target.value)} className="w-full p-3 rounded-md border" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Complemento</label>
          <input value={complemento} onChange={(e) => setComplemento(e.target.value)} className="w-full p-3 rounded-md border" />
        </div>

        <div className="pt-2">
          <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-full font-bold">Salvar perfil</button>
        </div>
      </form>
    </section>
  );
};

export default Perfil;
