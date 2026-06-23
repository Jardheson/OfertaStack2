# OfertaStack2

Aplicação para ajudar usuários a encontrar produtos, promoções e serviços em grandes marketplaces.

## Objetivo

Permitir que o usuário digite o nome de um produto ou serviço e receba sugestões organizadas com descrições, categorias, benefícios e recomendações.

## Tech stack

- Frontend: React + TypeScript + Vite + TailwindCSS
- Backend: Node.js + Express
- Banco: PostgreSQL
- IA: OpenAI ou Gemini (configurar chave via `.env`)

## Estrutura

Veja a estrutura básica do projeto:

- `/frontend` – frontend React
- `/backend` – servidor
- `/backend/database` – migrations

## Instalação (local)

1. Instale tudo na raiz

```bash
npm install
```

1. Suba o backend em um terminal

```bash
cp .env.example backend/.env
# configurar DATABASE_URL e a IA escolhida:
# AI_PROVIDER=openai com OPENAI_API_KEY
# ou AI_PROVIDER=gemini com GEMINI_API_KEY
npm run dev:backend
```

1. Suba o frontend em outro terminal

```bash
npm run dev:frontend
```

Se estiver desenvolvendo localmente e o frontend não enxergar o backend, ajuste `VITE_API_TARGET` para apontar para o endereço da API.

Com workspaces, o projeto usa um único `node_modules` na raiz depois de `npm install`.

## Endpoints principais

- `POST /api/search` — recebe `{ q: string }` e retorna sugestões, categoria e resumo.

## Como a IA é utilizada

A Inteligência Artificial foi utilizada durante todo o processo de desenvolvimento do projeto.

Atividades apoiadas pela IA:

- Definição da arquitetura do sistema;
- Geração inicial de código;
- Refatoração de componentes;
- Criação de testes;
- Documentação técnica;
- Geração de descrições de produtos;
- Classificação automática de categorias.

Foi realizado refinamento dos prompts após análise crítica dos resultados gerados, melhorando a qualidade das respostas e do código produzido.

## Entrega e conformidade com o PDF

Este projeto foi estruturado para atender aos requisitos da atividade de Recuperação Paralela do Módulo 1.

### O que já está atendido no repositório

- Entrada do usuário por busca livre;
- Processamento da consulta com IA;
- Saída útil e demonstrável;
- Dois cenários de uso documentados;
- Histórico de pesquisas;
- Dashboard com total de pesquisas, categorias mais buscadas e produtos mais procurados;
- Evidências de prompts e refinamentos de IA;
- Estrutura organizada do frontend e backend;
- README documentado.

### O que depende de link externo para entrega final

- Trello público com quadro Kanban;
- Vídeo explicativo no Google Drive;
- Repositório GitHub privado com acesso para os perfis solicitados no enunciado.

### Fluxo de Git esperado pelo enunciado

- `main` como branch principal;
- `develop` como branch de integração;
- feature branches para cada funcionalidade;
- commits frequentes com mensagens objetivas.

Observação: a branch `develop` foi criada localmente no repositório do backend para refletir o fluxo solicitado.

### Trello

Quadro Kanban sugerido para o projeto:

- Backlog
- Todo
- Doing
- Blocked
- Review
- Done

Link do Trello: [inserir aqui o link público do quadro.](https://trello.com/invite/b/6a31b03ee5721af894dc1318/ATTIfd9f622b626af9a06ae7a5e5f2c52e28E4BAAEDE/jardheson)

### Vídeo

O vídeo deve apresentar:

- Objetivo da aplicação;
- Demonstração de funcionamento;
- Como executar o sistema;
- Como as tarefas foram organizadas no Trello;
- Quais branches foram utilizadas;
- Como a IA foi utilizada;
- Um exemplo de prompt;
- O que poderia ser melhorado.

Link do vídeo no Google Drive: .

### Prompts usados (exemplos)

1. Classificação de categoria

```text
Classifique o item a seguir em uma das categorias: Eletrônicos, Moda, Casa, Beleza, Esporte, Automotivo, Informática. Retorne somente a categoria.
Item: "{query}"
```

1. Resumo do produto

```text
Resuma em 3 frases o produto descrito: {product_description}
```

### Exemplos de entrada e saída

#### Cenário 1

- Entrada: `Notebook Gamer`
- Saída esperada: categoria `Informática`, resumo gerado pela IA e produtos relacionados.

#### Cenário 2

- Entrada: `Tênis para corrida`
- Saída esperada: categoria `Esporte`, resumo gerado pela IA e sugestões relacionadas.

## Cenários de uso

1. Pesquisa: "Notebook Gamer"

- Categoria: Informática
- Resumo: (gerado pela IA)
- Produtos relacionados: (lista)

1. Pesquisa: "Tênis para corrida"

- Categoria: Esporte
- Resumo: (gerado pela IA)
- Sugestões relacionadas: (lista)

## Melhorias futuras

- Conectar crawlers para marketplaces
- Recomendação baseada em comportamento do usuário
- Autenticação e favoritar produtos

## Changelog

Veja o arquivo [CHANGELOG.md](CHANGELOG.md) para o histórico recente de features, testes e correções aplicadas.

## Cache Redis (opcional)

Para melhorar performance e reduzir custo com chamadas à IA, a aplicação suporta Redis. Configure a variável `REDIS_URL` no `.env` para ativar o cache Redis. Exemplo em `.env.example`.

No backend o adaptador de cache usa Redis quando `REDIS_URL` está definido e cai para um cache em memória como fallback.

## Provedor de IA

Escolha o provedor com `AI_PROVIDER`:

- `AI_PROVIDER=openai` usa `OPENAI_API_KEY`
- `AI_PROVIDER=gemini` usa `GEMINI_API_KEY`

Se nenhuma chave estiver disponível, o sistema usa uma resposta mock para demonstração local.
