# MDH Vídeos IA - Netlify Deploy Guide

## 📋 Pré-requisitos

1. Conta no [Netlify](https://netlify.com)
2. YouTube Data API v3 Key
3. Google Gemini API Key (opcional)

## 🚀 Deploy no Netlify

### Opção 1: Deploy via Dashboard (Recomendado)

1. **Login no Netlify**
   - Acesse [app.netlify.com](https://app.netlify.com)

2. **Criar novo site**
   - Click em "Add new site" → "Import an existing project"
   - Conecte com GitHub/GitLab/Bitbucket
   - Selecione o repositório do projeto

3. **Configurar Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - (Já configurado no `netlify.toml`)

4. **Adicionar Environment Variables**
   - Vá em "Site settings" → "Environment variables"
   - Adicione as seguintes variáveis:
     ```
     VITE_YOUTUBE_API_KEY = sua-chave-youtube-api
     VITE_GEMINI_API_KEY = sua-chave-gemini-api
     ```

5. **Deploy**
   - Click em "Deploy site"
   - Aguarde o build completar

### Opção 2: Deploy via Netlify CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login no Netlify
netlify login

# Build local
npm run build

# Deploy
netlify deploy --prod
```

## 🔧 Configuração das API Keys

### YouTube Data API v3
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um projeto ou selecione um existente
3. Ative "YouTube Data API v3"
4. Vá em "Credentials" → "Create Credentials" → "API Key"
5. Copie a chave e adicione no Netlify

### Google Gemini API (Opcional)
1. Acesse [AI Studio](https://makersuite.google.com/app/apikey)
2. Crie uma API Key
3. Copie e adicione no Netlify

## 📁 Estrutura do Projeto

```
VIDEOS MDH/
├── dist/                # Build output (gerado após npm run build)
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── ...
├── netlify.toml         # Configuração do Netlify
├── .env.local           # Environment variables (local - NÃO commitar)
└── package.json
```

## ✅ Checklist Pré-Deploy

- [ ] Código commitado no Git
- [ ] `.env.local` NÃO está no Git (já está no `.gitignore`)
- [ ] YouTube API Key configurada
- [ ] Build local testado (`npm run build`)
- [ ] Preview local testado (`npm run preview`)

## 🔄 Atualizar o Site

Após o primeiro deploy, qualquer push para o branch principal (main/master) vai automaticamente rebuildar e redesployar o site.

## 🐛 Troubleshooting

### Erro: "API Key não configurada"
- Verifique se as variáveis de ambiente estão configuradas no Netlify
- Formato correto: `VITE_YOUTUBE_API_KEY` (com prefixo VITE_)

### Build falha
- Execute `npm run build` localmente para identificar erros
- Verifique os logs de build no Netlify

### Vídeos não carregam
- Verifique se a YouTube API Key está correta
- Verifique se a API está ativada no Google Cloud Console

## 📞 Suporte

Desenvolvido por PVolker
Versão 1.0 - 2025
