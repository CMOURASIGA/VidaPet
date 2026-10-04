import { partnerRepository } from '../repositories/partnerRepository';
import { companyRepository } from '../repositories/companyRepository';
import { contractRepository } from '../repositories/contractRepository';
import { operationsRepository } from '../repositories/operationsRepository';

export interface IntelligenceResponse {
  question: string;
  summary: string;
  details: string[];
  metrics?: { label: string; value: string; badge?: string }[];
  actionLink?: {
    type: 'partner' | 'company' | 'contract' | 'operations';
    id: string;
    label: string;
  };
  references?: {
    type: 'partner' | 'company' | 'contract';
    id: string;
    name: string;
    info: string;
  }[];
}

export const suggestedQuestions = [
  'Quais contratos vencem nos próximos 60 dias?',
  'Quais parceiros possuem documentação pendente?',
  'Qual região possui menor cobertura de parceiros?',
  'Quais empresas corporativas possuem maior adesão?',
  'Onde temos oportunidades prioritárias de expansão?',
  'Quantos parceiros estão inativos ou sem atendimento?'
];

export const intelligenceService = {
  ask(query: string): IntelligenceResponse {
    const q = query.toLowerCase().trim();
    const partners = partnerRepository.getAll();
    const companies = companyRepository.getAll();
    const contracts = contractRepository.getAll();
    const opps = operationsRepository.getOpportunities();

    // 1. Contratos vencendo em até 60 dias
    if (q.includes('contrato') || q.includes('vencem') || q.includes('vencimento') || q.includes('60 dias')) {
      const expiring = contracts
        .filter((c) => c.daysToExpiry <= 60 && c.status !== 'Encerrado' && c.status !== 'Vencido')
        .sort((a, b) => a.daysToExpiry - b.daysToExpiry);

      return {
        question: query,
        summary: `Identificamos ${expiring.length} contratos com vencimento próximo (em até 60 dias), sendo 1 com menos de 30 dias que demanda ação imediata.`,
        details: expiring.map(
          (c) => `• ${c.entityName} (${c.entityType}) — vence em ${c.daysToExpiry} dias (Vigência: até ${c.endDate})`
        ),
        metrics: [
          { label: 'Contratos em alerta', value: `${expiring.length}`, badge: 'Crítico' },
          { label: 'Menor prazo', value: `${expiring[0]?.daysToExpiry || 0} dias`, badge: 'Urgente' }
        ],
        references: expiring.map((c) => ({
          type: 'contract',
          id: c.id,
          name: c.entityName,
          info: `${c.entityType} · Vence em ${c.daysToExpiry} dias`
        }))
      };
    }

    // 2. Documentação pendente
    if (q.includes('document') || q.includes('pendent') || q.includes('alvará') || q.includes('crmv')) {
      const pendingPartners = partners.filter((p) => p.documentationStatus === 'Pendente');
      return {
        question: query,
        summary: `Existem atualmente ${pendingPartners.length} parceiros com pendências documentais registradas no hub.`,
        details: pendingPartners.map(
          (p) => `• ${p.name} (${p.category} em ${p.neighborhood}, ${p.city}): pendência de certidão ou alvará sanitário.`
        ),
        metrics: [
          { label: 'Parceiros pendentes', value: `${pendingPartners.length}`, badge: 'Atenção' },
          { label: 'Impacto na rede', value: 'Regularização necessária para novos agendamentos' }
        ],
        references: pendingPartners.map((p) => ({
          type: 'partner',
          id: p.id,
          name: p.name,
          info: `${p.category} · ${p.city}`
        }))
      };
    }

    // 3. Região com menor cobertura / Região Oceânica
    if (q.includes('regi') || q.includes('cobertura') || q.includes('oceânica') || q.includes('menor')) {
      return {
        question: query,
        summary: 'A Região Oceânica de Niterói apresenta a menor cobertura proporcional da operação: 420 pets corporativos cadastrados para apenas 3 estabelecimentos credenciados.',
        details: [
          '• Relação de 140 pets por parceiro credenciado (vs. média geral de 84 na rede).',
          '• Alta concentração de colaboradores das empresas Alfa Tecnologia e Horizonte Educação residentes em Itaipu e Piratininga.',
          '• Risco operacional: tempo elevado de deslocamento até clínicas de Icaraí e Centro.'
        ],
        metrics: [
          { label: 'Pets na região', value: '420 pets', badge: 'Alta Demanda' },
          { label: 'Parceiros ativos', value: '3 estabelecimentos', badge: 'Baixa Cobertura' }
        ],
        references: [
          { type: 'partner', id: 'part-09', name: 'Clínica Oceânica Pet', info: 'Piratininga · Clínica Veterinária' },
          { type: 'partner', id: 'part-10', name: 'Pet Shop Itaipu Verde', info: 'Itaipu · Pet Shop' },
          { type: 'partner', id: 'part-11', name: 'Vet House Camboinhas', info: 'Camboinhas · Clínica Veterinária' }
        ]
      };
    }

    // 4. Empresas corporativas com maior adesão
    if (q.includes('empresa') || q.includes('adesão') || q.includes('corporativ') || q.includes('maior adesão')) {
      const topCompanies = [...companies].sort((a, b) => b.adhesionRate - a.adhesionRate).slice(0, 5);
      return {
        question: query,
        summary: `As empresas com maior adesão percentual ao benefício VidaPet são lideradas por Atlas Consultoria (68%) e Alfa Tecnologia (62%).`,
        details: topCompanies.map(
          (c) => `• ${c.name} (${c.segment}): ${c.adhesionRate}% de adesão (${c.adherentEmployees} de ${c.eligibleEmployees} elegíveis) — ${c.linkedPets} pets vinculados.`
        ),
        metrics: [
          { label: 'Maior taxa', value: `${topCompanies[0]?.adhesionRate}% (${topCompanies[0]?.name})`, badge: 'Top Performance' },
          { label: 'Média geral B2B', value: '38% de adesão' }
        ],
        references: topCompanies.slice(0, 3).map((c) => ({
          type: 'company',
          id: c.id,
          name: c.name,
          info: `${c.segment} · ${c.adhesionRate}% adesão`
        }))
      };
    }

    // 5. Oportunidades prioritárias de expansão
    if (q.includes('oportunidade') || q.includes('expans') || q.includes('crescimento')) {
      return {
        question: query,
        summary: `Identificamos 5 oportunidades estruturadas na operação, com 2 prioritárias imediatas: Expansão na Região Oceânica e Renovação da Alfa Tecnologia.`,
        details: opps.slice(0, 4).map((o) => `• ${o.title}: ${o.situation} (Ação recomendada: ${o.possibleAction})`),
        metrics: [
          { label: 'Oportunidades ativas', value: `${opps.length}`, badge: 'Operação' },
          { label: 'Impacto estratégico', value: 'Expansão de cobertura & retenção de receita' }
        ]
      };
    }

    // 6. Inativos ou sem atendimento
    if (q.includes('inativ') || q.includes('sem atividade') || q.includes('90 dias') || q.includes('sem atendimento')) {
      const inactives = partners.filter((p) => p.daysSinceLastActivity > 90 || p.status === 'Inativo');
      return {
        question: query,
        summary: `Identificamos exatamente ${inactives.length} parceiros sem atividade há mais de 90 dias na base:`,
        details: inactives.map(
          (p) => `• ${p.name} (${p.category} em ${p.neighborhood}, ${p.city}): última atividade registrada há ${p.daysSinceLastActivity} dias.`
        ),
        metrics: [
          { label: 'Parceiros inativos', value: `${inactives.length}`, badge: 'Monitorar' }
        ],
        references: inactives.map((p) => ({
          type: 'partner',
          id: p.id,
          name: p.name,
          info: `Última atividade: há ${p.daysSinceLastActivity} dias`
        }))
      };
    }

    // Fallback general smart answer
    const totalLinkedPets = companies.reduce((a, c) => a + c.linkedPets, 0);
    const activePartnersCount = partners.filter((p) => p.status === 'Ativo').length;
    return {
      question: query,
      summary: `Análise operacional consolidada: A VidaPet opera atualmente com ${partners.length} parceiros (${activePartnersCount} ativos), ${companies.length} empresas corporativas com ${totalLinkedPets.toLocaleString('pt-BR')} pets vinculados e ${contracts.length} contratos vigentes.`,
      details: [
        `• Parceiros ativos: ${activePartnersCount} de ${partners.length} cadastrados.`,
        `• Pendências documentais em aberto: ${partners.filter((p) => p.documentationStatus === 'Pendente').length} estabelecimentos.`,
        `• Contratos corporativos e de parceiros vencendo em 60 dias: ${contracts.filter((c) => c.daysToExpiry <= 60).length}.`,
        `• Cobertura crítica mapeada: Região Oceânica (3 parceiros para 420 pets).`
      ],
      metrics: [
        { label: 'Parceiros', value: `${partners.length}`, badge: 'Cadastrados' },
        { label: 'Pets atendidos', value: `${totalLinkedPets.toLocaleString('pt-BR')} pets`, badge: 'Corporativo' }
      ]
    };
  }
};
