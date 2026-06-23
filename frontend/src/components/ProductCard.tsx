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
    <article className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row dark:bg-gray-800">
      <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28 dark:bg-gray-700">
        {imageUrl ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={imageUrl} alt={title} className="h-full w-full rounded object-cover" />
        ) : (
          <span className="text-center text-xs text-gray-400">Sem imagem</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="break-words font-bold text-gray-900 dark:text-white">{title}</h4>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">{description}</p>
        {benefits && (
          <ul className="mt-2 ml-4 list-disc text-xs text-gray-600 dark:text-gray-300">
            {benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-row items-center justify-between gap-3 sm:w-28 sm:flex-col sm:items-end sm:justify-between">
        <div className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">{price}</div>
        <button
          type="button"
          onClick={onView}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          {buttonLabel}
        </button>
      </div>
    </article>
  )
}