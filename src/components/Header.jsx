import React from 'react'
import { useTheme } from './ThemeContext'
import { Sun, Moon, HeartPulse } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Header({ logoSrc }) {
  const { theme, toggle } = useTheme()
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="sticky top-0 z-40 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-3">
          <motion.img
            src={logoSrc}
            alt="Kinetik logo"
            className="h-8 w-auto select-none"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="text-sm font-medium text-sky-500 dark:text-sky-300 hidden sm:flex items-center gap-1"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <HeartPulse className="w-4 h-4" />
            Live
          </motion.div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-600 dark:text-slate-300 font-medium tabular-nums">
            {time}
          </div>
          <button
            onClick={toggle}
            className="inline-flex items-center justify-center rounded-2xl p-2 border border-slate-200/70 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-900/60 transition"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5 text-slate-700" /> : <Sun className="w-5 h-5 text-yellow-300" />}
          </button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-teal-400 via-sky-400 to-blue-500 shadow-inner shadow-sky-200/40" />
        </div>
      </div>
    </div>
  )
}
