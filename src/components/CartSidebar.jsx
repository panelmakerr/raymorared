import { motion, AnimatePresence } from 'framer-motion'
import { convertPrice } from '../utils/currency'

export default function CartSidebar({ items, total, currency, onUpdateQuantity, onRemove, onCheckout, onClose, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] bg-black/50" onClick={onClose} />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed right-0 top-0 bottom-0 z-[75] w-full max-w-md bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Your Cart ({items.length})</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4"><svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg></div>
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, i) => (
                    <motion.div key={item.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex gap-4 p-4 bg-gray-50 rounded-2xl">
                      <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-sm font-medium flex-shrink-0" style={{ backgroundColor: item.product.colors[0].hex }}>
                        {item.product.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{item.product.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{item.selectedColor && `${item.selectedColor} · `}{item.selectedSize}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200">
                            <button onClick={() => onUpdateQuantity(item.key, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-900">-</button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(item.key, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-900">+</button>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{convertPrice(item.product.price * item.quantity, currency)}</span>
                        </div>
                      </div>
                      <button onClick={() => onRemove(item.key)} className="self-start p-1 text-gray-400 hover:text-red-500 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between mb-2"><span className="text-sm text-gray-500">Shipping</span><span className="text-sm font-medium text-green-600">Free</span></div>
                <div className="flex items-center justify-between mb-4 pt-2 border-t border-gray-200"><span className="font-semibold text-gray-900">Total</span><span className="text-xl font-bold text-gray-900">{convertPrice(total, currency)}</span></div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onCheckout} className="w-full py-4 bg-gray-900 text-white font-medium rounded-2xl hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/25">Proceed to Checkout</motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
