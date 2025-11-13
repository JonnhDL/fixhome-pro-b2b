import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project, UserRole } from "@/lib/types"
import { format } from "date-fns"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ProjectDataTableProps = {
  projects: Project[];
  role: UserRole;
};

export function ProjectDataTable({ projects, role }: ProjectDataTableProps) {
  const getStatusVariant = (status: Project['status']) => {
    switch (status) {
      case 'Aberto': return 'default';
      case 'Concluído': return 'outline';
      case 'Adjudicado':
      case 'Em Progresso': return 'secondary';
      default: return 'destructive';
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Projeto</TableHead>
          {role === 'Empresa' && <TableHead>Cliente</TableHead>}
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Orçamento</TableHead>
          <TableHead>Prazo</TableHead>
          <TableHead>
            <span className="sr-only">Ações</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.title}</TableCell>
            {role === 'Empresa' && <TableCell>{project.clientName}</TableCell>}
            <TableCell>
              <Badge variant={getStatusVariant(project.status)}>
                {project.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(project.budget)}
            </TableCell>
            <TableCell>{format(project.deadline, "dd/MM/yyyy")}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ações</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/projects/${project.id}`}>Ver Detalhes</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Eliminar</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
