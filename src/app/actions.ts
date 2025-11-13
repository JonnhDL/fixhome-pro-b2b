"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres."),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres."),
  budget: z.coerce.number().positive("O orçamento deve ser um número positivo."),
});

export async function createProject(prevState: any, formData: FormData) {
  const validatedFields = projectSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    budget: formData.get("budget"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro de validação. Por favor, corrija os campos.",
    };
  }

  // Here you would typically save the data to your database
  console.log("Creating project with data:", validatedFields.data);

  // Revalidate the path to show the new project
  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/client");

  return { message: "Projeto criado com sucesso!" };
}

const proposalSchema = z.object({
  financialBid: z.coerce.number().positive("A proposta financeira deve ser um número positivo."),
  technicalProposal: z.string().min(20, "A proposta técnica deve ter pelo menos 20 caracteres."),
  estimatedTimeline: z.string().min(3, "Forneça uma estimativa de prazo."),
});

export async function submitProposal(prevState: any, formData: FormData) {
  const validatedFields = proposalSchema.safeParse({
    financialBid: formData.get("financialBid"),
    technicalProposal: formData.get("technicalProposal"),
    estimatedTimeline: formData.get("estimatedTimeline"),
  });
  
  const projectId = formData.get("projectId");

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro de validação. Por favor, corrija os campos da proposta.",
    };
  }

  console.log(`Submitting proposal for project ${projectId}:`, validatedFields.data);

  revalidatePath(`/dashboard/projects/${projectId}`);
  revalidatePath(`/dashboard/admin`);

  return { message: "Proposta submetida com sucesso!" };
}
