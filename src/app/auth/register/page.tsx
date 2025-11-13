import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Logo } from "@/components/logo"

export default function RegisterPage() {
  return (
    <Card className="mx-auto max-w-sm w-full">
      <CardHeader className="text-center">
        <Logo className="mb-4 justify-center" />
        <CardTitle className="text-2xl font-headline">Crie a sua conta</CardTitle>
        <CardDescription>
          Preencha o formulário para começar a usar a plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full-name">Nome Completo</Label>
            <Input id="full-name" placeholder="João Silva" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@exemplo.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Eu sou um...</Label>
             <Select required>
              <SelectTrigger id="role">
                <SelectValue placeholder="Selecione o seu perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Empresa">Empresa (Admin)</SelectItem>
                <SelectItem value="Profissional">Profissional / Empreiteiro</SelectItem>
                <SelectItem value="Cliente">Cliente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full">
            Criar conta
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Já tem uma conta?{" "}
          <Link href="/auth/login" className="underline">
            Entrar
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
