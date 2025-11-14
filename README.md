# 🏗️ FixHome Pro - Plataforma B2B Marketplace

Sistema profissional de intermediação entre empresas contratantes e sub-empreiteiros na construção civil.

---

## 🎯 VISÃO DO NEGÓCIO

### **Modelo Real FixHome:**
```
EMPRESA GRANDE (ex: Guarderia 75K€)
         ↓
    FIXHOME (Intermediário - comissão 10-15%)
         ↓
SUB-EMPREITEIROS (5-10 empresas competem)
```

**Proposta de Valor:**
- Empresas grandes publicam RFQ (Request for Quotation)
- Sub-empreiteiros recebem leads qualificados
- FixHome gerencia processo + cobra comissão
- Sistema gera contratos automaticamente (proteção legal)

---

## ✅ MVP ACTUAL (v0.1) - O QUE TEMOS

### **Status:** Funcionando ✅
**Desenvolvido:** 13-14 Novembro 2025 (1h session)

### **Features Implementadas:**

#### 🔐 Autenticação & Roles
- ✅ Firebase Authentication
- ✅ 3 tipos de usuários: Admin, Profissional, Cliente
- ✅ Proteção de rotas por role
- ✅ Dashboards personalizados

#### 📋 Gestão de Projetos
- ✅ Admin cria projetos
- ✅ Lista completa com filtros
- ✅ Detalhes do projeto
- ✅ Status tracking

#### 💼 Sistema de Propostas
- ✅ Profissional envia proposta
- ✅ Admin vê todas propostas
- ✅ Aceitar/Rejeitar com confirmação
- ✅ Toasts de feedback
- ✅ Loading states

#### 💾 Persistência
- ✅ Firestore Database
- ✅ Regras de segurança
- ✅ CRUD completo

---

## 🚀 ROADMAP - ADAPTAR AO MODELO B2B REAL

### **FASE 1: Ajuste de Roles (2-3 horas)**

#### Problema Actual:
```
❌ Admin / Profissional / Cliente (genérico)
```

#### Solução:
```
✅ Admin (FixHome - gestor)
✅ Empresa_Contratante (quem traz projeto)
✅ Sub_Empreiteiro (quem executa)
```

**Tarefas:**
- [ ] Renomear roles no Firebase
- [ ] Atualizar interfaces TypeScript
- [ ] Ajustar dashboards
- [ ] Atualizar regras Firestore

---

### **FASE 2: Sistema RFQ (Request for Quotation) (4-6 horas)**

#### Features Necessárias:

**Para Empresa_Contratante:**
- [ ] Formulário RFQ completo
  - Tipo de obra (Capoto, Pladur, etc)
  - Valor estimado
  - Prazo execução
  - Especificações técnicas
  - Documentos anexos
- [ ] Ver propostas recebidas (comparação lado-a-lado)
- [ ] Sistema de pontuação automática
- [ ] Aceitar proposta → Gera contrato

**Para Sub_Empreiteiro:**
- [ ] Ver RFQs disponíveis (marketplace)
- [ ] Filtros por especialidade
- [ ] Enviar cotação detalhada
  - Preço breakdown
  - Cronograma
  - Garantias oferecidas
  - Certificações
- [ ] Ver histórico propostas

**Para Admin (FixHome):**
- [ ] Dashboard overview (todos RFQs)
- [ ] Aprovar empresas antes publicar RFQ
- [ ] Ver comissões pendentes
- [ ] Estatísticas (taxa conversão, etc)

---

### **FASE 3: Calculadora ROI (3-4 horas)**

#### Propósito:
Mostrar ganhos estimados para ambas partes

**Para Empresa_Contratante:**
```
Projeto: 75.000€
Comissão FixHome (12%): -9.000€
Custo gestão interna evitado: +15.000€
───────────────────────────────
ECONOMIA LÍQUIDA: +6.000€
```

**Para Sub_Empreiteiro:**
```
Projeto ganho: 75.000€
Materiais (60%): -45.000€
Mão obra (25%): -18.750€
Comissão FixHome (10%): -7.500€
───────────────────────────────
LUCRO LÍQUIDO: 3.750€ (5%)
```

**Implementação:**
- [ ] Componente calculadora React
- [ ] Inputs dinâmicos por tipo obra
- [ ] Gráficos visuais (Recharts)
- [ ] Export PDF

---

### **FASE 4: Sistema de Contratos (5-6 horas)**

#### CRÍTICO: Proteção Legal

**Features:**
- [ ] Templates contratos (por tipo obra)
- [ ] Geração automática ao aceitar proposta
- [ ] Cláusulas obrigatórias:
  - Comissão FixHome (% exato)
  - Forma de pagamento
  - Garantia bancária obrigatória (10%)
  - Penalizações por não pagamento
  - Foro competente (arbitragem)
- [ ] Assinatura digital (DocuSign ou similar)
- [ ] Armazenamento contratos assinados
- [ ] Lembretes pagamento automáticos

**Proteção Anti-Fraude:**
```typescript
interface ContratoObrigatorio {
  garantiaBancaria: {
    valor: number; // 10% do projeto
    banco: string;
    dataEmissao: Date;
    documentoURL: string;
  };
  condicoesPagamento: {
    percentualAssinatura: 50; // 50% ao assinar
    percentualConclusao: 50;  // 50% ao concluir
    prazoMaximo: 30; // dias
  };
  penalidades: {
    juros: 2; // % ao mês
    multa: 20; // % do valor devido
  };
}
```

---

### **FASE 5: Integração fixhomeservicios.com (2-3 horas)**

**Objetivos:**
- [ ] SSO (Single Sign-On) entre sites
- [ ] Capturar leads do site principal
- [ ] Criar projeto automático ao receber formulário
- [ ] Notificar sub-empreiteiros da rede

**Fluxo:**
```
1. Cliente preenche formulário fixhomeservicios.com
2. Webhook → FixHome Pro API
3. Sistema cria RFQ automático
4. Email/SMS para 10-15 sub-empreiteiros
5. Prazo 7 dias para cotações
6. Cliente recebe 5-8 propostas comparadas
```

---

## 🛠️ STACK TECNOLÓGICA

### **Frontend:**
- Next.js 15.1.3 (App Router)
- TypeScript 5.7.2
- Tailwind CSS 3.4.1
- shadcn/ui (Radix UI)
- Lucide Icons

### **Backend:**
- Firebase Auth
- Firestore Database
- Firebase Storage (futuro - docs)
- Firebase Functions (futuro - automações)

### **Deployment:**
- Vercel (recomendado)
- ou Firebase Hosting

---

## 📂 ESTRUTURA DO PROJETO
```
fixhome-pro-b2b/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── dashboard/
│   │   │   ├── admin/              ✅ Admin FixHome
│   │   │   ├── contractor/         ✅ Sub-empreiteiro (renomear)
│   │   │   ├── client/             ✅ Empresa contratante (renomear)
│   │   │   ├── projects/[id]/      ✅ Detalhes projeto
│   │   │   │   ├── _components/
│   │   │   │   │   ├── proposal-form.tsx      ✅
│   │   │   │   │   └── proposals-list.tsx     ✅
│   │   │   │   └── page.tsx
│   │   │   ├── components/
│   │   │   │   └── sidebar-nav.tsx
│   │   │   └── layout.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx                # Landing page
│   │
│   ├── components/
│   │   ├── ui/                     # shadcn/ui
│   │   └── auth/
│   │       └── protected-route.tsx ✅
│   │
│   ├── context/
│   │   └── AuthContext.tsx         ✅
│   │
│   ├── lib/
│   │   └── firebase/
│   │       ├── config.ts           ✅
│   │       └── firestore.ts        ✅
│   │
│   └── hooks/
│       └── use-toast.ts            ✅
│
├── public/
├── .env.local                       # Firebase credentials
├── firebase.json
├── firestore.rules
└── README.md
```

---

## 🔧 INSTALAÇÃO & SETUP

### **1. Instalar Dependências:**
```bash
npm install
```

### **2. Configurar Firebase:**

Criar `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### **3. Executar:**
```bash
npm run dev
# http://localhost:3000
```

---

## 👥 CONTAS DEMO (Ambiente Atual)
```
Admin FixHome:
📧 admin@fixhome.pt
🔑 Admin123!

Sub-Empreiteiro:
📧 maria@contractor.pt
🔑 Test123!

Cliente (Empresa):
📧 cliente@empresa.pt
🔑 Test123!
```

---

## 📊 DADOS DE REFERÊNCIA

### **Comissões FixHome:**
- Projetos <50K€: 15%
- Projetos 50-150K€: 12%
- Projetos >150K€: 10%

### **Prazos Típicos:**
- RFQ aberto: 7-15 dias
- Análise propostas: 3-5 dias
- Negociação: 2-3 dias
- **Total:** 15-20 dias até adjudicação

### **Garantias Obrigatórias:**
- Garantia bancária: 10% do valor
- Seguro responsabilidade: 250.000€ mínimo
- Certidões vigentes (Finanças, SS)

---

## 🎯 KPIs A MONITORAR (Futuro)
```typescript
interface KPIs {
  // Comerciais
  rfqsPublicados: number;
  taxaConversao: number; // % RFQs → Contratos
  valorMedioProjeto: number;
  comissaoMedia: number;
  
  // Operacionais
  tempoMedioResposta: number; // horas
  subEmpreiteirosAtivos: number;
  satisfacaoClientes: number; // 1-5
  
  // Financeiros
  faturamentoMensal: number;
  margemMedia: number; // %
  inadimplencia: number; // %
}
```

---

## 🚨 RISCOS & MITIGAÇÕES

### **Risco 1: Sub-empreiteiro não paga comissão**
**Mitigação:**
- ✅ Garantia bancária obrigatória (10%)
- ✅ Contrato com arbitragem forçada
- ✅ Retenção documentos até pagamento
- ✅ Blacklist compartilhada sector

### **Risco 2: Cliente cancela após adjudicação**
**Mitigação:**
- ✅ Taxa não reembolsável (5% do valor)
- ✅ Cláusula penalização em contrato
- ✅ Seguro caução

### **Risco 3: Má qualidade execução**
**Mitigação:**
- ✅ Verificação certidões/alvarás
- ✅ Sistema rating sub-empreiteiros
- ✅ Seguro responsabilidade civil obrigatório
- ✅ Auditorias aleatórias

---

## 📈 MODELO DE RECEITA

### **Cenário Conservador (Ano 1):**
```
10 projetos/mês × 60.000€ médio × 12% comissão = 72.000€/mês
- Custos operação (30%): -21.600€
- Impostos (25%): -12.600€
───────────────────────────────────────
= 37.800€/mês líquido (453.600€/ano)
```

### **Cenário Otimista (Ano 2):**
```
30 projetos/mês × 80.000€ médio × 12% comissão = 288.000€/mês
```

---

## 🔄 PRÓXIMOS PASSOS

### **Imediato (próxima sessão):**
- [ ] Renomear roles (Empresa/Sub-empreiteiro)
- [ ] Sistema RFQ básico
- [ ] Calculadora ROI simples

### **Curto Prazo (1-2 semanas):**
- [ ] Sistema contratos
- [ ] Marketplace RFQs
- [ ] Upload documentos

### **Médio Prazo (1 mês):**
- [ ] Integração fixhomeservicios.com
- [ ] Notificações automáticas
- [ ] Sistema ratings

### **Longo Prazo (3-6 meses):**
- [ ] App mobile
- [ ] Chat integrado
- [ ] Pagamentos via plataforma
- [ ] Analytics avançado

---

## 📞 SUPORTE & DOCUMENTAÇÃO

### **Links Importantes:**
- 🔥 Firebase Console: https://console.firebase.google.com
- 📚 Next.js Docs: https://nextjs.org/docs
- 🎨 shadcn/ui: https://ui.shadcn.com
- 📖 Firestore Rules: https://firebase.google.com/docs/firestore/security

### **Recursos Legais:**
- Lei 41/2015 (Alvarás construção)
- DL 178/86 (Contrato agência)
- IMPIC (Base dados empreiteiros): www.impic.pt

---

## 📝 NOTAS IMPORTANTES

### **Decisões Técnicas:**
- ✅ Next.js App Router (não Pages Router)
- ✅ TypeScript strict mode
- ✅ Firestore (não Realtime DB)
- ✅ shadcn/ui (não Material-UI)

### **Segurança:**
- ✅ Firestore rules por role
- ✅ Server-side validation
- ✅ Rate limiting (futuro)
- ✅ Backup diário DB

### **Performance:**
- ✅ ISR para landing pages
- ✅ Dynamic para dashboards
- ✅ Image optimization Next.js
- ✅ CDN Vercel

---

## 🎉 MILESTONE ALCANÇADO

**MVP Base Funcionando:** 14 Novembro 2025 ✅
- Sistema completo CRUD projetos
- Sistema propostas funcionando
- 3 dashboards operacionais
- Autenticação segura
- Base sólida para escalar

**Próximo Marco:** Adaptar ao modelo B2B real

---

## 🤝 CONTRIBUIR

Sistema desenvolvido para **FixHome Serviços** - Revolução na intermediação B2B de construção civil em Portugal.

**Desenvolvido com ❤️ para o Benício** 👶

---

## 📄 LICENÇA

Propriedade de FixHome Serviços © 2025
Todos os direitos reservados.

---

**Última atualização:** 14 Novembro 2025, 00:50
**Desenvolvido por:** Jonnh + Claude (Anthropic)
**Próxima sessão:** TBD (após nascimento Benício! 🎉)