import React from 'react'
import { motion } from 'framer-motion'

export function CircularGauge({ value = 65, size = 140, stroke = 12, gradientId = 'gaugeGrad' }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.min(100, Math.max(0, value))
  const dash = (pct / 100) * c
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="60%" stopColor="#30C0F0" />
          <stop offset="100%" stopColor="#FF8A65" />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(148, 163, 184, .25)" strokeWidth={stroke} fill="none" />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={`url(#${gradientId})`}
        strokeLinecap="round"
        strokeWidth={stroke}
        fill="none"
        initial={{ strokeDasharray: `0 ${c}` }}
        animate={{ strokeDasharray: `${dash} ${c}` }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ filter: 'drop-shadow(0 6px 20px rgba(48, 192, 240, 0.35))' }}
      />
    </svg>
  )
}

export function GradientBar({ label, value, colorFrom, colorTo }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300">
        <span>{label}</span>
        <span className="tabular-nums font-medium">{value}%</span>
      </div>
      <div className="h-3 w-full rounded-xl bg-slate-200/60 dark:bg-slate-700/50 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1 }}
          className={`h-full bg-gradient-to-r ${colorFrom} ${colorTo}`}
        />
      </div>
    </div>
  )
}
