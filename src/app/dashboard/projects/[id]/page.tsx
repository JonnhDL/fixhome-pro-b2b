'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProjectById, type Project } from '@/lib/firebase/firestore';
import { ProposalForm } from './_components/proposal-form';
import { ProposalsList } from './_components/proposals-list';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, User, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = params.id as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    try {
      const data = await getProjectById(projectId);
      setProject(data);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-2">Projeto não encontrado</h1>
        <p className="text-muted-foreground">O projeto que procura não existe.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-4">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary">
            {project.status}
          </Badge>
          <ProposalForm projectId={projectId} projectTitle={project.title} />
        </div>
        
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          {project.title}
        </h1>
        
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Cliente: {project.clientName}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>
              Orçamento: {new Intl.NumberFormat('pt-PT', { 
                style: 'currency', 
                currency: 'EUR' 
              }).format(project.budget)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>
              Prazo: {format(new Date(project.deadline), "dd 'de' MMMM 'de' yyyy", { locale: pt })}
            </span>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Descrição do Projeto</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-wrap">
            {project.description}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Informações Adicionais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Estado:</span>
            <Badge variant="secondary">{project.status}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Criado em:</span>
            <span className="text-muted-foreground">
              {project.createdAt ? format(new Date(project.createdAt.seconds * 1000), "dd/MM/yyyy") : 'N/A'}
            </span>
          </div>
        </CardContent>
      </Card>

      <ProposalsList projectId={projectId} />
    </div>
  );
}