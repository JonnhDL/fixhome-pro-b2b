'use client';

import { useEffect, useState } from 'react';
import { Briefcase, FileText, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "../components/stat-card";
import { ProjectDataTable } from "../components/project-data-table";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { getProjectsByUser, type Project } from "@/lib/firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  const loadProjects = async () => {
    if (!user) return;
    
    try {
      const data = await getProjectsByUser(user.uid);
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const openProjects = projects.filter(p => p.status === "aberto");
  const inProgressProjects = projects.filter(p => p.status === "em-analise");
  const completedProjects = projects.filter(p => p.status === "adjudicado" || p.status === "concluido");

  return (
    <ProtectedRoute allowedRoles={['client']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline">Dashboard Cliente</h1>
            <p className="text-muted-foreground">Acompanha os teus projetos e propostas recebidas.</p>
          </div>
          <Button>Novo Projeto</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Meus Projetos"
            value={projects.length.toString()}
            icon={Briefcase}
            description="Total de projetos criados."
          />
          <StatCard
            title="Abertos"
            value={openProjects.length.toString()}
            icon={Clock}
            description="Projetos aguardando propostas."
          />
          <StatCard
            title="Em Análise"
            value={inProgressProjects.length.toString()}
            icon={FileText}
            description="Projetos com propostas recebidas."
          />
          <StatCard
            title="Concluídos"
            value={completedProjects.length.toString()}
            icon={CheckCircle2}
            description="Projetos adjudicados ou finalizados."
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Meus Projetos</CardTitle>
            <CardDescription>
              Gira todos os teus projetos e vê as propostas recebidas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Ainda não criou nenhum projeto
                </p>
                <Button>Criar Primeiro Projeto</Button>
              </div>
            ) : (
              <ProjectDataTable projects={projects} role="Cliente" />
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}