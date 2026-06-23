export type SearchResult = {
  category?: string
  description?: string
  summary?: string
  related?: string[] | string
  suggestedCategories?: string[]
  improvedText?: string
  corrected?: string
  cached?: boolean
  demo?: boolean
}

export type DashboardCategory = {
  category: string
  total: number
}

export type DashboardQuery = {
  query: string
  total: number
}

export type HistoryItem = {
  query: string
  corrected?: string
  category?: string
  created_at?: string
}

export type DashboardData = {
  totalSearches: number
  topCategories: DashboardCategory[]
  topQueries: DashboardQuery[]
  recentSearches: HistoryItem[]
}