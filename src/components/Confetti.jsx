import React, { useEffect, useRef } from 'react'

export default function Confetti({ trigger }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!trigger) return
    const container = ref.current
    if (!container) return
    const colors = ['#2DD4BF', '#30C0F0', '#FF8A65']
    const n = 80
    container.innerHTML = ''
    for (let i = 0; i < n; i++) {
      const piece = document.createElement('span')
      const size = 4 + Math.random() * 6
      piece.style.cssText = `
        position:absolute; left:${Math.random()*100}%; top:0; width:${size}px; height:${size}px;
        background:${colors[i%colors.length]}; border-radius:1px; transform:translateY(-20px);
        opacity:0.9; filter:drop-shadow(0 0 8px rgba(48,192,240,.35));
      `
      container.appendChild(piece)
      const duration = 1200 + Math.random()*1200
      piece.animate([
        { transform: `translate(${(Math.random()*2-1)*40}px, -10px) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${(Math.random()*2-1)*80}px, 140px) rotate(360deg)`, opacity: 0 }
      ], { duration, easing: 'cubic-bezier(.2,.7,.2,1)' })
      setTimeout(() => piece.remove(), duration + 50)
    }
  }, [trigger])
  return <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" />
}
