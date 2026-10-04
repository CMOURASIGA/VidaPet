import React from 'react';
import { Database, ShieldCheck, AlertCircle } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onConfirm
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-150">
        <div className="bg-[#073B42] text-white p-6 pb-5">
          <div className="w-12 h-12 rounded-xl bg-[#18B77A] flex items-center justify-center mb-4 shadow-md shadow-[#18B77A]/30">
            <Database className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Ambiente demonstrativo
          </h2>
          <p className="text-xs text-emerald-300 mt-1 font-medium">
            VidaPet Operations Hub — MVP Conceitual
          </p>
        </div>

        <div className="p-6 space-y-3.5 text-sm text-slate-600 leading-relaxed">
          <p className="font-medium text-slate-800">
            Este é um MVP conceitual desenvolvido para descoberta e alinhamento de produto.
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-600">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18B77A] mt-1.5 shrink-0" />
              <span>Todos os dados apresentados são <strong>fictícios</strong>.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18B77A] mt-1.5 shrink-0" />
              <span>
                As alterações realizadas durante sua navegação ficam armazenadas <strong>somente neste navegador e dispositivo</strong>.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18B77A] mt-1.5 shrink-0" />
              <span>Este ambiente ainda não possui sincronização em nuvem.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18B77A] mt-1.5 shrink-0" />
              <span>
                Caso você utilize outro computador, outro navegador ou limpe os dados de navegação, suas alterações locais não estarão disponíveis.
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Você pode navegar livremente, testar filtros, alterar status e simular a experiência operacional da VidaPet.
          </p>
        </div>

        <div className="p-4 px-6 bg-slate-50 border-t border-slate-200/80 flex justify-end">
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#18B77A] hover:bg-[#149e69] text-white font-semibold text-sm rounded-xl transition-colors shadow-sm shadow-[#18B77A]/20 cursor-pointer"
          >
            Entendi, continuar
          </button>
        </div>
      </div>
    </div>
  );
};
