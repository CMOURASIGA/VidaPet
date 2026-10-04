import React, { useState } from 'react';
import { OperationalEvent, Opportunity, ActiveTab } from '../types';
import {
  Activity,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Clock,
  Compass,
  TrendingUp,
  FileCheck,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

interface OperationsViewProps {
  events: OperationalEvent[];
  opportunities: Opportunity[];
  onResolveEvent: (id: string) => void;
  onNavigateWithFilter: (tab: ActiveTab, filter?: string) => void;
  onSelectEntity: (type: 'partner' | 'company' | 'contract', id: string) => void;
}

export const OperationsView: React.FC<OperationsViewProps> = ({
  events,
  opportunities,
  onResolveEvent,
  onNavigateWithFilter,
  onSelectEntity
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Documento', 'Contrato', 'Parceiro', 'Pendência'];

  const filteredEvents = events.filter((e) => {
    if (selectedCategory === 'Todas') return true;
    return e.category === selectedCategory;
  });

  return (
    <div className="space-y-7 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Acompanhamento Operacional & Oportunidades
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Monitoramento de pendências ativas, auditorias da rede e vetores de expansão regional.
        </p>
      </div>

      {/* Oportunidades Identificadas (Section 25 of SPEC 00) */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="font-bold text-slate-900 text-sm">
              Oportunidades identificadas na operação
            </h2>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Análises para estímulo de descoberta
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                    {opp.category}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    Impacto {opp.impactLevel}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#18B77A] transition-colors">
                  {opp.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {opp.situation}
                </p>

                <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Indicador Chave
                  </span>
                  <p className="text-xs font-semibold text-slate-800">
                    {opp.metric}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Ação sugerida:</span>
                  <span className="text-[11px] text-slate-700 font-medium line-clamp-1">
                    {opp.possibleAction}
                  </span>
                </div>
                {opp.region && (
                  <button
                    onClick={() => onNavigateWithFilter('partners', 'oceanica')}
                    className="p-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors shrink-0 ml-2 cursor-pointer"
                    title="Filtrar região"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operações & Pendências (Section 24 of SPEC 00) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Fila de Acompanhamento Operacional
            </h3>
            <p className="text-xs text-slate-500">
              Eventos que demandam atenção ou regularização da equipe
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#073B42] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                event.resolved ? 'bg-slate-50/50 opacity-60' : 'hover:bg-slate-50/80'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    event.priority === 'critica'
                      ? 'bg-rose-100 text-rose-700'
                      : event.priority === 'alta'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      {event.title}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.2 rounded uppercase ${
                        event.priority === 'critica'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {event.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                    <span>Data: {event.date}</span>
                    {event.entityName && <span>Entidade: <strong>{event.entityName}</strong></span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {event.entityId && event.entityType && (
                  <button
                    onClick={() => onSelectEntity(event.entityType!, event.entityId!)}
                    className="px-3 py-1.5 text-xs font-semibold text-[#073B42] hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    Ver detalhes
                  </button>
                )}
                {!event.resolved && (
                  <button
                    onClick={() => onResolveEvent(event.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-[#18B77A] bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors cursor-pointer"
                  >
                    Marcar resolvido
                  </button>
                )}
                {event.resolved && (
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Resolvido
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
