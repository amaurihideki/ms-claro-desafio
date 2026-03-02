# GitHub MCP Server Setup para Whack-a-Mole

Este documento descreve os passos para configurar um servidor **Model Context Protocol (MCP)** que permita ao Copilot Chat acessar dados do repositório (issues, pull requests, rótulos etc.) de forma segura via OAuth.

> Nota: aqui demonstramos o esqueleto - uma instalação ativa deve ser hospedada em um servidor (Heroku, Vercel, ao ou local com `ngrok`).

## 1. Criar o repositório no GitHub

1. Entre no GitHub e clique em **New repository**.
2. Nome: `whack-a-mole`
3. Descrição: "Jogo Whack-a-Mole em HTML/JS".
4. Marque Public ou Private conforme desejar.
5. Opcional: adicionar `.gitignore` para Node caso vá usar servidor.
6. Copie a URL remota (por exemplo `git@github.com:USER/whack-a-mole.git`).

```bash
# depois de criar, associe o remoto e faça o push
git remote add origin git@github.com:USER/whack-a-mole.git
git branch -M main
git push -u origin main
```

## 2. Criar exemplos de issues/labels

Uso do GitHub CLI para criar alguns itens de exemplo (após instalar `gh`):

```bash
gh issue create --title "Adicionar multiplayer local" --label enhancement --body "..." 
# repetir para cada issue planejada

# criar rótulos
gh label create enhancement --color ffcc00
gh label create bug --color ff0000
gh label create documentation --color 0055cc
```

## 3. Configurar servidor MCP

1. Clone [o repositório de exemplo MCP](https://github.com/github/mcp-example) ou crie um novo Node/Express.
2. No `app.js` ou equivalente, implemente endpoints obrigatórios: `/mcp/manifest.json`, `/mcp/auth`, `/mcp/contexts` etc. Veja a [documentação oficial](https://docs.github.com/en/copilot/academy/model-context-protocol).
3. Registre uma **GitHub App** nas configurações da sua conta/org:
   - Permissão `repo` para leitura de issues/PRs.
   - Webhook URL apontando para seu servidor + `/mcp/webhook`.
   - Gere `Client ID` e `Client Secret` para OAuth.
4. No servidor, configure variáveis de ambiente:

```
GITHUB_CLIENT_ID=...    # do GitHub App
GITHUB_CLIENT_SECRET=...

# URL pública onde o MCP está disponível
HOST_URL=https://meu-mcp.example.com
```

5. Implementar o fluxo OAuth para que usuários autorizem a aplicação.
   - `/mcp/auth` redireciona para `https://github.com/login/oauth/authorize` com `client_id`, `redirect_uri`.
   - GitHub retorna `code`; troque por token em `/mcp/callback` usando `client_secret`.
6. Armazene o token e o use para fazer chamadas à API GitHub para recuperar dados do repositório.

## 4. Testar conexão com Copilot Chat

Quando o servidor estiver rodando e acessível:

1. Abra Copilot Chat e habilite o MCP na barra lateral de configurações.
2. Use o botão **Connect repo** e aponte para `https://meu-mcp.example.com/mcp/manifest.json`.
3. Siga o fluxo OAuth; autorize o acesso.
4. Uma vez conectado, você poderá pedir ao Copilot Chat para "listar issues abertas" ou "qual a pontuação da última partida?" e ele usará o contexto do repo.

## 5. Manutenção e segurança

- Renove tokens conforme necessário.
- Restrinja permissões ao mínimo (`read-only` se possível).
- Monitore logs de uso.

---

Este guia, junto com o repositório local, serve como ponto de partida para utilizar o MCP com o jogo Whack-a-Mole. A interação de verdade será vista no Copilot Chat após o servidor estar ativo e você estiver autenticado.