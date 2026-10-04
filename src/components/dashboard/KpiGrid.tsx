import React from 'react';
import {
  Users,
  Building2,
  Heart,
  FileText,
  AlertTriangle,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { DashboardMetrics, ActiveTab } from '../../types';

interface KpiGridProps {
  metrics: DashboardMetrics;
  onNavigateWithFilter: (tab: ActiveTab, filter?: string) => void;
}

export const KpiGrid: React.FC<KpiGridProps> = ({
  metrics,
  onNavigateWithFilter
}) => {
  const kpis = [
    {
      id: 'partners',
      title: 'Parceiros ativos',
      value: metrics.activePartners,
      secondary: `${metrics.totalPartners} parceiros cadastrados`,
      secondaryColor: 'text-slate-500',
      icon: Users,
      iconBg: 'bg-emerald-50 text-[#18B77A]',
      onClick: () => onNavigateWithFilter('partners')
    },
    {
      id: 'companies',
      title: 'Empresas ativas',
      value: metrics.activeCompanies,
      secondary: `${metrics.eligibleEmployees.toLocaleString('pt-BR')} elegíveis`,
      secondaryColor: 'text-slate-500',
      icon: Building2,
      iconBg: 'bg-blue-50 text-blue-600',
      onClick: () => onNavigateWithFilter('companies')
    },
    {
      id: 'pets',
      title: 'Pets vinculados',
      value: metrics.linkedPets.toLocaleString('pt-BR'),
      secondary: 'Benefício corporativo ativo',
      secondaryColor: 'text-slate-500',
      icon: Heart,
      iconBg: 'bg-rose-50 text-rose-500',
      onClick: () => onNavigateWithFilter('companies')
    },
    {
      id: 'contracts',
      title: 'Contratos ativos',
      value: metrics.activeContracts,
      secondary: `${metrics.totalContracts} total na carteira`,
      secondaryColor: 'text-slate-500',
      icon: FileText,
      iconBg: 'bg-slate-100 text-slate-700',
      onClick: () => onNavigateWithFilter('contracts')
    },
    {
      id: 'pending',
      title: 'Pendências',
      value: metrics.pendingDocumentsCount,
      secondary: 'Documentações pendentes',
      secondaryColor: 'text-rose-600 font-semibold',
      icon: AlertTriangle,
      iconBg: 'bg-rose-50 text-rose-600',
      isActionable: true,
      onClick: () => onNavigateWithFilter('partners', 'pendente')
    },
    {
      id: 'renewals',
      title: 'Renovações',
      value: metrics.nearRenewalContractsCount,
      secondary: 'Nos próximos 60 dias',
      secondaryColor: 'text-amber-600 font-semibold',
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600',
      isActionable: true,
      onClick: () => onNavigateWithFilter('contracts', 'proximos-60')
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            onClick={kpi.onClick}
            className={`p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs transition-all duration-150 relative group cursor-pointer hover:border-slate-300 hover:shadow-sm ${
              kpi.isActionable ? 'hover:ring-2 hover:ring-[#18B77A]/20' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${kpi.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
            </div>

            <div className="text-2xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {kpi.value}
            </div>
            <div className="text-xs font-semibold text-slate-700 mt-0.5 truncate">
              {kpi.title}
            </div>
            <div className={`text-[11px] mt-1 truncate ${kpi.secondaryColor}`}>
              {kpi.secondary}
            </div>
          </div>
        );
      })}
    </div>
  );
};
