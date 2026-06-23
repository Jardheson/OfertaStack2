import axios from 'axios'
import type { DashboardData, HistoryItem, SearchResult } from '../types/insights'

const api = axios.create({
  timeout: 12000,
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api'
})

function normalizeQuery(q: string) {
  return q.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120)
}

function inferCategory(query: string) {
  const value = query.toLowerCase()
  if (value.includes('notebook') || value.includes('computador') || value.includes('pc') || value.includes('celular') || value.includes('fone')) {
    return 'Informática'
  }
  if (value.includes('tênis') || value.includes('corrida') || value.includes('camiseta') || value.includes('esporte')) {
    return 'Esporte'
  }
  if (value.includes('maquiagem') || value.includes('beleza') || value.includes('perfume')) {
    return 'Beleza'
  }
  if (value.includes('carro') || value.includes('automotivo') || value.includes('pneu')) {
    return 'Automotivo'
  }
  if (value.includes('casa') || value.includes('cozinha') || value.includes('móvel')) {
    return 'Casa'
  }
  if (value.includes('camisa') || value.includes('vestido') || value.includes('moda')) {
    return 'Moda'
  }
  return 'Outros'
}

function buildMockSearchResult(q: string): SearchResult {
  const query = normalizeQuery(q)
  const category = inferCategory(query)
  const relatedByCategory: Record<string, string[]> = {
    Informática: ['Notebook com GPU dedicada', 'SSD NVMe 1TB', 'Mouse gamer'],
    Esporte: ['Tênis com amortecimento', 'Meia esportiva respirável', 'Relógio esportivo'],
    Beleza: ['Kit skincare', 'Perfume importado', 'Secador profissional'],
    Automotivo: ['Pneu premium', 'Kit de limpeza automotiva', 'Suporte para celular'],
    Casa: ['Organizador multiuso', 'Luminária LED', 'Jogo de panelas'],
    Moda: ['Camisa básica premium', 'Tênis casual', 'Mochila urbana'],
    Outros: ['Produto semelhante', 'Alternativa econômica', 'Versão premium']
  }

  const suggestionsByCategory: Record<string, string[]> = {
    Informática: ['Gamer', 'Acessórios', 'Periféricos'],
    Esporte: ['Moda esportiva', 'Acessórios fitness', 'Running'],
    Beleza: ['Cuidados pessoais', 'Dermocosméticos', 'Perfumes'],
    Automotivo: ['Acessórios automotivos', 'Manutenção', 'Limpeza'],
    Casa: ['Organização', 'Decoração', 'Cozinha'],
    Moda: ['Casual', 'Streetwear', 'Esportivo'],
    Outros: ['Mais vendidos', 'Promoções', 'Recomendados']
  }

  return {
    corrected: query || 'Consulta inválida',
    category,
    description: `Descrição automática para a busca "${query || 'consulta'}".`,
    summary: `Resumo gerado localmente para demonstrar a aplicação sem depender de falha externa.`,
    suggestedCategories: suggestionsByCategory[category] || suggestionsByCategory.Outros,
    improvedText: query ? `${query} com foco em qualidade, preço e benefício para o usuário.` : 'Digite um termo para receber a análise.',
    related: relatedByCategory[category] || relatedByCategory.Outros,
    demo: true,
    cached: false
  }
}

function buildMockDashboard(): DashboardData {
  const recentSearches: HistoryItem[] = [
    { query: 'Notebook Gamer', corrected: 'Notebook Gamer', category: 'Informática', created_at: new Date().toISOString() },
    { query: 'Tênis para corrida', corrected: 'Tênis para corrida', category: 'Esporte', created_at: new Date().toISOString() },
    { query: 'Kit de maquiagem', corrected: 'Kit de maquiagem', category: 'Beleza', created_at: new Date().toISOString() }
  ]

  return {
    totalSearches: 24,
    topCategories: [
      { category: 'Informática', total: 10 },
      { category: 'Esporte', total: 7 },
      { category: 'Moda', total: 4 }
    ],
    topQueries: [
      { query: 'Notebook Gamer', total: 6 },
      { query: 'Tênis para corrida', total: 5 },
      { query: 'Fone bluetooth', total: 3 }
    ],
    recentSearches
  }
}

async function requestWithFallback<T>(request: Promise<{ data: T }>, fallback: () => T) {
  try {
    const response = await request
    return response.data
  } catch (error) {
    return fallback()
  }
}

export async function search(q: string) {
  return requestWithFallback(api.post('/search', { q }), () => buildMockSearchResult(q))
}

export async function getDashboard() {
  return requestWithFallback(api.get('/dashboard'), () => buildMockDashboard())
}

export async function getHistory(limit = 8) {
  return requestWithFallback(api.get('/history', { params: { limit } }), () => ({
    items: buildMockDashboard().recentSearches.slice(0, limit)
  }))
}