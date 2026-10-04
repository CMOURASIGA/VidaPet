import { Partner, PartnerCategory, PartnerStatus, DocStatus } from '../types';

export const initialPartners: Partner[] = [
  // 1 to 6: Documentações Pendentes (strict match for Scenario 1 & KPI = 6)
  {
    id: 'part-01',
    code: 'PART-001',
    name: 'Clínica VetCare Niterói',
    tradeName: 'VetCare Niterói',
    category: 'Clínica Veterinária',
    cnpjCpf: '12.345.678/0001-90',
    crmv: 'CRMV-RJ 8492',
    city: 'Niterói',
    state: 'RJ',
    region: 'Niterói',
    neighborhood: 'Icaraí',
    responsibleName: 'Dra. Camila Vasconcellos',
    phone: '(21) 98765-4321',
    email: 'contato@vetcareniteroi.com.br',
    status: 'Pendente documentação',
    documentationStatus: 'Pendente',
    contractId: 'contr-02',
    entryDate: '12/10/2024',
    lastActivityDate: '12/09/2026',
    daysSinceLastActivity: 21,
    rating: 4.8,
    services: ['Consultas', 'Vacinação', 'Exames Laboratoriais', 'Cirurgia Geral'],
    petsServed: 312,
    documents: [
      { id: 'doc-01', name: 'Contrato Social', type: 'Contrato Social', status: 'Válido', updatedAt: '12/10/2024' },
      { id: 'doc-02', name: 'CRMV Responsável Técnico', type: 'CRMV', status: 'Pendente', updatedAt: '01/08/2026', expiresAt: '15/09/2026' },
      { id: 'doc-03', name: 'Alvará Sanitário', type: 'Alvará Sanitário', status: 'Válido', updatedAt: '15/01/2026', expiresAt: '15/01/2027' }
    ],
    history: [
      { id: 'h-01', date: '12/09/2026', title: 'Notificação de CRMV pendente enviada', author: 'Operações VidaPet' },
      { id: 'h-02', date: '18/08/2026', title: 'Atendimento de 14 pets corporativos registrado', author: 'Sistema' }
    ]
  },
  {
    id: 'part-02',
    code: 'PART-002',
    name: 'Pet Center Icaraí',
    tradeName: 'Pet Center Icaraí & Vet',
    category: 'Pet Shop',
    cnpjCpf: '23.456.789/0001-01',
    crmv: 'CRMV-RJ 6120',
    city: 'Niterói',
    state: 'RJ',
    region: 'Niterói',
    neighborhood: 'Icaraí',
    responsibleName: 'Rodrigo Mendonça',
    phone: '(21) 99123-4567',
    email: 'gerencia@petcentericarai.com.br',
    status: 'Pendente documentação',
    documentationStatus: 'Pendente',
    contractId: 'contr-03',
    entryDate: '05/08/2026',
    lastActivityDate: '28/09/2026',
    daysSinceLastActivity: 5,
    rating: 4.6,
    services: ['Banho e Tosa', 'Consultório Básico', 'Farmácia Veterinária'],
    petsServed: 184,
    documents: [
      { id: 'doc-04', name: 'Cartão CNPJ', type: 'CNPJ', status: 'Válido', updatedAt: '05/08/2026' },
      { id: 'doc-05', name: 'Alvará Sanitário Municipal', type: 'Alvará Sanitário', status: 'Pendente', updatedAt: '05/08/2026' }
    ],
    history: [
      { id: 'h-03', date: '28/09/2026', title: 'Cobrança de alvará pendente realizada via e-mail', author: 'André (Operações)' }
    ]
  },
  {
    id: 'part-03',
    code: 'PART-003',
    name: 'Hospital Veterinário Guanabara',
    tradeName: 'HV Guanabara 24h',
    category: 'Hospital Veterinário',
    cnpjCpf: '34.567.890/0001-12',
    crmv: 'CRMV-RJ 3409',
    city: 'Rio de Janeiro',
    state: 'RJ',
    region: 'Zona Sul',
    neighborhood: 'Botafogo',
    responsibleName: 'Dr. Leonardo Meirelles',
    phone: '(21) 3254-8800',
    email: 'diretoria@hvguanabara.com.br',
    status: 'Pendente documentação',
    documentationStatus: 'Pendente',
    contractId: 'contr-05',
    entryDate: '10/02/2025',
    lastActivityDate: '01/10/2026',
    daysSinceLastActivity: 2,
    rating: 4.9,
    services: ['Emergência 24h', 'UTI Veterinária', 'Cirurgia de Alta Complexidade', 'Tomografia'],
    petsServed: 540,
    documents: [
      { id: 'doc-06', name: 'Licença Sanitária Estadual', type: 'Alvará Sanitário', status: 'Pendente', updatedAt: '10/08/2026', expiresAt: '30/09/2026' }
    ],
    history: [
      { id: 'h-04', date: '01/10/2026', title: 'Protocolo de renovação sanitária anexado aguardando validação', author: 'Dr. Leonardo' }
    ]
  },
  {
    id: 'part-04',
    code: 'PART-004',
    name: 'Dr. Felipe Guimarães - Atendimento Domiciliar',
    tradeName: 'Vet em Casa Felipe Guimarães',
    category: 'Veterinário Autônomo',
    cnpjCpf: '098.765.432-11',
    crmv: 'CRMV-RJ 9941',
    city: 'Rio de Janeiro',
    state: 'RJ',
    region: 'Barra',
    neighborhood: 'Barra da Tijuca',
    responsibleName: 'Dr. Felipe Guimarães',
    phone: '(21) 98455-6677',
    email: 'felipe.vet@gmail.com',
    status: 'Pendente documentação',
    documentationStatus: 'Pendente',
    contractId: 'contr-08',
    entryDate: '15/07/2026',
    lastActivityDate: '20/09/2026',
    daysSinceLastActivity: 13,
    rating: 4.9,
    services: ['Consulta Domiciliar', 'Vacinação em Casa', 'Acompanhamento Geriátrico'],
    petsServed: 86,
    documents: [
      { id: 'doc-07', name: 'Comprovante CRMV Ativo', type: 'CRMV', status: 'Pendente', updatedAt: '15/07/2026' }
    ],
    history: [
      { id: 'h-05', date: '20/09/2026', title: 'Lembrete automático enviado para regularização de certidão', author: 'Sistema' }
    ]
  },
  {
    id: 'part-05',
    code: 'PART-005',
    name: 'Creche & Hotel Patas Felizes',
    tradeName: 'Patas Felizes Resort Canino',
    category: 'Hotel / Creche',
    cnpjCpf: '45.678.901/0001-23',
    city: 'Niterói',
    state: 'RJ',
    region: 'Niterói',
    neighborhood: 'São Francisco',
    responsibleName: 'Juliana Paes Silveira',
    phone: '(21) 97654-3210',
    email: 'reservas@patasfelizes.com.br',
    status: 'Pendente documentação',
    documentationStatus: 'Pendente',
    contractId: 'contr-11',
    entryDate: '01/06/2025',
    lastActivityDate: '15/09/2026',
    daysSinceLastActivity: 18,
    rating: 4.7,
    services: ['Daycare', 'Hotelzinho', 'Natação Canina', 'Socialização'],
    petsServed: 142,
    documents: [
      { id: 'doc-08', name: 'Alvará Municipal de Funcionamento', type: 'Alvará Sanitário', status: 'Pendente', updatedAt: '01/06/2025', expiresAt: '01/09/2026' }
    ],
    history: [
      { id: 'h-06', date: '15/09/2026', title: 'Alvará expirado detectado na auditoria operacional', author: 'Operações VidaPet' }
    ]
  },
  {
    id: 'part-06',
    code: 'PART-006',
    name: 'Pet Point Charitas',
    tradeName: 'Pet Point Charitas',
    category: 'Pet Shop',
    cnpjCpf: '56.789.012/0001-34',
    city: 'Niterói',
    state: 'RJ',
    region: 'Niterói',
    neighborhood: 'Charitas',
    responsibleName: 'Thiago Faria',
    phone: '(21) 98112-9988',
    email: 'atendimento@petpointcharitas.com.br',
    status: 'Pendente documentação',
    documentationStatus: 'Pendente',
    contractId: 'contr-13',
    entryDate: '12/03/2026',
    lastActivityDate: '25/09/2026',
    daysSinceLastActivity: 8,
    rating: 4.5,
    services: ['Banho e Tosa Especializada', 'Rações Super Premium', 'Acessórios'],
    petsServed: 95,
    documents: [
      { id: 'doc-09', name: 'Termo Aditivo de Credenciamento', type: 'Termo de Adesão', status: 'Pendente', updatedAt: '12/03/2026' }
    ],
    history: [
      { id: 'h-07', date: '25/09/2026', title: 'Aguardando assinatura digital do termo aditivo', author: 'André (Operações)' }
    ]
  },

  // 7 and 8: Inativos há mais de 90 dias (strict match for Scenario & Attention card = 2)
  {
    id: 'part-07',
    code: 'PART-007',
    name: 'SOS Bichos Resgate & Proteção',
    tradeName: 'SOS Bichos ONG',
    category: 'ONG',
    cnpjCpf: '67.890.123/0001-45',
    city: 'São Gonçalo',
    state: 'RJ',
    region: 'São Gonçalo',
    neighborhood: 'Alcântara',
    responsibleName: 'Marina Bastos',
    phone: '(21) 99444-1234',
    email: 'contato@sosbichos.org.br',
    status: 'Inativo',
    documentationStatus: 'Válido',
    contractId: 'contr-14',
    entryDate: '10/01/2024',
    lastActivityDate: '21/06/2026',
    daysSinceLastActivity: 104,
    rating: 4.7,
    services: ['Adoção Responsável', 'Feiras Educativas', 'Mutirões de Castração'],
    petsServed: 65,
    documents: [
      { id: 'doc-10', name: 'Estatuto Social', type: 'Contrato Social', status: 'Válido', updatedAt: '10/01/2024' }
    ],
    history: [
      { id: 'h-08', date: '21/06/2026', title: 'Último mutirão de castração realizado', author: 'Marina Bastos' }
    ]
  },
  {
    id: 'part-08',
    code: 'PART-008',
    name: 'Consultório Bicho Chic',
    tradeName: 'Bicho Chic Veterinária',
    category: 'Veterinário Autônomo',
    cnpjCpf: '78.901.234/0001-56',
    crmv: 'CRMV-RJ 4812',
    city: 'Rio de Janeiro',
    state: 'RJ',
    region: 'Zona Norte',
    neighborhood: 'Tijuca',
    responsibleName: 'Dra. Patrícia Fontes',
    phone: '(21) 98833-2211',
    email: 'patricia@bichochic.com.br',
    status: 'Inativo',
    documentationStatus: 'Válido',
    contractId: 'contr-16',
    entryDate: '03/09/2024',
    lastActivityDate: '27/06/2026',
    daysSinceLastActivity: 98,
    rating: 4.4,
    services: ['Consulta Clínica', 'Vacinação Felina'],
    petsServed: 110,
    documents: [
      { id: 'doc-11', name: 'CRMV e Alvará', type: 'CRMV', status: 'Válido', updatedAt: '03/09/2024' }
    ],
    history: [
      { id: 'h-09', date: '27/06/2026', title: 'Parceiro solicitou pausa para reforma do espaço', author: 'André (Operações)' }
    ]
  },

  // 9, 10, 11: Região Oceânica (Scenario 3: high corporate demand, only 3 partners)
  {
    id: 'part-09',
    code: 'PART-009',
    name: 'Clínica Oceânica Pet',
    tradeName: 'Oceânica Pet Care',
    category: 'Clínica Veterinária',
    cnpjCpf: '89.012.345/0001-67',
    crmv: 'CRMV-RJ 7210',
    city: 'Niterói',
    state: 'RJ',
    region: 'Região Oceânica',
    neighborhood: 'Piratininga',
    responsibleName: 'Dr. Bruno Fonseca',
    phone: '(21) 2619-3300',
    email: 'contato@oceanicapet.com.br',
    status: 'Ativo',
    documentationStatus: 'Válido',
    contractId: 'contr-18',
    entryDate: '15/11/2024',
    lastActivityDate: '02/10/2026',
    daysSinceLastActivity: 1,
    rating: 4.9,
    services: ['Consultas', 'Cirurgia Geral', 'Exames de Sangue', 'Vacinas'],
    petsServed: 410,
    documents: [
      { id: 'doc-12', name: 'Documentação Completa', type: 'Contrato Social', status: 'Válido', updatedAt: '15/11/2024' }
    ],
    history: [
      { id: 'h-10', date: '02/10/2026', title: 'Atendimento de emergência realizado com sucesso', author: 'Dr. Bruno' }
    ]
  },
  {
    id: 'part-10',
    code: 'PART-010',
    name: 'Pet Shop Itaipu Verde',
    tradeName: 'Itaipu Verde Pet',
    category: 'Pet Shop',
    cnpjCpf: '90.123.456/0001-78',
    city: 'Niterói',
    state: 'RJ',
    region: 'Região Oceânica',
    neighborhood: 'Itaipu',
    responsibleName: 'Fabiana Lima',
    phone: '(21) 98777-2244',
    email: 'itaipuverde@gmail.com',
    status: 'Ativo',
    documentationStatus: 'Válido',
    contractId: 'contr-21',
    entryDate: '20/04/2025',
    lastActivityDate: '01/10/2026',
    daysSinceLastActivity: 2,
    rating: 4.6,
    services: ['Banho e Tosa', 'Rações Naturais', 'Taxi Pet'],
    petsServed: 215,
    documents: [
      { id: 'doc-13', name: 'CNPJ e Alvará', type: 'CNPJ', status: 'Válido', updatedAt: '20/04/2025' }
    ],
    history: [
      { id: 'h-11', date: '01/10/2026', title: 'Registro de agendamento corporativo', author: 'Sistema' }
    ]
  },
  {
    id: 'part-11',
    code: 'PART-011',
    name: 'Vet House Camboinhas',
    tradeName: 'Vet House Camboinhas',
    category: 'Clínica Veterinária',
    cnpjCpf: '01.234.567/0001-89',
    crmv: 'CRMV-RJ 8190',
    city: 'Niterói',
    state: 'RJ',
    region: 'Região Oceânica',
    neighborhood: 'Camboinhas',
    responsibleName: 'Dra. Vanessa Rangel',
    phone: '(21) 99888-5544',
    email: 'vanessa@vethousecamboinhas.com.br',
    status: 'Ativo',
    documentationStatus: 'Válido',
    contractId: 'contr-24',
    entryDate: '10/01/2026',
    lastActivityDate: '29/09/2026',
    daysSinceLastActivity: 4,
    rating: 4.9,
    services: ['Dermatologia Veterinária', 'Ultrassom', 'Odontologia Pet'],
    petsServed: 180,
    documents: [
      { id: 'doc-14', name: 'Certidão CRMV', type: 'CRMV', status: 'Válido', updatedAt: '10/01/2026' }
    ],
    history: [
      { id: 'h-12', date: '29/09/2026', title: 'Feedback positivo recebido de colaborador Alfa Tecnologia', author: 'André (Operações)' }
    ]
  }
];

// Helper to generate remaining 41 partners systematically to reach exactly 52
// Distribution:
// Clínicas: 22 (part-01, 09, 11 + 19 generated = 22)
// Pet Shop: 8 (part-02, 06, 10 + 5 generated = 8)
// Hospital: 6 (part-03 + 5 generated = 6)
// Veterinários: 5 (part-04, 08 + 3 generated = 5)
// Hotel / Creche: 4 (part-05 + 3 generated = 4)
// ONGs: 4 (part-07 + 3 generated = 4)
// Outros: 3 (3 generated = 3)
// Total = 52!
// Regional distribution targets:
// Niterói: 12 (part-01, 02, 05, 06 + 8 gen = 12)
// Zona Sul: 10 (part-03 + 9 gen = 10)
// Barra: 8 (part-04 + 7 gen = 8)
// Zona Norte: 7 (part-08 + 6 gen = 7)
// Região Oceânica: 3 (part-09, 10, 11 = 3)
// São Gonçalo: 4 (part-07 + 3 gen = 4)
// Baixada: 5 (5 gen = 5)
// Centro: 3 (3 gen = 3)
// Total = 52!

const additionalPartnersData = [
  // Niterói (8 more)
  { name: 'Clínica Veterinária Vital Pet', cat: 'Clínica Veterinária', reg: 'Niterói', neigh: 'Ingá', city: 'Niterói', rating: 4.7, pets: 240, status: 'Ativo' },
  { name: 'Centro Veterinário Santa Rosa', cat: 'Clínica Veterinária', reg: 'Niterói', neigh: 'Santa Rosa', city: 'Niterói', rating: 4.8, pets: 310, status: 'Ativo' },
  { name: 'Hospital Veterinário Niterói 24h', cat: 'Hospital Veterinário', reg: 'Niterói', neigh: 'Centro', city: 'Niterói', rating: 4.9, pets: 490, status: 'Ativo' },
  { name: 'Clínica Amigo Fiel Fonseca', cat: 'Clínica Veterinária', reg: 'Niterói', neigh: 'Fonseca', city: 'Niterói', rating: 4.5, pets: 180, status: 'Ativo' },
  { name: 'Bicho Mania Pet Boutique', cat: 'Pet Shop', reg: 'Niterói', neigh: 'Icaraí', city: 'Niterói', rating: 4.6, pets: 160, status: 'Ativo' },
  { name: 'Dr. Marcelo Alves Cardiologia Vet', cat: 'Veterinário Autônomo', reg: 'Niterói', neigh: 'Icaraí', city: 'Niterói', rating: 5.0, pets: 120, status: 'Ativo' },
  { name: 'Espaço Pet Niterói Creche', cat: 'Hotel / Creche', reg: 'Niterói', neigh: 'Piratininga', city: 'Niterói', rating: 4.7, pets: 95, status: 'Ativo' },
  { name: 'Gatocão Fisioterapia Animal', cat: 'Outros', reg: 'Niterói', neigh: 'São Francisco', city: 'Niterói', rating: 4.9, pets: 88, status: 'Ativo' },

  // Zona Sul RJ (9 more)
  { name: 'Hospital Veterinário Pró-Vita Copacabana', cat: 'Hospital Veterinário', reg: 'Zona Sul', neigh: 'Copacabana', city: 'Rio de Janeiro', rating: 4.8, pets: 520, status: 'Ativo' },
  { name: 'Clínica Vet Leblon', cat: 'Clínica Veterinária', reg: 'Zona Sul', neigh: 'Leblon', city: 'Rio de Janeiro', rating: 4.9, pets: 380, status: 'Ativo' },
  { name: 'Clínica Veterinária Ipanema Pets', cat: 'Clínica Veterinária', reg: 'Zona Sul', neigh: 'Ipanema', city: 'Rio de Janeiro', rating: 4.7, pets: 290, status: 'Ativo' },
  { name: 'Gato & Cão Clínica Laranjeiras', cat: 'Clínica Veterinária', reg: 'Zona Sul', neigh: 'Laranjeiras', city: 'Rio de Janeiro', rating: 4.6, pets: 230, status: 'Ativo' },
  { name: 'Pet Spa Flamengo', cat: 'Pet Shop', reg: 'Zona Sul', neigh: 'Flamengo', city: 'Rio de Janeiro', rating: 4.8, pets: 175, status: 'Ativo' },
  { name: 'Dra. Helena Sato Dermatologia Felina', cat: 'Veterinário Autônomo', reg: 'Zona Sul', neigh: 'Gávea', city: 'Rio de Janeiro', rating: 4.9, pets: 140, status: 'Ativo' },
  { name: 'Pousada Pet Jardim Botânico', cat: 'Hotel / Creche', reg: 'Zona Sul', neigh: 'Jardim Botânico', city: 'Rio de Janeiro', rating: 4.8, pets: 110, status: 'Ativo' },
  { name: 'Instituto Quatro Patas Rio', cat: 'ONG', reg: 'Zona Sul', neigh: 'Urca', city: 'Rio de Janeiro', rating: 4.9, pets: 95, status: 'Ativo' },
  { name: 'Clínica Veterinária Humaitá', cat: 'Clínica Veterinária', reg: 'Zona Sul', neigh: 'Humaitá', city: 'Rio de Janeiro', rating: 4.6, pets: 210, status: 'Ativo' },

  // Barra da Tijuca (7 more)
  { name: 'Hospital Vet Barra D’Or', cat: 'Hospital Veterinário', reg: 'Barra', neigh: 'Barra da Tijuca', city: 'Rio de Janeiro', rating: 4.9, pets: 610, status: 'Ativo' },
  { name: 'Clínica Veterinária Jardim Oceânico', cat: 'Clínica Veterinária', reg: 'Barra', neigh: 'Jardim Oceânico', city: 'Rio de Janeiro', rating: 4.8, pets: 340, status: 'Ativo' },
  { name: 'MegaPet Barra Mall', cat: 'Pet Shop', reg: 'Barra', neigh: 'Barra da Tijuca', city: 'Rio de Janeiro', rating: 4.6, pets: 220, status: 'Ativo' },
  { name: 'Centro Diagnóstico Veterinário Recreio', cat: 'Clínica Veterinária', reg: 'Barra', neigh: 'Recreio dos Bandeirantes', city: 'Rio de Janeiro', rating: 4.7, pets: 295, status: 'Ativo' },
  { name: 'Hotel & Spa Canino Bosque Marapendi', cat: 'Hotel / Creche', reg: 'Barra', neigh: 'Barra da Tijuca', city: 'Rio de Janeiro', rating: 4.9, pets: 155, status: 'Ativo' },
  { name: 'Clínica Médica Felina Barra', cat: 'Clínica Veterinária', reg: 'Barra', neigh: 'Barra da Tijuca', city: 'Rio de Janeiro', rating: 4.8, pets: 190, status: 'Ativo' },
  { name: 'Pet Ambulância & Resgate Rio', cat: 'Outros', reg: 'Barra', neigh: 'Barra da Tijuca', city: 'Rio de Janeiro', rating: 4.7, pets: 72, status: 'Ativo' },

  // Zona Norte (6 more)
  { name: 'Clínica Veterinária Maracanã', cat: 'Clínica Veterinária', reg: 'Zona Norte', neigh: 'Maracanã', city: 'Rio de Janeiro', rating: 4.7, pets: 260, status: 'Ativo' },
  { name: 'Hospital Veterinário Grajaú 24h', cat: 'Hospital Veterinário', reg: 'Zona Norte', neigh: 'Grajaú', city: 'Rio de Janeiro', rating: 4.8, pets: 430, status: 'Ativo' },
  { name: 'Clínica Vet Méier Central', cat: 'Clínica Veterinária', reg: 'Zona Norte', neigh: 'Méier', city: 'Rio de Janeiro', rating: 4.6, pets: 280, status: 'Ativo' },
  { name: 'Pet Shop & Estética Vila Isabel', cat: 'Pet Shop', reg: 'Zona Norte', neigh: 'Vila Isabel', city: 'Rio de Janeiro', rating: 4.5, pets: 190, status: 'Ativo' },
  { name: 'Associação Protetora Amigos da Tijuca', cat: 'ONG', reg: 'Zona Norte', neigh: 'Tijuca', city: 'Rio de Janeiro', rating: 4.8, pets: 80, status: 'Ativo' },
  { name: 'Clínica Veterinária Madureira', cat: 'Clínica Veterinária', reg: 'Zona Norte', neigh: 'Madureira', city: 'Rio de Janeiro', rating: 4.5, pets: 240, status: 'Ativo' },

  // São Gonçalo (3 more)
  { name: 'Hospital Veterinário Central São Gonçalo', cat: 'Hospital Veterinário', reg: 'São Gonçalo', neigh: 'Centro', city: 'São Gonçalo', rating: 4.6, pets: 390, status: 'Ativo' },
  { name: 'Clínica Veterinária Zé Garoto', cat: 'Clínica Veterinária', reg: 'São Gonçalo', neigh: 'Zé Garoto', city: 'São Gonçalo', rating: 4.5, pets: 210, status: 'Ativo' },
  { name: 'Mundo Pet Neves', cat: 'Pet Shop', reg: 'São Gonçalo', neigh: 'Neves', city: 'São Gonçalo', rating: 4.4, pets: 130, status: 'Ativo' },

  // Baixada Fluminense (5)
  { name: 'Hospital Veterinário Nova Iguaçu', cat: 'Hospital Veterinário', reg: 'Baixada', neigh: 'Centro', city: 'Nova Iguaçu', rating: 4.7, pets: 410, status: 'Ativo' },
  { name: 'Clínica Veterinária Caxias Pet', cat: 'Clínica Veterinária', reg: 'Baixada', neigh: '25 de Agosto', city: 'Duque de Caxias', rating: 4.6, pets: 260, status: 'Ativo' },
  { name: 'Dr. Thiago Vasques Cirurgia e Ortopedia', cat: 'Veterinário Autônomo', reg: 'Baixada', neigh: 'Centro', city: 'Nova Iguaçu', rating: 4.8, pets: 140, status: 'Ativo' },
  { name: 'Pet Care São João de Meriti', cat: 'Clínica Veterinária', reg: 'Baixada', neigh: 'Vilar dos Teles', city: 'São João de Meriti', rating: 4.5, pets: 190, status: 'Ativo' },
  { name: 'ONG Coração Peludo Nilópolis', cat: 'ONG', reg: 'Baixada', neigh: 'Centro', city: 'Nilópolis', rating: 4.7, pets: 75, status: 'Ativo' },

  // Centro (3)
  { name: 'Clínica Veterinária Carioca', cat: 'Clínica Veterinária', reg: 'Centro', neigh: 'Centro', city: 'Rio de Janeiro', rating: 4.6, pets: 220, status: 'Ativo' },
  { name: 'Pet Shop Estácio Express', cat: 'Pet Shop', reg: 'Centro', neigh: 'Estácio', city: 'Rio de Janeiro', rating: 4.4, pets: 110, status: 'Ativo' },
  { name: 'NutriPet Consultoria Alimentar', cat: 'Outros', reg: 'Centro', neigh: 'Glória', city: 'Rio de Janeiro', rating: 4.9, pets: 65, status: 'Ativo' }
];

let partnerIndex = 12;
for (const p of additionalPartnersData) {
  const codeNum = String(partnerIndex).padStart(3, '0');
  initialPartners.push({
    id: `part-${codeNum}`,
    code: `PART-${codeNum}`,
    name: p.name,
    tradeName: p.name,
    category: p.cat as PartnerCategory,
    cnpjCpf: `${Math.floor(10 + Math.random() * 89)}.${Math.floor(100 + Math.random() * 899)}.${Math.floor(100 + Math.random() * 899)}/0001-${Math.floor(10 + Math.random() * 89)}`,
    crmv: p.cat.includes('Vet') || p.cat.includes('Hospital') ? `CRMV-RJ ${Math.floor(2000 + Math.random() * 8000)}` : undefined,
    city: p.city,
    state: 'RJ',
    region: p.reg,
    neighborhood: p.neigh,
    responsibleName: `Responsável ${p.name.split(' ')[1] || 'Técnico'}`,
    phone: `(21) 9${Math.floor(7000 + Math.random() * 2999)}-${Math.floor(1000 + Math.random() * 8999)}`,
    email: `contato@${p.name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 16)}.com.br`,
    status: (p.status || 'Ativo') as PartnerStatus,
    documentationStatus: 'Válido' as DocStatus,
    contractId: `contr-${String(partnerIndex).padStart(2, '0')}`,
    entryDate: '15/03/2025',
    lastActivityDate: '28/09/2026',
    daysSinceLastActivity: Math.floor(1 + Math.random() * 25),
    rating: p.rating,
    services: ['Consultas Clínicas', 'Vacinação e Vermifugação', 'Atendimento Agendado'],
    petsServed: p.pets,
    documents: [
      { id: `doc-${partnerIndex}-1`, name: 'Contrato Social', type: 'Contrato Social', status: 'Válido', updatedAt: '15/03/2025' },
      { id: `doc-${partnerIndex}-2`, name: 'Alvará de Funcionamento', type: 'Alvará Sanitário', status: 'Válido', updatedAt: '20/01/2026' }
    ],
    history: [
      { id: `h-${partnerIndex}-1`, date: '28/09/2026', title: 'Atendimento corporativo validado', author: 'Sistema' }
    ]
  });
  partnerIndex++;
}
