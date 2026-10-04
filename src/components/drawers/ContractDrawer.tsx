import React from 'react';
import {
  X,
  FileText,
  Calendar,
  Clock,
  User,
  Shield,
  DollarSign,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { Contract } from '../../types';

interface ContractDrawerProps {
  contract: Contract | null;
  onClose: () => void;
  onUpdateStatus?: (id: string, status: Contract['status']) => void;
}

export const ContractDrawer: React.FC<ContractDrawerProps> = ({
  contract,
  onClose,
  onUpdateStatus
}) => {
  if (!contract) return null;

  const isUrgent = contract.daysToExpiry <= 60;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-slate-500 font-medium">
                  {contract.code}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {contract.entityType}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">{contract.entityName}</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Vigência: {contract.startDate} até {contract.endDate}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Expiry countdown banner */}
          <div
            className={`mt-4 p-3.5 rounded-xl border flex items-center justify-between text-xs ${
              contract.daysToExpiry <= 30
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : isUrgent
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isUrgent ? (
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              )}
              <div>
                <span className="font-bold">
                  {contract.daysToExpiry <= 0
                    ? 'Contrato Vencido'
                    : `Vence em ${contract.daysToExpiry} dias`}
                </span>
                <p className="text-[11px] opacity-90 mt-0.5">
                  Data limite de vigência: {contract.endDate}
                </p>
              </div>
            </div>
            <span className="font-semibold px-2 py-1 rounded bg-white/60 shadow-2xs">
              {contract.status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-slate-400 block mb-1">Início da Vigência</span>
              <span className="text-base font-bold text-slate-800">{contract.startDate}</span>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-slate-400 block mb-1">Término Previsto</span>
              <span className="text-base font-bold text-slate-800">{contract.endDate}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-semibold text-slate-900">Termos Operacionais</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Gestor Responsável</span>
                <span className="font-medium text-slate-800">{contract.responsible}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Aviso Prévio Obrigatório</span>
                <span className="font-medium text-slate-800">
                  {contract.renewalNoticePeriodDays} dias de antecedência
                </span>
              </div>
              {contract.value !== undefined && contract.value > 0 && (
                <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Valor Mensal Fictício</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    R$ {contract.value.toLocaleString('pt-BR')},00
                  </span>
                </div>
              )}
            </div>
          </div>

          {contract.notes && (
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-amber-900">
              <span className="font-semibold block mb-1">Observações de Renovação</span>
              <p className="text-[11px] leading-relaxed">{contract.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-400">ID: {contract.id}</span>
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
