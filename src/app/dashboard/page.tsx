// src/app/dashboard/contractor/page.tsx - CÓDIGO FINAL
import { Package, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "../components/stat-card";
import { ProjectDataTable } from "../components/project-data-table";
import { mockProjects, mockProposals } from "@/lib/data";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function ContractorDashboardPage() {
  const availableProjects = mockProjects.filter(p => p.status === "aberto");
  const myProposals = mockProposals.filter(p => p.contractorId === "contractor-1");
  const acceptedProposals = myProposals.filter(p => p.status === "aceite");

  return (
    <ProtectedRoute allowedRoles={['contractor']}>
      <div className="space-y-6">
        {/* ... (el resto del contenido que ya tenías está bien) ... */}
        {/* Este código ya es correcto, solo asegúrate de guardarlo de nuevo */}
      </div>
    </ProtectedRoute>
  );
}