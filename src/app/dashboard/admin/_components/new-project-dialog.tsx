"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProject } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "A criar..." : "Criar Projeto"}
    </Button>
  );
}

export function NewProjectDialog() {
  const [state, formAction] = useFormState(createProject, null);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (state?.message && !state.errors) {
      toast({
        title: "Sucesso!",
        description: state.message,
      });
      formRef.current?.reset();
      closeButtonRef.current?.click();
    } else if (state?.message && state.errors) {
      toast({
        title: "Erro de Validação",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Novo Projeto
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Projeto (RFQ)</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do projeto para receber propostas.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} ref={formRef} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <Input id="title" name="title" className="col-span-3" />
          </div>
          {state?.errors?.title && <p className="text-sm text-red-500 col-start-2 col-span-3 -mt-2">{state.errors.title}</p>}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descrição
            </Label>
            <Textarea id="description" name="description" className="col-span-3" />
          </div>
          {state?.errors?.description && <p className="text-sm text-red-500 col-start-2 col-span-3 -mt-2">{state.errors.description}</p>}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="budget" className="text-right">
              Orçamento (€)
            </Label>
            <Input id="budget" name="budget" type="number" className="col-span-3" />
          </div>
          {state?.errors?.budget && <p className="text-sm text-red-500 col-start-2 col-span-3 -mt-2">{state.errors.budget}</p>}
          
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
         <DialogClose asChild>
            <button ref={closeButtonRef} className="hidden">Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
