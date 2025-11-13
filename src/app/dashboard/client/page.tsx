import { Briefcase, FileText, Clock, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatCard } from "../components/stat-card";
import { ProjectDataTable } from "../components/project-data-table";
import { mockProjects, mockProposals } from "@/lib/data";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function ClientDashboardPage() {
  // Mock data - filtrar projetos do cliente
  const myProjects = mockProjects.filter(p => p.clientId === "client-1");
  const openProjects = myProjects.filter(p => p.status === "aberto");
  const inProgressProjects = myProjects.filter(p => p.status === "em-analise");
  const completedProjects = myProjects.filter(p => p.status === "adjudicado");

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
            value={myProjects.length.toString()}
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
            <ProjectDataTable projects={myProjects} role="Cliente" />
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}