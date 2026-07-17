import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SpeedIndicator() {
  const [loadTime, setLoadTime] = useState(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const startTime = performance.now()
    const handleLoad = () => {
      const time = Math.round(performance.now() - startTime)
      setLoadTime(time)
      setTimeout(() => setShow(true), 1000)
      setTimeout(() => setShow(false), 5000)
    }
    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && loadTime && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 text-sm"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.2 }}
            className="w-2 h-2 bg-green-400 rounded-full"
          />
          <span>Loaded in <strong>{loadTime}ms</strong></span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
