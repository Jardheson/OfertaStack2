# Changelog

Seguem as entradas de mudanças (formato estilo Conventional Commits) aplicadas neste estágio do projeto `OfertaStack2`.

## [Unreleased]

- feat: cria estrutura inicial do projeto
  - Scaffold frontend (React + Vite + TypeScript + Tailwind)
  - Scaffold backend (Node.js + Express)
  - Estrutura de pastas e arquivos iniciais

- feat: implementa tela de pesquisa
  - Componente `SearchBar`, resultados em cartões, skeleton loading

- feat: adiciona integração com IA
  - `backend/services/aiService.js`: `analyzeQuery` unificado
  - Prompt padrão e fallback mock para dev

- feat: cria dashboard de estatísticas
  - Endpoints e migration iniciais para histórico de pesquisas
  - (Esqueleto pronto para métricas)

- feat: implementa histórico de pesquisas
  - Tabela `searches` e função `saveSearch` em `backend/services/db.js`

- test: adiciona testes unitários
  - Testes de integração básicos em `backend/tests/searchController.test.js`

- docs: adiciona documentação README
  - README inicial com instruções de uso e prompts

- docs: adiciona prompts utilizados
  - Exemplos de prompts para classificação e resumo no README

- fix: corrige validação de busca
  - Controller valida entrada e retorna 400 para requisições inválidas

---

Notas:
- Cache: adaptador Redis/in-memory (`backend/services/cache.js`)
- Segurança: rate-limiter simples adicionado (`backend/server.js`)
- Acessibilidade: melhorias em `SearchBar` (label, aria-live, foco)
