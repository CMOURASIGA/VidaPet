import React, { useState } from 'react';
import {
  X,
  Building,
  MapPin,
  Phone,
  Mail,
  Calendar,
  FileCheck,
  AlertCircle,
  Clock,
  Star,
  Check,
  ShieldCheck,
  Edit2
} from 'lucide-react';
import { Partner, PartnerStatus, DocStatus } from '../../types';

interface PartnerDrawerProps {
  partner: Partner | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: PartnerStatus) => void;
  onUpdateDocumentationStatus: (id: string, docStatus: DocStatus) => void;
}

export const PartnerDrawer: React.FC<PartnerDrawerProps> = ({
  partner,
  onClose,
  onUpdateStatus,
  onUpdateDocumentationStatus
}) => {
  if (!partner) return null;

  const [activeSubTab, setActiveSubTab] = useState<'geral' | 'operacao' | 'documentos' | 'historico'>('geral');

  const statusColors: Record<PartnerStatus, { bg: string; text: string; border: string }> = {
    'Ativo': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    'Em onboarding': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    'Pendente documentação': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    'Em análise': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    'Inativo': { bg: 'bg-slate-100', text: 'text-slate-600', border: 'border-slate-200' }
  };

  const docColors: Record<DocStatus, { bg: string }> = {
    'Válido': { bg: 'bg-emerald-100 text-emerald-800' },
    'Pendente': { bg: 'bg-rose-100 text-rose-800' },
    'Próximo do vencimento': { bg: 'bg-amber-100 text-amber-800' },
    'Vencido': { bg: 'bg-red-100 text-red-800' }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-slate-500 font-medium">
                  {partner.code}
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs font-medium text-slate-600">
                  {partner.category}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                {partner.name}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {partner.neighborhood}, {partner.city} - {partner.state} ({partner.region})
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick status bar */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Status atual:</span>
              <select
                value={partner.status}
                onChange={(e) => onUpdateStatus(partner.id, e.target.value as PartnerStatus)}
                className={`text-xs font-semibold px-2.5 py-1 rounded-md border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#18B77A]/40 ${
                  statusColors[partner.status].bg
                } ${statusColors[partner.status].text} ${statusColors[partner.status].border}`}
              >
                <option value="Ativo">Ativo</option>
                <option value="Em onboarding">Em onboarding</option>
                <option value="Pendente documentação">Pendente documentação</option>
                <option value="Em análise">Em análise</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-900">{partner.rating.toFixed(1)}</span>
              <span className="text-slate-400">· {partner.petsServed} pets atendidos</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 px-6 border-b border-slate-200 bg-white">
          {(['geral', 'operacao', 'documentos', 'historico'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`py-3 px-3 text-xs font-semibold border-b-2 capitalize transition-colors cursor-pointer ${
                activeSubTab === tab
                  ? 'border-[#18B77A] text-[#073B42]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab === 'operacao' ? 'Operação' : tab === 'historico' ? 'Histórico' : tab}
              {tab === 'documentos' && partner.documentationStatus === 'Pendente' && (
                <span className="ml-1.5 w-2 h-2 rounded-full bg-rose-500 inline-block" />
              )}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeSubTab === 'geral' && (
            <div className="space-y-5 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-slate-400 block mb-0.5">CNPJ / CPF</span>
                  <span className="font-mono font-medium text-slate-800">{partner.cnpjCpf}</span>
                </div>
                {partner.crmv && (
                  <div>
                    <span className="text-slate-400 block mb-0.5">CRMV Responsável</span>
                    <span className="font-mono font-medium text-slate-800">{partner.crmv}</span>
                  </div>
                )}
                <div>
                  <span className="text-slate-400 block mb-0.5">Responsável Legal</span>
                  <span className="font-medium text-slate-800">{partner.responsibleName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Entrada na Rede</span>
                  <span className="font-medium text-slate-800">{partner.entryDate}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Canais de Contato</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-700">{partner.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-700">{partner.email}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">Serviços Habilitados</h4>
                <div className="flex flex-wrap gap-1.5">
                  {partner.services.map((srv, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'operacao' && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <span className="text-slate-400 block mb-1">Pets Atendidos</span>
                  <span className="text-xl font-bold text-slate-900 tabular-nums">
                    {partner.petsServed}
                  </span>
                  <span className="text-[11px] text-emerald-600 block mt-0.5">
                    Histórico consolidado
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
                  <span className="text-slate-400 block mb-1">Última Atividade</span>
                  <span className="text-base font-bold text-slate-900">
                    {partner.lastActivityDate}
                  </span>
                  <span className={`text-[11px] block mt-0.5 ${partner.daysSinceLastActivity > 90 ? 'text-rose-600 font-semibold' : 'text-slate-500'}`}>
                    Há {partner.daysSinceLastActivity} dias
                  </span>
                </div>
              </div>

              {partner.daysSinceLastActivity > 90 && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                  <div>
                    <span className="font-semibold">Parceiro sem atendimentos recentes</span>
                    <p className="mt-0.5 text-[11px] text-amber-700">
                      Este estabelecimento não registra interações há mais de 90 dias. Recomenda-se contato de relacionamento ou alinhamento com a rede.
                    </p>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-semibold text-slate-900 block">Vínculo Contratual</span>
                <p className="text-slate-600">
                  Contrato de Credenciamento:{' '}
                  <span className="font-mono font-medium">{partner.contractId || 'Em confecção'}</span>
                </p>
                <p className="text-slate-600">
                  Região Operacional:{' '}
                  <span className="font-semibold">{partner.region}</span> ({partner.city})
                </p>
              </div>
            </div>
          )}

          {activeSubTab === 'documentos' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-semibold text-slate-900">Status Geral dos Documentos</span>
                <span
                  className={`px-2.5 py-0.5 rounded-md font-semibold ${
                    docColors[partner.documentationStatus].bg
                  }`}
                >
                  {partner.documentationStatus}
                </span>
              </div>

              {partner.documentationStatus === 'Pendente' && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-between">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <div>
                      <p className="font-semibold">Documentação pendente detectada</p>
                      <p className="text-[11px] text-rose-700 mt-0.5">
                        Simule a regularização documental e aprovação do credenciamento.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => onUpdateDocumentationStatus(partner.id, 'Válido')}
                    className="px-3 py-1.5 bg-[#18B77A] hover:bg-[#149e69] text-white font-semibold rounded-lg shrink-0 transition-colors shadow-xs cursor-pointer"
                  >
                    Aprovar e Validar
                  </button>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-semibold text-slate-800">Arquivos e Certidões Cadastradas</h4>
                {partner.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                        <FileCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{doc.name}</p>
                        <p className="text-[11px] text-slate-400">
                          Atualizado em: {doc.updatedAt}
                          {doc.expiresAt && ` · Expira em: ${doc.expiresAt}`}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        docColors[doc.status].bg
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'historico' && (
            <div className="space-y-3 text-xs">
              <h4 className="font-semibold text-slate-900 mb-2">Linha do Tempo Operacional</h4>
              <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {partner.history.map((h) => (
                  <div key={h.id} className="relative group">
                    <span className="absolute -left-6 top-1.5 w-2.5 h-2.5 rounded-full bg-[#18B77A] ring-4 ring-white" />
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-semibold text-slate-900">{h.title}</span>
                        <span className="text-[10px] text-slate-400">{h.date}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        Registrado por: <strong>{h.author}</strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer footer */}
        <div className="p-4 px-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <span className="text-slate-400">Edições salvas automaticamente</span>
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
