import React from 'react';
import { WelcomeBanner } from '../components/dashboard/WelcomeBanner';
import { KpiGrid } from '../components/dashboard/KpiGrid';
import { AttentionCard } from '../components/dashboard/AttentionCard';
import {
  CategoryDonutChart,
  RegionBarChart,
  NetworkEvolutionChart,
  CorporateAdhesionChart,
  ExpiryDonutChart
} from '../components/dashboard/Charts';
import { DashboardTables } from '../components/dashboard/Tables';
import { IntelligenceTeaser } from '../components/dashboard/IntelligenceTeaser';
import { DashboardMetrics, Partner, Company, Contract, ActiveTab } from '../types';

interface DashboardViewProps {
  metrics: DashboardMetrics;
  partners: Partner[];
  companies: Company[];
  contracts: Contract[];
  onSelectPartner: (partner: Partner) => void;
  onSelectCompany: (company: Company) => void;
  onNavigate: (tab: ActiveTab) => void;
  onNavigateWithFilter: (tab: ActiveTab, filter?: string) => void;
  onSelectEntity: (type: 'partner' | 'company' | 'contract', id: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  metrics,
  partners,
  companies,
  contracts,
  onSelectPartner,
  onSelectCompany,
  onNavigate,
  onNavigateWithFilter,
  onSelectEntity
}) => {
  // Sort recent partners chronologically by entryDate (dd/mm/yyyy) in descending order
  const parseDateBR = (dateStr: string): number => {
    if (!dateStr) return 0;
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day).getTime();
    }
    return 0;
  };

  const recentPartners = [...partners]
    .sort((a, b) => parseDateBR(b.entryDate) - parseDateBR(a.entryDate))
    .slice(0, 8);
  const topCompanies = [...companies].sort((a, b) => b.adhesionRate - a.adhesionRate).slice(0, 8);

  // Derive dynamic alert descriptions from live data (avoid hardcoding)
  const expiringContracts = contracts
    .filter((c) => c.daysToExpiry <= 60 && c.status !== 'Encerrado' && c.status !== 'Vencido')
    .sort((a, b) => a.daysToExpiry - b.daysToExpiry);
  const expiringSubtitle = expiringContracts.length > 0
    ? expiringContracts.slice(0, 3).map((c) => `${c.entityName} (${c.daysToExpiry}d)`).join(', ')
    : undefined;

  const inactivePartners = partners
    .filter((p) => p.daysSinceLastActivity > 90 || p.status === 'Inativo')
    .sort((a, b) => b.daysSinceLastActivity - a.daysSinceLastActivity);
  const inactiveSubtitle = inactivePartners.length > 0
    ? inactivePartners.slice(0, 2).map((p) => `${p.name} (${p.daysSinceLastActivity}d)`).join(' e ')
    : undefined;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Welcome Banner */}
      <WelcomeBanner onNavigate={onNavigate} />

      {/* 2. KPI Cards (6 items) */}
      <KpiGrid metrics={metrics} onNavigateWithFilter={onNavigateWithFilter} />

      {/* 3. Priority Grid: Category Donut + Regional Bars + Attention Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CategoryDonutChart metrics={metrics} />
        <RegionBarChart metrics={metrics} />
        <AttentionCard
          pendingCount={metrics.pendingDocumentsCount}
          expiringCount={metrics.nearRenewalContractsCount}
          inactiveCount={metrics.inactivePartnersCount}
          expiringSubtitle={expiringSubtitle}
          inactiveSubtitle={inactiveSubtitle}
          onNavigateWithFilter={onNavigateWithFilter}
        />
      </div>

      {/* 4. Secondary Trends Grid: Network Evolution + Corporate Adhesion + Expiry Donut */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <NetworkEvolutionChart metrics={metrics} />
        <CorporateAdhesionChart metrics={metrics} />
        <ExpiryDonutChart metrics={metrics} />
      </div>

      {/* 5. Recent Partners & Top Companies Tables */}
      <DashboardTables
        recentPartners={recentPartners}
        topCompanies={topCompanies}
        onSelectPartner={onSelectPartner}
        onSelectCompany={onSelectCompany}
        onNavigate={onNavigate}
      />

      {/* 6. VidaPet Intelligence Integrated Teaser */}
      <IntelligenceTeaser
        onNavigate={onNavigate}
        onSelectEntity={onSelectEntity}
      />
    </div>
  );
};
