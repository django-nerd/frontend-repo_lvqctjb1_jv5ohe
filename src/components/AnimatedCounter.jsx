import React, { useEffect, useRef } from 'react'

export default function AnimatedCounter({ value = 0, duration = 1200, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const start = performance.now()
    const from = 0
    const to = Number(value) || 0

    function tick(now) {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      const current = Math.round(from + (to - from) * eased)
      el.textContent = current.toLocaleString()
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value, duration])

  return <span ref={ref} className={className} />
}
