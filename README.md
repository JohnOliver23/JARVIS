# 🤖 J.A.R.V.I.S. - Sistema de Visitantes

Sistema de gerenciamento de visitantes da Stark Tower desenvolvido com Next.js, Supabase e shadcn/ui.

## 🚀 Funcionalidades

- ✅ **Dashboard em tempo real** com estatísticas
- ✅ **Header responsivo** com toggle de tema
- ✅ **Sidebar inteligente** com status de conexão
- ✅ **Monitoramento de salas** com indicadores visuais
- ✅ **Logs de atividade** do sistema
- ✅ **Interface responsiva** e moderna
- ✅ **Tema escuro/claro** com estilo JARVIS
- ✅ **Atualizações em tempo real**

## 🛠️ Tecnologias

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL)
- **State Management**: TanStack Query (React Query)
- **Icons**: Lucide React

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Git

## 🚀 Instalação e Configuração

### 1. Clone o repositório

\`\`\`
git clone <url-do-repositorio>
cd jarvis-visitor-management
\`\`\`

### 2. Instale as dependências

\`\`\`
npm install
\`\`\`

### 3. Execute o projeto

\`\`\`
npm run dev
\`\`\`
Acesse: `http://localhost:3000`

## 📱 Como Usar

1. **Dashboard**: Visualize estatísticas em tempo real
2. **Sidebar**: Navegue entre as diferentes seções
3. **Header**: Alterne entre tema claro/escuro e atualize dados
4. **Status de Conexão**: Monitore a conexão com o Supabase em tempo real

## 🎨 Características do Design

- **Tema JARVIS**: Inspirado na interface da Stark Industries
- **Modo Escuro**: Design elegante com bordas sutis e efeitos de brilho
- **Responsivo**: Funciona perfeitamente em desktop e mobile
- **Indicadores Visuais**: Status de conexão e badges dinâmicos
- **Animações Suaves**: Transições e estados de loading

## 🔧 Arquitetura

### **Estrutura de Pastas:**

\`\`\`
├── app/ # Next.js App Router
├── components/
│ ├── layout/ # Header e Sidebar
│ ├── dashboard/ # Componentes do dashboard
│ └── ui/ # Componentes base (shadcn/ui)
├── hooks/ # Custom hooks
├── services/ # Integração com Supabase
├── types/ # TypeScript types
├── constants/ # Constantes e configurações
└── lib/ # Utilitários e configurações
\`\`\`

### **Custom Hooks:**

- `useSidebar`: Lógica do sidebar e navegação
- `useHeader`: Funcionalidades do header
- `useActivityLogs`: Gerenciamento de logs
- `useSupabase*Query`: Integração com dados do Supabase

## 🔧 Troubleshooting

### Erro de Dependências

\`\`\`
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Dados não aparecem

- ✅ O sistema funciona com qualquer base de dados Supabase
- ✅ Se não houver dados, as telas mostrarão estados vazios
- ✅ Use o botão de refresh no header para atualizar

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório no Vercel
2. Deploy automático

### Outras Plataformas

- Netlify
- Railway
- Render

## 📊 Funcionalidades Implementadas

### ✅ **Primeira Versão (v1.0)**

- [x] Header responsivo com tema toggle
- [x] Sidebar com navegação e status de conexão
- [x] Dashboard com cards de estatísticas
- [x] Monitoramento de ocupação de salas
- [x] Logs de atividade do sistema
- [x] Integração completa com Supabase
- [x] Tema escuro com estilo JARVIS

### 🚧 **Próximas Versões**

- [ ] Formulário de cadastro de visitantes
- [ ] Tabela de visitantes ativos
- [ ] Histórico completo de visitantes
- [ ] Gerenciamento de salas
- [ ] Sistema de autenticação
- [ ] Relatórios e exportação

## 🎯 **Base de Dados**

O sistema foi projetado para funcionar com **qualquer base de dados Supabase**.

- ✅ **Funciona sem dados**: Mostra estados vazios elegantes
- ✅ **Detecta estrutura**: Adapta-se automaticamente aos dados disponíveis
- ✅ **Fallbacks inteligentes**: Se views/functions não existirem, usa queries alternativas
- ✅ **Conexão em tempo real**: Monitora status da conexão constantemente

## 📄 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

**Desenvolvido com ❤️ para a Stark Industries**

> _"Sometimes you gotta run before you can walk."_ - Tony Stark
