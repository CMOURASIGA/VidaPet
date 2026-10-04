import React, { useState, useMemo } from 'react';
import { Partner, PartnerCategory, PartnerStatus, DocStatus } from '../types';
import {
  Search,
  Filter,
  Star,
  MapPin,
  FileCheck,
  AlertCircle,
  Clock,
  RotateCcw
} from 'lucide-react';

interface PartnersViewProps {
  partners: Partner[];
  onSelectPartner: (partner: Partner) => void;
  initialFilter?: string;
}

export const PartnersView: React.FC<PartnersViewProps> = ({
  partners,
  onSelectPartner,
  initialFilter
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(
    initialFilter === 'pendente' ? 'Pendente documentação' : initialFilter === 'inativo' ? 'Inativo' : 'Todos'
  );
  const [categoryFilter, setCategoryFilter] = useState<string>('Todas');
  const [regionFilter, setRegionFilter] = useState<string>('Todas');

  const categories = ['Todas', 'Clínica Veterinária', 'Pet Shop', 'Hospital Veterinário', 'Veterinário Autônomo', 'Hotel / Creche', 'ONG', 'Outros'];
  const regions = ['Todas', 'Niterói', 'Zona Sul', 'Barra', 'Zona Norte', 'Região Oceânica', 'São Gonçalo', 'Baixada', 'Centro'];

  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      // Search
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.city.toLowerCase().includes(searchTerm.toLowerCase());

      // Status
      let matchesStatus = true;
      if (statusFilter === 'Pendente documentação') {
        matchesStatus = p.status === 'Pendente documentação' || p.documentationStatus === 'Pendente';
      } else if (statusFilter === 'Inativo') {
        matchesStatus = p.status === 'Inativo' || p.daysSinceLastActivity > 90;
      } else if (statusFilter !== 'Todos') {
        matchesStatus = p.status === statusFilter;
      }

      // Category
      const matchesCat = categoryFilter === 'Todas' || p.category === categoryFilter;

      // Region
      const matchesRegion = regionFilter === 'Todas' || p.region === regionFilter;

      return matchesSearch && matchesStatus && matchesCat && matchesRegion;
    });
  }, [partners, searchTerm, statusFilter, categoryFilter, regionFilter]);

  const totalCadastrados = partners.length;
  const totalAtivos = partners.filter((p) => p.status === 'Ativo').length;
  const totalInativos = partners.filter((p) => p.status === 'Inativo' || p.daysSinceLastActivity > 90).length;

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('Todos');
    setCategoryFilter('Todas');
    setRegionFilter('Todas');
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Parceiros Credenciados
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 tabular-nums">
              {totalCadastrados} parceiros cadastrados
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 tabular-nums">
              {totalAtivos} parceiros ativos
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 tabular-nums">
              {totalInativos} parceiros inativos
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Gerenciamento da rede credenciada de clínicas, hospitais, pet shops e cuidadores.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, bairro, código ou cidade..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#18B77A]/30 focus:border-[#18B77A]"
            />
          </div>

          {/* Select Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#18B77A]/30"
          >
            {categories.map((c) => (
              <option key={c} value={c}>Categoria: {c}</option>
            ))}
          </select>

          {/* Select Region */}
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#18B77A]/30"
          >
            {regions.map((r) => (
              <option key={r} value={r}>Região: {r}</option>
            ))}
          </select>
        </div>

        {/* Status segmented filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 text-[11px] mr-1">Status:</span>
          {['Todos', 'Ativo', 'Pendente documentação', 'Em onboarding', 'Inativo'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#073B42] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              {st}
              {st === 'Pendente documentação' && (
                <span className="ml-1.5 px-1.5 py-0.2 bg-amber-500 text-white rounded-full text-[10px] font-bold">
                  {partners.filter((p) => p.documentationStatus === 'Pendente').length}
                </span>
              )}
            </button>
          ))}

          {(searchTerm || statusFilter !== 'Todos' || categoryFilter !== 'Todas' || regionFilter !== 'Todas') && (
            <button
              onClick={clearFilters}
              className="ml-auto text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold">
                <th className="py-3 px-4">Estabelecimento</th>
                <th className="py-3 px-3">Categoria</th>
                <th className="py-3 px-3">Localização</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Documentação</th>
                <th className="py-3 px-3">Última Atividade</th>
                <th className="py-3 px-3 text-right">Avaliação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPartners.length > 0 ? (
                filteredPartners.map((partner) => (
                  <tr
                    key={partner.id}
                    onClick={() => onSelectPartner(partner)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-600">
                          {partner.code}
                        </span>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-[#18B77A] transition-colors">
                            {partner.name}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Resp: {partner.responsibleName}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-slate-700 font-medium">
                      {partner.category}
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1 text-slate-600">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{partner.neighborhood}, {partner.city}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        Região {partner.region}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          partner.status === 'Ativo'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : partner.status === 'Pendente documentação'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : partner.status === 'Inativo'
                            ? 'bg-slate-100 text-slate-600 border border-slate-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {partner.status}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          partner.documentationStatus === 'Válido'
                            ? 'bg-emerald-100 text-emerald-800'
                            : partner.documentationStatus === 'Pendente'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {partner.documentationStatus}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-slate-600">
                      <div>{partner.lastActivityDate}</div>
                      <span
                        className={`text-[10px] block ${
                          partner.daysSinceLastActivity > 90
                            ? 'text-rose-600 font-semibold'
                            : 'text-slate-400'
                        }`}
                      >
                        Há {partner.daysSinceLastActivity} dias
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <div className="inline-flex items-center gap-1 text-slate-800 font-bold tabular-nums">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{partner.rating.toFixed(1)}</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold text-slate-700">
                      Nenhum parceiro encontrado para os filtros utilizados.
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Tente alterar os termos de busca ou remover os filtros de categoria e status.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="mt-3 px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 cursor-pointer"
                    >
                      Limpar filtros
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 px-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-slate-500 text-xs">
          <span>Exibindo <strong>{filteredPartners.length}</strong> de {partners.length} estabelecimentos</span>
          <span>Clique em qualquer linha para abrir os detalhes</span>
        </div>
      </div>
    </div>
  );
};
