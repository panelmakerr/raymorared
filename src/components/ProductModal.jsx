import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { convertPrice } from '../utils/currency'

export default function ProductModal({ product, currency, onAddToCart, onClose }) {
  const [color, setColor] = useState(product.colors[0])
  const [size, setSize] = useState(product.sizes[0])
  const [qty, setQty] = useState(1)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-gray-50 p-8 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
            <AnimatePresence mode="wait">
              <motion.div key={color.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="aspect-square rounded-2xl flex items-center justify-center" style={{ backgroundColor: color.hex + '20' }}>
                <div className="w-32 h-32 rounded-2xl" style={{ backgroundColor: color.hex }} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="p-8">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{product.category}</span>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400 text-sm">{'★'.repeat(Math.floor(product.rating))}</div>
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">{convertPrice(product.price, currency)}</span>
              {product.originalPrice && <><span className="text-lg text-gray-400 line-through">{convertPrice(product.originalPrice, currency)}</span><span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Save {Math.round((1 - product.price / product.originalPrice) * 100)}%</span></>}
            </div>
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Color: {color.name}</p>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <motion.button key={c.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${color.name === c.name ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2' : 'border-gray-200'}`} style={{ backgroundColor: c.hex }} title={c.name} />
                ))}
              </div>
            </div>
            {product.sizes.length > 1 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Size: {size}</p>
                <div className="flex gap-2">
                  {product.sizes.map((s) => <button key={s} onClick={() => setSize(s)} className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${size === s ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-600 hover:border-gray-400'}`}>{s}</button>)}
                </div>
              </div>
            )}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">-</button>
                <span className="w-12 text-center font-medium">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50">+</button>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => { onAddToCart(product, qty, color.name, size); onClose() }}
              className="w-full py-4 bg-gray-900 text-white font-medium rounded-2xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/25">
              Add to Cart — {convertPrice(product.price * qty, currency)}
            </motion.button>
            <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">📦 Free shipping</span>
              <span className="flex items-center gap-1">🔄 30-day returns</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
