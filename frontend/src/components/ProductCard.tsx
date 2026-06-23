import React from 'react'

export default function ProductCard({
  title,
  description,
  price,
  imageUrl,
  benefits,
  onView,
  buttonLabel = 'Ver'
}: {
  title: string
  description: string
  price?: string
  imageUrl?: string
  benefits?: string[]
  onView?: () => void
  buttonLabel?: string
}) {
  return (
    <article className="group flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.22)] transition hover:-translate-y-1 hover:border-cyan-300/20 sm:flex-row sm:p-5">
      <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-[1.25rem] bg-white/10 sm:h-28 sm:w-28">
        {imageUrl ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={imageUrl} alt={title} className="h-full w-full rounded object-cover" />
        ) : (
          <span className="text-center text-xs text-slate-400">Sem imagem</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h4 className="break-words text-lg font-bold text-white">{title}</h4>
          {price ? <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100">Destaque</span> : null}
        </div>
        <p className="mt-1 text-sm leading-6 text-slate-300">{description}</p>
        {benefits && (
          <ul className="mt-3 ml-4 list-disc text-xs text-slate-300">
            {benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-row items-center justify-between gap-3 sm:w-28 sm:flex-col sm:items-end sm:justify-between">
        <div className="text-lg font-black text-white sm:text-xl">{price}</div>
        <button
          type="button"
          onClick={onView}
          className="rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-cyan-300/40 focus:ring-offset-0"
        >
          {buttonLabel}
        </button>
      </div>
    </article>
  )
}