import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserCheck, HardHat, Briefcase } from "lucide-react";

const roles = [
    {
        name: "Empresa / Admin",
        description: "Gira a plataforma, publica projetos e avalia propostas.",
        href: "/dashboard/admin",
        icon: Briefcase,
    },
    {
        name: "Profissional",
        description: "Encontra projetos, submete propostas e gere os seus trabalhos.",
        href: "/dashboard/contractor",
        icon: HardHat,
    },
    {
        name: "Cliente",
        description: "Submete os seus projetos, acompanha o estado e revê propostas.",
        href: "/dashboard/client",
        icon: UserCheck,
    }
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-headline font-bold">Bem-vindo ao seu Dashboard</h1>
            <p className="text-muted-foreground mt-2 text-lg">Selecione o seu perfil para continuar.</p>
            <p className="text-sm text-muted-foreground">(Numa aplicação real, seria redirecionado automaticamente)</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl w-full">
            {roles.map((role) => (
                <Card key={role.name} className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <role.icon className="w-8 h-8 text-primary" />
                            <CardTitle className="font-headline">{role.name}</CardTitle>
                        </div>
                        <CardDescription className="pt-2">{role.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow flex items-end">
                        <Button asChild className="w-full">
                            <Link href={role.href}>
                                Ir para o Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
