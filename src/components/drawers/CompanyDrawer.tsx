import React, { useState } from 'react';
import {
  X,
  Building2,
  Users,
  Heart,
  Calendar,
  DollarSign,
  TrendingUp,
  Mail,
  Phone,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { Company } from '../../types';

interface CompanyDrawerProps {
  company: Company | null;
  onClose: () => void;
  onAddNote?: (id: string, note: string) => void;
}

export const CompanyDrawer: React.FC<CompanyDrawerProps> = ({
  company,
  onClose,
  onAddNote
}) => {
  if (!company) return null;

  const [newNote, setNewNote] = useState('');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-slate-500 font-medium">
                  {company.code}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Plano {company.plan}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">{company.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{company.segment}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {company.daysToRenewal <= 60 && (
            <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Renovação próxima: vence em <strong>{company.daysToRenewal} dias</strong> ({company.renewalDate})
                </span>
              </div>
              <span className="font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                Atenção
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Main KPI figures */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-slate-400 block mb-1">Pets Vinculados</span>
              <span className="text-xl font-bold text-slate-900 tabular-nums">
                {company.linkedPets}
              </span>
              <span className="text-[11px] text-emerald-600 block mt-0.5">
                Ativos no benefício
              </span>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-slate-400 block mb-1">Taxa de Adesão</span>
              <span className="text-xl font-bold text-[#18B77A] tabular-nums">
                {company.adhesionRate}%
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">
                {company.adherentEmployees} de {company.eligibleEmployees}
              </span>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-slate-400 block mb-1">Faturamento Fictício</span>
              <span className="text-base font-bold text-slate-900 tabular-nums">
                R$ {company.monthlyRevenue.toLocaleString('pt-BR')},00
              </span>
              <span className="text-[11px] text-slate-500 block mt-0.5">/mês</span>
            </div>
          </div>

          {/* Adhesion progress bar */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-medium">
              <span className="text-slate-700">Adesão de Colaboradores</span>
              <span className="text-slate-900 font-bold">{company.adhesionRate}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#18B77A] rounded-full transition-all duration-300"
                style={{ width: `${company.adhesionRate}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>{company.adherentEmployees} aderentes</span>
              <span>{company.eligibleEmployees - company.adherentEmployees} não aderentes</span>
              <span>Total: {company.eligibleEmployees}</span>
            </div>
          </div>

          {/* Company Details */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Dados Corporativos & Contato</h4>
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl border border-slate-200 bg-white">
              <div>
                <span className="text-slate-400 block mb-0.5">CNPJ Fictício</span>
                <span className="font-mono font-medium text-slate-800">{company.cnpj}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Responsável RH</span>
                <span className="font-medium text-slate-800">{company.responsible}</span>
              </div>
              <div className="col-span-2 flex items-center gap-2 pt-2 border-t border-slate-100">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-700">{company.contactEmail}</span>
              </div>
              <div className="col-span-2 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-700">{company.contactPhone}</span>
              </div>
            </div>
          </div>

          {/* History */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-2">Histórico de Atividades</h4>
            {company.history.length > 0 ? (
              <div className="space-y-2">
                {company.history.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">{item.title}</span>
                      <span className="text-[10px] text-slate-400">{item.date}</span>
                    </div>
                    <span className="text-slate-500 text-[11px] mt-0.5 block">
                      Registrado por: {item.author}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic">Nenhum histórico adicional recente.</p>
            )}
          </div>

          {/* Observations */}
          {company.notes && (
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-blue-900">
              <span className="font-semibold block mb-1">Notas Operacionais</span>
              <p className="text-[11px] leading-relaxed">{company.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-400">Contrato: {company.contractId}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            Fechar detalhes
          </button>
        </div>
      </div>
    </div>
  );
};
