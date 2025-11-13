import { Package, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatCard } from "../components/stat-card";
import { ProjectDataTable } from "../components/project-data-table";
import { mockProjects, mockProposals } from "@/lib/data";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function ContractorDashboardPage() {
  // Mock data - filtrar projetos onde o contractor pode fazer proposta
  const availableProjects = mockProjects.filter(p => p.status === "aberto");
  const myProposals = mockProposals.filter(p => p.contractorId === "contractor-1");
  const acceptedProposals = myProposals.filter(p => p.status === "aceite");

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
            value={myProposals.length.toString()}
            icon={TrendingUp}
            description="Total de propostas submetidas."
          />
          <StatCard
            title="Propostas Aceites"
            value={acceptedProposals.length.toString()}
            icon={CheckCircle2}
            description="Propostas aprovadas pelo cliente."
          />
          <StatCard
            title="Em Andamento"
            value="1"
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
            <ProjectDataTable projects={availableProjects} role="Profissional" />
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}