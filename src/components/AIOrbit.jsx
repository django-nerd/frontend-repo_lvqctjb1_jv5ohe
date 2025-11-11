import React from 'react'
import { motion, useCycle } from 'framer-motion'
import { Bot } from 'lucide-react'

export default function AIOrbit({ floating = true }) {
  const [pulse, cyclePulse] = useCycle(0.8, 1)
  return (
    <div className="relative h-20">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={floating ? { y: [0, -6, 0] } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          onHoverStart={cyclePulse}
          onHoverEnd={cyclePulse}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-full bg-teal-300/20 blur-2xl" />
          <div className="absolute -inset-3 rounded-full bg-sky-400/30 blur-xl" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-400 via-sky-400 to-blue-500 opacity-20 blur" />
          <motion.div animate={{ scale: pulse }} transition={{ duration: 1.6, repeat: Infinity, repeatType: 'reverse' }}>
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-teal-400 via-sky-400 to-blue-500 flex items-center justify-center shadow-lg shadow-sky-400/30">
              <Bot className="w-7 h-7 text-white" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
