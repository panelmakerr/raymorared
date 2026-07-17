import { motion } from 'framer-motion'

export default function Checkout({ total, currency, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-48 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white">Checkout</h2>
              <p className="text-white/60 text-sm mt-1">Secure Payment</p>
            </motion.div>
          </motion.div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full" />
        </div>

        <div className="p-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              Coming Soon
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Checkout is under construction
            </h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
              We're building an amazing one-page checkout experience with
              multi-currency support, express payments, and more.
              Stay tuned!
            </p>

            <div className="space-y-3 mb-8">
              {[
                { icon: '🔒', text: 'Secure SSL Encryption' },
                { icon: '💳', text: 'Multiple Payment Methods' },
                { icon: '🌍', text: 'Multi-Currency Support' },
                { icon: '⚡', text: 'Express Checkout' },
              ].map((feature, i) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3 text-sm text-gray-600"
                >
                  <span className="text-lg">{feature.icon}</span>
                  <span>{feature.text}</span>
                </motion.div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
