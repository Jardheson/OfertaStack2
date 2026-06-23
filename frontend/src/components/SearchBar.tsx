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
    setLoading(true)
    setError(null)
    try {
      const res = await runSearch(q)
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
    <form onSubmit={handleSearch} className="mt-4 space-y-4" aria-busy={loading}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="search-input" className="sr-only">
          Pesquisar produto
        </label>
        <input
          id="search-input"
          aria-label="Pesquisar produto"
          className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Digite o produto ou serviço..."
          aria-describedby={error ? 'search-error' : undefined}
          aria-invalid={Boolean(error)}
        />
        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
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
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
          role="region"
          aria-label="Resultados da pesquisa"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
              Categoria: {result.category || 'Não informada'}
            </span>
            {result.demo ? (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                Modo demonstração
              </span>
            ) : null}
            {result.cached ? (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                Resultado em cache
              </span>
            ) : null}
          </div>

          {result.corrected ? (
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Consulta interpretada: {result.corrected}</p>
          ) : null}

          {result.description ? (
            <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-200">{result.description}</p>
          ) : null}

          <p className="mt-4 text-base leading-7 text-gray-700 dark:text-gray-200">
            {result.summary || 'Resumo gerado pela IA.'}
          </p>

          {Array.isArray(result.suggestedCategories) && result.suggestedCategories.length > 0 ? (
            <div className="mt-5">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Categorias sugeridas
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {result.suggestedCategories.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {result.improvedText ? (
            <div className="mt-5 rounded-2xl bg-gray-50 p-4 dark:bg-gray-900/40">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Texto melhorado automaticamente
              </h4>
              <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-200">{result.improvedText}</p>
            </div>
          ) : null}

          <div className="mt-5">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {Array.isArray(result.related) ? 'Produtos relacionados' : 'Sugestões relacionadas'}
            </h4>
            <ul className="mt-3 space-y-2">
              {(Array.isArray(result.related) ? result.related : String(result.related || '').split('\n')).filter(Boolean).map((item, index) => (
                <li
                  key={index}
                  className="rounded-xl border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {error ? (
        <div id="search-error" role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </div>
      ) : null}
    </form>
  )
}