import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="relative bg-gray-900 rounded-[2rem] p-8 md:p-14 lg:p-20 text-center overflow-hidden">
          {/* BG effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-1/2 -right-1/2 w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
            </motion.div>
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-1/2 -left-1/2 w-full h-full">
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
            </motion.div>
          </div>

          <div className="relative z-10 max-w-xl mx-auto">
            <motion.div initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-16 h-16 mx-auto bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Stay in the Loop</h2>
            <p className="mt-4 text-gray-400 leading-relaxed">Subscribe for exclusive offers, new arrivals, and design inspiration.</p>

            {!sent ? (
              <form onSubmit={(e) => { e.preventDefault(); if (email) setSent(true) }}
                className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all" />
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="submit"
                  className="px-8 py-4 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-xl shadow-white/10 whitespace-nowrap">
                  Subscribe
                </motion.button>
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                className="mt-8 flex items-center justify-center gap-3 text-green-400">
                <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.3, 1] }} transition={{ duration: 0.5 }}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </motion.div>
                <span className="font-bold text-lg">Thanks for subscribing!</span>
              </motion.div>
            )}
            <p className="mt-4 text-xs text-gray-500">No spam, unsubscribe anytime.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
