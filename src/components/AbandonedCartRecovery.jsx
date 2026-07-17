import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AbandonedCartRecovery() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const lastShown = localStorage.getItem('cart_recovery_shown')
      const now = Date.now()
      if (!lastShown || now - parseInt(lastShown) > 24 * 60 * 60 * 1000) {
        setShow(true)
        localStorage.setItem('cart_recovery_shown', now.toString())
      }
    }, 60000)
    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => setShow(false), 3000)
    }
  }

  if (!show) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[85] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-32 bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -20, x: Math.random() * 300, opacity: 0.3 }}
                    animate={{ y: 200, opacity: 0 }}
                    transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                    className="absolute w-2 h-2 bg-white/30 rounded-full"
                  />
                ))}
              </div>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                className="text-6xl"
              >
                🛒
              </motion.div>
            </div>

            <div className="p-8">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Wait! Don't leave empty-handed
                    </h3>
                    <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                      We noticed you were checking out. Get <span className="font-semibold text-amber-600">10% off</span> your order
                      when you complete your purchase today!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/25"
                      >
                        Get 10% Off Now
                      </motion.button>
                    </form>

                    <button
                      onClick={() => setShow(false)}
                      className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 py-2"
                    >
                      No thanks, I'll pay full price
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      className="text-6xl mb-4"
                    >
                      🎉
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Check your inbox!</h3>
                    <p className="text-gray-500 text-sm">
                      Your 10% discount code has been sent to {email}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
