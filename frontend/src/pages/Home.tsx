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
    <div className="relative min-h-screen overflow-hidden px-4 py-4 text-slate-900 transition-colors sm:px-6 sm:py-6 lg:px-8 dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-6rem] top-[-4rem] h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute right-[-5rem] top-20 h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <header className="glass-panel accent-ring mx-auto flex max-w-6xl flex-col gap-4 rounded-[2rem] px-4 py-4 sm:px-5 sm:py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-cyan-700 dark:text-cyan-100">
            IA para buscas inteligentes
          </div>
          <h1 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">OfertaStack2</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base dark:text-slate-300">
            Uma vitrine responsiva para pesquisar produtos e serviços com saída útil, histórico e dashboards em uma experiência mais elegante.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Alternar tema"
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-cyan-300/40 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
          >
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </header>

      <main className="relative mx-auto mt-8 max-w-6xl space-y-8 lg:mt-10 lg:space-y-10">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
          <div className="soft-card rounded-[2rem] p-5 sm:p-6 lg:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-100">Fluxo demonstrável</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300">Busca, IA e insights</span>
            </div>
            <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-slate-900 text-balance sm:text-4xl lg:text-5xl dark:text-white">
              Digite a consulta, processe a intenção e veja um resultado bonito, claro e útil.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
              A aplicação recebe a entrada do usuário, interpreta a categoria, resume o contexto e mostra sugestões relacionadas em uma interface pronta para demonstração.
            </p>

            <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white/70 p-3 shadow-inner sm:p-4 dark:border-white/10 dark:bg-slate-950/35">
              <SearchBar />
            </div>
          </div>

          <aside className="soft-card rounded-[2rem] p-5 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-white">O que o sistema entrega</h3>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">Visão geral</span>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
              <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">Entrada livre com validação e foco em acessibilidade.</li>
              <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">Processamento com IA, cache e histórico.</li>
              <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">Resumo, categoria e sugestões em uma saída demonstrável.</li>
              <li className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">Painel de estatísticas e cenários prontos para apresentação.</li>
            </ul>
          </aside>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="soft-card rounded-[2rem] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700/90 dark:text-cyan-200/80">Total de pesquisas</p>
            <h3 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">{loading ? '...' : dashboard?.totalSearches ?? '—'}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Volume acumulado de buscas realizadas na aplicação.</p>
          </div>

          <div className="soft-card rounded-[2rem] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700/90 dark:text-cyan-200/80">Categorias mais buscadas</p>
            <div className="mt-4 space-y-3">
              {(dashboard?.topCategories || []).slice(0, 3).map((item) => (
                <div key={item.category} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                  <span className="font-medium">{item.category}</span>
                  <span className="rounded-full bg-cyan-400/15 px-2 py-1 text-xs font-semibold text-cyan-100">{item.total}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="soft-card rounded-[2rem] p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700/90 dark:text-cyan-200/80">Produtos mais procurados</p>
            <div className="mt-4 space-y-3">
              {(dashboard?.topQueries || []).slice(0, 3).map((item) => (
                <div key={item.query} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                  <span className="font-medium">{item.query}</span>
                  <span className="rounded-full bg-fuchsia-400/15 px-2 py-1 text-xs font-semibold text-fuchsia-100">{item.total}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {error ? (
          <div role="alert" className="rounded-[1.5rem] border border-amber-300/20 bg-amber-500/10 px-5 py-4 text-sm text-amber-800 shadow-sm dark:text-amber-100">
            {error}
          </div>
        ) : null}

        <section className="space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700/90 dark:text-cyan-200/80">Cenários de uso</p>
            <h3 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl dark:text-white">Dois exemplos prontos para demonstração</h3>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {scenarios.map((scenario) => (
              <article key={scenario.title} className="group rounded-[2rem] border border-slate-200 bg-white/80 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-slate-50 sm:p-6 dark:border-white/10 dark:bg-white/5 dark:shadow-[0_18px_50px_rgba(15,23,42,0.22)] dark:hover:bg-white/10">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{scenario.title}</p>
                    <h4 className="mt-2 text-lg font-bold text-slate-900 sm:text-xl dark:text-white">Usuário pesquisa “{scenario.query}”</h4>
                  </div>
                  <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-sm font-semibold text-cyan-700 dark:text-cyan-100">
                    {scenario.category}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{scenario.summary}</p>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{scenario.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {scenario.suggestedCategories.map((item) => (
                    <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-cyan-300/10 bg-cyan-400/10 p-4 text-sm leading-6 text-cyan-900 dark:text-cyan-50">
                  {scenario.improvedText}
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">{scenario.relatedLabel}</p>
                  <div className="mt-3 grid gap-3">
                    {scenario.related.map((item) => (
                      <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-white/10 dark:bg-black/20 dark:text-slate-100">
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700/90 dark:text-cyan-200/80">Histórico de pesquisas</p>
            <h3 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl dark:text-white">Últimas buscas realizadas</h3>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {history.map((item: HistoryItem) => (
              <article key={`${item.query}-${item.created_at}`} className="rounded-[1.75rem] border border-slate-200 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_18px_50px_rgba(15,23,42,0.22)]">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700/80 dark:text-cyan-100/70">{item.category || 'Outros'}</p>
                <h4 className="mt-2 break-words text-lg font-bold text-slate-900 dark:text-white">{item.corrected || item.query}</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Consulta original: {item.query}</p>
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
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl sm:p-6 dark:border-white/10 dark:bg-slate-950"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700/90 dark:text-cyan-200/80">Detalhes do produto</p>
                <h3 id="product-modal-title" className="mt-2 text-xl font-black text-slate-900 sm:text-2xl dark:text-white">
                  {selectedProduct.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
                aria-label="Fechar detalhes"
              >
                Fechar
              </button>
            </div>

            <div className="mt-5 overflow-hidden rounded-[1.5rem] bg-slate-100 dark:bg-white/5">
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
              <img src={selectedProduct.imageUrl} alt={selectedProduct.title} className="h-48 w-full object-cover sm:h-56" />
            </div>

            <p id="product-modal-description" className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {selectedProduct.description}
            </p>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Benefícios</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                {selectedProduct.benefits.map((benefit) => (
                  <li key={benefit} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-white/10 dark:bg-white/5">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <span className="text-2xl font-black text-slate-900 dark:text-white">{selectedProduct.price}</span>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 font-semibold text-slate-950 transition hover:opacity-95"
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