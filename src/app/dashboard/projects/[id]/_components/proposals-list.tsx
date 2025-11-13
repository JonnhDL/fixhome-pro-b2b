import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Proposal } from "@/lib/types";
import { format } from "date-fns";
import { Award, FileText, Star } from "lucide-react";

export function ProposalsList({ proposals }: { proposals: Proposal[] }) {
  if (proposals.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardHeader>
          <CardTitle>Nenhuma Proposta Recebida</CardTitle>
          <CardDescription>Ainda não foram submetidas propostas para este projeto.</CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  const sortedProposals = [...proposals].sort((a, b) => (b.score || 0) - (a.score || 0));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Propostas Recebidas</CardTitle>
        <CardDescription>Avalie as propostas submetidas pelos profissionais.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {sortedProposals.map((proposal, index) => (
          <div key={proposal.id}>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={proposal.contractorAvatar} />
                    <AvatarFallback>{proposal.contractorName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{proposal.contractorName}</p>
                    <p className="text-sm text-muted-foreground">Submetido em: {format(proposal.submittedAt, 'dd/MM/yyyy')}</p>
                  </div>
                   <Badge variant={proposal.status === 'Selecionada' ? 'default' : 'outline'} className="ml-auto">{proposal.status}</Badge>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{proposal.technicalProposal}</p>
                {proposal.files.length > 0 && (
                  <Button variant="link" className="p-0 h-auto mt-2">
                    <FileText className="mr-2 h-4 w-4" /> Ver Anexos ({proposal.files.length})
                  </Button>
                )}
              </div>
              <div className="w-full sm:w-48 flex flex-col items-start sm:items-end gap-2">
                <p className="text-2xl font-bold">{new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(proposal.financialBid)}</p>
                <p className="text-sm text-muted-foreground">Prazo: {proposal.estimatedTimeline}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="font-bold text-lg">{proposal.score || 'N/A'}</span>
                </div>
                <Button size="sm" className="w-full sm:w-auto mt-2">
                  <Award className="mr-2 h-4 w-4" /> Adjudicar
                </Button>
              </div>
            </div>
            {index < proposals.length - 1 && <Separator className="mt-6" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
