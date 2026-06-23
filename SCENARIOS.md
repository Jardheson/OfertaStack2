# Cenários de Uso

1) Pesquisa: "Notebook Gamer"

Request:

```bash
curl -X POST http://localhost:3000/api/search -H "Content-Type: application/json" -d '{"q":"Notebook Gamer"}'
```

Resposta esperada (exemplo):

{
  "query": "Notebook Gamer",
  "corrected": "Notebook Gamer",
  "category": "Informática",
  "summary": "Resumo gerado pela IA descrevendo principais características, vantagens e pontos de atenção.",
  "related": "Lista de produtos relacionados ou alternativas"
}

2) Pesquisa: "Tênis para corrida"

Request:

```bash
curl -X POST http://localhost:3000/api/search -H "Content-Type: application/json" -d '{"q":"Tênis para corrida"}'
```

Resposta esperada (exemplo):

{
  "query": "Tênis para corrida",
  "corrected": "Tênis para corrida",
  "category": "Esporte",
  "summary": "Resumo gerado pela IA com recomendações para corrida.",
  "related": "Sugestões de modelos similares"
}
