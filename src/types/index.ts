export type PartnerCategory =
  | 'Clínica Veterinária'
  | 'Pet Shop'
  | 'Hospital Veterinário'
  | 'Veterinário Autônomo'
  | 'Hotel / Creche'
  | 'Passeador / Cuidador'
  | 'ONG'
  | 'Outros';

export type PartnerStatus =
  | 'Ativo'
  | 'Em onboarding'
  | 'Pendente documentação'
  | 'Em análise'
  | 'Inativo';

export type DocStatus =
  | 'Válido'
  | 'Pendente'
  | 'Próximo do vencimento'
  | 'Vencido';

export interface PartnerDocument {
  id: string;
  name: string;
  type: 'Contrato Social' | 'CRMV' | 'CNPJ' | 'Alvará Sanitário' | 'Comprovante Endereço' | 'Termo de Adesão';
  status: DocStatus;
  updatedAt: string;
  expiresAt?: string;
  fileReference?: string;
}

export interface ActivityHistoryItem {
  id: string;
  date: string;
  title: string;
  author: string;
  description?: string;
}

export interface Partner {
  id: string;
  code: string;
  name: string;
  tradeName: string;
  category: PartnerCategory;
  cnpjCpf: string;
  crmv?: string;
  city: string;
  state: string;
  region: string;
  neighborhood: string;
  responsibleName: string;
  phone: string;
  email: string;
  status: PartnerStatus;
  documentationStatus: DocStatus;
  contractId?: string;
  entryDate: string;
  lastActivityDate: string;
  daysSinceLastActivity: number;
  rating: number;
  services: string[];
  petsServed: number;
  documents: PartnerDocument[];
  history: ActivityHistoryItem[];
  notes?: string;
}

export interface Company {
  id: string;
  code: string;
  name: string;
  cnpj: string;
  segment: string;
  responsible: string;
  contactEmail: string;
  contactPhone: string;
  plan: 'Essencial' | 'Standard' | 'Premium' | 'Enterprise';
  startDate: string;
  renewalDate: string;
  daysToRenewal: number;
  eligibleEmployees: number;
  adherentEmployees: number;
  adhesionRate: number; // percentage, e.g. 62
  linkedPets: number;
  monthlyRevenue: number;
  utilizationRate: number; // percentage
  status: 'Ativo' | 'Em Implantação' | 'Em Renovação' | 'Suspenso';
  contractId: string;
  history: ActivityHistoryItem[];
  notes?: string;
}

export interface Contract {
  id: string;
  code: string;
  entityType: 'Parceiro' | 'Corporativo' | 'Fornecedor' | 'Outro';
  entityName: string;
  entityId: string;
  startDate: string;
  endDate: string;
  daysToExpiry: number;
  status: 'Ativo' | 'Próximo do vencimento' | 'Em renovação' | 'Vencido' | 'Encerrado';
  responsible: string;
  value?: number;
  renewalNoticePeriodDays: number;
  notes?: string;
}

export interface OperationalEvent {
  id: string;
  title: string;
  description: string;
  category: 'Pendência' | 'Onboarding' | 'Documento' | 'Contrato' | 'Renovação' | 'Parceiro' | 'Empresa' | 'Oportunidade';
  priority: 'baixa' | 'media' | 'alta' | 'critica';
  date: string;
  entityType?: 'partner' | 'company' | 'contract';
  entityId?: string;
  entityName?: string;
  resolved: boolean;
  actionText?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  category:
    | 'Expansão da rede'
    | 'Cobertura regional'
    | 'Renovação de contratos'
    | 'Engajamento corporativo'
    | 'Qualidade da rede'
    | 'Crescimento B2B';
  situation: string;
  metric: string;
  possibleAction: string;
  region?: string;
  impactLevel: 'Alto' | 'Médio' | 'Estratégico';
  linkedEntityId?: string;
}

export interface DashboardMetrics {
  activePartners: number;
  totalPartners: number;
  activeCompanies: number;
  totalCompanies: number;
  linkedPets: number;
  eligibleEmployees: number;
  adherentEmployees: number;
  overallAdhesionRate: number;
  activeContracts: number;
  totalContracts: number;
  pendingDocumentsCount: number;
  nearRenewalContractsCount: number;
  inactivePartnersCount: number;
  // Chart aggregations
  partnersByCategory: { category: string; count: number; percentage: number; color: string }[];
  partnersByRegion: { region: string; count: number; pets: number; coverageRatio: string }[];
  networkEvolution: { month: string; active: number; newPartners: number }[];
  corporateAdhesion: { month: string; eligible: number; adherent: number; rate: number }[];
  contractsByExpiry: { label: string; count: number; percentage: number; color: string }[];
}

export type ActiveTab =
  | 'dashboard'
  | 'partners'
  | 'companies'
  | 'contracts'
  | 'operations'
  | 'intelligence'
  | 'about';
