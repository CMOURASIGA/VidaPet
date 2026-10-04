import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ArrowRight,
  Database,
  Building2,
  FileText,
  AlertCircle,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { intelligenceService, suggestedQuestions, IntelligenceResponse } from '../services/intelligenceService';

interface IntelligenceViewProps {
  onSelectEntity: (type: 'partner' | 'company' | 'contract', id: string) => void;
}

export const IntelligenceView: React.FC<IntelligenceViewProps> = ({ onSelectEntity }) => {
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; text: string; data?: IntelligenceResponse }[]
  >([
    {
      role: 'assistant',
      text: 'Olá, André! Sou o assistente de inteligência operacional da demonstração do VidaPet Operations Hub. Você pode me fazer perguntas em linguagem natural sobre contratos, documentações pendentes, expansão regional e adesão corporativa da base local.'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg = { role: 'user' as const, text: queryText };
    const response = intelligenceService.ask(queryText);
    const botMsg = {
      role: 'assistant' as const,
      text: response.summary,
      data: response
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              VidaPet Intelligence
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              Simulação de IA
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Exploração conversacional de métricas, alertas e dados da operação local.
          </p>
        </div>

        <div className="text-left sm:text-right text-[11px] text-slate-500 font-medium bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-200/60">
          Base local: <strong className="text-slate-700">52 parceiros · 15 empresas · 28 contratos</strong>
        </div>
      </div>

      {/* Suggested Questions Grid */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Perguntas Frequentes da Operação
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-purple-50 hover:border-purple-200 border border-slate-100 text-xs text-slate-700 font-medium transition-all cursor-pointer flex items-center justify-between group"
            >
              <span className="line-clamp-2">{q}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-purple-600 shrink-0 ml-1.5" />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs flex flex-col h-[460px] relative overflow-hidden">
        {/* Messages feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.role === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#073B42] text-white rounded-br-xs'
                    : 'bg-slate-50 border border-slate-200/80 text-slate-800 rounded-bl-xs'
                }`}
              >
                <p className="font-medium">{m.text}</p>

                {m.data && (
                  <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-2 text-xs">
                    {m.data.details && (
                      <div className="space-y-1 text-slate-600">
                        {m.data.details.map((d, i) => (
                          <div key={i}>{d}</div>
                        ))}
                      </div>
                    )}

                    {m.data.references && m.data.references.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5 items-center">
                        <span className="text-[11px] text-slate-400 font-medium">
                          Abrir detalhes:
                        </span>
                        {m.data.references.map((ref) => (
                          <button
                            key={ref.id}
                            onClick={() => onSelectEntity(ref.type, ref.id)}
                            className="px-2 py-0.5 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-medium text-[11px] transition-colors cursor-pointer"
                          >
                            {ref.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {m.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 font-bold text-xs">
                  A
                </div>
              )}
            </div>
          ))}

          {/* Initial state guidance card to avoid awkward blank space */}
          {messages.length === 1 && (
            <div className="mt-2 p-3.5 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-purple-900 flex items-start gap-2.5">
              <MessageSquare className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Como explorar a base local:</span>
                <p className="text-[11px] text-purple-700 mt-0.5">
                  Clique em qualquer pergunta frequente acima ou digite no campo abaixo para consultar contratos a vencer, parceiros com documentação pendente ou regiões de expansão.
                </p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input box - Sticky bottom */}
        <div className="sticky bottom-0 p-3.5 border-t border-slate-200/80 bg-white/95 backdrop-blur-xs rounded-b-2xl z-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua pergunta sobre a operação..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white focus:border-transparent transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors shadow-xs shrink-0 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" /> Enviar
            </button>
          </form>
          <p className="text-[10px] text-slate-400 mt-2 text-center">
            * As respostas desta simulação são calculadas a partir dos dados locais mockados deste MVP.
          </p>
        </div>
      </div>
    </div>
  );
};
