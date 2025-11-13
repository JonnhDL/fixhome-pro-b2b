import { PlusCircle, Briefcase, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatCard } from "../components/stat-card";
import { ProjectDataTable } from "../components/project-data-table";
import { mockProjects, mockProposals, mockUsers } from "@/lib/data";
import { NewProjectDialog } from "./_components/new-project-dialog";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function AdminDashboardPage() {
  const totalProjects = mockProjects.length;
  const totalProposals = mockProposals.length;
  const totalUsers = mockUsers.length;

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
            <ProjectDataTable projects={mockProjects} role="Empresa" />
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}