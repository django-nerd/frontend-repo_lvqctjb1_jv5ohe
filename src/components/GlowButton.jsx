import React from 'react'
import { motion } from 'framer-motion'

export default function GlowButton({ children, gradient = 'from-teal-400 via-sky-400 to-blue-500', onClick, icon: Icon, className = '' }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      whileHover={{ boxShadow: '0 0 0 2px rgba(255,255,255,0.2) inset, 0 8px 30px rgba(52,198,255,0.45)' }}
      className={`relative overflow-hidden rounded-2xl px-4 py-2 font-semibold text-white transition focus:outline-none ${className}`}
      style={{ backgroundImage: 'linear-gradient(135deg, var(--grad-start), var(--grad-mid), var(--grad-end))' }}
    >
      <span className={`absolute inset-0 bg-gradient-to-r ${gradient}`} style={{ opacity: 0.95 }} />
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </span>
    </motion.button>
  )
}
