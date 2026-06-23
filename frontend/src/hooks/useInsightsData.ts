import { useEffect, useState } from 'react'
import { getDashboard, getHistory } from '../services/api'
import type { DashboardData, HistoryItem } from '../types/insights'

type InsightsState = {
  dashboard: DashboardData | null
  history: HistoryItem[]
  loading: boolean
  error: string | null
}

export default function useInsightsData(limit = 6): InsightsState {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const [dashboardData, historyData] = await Promise.all([getDashboard(), getHistory(limit)])
        if (!mounted) return
        setDashboard(dashboardData)
        setHistory(historyData.items || [])
      } catch (err) {
        if (!mounted) return
        setError('Não foi possível carregar o dashboard agora.')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [limit])

  return { dashboard, history, loading, error }
}