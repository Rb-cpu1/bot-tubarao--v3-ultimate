# Bot Tubarão V4 - Sistema Trading Multi-Strategy AI

## 🚀 Deploy no Vercel

Este guia explica como fazer o deploy do Bot Tubarão V4 no Vercel.

### Pré-requisitos

- Conta no [Vercel](https://vercel.com)
- Conta no [Supabase](https://supabase.com)
- Node.js 18+ (para desenvolvimento local)

### Configuração do Projeto

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/bot-tubarao-v4.git
cd bot-tubarao-v4
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
# Crie um arquivo .env.local
SUPABASE_URL=https://kxzejoohvanuhkzxsmqb.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4emVqb29odmFudWhrenhzbXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMTQ1MTgsImV4cCI6MjA5Mzc5MDUxOH0.Aw8TN6V504Ih3yHcPpY-Byk3-TS0rO3XZTkWPIcVuFY
```

### Deploy no Vercel

#### Método 1: Via Vercel CLI

1. **Instale o Vercel CLI:**
```bash
npm i -g vercel
```

2. **Faça login:**
```bash
vercel login
```

3. **Deploy do projeto:**
```bash
vercel
```

4. **Configure as variáveis de ambiente no Vercel:**
```bash
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
```

#### Método 2: Via GitHub

1. **Envie o projeto para o GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/bot-tubarao-v4.git
git push -u origin main
```

2. **Importe o projeto no Vercel:**
- Acesse [Vercel](https://vercel.com)
- Clique em "New Project"
- Selecione seu repositório
- Configure as variáveis de ambiente:
  - `SUPABASE_URL`: https://kxzejoohvanuhkzxsmqb.supabase.co
  - `SUPABASE_ANON_KEY`: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4emVqb29odmFudWhrenhzbXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyMTQ1MTgsImV4cCI6MjA5Mzc5MDUxOH0.Aw8TN6V504Ih3yHcPpY-Byk3-TS0rO3XZTkWPIcVuFY

3. **Clique em "Deploy"**

### Configuração do Supabase

1. **Acesse seu projeto Supabase:**
```bash
https://kxzejoohvanuhkzxsmqb.supabase.co
```

2. **Crie a tabela `bot_12`:**
```sql
CREATE TABLE bot_12 (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active',
  last_login TIMESTAMP WITH TIME ZONE,
  signals_used INTEGER DEFAULT 0,
  subscription_end TIMESTAMP WITH TIME ZONE
);
```

3. **Configure as políticas de segurança:**
```sql
-- Política para permitir leitura de todos os perfis
CREATE POLICY "Public profiles are viewable by everyone" ON bot_12
  FOR SELECT USING (true);

-- Política para permitir inserção apenas por autenticação
CREATE POLICY "Users can insert their own profile" ON bot_12
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Política para permitir atualização apenas pelo próprio usuário
CREATE POLICY "Users can update their own profile" ON bot_12
  FOR UPDATE USING (auth.uid() = id);
```

### Estrutura do Projeto

```
bot-tubarao-v4/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   └── App.tsx
├── public/
├── vercel.json
├── vite.config.js
├── package.json
└── README.md
```

### Comandos Úteis

**Desenvolvimento local:**
```bash
npm run dev
```

**Build para produção:**
```bash
npm run build
```

**Preview do build:**
```bash
npm run preview
```

### Variáveis de Ambiente

| Variável | Descrição | Valor |
|----------|-----------|-------|
| `SUPABASE_URL` | URL do projeto Supabase | https://kxzejoohvanuhkzxsmqb.supabase.co |
| `SUPABASE_ANON_KEY` | Chave anônima do Supabase | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... |

### Funcionalidades

- ✅ Sistema de login/registro
- ✅ Pagamentos integrados
- ✅ Dashboard com IA Multi-Strategy
- ✅ Suporte a múltiplos mercados
- ✅ Histórico de trading
- ✅ Gestão de perfis
- ✅ Notificações em tempo real

### Suporte

Para suporte técnico:
- WhatsApp: +258 835 333 667
- Email: suporte@bottubarao.com

### Licença

MIT License - 2025 Bot Tubarão V4