import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Calendar, DollarSign, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-lg">{project.title}</CardTitle>
        <CardDescription>por {project.clientName}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>{new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(project.budget)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{format(project.deadline, 'dd/MM/yyyy')}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <span>{project.files.length} anexo(s)</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge variant={project.status === 'Aberto' ? 'default' : 'secondary'}>{project.status}</Badge>
        <Button asChild variant="link">
          <Link href={`/dashboard/projects/${project.id}`}>
            Ver e Submeter Proposta <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
