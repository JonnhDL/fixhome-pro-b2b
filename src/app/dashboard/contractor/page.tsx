import { mockProjects } from "@/lib/data";
import { ProjectCard } from "../components/project-card";

export default function ContractorDashboardPage() {
  const openProjects = mockProjects.filter(p => p.status === 'Aberto');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Projetos Disponíveis</h1>
        <p className="text-muted-foreground">
          Encontre novas oportunidades e submeta a sua proposta.
        </p>
      </div>
      
      {openProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {openProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="text-xl font-semibold">Nenhum projeto aberto de momento.</h3>
          <p className="text-muted-foreground mt-2">Volte mais tarde para ver novas oportunidades.</p>
        </div>
      )}
    </div>
  );
}
