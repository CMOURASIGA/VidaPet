import React, { useState, useMemo } from 'react';
import { Contract } from '../types';
import {
  Search,
  FileText,
  Clock,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface ContractsViewProps {
  contracts: Contract[];
  onSelectContract: (contract: Contract) => void;
  initialFilter?: string;
}

export const ContractsView: React.FC<ContractsViewProps> = ({
  contracts,
  onSelectContract,
  initialFilter
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expiryFilter, setExpiryFilter] = useState(
    initialFilter === 'proximos-60' ? '31-60 dias' : 'Todos'
  );
  const [typeFilter, setTypeFilter] = useState('Todos');

  const filteredContracts = useMemo(() => {
    return contracts.filter((c) => {
      const matchesSearch =
        c.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.responsible.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === 'Todos' || c.entityType === typeFilter;

      let matchesExpiry = true;
      if (expiryFilter === '0-30 dias') {
        matchesExpiry = c.daysToExpiry <= 30 && c.daysToExpiry >= 0;
      } else if (expiryFilter === '31-60 dias') {
        matchesExpiry = c.daysToExpiry >= 31 && c.daysToExpiry <= 60;
      } else if (expiryFilter === '61-90 dias') {
        matchesExpiry = c.daysToExpiry >= 61 && c.daysToExpiry <= 90;
      } else if (expiryFilter === '90+ dias') {
        matchesExpiry = c.daysToExpiry > 90;
      }

      return matchesSearch && matchesType && matchesExpiry;
    });
  }, [contracts, searchTerm, expiryFilter, typeFilter]);

  const expiring60Count = contracts.filter((c) => c.daysToExpiry <= 60).length;

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Gestão de Contratos
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 tabular-nums">
              {contracts.length} contratos vigentes
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Acompanhamento de vigência, renovações antecipadas e termos de credenciamento.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por entidade contratada, código ou gestor..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#18B77A]/30 focus:border-[#18B77A]"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 cursor-pointer"
          >
            <option value="Todos">Tipo: Todos</option>
            <option value="Parceiro">Parceiro</option>
            <option value="Corporativo">Corporativo</option>
            <option value="Fornecedor">Fornecedor</option>
          </select>
        </div>

        {/* Expiry breakdown tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 text-[11px] mr-1">Vencimento:</span>
          {['Todos', '0-30 dias', '31-60 dias', '61-90 dias', '90+ dias'].map((exp) => (
            <button
              key={exp}
              onClick={() => setExpiryFilter(exp)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                expiryFilter === exp
                  ? 'bg-[#073B42] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              {exp}
              {exp === '31-60 dias' && (
                <span className="ml-1.5 px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[10px] font-bold">
                  3
                </span>
              )}
              {exp === '0-30 dias' && (
                <span className="ml-1.5 px-1.5 py-0.2 bg-rose-500 text-white rounded-full text-[10px] font-bold">
                  1
                </span>
              )}
            </button>
          ))}

          {(searchTerm || expiryFilter !== 'Todos' || typeFilter !== 'Todos') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setExpiryFilter('Todos');
                setTypeFilter('Todos');
              }}
              className="ml-auto text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Contracts Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold">
                <th className="py-3 px-4">Contrato</th>
                <th className="py-3 px-3">Entidade Vinculada</th>
                <th className="py-3 px-3">Tipo</th>
                <th className="py-3 px-3">Início</th>
                <th className="py-3 px-3">Vencimento</th>
                <th className="py-3 px-3">Prazo</th>
                <th className="py-3 px-3">Responsável</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContracts.map((contract) => {
                const isUrgent = contract.daysToExpiry <= 60;
                return (
                  <tr
                    key={contract.id}
                    onClick={() => onSelectContract(contract)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 group-hover:text-[#18B77A] transition-colors">
                      {contract.code}
                    </td>

                    <td className="py-3 px-3 font-semibold text-slate-900 truncate max-w-[200px]">
                      {contract.entityName}
                    </td>

                    <td className="py-3 px-3">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {contract.entityType}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-slate-600">
                      {contract.startDate}
                    </td>

                    <td className="py-3 px-3 font-medium text-slate-900">
                      {contract.endDate}
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        {isUrgent && <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                        <span
                          className={`font-semibold tabular-nums ${
                            contract.daysToExpiry <= 30
                              ? 'text-rose-600'
                              : isUrgent
                              ? 'text-amber-600'
                              : 'text-slate-700'
                          }`}
                        >
                          {contract.daysToExpiry} dias
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-slate-600 truncate max-w-[140px]">
                      {contract.responsible}
                    </td>

                    <td className="py-3 px-3 text-right">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          contract.status === 'Ativo'
                            ? 'bg-emerald-50 text-emerald-700'
                            : contract.status === 'Em renovação'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {contract.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3 px-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-slate-500 text-xs">
          <span>Exibindo <strong>{filteredContracts.length}</strong> de {contracts.length} contratos</span>
          <span>Clique em qualquer linha para abrir os detalhes</span>
        </div>
      </div>
    </div>
  );
};
