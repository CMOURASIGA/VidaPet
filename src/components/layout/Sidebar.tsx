import React from 'react';
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Activity,
  Sparkles,
  Info,
  Database,
  ShieldAlert,
  HeartHandshake
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  pendingCount: number;
  expiringCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  pendingCount,
  expiringCount
}) => {
  const navItems = [
    {
      id: 'dashboard' as ActiveTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'partners' as ActiveTab,
      label: 'Parceiros',
      icon: Users,
      badge: pendingCount > 0 ? `${pendingCount}` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300'
    },
    {
      id: 'companies' as ActiveTab,
      label: 'Empresas',
      icon: Building2,
      badge: null
    },
    {
      id: 'contracts' as ActiveTab,
      label: 'Contratos',
      icon: FileText,
      badge: expiringCount > 0 ? `${expiringCount}` : null,
      badgeColor: 'bg-rose-500/20 text-rose-300'
    },
    {
      id: 'operations' as ActiveTab,
      label: 'Operações',
      icon: Activity,
      badge: null
    },
    {
      id: 'intelligence' as ActiveTab,
      label: 'Intelligence',
      icon: Sparkles,
      badge: 'IA',
      badgeColor: 'bg-purple-500/30 text-purple-200'
    },
    {
      id: 'about' as ActiveTab,
      label: 'Sobre este MVP',
      icon: Info,
      badge: null
    }
  ];

  return (
    <aside className="w-60 bg-[#073B42] text-slate-200 flex flex-col h-screen fixed left-0 top-0 z-30 select-none border-r border-[#063339]">
      {/* Brand Header */}
      <div className="p-5 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#18B77A] flex items-center justify-center text-white shadow-md shadow-[#18B77A]/20">
            <HeartHandshake className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-white tracking-tight leading-none">VidaPet</span>
            </div>
            <span className="text-[11px] text-emerald-300 font-medium tracking-wider uppercase">
              Operations Hub
            </span>
          </div>
        </div>

        {/* MVP Conceitual Badge */}
        <div className="mt-3.5 flex items-center justify-between px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
          <span className="text-[11px] font-semibold text-slate-300 tracking-wide">
            MVP Conceitual
          </span>
          <span className="w-2 h-2 rounded-full bg-[#18B77A] animate-pulse" title="Sistema operacional" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group ${
                isActive
                  ? 'bg-[#0E545E] text-white shadow-sm font-semibold'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#18B77A]' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                    item.badgeColor || 'bg-white/10 text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Persistent MVP Local Storage Indicator */}
      <div className="p-3 border-t border-white/10">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
          <div className="flex items-center gap-2 mb-1.5 text-emerald-300 font-semibold">
            <Database className="w-3.5 h-3.5 text-[#18B77A]" />
            <span>MVP Local</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-snug">
            Dados armazenados somente neste navegador. Sem sincronização em nuvem.
          </p>
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
            <span>Storage: Local-First</span>
            <button
              onClick={() => onTabChange('about')}
              className="text-emerald-300 hover:text-emerald-200 underline cursor-pointer"
            >
              Saiba mais
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
