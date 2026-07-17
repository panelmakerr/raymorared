import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { convertPrice } from '../utils/currency'

export default function ProductModal({ product, currency, onAddToCart, onClose }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const colorVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative bg-gray-50 p-8 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedColor.name}-${selectedImage}`}
                variants={colorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="aspect-square rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: selectedColor.hex + '20' }}
              >
                <div className="text-center">
                  <div
                    className="w-32 h-32 mx-auto rounded-2xl mb-4"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <p className="text-gray-400 text-sm">{product.name}</p>
                  <p className="text-gray-500 text-xs mt-1">{selectedColor.name} · {selectedSize}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-2 mt-4 justify-center">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg border-2 transition-all ${
                    selectedImage === i
                      ? 'border-gray-900 scale-105'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: selectedColor.hex + '15' }}
                />
              ))}
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{product.category}</span>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400 text-sm">
                {'★'.repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 && '☆'}
              </div>
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">{convertPrice(product.price, currency)}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">{convertPrice(product.originalPrice, currency)}</span>
              )}
              {product.originalPrice && (
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Color: {selectedColor.name}</p>
              <div className="flex gap-3">
                {product.colors.map(color => (
                  <motion.button
                    key={color.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name
                        ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2'
                        : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {product.sizes.length > 1 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Size: {selectedSize}</p>
                <div className="flex gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                        selectedSize === size
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-200 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onAddToCart(product, quantity, selectedColor.name, selectedSize)
                onClose()
              }}
              className="w-full py-4 bg-gray-900 text-white font-medium rounded-2xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/25"
            >
              Add to Cart — {convertPrice(product.price * quantity, currency)}
            </motion.button>

            <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Free shipping
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                30-day returns
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
