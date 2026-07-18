import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouse = (e) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const rotateX = ((clientY - centerY) / (height / 2)) * -8
    const rotateY = ((clientX - centerX) / (width / 2)) * 8
    setTransform({ rotateX, rotateY, scale: 1.02 })
  }

  const reset = () => setTransform({ rotateX: 0, rotateY: 0, scale: 1 })

  return (
    <motion.div
      ref={ref}
      animate={transform}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { reset(); setIsHovering(false) }}
      onMouseEnter={() => setIsHovering(true)}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={className}
    >
      {children}
      {isHovering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${(transform.rotateY + 8) / 16 * 100}% ${(transform.rotateX + 8) / 16 * 100}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  )
}
