import React from 'react'

export default function SkeletonCard() {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow animate-pulse flex gap-4">
      <div className="w-28 h-28 bg-gray-200 dark:bg-gray-700 rounded" />
      <div className="flex-1">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      </div>
      <div className="w-28 flex flex-col items-end justify-between">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-2" />
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20" />
      </div>
    </div>
  )
}