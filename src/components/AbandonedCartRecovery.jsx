import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AbandonedCartRecovery() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      const last = localStorage.getItem('cart_recovery')
      if (!last || Date.now() - parseInt(last) > 86400000) {
        setShow(true)
        localStorage.setItem('cart_recovery', String(Date.now()))
      }
    }, 45000)
    return () => clearTimeout(t)
  }, [])

  if (!show) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[85] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShow(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="h-28 bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center relative overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <motion.div key={i} initial={{ y: -20, x: Math.random() * 300, opacity: 0.3 }} animate={{ y: 200, opacity: 0 }} transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                  className="absolute w-2 h-2 bg-white/30 rounded-full" />
              ))}
              <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', delay: 0.2 }} className="text-5xl z-10">🛒</motion.div>
            </div>
            <div className="p-8">
              {!sent ? (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Don't leave empty-handed!</h3>
                  <p className="text-gray-500 text-sm mb-6">Get <span className="font-semibold text-amber-600">10% off</span> when you complete your purchase today!</p>
                  <form onSubmit={(e) => { e.preventDefault(); if (email) setSent(true) }} className="space-y-3">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500" />
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
                      className="w-full py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-colors">Get 10% Off</motion.button>
                  </form>
                  <button onClick={() => setShow(false)} className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 py-2">No thanks</button>
                </>
              ) : (
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                  <div className="text-5xl mb-3">🎉</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Check your inbox!</h3>
                  <p className="text-gray-500 text-sm">Your 10% discount has been sent to {email}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
