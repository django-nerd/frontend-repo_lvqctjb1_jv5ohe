import React from 'react'

export default function Calendar({ meals = [], workouts = [] }) {
  // generate current month simple grid (no heavy deps)
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const start = new Date(year, month, 1)
  const end = new Date(year, month + 1, 0)
  const days = end.getDate()
  const firstDay = start.getDay()
  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= days; d++) cells.push(d)

  const isMeal = d => meals.includes(d)
  const isWorkout = d => workouts.includes(d)

  return (
    <div className="grid grid-cols-7 gap-2 text-xs">
      {['S','M','T','W','T','F','S'].map((w,i) => (
        <div key={i} className="text-center text-slate-500 dark:text-slate-400 mb-1">{w}</div>
      ))}
      {cells.map((d, i) => {
        const meal = d && isMeal(d)
        const workout = d && isWorkout(d)
        const both = meal && workout
        return (
          <div key={i} className={`aspect-square rounded-xl flex items-center justify-center border
            ${d ? 'bg-white/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-700/50' : 'border-transparent'}
          `}>
            {d && (
              <div className="relative">
                <span className="text-slate-800 dark:text-slate-100">{d}</span>
                {(meal || workout) && (
                  <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full ${both ? 'bg-green-400' : meal ? 'bg-emerald-400' : 'bg-orange-400'}`} />
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
