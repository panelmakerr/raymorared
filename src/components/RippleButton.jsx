import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function RippleButton({ children, className = '', onClick, ...props }) {
  const ref = useRef(null)
  const [ripples, setRipples] = useState([])

  const addRipple = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2
    const id = Date.now()
    setRipples((prev) => [...prev, { id, x, y, size }])
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600)
    onClick?.(e)
  }

  return (
    <motion.button ref={ref} whileTap={{ scale: 0.97 }} onClick={addRipple} className={`relative overflow-hidden ${className}`} {...props}>
      {ripples.map((r) => (
        <span key={r.id} className="absolute rounded-full bg-white/20 pointer-events-none animate-[ripple_0.6s_ease-out_forwards]"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }} />
      ))}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
