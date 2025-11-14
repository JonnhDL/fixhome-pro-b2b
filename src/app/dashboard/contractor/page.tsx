'use client';

import { useEffect, useState } from 'react';
import { Package, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "../components/stat-card";
import { ProjectDataTable } from "../components/project-data-table";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from '@/context/AuthContext';
import { getAllProjects, type Project } from "@/lib/firebase/firestore";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Skeleton } from "@/components/ui/skeleton";

export default function ContractorDashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [myProposals, setMyProposals] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    loadProjects();
    if (user) {
      loadMyProposals();
    }
  }, [user]);

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

  const loadMyProposals = async () => {
    if (!user) return;
    
    try {
      const q = query(
        collection(db, 'proposals'),
        where('contractorId', '==', user.uid)
      );
      const snapshot = await getDocs(q);
      setMyProposals(snapshot.size);
    } catch (error) {
      console.error('Error loading proposals:', error);
    }
  };

  const availableProjects = projects.filter(p => p.status === "aberto");
  const acceptedProposals = 0; // Mock por enquanto

  return (
    <ProtectedRoute allowedRoles={['contractor']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline">Dashboard Profissional</h1>
            <p className="text-muted-foreground">Gira as tuas propostas e projetos disponíveis.</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Projetos Disponíveis"
            value={availableProjects.length.toString()}
            icon={Package}
            description="Projetos abertos para propostas."
          />
          <StatCard
            title="Minhas Propostas"
            value={myProposals.toString()}
            icon={TrendingUp}
            description="Total de propostas submetidas."
          />
          <StatCard
            title="Propostas Aceites"
            value={acceptedProposals.toString()}
            icon={CheckCircle2}
            description="Propostas aprovadas pelo cliente."
          />
          <StatCard
            title="Em Andamento"
            value="0"
            icon={Clock}
            description="Projetos atualmente em execução."
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Projetos Disponíveis</CardTitle>
            <CardDescription>
              Projetos abertos onde podes submeter propostas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : availableProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Nenhum projeto disponível no momento
                </p>
              </div>
            ) : (
              <ProjectDataTable projects={availableProjects} role="Profissional" />
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}