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
    <article className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
        {imageUrl ? (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={imageUrl} alt={title} className="object-cover w-full h-full rounded" />
        ) : (
          <span className="text-center text-xs text-gray-400">Sem imagem</span>
        )}
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-gray-900 dark:text-white">{title}</h4>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{description}</p>
        {benefits && (
          <ul className="mt-2 ml-4 list-disc text-xs text-gray-600 dark:text-gray-300">
            {benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex w-28 flex-col items-end justify-between">
        <div className="text-xl font-semibold text-gray-900 dark:text-white">{price}</div>
        <button
          type="button"
          onClick={onView}
          className="rounded-lg bg-blue-600 px-3 py-1 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        >
          {buttonLabel}
        </button>
      </div>
    </article>
  )
}