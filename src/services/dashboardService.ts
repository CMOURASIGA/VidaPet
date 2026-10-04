import { DashboardMetrics } from '../types';
import { partnerRepository } from '../repositories/partnerRepository';
import { companyRepository } from '../repositories/companyRepository';
import { contractRepository } from '../repositories/contractRepository';

export const dashboardService = {
  getMetrics(): DashboardMetrics {
    const partners = partnerRepository.getAll();
    const companies = companyRepository.getAll();
    const contracts = contractRepository.getAll();

    const activePartners = partners.filter((p) => p.status === 'Ativo').length;
    const pendingDocumentsCount = partners.filter((p) => p.documentationStatus === 'Pendente').length;
    const inactivePartnersCount = partners.filter((p) => p.daysSinceLastActivity > 90 || p.status === 'Inativo').length;

    const activeCompanies = companies.filter((c) => c.status === 'Ativo' || c.status === 'Em Renovação').length;
    const totalEligible = companies.reduce((acc, c) => acc + c.eligibleEmployees, 0);
    const totalAdherent = companies.reduce((acc, c) => acc + c.adherentEmployees, 0);
    const totalPets = companies.reduce((acc, c) => acc + c.linkedPets, 0);
    const overallAdhesionRate = totalEligible > 0 ? Math.round((totalAdherent / totalEligible) * 100) : 0;

    const activeContracts = contracts.filter((c) => c.status === 'Ativo' || c.status === 'Em renovação' || c.status === 'Próximo do vencimento').length;
    const nearRenewalContractsCount = contracts.filter((c) => c.daysToExpiry <= 60 && c.status !== 'Encerrado' && c.status !== 'Vencido').length;

    // Category aggregation
    const categoryColors: Record<string, string> = {
      'Clínica Veterinária': '#18B77A',
      'Pet Shop': '#3B82F6',
      'Hospital Veterinário': '#063F46',
      'Veterinário Autônomo': '#F59E42',
      'Hotel / Creche': '#8B5CF6',
      'ONG': '#EC4899',
      'Outros': '#64748B'
    };

    const categoryMap: Record<string, number> = {};
    partners.forEach((p) => {
      categoryMap[p.category] = (categoryMap[p.category] || 0) + 1;
    });

    const partnersByCategory = Object.entries(categoryMap).map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / partners.length) * 100),
      color: categoryColors[category] || '#94A3B8'
    })).sort((a, b) => b.count - a.count);

    // Region aggregation
    const regionMap: Record<string, { count: number; pets: number }> = {};
    partners.forEach((p) => {
      if (!regionMap[p.region]) regionMap[p.region] = { count: 0, pets: 0 };
      regionMap[p.region].count += 1;
    });

    // Approximate corporate pets linked per region based on residence data
    const petsByRegionEst: Record<string, number> = {
      'Niterói': 1050,
      'Zona Sul': 980,
      'Barra': 760,
      'Zona Norte': 520,
      'Região Oceânica': 420, // 420 pets for only 3 partners!
      'São Gonçalo': 310,
      'Baixada': 240,
      'Centro': 100
    };

    const partnersByRegion = Object.entries(regionMap).map(([region, val]) => {
      const pets = petsByRegionEst[region] || 150;
      const ratio = (pets / val.count).toFixed(0);
      return {
        region,
        count: val.count,
        pets,
        coverageRatio: `${ratio} pets/parceiro`
      };
    }).sort((a, b) => b.count - a.count);

    // Network evolution mock data (Abr a Out)
    const networkEvolution = [
      { month: 'Abr', active: 38, newPartners: 3 },
      { month: 'Mai', active: 41, newPartners: 4 },
      { month: 'Jun', active: 43, newPartners: 2 },
      { month: 'Jul', active: 46, newPartners: 4 },
      { month: 'Ago', active: 48, newPartners: 3 },
      { month: 'Set', active: 50, newPartners: 4 },
      { month: 'Out', active: activePartners, newPartners: 2 }
    ];

    // Corporate adhesion monthly trend
    const corporateAdhesion = [
      { month: 'Mai', eligible: 7200, adherent: 2520, rate: 35 },
      { month: 'Jun', eligible: 7500, adherent: 2700, rate: 36 },
      { month: 'Jul', eligible: 7800, adherent: 2886, rate: 37 },
      { month: 'Ago', eligible: 8100, adherent: 3078, rate: 38 },
      { month: 'Set', eligible: 8300, adherent: 3154, rate: 38 },
      { month: 'Out', eligible: totalEligible, adherent: totalAdherent, rate: overallAdhesionRate }
    ];

    // Contracts by expiry
    const exp0to30 = contracts.filter((c) => c.daysToExpiry <= 30 && c.daysToExpiry >= 0).length;
    const exp31to60 = contracts.filter((c) => c.daysToExpiry >= 31 && c.daysToExpiry <= 60).length;
    const exp61to90 = contracts.filter((c) => c.daysToExpiry >= 61 && c.daysToExpiry <= 90).length;
    const exp90plus = contracts.filter((c) => c.daysToExpiry > 90).length;

    const totalC = contracts.length;
    const contractsByExpiry = [
      { label: '0-30 dias', count: exp0to30, percentage: Math.round((exp0to30 / totalC) * 100), color: '#EF5350' },
      { label: '31-60 dias', count: exp31to60, percentage: Math.round((exp31to60 / totalC) * 100), color: '#F59E42' },
      { label: '61-90 dias', count: exp61to90, percentage: Math.round((exp61to90 / totalC) * 100), color: '#3B82F6' },
      { label: '90+ dias', count: exp90plus, percentage: Math.round((exp90plus / totalC) * 100), color: '#18B77A' }
    ];

    return {
      activePartners,
      totalPartners: partners.length,
      activeCompanies,
      totalCompanies: companies.length,
      linkedPets: totalPets,
      eligibleEmployees: totalEligible,
      adherentEmployees: totalAdherent,
      overallAdhesionRate,
      activeContracts,
      totalContracts: contracts.length,
      pendingDocumentsCount,
      nearRenewalContractsCount,
      inactivePartnersCount,
      partnersByCategory,
      partnersByRegion,
      networkEvolution,
      corporateAdhesion,
      contractsByExpiry
    };
  }
};
