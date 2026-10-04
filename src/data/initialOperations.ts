import { OperationalEvent, Opportunity } from '../types';

export const initialEvents: OperationalEvent[] = [
  // Pendências críticas e documentos
  {
    id: 'op-01',
    title: 'CRMV com renovação pendente',
    description: 'Dra. Camila Vasconcellos (Clínica VetCare Niterói) precisa anexar a certidão de quitação CRMV-RJ 2026.',
    category: 'Documento',
    priority: 'critica',
    date: '02/10/2026',
    entityType: 'partner',
    entityId: 'part-01',
    entityName: 'Clínica VetCare Niterói',
    resolved: false,
    actionText: 'Ver parceiro'
  },
  {
    id: 'op-02',
    title: 'Contrato corporativo vence em 42 dias',
    description: 'Alfa Tecnologia (428 pets ativos, R$ 25.680/mês). Proposta de renovação contratual enviada ao RH.',
    category: 'Contrato',
    priority: 'alta',
    date: '01/10/2026',
    entityType: 'company',
    entityId: 'comp-01',
    entityName: 'Alfa Tecnologia',
    resolved: false,
    actionText: 'Ver empresa'
  },
  {
    id: 'op-03',
    title: 'Alvará Sanitário Municipal pendente',
    description: 'Pet Center Icaraí em fase final de credenciamento aguardando upload da licença sanitária.',
    category: 'Documento',
    priority: 'alta',
    date: '30/09/2026',
    entityType: 'partner',
    entityId: 'part-02',
    entityName: 'Pet Center Icaraí',
    resolved: false,
    actionText: 'Ver parceiro'
  },
  {
    id: 'op-04',
    title: 'Licença Sanitária Estadual expirando',
    description: 'Hospital Veterinário Guanabara protocolou renovação sanitária; aguarda conferência da equipe.',
    category: 'Documento',
    priority: 'alta',
    date: '28/09/2026',
    entityType: 'partner',
    entityId: 'part-03',
    entityName: 'Hospital Veterinário Guanabara',
    resolved: false,
    actionText: 'Validar documento'
  },
  {
    id: 'op-05',
    title: 'Parceiro sem atendimentos há 104 dias',
    description: 'SOS Bichos Resgate & Proteção não registra atividade desde junho. Verificar se entidade encerrou convênio.',
    category: 'Parceiro',
    priority: 'media',
    date: '25/09/2026',
    entityType: 'partner',
    entityId: 'part-07',
    entityName: 'SOS Bichos Resgate & Proteção',
    resolved: false,
    actionText: 'Contatar responsável'
  },
  {
    id: 'op-06',
    title: 'Comprovante CRMV Domiciliar pendente',
    description: 'Dr. Felipe Guimarães aguarda envio de certidão atualizada para liberação de agenda ampliada.',
    category: 'Documento',
    priority: 'media',
    date: '24/09/2026',
    entityType: 'partner',
    entityId: 'part-04',
    entityName: 'Dr. Felipe Guimarães',
    resolved: false,
    actionText: 'Ver parceiro'
  },
  {
    id: 'op-07',
    title: 'Alvará municipal vencido há 32 dias',
    description: 'Creche & Hotel Patas Felizes notificada para atualização da documentação municipal.',
    category: 'Documento',
    priority: 'alta',
    date: '22/09/2026',
    entityType: 'partner',
    entityId: 'part-05',
    entityName: 'Creche & Hotel Patas Felizes',
    resolved: false,
    actionText: 'Ver parceiro'
  },
  {
    id: 'op-08',
    title: 'Termo Aditivo pendente de assinatura',
    description: 'Pet Point Charitas precisa assinar o termo aditivo digital para inclusão no portal VidaPet.',
    category: 'Documento',
    priority: 'media',
    date: '20/09/2026',
    entityType: 'partner',
    entityId: 'part-06',
    entityName: 'Pet Point Charitas',
    resolved: false,
    actionText: 'Reenviar link'
  },
  {
    id: 'op-09',
    title: 'Contrato de fornecedor vence em 18 dias',
    description: 'LabPet Diagnósticos Laboratoriais: aditivo de prorrogação precisa ser assinado até 15/10/2026.',
    category: 'Contrato',
    priority: 'alta',
    date: '18/09/2026',
    entityType: 'contract',
    entityId: 'contr-28',
    entityName: 'LabPet Diagnósticos Laboratoriais',
    resolved: false,
    actionText: 'Ver contrato'
  },
  {
    id: 'op-10',
    title: 'Parceiro em pausa de reforma há 98 dias',
    description: 'Consultório Bicho Chic (Tijuca) suspendeu temporariamente a agenda. Confirmar previsão de reabertura.',
    category: 'Parceiro',
    priority: 'baixa',
    date: '15/09/2026',
    entityType: 'partner',
    entityId: 'part-08',
    entityName: 'Consultório Bicho Chic',
    resolved: false,
    actionText: 'Ver parceiro'
  }
];

export const initialOpportunities: Opportunity[] = [
  {
    id: 'opp-01',
    title: 'Expansão Urgente na Região Oceânica',
    category: 'Cobertura regional',
    situation: 'Alta concentração de 420 pets corporativos cadastrados (residentes em Piratininga, Itaipu e Camboinhas) e apenas 3 parceiros credenciados na região.',
    metric: '420 pets vinculados / 3 parceiros (Relação de 140 pets por parceiro vs. média geral de 84).',
    possibleAction: 'Prospectar e credenciar 3 a 5 novas clínicas veterinárias e consultórios em Itaipu e Piratininga para reduzir tempo de deslocamento dos colaboradores.',
    region: 'Região Oceânica',
    impactLevel: 'Alto',
    linkedEntityId: 'part-09'
  },
  {
    id: 'opp-02',
    title: 'Renovação Estratégica Alfa Tecnologia',
    category: 'Renovação de contratos',
    situation: 'Contrato vence em 42 dias. Alfa Tecnologia possui a maior taxa de adesão corporativa (62%) e 428 pets ativos.',
    metric: 'Receita mensal de R$ 25.680/mês (R$ 308.160/ano). Sinistralidade controlada em 58%.',
    possibleAction: 'Apresentar proposta de renovação plurianual (24 meses) com congelamento de reajuste e inclusão de teleorientação veterinária ilimitada.',
    impactLevel: 'Estratégico',
    linkedEntityId: 'comp-01'
  },
  {
    id: 'opp-03',
    title: 'Engajamento Corporativo na Prime Logística',
    category: 'Engajamento corporativo',
    situation: 'Maior empresa em número de elegíveis (1.400 colaboradores), porém com adesão de apenas 30% (420 aderentes).',
    metric: '980 colaboradores elegíveis ainda não aderiram ao benefício pet.',
    possibleAction: 'Realizar campanha de comunicação presencial nos centros de distribuição com feira de microchipagem e consultoria veterinária gratuita.',
    impactLevel: 'Alto',
    linkedEntityId: 'comp-05'
  },
  {
    id: 'opp-04',
    title: 'Regularização de Credenciamento da Rede',
    category: 'Qualidade da rede',
    situation: '6 parceiros estão com documentação complementar pendente ou com certidões sanitárias próximas do vencimento.',
    metric: '6 estabelecimentos com status "Pendente documentação" bloqueando plena operação.',
    possibleAction: 'Ativar fluxo rápido de upload simplificado via canal direto de WhatsApp para responsáveis técnicos.',
    impactLevel: 'Médio'
  },
  {
    id: 'opp-05',
    title: 'Cross-sell de Serviços Complementares',
    category: 'Crescimento B2B',
    situation: 'Empresas no plano Essencial (Prime Logística, Apex Alimentos e Porto Real) possuem alta procura por cobertura cirúrgica e exames avançados.',
    metric: '2.040 colaboradores elegíveis sob planos básicos com potencial de upgrade.',
    possibleAction: 'Ofertar plano de coparticipação reduzida ou plano Standard como opcional com copagamento pelo colaborador.',
    impactLevel: 'Médio'
  }
];
