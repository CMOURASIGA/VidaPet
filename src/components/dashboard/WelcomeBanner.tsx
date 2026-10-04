import React from 'react';
import { Heart, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { ActiveTab } from '../../types';

interface WelcomeBannerProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
      {/* Background soft gradient motif */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-50/70 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold mb-2.5 border border-emerald-100">
          <Sparkles className="w-3 h-3 text-[#18B77A]" />
          <span>Visão Operacional Unificada</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Olá, André 👋
        </h1>
        <p className="text-sm text-slate-600 mt-1 font-normal">
          Aqui está a visão geral da operação da VidaPet. Acompanhe a rede credenciada, clientes corporativos e prioridades do dia.
        </p>
        <p className="text-xs text-slate-500 mt-2.5 italic border-l-2 border-[#18B77A] pl-2.5">
          "Conectando pessoas, empresas e parceiros para um mundo melhor para os pets."
        </p>
      </div>

      {/* Styled Pet Illustration Card */}
      <div className="relative z-10 shrink-0 flex items-center gap-3 bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl">
        <div className="w-12 h-12 rounded-xl bg-[#073B42] text-white flex items-center justify-center font-bold shadow-xs">
          <svg className="w-7 h-7 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z" />
          </svg>
        </div>
        <div className="text-left text-xs">
          <span className="font-bold text-slate-900 block">Rede em Operação</span>
          <span className="text-slate-500 block text-[11px]">8 regiões · 52 parceiros</span>
          <button
            onClick={() => onNavigate('partners')}
            className="text-[#18B77A] font-semibold flex items-center gap-1 mt-1 hover:underline cursor-pointer"
          >
            Explorar rede <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
