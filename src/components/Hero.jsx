import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const FLOAT = { y: [0, -20, 0], rotate: [0, 5, -5, 0], transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={ref} className="relative overflow-hidden min-h-screen flex items-center">
      <motion.div style={{ y: bgY }} className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />

      <div className="absolute inset-0 opacity-30">
        <motion.div animate={{ background: ['radial-gradient(circle at 20% 80%, rgba(120,119,198,0.15) 0%, transparent 50%)', 'radial-gradient(circle at 80% 20%, rgba(120,119,198,0.15) 0%, transparent 50%)', 'radial-gradient(circle at 20% 80%, rgba(120,119,198,0.15) 0%, transparent 50%)'] }} transition={{ duration: 8, repeat: Infinity }} className="absolute inset-0" />
      </div>

      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div key={i} animate={{ x: [0, i % 2 ? 40 : -40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }} transition={{ duration: 7 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute rounded-full" style={{ width: 80 + i * 40, height: 80 + i * 40, left: `${15 + i * 16}%`, top: `${20 + i * 10}%`, background: `radial-gradient(circle, rgba(255,255,255,${0.04 + i * 0.01}) 0%, transparent 70%)` }} />
      ))}

      <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div style={{ y: textY }} className="text-center md:text-left">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 mb-6 border border-white/10">
              <motion.span animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              New Collection 2024
            </motion.div>

            <div className="relative">
              <div className="overflow-hidden">
                <motion.h1 initial={{ opacity: 0, x: -80, skewX: -10 }} animate={{ opacity: 1, x: 0, skewX: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[0.95]">
                  Minimalist
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 initial={{ opacity: 0, x: -80, skewX: -10 }} animate={{ opacity: 1, x: 0, skewX: 0 }} transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }} className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white/15 leading-[0.95]">
                  Essentials
                </motion.h1>
              </div>
              <motion.h1 animate={{ x: [2, -2, 2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 0.25, repeat: Infinity }} className="absolute inset-0 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-red-500/15 leading-[0.95] pointer-events-none select-none" aria-hidden>Minimalist</motion.h1>
              <motion.h1 animate={{ x: [-2, 2, -2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 0.25, repeat: Infinity, delay: 0.08 }} className="absolute inset-0 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-blue-500/15 leading-[0.95] pointer-events-none select-none" aria-hidden>Minimalist</motion.h1>
            </div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-6 text-base text-white/50 max-w-md mx-auto md:mx-0 leading-relaxed">
              Curated products where form meets function in perfect harmony.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <motion.a href="#products" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-black bg-white rounded-full hover:bg-gray-100 transition-colors shadow-xl shadow-white/10">
                Shop Now
                <motion.svg animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></motion.svg>
              </motion.a>
              <motion.a href="#" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors">
                View Lookbook
              </motion.a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-12 flex items-center gap-6 justify-center md:justify-start">
              {[{ v: '2.5K+', l: 'Customers' }, { v: '500+', l: 'Products' }, { v: '4.9★', l: 'Rating' }].map((s) => (
                <div key={s.l} className="text-center">
                  <span className="block text-lg font-bold text-white">{s.v}</span>
                  <span className="text-[10px] text-white/40">{s.l}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative hidden md:block">
            <motion.div animate={FLOAT} className="relative z-10">
              <div className="aspect-square bg-white/10 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl">
                <div className="w-full h-full flex items-center justify-center relative">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute w-56 h-56 border border-white/10 rounded-full" />
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="absolute w-72 h-72 border border-white/5 rounded-full" />
                  <motion.div animate={{ rotateY: [0, 8, -8, 0] }} transition={{ duration: 6, repeat: Infinity }} className="w-32 h-32 bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl shadow-2xl" />
                  {[0, 1, 2].map((i) => (
                    <motion.div key={i} animate={{ rotate: 360 }} transition={{ duration: 12 + i * 4, repeat: Infinity, ease: 'linear' }} className="absolute" style={{ width: 180 + i * 30, height: 180 + i * 30 }}>
                      <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} className="absolute -top-1.5 left-1/2 w-3 h-3 bg-white/30 rounded-full" />
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, type: 'spring' }} className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/20 shadow-xl">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center"><svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                  <div><p className="text-xs font-bold text-white">Premium</p><p className="text-[10px] text-white/50">Quality</p></div>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, type: 'spring' }} className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-xl rounded-xl p-3 border border-white/20 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⭐</span>
                  <div><p className="text-xs font-bold text-white">4.9 Rating</p><p className="text-[10px] text-white/50">1,200+ Reviews</p></div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] text-white/30 uppercase tracking-widest">Scroll</span>
          <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
            <motion.div animate={{ opacity: [0.3, 1, 0.3], height: [4, 10, 4] }} transition={{ duration: 2, repeat: Infinity }} className="w-0.5 bg-white rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
