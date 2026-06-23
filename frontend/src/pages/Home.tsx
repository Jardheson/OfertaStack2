import React, { useContext, useState } from 'react'
import SearchBar from '../components/SearchBar'
import ProductCard from '../components/ProductCard'
import { ThemeContext } from '../context/ThemeContext'
import useInsightsData from '../hooks/useInsightsData'
import type { HistoryItem } from '../types/insights'

type DemoProduct = {
  title: string
  description: string
  price: string
  imageUrl: string
  benefits: string[]
}

const scenarios = [
  {
    title: 'Cenário 1',
    query: 'Notebook Gamer',
    category: 'Informática',
    description: 'O sistema reconhece uma busca por desempenho elevado, ideal para jogos, estudo e produção.',
    summary: 'O sistema identifica máquinas de alto desempenho para jogos, estudos e criação de conteúdo.',
    suggestedCategories: ['Gamer', 'Informática', 'Acessórios'],
    improvedText: 'Notebook gamer com alto desempenho, ideal para jogos, multitarefa e criação de conteúdo.',
    relatedLabel: 'Produtos relacionados',
    related: ['Notebook com GPU dedicada', 'SSD NVMe 1TB', 'Monitor gamer 144Hz']
  },
  {
    title: 'Cenário 2',
    query: 'Tênis para corrida',
    category: 'Esporte',
    description: 'A IA identifica a intenção de corrida e prioriza conforto, amortecimento e leveza.',
    summary: 'O sistema destaca opções leves, confortáveis e preparadas para impacto e performance.',
    suggestedCategories: ['Esporte', 'Moda esportiva', 'Acessórios fitness'],
    improvedText: 'Tênis para corrida com amortecimento, leveza e conforto para treinos diários.',
    relatedLabel: 'Sugestões relacionadas',
    related: ['Tênis com amortecimento', 'Meia esportiva respirável', 'Relógio com monitoramento de corrida']
  }
]

export default function Home() {
  const { theme, toggle } = useContext(ThemeContext)
  const { dashboard, history, loading, error } = useInsightsData(6)
  const [selectedProduct, setSelectedProduct] = useState<DemoProduct | null>(null)

  const demoProduct: DemoProduct = {
    title: 'Notebook Gamer RTX 4060',
    description: 'Notebook de alto desempenho para jogos, estudos e criação de conteúdo, com foco em fluidez e desempenho.',
    price: 'R$ 5.899',
    imageUrl: buildDemoProductImage(),
    benefits: ['GPU dedicada para jogos e edição', 'SSD NVMe rápido', 'Tela de alta taxa de atualização']
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 px-4 py-4 transition-colors sm:px-6 sm:py-6 lg:px-8 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <header className="mx-auto flex max-w-6xl flex-col gap-4 rounded-3xl border border-white/60 bg-white/80 px-4 py-4 shadow-sm backdrop-blur sm:px-5 sm:py-4 lg:flex-row lg:items-center lg:justify-between dark:border-gray-800 dark:bg-gray-900/70">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">OfertaStack2</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Receba uma saída útil e demonstrável a partir da busca por produtos e serviços.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Alternar tema"
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </header>

      <main className="mx-auto mt-8 max-w-6xl space-y-8 lg:mt-10 lg:space-y-10">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Fluxo demonstrável</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
              Digite a consulta, processe a intenção e veja um resultado útil.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-300">
              A aplicação recebe a entrada do usuário, interpreta a categoria, resume o contexto e mostra sugestões relacionadas em uma interface pronta para demonstração.
            </p>

            <div className="mt-6 rounded-2xl bg-gray-50 p-3 sm:p-4 dark:bg-gray-800/60">
              <SearchBar />
            </div>
          </div>

          <aside className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">O que o sistema entrega</h3>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
              <li>• Entrada do usuário por busca livre.</li>
              <li>• Processamento da consulta com retorno estruturado.</li>
              <li>• Categoria, resumo e itens relacionados em uma saída demonstrável.</li>
              <li>• Histórico pronto para expansão com cache e persistência.</li>
            </ul>
          </aside>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Total de pesquisas</p>
            <h3 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">{loading ? '...' : dashboard?.totalSearches ?? '—'}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Volume acumulado de buscas realizadas na aplicação.</p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Categorias mais buscadas</p>
            <div className="mt-4 space-y-3">
              {(dashboard?.topCategories || []).slice(0, 3).map((item) => (
                <div key={item.category} className="flex items-center justify-between gap-3 rounded-2xl bg-gray-50 px-4 py-3 text-sm dark:bg-gray-800/60">
                  <span className="font-medium text-gray-700 dark:text-gray-200">{item.category}</span>
                  <span className="text-gray-500 dark:text-gray-400">{item.total}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Produtos mais procurados</p>
            <div className="mt-4 space-y-3">
              {(dashboard?.topQueries || []).slice(0, 3).map((item) => (
                <div key={item.query} className="flex items-center justify-between gap-3 rounded-2xl bg-gray-50 px-4 py-3 text-sm dark:bg-gray-800/60">
                  <span className="font-medium text-gray-700 dark:text-gray-200">{item.query}</span>
                  <span className="text-gray-500 dark:text-gray-400">{item.total}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {error ? (
          <div role="alert" className="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900 shadow-sm dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100">
            {error}
          </div>
        ) : null}

        <section className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Cenários de uso</p>
            <h3 className="mt-2 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">Dois exemplos prontos para demonstração</h3>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {scenarios.map((scenario) => (
              <article key={scenario.title} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">{scenario.title}</p>
                    <h4 className="mt-1 text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">Usuário pesquisa “{scenario.query}”</h4>
                  </div>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-200">
                    {scenario.category}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">{scenario.summary}</p>

                <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{scenario.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {scenario.suggestedCategories.map((item) => (
                    <span key={item} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100">
                  {scenario.improvedText}
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{scenario.relatedLabel}</p>
                  <div className="mt-3 grid gap-3">
                    {scenario.related.map((item) => (
                      <div key={item} className="rounded-2xl bg-gray-50 px-4 py-3 text-sm text-gray-700 dark:bg-gray-800/60 dark:text-gray-200">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="results" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ProductCard
            title={demoProduct.title}
            description={demoProduct.description}
            price={demoProduct.price}
            imageUrl={demoProduct.imageUrl}
            benefits={demoProduct.benefits}
            buttonLabel="Ver"
            onView={() => setSelectedProduct(demoProduct)}
          />
        </section>

        <section className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Histórico de pesquisas</p>
            <h3 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">Últimas buscas realizadas</h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {history.map((item: HistoryItem) => (
              <article key={`${item.query}-${item.created_at}`} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">{item.category || 'Outros'}</p>
                <h4 className="mt-2 break-words text-lg font-semibold text-gray-900 dark:text-white">{item.corrected || item.query}</h4>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Consulta original: {item.query}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      {selectedProduct ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          aria-describedby="product-modal-description"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-4 shadow-2xl sm:p-6 dark:bg-gray-900"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Detalhes do produto</p>
                <h3 id="product-modal-title" className="mt-2 text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  {selectedProduct.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200"
                aria-label="Fechar detalhes"
              >
                Fechar
              </button>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="h-48 w-full object-cover sm:h-56" />
            </div>

            <p id="product-modal-description" className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
              {selectedProduct.description}
            </p>

            <div className="mt-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Benefícios</p>
              <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-200">
                {selectedProduct.benefits.map((benefit) => (
                  <li key={benefit} className="rounded-xl bg-gray-50 px-3 py-2 dark:bg-gray-800/60">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{selectedProduct.price}</span>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-xl bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
              >
                Continuar navegando
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function buildDemoProductImage() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 640">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#1d4ed8"/>
        </linearGradient>
        <linearGradient id="screen" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#22c55e"/>
          <stop offset="100%" stop-color="#38bdf8"/>
        </linearGradient>
      </defs>
      <rect width="960" height="640" rx="40" fill="url(#bg)"/>
      <circle cx="170" cy="120" r="70" fill="#60a5fa" opacity="0.25"/>
      <circle cx="790" cy="110" r="90" fill="#f472b6" opacity="0.18"/>
      <g transform="translate(170 145)">
        <rect x="80" y="0" width="440" height="280" rx="20" fill="#111827" stroke="#94a3b8" stroke-width="10"/>
        <rect x="105" y="25" width="390" height="220" rx="14" fill="url(#screen)"/>
        <rect x="70" y="290" width="460" height="38" rx="18" fill="#475569"/>
        <rect x="210" y="330" width="180" height="18" rx="9" fill="#cbd5e1"/>
        <circle cx="300" cy="380" r="42" fill="#e2e8f0" opacity="0.14"/>
        <text x="300" y="140" fill="#ffffff" font-size="42" font-family="Arial, sans-serif" text-anchor="middle" font-weight="700">Gamer</text>
        <text x="300" y="190" fill="#0f172a" font-size="30" font-family="Arial, sans-serif" text-anchor="middle" font-weight="700">RTX 4060</text>
      </g>
      <text x="72" y="580" fill="#e2e8f0" font-size="34" font-family="Arial, sans-serif" font-weight="700">OfertaStack2</text>
      <text x="72" y="615" fill="#bfdbfe" font-size="22" font-family="Arial, sans-serif">Clique em Ver para abrir os detalhes do produto</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}