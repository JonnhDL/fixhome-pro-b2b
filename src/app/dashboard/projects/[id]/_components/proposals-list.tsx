'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProposalsByProject, updateProposal, type Proposal } from '@/lib/firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Clock, Loader2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface ProposalsListProps {
  projectId: string;
}

export function ProposalsList({ projectId }: ProposalsListProps) {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    loadProposals();
  }, [projectId]);

  const loadProposals = async () => {
    try {
      const data = await getProposalsByProject(projectId);
      setProposals(data);
    } catch (error) {
      console.error('Error loading proposals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (proposalId: string) => {
    if (!proposalId) return;
    
    setActionLoading(proposalId);
    try {
      await updateProposal(proposalId, { status: 'aceite' });
      
      toast({
        title: 'Sucesso!',
        description: 'Proposta aceite com sucesso',
      });
      
      await loadProposals();
      router.refresh();
    } catch (error) {
      console.error('Error accepting proposal:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao aceitar proposta',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (proposalId: string) => {
    if (!proposalId) return;
    
    setActionLoading(proposalId);
    try {
      await updateProposal(proposalId, { status: 'rejeitada' });
      
      toast({
        title: 'Proposta Rejeitada',
        description: 'A proposta foi rejeitada',
      });
      
      await loadProposals();
      router.refresh();
    } catch (error) {
      console.error('Error rejecting proposal:', error);
      toast({
        title: 'Erro',
        description: 'Erro ao rejeitar proposta',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Propostas Recebidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (proposals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Propostas Recebidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">
              Nenhuma proposta recebida ainda
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Propostas Recebidas ({proposals.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {proposals.map((proposal) => (
          <div
            key={proposal.id}
            className="border rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold">{proposal.contractorName}</h4>
                <p className="text-sm text-muted-foreground">
                  Prazo: {proposal.timeline}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {new Intl.NumberFormat('pt-PT', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(proposal.amount)}
                </p>
                <Badge variant={
                  proposal.status === 'aceite' ? 'default' :
                  proposal.status === 'rejeitada' ? 'destructive' :
                  'secondary'
                }>
                  {proposal.status}
                </Badge>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {proposal.description}
            </p>

            {proposal.status === 'pendente' && (
              <div className="flex gap-2 pt-2">
                <button 
                  onClick={() => handleAccept(proposal.id!)}
                  disabled={actionLoading === proposal.id}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading === proposal.id ? (
                    <>
                      <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />
                      Aguarde...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="inline-block mr-2 h-4 w-4" />
                      Aceitar
                    </>
                  )}
                </button>
                <button 
                  onClick={() => handleReject(proposal.id!)}
                  disabled={actionLoading === proposal.id}
                  className="flex-1 px-4 py-2 border rounded-md hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading === proposal.id ? 'Aguarde...' : 'Rejeitar'}
                </button>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
