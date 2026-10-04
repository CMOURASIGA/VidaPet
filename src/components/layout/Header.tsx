import React, { useState } from 'react';
import {
  Search,
  Bell,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Info,
  Clock,
  Sparkles,
  Menu
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface HeaderProps {
  onSearch: (term: string) => void;
  searchTerm: string;
  onNavigate: (tab: ActiveTab) => void;
  pendingCount: number;
  expiringCount: number;
  expiringContractNames?: string[];
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  searchTerm,
  onNavigate,
  pendingCount,
  expiringCount,
  expiringContractNames = [],
  onToggleSidebar
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const totalAlerts = pendingCount + expiringCount;
  const expiringSummary = expiringContractNames.length > 0
    ? expiringContractNames.slice(0, 3).join(', ')
    : 'Contratos prioritários';

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Left side: Hamburger button on mobile/tablet + Search */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            title="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Buscar parceiros, empresas corporativas, contratos..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs md:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#18B77A]/30 focus:border-[#18B77A] transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => onSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded bg-slate-200/60"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 ml-2">
        {/* MVP Conceitual Badge */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md text-xs text-slate-600 cursor-help"
          title="Ambiente demonstrativo com dados fictícios armazenados localmente."
        >
          <Info className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-medium">MVP Conceitual</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            title="Avisos operacionais"
          >
            <Bell className="w-4 h-4" />
            {totalAlerts > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-semibold text-xs text-slate-800 uppercase tracking-wide">
                  Avisos Operacionais ({totalAlerts})
                </span>
                <span className="text-[11px] text-slate-400">Dados da demonstração</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 text-xs">
                {pendingCount > 0 && (
                  <button
                    onClick={() => {
                      onNavigate('partners');
                      setShowNotifications(false);
                    }}
                    className="w-full text-left p-3 hover:bg-slate-50 flex items-start gap-2.5 transition-colors cursor-pointer"
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        {pendingCount} parceiros com documentação pendente
                      </p>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Certidões CRMV e licenças sanitárias aguardando validação.
                      </p>
                    </div>
                  </button>
                )}

                {expiringCount > 0 && (
                  <button
                    onClick={() => {
                      onNavigate('contracts');
                      setShowNotifications(false);
                    }}
                    className="w-full text-left p-3 hover:bg-slate-50 flex items-start gap-2.5 transition-colors cursor-pointer"
                  >
                    <Clock className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">
                        {expiringCount} contratos vencendo em até 60 dias
                      </p>
                      <p className="text-slate-500 text-[11px] mt-0.5 truncate">
                        {expiringSummary}
                      </p>
                    </div>
                  </button>
                )}

                <button
                  onClick={() => {
                    onNavigate('operations');
                    setShowNotifications(false);
                  }}
                  className="w-full text-left p-3 hover:bg-slate-50 flex items-start gap-2.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-800">
                      Oportunidade na Região Oceânica
                    </p>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      420 pets com baixa cobertura de clínicas credenciadas.
                    </p>
                  </div>
                </button>
              </div>
              <div className="p-2 border-t border-slate-100 text-center">
                <button
                  onClick={() => {
                    onNavigate('operations');
                    setShowNotifications(false);
                  }}
                  className="text-xs text-[#18B77A] font-medium hover:underline cursor-pointer"
                >
                  Ver todas as operações
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="h-6 w-px bg-slate-200" />

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#073B42] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              A
            </div>
            <div className="text-left hidden md:block">
              <div className="text-xs font-semibold text-slate-900 leading-tight">
                André
              </div>
              <div className="text-[11px] text-slate-500 leading-tight">
                VidaPet Tech
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 text-xs">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="font-semibold text-slate-800">André</p>
                <p className="text-slate-500 text-[11px]">VidaPet Tech</p>
              </div>
              <button
                onClick={() => {
                  onNavigate('about');
                  setShowUserMenu(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700 cursor-pointer"
              >
                Sobre este MVP
              </button>
              <button
                onClick={() => {
                  onNavigate('about');
                  setShowUserMenu(false);
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700 cursor-pointer"
              >
                Configurações da Demonstração
              </button>
              <div className="border-t border-slate-100 my-1" />
              <div className="px-3 py-1.5 text-[11px] text-slate-400">
                Modo: Demonstração Local
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

