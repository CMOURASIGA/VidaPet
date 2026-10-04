import React, { useState, useMemo } from 'react';
import { Company } from '../types';
import {
  Search,
  Building2,
  Users,
  Heart,
  TrendingUp,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

interface CompaniesViewProps {
  companies: Company[];
  onSelectCompany: (company: Company) => void;
}

export const CompaniesView: React.FC<CompaniesViewProps> = ({
  companies,
  onSelectCompany
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('Todos');
  const [planFilter, setPlanFilter] = useState('Todos');

  const segments = ['Todos', ...Array.from(new Set(companies.map((c) => c.segment)))];
  const plans = ['Todos', 'Essencial', 'Standard', 'Premium', 'Enterprise'];

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.cnpj.includes(searchTerm) ||
        c.responsible.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSeg = segmentFilter === 'Todos' || c.segment === segmentFilter;
      const matchesPlan = planFilter === 'Todos' || c.plan === planFilter;

      return matchesSearch && matchesSeg && matchesPlan;
    });
  }, [companies, searchTerm, segmentFilter, planFilter]);

  const totalEligible = companies.reduce((a, b) => a + b.eligibleEmployees, 0);
  const totalAdherent = companies.reduce((a, b) => a + b.adherentEmployees, 0);
  const totalPets = companies.reduce((a, b) => a + b.linkedPets, 0);
  const overallRate = totalEligible > 0 ? Math.round((totalAdherent / totalEligible) * 100) : 0;

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Empresas Corporativas
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 tabular-nums">
              {companies.length} clientes B2B
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Acompanhamento de planos empresariais, elegibilidade, adesão e pets vinculados.
          </p>
        </div>
      </div>

      {/* Aggregate metric strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-slate-400 text-xs block mb-1">Colaboradores Elegíveis</span>
          <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {totalEligible.toLocaleString('pt-BR')}
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">Base contratada B2B</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-slate-400 text-xs block mb-1">Colaboradores Aderentes</span>
          <span className="text-2xl font-extrabold text-[#18B77A] tabular-nums">
            {totalAdherent.toLocaleString('pt-BR')}
          </span>
          <span className="text-[11px] text-emerald-600 block mt-0.5 font-medium">
            {overallRate}% de taxa global
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-slate-400 text-xs block mb-1">Pets Vinculados</span>
          <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
            {totalPets.toLocaleString('pt-BR')}
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5">Cobertos na rede</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-slate-400 text-xs block mb-1">Renovação Imediata</span>
          <span className="text-2xl font-extrabold text-amber-600 tabular-nums">
            1 empresa
          </span>
          <span className="text-[11px] text-amber-700 block mt-0.5 font-medium">
            Alfa Tecnologia (42 dias)
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por empresa, CNPJ ou gestor de RH..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#18B77A]/30 focus:border-[#18B77A]"
          />
        </div>

        <select
          value={segmentFilter}
          onChange={(e) => setSegmentFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 cursor-pointer"
        >
          {segments.map((s) => (
            <option key={s} value={s}>Segmento: {s}</option>
          ))}
        </select>

        <select
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 cursor-pointer"
        >
          {plans.map((p) => (
            <option key={p} value={p}>Plano: {p}</option>
          ))}
        </select>

        {(searchTerm || segmentFilter !== 'Todos' || planFilter !== 'Todos') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSegmentFilter('Todos');
              setPlanFilter('Todos');
            }}
            className="text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer shrink-0"
          >
            Limpar
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold">
                <th className="py-3 px-4">Empresa</th>
                <th className="py-3 px-3">Segmento</th>
                <th className="py-3 px-3">Elegíveis</th>
                <th className="py-3 px-3">Aderentes</th>
                <th className="py-3 px-3">Taxa de Adesão</th>
                <th className="py-3 px-3">Pets</th>
                <th className="py-3 px-3">Plano</th>
                <th className="py-3 px-3">Renovação</th>
                <th className="py-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCompanies.map((company) => {
                const isUrgent = company.daysToRenewal <= 60;
                return (
                  <tr
                    key={company.id}
                    onClick={() => onSelectCompany(company)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4 font-bold text-slate-900 group-hover:text-[#18B77A] transition-colors">
                      <div>
                        <span>{company.name}</span>
                        <span className="block text-[11px] text-slate-400 font-normal">
                          {company.responsible}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-slate-600">
                      {company.segment}
                    </td>

                    <td className="py-3 px-3 font-mono tabular-nums text-slate-700">
                      {company.eligibleEmployees.toLocaleString('pt-BR')}
                    </td>

                    <td className="py-3 px-3 font-mono tabular-nums font-semibold text-slate-900">
                      {company.adherentEmployees.toLocaleString('pt-BR')}
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden shrink-0">
                          <div
                            className={`h-full rounded-full ${
                              company.adhesionRate >= 50
                                ? 'bg-[#18B77A]'
                                : company.adhesionRate >= 35
                                ? 'bg-blue-500'
                                : 'bg-slate-400'
                            }`}
                            style={{ width: `${company.adhesionRate}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-900 tabular-nums">
                          {company.adhesionRate}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3 font-mono tabular-nums font-bold text-[#073B42]">
                      {company.linkedPets}
                    </td>

                    <td className="py-3 px-3">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        {company.plan}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        {isUrgent && <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                        <span
                          className={`font-medium ${
                            isUrgent ? 'text-amber-700 font-bold' : 'text-slate-600'
                          }`}
                        >
                          {company.daysToRenewal} dias
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        {company.renewalDate}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                          company.status === 'Ativo'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {company.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3 px-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-slate-500 text-xs">
          <span>Exibindo <strong>{filteredCompanies.length}</strong> de {companies.length} empresas corporativas</span>
          <span>Clique em qualquer linha para abrir os detalhes</span>
        </div>
      </div>
    </div>
  );
};
