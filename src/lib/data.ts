import type { User, Project, Proposal, UserRole } from './types';
import { placeholderImages } from './placeholder-images.json';

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const mockUsers: User[] = [
  { id: 'user1', name: 'Admin FixHome', email: 'admin@fixhome.pt', role: 'Empresa', avatarUrl: placeholderImages.find(p => p.id === 'avatar1')?.imageUrl || '' },
  { id: 'user2', name: 'Construtora Ideal', email: 'geral@construtoraideal.pt', role: 'Profissional', avatarUrl: placeholderImages.find(p => p.id === 'avatar3')?.imageUrl || '' },
  { id: 'user3', name: 'João Silva (Cliente)', email: 'joao.silva@email.com', role: 'Cliente', avatarUrl: placeholderImages.find(p => p.id === 'avatar1')?.imageUrl || '' },
  { id: 'user4', name: 'Maria Costa (Arquiteta)', email: 'maria.costa@email.com', role: 'Profissional', avatarUrl: placeholderImages.find(p => p.id === 'avatar2')?.imageUrl || '' }
];

export const mockProjects: Project[] = [
  {
    id: 'proj1',
    title: 'Renovação Completa de Apartamento T3',
    description: 'Renovação total de um apartamento T3, incluindo nova cozinha, casas de banho, pavimento e pintura.',
    budget: 50000,
    deadline: addDays(new Date(), 30),
    status: 'Aberto',
    clientId: 'user3',
    clientName: 'João Silva',
    files: [{ name: 'planta_apartamento.pdf', url: '#' }],
    createdAt: addDays(new Date(), -5),
  },
  {
    id: 'proj2',
    title: 'Construção de Piscina Exterior',
    description: 'Construção de uma piscina de 8x4 metros em betão projetado, com sistema de tratamento de sal.',
    budget: 25000,
    deadline: addDays(new Date(), 45),
    status: 'Em Análise',
    clientId: 'user3',
    clientName: 'João Silva',
    files: [{ name: 'terreno.pdf', url: '#' }, { name: 'inspiracao.jpg', url: '#' }],
    createdAt: addDays(new Date(), -10),
  },
  {
    id: 'proj3',
    title: 'Remodelação de Fachada de Loja',
    description: 'Modernização da fachada de uma loja no centro da cidade, incluindo nova montra e iluminação.',
    budget: 15000,
    deadline: addDays(new Date(), 20),
    status: 'Adjudicado',
    clientId: 'user-loja',
    clientName: 'Retalho Moderno Lda',
    awardedContractorId: 'user2',
    files: [{ name: 'desenho_fachada.dwg', url: '#' }],
    createdAt: addDays(new Date(), -30),
  },
  {
    id: 'proj4',
    title: 'Instalação Elétrica em Armazém',
    description: 'Projeto e instalação de toda a infraestrutura elétrica para um novo armazém logístico.',
    budget: 80000,
    deadline: addDays(new Date(), 60),
    status: 'Aberto',
    clientId: 'user-logistica',
    clientName: 'LogiCentro',
    files: [{ name: 'planta_armazem.pdf', url: '#' }],
    createdAt: addDays(new Date(), -2),
  },
];

export const mockProposals: Proposal[] = [
  {
    id: 'prop1',
    projectId: 'proj2',
    contractorId: 'user2',
    contractorName: 'Construtora Ideal',
    contractorAvatar: mockUsers.find(u => u.id === 'user2')?.avatarUrl || '',
    technicalProposal: 'Propomos a utilização de betão de alta performance e um sistema de liner reforçado para maior durabilidade. O sistema de tratamento de água será da marca de topo X, com controlo automatizado via app.',
    financialBid: 24500,
    estimatedTimeline: '6 semanas',
    files: [{ name: 'orcamento_detalhado.xlsx', url: '#' }],
    submittedAt: addDays(new Date(), -8),
    status: 'Pendente',
  },
  {
    id: 'prop2',
    projectId: 'proj2',
    contractorId: 'user4',
    contractorName: 'Piscinas & Jardins',
    contractorAvatar: mockUsers.find(u => u.id === 'user4')?.avatarUrl || '',
    technicalProposal: 'A nossa solução foca-se na rapidez de execução com painéis modulares. Incluímos um deck em madeira compósita na área circundante.',
    financialBid: 26000,
    estimatedTimeline: '5 semanas',
    files: [{ name: 'apresentacao_piscinas.pdf', url: '#' }],
    submittedAt: addDays(new Date(), -7),
    status: 'Pendente',
  },
  {
    id: 'prop3',
    projectId: 'proj3',
    contractorId: 'user2',
    contractorName: 'Construtora Ideal',
    contractorAvatar: mockUsers.find(u => u.id === 'user2')?.avatarUrl || '',
    technicalProposal: 'Execução conforme projeto, com materiais de alta qualidade e garantia de 5 anos.',
    financialBid: 14800,
    estimatedTimeline: '3 semanas',
    files: [],
    submittedAt: addDays(new Date(), -25),
    status: 'Selecionada',
    score: 92,
  },
];

export const getProjectsForUser = (userId: string, role: UserRole) => {
  if (role === 'Empresa') {
    return mockProjects;
  }
  if (role === 'Cliente') {
    return mockProjects.filter(p => p.clientId === userId);
  }
  if (role === 'Profissional') {
    return mockProjects.filter(p => p.status === 'Aberto' || p.status === 'Em Análise');
  }
  return [];
}
