import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectDataTable } from "../components/project-data-table";
import { getProjectsForUser } from "@/lib/data";

export default function ClientDashboardPage() {
  // For demo, using user 'user3'
  const userProjects = getProjectsForUser('user3', 'Cliente');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Dashboard do Cliente</h1>
          <p className="text-muted-foreground">Acompanhe os seus projetos.</p>
        </div>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Submeter Projeto
          </span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Os Meus Projetos</CardTitle>
          <CardDescription>
            Aqui pode ver todos os projetos que submeteu e o seu estado atual.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectDataTable projects={userProjects} role="Cliente" />
        </CardContent>
      </Card>
    </div>
  );
}
