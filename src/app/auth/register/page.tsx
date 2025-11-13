'use client';

import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Logo } from "@/components/logo";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (!fullName.trim()) {
      setError('Por favor, insira o seu nome completo');
      return;
    }

    if (!email.trim()) {
      setError('Por favor, insira o seu email');
      return;
    }

    if (!role) {
      setError('Por favor, selecione o seu perfil');
      return;
    }

    if (password.length < 6) {
      setError('A password deve ter pelo menos 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setError('As passwords não coincidem');
      return;
    }

    setLoading(true);

    try {
      // Mapear role para formato correto
      let roleValue: 'admin' | 'client' | 'contractor' = 'client';
      
      if (role === 'Empresa') {
        roleValue = 'admin';
      } else if (role === 'Profissional') {
        roleValue = 'contractor';
      } else if (role === 'Cliente') {
        roleValue = 'client';
      }

      await signUp(email, password, fullName, roleValue);
      // O redirect é automático no AuthContext
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta');
      setLoading(false);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="full-name">Nome Completo</Label>
              <Input 
                id="full-name" 
                placeholder="João Silva" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
                required 
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="role">Eu sou um...</Label>
              <Select 
                value={role} 
                onValueChange={setRole}
                disabled={loading}
                required
              >
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
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirmar Password</Label>
              <Input 
                id="confirm-password" 
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'A criar conta...' : 'Criar conta'}
            </Button>
          </div>
        </form>
        
        <div className="mt-4 text-center text-sm">
          Já tem uma conta?{" "}
          <Link href="/auth/login" className="underline">
            Entrar
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}