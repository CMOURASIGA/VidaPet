import React, { useState } from 'react';
import { Sparkles, Send, ArrowRight, CornerDownLeft, Bot } from 'lucide-react';
import { intelligenceService, suggestedQuestions, IntelligenceResponse } from '../../services/intelligenceService';
import { ActiveTab, Partner, Company, Contract } from '../../types';

interface IntelligenceTeaserProps {
  onNavigate: (tab: ActiveTab) => void;
  onSelectEntity: (type: 'partner' | 'company' | 'contract', id: string) => void;
}

export const IntelligenceTeaser: React.FC<IntelligenceTeaserProps> = ({
  onNavigate,
  onSelectEntity
}) => {
  const [query, setQuery] = useState('');
  const [activeResponse, setActiveResponse] = useState<IntelligenceResponse | null>(null);

  const handleAsk = (q: string) => {
    if (!q.trim()) return;
    const res = intelligenceService.ask(q);
    setActiveResponse(res);
  };

  return (
    <div className="bg-gradient-to-br from-[#073B42] to-[#0A4D57] rounded-2xl p-6 text-white border border-[#0A4D57] shadow-sm relative overflow-hidden">
      {/* Background motif */}
      <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-lg bg-purple-500/30 text-purple-200 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            </div>
            <h3 className="font-bold text-base text-white">
              VidaPet Intelligence
            </h3>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30">
              Simulação de IA
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Pergunte sobre contratos, rede credenciada, índices de adesão ou gargalos regionais.
          </p>
        </div>

        <button
          onClick={() => onNavigate('intelligence')}
          className="text-xs font-semibold text-emerald-300 hover:text-emerald-200 flex items-center gap-1 cursor-pointer self-start sm:self-auto"
        >
          Abrir módulo completo <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Suggested quick questions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestedQuestions.slice(0, 4).map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleAsk(q)}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs text-slate-200 text-left transition-colors cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Query Input */}
      <div className="relative mb-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk(query)}
          placeholder="Ex: Quais parceiros possuem pendências documentais?"
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#18B77A] focus:border-transparent pr-12"
        />
        <button
          onClick={() => handleAsk(query)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#18B77A] hover:bg-[#149e69] text-white rounded-lg transition-colors cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Response Box */}
      {activeResponse && (
        <div className="mt-4 p-4 rounded-xl bg-white/10 border border-white/15 animate-in fade-in zoom-in-95 duration-150 text-xs space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-purple-300 font-semibold">
              <Bot className="w-4 h-4" />
              <span>Resposta da Simulação:</span>
            </div>
            <span className="text-[10px] text-slate-400">
              Dados mockados do MVP Local
            </span>
          </div>

          <p className="text-white text-xs sm:text-sm font-medium leading-relaxed">
            {activeResponse.summary}
          </p>

          <div className="space-y-1 text-slate-200">
            {activeResponse.details.map((item, i) => (
              <p key={i} className="text-slate-300">{item}</p>
            ))}
          </div>

          {activeResponse.references && activeResponse.references.length > 0 && (
            <div className="pt-2 border-t border-white/10 flex flex-wrap gap-2 items-center">
              <span className="text-[11px] text-slate-300">Registros relacionados:</span>
              {activeResponse.references.map((ref) => (
                <button
                  key={ref.id}
                  onClick={() => onSelectEntity(ref.type, ref.id)}
                  className="px-2.5 py-1 rounded bg-[#18B77A]/20 hover:bg-[#18B77A]/30 text-emerald-300 border border-[#18B77A]/40 text-[11px] font-medium transition-colors cursor-pointer"
                >
                  Abrir {ref.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <p className="text-[10px] text-slate-400 mt-2">
        * As respostas deste MVP são geradas em tempo real a partir dos dados locais da demonstração.
      </p>
    </div>
  );
};
