import React, { useState, useRef } from 'react'
import { search as runSearch } from '../services/api'
import SkeletonCard from './SkeletonCard'
import type { SearchResult } from '../types/insights'

export default function SearchBar() {
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<SearchResult | null>(null)
  const resultsRef = useRef<HTMLDivElement | null>(null)

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault()
    const normalizedQuery = q.trim()
    if (!normalizedQuery) {
      setError('Digite um termo para pesquisar.')
      setResult(null)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const res = await runSearch(normalizedQuery)
      setResult(res)
      // move focus to results for keyboard users
      setTimeout(() => resultsRef.current?.focus(), 50)
    } catch (err) {
      setError('Não foi possível buscar agora. Verifique sua conexão e tente novamente.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className="mt-2 space-y-4" aria-busy={loading}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="search-input" className="sr-only">
          Pesquisar produto
        </label>
        <input
          id="search-input"
          aria-label="Pesquisar produto"
          className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-base text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/20 sm:text-sm dark:border-white/10 dark:bg-white/5 dark:text-white"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Digite o produto ou serviço..."
          aria-describedby={error ? 'search-error' : undefined}
          aria-invalid={Boolean(error)}
        />
        <button
          type="submit"
          className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3.5 font-semibold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {loading && !result && (
        <div className="mt-4 space-y-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {result && (
        <div
          ref={resultsRef}
          tabIndex={-1}
          aria-live="polite"
          className="rounded-[1.5rem] border border-slate-200 bg-white/95 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-5 dark:border-white/10 dark:bg-slate-950/80 dark:shadow-[0_18px_50px_rgba(15,23,42,0.22)]"
          role="region"
          aria-label="Resultados da pesquisa"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-700 dark:text-cyan-100">
              Categoria: {result.category || 'Não informada'}
            </span>
            {result.demo ? (
              <span className="rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-100">
                Modo demonstração
              </span>
            ) : null}
            {result.cached ? (
              <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-100">
                Resultado em cache
              </span>
            ) : null}
          </div>

          {result.corrected ? (
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Consulta interpretada: {result.corrected}</p>
          ) : null}

          {result.description ? (
            <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">{result.description}</p>
          ) : null}

          <p className="mt-4 text-base leading-7 text-slate-900 dark:text-slate-100">
            {result.summary || 'Resumo gerado pela IA.'}
          </p>

          {Array.isArray(result.suggestedCategories) && result.suggestedCategories.length > 0 ? (
            <div className="mt-5">
              <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Categorias sugeridas
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.suggestedCategories.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {result.improvedText ? (
            <div className="mt-5 rounded-[1.25rem] border border-cyan-300/10 bg-cyan-400/10 p-4">
              <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700/80 dark:text-cyan-100/70">
                Texto melhorado automaticamente
              </h4>
              <p className="mt-3 text-sm leading-6 text-cyan-900 dark:text-cyan-50">{result.improvedText}</p>
            </div>
          ) : null}

          <div className="mt-5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              {Array.isArray(result.related) ? 'Produtos relacionados' : 'Sugestões relacionadas'}
            </h4>
            <ul className="mt-3 space-y-2">
              {(Array.isArray(result.related) ? result.related : String(result.related || '').split('\n')).filter(Boolean).map((item, index) => (
                <li
                  key={index}
                  className="break-words rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {error ? (
        <div id="search-error" role="alert" className="rounded-2xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-800 dark:text-red-100">
          {error}
        </div>
      ) : null}
    </form>
  )
}