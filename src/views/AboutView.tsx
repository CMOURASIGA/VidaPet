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
  Compass,
  Eye,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  MessageSquareText,
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
          <span>Ambiente de Demonstração</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Sobre este MVP
        </h1>

        <div className="mt-4 space-y-3 text-sm text-slate-600 leading-relaxed">
          <p className="font-medium text-slate-800">
            Este ambiente apresenta um conceito inicial de uma plataforma de gestão operacional para a VidaPet.
          </p>
          <p>
            O objetivo é demonstrar como parceiros, empresas corporativas, contratos, indicadores, pendências e oportunidades poderiam ser acompanhados em um único ambiente consolidado.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 space-y-1">
            <p><strong>Aviso importante:</strong> Todos os dados utilizados nesta demonstração são fictícios.</p>
            <p>
              Este MVP não representa um produto final. Ele existe para apoiar uma conversa de descoberta e ajudar a identificar quais funcionalidades realmente fazem sentido para a operação da VidaPet.
            </p>
          </div>
        </div>
      </div>

      {/* Bloco 1: Como usar este MVP */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#18B77A] flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">
            Como usar este MVP
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Este ambiente foi projetado para ser <strong>explorado livremente, sem uma sequência pré-definida ou obrigatória</strong>. Você pode navegar no seu próprio ritmo e alternar entre os módulos conforme sua curiosidade:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="font-bold text-slate-800 block mb-1">Parceiros</span>
            <span className="text-slate-500 text-[11px] leading-snug">Pesquise, filtre por região, veja documentos e simule aprovação de credenciamentos.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="font-bold text-slate-800 block mb-1">Empresas B2B</span>
            <span className="text-slate-500 text-[11px] leading-snug">Analise taxas de adesão, colaboradores elegíveis e empresas próximas de renovação.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="font-bold text-slate-800 block mb-1">Contratos</span>
            <span className="text-slate-500 text-[11px] leading-snug">Acompanhe vigências categorizadas por prazos de vencimento (0-30, 31-60, 61-90 dias).</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="font-bold text-slate-800 block mb-1">Operações</span>
            <span className="text-slate-500 text-[11px] leading-snug">Resolva pendências e examine oportunidades como a expansão na Região Oceânica.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 sm:col-span-2">
            <span className="font-bold text-slate-800 block mb-1">Intelligence</span>
            <span className="text-slate-500 text-[11px] leading-snug">Faça perguntas diretas em linguagem natural sobre qualquer aspecto da operação simulada.</span>
          </div>
        </div>
      </div>

      {/* Bloco 2: O que gostaríamos que você observasse */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              O que gostaríamos que você observasse
            </h2>
            <p className="text-xs text-slate-500">Diretrizes para guiar sua análise crítica durante a navegação</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Aderência à Operação Real</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                As informações apresentadas fazem sentido para a rotina diária da VidaPet? Os campos e categorias refletem a dinâmica da rede?
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Apoio à Tomada de Decisão</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Os indicadores e alertas (como contratos vencendo ou regiões com baixa cobertura) realmente ajudariam a antecipar problemas e agir com antecedência?
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Lacunas de Informação</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                O que está faltando nesta visão consolidada? Que dados cruciais hoje ficam dispersos em planilhas ou sistemas separados?
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">Informações Desejadas</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Quais métricas e relatórios você gostaria de acompanhar semanalmente para avaliar a saúde dos clientes B2B e da rede credenciada?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bloco 3: O que não precisa avaliar agora */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              O que não precisa avaliar agora
            </h2>
            <p className="text-xs text-slate-500">Aspectos técnicos postergados propositalmente para etapas futuras</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-amber-900 space-y-2 leading-relaxed">
          <p className="font-medium">
            Nesta fase de demonstração conceitual, não é necessário avaliar:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px] pl-1">
            <li><strong>Arquitetura definitiva e infraestrutura cloud</strong> (banco de dados remoto, servidores, escalabilidade);</li>
            <li><strong>Integrações técnicas reais</strong> (APIs da VidaPet, sistemas legados, gateways de pagamento);</li>
            <li><strong>Fluxos reais de autenticação</strong>, controle de permissões complexas e RBAC;</li>
            <li><strong>Assinatura digital e upload de arquivos reais para nuvem</strong>.</li>
          </ul>
          <p className="text-[11px] text-amber-800 font-semibold pt-1">
            * O objetivo exclusivo deste momento é validar o conceito visual, a experiência de navegação e a utilidade operacional para o negócio.
          </p>
        </div>
      </div>

      {/* Bloco 4: Feedback Esperado na Reunião */}
      <div className="bg-gradient-to-br from-[#073B42] to-[#0A4D57] rounded-2xl p-6 sm:p-7 text-white border border-[#0A4D57] shadow-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#18B77A] text-white flex items-center justify-center shadow-xs">
            <MessageSquareText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              O Feedback que Buscamos na Apresentação
            </h2>
            <p className="text-xs text-emerald-200/90">Pontos que discutiremos na nossa próxima conversa de alinhamento</p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-slate-200 pt-1">
          <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/10 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#18B77A] mt-1.5 shrink-0" />
            <div>
              <strong className="text-white">O que fez sentido:</strong> Quais módulos, gráficos e alertas geram valor imediato para a gestão da VidaPet?
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/10 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
            <div>
              <strong className="text-white">O que não faria parte da operação:</strong> Quais elementos ou fluxos parecem dispensáveis ou fora da realidade da empresa?
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/10 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <div>
              <strong className="text-white">O que está faltando:</strong> Que etapas de processo, filtros ou visões adicionais fariam toda a diferença?
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/10 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
            <div>
              <strong className="text-white">Quais informações deveriam existir:</strong> Indicadores de sinistralidade, repasses financeiros, notas fiscais ou avaliações de tutores?
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/10 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-300 mt-1.5 shrink-0" />
            <div>
              <strong className="text-white">Quais decisões você gostaria de tomar usando esse ambiente:</strong> Negociar renovações, remanejar credenciamentos ou aprovar campanhas de adesão corporativa?
            </div>
          </div>
        </div>
      </div>

      {/* O que explorar */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          Módulos do VidaPet Operations Hub
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
