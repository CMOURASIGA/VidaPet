import React from 'react';
import { Partner, Company, ActiveTab } from '../../types';
import { ExternalLink, Star, ArrowRight } from 'lucide-react';

interface TablesProps {
  recentPartners: Partner[];
  topCompanies: Company[];
  onSelectPartner: (partner: Partner) => void;
  onSelectCompany: (company: Company) => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const DashboardTables: React.FC<TablesProps> = ({
  recentPartners,
  topCompanies,
  onSelectPartner,
  onSelectCompany,
  onNavigate
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Últimos parceiros cadastrados */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Últimos parceiros cadastrados
            </h3>
            <p className="text-[11px] text-slate-500">Recentes na rede credenciada</p>
          </div>
          <button
            onClick={() => onNavigate('partners')}
            className="text-xs font-semibold text-[#18B77A] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Ver todos <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-xs text-left min-w-[540px]">
            <thead>
              <tr className="text-slate-400 font-medium border-b border-slate-100 pb-2">
                <th className="pb-2 pr-3 w-[28%]">Nome</th>
                <th className="pb-2 pr-3 w-[20%]">Categoria</th>
                <th className="pb-2 pr-4 pl-1 w-[22%]">Região</th>
                <th className="pb-2 pr-4 pl-2 w-[15%]">Entrada</th>
                <th className="pb-2 text-right w-[15%]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentPartners.slice(0, 5).map((p) => (
                <tr
                  key={p.id}
                  onClick={() => onSelectPartner(p)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td
                    className="py-2.5 pr-3 font-semibold text-slate-900 group-hover:text-[#18B77A] transition-colors truncate max-w-[150px]"
                    title={p.name}
                  >
                    {p.name}
                  </td>
                  <td
                    className="py-2.5 pr-3 text-slate-600 truncate max-w-[110px]"
                    title={p.category}
                  >
                    {p.category}
                  </td>
                  <td
                    className="py-2.5 pr-4 pl-1 text-slate-500 truncate max-w-[140px]"
                    title={p.region}
                  >
                    {p.region}
                  </td>
                  <td
                    className="py-2.5 pr-4 pl-2 font-mono text-[11px] text-slate-500 whitespace-nowrap"
                    title={`Data de entrada: ${p.entryDate}`}
                  >
                    {p.entryDate}
                  </td>
                  <td className="py-2.5 text-right whitespace-nowrap">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded inline-block ${
                        p.status === 'Ativo'
                          ? 'bg-emerald-50 text-emerald-700'
                          : p.status === 'Pendente documentação'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                      title={`Status de credenciamento: ${p.status}`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empresas com maior adesão */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Empresas com maior adesão
            </h3>
            <p className="text-[11px] text-slate-500">Engajamento corporativo ao benefício pet</p>
          </div>
          <button
            onClick={() => onNavigate('companies')}
            className="text-xs font-semibold text-[#18B77A] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Ver todas <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-400 font-medium border-b border-slate-100 pb-2">
                <th className="pb-2">Empresa</th>
                <th className="pb-2">Adesão</th>
                <th className="pb-2">Pets</th>
                <th className="pb-2 text-right">Plano</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topCompanies.slice(0, 5).map((c) => (
                <tr
                  key={c.id}
                  onClick={() => onSelectCompany(c)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td
                    className="py-2.5 font-semibold text-slate-900 group-hover:text-[#18B77A] transition-colors truncate max-w-[160px]"
                    title={c.name}
                  >
                    {c.name}
                  </td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden shrink-0">
                        <div
                          className="h-full bg-[#18B77A] rounded-full"
                          style={{ width: `${c.adhesionRate}%` }}
                        />
                      </div>
                      <span className="font-bold text-slate-800 tabular-nums">
                        {c.adhesionRate}%
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 text-slate-700 font-mono tabular-nums">
                    {c.linkedPets}
                  </td>
                  <td className="py-2.5 text-right">
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200"
                      title={`Plano corporativo contratado: ${c.plan}`}
                    >
                      {c.plan}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
