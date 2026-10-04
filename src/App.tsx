import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DisclaimerModal } from './components/modals/DisclaimerModal';
import { ResetModal } from './components/modals/ResetModal';
import { ToastProvider, useToast } from './components/common/Toast';
import { PartnerDrawer } from './components/drawers/PartnerDrawer';
import { CompanyDrawer } from './components/drawers/CompanyDrawer';
import { ContractDrawer } from './components/drawers/ContractDrawer';

import { DashboardView } from './views/DashboardView';
import { PartnersView } from './views/PartnersView';
import { CompaniesView } from './views/CompaniesView';
import { ContractsView } from './views/ContractsView';
import { OperationsView } from './views/OperationsView';
import { IntelligenceView } from './views/IntelligenceView';
import { AboutView } from './views/AboutView';

import { appRepository } from './repositories/appRepository';
import { partnerRepository } from './repositories/partnerRepository';
import { companyRepository } from './repositories/companyRepository';
import { contractRepository } from './repositories/contractRepository';
import { operationsRepository } from './repositories/operationsRepository';
import { dashboardService } from './services/dashboardService';

import { ActiveTab, Partner, Company, Contract, PartnerStatus, DocStatus } from './types';

function MainApp() {
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [filterPassed, setFilterPassed] = useState<string | undefined>(undefined);
  const [globalSearch, setGlobalSearch] = useState('');

  // Drawers
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  // Modals
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State
  const [partners, setPartners] = useState<Partner[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [events, setEvents] = useState(operationsRepository.getEvents());
  const [opportunities, setOpportunities] = useState(operationsRepository.getOpportunities());

  // Load and check disclaimer
  useEffect(() => {
    appRepository.initialize();
    setPartners(partnerRepository.getAll());
    setCompanies(companyRepository.getAll());
    setContracts(contractRepository.getAll());
    setEvents(operationsRepository.getEvents());
    setOpportunities(operationsRepository.getOpportunities());

    const seen = appRepository.isDisclaimerSeen();
    if (!seen) {
      setIsDisclaimerOpen(true);
    }
  }, []);

  const metrics = useMemo(() => {
    return dashboardService.getMetrics();
  }, [partners, companies, contracts]);

  const expiringContractNames = useMemo(() => {
    return contracts
      .filter((c) => c.daysToExpiry <= 60 && c.status !== 'Encerrado' && c.status !== 'Vencido')
      .sort((a, b) => a.daysToExpiry - b.daysToExpiry)
      .map((c) => c.entityName);
  }, [contracts]);

  const handleConfirmDisclaimer = () => {
    appRepository.setDisclaimerSeen(true);
    setIsDisclaimerOpen(false);
  };

  const handleResetConfirm = () => {
    appRepository.resetDemoData();
    const freshPartners = partnerRepository.getAll();
    const freshCompanies = companyRepository.getAll();
    const freshContracts = contractRepository.getAll();
    const freshEvents = operationsRepository.getEvents();
    const freshOpportunities = operationsRepository.getOpportunities();

    setPartners(freshPartners);
    setCompanies(freshCompanies);
    setContracts(freshContracts);
    setEvents(freshEvents);
    setOpportunities(freshOpportunities);

    setSelectedPartner(null);
    setSelectedCompany(null);
    setSelectedContract(null);

    showToast('Dados da demonstração restaurados com sucesso.', 'success');
  };

  const handleUpdatePartnerStatus = (id: string, status: PartnerStatus) => {
    const updated = partnerRepository.updateStatus(id, status);
    if (updated) {
      setPartners(partnerRepository.getAll());
      if (selectedPartner?.id === id) {
        setSelectedPartner(updated);
      }
      showToast(`Status do parceiro atualizado para "${status}".`, 'success');
    }
  };

  const handleUpdatePartnerDocStatus = (id: string, docStatus: DocStatus) => {
    const updated = partnerRepository.updateDocumentationStatus(id, docStatus);
    if (updated) {
      setPartners(partnerRepository.getAll());
      if (selectedPartner?.id === id) {
        setSelectedPartner(updated);
      }
      showToast('Documentação aprovada e credenciamento validado.', 'success');
    }
  };

  const handleResolveEvent = (id: string) => {
    operationsRepository.resolveEvent(id);
    setEvents(operationsRepository.getEvents());
    showToast('Evento operacional marcado como resolvido.', 'info');
  };

  const handleNavigateWithFilter = (tab: ActiveTab, filter?: string) => {
    setFilterPassed(filter);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEntity = (type: 'partner' | 'company' | 'contract', id: string) => {
    if (type === 'partner') {
      const p = partnerRepository.getById(id);
      if (p) setSelectedPartner(p);
    } else if (type === 'company') {
      const c = companyRepository.getById(id);
      if (c) setSelectedCompany(c);
    } else if (type === 'contract') {
      const con = contractRepository.getById(id);
      if (con) setSelectedContract(con);
    }
  };

  const handleTabChange = (tab: ActiveTab) => {
    setFilterPassed(undefined);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-slate-800 flex">
      {/* 1. Fixed / Drawer Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        pendingCount={metrics.pendingDocumentsCount}
        expiringCount={metrics.nearRenewalContractsCount}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* 2. Main Layout Area (no static 240px margin on small screens) */}
      <div className="flex-1 lg:ml-60 ml-0 flex flex-col min-w-0 overflow-x-hidden">
        {/* Header */}
        <Header
          searchTerm={globalSearch}
          onSearch={(t) => {
            setGlobalSearch(t);
            if (t.trim() && activeTab === 'dashboard') {
              setActiveTab('partners');
            }
          }}
          onNavigate={handleTabChange}
          pendingCount={metrics.pendingDocumentsCount}
          expiringCount={metrics.nearRenewalContractsCount}
          expiringContractNames={expiringContractNames}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Content Body */}
        <main className="p-6 md:p-8 flex-1">
          {activeTab === 'dashboard' && (
            <DashboardView
              metrics={metrics}
              partners={partners}
              companies={companies}
              contracts={contracts}
              onSelectPartner={setSelectedPartner}
              onSelectCompany={setSelectedCompany}
              onNavigate={handleTabChange}
              onNavigateWithFilter={handleNavigateWithFilter}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {activeTab === 'partners' && (
            <PartnersView
              partners={partners}
              onSelectPartner={setSelectedPartner}
              initialFilter={filterPassed}
            />
          )}

          {activeTab === 'companies' && (
            <CompaniesView
              companies={companies}
              onSelectCompany={setSelectedCompany}
            />
          )}

          {activeTab === 'contracts' && (
            <ContractsView
              contracts={contracts}
              onSelectContract={setSelectedContract}
              initialFilter={filterPassed}
            />
          )}

          {activeTab === 'operations' && (
            <OperationsView
              events={events}
              opportunities={opportunities}
              onResolveEvent={handleResolveEvent}
              onNavigateWithFilter={handleNavigateWithFilter}
              onSelectEntity={handleSelectEntity}
            />
          )}

          {activeTab === 'intelligence' && (
            <IntelligenceView onSelectEntity={handleSelectEntity} />
          )}

          {activeTab === 'about' && (
            <AboutView
              onOpenResetModal={() => setIsResetModalOpen(true)}
              onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
              onNavigate={handleTabChange}
            />
          )}
        </main>
      </div>

      {/* Drawers */}
      <PartnerDrawer
        partner={selectedPartner}
        onClose={() => setSelectedPartner(null)}
        onUpdateStatus={handleUpdatePartnerStatus}
        onUpdateDocumentationStatus={handleUpdatePartnerDocStatus}
      />

      <CompanyDrawer
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />

      <ContractDrawer
        contract={selectedContract}
        onClose={() => setSelectedContract(null)}
      />

      {/* Modals */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onConfirm={handleConfirmDisclaimer}
      />

      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetConfirm}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}
