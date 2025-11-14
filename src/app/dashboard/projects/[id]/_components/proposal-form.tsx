'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createProposal } from '@/lib/firebase/firestore';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProposalFormProps {
  projectId: string;
  projectTitle: string;
}

export function ProposalForm({ projectId, projectTitle }: ProposalFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, userData } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    amount: '',
    timeline: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!user || !userData) {
    toast({
      title: 'Erro',
      description: 'Você precisa estar autenticado',
      variant: 'destructive',
    });
    return;
  }

  setLoading(true);

  try {
    await createProposal({
      projectId,
      contractorId: user.uid,
      contractorName: user.email || 'Profissional',
      amount: parseFloat(formData.amount),
      timeline: formData.timeline,
      description: formData.description,
      status: 'pendente',
    });

    toast({
      title: 'Sucesso!',
      description: 'Proposta enviada com sucesso',
    });

    setFormData({ amount: '', timeline: '', description: '' });
    setOpen(false);
    router.refresh();
  } catch (error) {
    console.error('Error creating proposal:', error);
    toast({
      title: 'Erro',
      description: 'Erro ao enviar proposta. Tente novamente.',
      variant: 'destructive',
    });
  } finally {
    setLoading(false);
  }
};

  if (userData?.role !== 'contractor') {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">
          <FileText className="mr-2 h-4 w-4" />
          Enviar Proposta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Enviar Proposta</DialogTitle>
          <DialogDescription>
            Proposta para: {projectTitle}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Valor da Proposta (€) *</Label>
            <Input
              id="amount"
              type="number"
              placeholder="45000"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline">Prazo de Execução *</Label>
            <Input
              id="timeline"
              placeholder="Ex: 3 meses"
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição da Proposta *</Label>
            <Textarea
              id="description"
              placeholder="Detalhe sua proposta, metodologia, materiais..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={5}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Proposta'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}