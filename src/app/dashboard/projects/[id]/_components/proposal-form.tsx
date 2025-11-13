"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitProposal } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "A submeter..." : "Submeter Proposta"}
    </Button>
  );
}

export function ProposalForm({ projectId }: { projectId: string }) {
  const [state, formAction] = useFormState(submitProposal, null);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.message && !state.errors) {
      toast({
        title: "Sucesso!",
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state?.message && state.errors) {
      toast({
        title: "Erro de Validação",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Submeter Proposta</CardTitle>
        <CardDescription>Preencha os detalhes da sua proposta para este projeto.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-4">
          <input type="hidden" name="projectId" value={projectId} />
          <div className="space-y-2">
            <Label htmlFor="financialBid">Proposta Financeira (€)</Label>
            <Input id="financialBid" name="financialBid" type="number" step="0.01" placeholder="23500.00" />
            {state?.errors?.financialBid && <p className="text-sm text-red-500">{state.errors.financialBid}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimatedTimeline">Prazo Estimado</Label>
            <Input id="estimatedTimeline" name="estimatedTimeline" type="text" placeholder="Ex: 4 semanas" />
             {state?.errors?.estimatedTimeline && <p className="text-sm text-red-500">{state.errors.estimatedTimeline}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="technicalProposal">Proposta Técnica</Label>
            <Textarea id="technicalProposal" name="technicalProposal" placeholder="Descreva a sua abordagem, materiais e diferenciais." rows={6} />
             {state?.errors?.technicalProposal && <p className="text-sm text-red-500">{state.errors.technicalProposal}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="files">Anexos</Label>
            <Input id="files" name="files" type="file" multiple />
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
