import { notFound } from "next/navigation";
import { format } from "date-fns";
import { mockProjects, mockProposals } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { File, Calendar, DollarSign, User } from "lucide-react";
import Link from "next/link";
import { ProposalForm } from "./_components/proposal-form";
import { ProposalsList } from "./_components/proposals-list";

// In a real app, you'd get the role from the session
type PageProps = {
  params: { id: string },
  searchParams: { role?: 'Empresa' | 'Profissional' | 'Cliente' }
};

export default function ProjectDetailsPage({ params, searchParams }: PageProps) {
  const { id } = params;
const project = mockProjects.find((p) => p.id === id);
  if (!project) {
    notFound();
  }
  
  const role = searchParams.role || 'Empresa'; // Default to admin for demo
  const proposals = mockProposals.filter(p => p.projectId === project.id);

  const renderContentByRole = () => {
    switch (role) {
      case 'Empresa':
        return <ProposalsList proposals={proposals} />;
      case 'Profissional':
        return <ProposalForm projectId={project.id} />;
      case 'Cliente':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Estado do Projeto</CardTitle>
            </CardHeader>
            <CardContent>
              <p>O seu projeto está atualmente <span className="font-semibold">{project.status}</span>.</p>
              {project.status === 'Em Análise' && <p className="mt-2 text-muted-foreground">As propostas estão a ser avaliadas. Será notificado em breve.</p>}
              {project.status === 'Adjudicado' && <p className="mt-2 text-muted-foreground">O projeto foi adjudicado. O profissional selecionado irá entrar em contacto.</p>}
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <Badge variant="secondary">{project.status}</Badge>
        <h1 className="mt-2 text-4xl font-bold font-headline tracking-tight">{project.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Cliente: {project.clientName}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>Orçamento: {new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(project.budget)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Prazo: {format(project.deadline, "dd 'de' MMMM 'de' yyyy")}</span>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Descrição do Projeto</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{project.description}</p>
            </CardContent>
          </Card>

          {renderContentByRole()}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documentos do Projeto</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {project.files.map((file) => (
                  <li key={file.name}>
                    <Link href={file.url} className="flex items-center gap-2 text-sm text-primary hover:underline">
                      <File className="h-4 w-4" />
                      <span>{file.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary">
             <CardHeader>
                <CardTitle>Mudar de Perfil (Demo)</CardTitle>
                <CardDescription>Veja esta página como um utilizador diferente.</CardDescription>
             </CardHeader>
             <CardContent className="flex flex-col gap-2">
                <Link href={`?role=Empresa`} className="text-sm font-medium text-primary hover:underline">Ver como Admin</Link>
                <Link href={`?role=Profissional`} className="text-sm font-medium text-primary hover:underline">Ver como Profissional</Link>
                <Link href={`?role=Cliente`} className="text-sm font-medium text-primary hover:underline">Ver como Cliente</Link>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
