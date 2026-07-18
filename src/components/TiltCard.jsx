import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const [t, setT] = useState({ rx: 0, ry: 0, s: 1 })

  const onMove = (e) => {
    if (!ref.current) return
    const { clientX: cx, clientY: cy } = e
    const { left: l, top: tp, width: w, height: h } = ref.current.getBoundingClientRect()
    setT({ rx: ((cy - tp) / (h / 2)) * -6, ry: ((cx - l) / (w / 2)) * 6, s: 1.02 })
  }

  const onLeave = () => setT({ rx: 0, ry: 0, s: 1 })

  return (
    <motion.div
      ref={ref}
      animate={t}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
