import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { convertPrice } from '../utils/currency'

function ParallaxImage({ color, children }) {
  const ref = useRef(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const springX = useSpring(x, { stiffness: 150, damping: 20 })
  const springY = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(springY, [0, 1], [8, -8])
  const rotateY = useTransform(springX, [0, 1], [-8, 8])
  const glareX = useTransform(springX, [0, 1], [0, 100])
  const glareY = useTransform(springY, [0, 1], [0, 100])
  const bgX = useTransform(springX, [0, 1], [-10, 10])
  const bgY = useTransform(springY, [0, 1], [-10, 10])

  const onMove = (e) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    x.set((e.clientX - left) / width)
    y.set((e.clientY - top) / height)
  }
  const onLeave = () => { x.set(0.5); y.set(0.5) }

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div key={color.name}
          initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8, rotateY: 20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="aspect-square rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: color.hex + '20' }}>
          <motion.div style={{ x: bgX, y: bgY, backgroundColor: color.hex }} className="w-32 h-32 rounded-2xl shadow-2xl" />
        </motion.div>
      </AnimatePresence>
      {/* Glare effect */}
      <motion.div className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.15) 0%, transparent 60%)` }} />
      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div key={i}
          animate={{ y: [0, -20 - i * 5, 0], x: [0, (i % 2 ? 10 : -10), 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
          className="absolute w-1.5 h-1.5 bg-white/40 rounded-full pointer-events-none"
          style={{ left: `${20 + i * 15}%`, top: `${60 + (i % 3) * 10}%` }} />
      ))}
    </motion.div>
  )
}

export default function ProductModal({ product, currency, onAddToCart, onClose }) {
  const [color, setColor] = useState(product.colors[0])
  const [size, setSize] = useState(product.sizes[0])
  const [qty, setQty] = useState(1)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.85, y: 60, rotateX: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 60, rotateX: -10 }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-gray-50 p-8 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
            <ParallaxImage color={color} />
          </div>
          <div className="p-8">
            {/* Staggered entrance for details */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="flex items-start justify-between mb-2">
              <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="text-xs font-medium text-gray-500 uppercase tracking-wider">{product.category}</motion.span>
              <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </motion.button>
            </motion.div>

            <motion.h2 initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-gray-900 mb-2">{product.name}</motion.h2>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
              className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400 text-sm">{'★'.repeat(Math.floor(product.rating))}</div>
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="flex items-baseline gap-3 mb-6">
              <motion.span animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl font-bold text-gray-900">{convertPrice(product.price, currency)}</motion.span>
              {product.originalPrice && <><span className="text-lg text-gray-400 line-through">{convertPrice(product.originalPrice, currency)}</span><motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: 'spring' }}
                className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Save {Math.round((1 - product.price / product.originalPrice) * 100)}%</motion.span></>}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Color: {color.name}</p>
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <motion.button key={c.name} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + i * 0.05, type: 'spring' }}
                    whileHover={{ scale: 1.2, y: -3 }} whileTap={{ scale: 0.9 }} onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${color.name === c.name ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2 shadow-lg' : 'border-gray-200 hover:border-gray-400'}`}
                    style={{ backgroundColor: c.hex }} title={c.name} />
                ))}
              </div>
            </motion.div>

            {product.sizes.length > 1 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Size: {size}</p>
                <div className="flex gap-2">
                  {product.sizes.map((s, i) => (
                    <motion.button key={s} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.45 + i * 0.05 }}
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={() => setSize(s)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${size === s ? 'border-gray-900 bg-gray-900 text-white shadow-lg' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}>{s}</motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">-</motion.button>
                <motion.span key={qty} initial={{ scale: 1.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="w-12 text-center font-medium text-lg">{qty}</motion.span>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setQty((q) => q + 1)} className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">+</motion.button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <motion.button whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)' }} whileTap={{ scale: 0.98 }}
                onClick={() => { onAddToCart(product, qty, color.name, size); onClose() }}
                className="w-full py-4 bg-gray-900 text-white font-medium rounded-2xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/25">
                Add to Cart — {convertPrice(product.price * qty, currency)}
              </motion.button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              className="mt-4 flex items-center gap-4 text-xs text-gray-500">
              <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-1 cursor-default">📦 Free shipping</motion.span>
              <motion.span whileHover={{ scale: 1.05 }} className="flex items-center gap-1 cursor-default">🔄 30-day returns</motion.span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
