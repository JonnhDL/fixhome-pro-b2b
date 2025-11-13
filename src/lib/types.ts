export type UserRole = 'Empresa' | 'Profissional' | 'Cliente';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
};

export type ProjectStatus = 'Aberto' | 'Em Análise' | 'Adjudicado' | 'Em Progresso' | 'Concluído';

export type Project = {
  id: string;
  title: string;
  description: string;
  budget: number;
  deadline: Date;
  status: ProjectStatus;
  clientId: string;
  clientName: string;
  awardedContractorId?: string;
  files: { name: string; url: string }[];
  createdAt: Date;
};

export type Proposal = {
  id: string;
  projectId: string;
  contractorId: string;
  contractorName: string;
  contractorAvatar: string;
  technicalProposal: string;
  financialBid: number;
  estimatedTimeline: string; // e.g., "4 weeks"
  files: { name: string; url: string }[];
  submittedAt: Date;
  score?: number;
  status: 'Pendente' | 'Selecionada' | 'Rejeitada';
};
