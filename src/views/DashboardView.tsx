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
  onSelectPartner,
  onSelectCompany,
  onNavigate,
  onNavigateWithFilter,
  onSelectEntity
}) => {
  // Sort recent partners by entry date or id
  const recentPartners = [...partners].slice(0, 8);
  const topCompanies = [...companies].sort((a, b) => b.adhesionRate - a.adhesionRate).slice(0, 8);

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
