import React from 'react';
import {
  AlertTriangle,
  Clock,
  UserX,
  Compass,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface AttentionCardProps {
  pendingCount: number;
  expiringCount: number;
  inactiveCount: number;
  expiringSubtitle?: string;
  inactiveSubtitle?: string;
  onNavigateWithFilter: (tab: ActiveTab, filter?: string) => void;
}

export const AttentionCard: React.FC<AttentionCardProps> = ({
  pendingCount,
  expiringCount,
  inactiveCount,
  expiringSubtitle,
  inactiveSubtitle,
  onNavigateWithFilter
}) => {
  const alerts = [
    {
      id: 'pending-docs',
      icon: AlertTriangle,
      iconColor: 'text-rose-500 bg-rose-50',
      title: `${pendingCount} parceiros com documentação pendente`,
      subtitle: 'Aguardando envio de CRMV ou alvará sanitário',
      badge: 'Crítico',
      badgeColor: 'bg-rose-100 text-rose-800',
      action: () => onNavigateWithFilter('partners', 'pendente')
    },
    {
      id: 'contracts-expiring',
      icon: Clock,
      iconColor: 'text-amber-500 bg-amber-50',
      title: `${expiringCount} contratos vencem nos próximos 60 dias`,
      subtitle: expiringSubtitle || 'Renovações prioritárias mapeadas na carteira',
      badge: 'Renovação',
      badgeColor: 'bg-amber-100 text-amber-800',
      action: () => onNavigateWithFilter('contracts', 'proximos-60')
    },
    {
      id: 'inactive-partners',
      icon: UserX,
      iconColor: 'text-slate-500 bg-slate-100',
      title: `${inactiveCount} parceiros sem atividade há mais de 90 dias`,
      subtitle: inactiveSubtitle || 'Sem atendimentos registrados no período',
      badge: 'Monitoramento',
      badgeColor: 'bg-slate-100 text-slate-700',
      action: () => onNavigateWithFilter('partners', 'inativo')
    },
    {
      id: 'regional-opportunity',
      icon: Compass,
      iconColor: 'text-purple-500 bg-purple-50',
      title: 'Região Oceânica com alta demanda e baixa cobertura',
      subtitle: '420 pets corporativos e apenas 3 clínicas credenciadas',
      badge: 'Oportunidade',
      badgeColor: 'bg-purple-100 text-purple-800',
      action: () => onNavigateWithFilter('operations', 'oceanica')
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            Atenção necessária
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
          Prioridades operacionais
        </span>
      </div>

      <div className="space-y-2.5 flex-1">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div
              key={alert.id}
              onClick={alert.action}
              className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/80 transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${alert.iconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 truncate group-hover:text-[#18B77A] transition-colors">
                      {alert.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {alert.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${alert.badgeColor}`}>
                  {alert.badge}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
