'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, LabelList } from 'recharts'

interface ResultsGraphProps {
  puzzleDate: string
  userGuessCount?: number // Optional - undefined means user hasn't finished yet
}

interface Stats {
  distribution: Record<number, number>
  totalPlayers: number
}

export function ResultsGraph({ puzzleDate, userGuessCount }: ResultsGraphProps) {
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/puzzle-stats?date=${puzzleDate}`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }, [puzzleDate])

  if (isLoading) {
    return (
      <div className="p-4">
        <p className="text-sm text-green-800">Fetching bananas...</p>
      </div>
    )
  }

  if (!stats || stats.totalPlayers === 0) {
    return (
      <div className="p-4">
        <p className="text-sm text-green-800">No stats yet. Be the first to play today!</p>
      </div>
    )
  }

  const hasFinished = userGuessCount !== undefined

  // Transform data for Recharts
  const chartData = [1, 2, 3, 4, 5, 6, 7].map((guess) => ({
    name: guess === 7 ? 'Fail' : String(guess),
    count: stats.distribution[guess] || 0,
    isUser: hasFinished && guess === userGuessCount
  }))

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold text-green-900 mb-1">{hasFinished ? 'How You Compare' : "Today's Stats"}</h3>
      <p className="text-sm text-green-700 mb-4">{stats.totalPlayers} players today</p>

      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: '#14532d', fontSize: 12, fontWeight: 'bold' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={40}>
              <LabelList dataKey="count" position="top" fill="#14532d" fontSize={11} fontWeight="bold" />
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isUser ? '#16a34a' : '#eab308'}
                  stroke={entry.isUser ? '#15803d' : '#ca8a04'}
                  strokeWidth={entry.isUser ? 2 : 0}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {hasFinished && (
        <p className="text-center text-sm text-green-700 mt-2">
          <span className="inline-block w-3 h-3 bg-green-600 rounded mr-1" />
          Your result
        </p>
      )}
    </div>
  )
}
