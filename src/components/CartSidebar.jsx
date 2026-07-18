import { motion, AnimatePresence } from 'framer-motion'
import { convertPrice } from '../utils/currency'

const itemVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.95 },
  visible: (i) => ({ opacity: 1, x: 0, scale: 1, transition: { delay: i * 0.08, type: 'spring', stiffness: 200, damping: 20 } }),
  exit: { opacity: 0, x: 60, scale: 0.9, transition: { duration: 0.2 } },
}

export default function CartSidebar({ items, total, currency, onUpdateQuantity, onRemove, onCheckout, onClose, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm" onClick={onClose} />
          <motion.div initial={{ x: '100%', opacity: 0.5 }} animate={{ x: 0, opacity: 1 }} exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-[75] w-full max-w-md bg-white shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <motion.h2 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-semibold text-gray-900">Your Cart</motion.h2>
                {items.length > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
                    className="px-2.5 py-0.5 bg-gray-900 text-white text-xs font-bold rounded-full">{items.length}</motion.span>
                )}
              </div>
              <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16">
                  <motion.div animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}
                    className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  </motion.div>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                    className="text-gray-500 font-medium">Your cart is empty</motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    className="text-sm text-gray-400 mt-1">Add some items to get started!</motion.p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, i) => (
                      <motion.div key={item.key} custom={i} variants={itemVariants} initial="hidden" animate="visible" exit="exit"
                        layout className="flex gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100/80 transition-colors group">
                        <motion.div whileHover={{ scale: 1.1, rotate: 5 }}
                          className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-sm font-medium flex-shrink-0 shadow-md"
                          style={{ backgroundColor: item.product.colors[0].hex }}>
                          {item.product.name.charAt(0)}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">{item.product.name}</h3>
                          <p className="text-xs text-gray-500 mt-0.5">{item.selectedColor && `${item.selectedColor} · `}{item.selectedSize}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 shadow-sm">
                              <motion.button whileTap={{ scale: 0.85 }}
                                onClick={() => onUpdateQuantity(item.key, item.quantity - 1)}
                                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors">-</motion.button>
                              <motion.span key={item.quantity} initial={{ scale: 1.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                className="text-sm font-medium w-6 text-center">{item.quantity}</motion.span>
                              <motion.button whileTap={{ scale: 0.85 }}
                                onClick={() => onUpdateQuantity(item.key, item.quantity + 1)}
                                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors">+</motion.button>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{convertPrice(item.product.price * item.quantity, currency)}</span>
                          </div>
                        </div>
                        <motion.button whileHover={{ scale: 1.2, color: '#ef4444' }} whileTap={{ scale: 0.8 }}
                          onClick={() => onRemove(item.key)}
                          className="self-start p-1 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Shipping</span>
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}
                    className="text-sm font-medium text-green-600">Free</motion.span>
                </div>
                <div className="flex items-center justify-between mb-4 pt-2 border-t border-gray-200">
                  <span className="font-semibold text-gray-900">Total</span>
                  <motion.span key={total} initial={{ scale: 1.2, color: '#22c55e' }} animate={{ scale: 1, color: '#111827' }}
                    className="text-xl font-bold">{convertPrice(total, currency)}</motion.span>
                </div>
                <motion.button whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)' }} whileTap={{ scale: 0.98 }}
                  onClick={onCheckout}
                  className="w-full py-4 bg-gray-900 text-white font-medium rounded-2xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/25">
                  Proceed to Checkout
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
