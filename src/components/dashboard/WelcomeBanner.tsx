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

      {/* Styled Executive Dog & Cat Illustration Card */}
      <div className="relative z-10 shrink-0 flex items-center gap-4 bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-slate-200/80 p-3.5 sm:p-4 rounded-2xl shadow-xs">
        {/* Executive Vector Dog + Cat Duo Silhouette */}
        <div className="relative w-16 h-16 rounded-xl bg-[#073B42] flex items-center justify-center text-white overflow-hidden shadow-sm shrink-0">
          <svg className="w-12 h-12 text-[#18B77A]" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Dog Silhouette */}
            <path d="M12 38V28C12 25 14 22 17 22C19 22 20 20 20 18V15C20 13.5 19 12 17 12H15C13.5 12 12.5 13 12 14.5L10 20L7 21C5.5 21.5 5 23 5.5 24.5L7 28V38H12Z" fill="currentColor" fillOpacity="0.15" />
            <circle cx="14" cy="17" r="1.5" fill="currentColor" />
            
            {/* Cat Silhouette sitting side by side */}
            <path d="M26 38V30C26 27 28 25 31 25C32.5 25 34 24 35 22.5L37 19L38.5 22C39 23 40 24 41 24.5L43 25V38H26Z" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" />
            {/* Cat Ears */}
            <path d="M34 19L32 14L35 16L38 14L37 19" fill="#3B82F6" stroke="#3B82F6" />
            <circle cx="35" cy="21" r="1" fill="#3B82F6" />
            {/* Tail */}
            <path d="M43 36C45 36 46 34 45 32" stroke="#3B82F6" strokeWidth="2" />
          </svg>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#18B77A] rounded-full flex items-center justify-center">
            <Heart className="w-3 h-3 text-white fill-white" />
          </div>
        </div>

        <div className="text-left text-xs">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="font-bold text-slate-900 block text-xs sm:text-sm">Rede Operacional</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#18B77A]" />
          </div>
          <span className="text-slate-500 block text-[11px]">8 regiões · 52 parceiros cadastrados</span>
          <button
            onClick={() => onNavigate('partners')}
            className="text-[#18B77A] hover:text-[#149e69] font-semibold flex items-center gap-1 mt-1.5 hover:underline cursor-pointer transition-colors"
          >
            Explorar rede <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
