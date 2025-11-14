'use client';

import { useEffect, useState } from 'react';
import { Briefcase, Users, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "../components/stat-card";
import { ProjectDataTable } from "../components/project-data-table";
import { NewProjectDialog } from "./_components/new-project-dialog";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { getAllProjects, type Project } from "@/lib/firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalProjects = projects.length;
  const totalProposals = 0; // Por enquanto
  const totalUsers = 4; // Mock - será real depois

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline">Dashboard de Administração</h1>
            <p className="text-muted-foreground">Visão geral da plataforma FixHome Pro.</p>
          </div>
          <NewProjectDialog />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total de Projetos"
            value={totalProjects.toString()}
            icon={Briefcase}
            description="Número total de projetos na plataforma."
          />
          <StatCard
            title="Total de Propostas"
            value={totalProposals.toString()}
            icon={FileText}
            description="Número total de propostas submetidas."
          />
          <StatCard
            title="Total de Utilizadores"
            value={totalUsers.toString()}
            icon={Users}
            description="Empresas, profissionais e clientes."
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Todos os Projetos</CardTitle>
            <CardDescription>
              Gira todos os projetos submetidos na plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Nenhum projeto criado ainda
                </p>
                <NewProjectDialog />
              </div>
            ) : (
              <ProjectDataTable projects={projects} role="Empresa" />
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}