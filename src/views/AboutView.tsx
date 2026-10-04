import React from 'react';
import {
  Info,
  RotateCcw,
  Database,
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Activity,
  Sparkles,
  ShieldCheck,
  Compass,
  ArrowRight
} from 'lucide-react';
import { ActiveTab } from '../types';

interface AboutViewProps {
  onOpenResetModal: () => void;
  onOpenDisclaimer: () => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onOpenResetModal,
  onOpenDisclaimer,
  onNavigate
}) => {
  const exploreCards = [
    {
      tab: 'dashboard' as ActiveTab,
      icon: LayoutDashboard,
      title: 'Dashboard',
      subtitle: 'Visão geral da operação',
      desc: 'KPIs consolidados, distribuição por categoria e região, gráficos de evolução e bloco de prioridades.'
    },
    {
      tab: 'partners' as ActiveTab,
      icon: Users,
      title: 'Parceiros',
      subtitle: 'Acompanhamento da rede',
      desc: '52 estabelecimentos credenciados, status de CRMV, alvarás sanitários e histórico de atendimento.'
    },
    {
      tab: 'companies' as ActiveTab,
      icon: Building2,
      title: 'Empresas',
      subtitle: 'Operação corporativa',
      desc: '15 clientes B2B, 8.450 elegíveis, 4.380 pets cadastrados, planos contratados e taxas de adesão.'
    },
    {
      tab: 'contracts' as ActiveTab,
      icon: FileText,
      title: 'Contratos',
      subtitle: 'Renovações e vigências',
      desc: '28 contratos mapeados por faixa de vencimento (0-30, 31-60, 61-90 e 90+ dias).'
    },
    {
      tab: 'operations' as ActiveTab,
      icon: Activity,
      title: 'Operações',
      subtitle: 'Pendências e atividades',
      desc: 'Linha de eventos operacionais, regularizações sanitárias e oportunidades estruturadas.'
    },
    {
      tab: 'intelligence' as ActiveTab,
      icon: Sparkles,
      title: 'Intelligence',
      subtitle: 'Exploração dos dados por perguntas',
      desc: 'Consulta conversacional orientada ao dataset do MVP para responder dúvidas executivas.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Title & Concept */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-100">
          <Info className="w-3.5 h-3.5 text-[#18B77A]" />
          <span>Documento Conceitual do Projeto</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Sobre este MVP
        </h1>

        <div className="mt-4 space-y-3 text-sm text-slate-600 leading-relaxed">
          <p className="font-medium text-slate-800">
            Este ambiente apresenta um conceito inicial de uma plataforma de gestão operacional para a VidaPet.
          </p>
          <p>
            O objetivo é demonstrar como parceiros, empresas corporativas, contratos, indicadores, pendências e oportunidades poderiam ser acompanhados em um único ambiente.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-1">
            <p><strong>Aviso importante:</strong> Todos os dados utilizados nesta demonstração são fictícios.</p>
            <p>
              Este MVP não representa um produto final. Ele existe para apoiar uma conversa de descoberta e ajudar a identificar quais funcionalidades realmente fazem sentido para a operação da VidaPet.
            </p>
          </div>
        </div>

        {/* Guidance */}
        <div className="mt-6 pt-5 border-t border-slate-100 text-xs sm:text-sm text-slate-700 space-y-2">
          <h3 className="font-bold text-slate-900 text-sm">
            Orientação ao Cliente
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Navegue livremente pelo ambiente. Você pode pesquisar, filtrar, abrir registros, validar documentos e realizar pequenas alterações. Durante nossa próxima conversa, vamos utilizar sua experiência com este MVP para entender o que faz sentido manter, retirar, modificar ou acrescentar.
          </p>
        </div>
      </div>

      {/* O que explorar */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          O que explorar no VidaPet Operations Hub
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exploreCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.tab}
                onClick={() => onNavigate(card.tab)}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#073B42] group-hover:bg-[#18B77A] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#18B77A] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {card.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#18B77A] block mb-1">
                    {card.subtitle}
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Como seus dados são armazenados (Section 33 of SPEC 00) */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#18B77A] flex items-center justify-center">
            <Database className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Como seus dados são armazenados
          </h2>
        </div>

        <div className="text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
          <p>
            Este MVP funciona em modo <strong>local-first</strong> no navegador.
          </p>
          <p>
            As alterações que você fizer (como regularizar um parceiro ou alterar status) ficam armazenadas somente neste navegador e neste dispositivo. Não existe sincronização entre computadores ou navegadores nesta versão demonstrativa.
          </p>
          <p className="text-xs text-slate-500">
            Caso você limpe os dados do navegador, utilize modo anônimo ou acesse por outro dispositivo, suas alterações locais poderão não aparecer.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onOpenDisclaimer}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 underline cursor-pointer"
          >
            Rever aviso demonstrativo inicial
          </button>

          <button
            onClick={onOpenResetModal}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-rose-600" />
            Restaurar dados da demonstração
          </button>
        </div>
      </div>
    </div>
  );
};
